/* ============================================================
   SABORES DEL MUNDO – sw.js
   Service Worker: caché offline-first
   ============================================================ */

// Nombre y versión del caché.
// Cambiar CACHE_VERSION fuerza la actualización en todos los clientes.
const CACHE_NAME    = "sabores-v1.0.0";
const CACHE_VERSION = 1;

// Archivos a cachear en la instalación (App Shell)
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  // Fuentes de Google (se cachean en runtime si hay conexión)
];

// URLs externas que también queremos cachear en runtime
const CACHE_RUNTIME_ORIGINS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];


/* ── INSTALL ──────────────────────────────────────────────── */

self.addEventListener("install", (event) => {
  console.log(`[SW] Instalando ${CACHE_NAME}…`);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Cacheando App Shell…");
      return cache.addAll(APP_SHELL);
    })
    // Activar inmediatamente sin esperar a que se cierren las pestañas
    .then(() => self.skipWaiting())
    .then(() => console.log("[SW] App Shell cacheado correctamente"))
    .catch((err) => console.error("[SW] Error al cachear App Shell:", err))
  );
});


/* ── ACTIVATE ─────────────────────────────────────────────── */

self.addEventListener("activate", (event) => {
  console.log(`[SW] Activando ${CACHE_NAME}…`);

  event.waitUntil(
    // Eliminar cachés antiguas
    caches.keys().then((claves) => {
      const eliminaciones = claves
        .filter(clave => clave !== CACHE_NAME)
        .map(clave => {
          console.log(`[SW] Eliminando caché obsoleta: ${clave}`);
          return caches.delete(clave);
        });
      return Promise.all(eliminaciones);
    })
    // Tomar el control inmediato de todas las pestañas abiertas
    .then(() => self.clients.claim())
    .then(() => console.log("[SW] Service Worker activo y controlando la página"))
  );
});


/* ── FETCH ────────────────────────────────────────────────── */

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar solicitudes GET
  if (request.method !== "GET") return;

  // Estrategia: Cache First (para App Shell y assets estáticos)
  // → Si está en caché → servir desde caché
  // → Si no está → ir a red y guardar en caché para la próxima vez
  event.respondWith(estrategiaCacheFirst(request, url));
});


/**
 * Estrategia Cache First con fallback a red.
 * @param {Request} request
 * @param {URL} url
 * @returns {Promise<Response>}
 */
async function estrategiaCacheFirst(request, url) {
  // 1. Buscar en caché
  const cached = await caches.match(request);
  if (cached) {
    console.log(`[SW] Sirviendo desde caché: ${url.pathname}`);
    return cached;
  }

  // 2. No está en caché → ir a la red
  try {
    const respuestaRed = await fetch(request);

    // Solo cachear respuestas válidas (200 OK)
    if (respuestaRed && respuestaRed.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      // Clonar la respuesta porque los streams solo se pueden leer una vez
      cache.put(request, respuestaRed.clone());
      console.log(`[SW] Cacheado desde red: ${url.pathname}`);
    }

    return respuestaRed;

  } catch (error) {
    // 3. Sin red y sin caché → página offline de fallback
    console.warn(`[SW] Sin conexión y sin caché para: ${url.pathname}`);

    // Si es una navegación de página, devolver el index cacheado
    if (request.mode === "navigate") {
      const fallback = await caches.match("./index.html");
      if (fallback) return fallback;
    }

    // Respuesta de error genérica para otros recursos
    return new Response("Sin conexión. Recurso no disponible en caché.", {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}
