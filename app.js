/* ============================================================
   SABORES DEL MUNDO – app.js
   Lógica principal de la aplicación
   ============================================================
   Estructura:
     1. Datos  – Array de curiosidades gastronómicas
     2. Estado – Variables de estado de la UI
     3. Utils  – Funciones de utilidad
     4. Render – Funciones de renderizado DOM
     5. Modal  – Apertura / cierre del modal de detalle
     6. Search – Buscador y filtros por categoría
     7. PWA    – Registro del Service Worker e instalación
     8. Init   – Punto de entrada y arranque
   ============================================================ */


/* ── 1. DATOS ─────────────────────────────────────────────── */

/**
 * Cada curiosidad gastronómica contiene:
 * @property {number}   id          – Identificador único
 * @property {string}   emoji       – Emoji representativo
 * @property {string}   titulo      – Título de la curiosidad
 * @property {string}   categoria   – Categoría temática
 * @property {string}   pais        – País o región de origen
 * @property {string}   bandera     – Emoji de bandera del país
 * @property {string}   descripcion – Texto completo para el modal
 * @property {string}   extracto    – Texto corto para la tarjeta
 * @property {string[]} datosClaves – Lista de datos curiosos extra
 * @property {string}   imagenAlt   – Texto alternativo de la imagen
 */
const curiosidades = [
  {
    id: 1,
    emoji: "🍜",
    titulo: "Los fideos más antiguos del mundo",
    categoria: "Historia",
    pais: "China",
    bandera: "🇨🇳",
    descripcion:
      "En 2005, arqueólogos encontraron en Lajia (China) un cuenco invertido con fideos de mijo de hace 4.000 años. Estaban perfectamente conservados bajo capas de sedimento. Este hallazgo desplazó a Italia y a Arabia como posibles creadoras del fideo, confirmando a China como la cuna de la pasta.",
    extracto:
      "En 2005 se encontraron en China fideos de mijo con 4.000 años de antigüedad, los más antiguos jamás hallados.",
    datosClaves: [
      "Los fideos medían unos 50 cm de longitud.",
      "Estaban fabricados con mijo, no con trigo como los actuales.",
      "El cuenco estaba boca abajo, lo que contribuyó a su conservación.",
      "El hallazgo se publicó en la revista Nature en octubre de 2005."
    ],
    imagenUrl: "https://picsum.photos/seed/noodles1/800/450",
    imagenAlt: "Cuenco arqueológico con fideos de mijo de la antigua China"
  },
  {
    id: 2,
    emoji: "🧂",
    titulo: "La sal como moneda de cambio",
    categoria: "Historia",
    pais: "Roma Antigua",
    bandera: "🏛️",
    descripcion:
      "En la Antigua Roma, los soldados recibían parte de su pago en sal, un producto escaso y valiosísimo. De ahí viene la palabra 'salario' (del latín salarium). La sal era tan apreciada que controlaba rutas comerciales enteras y podía hacer ricos a pueblos enteros que tuviesen acceso a minas o costas salinas.",
    extracto:
      "La palabra 'salario' viene del latín 'salarium': los legionarios romanos cobraban parte de su sueldo en sal.",
    datosClaves: [
      "La Vía Salaria era la ruta romana por la que se transportaba sal desde el mar Adriático.",
      "El escritor Plinio el Viejo describió el comercio de sal con gran detalle.",
      "En África, la sal llegó a valer su peso en oro.",
      "La gabela (impuesto sobre la sal) fue causa de revoluciones en Francia."
    ],
    imagenUrl: "https://picsum.photos/seed/salt2/800/450",
    imagenAlt: "Ilustración de legionarios romanos con sacos de sal como pago"
  },
  {
    id: 3,
    emoji: "🍫",
    titulo: "El chocolate fue primero bebida amarga",
    categoria: "Curiosidades",
    pais: "México",
    bandera: "🇲🇽",
    descripcion:
      "Los mayas y aztecas consumían el cacao como una bebida fría, espumosa y amarga mezclada con chile, vainilla y especias. Llamada 'xocolātl', era exclusiva de guerreros y nobles. El chocolate sólido y dulce tal como lo conocemos hoy es una invención europea del siglo XIX, cuando se añadió azúcar y leche.",
    extracto:
      "El chocolate original era una bebida fría y amarga con chile, muy diferente al dulce sólido que conocemos hoy.",
    datosClaves: [
      "El nombre 'xocolātl' en náhuatl significa 'agua amarga'.",
      "Los granos de cacao se usaban también como moneda entre los aztecas.",
      "Hernán Cortés llevó el cacao a España en 1528.",
      "El primer chocolate sólido se comercializó en 1847 en Bristol, Reino Unido."
    ],
    imagenUrl: "https://picsum.photos/seed/cacao3/800/450",
    imagenAlt: "Mazorca de cacao abierta mostrando los granos en su interior"
  },
  {
    id: 4,
    emoji: "🍕",
    titulo: "La pizza margherita y la reina de Italia",
    categoria: "Origen",
    pais: "Italia",
    bandera: "🇮🇹",
    descripcion:
      "En 1889, el pizzero napolitano Raffaele Esposito creó una pizza especial para la reina Margherita de Saboya durante su visita a Nápoles. Eligió los ingredientes por su parecido con la bandera italiana: tomate (rojo), mozzarella (blanco) y albahaca (verde). La reina la adoró y la pizza tomó su nombre. Aunque existen registros de pizzas con esos ingredientes anteriores, el relato quedó grabado en la historia.",
    extracto:
      "La pizza Margherita fue creada en 1889 para la reina de Italia, con colores que imitan la bandera italiana.",
    datosClaves: [
      "Raffaele Esposito trabajaba en la Pizzeria Brandi, aún abierta hoy en Nápoles.",
      "La reina Margherita envió una carta de agradecimiento, conservada en el local.",
      "Nápoles lleva siglos fabricando pizza, con recetas documentadas desde 1790.",
      "La pizza Margherita tiene IGP (Indicación Geográfica Protegida) europea."
    ],
    imagenUrl: "https://picsum.photos/seed/pizza4/800/450",
    imagenAlt: "Pizza Margherita recién salida del horno con tomate, mozzarella y albahaca"
  },
  {
    id: 5,
    emoji: "🫖",
    titulo: "El té llegó a Europa por accidente",
    categoria: "Curiosidades",
    pais: "China / Europa",
    bandera: "🍃",
    descripcion:
      "Cuenta la leyenda que el emperador chino Shennong descubrió el té en el 2737 a.C. cuando unas hojas cayeron en su taza de agua hirviendo. Más verosímilmente, el té llegó a Europa a través de la Ruta de la Seda en el siglo XVI. Portugal y Holanda fueron los primeros en comerciarlo masivamente. En el Reino Unido, la reina Catalina de Braganza (portuguesa) convirtió el té en bebida de la corte en 1662.",
    extracto:
      "El té llegó a Europa en el siglo XVI por la Ruta de la Seda. Una reina portuguesa lo popularizó en la corte británica.",
    datosClaves: [
      "China produce el 45% del té mundial.",
      "El 'afternoon tea' británico lo instauró la duquesa de Bedford en 1840.",
      "El Boston Tea Party (1773) fue una protesta contra el impuesto británico al té.",
      "Existen más de 1.500 variedades de té catalogadas en el mundo."
    ],
    imagenUrl: "https://picsum.photos/seed/tea5/800/450",
    imagenAlt: "Tetera de porcelana china sobre una bandeja con tazas de té"
  },
  {
    id: 6,
    emoji: "🫕",
    titulo: "El curry no existe en India",
    categoria: "Mitos",
    pais: "India / Reino Unido",
    bandera: "🇮🇳",
    descripcion:
      "La palabra 'curry' es una invención británica. En India no existe una especia ni un plato único llamado así; la cocina india se basa en mezclas (masalas) con nombres propios según la región: tikka masala, dal, korma, vindaloo… Los colonizadores británicos simplificaron toda esa riqueza bajo un único término. El 'chicken tikka masala', considerado plato nacional del Reino Unido, probablemente se inventó en Glasgow.",
    extracto:
      "La palabra 'curry' la inventaron los británicos. En India no existe ese término: cada plato tiene su propio nombre.",
    datosClaves: [
      "La palabra deriva del tamil 'kari', que significa simplemente 'salsa'.",
      "El polvo de curry comercial lo popularizó la Compañía de las Indias Orientales.",
      "El chicken tikka masala se reivindica como invención de los restaurantes indo-paquistaníes de Glasgow.",
      "Hay más de 30 regiones culinarias distintas en India con lenguajes propios de sabores."
    ],
    imagenUrl: "https://picsum.photos/seed/spice6/800/450",
    imagenAlt: "Platos de especias coloridas como cúrcuma, comino y cardamomo en un mercado indio"
  },
  {
    id: 7,
    emoji: "🍷",
    titulo: "El vino más antiguo del mundo",
    categoria: "Historia",
    pais: "Georgia",
    bandera: "🇬🇪",
    descripcion:
      "Georgia (el país del Cáucaso, no el estado americano) es considerada la cuna del vino. Se han encontrado ánforas de arcilla con restos de uva fermentada datados en 6.000 a.C. Los georgianos aún elaboran vino en tinajas de barro enterradas llamadas 'kvevri', un método declarado Patrimonio Inmaterial de la Humanidad por la UNESCO en 2013.",
    extracto:
      "El vino más antiguo conocido se elaboraba en Georgia hace 8.000 años, en vasijas de barro enterradas llamadas kvevri.",
    datosClaves: [
      "Georgia tiene más de 500 variedades de uva autóctonas.",
      "Los kvevri se entierran para mantener la temperatura constante durante la fermentación.",
      "La región de Kakheti produce el 70% del vino georgiano.",
      "El vino en kvevri puede fermentar con la piel de la uva varios meses, creando el 'vino naranja'."
    ],
    imagenUrl: "https://picsum.photos/seed/wine7/800/450",
    imagenAlt: "Kvevri de arcilla georgiana semienterrados en el suelo de una bodega tradicional"
  },
  {
    id: 8,
    emoji: "🌶️",
    titulo: "Los chiles cruzaron el mundo en 50 años",
    categoria: "Origen",
    pais: "América / Asia",
    bandera: "🌍",
    descripcion:
      "Antes de 1492, Asia y Europa nunca habían probado el chile. Tras la llegada de Colón a América, el fruto viajó a España y en menos de 50 años ya era ingrediente fundamental en la cocina india, coreana, tailandesa y húngara. Es uno de los casos más rápidos de adopción alimentaria en la historia, especialmente sorprendente en una época sin internet ni aviones.",
    extracto:
      "El chile llegó de América a Asia en menos de 50 años tras 1492. Hoy es imprescindible en cocinas que existieron siglos sin él.",
    datosClaves: [
      "Antes del chile, la pimienta negra era el principal condimento picante en Asia.",
      "Corea tardó solo un siglo en hacer del chile el alma del kimchi.",
      "México cuenta con más de 60 variedades de chile propias.",
      "El chile es la especia más consumida del mundo por delante de la pimienta negra."
    ],
    imagenUrl: "https://picsum.photos/seed/chili8/800/450",
    imagenAlt: "Variedad de chiles rojos, verdes y amarillos en un mercado de especias"
  },
  {
    id: 9,
    emoji: "🧀",
    titulo: "Francia tiene más quesos que días tiene el año",
    categoria: "Curiosidades",
    pais: "Francia",
    bandera: "🇫🇷",
    descripcion:
      "Se atribuye a Charles de Gaulle la frase 'Es imposible gobernar un país con 246 tipos de quesos'. Hoy se estima que Francia produce más de 1.000 variedades, aunque se reconocen oficialmente 45 con denominación de origen (AOC/AOP). Cada región tiene los suyos: Normandía da el camembert, el Jura el comté, Auvernia el roquefort.",
    extracto:
      "Francia produce más de 1.000 variedades de queso. De Gaulle bromeó que gobernar un país así era imposible.",
    datosClaves: [
      "El roquefort es el queso azul más antiguo del mundo, con recetas del siglo XI.",
      "El camembert se inventó en 1791 según la tradición, aunque su historia es disputada.",
      "Los franceses consumen una media de 26 kg de queso por persona al año.",
      "La AOC (Appellation d'Origine Contrôlée) protege desde el origen hasta la elaboración."
    ],
    imagenUrl: "https://picsum.photos/seed/cheese9/800/450",
    imagenAlt: "Tabla de quesos franceses con distintas texturas y cortezas sobre madera"
  },
  {
    id: 10,
    emoji: "🍣",
    titulo: "El sushi original se comía sin el pescado",
    categoria: "Origen",
    pais: "Japón",
    bandera: "🇯🇵",
    descripcion:
      "El sushi original, llamado 'narezushi', consistía en arroz fermentado que se usaba para conservar el pescado durante meses o incluso años. Una vez listo, el arroz se desechaba y solo se comía el pescado. El concepto actual, en el que se comen juntos el arroz y el pescado crudo, surgió en el siglo XIX en Edo (actual Tokio) como comida rápida de calle.",
    extracto:
      "El sushi original era un método de conservación: el arroz fermentaba el pescado y luego se tiraba. Se inventó en el siglo XIX comerlos juntos.",
    datosClaves: [
      "El narezushi aún se elabora en la región de Shiga, Japón, y huele muy intenso.",
      "El nigiri sushi (arroz con pescado encima) se popularizó en Tokio hacia 1820.",
      "El wasabi se usaba originalmente como antibacteriano contra parásitos.",
      "Japón consume el 80% del atún rojo capturado en todo el mundo."
    ],
    imagenUrl: "https://picsum.photos/seed/sushi10/800/450",
    imagenAlt: "Piezas de nigiri sushi con salmón y atún sobre una tabla de madera"
  },
  {
    id: 11,
    emoji: "🥐",
    titulo: "El croissant es austriaco, no francés",
    categoria: "Mitos",
    pais: "Austria / Francia",
    bandera: "🇦🇹",
    descripcion:
      "El croissant desciende del 'kipferl', un bollo con forma de cuerno de la repostería vienesa del siglo XIII. Llegó a Francia cuando Marie Antoinette, austriaca de nacimiento, se casó con Luis XVI en 1770. Los panaderos parisinos adoptaron la forma y la transformaron con masa hojaldrada, creando el croissant tal como lo conocemos. La forma de cuerno imita el símbolo del Imperio Otomano.",
    extracto:
      "El croissant nació en Viena como 'kipferl'. Marie Antoinette lo llevó a Francia cuando se casó con Luis XVI.",
    datosClaves: [
      "La leyenda dice que el kipferl celebraba la victoria sobre los otomanos en 1683.",
      "El croissant hojaldrado tal como lo conocemos hoy se patentó en París en 1909.",
      "En Austria, el kipferl sigue siendo más suave y menos mantecoso que el croissant francés.",
      "El término 'croissant' (creciente) hace referencia a la forma de luna creciente."
    ],
    imagenUrl: "https://picsum.photos/seed/croissant11/800/450",
    imagenAlt: "Croissants dorados recién horneados sobre papel de panadería"
  },
  {
    id: 12,
    emoji: "🌮",
    titulo: "El taco tiene 500 años de historia documentada",
    categoria: "Historia",
    pais: "México",
    bandera: "🇲🇽",
    descripcion:
      "Los tacos preceden a la llegada de los españoles a México. Los trabajadores de las minas de plata usaban pequeñas cargas de pólvora envueltas en papel llamadas 'tacos', y los trabajadores que comían tortilla enrollada con relleno adoptaron el mismo nombre. El historiador Jeffrey Pilcher documenta el consumo de tacos en la Ciudad de México en el siglo XVIII.",
    extracto:
      "Los tacos tienen al menos 500 años de historia. El nombre viene de las 'cargas' de pólvora que usaban los mineros mexicanos.",
    datosClaves: [
      "El taco al pastor llegó a México en el siglo XX traído por inmigrantes libaneses (shawarma adaptado).",
      "México tiene más de 60 variedades regionales de taco documentadas.",
      "Se consumen unos 1.000 millones de tacos al año solo en la Ciudad de México.",
      "El 31 de marzo se celebra el Día Internacional del Taco."
    ],
    imagenUrl: "https://picsum.photos/seed/taco12/800/450",
    imagenAlt: "Tacos al pastor con cilantro, cebolla y salsa verde en tortilla de maíz"
  }
];

console.log("✅ Datos cargados:", curiosidades.length, "curiosidades gastronómicas");
console.log("📋 Categorías disponibles:", [...new Set(curiosidades.map(c => c.categoria))]);


/* ── 2. ESTADO ────────────────────────────────────────────── */

/**
 * Estado centralizado de la aplicación.
 * Toda la UI se actualiza en función de este objeto.
 */
const estado = {
  terminoBusqueda: "",          // Texto introducido en el input
  categoriaActiva: "all",       // Chip de categoría seleccionado
  elementoFocoAnterior: null,   // Para restaurar foco al cerrar el modal
  deferredInstallPrompt: null,  // Evento beforeinstallprompt capturado
};

console.log("🗂️ Estado inicial:", estado);


/* ── 3. UTILS ─────────────────────────────────────────────── */

/**
 * Normaliza un texto para comparación insensible a tildes y mayúsculas.
 * @param {string} texto
 * @returns {string}
 */
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");  // Elimina diacríticos (tildes, etc.)
}

/**
 * Filtra las curiosidades según el estado actual (búsqueda + categoría).
 * @returns {Array} Subconjunto de `curiosidades`
 */
function filtrarCuriosidades() {
  const termino = normalizar(estado.terminoBusqueda);
  const categoria = estado.categoriaActiva;

  return curiosidades.filter(item => {

    // Filtro por categoría
    const coincideCategoria =
      categoria === "all" || item.categoria === categoria;

    // Filtro por texto (busca en título, descripción, país y categoría)
    const coincideTexto =
      termino === "" ||
      normalizar(item.titulo).includes(termino) ||
      normalizar(item.descripcion).includes(termino) ||
      normalizar(item.pais).includes(termino) ||
      normalizar(item.categoria).includes(termino);

    return coincideCategoria && coincideTexto;
  });
}

/**
 * Extrae todas las categorías únicas de los datos.
 * @returns {string[]}
 */
function obtenerCategorias() {
  return [...new Set(curiosidades.map(c => c.categoria))].sort();
}

/**
 * Extrae todos los países únicos de los datos.
 * @returns {string[]}
 */
function obtenerPaises() {
  return [...new Set(curiosidades.map(c => c.pais))];
}

/**
 * Anima un contador numérico desde 0 hasta el valor objetivo.
 * @param {HTMLElement} elemento - Elemento donde mostrar el número
 * @param {number} objetivo      - Valor final
 * @param {number} duracion      - Duración en ms
 */
function animarContador(elemento, objetivo, duracion = 1200) {
  const inicio = performance.now();

  function actualizar(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const valor = Math.floor(progreso * objetivo);
    elemento.textContent = valor;
    if (progreso < 1) requestAnimationFrame(actualizar);
    else elemento.textContent = objetivo;
  }

  requestAnimationFrame(actualizar);
}

console.log("🔧 Utils definidos: normalizar, filtrarCuriosidades, obtenerCategorias, animarContador");


/* ── 4. RENDER ────────────────────────────────────────────── */

/**
 * Construye y devuelve el HTML de una tarjeta.
 * @param {Object} item  - Objeto curiosidad
 * @param {number} index - Índice para el retraso de animación
 * @returns {HTMLElement}
 */
function crearTarjeta(item, index) {
  const article = document.createElement("article");
  article.className = "card";
  article.setAttribute("role", "listitem");

  // Accesibilidad: navegable con teclado y anunciado correctamente
  article.setAttribute("tabindex", "0");
  article.setAttribute("aria-label", `${item.titulo}. País: ${item.pais}. Categoría: ${item.categoria}. Pulsa Enter para ver más detalles.`);

  // Retraso escalonado para la animación de entrada
  article.style.setProperty("--delay", `${index * 60}ms`);

  article.innerHTML = `
    <div class="card-image-wrap">
      <img
        src="${item.imagenUrl}"
        alt="${item.imagenAlt}"
        class="card-img"
        loading="lazy"
        width="800"
        height="450"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
      />
      <span class="card-emoji card-emoji-fallback" role="img" aria-label="${item.emoji} representando ${item.titulo}" style="display:none">
        ${item.emoji}
      </span>
    </div>
    <div class="card-body">
      <span class="card-tag">${item.categoria}</span>
      <h3>${item.titulo}</h3>
      <p class="card-excerpt">${item.extracto}</p>
    </div>
    <div class="card-footer">
      <span class="card-country">
        <span aria-hidden="true">${item.bandera}</span>
        ${item.pais}
      </span>
      <span class="card-cta" aria-hidden="true">
        Ver más
        <span class="material-symbols-outlined" style="font-size:1rem">arrow_forward</span>
      </span>
    </div>
  `;

  // Abrir modal al hacer clic
  article.addEventListener("click", () => abrirModal(item));

  // Abrir modal al presionar Enter o Espacio (accesibilidad teclado)
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirModal(item);
    }
  });

  return article;
}

/**
 * Renderiza las tarjetas filtradas en el grid.
 * También actualiza el estado vacío y el anuncio para lectores de pantalla.
 */
function renderizarTarjetas() {
  const grid = document.getElementById("cards-grid");
  const emptyState = document.getElementById("empty-state");
  const searchStatus = document.getElementById("search-status");

  const resultados = filtrarCuriosidades();

  console.log(`🔍 Resultados de búsqueda: ${resultados.length} de ${curiosidades.length}`);

  // Limpiar grid anterior
  grid.innerHTML = "";

  if (resultados.length === 0) {
    emptyState.hidden = false;
    searchStatus.textContent = "No se encontraron curiosidades con esa búsqueda.";
    return;
  }

  emptyState.hidden = true;

  // Anuncio accesible del número de resultados
  if (estado.terminoBusqueda || estado.categoriaActiva !== "all") {
    searchStatus.textContent = `Se muestran ${resultados.length} curiosidad${resultados.length !== 1 ? "es" : ""}.`;
  } else {
    searchStatus.textContent = "";
  }

  // Crear y añadir cada tarjeta
  resultados.forEach((item, index) => {
    const tarjeta = crearTarjeta(item, index);
    grid.appendChild(tarjeta);
  });
}

/**
 * Genera los chips de categoría a partir de los datos.
 * El chip "Todas" ya existe en el HTML.
 */
function renderizarChips() {
  const container = document.querySelector(".filter-chips");
  const categorias = obtenerCategorias();

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.filter = cat;
    btn.textContent = cat;
    btn.setAttribute("aria-pressed", "false");
    container.appendChild(btn);
  });

  console.log("🏷️ Chips de categoría generados:", categorias);
}

/**
 * Actualiza los contadores del bloque de estadísticas.
 */
function actualizarEstadisticas() {
  const statItems    = document.getElementById("stat-items");
  const statCats     = document.getElementById("stat-cats");
  const statCountries = document.getElementById("stat-countries");

  const totalItems     = curiosidades.length;
  const totalCats      = obtenerCategorias().length;
  const totalCountries = obtenerPaises().length;

  animarContador(statItems,     totalItems);
  animarContador(statCats,      totalCats);
  animarContador(statCountries, totalCountries);

  console.log(`📊 Estadísticas: ${totalItems} items, ${totalCats} categorías, ${totalCountries} países`);
}


/* ── 5. MODAL ─────────────────────────────────────────────── */

/**
 * Abre el modal con los datos de una curiosidad.
 * Gestiona el foco para accesibilidad.
 * @param {Object} item - Objeto curiosidad
 */
function abrirModal(item) {
  const modal    = document.getElementById("detail-modal");
  const backdrop = document.getElementById("modal-backdrop");

  // Guardar referencia del elemento que tenía el foco
  estado.elementoFocoAnterior = document.activeElement;

  // Rellenar contenido del modal
  document.getElementById("modal-emoji").textContent     = item.emoji;
  document.getElementById("modal-title").textContent     = item.titulo;
  document.getElementById("modal-category").textContent  = item.categoria;
  document.getElementById("modal-country").textContent   = `${item.bandera} ${item.pais}`;
  document.getElementById("modal-description").textContent = item.descripcion;

  // Lista de datos clave
  const lista = document.getElementById("modal-facts-list");
  lista.innerHTML = "";
  item.datosClaves.forEach(dato => {
    const li = document.createElement("li");
    li.textContent = dato;
    lista.appendChild(li);
  });

  // Imagen del modal desde picsum con alt descriptivo
  const img = document.getElementById("modal-image");
  img.src = item.imagenUrl;
  img.alt = item.imagenAlt;
  img.style.display = "";   // Mostrar la imagen real
  document.getElementById("modal-image-caption").textContent = item.imagenAlt;

  // Mostrar modal con animación
  modal.hidden    = false;
  backdrop.hidden = false;

  // Pequeño delay para que la transición CSS se aplique
  requestAnimationFrame(() => {
    modal.classList.add("visible");
    backdrop.classList.add("visible");
  });

  // Mover el foco al botón de cierre
  const btnCerrar = modal.querySelector(".modal-close");
  btnCerrar.focus();

  // Bloquear scroll del body
  document.body.style.overflow = "hidden";

  // Trampa de foco (focus trap) dentro del modal
  modal.addEventListener("keydown", gestionarFocoModal);

  console.log(`📖 Modal abierto: "${item.titulo}"`);
}

/**
 * Cierra el modal y restaura el estado de la UI.
 */
function cerrarModal() {
  const modal    = document.getElementById("detail-modal");
  const backdrop = document.getElementById("modal-backdrop");

  modal.classList.remove("visible");
  backdrop.classList.remove("visible");

  // Esperar a que termine la transición antes de ocultar
  modal.addEventListener("transitionend", () => {
    modal.hidden    = true;
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }, { once: true });

  // Quitar trampa de foco
  modal.removeEventListener("keydown", gestionarFocoModal);

  // Restaurar foco al elemento anterior
  if (estado.elementoFocoAnterior) {
    estado.elementoFocoAnterior.focus();
  }

  console.log("❌ Modal cerrado");
}

/**
 * Trampa de foco: mantiene el foco dentro del modal mientras está abierto.
 * Permite cerrar con Escape.
 * @param {KeyboardEvent} e
 */
function gestionarFocoModal(e) {
  const modal = document.getElementById("detail-modal");

  // Cerrar con Escape
  if (e.key === "Escape") {
    cerrarModal();
    return;
  }

  // Trampa de foco con Tab / Shift+Tab
  if (e.key !== "Tab") return;

  const focusables = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const primero = focusables[0];
  const ultimo  = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === primero) {
    e.preventDefault();
    ultimo.focus();
  } else if (!e.shiftKey && document.activeElement === ultimo) {
    e.preventDefault();
    primero.focus();
  }
}


/* ── 6. SEARCH ────────────────────────────────────────────── */

/**
 * Inicializa los eventos del buscador y los chips de filtro.
 */
function inicializarBusqueda() {
  const input     = document.getElementById("search-input");
  const clearBtn  = document.getElementById("clear-search");
  const chipsContainer = document.querySelector(".filter-chips");
  const resetBtn  = document.getElementById("reset-btn");

  // Evento: escribir en el input
  input.addEventListener("input", () => {
    estado.terminoBusqueda = input.value.trim();
    clearBtn.hidden = estado.terminoBusqueda === "";
    renderizarTarjetas();
    console.log(`⌨️ Búsqueda: "${estado.terminoBusqueda}"`);
  });

  // Evento: limpiar búsqueda
  clearBtn.addEventListener("click", () => {
    input.value = "";
    estado.terminoBusqueda = "";
    clearBtn.hidden = true;
    input.focus();
    renderizarTarjetas();
  });

  // Evento: clic en chip de categoría (delegación de eventos)
  chipsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    // Actualizar estado
    estado.categoriaActiva = chip.dataset.filter;

    // Actualizar clases y aria-pressed
    chipsContainer.querySelectorAll(".chip").forEach(c => {
      c.classList.remove("chip-active");
      c.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("chip-active");
    chip.setAttribute("aria-pressed", "true");

    renderizarTarjetas();
    console.log(`🏷️ Categoría activa: "${estado.categoriaActiva}"`);
  });

  // Evento: resetear desde estado vacío
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      input.value = "";
      estado.terminoBusqueda = "";
      estado.categoriaActiva = "all";
      clearBtn.hidden = true;

      chipsContainer.querySelectorAll(".chip").forEach(c => {
        c.classList.remove("chip-active");
        c.setAttribute("aria-pressed", "false");
      });
      const chipTodas = chipsContainer.querySelector('[data-filter="all"]');
      if (chipTodas) {
        chipTodas.classList.add("chip-active");
        chipTodas.setAttribute("aria-pressed", "true");
      }

      renderizarTarjetas();
    });
  }

  // Marcar "Todas" como activo al inicio
  const chipTodas = chipsContainer.querySelector('[data-filter="all"]');
  if (chipTodas) chipTodas.setAttribute("aria-pressed", "true");

  console.log("🔎 Búsqueda inicializada");
}

/**
 * Inicializa los eventos del header (menú móvil, modal, backdrop).
 */
function inicializarEventosUI() {

  // Menú móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    const expandido = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expandido));
    mobileMenu.hidden = expandido;
    menuToggle.querySelector(".material-symbols-outlined").textContent =
      expandido ? "menu" : "close";
  });

  // Cerrar menú móvil al hacer clic en un enlace
  mobileMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    });
  });

  // Cerrar modal: botón X
  document.querySelector(".modal-close").addEventListener("click", cerrarModal);

  // Cerrar modal: clic en backdrop
  document.getElementById("modal-backdrop").addEventListener("click", cerrarModal);

  console.log("🖱️ Eventos de UI inicializados");
}


/* ── 7. PWA ───────────────────────────────────────────────── */

/**
 * Registra el Service Worker si el navegador lo soporta.
 */
function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.warn("⚠️ Service Workers no soportados en este navegador");
    return;
  }

  navigator.serviceWorker
    .register("./sw.js")
    .then(registro => {
      console.log("✅ Service Worker registrado. Scope:", registro.scope);
    })
    .catch(error => {
      console.error("❌ Error al registrar el Service Worker:", error);
    });
}

/**
 * Gestiona el banner de instalación de la PWA.
 * Captura el evento beforeinstallprompt para mostrarlo en el momento adecuado.
 */
function inicializarInstalacion() {
  const banner     = document.getElementById("install-banner");
  const installBtn = document.getElementById("install-btn");
  const dismissBtn = document.getElementById("dismiss-install");

  // Capturar el evento antes de que el navegador lo muestre automáticamente
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();                          // Evitar prompt automático
    estado.deferredInstallPrompt = e;
    banner.hidden = false;                       // Mostrar nuestro banner
    console.log("📲 App instalable: prompt capturado");
  });

  // Botón "Instalar": lanzar el prompt nativo
  installBtn.addEventListener("click", async () => {
    if (!estado.deferredInstallPrompt) return;

    estado.deferredInstallPrompt.prompt();
    const { outcome } = await estado.deferredInstallPrompt.userChoice;

    console.log(`📲 Resultado instalación: ${outcome}`);

    estado.deferredInstallPrompt = null;
    banner.hidden = true;
  });

  // Botón "X": descartar banner
  dismissBtn.addEventListener("click", () => {
    banner.hidden = true;
    console.log("📲 Banner de instalación descartado");
  });

  // Si ya está instalada, ocultar el banner
  window.addEventListener("appinstalled", () => {
    banner.hidden = true;
    estado.deferredInstallPrompt = null;
    console.log("✅ App instalada correctamente");
  });
}


/* ── 8. INIT ──────────────────────────────────────────────── */

/**
 * Punto de entrada principal.
 * Se ejecuta cuando el DOM está completamente cargado.
 */
document.addEventListener("DOMContentLoaded", () => {

  console.log("🚀 Iniciando Sabores del Mundo…");

  // 1. Generar chips de categoría desde los datos
  renderizarChips();

  // 2. Renderizar tarjetas iniciales
  renderizarTarjetas();

  // 3. Actualizar estadísticas con animación
  actualizarEstadisticas();

  // 4. Inicializar buscador y filtros
  inicializarBusqueda();

  // 5. Inicializar eventos generales de UI
  inicializarEventosUI();

  // 6. Registrar Service Worker
  registrarServiceWorker();

  // 7. Inicializar lógica de instalación PWA
  inicializarInstalacion();

  console.log("🍽️ Sabores del Mundo listo para servir.");
});
