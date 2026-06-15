# 🍽 GastroJota

Aplicación web progresiva (PWA) sobre cultura gastronómica mundial.  
Muestra curiosidades y datos históricos de la gastronomía en una interfaz moderna, accesible e instalable.

---

## Índice

- [Descripción](#descripción)
- [Características](#características)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Funcionalidades PWA](#funcionalidades-pwa)
- [Accesibilidad](#accesibilidad)
- [Historial de commits](#historial-de-commits)
- [Autor](#autor)

---

## Descripción

**GastroJota** es una PWA educativa que recopila 12 curiosidades gastronómicas de todo el mundo, organizadas en 4 categorías: Historia, Curiosidades, Origen y Mitos. El contenido se genera dinámicamente con JavaScript y la app funciona sin conexión a internet gracias a su Service Worker.

---

## Características

- 12 curiosidades gastronómicas con descripción, datos clave e imagen
- Buscador en tiempo real (filtra por título, descripción, país o categoría)
- Filtros por categoría mediante chips interactivos
- Modal de detalle al hacer clic en cada tarjeta
- Imágenes aleatorias servidas por [Lorem Picsum](https://picsum.photos/) con seed fija por tarjeta
- Contadores animados de estadísticas (curiosidades, categorías, países)
- Diseño responsive para móvil, tablet y escritorio
- Instalable como app nativa en dispositivos compatibles
- Funciona sin conexión gracias al caché del Service Worker

---

## Estructura del proyecto

```
gastrojota/
├── index.html        # Estructura semántica de la app
├── styles.css        # Estilos, variables CSS y diseño responsive
├── app.js            # Lógica JavaScript (datos, render, búsqueda, modal, PWA)
├── sw.js             # Service Worker (caché offline-first)
├── manifest.json     # Configuración PWA (nombre, iconos, colores)
└── icons/
    ├── icon-192.png  # Icono para pantalla de inicio (Android/Chrome)
    └── icon-512.png  # Icono splash screen y PWA
```

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| CSS3 con variables custom | Estilos, responsive, efectos hover |
| JavaScript ES6+ | Lógica, renderizado dinámico, eventos |
| Service Worker API | Caché y funcionamiento offline |
| Web App Manifest | Instalación como app nativa |
| Google Fonts | Tipografías Playfair Display e Inter |
| Material Symbols | Iconografía |
| Lorem Picsum | Imágenes de ejemplo con seed fija |

---

## Cómo ejecutar el proyecto

El Service Worker requiere un servidor local (no funciona con `file://`).

**Opción A — Node.js:**
```bash
npx serve .
```

**Opción B — Python:**
```bash
python3 -m http.server 8080
```

Luego abre `http://localhost:8080` en el navegador.

> Para instalar la app, usa Chrome o Edge en escritorio o Android. Aparecerá el botón de instalación en la barra de direcciones o el banner en la parte inferior de la pantalla.

---

## Funcionalidades PWA

**Manifest (`manifest.json`)**
Define el nombre, iconos, colores y modo de visualización de la app al instalarse.

**Service Worker (`sw.js`)**  
Implementa una estrategia *Cache First*:
1. En la primera visita, guarda todos los archivos del App Shell en caché.
2. En visitas posteriores, sirve desde caché sin hacer peticiones de red.
3. Si no hay conexión y tampoco hay caché, muestra un mensaje de error claro.

---

## Accesibilidad

La app sigue las pautas WCAG 2.1 nivel AA:

- Enlace *"Saltar al contenido principal"* para usuarios de teclado
- `:focus-visible` de alto contraste en todos los elementos interactivos
- Navegación completa por teclado (Tab / Shift+Tab / Enter / Escape)
- Focus trap dentro del modal para no perder el contexto
- Roles ARIA correctos: `dialog`, `search`, `list`, `banner`, `contentinfo`
- `aria-label`, `aria-expanded`, `aria-modal`, `aria-live` y `aria-pressed` donde corresponde
- `alt` descriptivo en todas las imágenes; emoji con `role="img"` y `aria-label`
- Respeto por `prefers-reduced-motion` para usuarios con sensibilidad al movimiento

---

## Historial de commits

| Hash | Descripción |
|---|---|
| `55778e0` | feat: imágenes picsum, rebrand a GastroJota y copyright |
| `ebb981c` | fix: añadir skip-link para navegación por teclado |
| `645c12b` | feat: lógica JS completa + Service Worker PWA |
| `a1fd0d7` | feat: diseño completo CSS — variables, responsive, accesibilidad y hover |
| `bf40e91` | feat: estructura base HTML semántica, manifest PWA e iconos |

---

## Autor

**Jota** · © Copyright Jota 2026 · Todos los derechos reservados
