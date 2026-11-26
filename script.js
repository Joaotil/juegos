/* =====================================================================
   MISIÓN LLOA: YAKU KAMACHIKKUNA
   Escape room educativo · U.E. Franciscana San Andrés Quitumbe

   Este archivo tiene dos partes:
   1) CONTENIDO EDITABLE: textos, diálogos, desafíos, respuestas y pistas.
      Puedes cambiar cualquier texto entre comillas sin tocar el motor.
   2) MOTOR DEL JUEGO: pantallas, diálogos, retos, inventario y guardado.

   Todos los datos académicos provienen de los documentos del proyecto
   (fichas de Historia y Biología, consulta e informe de Física,
   ejercicios de Matemáticas, preguntas de Inglés y ficha de Emprendimiento).
   ===================================================================== */

/* =====================================================================
   1) CONTENIDO EDITABLE
   ===================================================================== */

const PERSONAJES = {
  siyaj:   { nombre: 'Siyaj Chan',   img: 'assets/characters/siyaj.svg',      rol: 'Guía de los viajeros',                       ref: '«Nacido del cielo»',              personalidad: 'Observador, inteligente y aventurero.' },
  yuknoom: { nombre: 'Yuknoom',      img: 'assets/characters/yuknoom.svg',    rol: 'Analiza la información y el conocimiento',   ref: 'Asociado con «totalidad»',        personalidad: 'Reflexivo, estratégico y paciente.' },
  kinich:  { nombre: "K'inich",      img: 'assets/characters/kinich.svg',     rol: 'Aporta energía, orientación y pistas',       ref: 'Relacionado con el sol',          personalidad: 'Optimista, valiente y decidido.' },
  ixkik:   { nombre: 'Ixkik',        img: 'assets/characters/ixkik.svg',      rol: 'Guardiana de los conocimientos agrícolas y las semillas', ref: 'Nombre maya femenino', personalidad: 'Inteligente, protectora y amable.' },
  yaku:    { nombre: 'Yaku Camayoc', img: 'assets/characters/yaku.svg',       rol: 'Antiguo ingeniero hidráulico',               ref: 'La figura a quien ayudas',        personalidad: 'Necesita recuperar los conocimientos sobre el agua y los cultivos de papa en Lloa.' },
  quilla:  { nombre: 'Mama Quilla',  img: 'assets/characters/mamaquilla.svg', rol: 'Narradora',                                  ref: 'Observa Lloa desde el cielo',     personalidad: 'Guía a los viajeros durante toda la misión.' },
};

/* Introducción cinematográfica (narra Mama Quilla) */
const INTRO = [
  { fondo: 'inicio',  texto: 'Desde lo alto del cielo, yo, Mama Quilla, observo las tierras de Lloa, entre montañas y volcanes.' },
  { fondo: 'huerto',  texto: 'Aquí vive una comunidad agrícola que depende del cultivo de papa. Sus tierras tienen condiciones naturales favorables para ciertos cultivos.' },
  { fondo: 'camino',  texto: 'Pero los terrenos de cultivo están alejados de los mercados. Transportar las cosechas es difícil, y venderlas también.' },
  { fondo: 'parcelas', texto: 'Antes de elegir una solución, hay que analizar el suelo, el clima, la disponibilidad del agua, los costos y las rutas de transporte.' },
  { fondo: 'andenes', texto: 'Yaku Camayoc, un antiguo ingeniero hidráulico, necesita recuperar los conocimientos perdidos sobre el agua y la papa. Viajeros: ¿lo ayudarán?' },
];

/* Mensajes del mapa según el avance (número de lugares completados) */
const MAPA_DIALOGOS = [
  ['siyaj',   'Este es el mapa de Lloa. Empecemos por los Andenes del Legado: Mama Quilla nos espera allí.'],
  ['ixkik',   'La historia nos mostró el valor del agua. Ahora ven a mi huerto: la tierra también guarda secretos.'],
  ['kinich',  '¡Ya sabemos dónde crece bien la papa! Pero ¿cómo movemos la cosecha? Te espero en el camino.'],
  ['yuknoom', 'Fuerza y masa, entendidas. Ahora hagamos cuentas: terreno, pendiente y producción. Ven a las parcelas.'],
  ['siyaj',   'Alguien transmite desde la antena del cerro. ¡Vamos a escuchar el mensaje!'],
  ['siyaj',   'El mensaje habla del transporte hasta Quito. Vamos a la plaza de Lloa.'],
  ['yaku',    'Tienen todas las claves. Los espero en la Casa Comunal: la comunidad debe decidir.'],
  ['quilla',  'La comunidad ya tomó su decisión. Puedes revisar tu bitácora o volver a jugar.'],
];

/* Evidencias académicas: se ganan en las misiones y se usan en la decisión final */
const EVIDENCIAS = {
  h1: { materia: 'Historia',     texto: 'Los sistemas hidráulicos incas combinaban reservorios elevados, canales de piedra y caídas escalonadas para regar laderas pronunciadas.', fuente: 'Lane et al., 2023' },
  h2: { materia: 'Historia',     texto: 'Con canales y terrazas, los incas aprovecharon terrenos montañosos y mejoraron la producción de alimentos.', fuente: 'Frogley et al., 2025' },
  b1: { materia: 'Biología',     texto: 'En Ecuador la papa se cultiva en suelos volcánicos con pendientes pronunciadas, pH de 6,4 a 6,7 y materia orgánica de 7,5 % a 8,4 %.', fuente: 'Gaibor et al., 2024' },
  b2: { materia: 'Biología',     texto: 'El exceso de nitrógeno es «consumo de lujo»: no mejora el rendimiento y causa pérdidas económicas y ambientales.', fuente: 'Gaibor et al., 2024' },
  b3: { materia: 'Biología',     texto: 'La papa es uno de los cultivos más importantes de Ecuador: consumo promedio de 26 kg por persona al año.', fuente: 'Gaibor et al., 2024' },
  f1: { materia: 'Física',       texto: 'Con la misma fuerza, más masa produce menos aceleración: mover más carga exige más fuerza (F = m·a).', fuente: 'Consulta: segunda ley de Newton' },
  f2: { materia: 'Física',       texto: 'En una superficie inclinada, el movimiento depende de la gravedad, la inclinación y la fricción.', fuente: 'Consulta: segunda ley de Newton' },
  m1: { materia: 'Matemáticas',  texto: 'De 18 ha, solo 13,5 ha son aprovechables al inicio: el 25 % tiene inclinación y erosión.', fuente: 'Ejercicio 1' },
  m2: { materia: 'Matemáticas',  texto: 'Una pendiente de 30 % requiere medidas de conservación como terrazas y barreras vegetales.', fuente: 'Ejercicio 2' },
  m3: { materia: 'Matemáticas',  texto: '12 ha × 22 t/ha con 12 % de pérdida por factores climáticos: 232,32 t para comercializar.', fuente: 'Ejercicio 4' },
  m4: { materia: 'Matemáticas',  texto: 'Un terreno con 22 % de pendiente produjo 29,17 % menos que uno con 8 % (la pendiente no es necesariamente la única causa).', fuente: 'Ejercicio 7' },
  m5: { materia: 'Matemáticas',  texto: 'Cinco cosechas: media de 20 t/ha y rango de 10 t/ha. La producción varía entre cosechas.', fuente: 'Ejercicio 8' },
  m6: { materia: 'Matemáticas',  texto: 'Con terrazas y conservación del suelo (+15 % en el terreno inclinado), 20 ha producen 390 t.', fuente: 'Ejercicio 10' },
  i1: { materia: 'Inglés',       texto: '“Our potato fields are far from the markets”: los campos de papa están lejos de los mercados.', fuente: 'Mensaje de radio' },
  e1: { materia: 'Emprendimiento', texto: 'Lloa vive principalmente de la agricultura, pero sus productores tienen acceso limitado a mercados directos.', fuente: 'Lugmaña, 2025' },
  e2: { materia: 'Emprendimiento', texto: 'Llevar 8 t de papa de Lloa a Quito cuesta 1.440 $ (0,18 $/kg; dos viajes de 720 $).', fuente: 'Ejercicio 3' },
  e3: { materia: 'Emprendimiento', texto: 'Fertilizar 8 ha requiere 56 sacos: una inversión de 1.792 $.', fuente: 'Ejercicio 6' },
  e4: { materia: 'Emprendimiento', texto: 'Vendiendo 30 t a 480 $/t: ingreso de 14.400 $, costo de 7.800 $ y ganancia de 6.600 $.', fuente: 'Ejercicio 9' },
};

/* ---------------------------------------------------------------------
   MISIONES (el orden de esta lista es el orden del juego)
   Tipos de reto disponibles:
   lectura · relacionar · clasificar · opcion · acertijo · numero
   medidor · carrito · imagen · escucha
   --------------------------------------------------------------------- */
const MISIONES = [
  /* ---------------- MISIÓN 1: HISTORIA ---------------- */
  {
    id: 'm1', numero: 'Misión 1', materia: 'Historia', titulo: 'El legado del agua', lugar: 'Andenes del Legado',
    fondo: 'andenes', icono: 'historia', guia: 'siyaj', mapa: { x: 17, y: 42 },
    intro: [
      ['quilla', 'Viajeros, soy Mama Quilla. Desde el cielo he visto a los pueblos de los Andes trabajar la tierra durante generaciones.'],
      ['yaku',   'Soy Yaku Camayoc. Fui ingeniero hidráulico, pero he olvidado mucho de lo que sabía sobre el agua y la papa. Sin ese conocimiento no puedo ayudar a Lloa.'],
      ['siyaj',  'Para eso estamos aquí. Estos andenes guardan la memoria de cómo los pueblos ancestrales aprovechaban la tierra. Empecemos por leer lo que dicen las investigaciones.'],
    ],
    retos: [
      {
        tipo: 'lectura', titulo: 'Pergamino de los andenes',
        instruccion: 'Lee con atención: lo necesitarás en los siguientes desafíos.',
        fuentes: [
          { cita: 'Frogley et al. (2025). Trees, terraces and llamas. Ambio.', texto: 'El sistema de riego fue fundamental para el desarrollo del Imperio inca, porque permitió transportar y distribuir el agua hacia los campos de cultivo. Mediante canales, terrazas agrícolas y técnicas de ingeniería hidráulica, los incas aprovecharon terrenos montañosos y mejoraron la producción de alimentos.' },
          { cita: 'Lane, Pomeroy y Davila (2023). WIREs Water, 10(3).', texto: '«Los sistemas hidráulicos incaicos integraban reservorios elevados, canales revestidos de piedra y caídas escalonadas que regulaban el caudal según la estación, maximizando la eficiencia del riego en laderas pronunciadas».' },
        ],
      },
      {
        tipo: 'relacionar', titulo: 'Reconstruye el sistema hidráulico',
        instruccion: 'Arrastra cada parte del sistema inca hasta la función que cumplía, desde la cima de la montaña hasta los cultivos. También puedes tocar una ficha y luego su lugar.',
        zonas: [
          { id: 'z1', texto: '1 · En la parte alta: almacenar el agua' },
          { id: 'z2', texto: '2 · Llevar el agua ladera abajo' },
          { id: 'z3', texto: '3 · Regular el caudal según la estación' },
          { id: 'z4', texto: '4 · Repartir el agua en la ladera sin erosionar los cultivos' },
        ],
        fichas: [
          { id: 'a', texto: 'Reservorio elevado', zona: 'z1' },
          { id: 'b', texto: 'Canal revestido de piedra', zona: 'z2' },
          { id: 'c', texto: 'Caídas escalonadas', zona: 'z3' },
          { id: 'd', texto: 'Andenes (terrazas agrícolas)', zona: 'z4' },
        ],
        ayuda: 'El agua se guarda arriba, se conduce, se regula y, al final, llega a los andenes. Vuelve a leer la cita de Lane et al.',
      },
      {
        tipo: 'opcion', titulo: '¿Por qué era tan importante el riego?',
        pregunta: 'Según Frogley et al. (2025), ¿por qué el sistema de riego fue fundamental para el Imperio inca?',
        opciones: [
          { texto: 'Permitió transportar y distribuir el agua hacia los campos y aprovechar los terrenos montañosos.', correcta: true },
          { texto: 'Sirvió solo para abastecer de agua a las ciudades.', fb: 'El texto habla de llevar agua a los campos de cultivo.' },
          { texto: 'Reemplazó la necesidad de cultivar en las montañas.', fb: 'Al contrario: permitió cultivar en terrenos montañosos.' },
        ],
        ayuda: 'Busca en el pergamino las palabras «transportar» y «distribuir».',
      },
      {
        tipo: 'acertijo', titulo: 'El acertijo de la montaña',
        pregunta: 'Somos escalones de tierra en la ladera. El agua baja por nosotros sin arrastrar los cultivos. ¿Quiénes somos?',
        respuestas: ['andenes', 'terrazas', 'terrazas agricolas', 'los andenes', 'las terrazas', 'anden', 'terraza'],
        ayuda: 'Los incas los construían en las montañas. Tienen dos nombres: uno empieza con «A» y otro con «T».',
      },
    ],
    cierre: [
      ['siyaj', '¡Lo lograste! Reservorios, canales y andenes formaban una sola gran obra de ingeniería.'],
      ['yaku',  'Ahora lo recuerdo: el agua se guardaba arriba, se conducía por canales de piedra y se repartía sin erosionar los cultivos.'],
      ['quilla', 'Guarda esta primera clave. Ahora baja al huerto: Ixkik, la guardiana de las semillas, te espera.'],
    ],
    recompensa: {
      clave: 'La tierra',
      pista: 'Donde hay pendiente, los pueblos andinos construían andenes. Recuérdalo cuando midas un terreno inclinado.',
      objeto: { nombre: 'Piedra del canal', desc: 'Un fragmento de canal revestido de piedra.' },
      evidencias: ['h1', 'h2'],
    },
  },

  /* ---------------- MISIÓN 2: BIOLOGÍA ---------------- */
  {
    id: 'm2', numero: 'Misión 2', materia: 'Biología', titulo: 'La vida en los Andes', lugar: 'Huerto de Ixkik',
    fondo: 'huerto', icono: 'biologia', guia: 'ixkik', mapa: { x: 30, y: 74 },
    intro: [
      ['ixkik', 'Bienvenido a mi huerto. Soy Ixkik: cuido las semillas y los saberes de la tierra.'],
      ['yaku',  'Necesito saber qué condiciones naturales permiten que la papa crezca bien. Sin eso, ninguna solución servirá.'],
      ['ixkik', 'Entonces escuchemos al suelo. Un estudio sobre suelos volcánicos de Ecuador nos dará las pistas.'],
    ],
    retos: [
      {
        tipo: 'lectura', titulo: 'El cuaderno de Ixkik',
        instruccion: 'Lee los hallazgos del estudio: los usarás en el laboratorio de suelo.',
        fuentes: [
          { cita: 'Gaibor, Espinosa y Cartagena (2024). Siembra, 11(2).', texto: '«La papa (S. tuberosum), con un consumo promedio de 26 kg persona⁻¹ año⁻¹, es uno de los cultivos más importantes de Ecuador (...) Mucho del N absorbido por la planta a altas dosis de aplicación del nutriente al suelo es consumo de lujo y no aporta al rendimiento».' },
          { cita: 'Paráfrasis del equipo', texto: 'En Ecuador, el cultivo de papa se desarrolla principalmente en suelos de origen volcánico con pendientes pronunciadas, pH ligeramente ácido (entre 6,4 y 6,7) y alto contenido de materia orgánica (7,5 % a 8,4 %). Un manejo inadecuado o excesivo de fertilizantes no mejora el rendimiento y genera pérdidas económicas y ambientales.' },
        ],
      },
      {
        tipo: 'medidor', titulo: 'Laboratorio de suelo',
        instruccion: 'Ajusta los medidores hasta reproducir el suelo volcánico descrito en el estudio. Luego pulsa «Comprobar».',
        controles: [
          { id: 'ph', etiqueta: 'pH del suelo', min: 4, max: 9, paso: 0.1, inicio: 5, objetivo: [6.4, 6.7], unidad: '' },
          { id: 'mo', etiqueta: 'Materia orgánica', min: 0, max: 12, paso: 0.1, inicio: 2, objetivo: [7.5, 8.4], unidad: '%' },
        ],
        ayuda: 'El estudio dice: pH ligeramente ácido entre 6,4 y 6,7, y materia orgánica entre 7,5 % y 8,4 %.',
      },
      {
        tipo: 'clasificar', titulo: '¿Verdad o mito?',
        instruccion: 'Clasifica cada afirmación según lo que dice el estudio de Gaibor et al. (2024).',
        zonas: [
          { id: 'v', texto: 'Lo afirma el estudio' },
          { id: 'f', texto: 'Es un mito' },
        ],
        fichas: [
          { id: 'a', texto: 'La papa se cultiva en suelos de origen volcánico.', zona: 'v' },
          { id: 'b', texto: 'Esos suelos suelen tener pendientes pronunciadas.', zona: 'v' },
          { id: 'c', texto: 'Más nitrógeno siempre produce más papa.', zona: 'f' },
          { id: 'd', texto: 'El exceso de fertilizante genera pérdidas económicas y ambientales.', zona: 'v' },
          { id: 'e', texto: 'La papa es un cultivo poco importante en Ecuador.', zona: 'f' },
          { id: 'g', texto: 'El suelo apto tiene poca materia orgánica.', zona: 'f' },
        ],
        ayuda: 'Recuerda el «consumo de lujo» y el consumo de 26 kg por persona al año.',
      },
      {
        tipo: 'numero', titulo: 'Mezcla experimental de sustrato',
        pregunta: 'Para preparar 500 kg de sustrato agrícola experimental se propone usar 50 % de tierra volcánica, 30 % de suelo arenoso y 20 % de materia orgánica. ¿Cuántos kilogramos de cada componente se necesitan?',
        campos: [
          { etiqueta: 'Tierra volcánica', respuesta: 250, unidad: 'kg' },
          { etiqueta: 'Suelo arenoso', respuesta: 150, unidad: 'kg' },
          { etiqueta: 'Materia orgánica', respuesta: 100, unidad: 'kg' },
        ],
        exito: 'Esta proporción es una mezcla experimental, no una receta universal: la composición adecuada se determina con un análisis del suelo.',
        ayuda: 'Multiplica 500 kg por cada porcentaje: 500 × 0,50; 500 × 0,30; 500 × 0,20.',
      },
      {
        tipo: 'opcion', titulo: 'El dilema del fertilizante',
        pregunta: 'Un vecino de Lloa quiere duplicar el nitrógeno que aplica para cosechar el doble de papa. ¿Qué le aconsejas?',
        opciones: [
          { texto: 'Hacer primero un análisis del suelo: el exceso de nitrógeno es consumo de lujo y no aumenta el rendimiento.', correcta: true },
          { texto: 'Duplicarlo: más nitrógeno siempre significa más papa.', fb: 'El estudio indica lo contrario: a dosis altas, el nitrógeno es «consumo de lujo».' },
          { texto: 'Aplicarlo sin medir, porque el suelo volcánico lo absorbe todo.', fb: 'Un manejo excesivo genera pérdidas económicas y ambientales.' },
        ],
        ayuda: 'Piensa en el «consumo de lujo» del cuaderno de Ixkik.',
      },
    ],
    cierre: [
      ['ixkik', 'Ahora conoces el suelo donde crece la papa: volcánico, ligeramente ácido y rico en materia orgánica.'],
      ['ixkik', 'Y recuerda: más fertilizante no siempre significa más cosecha. Cuidar la tierra también es cuidar la economía de las familias.'],
      ['yaku',  'Pero esos suelos están en pendientes pronunciadas... Mover las cosechas por esas laderas no es fácil.'],
      ['kinich', '¡Eso es lo mío! Te espero en el camino de la cosecha.'],
    ],
    recompensa: {
      clave: 'es el corazón',
      pista: 'Suelo para la papa: volcánico, pH 6,4–6,7 y materia orgánica de 7,5 % a 8,4 %. Te servirá para entender el mensaje de radio.',
      objeto: { nombre: 'Bolsa de semillas de Ixkik', desc: 'Semillas guardadas con cuidado por la guardiana.' },
      evidencias: ['b1', 'b2', 'b3'],
    },
  },

  /* ---------------- MISIÓN 3: FÍSICA ---------------- */
  {
    id: 'm3', numero: 'Misión 3', materia: 'Física', titulo: 'Transportar el agua', lugar: 'Camino de la cosecha',
    fondo: 'camino', icono: 'fisica', guia: 'kinich', mapa: { x: 47, y: 62 },
    intro: [
      ['kinich', '¡Hola! Soy K\'inich. Por este camino, los agricultores llevan sus sacos de papa en carritos hasta los lugares de recolección.'],
      ['kinich', 'Cada saco pesa y cada subida cuesta. Para entenderlo necesitamos la segunda ley de Newton.'],
      ['yaku',   'Fuerza, masa y aceleración... Ayúdame a recordar cómo se relacionan.'],
    ],
    retos: [
      {
        tipo: 'lectura', titulo: 'La ley del movimiento',
        instruccion: 'Repasa la segunda ley de Newton antes de mover el carrito.',
        formula: 'F = m · a',
        fuentes: [
          { cita: 'Consulta del equipo (Becerra Córdova, 2009)', texto: 'La aceleración que adquiere un cuerpo es directamente proporcional a la fuerza neta que se aplica sobre él e inversamente proporcional a su masa. F es la fuerza en newtons (N), m es la masa en kilogramos (kg) y a es la aceleración en metros por segundo al cuadrado (m/s²).' },
          { cita: 'Características', texto: 'La aceleración aumenta cuando aumenta la fuerza aplicada. La aceleración disminuye cuando aumenta la masa, si la fuerza se mantiene constante. Si la fuerza neta es cero, no existe aceleración.' },
        ],
      },
      {
        tipo: 'relacionar', titulo: 'Cada magnitud con su unidad',
        instruccion: 'Arrastra cada unidad hasta la magnitud que mide.',
        zonas: [
          { id: 'f', texto: 'Fuerza (F)' },
          { id: 'm', texto: 'Masa (m)' },
          { id: 'a', texto: 'Aceleración (a)' },
        ],
        fichas: [
          { id: 'n', texto: 'newtons (N)', zona: 'f' },
          { id: 'kg', texto: 'kilogramos (kg)', zona: 'm' },
          { id: 'ms', texto: 'metros por segundo al cuadrado (m/s²)', zona: 'a' },
        ],
        ayuda: 'La unidad de fuerza lleva el nombre de Isaac Newton.',
      },
      {
        tipo: 'carrito', titulo: 'Empuja el carrito',
        instruccion: 'El carrito de K\'inich tiene una masa de 20 kg. Ajusta la fuerza neta hasta que su aceleración sea de 5 m/s² y pulsa «Comprobar».',
        masa: 20, objetivo: 5, fmax: 200, fpaso: 10,
        ayuda: 'Despeja F en F = m · a: F = 20 kg × 5 m/s².',
      },
      {
        tipo: 'numero', titulo: 'El doble de carga',
        pregunta: 'K\'inich carga más sacos y el carrito llega a 40 kg (el doble). Si empuja con la misma fuerza neta de 100 N, ¿cuál será la aceleración?',
        campos: [{ etiqueta: 'Aceleración', respuesta: 2.5, unidad: 'm/s²' }],
        exito: 'Con el doble de masa y la misma fuerza, la aceleración se reduce a la mitad.',
        ayuda: 'a = F ÷ m = 100 N ÷ 40 kg.',
      },
      {
        tipo: 'relacionar', titulo: 'Causa y efecto',
        instruccion: 'Relaciona cada situación con lo que le ocurre a la aceleración.',
        zonas: [
          { id: 'z1', texto: 'Aumenta la fuerza y la masa no cambia' },
          { id: 'z2', texto: 'Aumenta la masa y la fuerza no cambia' },
          { id: 'z3', texto: 'La fuerza neta es cero' },
        ],
        fichas: [
          { id: 'a', texto: 'La aceleración aumenta', zona: 'z1' },
          { id: 'b', texto: 'La aceleración disminuye', zona: 'z2' },
          { id: 'c', texto: 'No existe aceleración', zona: 'z3' },
        ],
        ayuda: 'La aceleración es directamente proporcional a la fuerza e inversamente proporcional a la masa.',
      },
      {
        tipo: 'imagen', titulo: 'Lee el plano inclinado',
        instruccion: 'Los caminos de Lloa tienen pendientes. Observa el diagrama de un bloque sobre un plano inclinado y toca la fuerza que se pide.',
        img: 'assets/images/plano-inclinado.jpg', alt: 'Diagrama de un bloque sobre un plano inclinado con sus fuerzas: normal, peso, componentes del peso y fuerza de rozamiento.',
        puntos: [
          { id: 'N',  x: 50, y: 33, etiqueta: 'la fuerza normal (N)' },
          { id: 'p',  x: 50.5, y: 64, etiqueta: 'el peso (p)' },
          { id: 'Fr', x: 66, y: 46, etiqueta: 'la fuerza de rozamiento (Fr)' },
        ],
        pasos: ['N', 'p', 'Fr'],
        exito: 'En un plano inclinado, el movimiento depende de la gravedad, la inclinación y la fricción.',
        ayuda: 'La normal es perpendicular a la superficie; el peso apunta hacia abajo; el rozamiento va paralelo a la superficie.',
      },
    ],
    cierre: [
      ['kinich', '¡Excelente! A mayor carga, más fuerza se necesita para lograr la misma aceleración.'],
      ['yaku',   'Y en una pendiente, la gravedad, la inclinación y la fricción también influyen. Transportar en Lloa exige planificación.'],
      ['yuknoom', 'Ahora pongamos números a todo esto. Te espero en las parcelas.'],
    ],
    recompensa: {
      clave: 'que mantiene',
      pista: 'a = F ÷ m. Si la masa sube y la fuerza no cambia, la aceleración baja. Mover más cosecha exige más fuerza.',
      objeto: { nombre: 'Dinamómetro', desc: 'Instrumento para medir la fuerza, como en el experimento del carrito con agua.' },
      evidencias: ['f1', 'f2'],
    },
  },

  /* ---------------- MISIÓN 4: MATEMÁTICAS ---------------- */
  {
    id: 'm4', numero: 'Misión 4', materia: 'Matemáticas', titulo: 'El tiempo del agua', lugar: 'Parcelas de Yuknoom',
    fondo: 'parcelas', icono: 'matematicas', guia: 'yuknoom', mapa: { x: 61, y: 36 },
    intro: [
      ['yuknoom', 'Soy Yuknoom. Me gusta mirar el todo antes de decidir. Y para ver el todo, hay que calcular.'],
      ['yaku',    'Necesito saber cuánta papa pueden producir los terrenos de Lloa y cuánto influyen las pendientes.'],
      ['yuknoom', 'Cada resultado abre un candado de mi libreta. Ve con calma: un buen cálculo vale más que una respuesta rápida.'],
    ],
    retos: [
      {
        tipo: 'numero', titulo: 'Candado 1 · El área aprovechable',
        pregunta: 'Una comunidad de Lloa dispone de un terreno de 18 hectáreas, pero el 25 % presenta condiciones poco favorables por la inclinación y la erosión. ¿Cuántas hectáreas pueden usarse inicialmente para cultivar papa?',
        figura: 'terreno',
        campos: [{ etiqueta: 'Área aprovechable', respuesta: 13.5, unidad: 'ha' }],
        ayuda: 'Calcula el 25 % de 18 (18 × 0,25) y réstalo de 18.',
      },
      {
        tipo: 'numero', titulo: 'Candado 2 · La pendiente',
        pregunta: 'Un terreno agrícola de Lloa tiene una diferencia de altura de 36 m entre dos puntos separados horizontalmente por 120 m. ¿Cuál es el porcentaje de pendiente?',
        figura: 'pendiente',
        campos: [{ etiqueta: 'Pendiente', respuesta: 30, unidad: '%' }],
        ayuda: 'P = (36 ÷ 120) × 100.',
      },
      {
        tipo: 'opcion', titulo: '¿Qué significa ese 30 %?',
        pregunta: 'Una pendiente del 30 % es una inclinación considerable. ¿Qué implica para la producción de papa?',
        opciones: [
          { texto: 'Requiere medidas de conservación del suelo, como terrazas y barreras vegetales, para reducir la erosión.', correcta: true },
          { texto: 'No tiene ningún efecto: la papa crece igual en cualquier inclinación.', fb: 'Una pendiente considerable favorece la erosión del suelo.' },
          { texto: 'Obliga a abandonar el terreno.', fb: 'Hay alternativas: los pueblos andinos ya las usaban. Revisa tu pista de la Misión 1.' },
        ],
        ayuda: 'Consulta la pista de la Misión 1 en tu bitácora.',
      },
      {
        tipo: 'numero', titulo: 'Candado 3 · La cosecha comercializable',
        pregunta: 'Una asociación quiere cultivar papa en 12 hectáreas. Cada hectárea produce aproximadamente 22 toneladas, pero se estima una pérdida del 12 % por factores climáticos. ¿Cuántas toneladas podrán comercializarse?',
        campos: [{ etiqueta: 'Papa para vender', respuesta: 232.32, unidad: 't' }],
        ayuda: 'Producción total: 12 × 22. Pérdida: ese resultado × 0,12. Resta la pérdida.',
      },
      {
        tipo: 'numero', titulo: 'Candado 4 · Pendiente y productividad',
        pregunta: 'Dos terrenos de 4 ha cada uno: el A (pendiente de 8 %) produce 24 t/ha y el B (pendiente de 22 %) produce 17 t/ha. ¿En qué porcentaje es menor la producción total de B respecto de la de A?',
        campos: [{ etiqueta: 'Diferencia porcentual', respuesta: 29.17, unidad: '%', tol: 0.05 }],
        exito: 'B produce 29,17 % menos que A. Hay una diferencia de productividad, aunque esto no demuestra que la pendiente sea la única causa.',
        ayuda: 'A: 4 × 24. B: 4 × 17. Diferencia ÷ producción de A × 100.',
      },
      {
        tipo: 'relacionar', titulo: 'Candado 5 · Ordena las cosechas',
        instruccion: 'Una comunidad registró cinco cosechas (t/ha): 18, 22, 20, 25 y 15. Ordénalas de menor a mayor para encontrar la mediana.',
        zonas: [1, 2, 3, 4, 5].map(n => ({ id: 'p' + n, texto: n + '.º' })),
        fichas: [
          { id: 'a', texto: '18', zona: 'p2' }, { id: 'b', texto: '22', zona: 'p4' }, { id: 'c', texto: '20', zona: 'p3' },
          { id: 'd', texto: '25', zona: 'p5' }, { id: 'e', texto: '15', zona: 'p1' },
        ],
        compacto: true,
        ayuda: 'El valor más pequeño es 15 y el más grande, 25.',
      },
      {
        tipo: 'numero', titulo: 'Candado 6 · Estadística de la cosecha',
        pregunta: 'Con las cosechas 15, 18, 20, 22 y 25 t/ha, calcula la media aritmética, la mediana y el rango.',
        campos: [
          { etiqueta: 'Media', respuesta: 20, unidad: 't/ha' },
          { etiqueta: 'Mediana', respuesta: 20, unidad: 't/ha' },
          { etiqueta: 'Rango', respuesta: 10, unidad: 't/ha' },
        ],
        exito: 'La producción promedio es de 20 t/ha, pero hay una variación de 10 t/ha entre la cosecha más alta y la más baja.',
        ayuda: 'Media: suma ÷ 5. Mediana: el valor del centro. Rango: mayor − menor.',
      },
      {
        tipo: 'numero', titulo: 'Candado final · Terrazas que transforman',
        pregunta: 'Lloa dispone de 20 ha: 12 ha con pendiente moderada producen 21 t/ha y 8 ha más inclinadas producen 15 t/ha. Con terrazas y técnicas de conservación del suelo, la productividad del segundo terreno aumenta un 15 %. ¿Cuál será la producción total?',
        campos: [{ etiqueta: 'Producción total', respuesta: 390, unidad: 't' }],
        ayuda: '12 × 21 = 252. Luego 8 × 15 = 120, y 120 × 1,15. Suma ambos resultados.',
      },
    ],
    cierre: [
      ['yuknoom', 'Ya tienes los números: área aprovechable, pendiente, producción y estabilidad de las cosechas.'],
      ['yuknoom', 'Observa: con terrazas y conservación del suelo, la producción total llega a 390 toneladas.'],
      ['siyaj',   '¡Escuchen! Algo se oye desde la antena del cerro... ¡Es un mensaje en inglés!'],
    ],
    recompensa: {
      clave: 'viva',
      pista: 'Porcentaje = parte ÷ total × 100. Ganancia = ingreso − costo. Lo necesitarás en la plaza.',
      objeto: { nombre: 'Libreta de Yuknoom', desc: 'Llena de cálculos sobre los terrenos de Lloa.' },
      evidencias: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
    },
  },

  /* ---------------- RETO AUDITIVO DE INGLÉS ---------------- */
  {
    id: 'en', numero: 'Reto auditivo', materia: 'Inglés', titulo: 'Mensaje desde la antena', lugar: 'Antena del cerro',
    fondo: 'antena', icono: 'ingles', guia: 'siyaj', mapa: { x: 80, y: 26 },
    intro: [
      ['siyaj',  'La antena capta un mensaje de radio de los agricultores de Lloa. Está en inglés.'],
      ['quilla', 'Escúchalo con atención: contiene un dato que necesitarás en la plaza del mercado.'],
    ],
    retos: [
      {
        tipo: 'escucha', titulo: 'Listen to the farmers of Lloa',
        instruccion: 'Pulsa «Escuchar» (puedes repetirlo y bajar la velocidad). Luego responde las preguntas en inglés.',
        /* Si grabas el audio real, guárdalo en assets/audio/ y escribe aquí su ruta,
           por ejemplo 'assets/audio/mensaje-ingles.mp3'. Si queda vacío, el juego
           lee el guion en inglés con la voz del navegador. */
        audio: '',
        guion: 'Hello, travelers. This is a message from the farmers of Lloa. Our potato fields are far from the markets, and transportation is difficult. Potatoes grow well in volcanic soil with a lot of organic matter. Some of our land has a slope of thirty percent, so we need terraces to protect the soil. One hectare can produce about twenty-two tons of potatoes. But transport from Lloa to Quito costs zero point eighteen dollars per kilogram. Please, help Yaku Camayoc find a solution.',
        preguntas: [
          { tipo: 'opcion', pregunta: 'What type of soil is good for growing potatoes in Lloa?', opciones: ['Volcanic soil with a lot of organic matter', 'Sandy soil with no organic matter', 'Soil that is always under water'], correcta: 0 },
          { tipo: 'opcion', pregunta: 'How does the slope of the land affect potato production?', opciones: ['Slopes make potatoes grow faster', 'Farmers need terraces to protect the soil', 'The slope has no effect'], correcta: 1 },
          { tipo: 'numero', pregunta: 'How many tons of potatoes can farmers produce per hectare?', respuesta: 22, unidad: 'tons' },
          { tipo: 'numero', pregunta: 'How much does transport from Lloa to Quito cost per kilogram?', respuesta: 0.18, unidad: 'dollars' },
        ],
        ayuda: 'Escucha a velocidad lenta. Las respuestas aparecen en el mismo orden que las preguntas.',
      },
    ],
    cierre: [
      ['siyaj', 'Great job! El mensaje confirma lo que hemos aprendido y nos da la tarifa de transporte de Lloa a Quito: 0,18 dólares por kilogramo.'],
      ['yaku',  'Ese dato es clave. Vamos a la plaza: allí se decide si la papa llega o no al mercado.'],
    ],
    recompensa: {
      clave: 'a nuestra',
      pista: 'Tarifa de transporte Lloa–Quito: 0,18 $ por kilogramo. Úsala en la plaza.',
      objeto: { nombre: 'Radio de la antena', desc: 'Capta mensajes de los agricultores de Lloa.' },
      evidencias: ['i1'],
    },
  },

  /* ---------------- MISIÓN 5: EMPRENDIMIENTO Y GESTIÓN ---------------- */
  {
    id: 'm5', numero: 'Misión 5', materia: 'Emprendimiento y Gestión', titulo: 'Una solución para la comunidad', lugar: 'Plaza de Lloa',
    fondo: 'plaza', icono: 'emprendimiento', guia: 'siyaj', mapa: { x: 79, y: 80 },
    intro: [
      ['siyaj',   'Esta es la plaza de Lloa. Aquí se nota el problema: la cosecha existe, pero llegar al mercado es otra historia.'],
      ['yaku',    'Debemos analizar la comercialización: costos, mercados y ganancias. Sin esos datos no podremos proponer nada viable.'],
      ['yuknoom', 'Usa las pistas que reuniste. La tarifa del mensaje de radio te servirá.'],
    ],
    retos: [
      {
        tipo: 'lectura', titulo: 'Lo que viven los productores',
        instruccion: 'Lee el diagnóstico de la parroquia de Lloa.',
        fuentes: [
          { cita: 'Lugmaña (2025). Tesis de pregrado, UNACH.', texto: '«La parroquia de Lloa ubicada en el cantón Quito, vive principalmente de la agricultura [...] sin embargo, los productores enfrentan limitaciones en la gestión comercial y en el acceso a mercados directos».' },
          { cita: 'Paráfrasis del equipo', texto: 'Los agricultores de Lloa sufren un marcado alejamiento de los canales formales de comercialización, lo que dificulta la venta justa de sus cosechas y frena el desarrollo productivo. El aislamiento no es solo geográfico o vial: también es comercial y de apoyo institucional.' },
        ],
      },
      {
        tipo: 'clasificar', titulo: 'Diagnóstico de la comercialización',
        instruccion: 'Separa los problemas que describe el estudio de las afirmaciones que no corresponden.',
        zonas: [
          { id: 'si', texto: 'Problema descrito por el estudio' },
          { id: 'no', texto: 'No corresponde' },
        ],
        fichas: [
          { id: 'a', texto: 'Limitaciones en la gestión comercial', zona: 'si' },
          { id: 'b', texto: 'Acceso limitado a mercados directos', zona: 'si' },
          { id: 'c', texto: 'Dificultad para lograr una venta justa', zona: 'si' },
          { id: 'd', texto: 'Aislamiento comercial e institucional', zona: 'si' },
          { id: 'e', texto: 'Lloa no depende de la agricultura', zona: 'no' },
          { id: 'g', texto: 'Los agricultores venden sin problema en todos los mercados', zona: 'no' },
        ],
        ayuda: 'El estudio dice que Lloa vive principalmente de la agricultura.',
      },
      {
        tipo: 'numero', titulo: 'El costo del traslado',
        pregunta: 'La comunidad necesita transportar 8 toneladas de papa desde Lloa hasta Quito, en dos viajes iguales. Usa la tarifa por kilogramo del mensaje de radio. ¿Cuánto cuesta cada viaje y cuál es el costo total?',
        campos: [
          { etiqueta: 'Costo por viaje', respuesta: 720, unidad: '$' },
          { etiqueta: 'Costo total', respuesta: 1440, unidad: '$' },
        ],
        ayuda: '8 toneladas = 8.000 kg. Multiplica por 0,18 $/kg y divide entre dos viajes.',
      },
      {
        tipo: 'numero', titulo: 'Inversión en fertilizante',
        pregunta: 'Para fertilizar 8 ha, la recomendación técnica (basada en un análisis del suelo) es usar 350 kg de fertilizante por hectárea. Cada saco contiene 50 kg y cuesta 32 $. ¿Cuántos sacos se compran y cuál es la inversión?',
        campos: [
          { etiqueta: 'Sacos', respuesta: 56, unidad: 'sacos' },
          { etiqueta: 'Inversión', respuesta: 1792, unidad: '$' },
        ],
        ayuda: '8 × 350 kg; luego ÷ 50 kg por saco; luego × 32 $.',
      },
      {
        tipo: 'numero', titulo: 'Ingreso, costo y ganancia',
        pregunta: 'Una asociación vende cada tonelada de papa a 480 $. Sus costos de producción y transporte son C(x) = 180x + 2.400, donde x son las toneladas. Explora la gráfica y calcula los valores para x = 30 t.',
        figura: 'funcion',
        campos: [
          { etiqueta: 'Ingreso I(30)', respuesta: 14400, unidad: '$' },
          { etiqueta: 'Costo C(30)', respuesta: 7800, unidad: '$' },
          { etiqueta: 'Ganancia', respuesta: 6600, unidad: '$' },
        ],
        exito: 'Vendiendo 30 t, la asociación obtiene 14.400 $ de ingreso, 7.800 $ de costo y 6.600 $ de ganancia.',
        ayuda: 'I(x) = 480x. Ganancia = I(30) − C(30). Consulta la pista de la Misión 4.',
      },
    ],
    cierre: [
      ['siyaj',  'Ahora tienes la visión completa: historia, suelo, fuerza, números y mercado.'],
      ['yaku',   'Con todo esto, la comunidad puede comparar dos caminos: extender un canal o crear un servicio de traslado.'],
      ['quilla', 'Reúne tus claves. La puerta de la Casa Comunal solo se abre con el mensaje completo.'],
    ],
    recompensa: {
      clave: 'comunidad',
      pista: 'El problema de Lloa tiene dos caras: producir la papa y lograr venderla. Compara cómo responde cada alternativa a ambas.',
      objeto: { nombre: 'Balanza del mercado', desc: 'Para pesar las cosechas antes de venderlas.' },
      evidencias: ['e1', 'e2', 'e3', 'e4'],
    },
  },
];

/* Puerta de la Casa Comunal: se ordenan las claves de las seis etapas */
const PUERTA = {
  titulo: 'La puerta de la Casa Comunal',
  instruccion: 'Cada etapa te entregó un fragmento del mensaje de Mama Quilla. Ordénalos para abrir la puerta.',
  orden: ['m1', 'm2', 'm3', 'm4', 'en', 'm5'],
};

/* Las dos alternativas de la decisión final */
const OPCIONES = {
  canal: {
    letra: 'A', nombre: 'Extensión de un canal', color: 'agua',
    idea: 'Ampliar la conducción de agua hacia los terrenos de cultivo de papa.',
    datos: [
      'Los incas usaron reservorios, canales de piedra y caídas escalonadas para regar laderas pronunciadas (Lane et al., 2023).',
      'Con canales y terrazas aprovecharon terrenos montañosos y mejoraron la producción (Frogley et al., 2025).',
      'Una pendiente de 30 % requiere terrazas y barreras vegetales (Matemáticas, ej. 2).',
      'Con terrazas y conservación del suelo, el terreno inclinado mejora un 15 % y 20 ha llegan a 390 t (Matemáticas, ej. 10).',
      'Se estima una pérdida de 12 % de la cosecha por factores climáticos (Matemáticas, ej. 4).',
    ],
    vacios: [
      'Los documentos no indican el costo de construir o extender un canal.',
      'No hay datos de caudal ni del tiempo de llegada del agua.',
    ],
  },
  traslado: {
    letra: 'B', nombre: 'Servicio de traslado', color: 'tierra',
    idea: 'Organizar un servicio que lleve las cosechas de papa desde los terrenos hasta los mercados.',
    datos: [
      'Llevar 8 t de Lloa a Quito cuesta 1.440 $ (0,18 $/kg; dos viajes de 720 $) (Matemáticas, ej. 3).',
      'Vendiendo 30 t a 480 $/t, la ganancia es de 6.600 $, ya descontados los costos de producción y transporte (Matemáticas, ej. 9).',
      'Los productores tienen acceso limitado a mercados directos y dificultades para una venta justa (Lugmaña, 2025).',
      'Más carga exige más fuerza, y en las pendientes influyen la gravedad, la inclinación y la fricción (Física).',
    ],
    vacios: [
      'Los documentos solo mencionan Quito como destino; no nombran compradores específicos.',
      'No se indica la distancia en kilómetros hasta los mercados ni el costo de un vehículo.',
    ],
  },
};

/* Criterios de la tabla comparativa (Alta = más favorable) */
const CRITERIOS = [
  { id: 'utilidad',   nombre: 'Utilidad',            pregunta: '¿Qué tanto responde al problema de Lloa?' },
  { id: 'recursos',   nombre: 'Recursos necesarios', pregunta: '¿Qué tan disponibles están los recursos que necesita?' },
  { id: 'costos',     nombre: 'Costos',              pregunta: '¿Qué tan asumibles son sus costos?' },
  { id: 'viabilidad', nombre: 'Viabilidad',          pregunta: '¿Qué tan posible es implementarla?' },
  { id: 'beneficios', nombre: 'Beneficios',          pregunta: '¿Cuánto mejora la producción o la venta de papa?' },
  { id: 'limites',    nombre: 'Limitaciones',        pregunta: '¿Qué tan manejables son sus limitaciones?' },
  { id: 'necesidades', nombre: 'Necesidades de la comunidad', pregunta: '¿Qué tanto se ajusta a lo que necesitan las familias?' },
];

const MIN_JUSTIFICACION = 150;   // caracteres mínimos de la justificación escrita
const MIN_EVIDENCIAS_USADAS = 2; // evidencias que deben respaldar la decisión
const MIN_EVIDENCIAS_ORDENADAS = 6;

/* Desenlace: reacción de los personajes según la alternativa elegida */
const DESENLACE = {
  canal: [
    ['ixkik',  'Si el agua llega mejor a las laderas, la tierra podrá dar más. Pero habrá que cuidar el suelo con terrazas, como hacían nuestros antepasados.'],
    ['kinich', '¡Un canal se construye entre todos! Con organización, cada familia puede aportar su trabajo.'],
  ],
  traslado: [
    ['ixkik',  'Si las cosechas llegan al mercado, el esfuerzo de cada familia no se perderá en el camino.'],
    ['kinich', '¡Un servicio de traslado necesita organización! Si las familias se unen, cada viaje rinde más.'],
  ],
  comun: [
    ['yuknoom', 'Ninguna alternativa es perfecta. La suya se apoya en datos, y por eso podemos revisarla y mejorarla juntos.'],
    ['siyaj',   'Lo que aprendimos en cada misión ahora pertenece a la comunidad.'],
    ['yaku',    'Recuperé lo que había olvidado gracias a ustedes. El conocimiento, compartido, vale el doble.'],
    ['quilla',  'Desde el cielo lo he visto todo. Recuérdenlo siempre: la tierra es el corazón que mantiene viva a nuestra comunidad.'],
  ],
};

const REFLEXION = 'La agricultura de Lloa necesita organización, colaboración, conocimiento y soluciones bien pensadas. Cuando una comunidad investiga, compara alternativas y decide con argumentos, puede superar las dificultades que la separan del mercado.';
const METAFORA = 'La tierra es el corazón que mantiene viva a nuestra comunidad.';

/* =====================================================================
   2) MOTOR DEL JUEGO
   ===================================================================== */

const CLAVE_GUARDADO = 'misionLloa.v1';
const ORDEN = [...MISIONES.map(m => m.id), 'final']; // 7 lugares del mapa
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const mision = id => MISIONES.find(m => m.id === id);
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Estado y guardado (localStorage) ---------- */
function estadoNuevo() {
  return {
    pantalla: 'inicio', hechas: [], paso: {}, sonido: true,
    puerta: false, final: { ubicacion: {}, criterios: {}, eleccion: null, usadas: [], texto: '' },
    terminado: false,
  };
}
let S = cargar();
function cargar() {
  try { return Object.assign(estadoNuevo(), JSON.parse(localStorage.getItem(CLAVE_GUARDADO)) || {}); }
  catch { return estadoNuevo(); }
}
function guardar() {
  try { localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(S)); } catch { /* sin almacenamiento: el juego sigue en memoria */ }
}
const haySave = () => { try { return !!localStorage.getItem(CLAVE_GUARDADO); } catch { return false; } };
const completada = id => S.hechas.includes(id);
const desbloqueada = id => ORDEN.indexOf(id) <= S.hechas.length;
const evidenciasGanadas = () => MISIONES.filter(m => completada(m.id)).flatMap(m => m.recompensa.evidencias);

/* ---------- Iconos de interfaz (SVG en línea, toman el color del texto) ---------- */
const ICONO = {
  mapa: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14"/>',
  bitacora: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h11"/>',
  sonido: '<path d="M4 9v6h4l5 4V5L8 9H4Zm12.5-.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  silencio: '<path d="M4 9v6h4l5 4V5L8 9H4Zm12 0 5 6m0-6-5 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  llave: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 2 2m-4 0 2 2"/>',
  pista: '<path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"/>',
  evidencia: '<path d="M12 3 4 7v5c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V7l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
  objeto: '<path d="M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0"/>',
  candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  abierto: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  ayuda: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
  play: '<path d="M7 4v16l13-8L7 4Z"/>',
  pausa: '<path d="M8 5v14M16 5v14"/>',
  repetir: '<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/>',
  flecha: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  estrella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
};
const icono = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONO[n]}</svg>`;

/* Escapa texto antes de insertarlo como HTML (la justificación la escribe el jugador) */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const normalizar = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, '').replace(/\s+/g, ' ').trim();

/* Acepta números escritos con coma o punto decimal y separadores de miles (1.440 · 1,440 · 232,32 · 2.5) */
function aceptaNumero(texto, esperado, tol = 0.01) {
  const s = String(texto).replace(/[^\d.,]/g, '');
  if (!/\d/.test(s)) return false;
  const lecturas = [
    s.replace(/\./g, '').replace(',', '.'), // coma decimal (uso en Ecuador)
    s.replace(/,/g, ''),                    // punto decimal
  ].map(Number).filter(n => !Number.isNaN(n));
  return lecturas.some(n => Math.abs(n - esperado) <= tol);
}

/* ---------- Sonido: efectos y ambiente generados con Web Audio (sin archivos) ---------- */
const Sonido = {
  ctx: null, ambienteTimer: null,
  iniciar() {
    if (this.ctx || !S.sonido) return;
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return; }
    this.ambiente();
  },
  nota(frec, dur = 0.5, vol = 0.08, tipo = 'sine', retraso = 0) {
    if (!this.ctx || !S.sonido) return;
    const t = this.ctx.currentTime + retraso, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = tipo; o.frequency.value = frec;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.08, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  },
  clic() { this.nota(660, 0.08, 0.04, 'triangle'); },
  error() { this.nota(196, 0.25, 0.07, 'triangle'); this.nota(147, 0.3, 0.06, 'triangle', 0.08); },
  exito() { [440, 523, 659, 880].forEach((f, i) => this.nota(f, 0.5, 0.06, 'sine', i * 0.09)); },
  logro() { [392, 494, 587, 784, 988].forEach((f, i) => this.nota(f, 0.9, 0.06, 'triangle', i * 0.12)); },
  // Ambiente: notas suaves de una escala pentatónica andina, espaciadas al azar
  ambiente() {
    clearTimeout(this.ambienteTimer);
    const escala = [220, 261.6, 293.7, 329.6, 392, 440, 523.3];
    const tocar = () => {
      if (S.sonido && document.visibilityState === 'visible') this.nota(escala[Math.floor(Math.random() * escala.length)], 3.2, 0.025, 'sine');
      this.ambienteTimer = setTimeout(tocar, 2200 + Math.random() * 2600);
    };
    tocar();
  },
  alternar() {
    S.sonido = !S.sonido; guardar();
    if (S.sonido) { this.iniciar(); this.ctx?.resume(); } else { speechSynthesis?.cancel(); }
    actualizarHud();
  },
};

/* Voz del navegador (narración de la intro y audio de inglés si no hay grabación) */
function hablar(texto, idioma = 'es-ES', velocidad = 1, alTerminar) {
  if (!('speechSynthesis' in window)) { alTerminar?.(); return false; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = idioma; u.rate = velocidad;
  const voz = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').startsWith(idioma.slice(0, 2)));
  if (voz) u.voice = voz;
  u.onend = u.onerror = () => alTerminar?.();
  speechSynthesis.speak(u);
  return true;
}

/* ---------- Fondo con fundido entre escenarios ---------- */
let fondoActual = null;
function ponerFondo(nombre) {
  if (nombre === fondoActual) return;
  fondoActual = nombre;
  const a = $('#fondo-a'), b = $('#fondo-b');
  const [visible, oculto] = a.classList.contains('visible') ? [a, b] : [b, a];
  oculto.src = `assets/backgrounds/${nombre}.svg`;
  oculto.classList.add('visible'); visible.classList.remove('visible');
}

/* ---------- Navegación entre pantallas ---------- */
const PANTALLAS = {};
let transicionando = false;
async function ir(pantalla, { guardarEstado = true } = {}) {
  if (transicionando) return;
  transicionando = true;
  speechSynthesis?.cancel();
  const cortina = $('#cortina');
  cortina.classList.add('activa');
  await esperar(reducirMovimiento ? 0 : 320);
  if (guardarEstado) { S.pantalla = pantalla; guardar(); }
  const [nombre, arg] = pantalla.split(':');
  const main = $('#pantalla');
  main.innerHTML = ''; main.className = 'pantalla pantalla-' + nombre;
  main.scrollTop = 0;
  $('#hud').hidden = ['inicio', 'intro', 'personajes'].includes(nombre);
  actualizarHud();
  PANTALLAS[nombre](main, arg);
  cortina.classList.remove('activa');
  transicionando = false;
}
const esperar = ms => new Promise(r => setTimeout(r, ms));
const html = (s) => { const t = document.createElement('template'); t.innerHTML = s.trim(); return t.content.firstElementChild; };

/* ---------- Barra superior ---------- */
function actualizarHud() {
  const total = ORDEN.length, hechos = S.hechas.length + (S.terminado ? 1 : 0);
  $('#barra-relleno').style.transform = `scaleX(${hechos / total})`;
  $('#progreso-texto').textContent = `${hechos} / ${total}`;
  document.querySelectorAll('#hud [data-accion]').forEach(b => {
    const n = b.dataset.accion === 'sonido' ? (S.sonido ? 'sonido' : 'silencio') : b.dataset.accion;
    b.innerHTML = icono(n);
    if (b.dataset.accion === 'sonido') b.setAttribute('aria-pressed', S.sonido);
  });
}
$('#hud').addEventListener('click', e => {
  const b = e.target.closest('[data-accion]'); if (!b) return;
  Sonido.clic();
  const acc = b.dataset.accion;
  if (acc === 'mapa') ir('mapa');
  if (acc === 'bitacora') abrirBitacora();
  if (acc === 'sonido') Sonido.alternar();
  if (acc === 'menu') abrirMenu();
});

/* ---------- Notificaciones ---------- */
function aviso(texto, tipo = 'logro', ico = 'check') {
  const t = html(`<div class="toast toast-${tipo}" role="status">${icono(ico)}<span>${esc(texto)}</span></div>`);
  $('#toasts').append(t);
  setTimeout(() => { t.classList.add('saliendo'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---------- Ventanas modales ---------- */
let modalAnterior = null;
function abrirModal(contenido, { cerrable = true } = {}) {
  const m = $('#modal');
  modalAnterior = document.activeElement;
  m.innerHTML = '';
  const caja = html(`<div class="modal-caja panel" role="dialog" aria-modal="true"></div>`);
  if (cerrable) caja.append(html(`<button class="modal-cerrar btn-icono" aria-label="Cerrar">×</button>`));
  caja.append(contenido);
  m.append(caja); m.hidden = false;
  requestAnimationFrame(() => m.classList.add('abierto'));
  (caja.querySelector('[autofocus]') || caja.querySelector('button'))?.focus();
  return new Promise(resolve => {
    m._cerrar = valor => {
      m.classList.remove('abierto');
      setTimeout(() => { m.hidden = true; m.innerHTML = ''; }, reducirMovimiento ? 0 : 200);
      modalAnterior?.focus?.();
      m._cerrar = null; resolve(valor);
    };
  });
}
const cerrarModal = v => $('#modal')._cerrar?.(v);
$('#modal').addEventListener('click', e => {
  if (e.target.id === 'modal' || e.target.closest('.modal-cerrar')) { if ($('.modal-cerrar')) cerrarModal(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#modal').hidden && $('.modal-cerrar')) cerrarModal();
});

/* =====================================================================
   SISTEMA DE DIÁLOGOS (texto progresivo, retrato y botón para continuar)
   ===================================================================== */
async function dialogo(lineas) {
  const caja = $('#dialogo'), texto = $('#dialogo-texto'), seguir = $('#dialogo-seguir'), saltar = $('#dialogo-saltar');
  caja.hidden = false;
  requestAnimationFrame(() => caja.classList.add('abierto'));
  let saltado = false;
  saltar.onclick = () => { saltado = true; seguir.click(); };
  for (const [quien, frase] of lineas) {
    if (saltado) break;
    const p = PERSONAJES[quien];
    $('#dialogo-retrato').src = p.img; $('#dialogo-retrato').alt = p.nombre;
    $('#dialogo-nombre').textContent = p.nombre;
    caja.dataset.quien = quien;
    const retrato = $('#dialogo-retrato');
    retrato.classList.remove('entra'); void retrato.offsetWidth; retrato.classList.add('entra');
    await escribir(texto, frase, seguir);
  }
  caja.classList.remove('abierto');
  await esperar(reducirMovimiento ? 0 : 200);
  caja.hidden = true;
}
/* Escribe el texto letra por letra; el primer clic completa la frase, el segundo continúa */
function escribir(el, frase, boton) {
  return new Promise(resolve => {
    let i = 0, completo = false;
    el.textContent = '';
    boton.textContent = 'Continuar';
    const terminar = () => { completo = true; clearInterval(timer); el.textContent = frase; $('#dialogo').classList.add('listo'); };
    $('#dialogo').classList.remove('listo');
    const timer = setInterval(() => {
      i += 2; el.textContent = frase.slice(0, i);
      if (i >= frase.length) terminar();
    }, reducirMovimiento ? 1 : 22);
    const avanzar = () => {
      if (!completo) { terminar(); return; }
      boton.onclick = null; document.removeEventListener('keydown', tecla);
      Sonido.clic(); resolve();
    };
    const tecla = e => { if ((e.key === 'Enter' || e.key === ' ') && $('#modal').hidden && document.activeElement !== $('#dialogo-saltar')) { e.preventDefault(); avanzar(); } };
    boton.onclick = avanzar;
    document.addEventListener('keydown', tecla);
    boton.focus({ preventScroll: true });
  });
}

/* =====================================================================
   PANTALLAS
   ===================================================================== */

/* 1. Pantalla de inicio */
PANTALLAS.inicio = main => {
  ponerFondo('inicio');
  const conPartida = haySave() && (S.hechas.length > 0 || S.pantalla !== 'inicio');
  main.append(html(`
    <section class="inicio">
      <img class="inicio-escudo" src="assets/images/escudo.png" alt="Escudo de la U.E. San Andrés Quitumbe" width="96" height="96">
      <p class="inicio-colegio">Unidad Educativa Franciscana San Andrés Quitumbe</p>
      <h1 class="inicio-titulo">Misión Lloa</h1>
      <p class="inicio-subtitulo">yaku kamachikkuna</p>
      <p class="inicio-lema">Ayuda a Yaku Camayoc y a los agricultores de papa de Lloa, Pichincha, a encontrar una solución para su comunidad.</p>
      <div class="inicio-botones">
        ${conPartida ? `<button class="btn btn-oro btn-grande" data-ir="continuar">${icono('flecha')} Continuar aventura</button>` : ''}
        <button class="btn ${conPartida ? 'btn-claro' : 'btn-oro btn-grande'}" data-ir="nueva">${conPartida ? 'Nueva partida' : icono('flecha') + ' Comenzar aventura'}</button>
      </div>
      <p class="inicio-nota">Tercero de Bachillerato · Escape room interdisciplinario</p>
    </section>`));
  main.querySelector('[data-ir="continuar"]')?.addEventListener('click', () => {
    Sonido.iniciar(); Sonido.clic();
    const p = S.pantalla;
    ir(!p || p === 'inicio' || p === 'intro' || p === 'personajes' ? 'mapa' : p);
  });
  main.querySelector('[data-ir="nueva"]').addEventListener('click', async () => {
    Sonido.iniciar(); Sonido.clic();
    if (conPartida && !(await confirmar('¿Empezar una nueva partida? Se borrará el progreso guardado.'))) return;
    S = estadoNuevo(); guardar(); ir('intro');
  });
};

/* 2. Introducción cinematográfica */
PANTALLAS.intro = main => {
  let i = 0, timer;
  const nodo = html(`
    <section class="cine">
      <div class="cine-banda"></div>
      <div class="cine-texto">
        <img class="cine-retrato" src="${PERSONAJES.quilla.img}" alt="Mama Quilla">
        <p id="cine-frase" aria-live="polite"></p>
      </div>
      <div class="cine-controles">
        <div class="cine-puntos">${INTRO.map(() => '<span></span>').join('')}</div>
        <button class="btn btn-texto" id="cine-saltar">Saltar introducción</button>
        <button class="btn btn-oro" id="cine-seguir">Continuar</button>
      </div>
      <div class="cine-banda abajo"></div>
    </section>`);
  main.append(nodo);
  const frase = $('#cine-frase', nodo);
  const mostrar = () => {
    clearTimeout(timer);
    const panel = INTRO[i];
    ponerFondo(panel.fondo);
    frase.classList.remove('entra'); void frase.offsetWidth; frase.classList.add('entra');
    frase.textContent = panel.texto;
    nodo.querySelectorAll('.cine-puntos span').forEach((s, k) => s.classList.toggle('activo', k === i));
    if (S.sonido) hablar(panel.texto, 'es-ES', 0.95);
  };
  const seguir = () => { Sonido.clic(); if (++i < INTRO.length) mostrar(); else ir('personajes'); };
  $('#cine-seguir', nodo).addEventListener('click', seguir);
  $('#cine-saltar', nodo).addEventListener('click', () => ir('personajes'));
  mostrar();
  $('#cine-seguir', nodo).focus();
};

/* 3. Presentación de los personajes */
PANTALLAS.personajes = main => {
  ponerFondo('inicio');
  const orden = ['yaku', 'quilla', 'siyaj', 'yuknoom', 'kinich', 'ixkik'];
  main.append(html(`
    <section class="presentacion">
      <h2 class="titulo-seccion">Quienes te acompañan</h2>
      <p class="subtitulo-seccion">Toca cada retrato para escuchar su saludo.</p>
      <div class="tarjetas-personajes">
        ${orden.map(id => {
          const p = PERSONAJES[id];
          return `<button class="tarjeta-personaje" data-id="${id}">
            <img src="${p.img}" alt="">
            <span class="tp-nombre">${p.nombre}</span>
            <span class="tp-ref">${p.ref}</span>
            <span class="tp-rol">${p.rol}</span>
            <span class="tp-pers">${p.personalidad}</span>
          </button>`;
        }).join('')}
      </div>
      <button class="btn btn-oro btn-grande" id="al-mapa">${icono('mapa')} Abrir el mapa de Lloa</button>
    </section>`));
  const saludos = {
    yaku: 'Gracias por venir, viajeros. Sin ustedes no podré recordar lo que Lloa necesita.',
    quilla: 'Los observaré desde el cielo y los guiaré en cada paso.',
    siyaj: 'Yo seré tu guía. ¡Hay mucho por explorar!',
    yuknoom: 'Te ayudaré a interpretar la información. Pensar con calma es nuestra mejor herramienta.',
    kinich: '¡Cuando el camino se ponga difícil, ahí estaré con energía y pistas!',
    ixkik: 'Cuido las semillas y los saberes agrícolas. Te enseñaré a escuchar a la tierra.',
  };
  main.querySelectorAll('.tarjeta-personaje').forEach(b => b.addEventListener('click', () => dialogo([[b.dataset.id, saludos[b.dataset.id]]])));
  $('#al-mapa', main).addEventListener('click', () => { Sonido.clic(); ir('mapa'); });
};

/* 4. Mapa principal de exploración */
PANTALLAS.mapa = main => {
  ponerFondo('inicio');
  const lugares = [...MISIONES.map(m => ({ id: m.id, nombre: m.lugar, sub: `${m.numero} · ${m.materia}`, icono: m.icono, ...m.mapa })),
                   { id: 'final', nombre: 'Casa Comunal', sub: 'Decisión final', icono: 'asamblea', x: 91, y: 54 }];
  const avance = S.hechas.length;
  const puntos = lugares.map(l => `${l.x * 16},${l.y * 10}`);
  const nodo = html(`
    <section class="mapa-pantalla">
      <div class="mapa-cabecera">
        <h2 class="titulo-seccion">Mapa de Lloa</h2>
        <p class="subtitulo-seccion">${avance < ORDEN.length ? 'Elige un lugar desbloqueado. Los candados se abren al completar la etapa anterior.' : 'Has recorrido todo Lloa.'}</p>
      </div>
      <div class="mapa-marco">
        <div class="mapa-lienzo">
          <img src="assets/backgrounds/mapa.svg" alt="Mapa ilustrado de Lloa con volcán, río, caminos y parcelas">
          <svg class="mapa-ruta" viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="${puntos.join(' ')}" class="ruta-pendiente"/>
            <polyline points="${puntos.slice(0, Math.min(avance + 1, puntos.length)).join(' ')}" class="ruta-hecha"/>
          </svg>
          ${lugares.map((l, i) => {
            const hecho = l.id === 'final' ? S.terminado : completada(l.id);
            const abierto = desbloqueada(l.id);
            const estado = hecho ? 'hecho' : abierto ? 'abierto' : 'cerrado';
            return `<button class="lugar lugar-${estado}" style="left:${l.x}%;top:${l.y}%" data-id="${l.id}" aria-label="${l.nombre}, ${l.sub}${estado === 'cerrado' ? ', bloqueado' : estado === 'hecho' ? ', completado' : ''}">
              <span class="lugar-insignia"><img src="assets/icons/${l.icono}.svg" alt="">${estado === 'cerrado' ? `<span class="lugar-candado">${icono('candado')}</span>` : ''}${hecho ? `<span class="lugar-check">${icono('check')}</span>` : ''}</span>
              <span class="lugar-texto"><b>${l.nombre}</b><small>${l.sub}</small></span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </section>`);
  main.append(nodo);
  nodo.querySelectorAll('.lugar').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    if (!desbloqueada(id)) {
      Sonido.error();
      const previo = ORDEN[ORDEN.indexOf(id) - 1];
      aviso(`Bloqueado: primero completa «${previo === 'final' ? 'Casa Comunal' : mision(previo).lugar}».`, 'error', 'candado');
      return;
    }
    Sonido.clic();
    if (id === 'final') ir(S.terminado ? 'fin' : S.puerta ? 'sala' : 'puerta');
    else ir('mision:' + id);
  }));
  // En pantallas angostas, centra el mapa en el próximo lugar por visitar
  const siguiente = nodo.querySelector('.lugar-abierto') || nodo.querySelector('.lugar');
  requestAnimationFrame(() => { const marco = $('.mapa-marco', nodo); marco.scrollLeft = siguiente.offsetLeft - marco.clientWidth / 2; });
  const [quien, frase] = MAPA_DIALOGOS[Math.min(avance + (S.terminado ? 1 : 0), MAPA_DIALOGOS.length - 1)];
  if (S.vistoMapa !== avance) { S.vistoMapa = avance; guardar(); setTimeout(() => dialogo([[quien, frase]]), reducirMovimiento ? 0 : 450); }
  else nodo.append(html(`<button class="mapa-guia" aria-label="Escuchar a ${PERSONAJES[quien].nombre}"><img src="${PERSONAJES[quien].img}" alt=""><span>${esc(frase)}</span></button>`));
  nodo.querySelector('.mapa-guia')?.addEventListener('click', () => dialogo([[quien, frase]]));
};

/* 5-10. Pantalla de misión (sirve para las cinco misiones y el reto de inglés) */
PANTALLAS.mision = async (main, id) => {
  const m = mision(id);
  if (!m || !desbloqueada(id)) { ir('mapa'); return; }
  ponerFondo(m.fondo);
  const paso = completada(id) ? 0 : (S.paso[id] || 0);
  const nodo = html(`
    <section class="mision">
      <header class="mision-cabecera panel">
        <img src="assets/icons/${m.icono}.svg" alt="" class="mision-insignia">
        <div>
          <p class="mision-materia">${m.numero} · ${m.materia}</p>
          <h2 class="mision-titulo">${m.titulo}</h2>
        </div>
        <ol class="mision-pasos" aria-label="Desafíos de la misión">${m.retos.map((_, i) => `<li class="${i < paso ? 'hecho' : i === paso ? 'actual' : ''}"><span class="sr">Desafío ${i + 1}</span></li>`).join('')}</ol>
      </header>
      <div class="mision-reto" id="reto"></div>
    </section>`);
  main.append(nodo);
  if (paso === 0) await dialogo(m.intro);
  mostrarReto(m, paso);
};

function mostrarReto(m, i) {
  const cont = $('#reto'); if (!cont) return;
  const pasos = document.querySelectorAll('.mision-pasos li');
  pasos.forEach((li, k) => li.className = k < i ? 'hecho' : k === i ? 'actual' : '');
  cont.innerHTML = '';
  const reto = m.retos[i];
  const marco = html(`
    <article class="reto panel" data-tipo="${reto.tipo}">
      <div class="reto-cabecera">
        <span class="reto-num">Desafío ${i + 1} de ${m.retos.length}</span>
        <h3>${reto.titulo}</h3>
        ${reto.instruccion ? `<p class="reto-instruccion">${reto.instruccion}</p>` : ''}
      </div>
      <div class="reto-cuerpo"></div>
      <p class="reto-feedback" role="status" aria-live="polite"></p>
      <div class="reto-acciones"></div>
    </article>`);
  cont.append(marco);
  const ctx = {
    cuerpo: $('.reto-cuerpo', marco), acciones: $('.reto-acciones', marco), feedback: $('.reto-feedback', marco),
    fallos: 0,
    bien(texto) { this.feedback.className = 'reto-feedback ok'; this.feedback.textContent = texto; },
    mal(texto) {
      this.fallos++; Sonido.error();
      this.feedback.className = 'reto-feedback mal'; this.feedback.textContent = texto;
      marco.classList.remove('sacudir'); void marco.offsetWidth; marco.classList.add('sacudir');
      if (this.fallos >= 2) marco.querySelector('.btn-ayuda')?.classList.add('llamativo');
    },
    resuelto: () => retoResuelto(m, i, marco, reto),
  };
  if (reto.ayuda) {
    const b = html(`<button class="btn btn-claro btn-ayuda">${icono('ayuda')} Pedir ayuda a ${PERSONAJES[m.guia].nombre}</button>`);
    b.addEventListener('click', () => { b.classList.remove('llamativo'); dialogo([[m.guia, reto.ayuda]]); });
    ctx.acciones.append(b);
  }
  RETOS[reto.tipo](reto, ctx);
  marco.querySelector('input, button:not(.btn-ayuda)')?.focus({ preventScroll: true });
}

async function retoResuelto(m, i, marco, reto) {
  Sonido.exito();
  marco.classList.add('resuelto');
  marco.querySelectorAll('.reto-acciones button, .reto-cuerpo input, .reto-cuerpo button').forEach(b => b.disabled = true);
  const fb = marco.querySelector('.reto-feedback');
  fb.className = 'reto-feedback ok';
  fb.textContent = reto.exito ? '¡Correcto! ' + reto.exito : '¡Correcto!';
  if (reto.tipo !== 'lectura') aviso('Desafío completado', 'logro', 'check');
  if (!completada(m.id)) { S.paso[m.id] = i + 1; guardar(); }
  const seguir = html(`<button class="btn btn-oro">${i + 1 < m.retos.length ? 'Siguiente desafío' : 'Completar misión'} ${icono('flecha')}</button>`);
  marco.querySelector('.reto-acciones').append(seguir);
  seguir.disabled = false; seguir.focus({ preventScroll: true });
  seguir.addEventListener('click', async () => {
    Sonido.clic();
    if (i + 1 < m.retos.length) { mostrarReto(m, i + 1); $('#pantalla').scrollTo({ top: 0, behavior: reducirMovimiento ? 'auto' : 'smooth' }); }
    else await completarMision(m);
  }, { once: true });
}

async function completarMision(m) {
  await dialogo(m.cierre);
  const nueva = !completada(m.id);
  if (nueva) { S.hechas.push(m.id); delete S.paso[m.id]; guardar(); actualizarHud(); }
  Sonido.logro();
  const r = m.recompensa;
  const contenido = html(`
    <div class="recompensa">
      <p class="recompensa-etiqueta">${m.numero} completada</p>
      <h2>${m.titulo}</h2>
      <div class="recompensa-items">
        <div class="r-item">${icono('llave')}<div><small>Clave obtenida</small><b>«${r.clave}»</b></div></div>
        <div class="r-item">${icono('pista')}<div><small>Nueva pista</small><span>${r.pista}</span></div></div>
        <div class="r-item">${icono('objeto')}<div><small>Objeto encontrado</small><b>${r.objeto.nombre}</b><span>${r.objeto.desc}</span></div></div>
        <div class="r-item">${icono('evidencia')}<div><small>Evidencias académicas</small><b>+${r.evidencias.length}</b><span>Guardadas en tu bitácora para la decisión final.</span></div></div>
      </div>
      <button class="btn btn-oro btn-grande" autofocus>${icono('mapa')} Volver al mapa</button>
    </div>`);
  contenido.querySelector('.btn').addEventListener('click', () => cerrarModal());
  if (nueva) setTimeout(() => aviso('Nuevo lugar desbloqueado en el mapa', 'logro', 'mapa'), 600);
  await abrirModal(contenido, { cerrable: false });
  ir('mapa');
}

/* 11a. Puerta de la Casa Comunal: ordenar las claves */
PANTALLAS.puerta = main => {
  if (S.hechas.length < MISIONES.length) { ir('mapa'); return; }
  ponerFondo('asamblea');
  const nodo = html(`<section class="mision"><div class="mision-reto"><article class="reto panel">
      <div class="reto-cabecera"><span class="reto-num">Casa Comunal</span><h3>${PUERTA.titulo}</h3><p class="reto-instruccion">${PUERTA.instruccion}</p></div>
      <div class="reto-cuerpo"></div><p class="reto-feedback" role="status" aria-live="polite"></p><div class="reto-acciones"></div>
    </article></div></section>`);
  main.append(nodo);
  const fichas = PUERTA.orden.map((id, k) => ({ id, texto: mision(id).recompensa.clave, zona: 'p' + k }));
  const ctx = {
    cuerpo: $('.reto-cuerpo', nodo), acciones: $('.reto-acciones', nodo), feedback: $('.reto-feedback', nodo),
    bien() {}, mal(t) { Sonido.error(); this.feedback.className = 'reto-feedback mal'; this.feedback.textContent = t; },
    resuelto: async () => {
      Sonido.logro(); S.puerta = true; guardar();
      ctx.feedback.className = 'reto-feedback ok';
      ctx.feedback.textContent = '¡La puerta se abre!';
      await dialogo([['yaku', 'Pasen, viajeros. La comunidad está reunida. Primero comparemos las dos alternativas con calma.']]);
      ir('sala');
    },
  };
  RETOS.relacionar({ zonas: fichas.map((_, k) => ({ id: 'p' + k, texto: (k + 1) + '.º' })), fichas, compacto: true }, ctx);
};

/* 11b. Sala de comparación de alternativas */
PANTALLAS.sala = main => {
  if (!S.puerta) { ir('mapa'); return; }
  ponerFondo('asamblea');
  const F = S.final;
  const evid = evidenciasGanadas();
  const nodo = html(`
    <section class="sala">
      <header class="sala-cabecera panel">
        <p class="mision-materia">Casa Comunal · Sala de comparación</p>
        <h2 class="mision-titulo">El futuro de Lloa</h2>
        <p>Yaku Camayoc necesita tu ayuda para comparar dos alternativas. No hay una respuesta escrita de antemano: decide con los datos que reuniste.</p>
      </header>
      <div class="alternativas">
        ${['canal', 'traslado'].map(k => { const o = OPCIONES[k]; return `
          <article class="alternativa panel alt-${o.color}">
            <span class="alt-letra">${o.letra}</span>
            <h3>${o.nombre}</h3>
            <p class="alt-idea">${o.idea}</p>
            <h4>Lo que dicen los documentos</h4>
            <ul>${o.datos.map(d => `<li>${d}</li>`).join('')}</ul>
            <h4>Lo que los documentos no dicen</h4>
            <ul class="alt-vacios">${o.vacios.map(d => `<li>${d}</li>`).join('')}</ul>
          </article>`; }).join('')}
      </div>
      <article class="reto panel" id="paso-evidencias">
        <div class="reto-cabecera">
          <span class="reto-num">Paso 1 de 2</span>
          <h3>Organiza tus evidencias</h3>
          <p class="reto-instruccion">Arrastra al menos ${MIN_EVIDENCIAS_ORDENADAS} evidencias de tu bitácora a la alternativa que respaldan. No hay respuestas incorrectas: es tu análisis.</p>
        </div>
        <div class="reto-cuerpo"></div>
        <p class="reto-feedback" role="status" aria-live="polite"></p>
      </article>
      <article class="reto panel">
        <div class="reto-cabecera">
          <span class="reto-num">Paso 2 de 2</span>
          <h3>Tabla comparativa</h3>
          <p class="reto-instruccion">Evalúa cada criterio para las dos alternativas: <b>Alta</b> es la valoración más favorable.</p>
        </div>
        <div class="tabla-envoltura"><table class="tabla-criterios">
          <thead><tr><th scope="col">Criterio</th><th scope="col">A · Canal</th><th scope="col">B · Traslado</th></tr></thead>
          <tbody>${CRITERIOS.map(c => `<tr><th scope="row"><b>${c.nombre}</b><small>${c.pregunta}</small></th>
            ${['canal', 'traslado'].map(k => `<td><div class="segmentos" role="radiogroup" aria-label="${c.nombre}, ${OPCIONES[k].nombre}">
              ${[1, 2, 3].map(v => `<button role="radio" data-c="${c.id}" data-k="${k}" data-v="${v}" aria-checked="${F.criterios[c.id + '.' + k] === v}">${['Baja', 'Media', 'Alta'][v - 1]}</button>`).join('')}
            </div></td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <p class="reto-feedback" id="tabla-feedback" role="status" aria-live="polite"></p>
        <div class="reto-acciones"><button class="btn btn-oro btn-grande" id="a-decision">Ir a la decisión ${icono('flecha')}</button></div>
      </article>
    </section>`);
  main.append(nodo);
  // Paso 1: clasificación libre de evidencias
  const ctxEv = { cuerpo: $('#paso-evidencias .reto-cuerpo', nodo), acciones: html('<div></div>'), feedback: $('#paso-evidencias .reto-feedback', nodo) };
  RETOS.clasificar({
    libre: true,
    zonas: [{ id: 'canal', texto: 'A · Respalda el canal' }, { id: 'traslado', texto: 'B · Respalda el traslado' }, { id: 'ambas', texto: 'Aplica a ambas' }],
    fichas: evid.map(id => ({ id, texto: EVIDENCIAS[id].texto, etiqueta: EVIDENCIAS[id].materia })),
    inicial: F.ubicacion,
    alCambiar: ubic => { F.ubicacion = ubic; guardar(); },
  }, ctxEv);
  // Paso 2: tabla de criterios
  nodo.querySelectorAll('.segmentos button').forEach(b => b.addEventListener('click', () => {
    Sonido.clic();
    F.criterios[b.dataset.c + '.' + b.dataset.k] = +b.dataset.v; guardar();
    b.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x === b));
  }));
  $('#a-decision', nodo).addEventListener('click', () => {
    const ordenadas = Object.values(F.ubicacion).filter(z => z !== 'pool').length;
    const faltan = CRITERIOS.length * 2 - Object.keys(F.criterios).length;
    const fb = $('#tabla-feedback', nodo);
    if (ordenadas < Math.min(MIN_EVIDENCIAS_ORDENADAS, evid.length)) { Sonido.error(); fb.className = 'reto-feedback mal'; fb.textContent = `Ordena al menos ${MIN_EVIDENCIAS_ORDENADAS} evidencias en el paso 1 (llevas ${ordenadas}).`; return; }
    if (faltan > 0) { Sonido.error(); fb.className = 'reto-feedback mal'; fb.textContent = `Completa la tabla: faltan ${faltan} valoraciones.`; return; }
    Sonido.clic(); ir('decision');
  });
};

/* 12. Decisión y justificación final */
PANTALLAS.decision = main => {
  if (!S.puerta) { ir('mapa'); return; }
  ponerFondo('asamblea');
  const F = S.final;
  const puntos = k => CRITERIOS.reduce((s, c) => s + (F.criterios[c.id + '.' + k] || 0), 0);
  const max = CRITERIOS.length * 3;
  const evid = evidenciasGanadas();
  const nodo = html(`
    <section class="sala">
      <header class="sala-cabecera panel">
        <p class="mision-materia">Casa Comunal · Decisión final</p>
        <h2 class="mision-titulo">¿Qué alternativa propones?</h2>
        <p>Según tu tabla comparativa: <b>A · Canal ${puntos('canal')}/${max}</b> y <b>B · Traslado ${puntos('traslado')}/${max}</b>. La puntuación orienta, pero la decisión y sus razones son tuyas.</p>
      </header>
      <form class="decision panel" novalidate>
        <fieldset class="eleccion">
          <legend>1. Elige una alternativa</legend>
          ${['canal', 'traslado'].map(k => `<label class="eleccion-opcion alt-${OPCIONES[k].color}">
            <input type="radio" name="eleccion" value="${k}" ${F.eleccion === k ? 'checked' : ''}>
            <span class="alt-letra">${OPCIONES[k].letra}</span><span><b>${OPCIONES[k].nombre}</b><small>${OPCIONES[k].idea}</small></span>
          </label>`).join('')}
        </fieldset>
        <fieldset class="usadas">
          <legend>2. Marca al menos ${MIN_EVIDENCIAS_USADAS} evidencias que respaldan tu decisión</legend>
          <div class="usadas-lista">${evid.map(id => `<label><input type="checkbox" value="${id}" ${F.usadas.includes(id) ? 'checked' : ''}><span><small>${EVIDENCIAS[id].materia}</small>${EVIDENCIAS[id].texto}</span></label>`).join('')}</div>
        </fieldset>
        <label class="justificacion">
          <span class="legend">3. Justifica tu decisión con tus propias palabras</span>
          <small>Explica por qué tu alternativa es la más conveniente para Lloa, qué ventajas y limitaciones tiene, y qué datos la respaldan (mínimo ${MIN_JUSTIFICACION} caracteres).</small>
          <textarea rows="7" maxlength="2000" placeholder="Proponemos... porque... Una limitación es... Los datos que lo respaldan son...">${esc(F.texto)}</textarea>
          <span class="contador"></span>
        </label>
        <p class="reto-feedback" role="status" aria-live="polite"></p>
        <div class="reto-acciones">
          <button type="button" class="btn btn-claro" id="volver-sala">Volver a la comparación</button>
          <button type="submit" class="btn btn-oro btn-grande">Presentar a la comunidad ${icono('flecha')}</button>
        </div>
      </form>
    </section>`);
  main.append(nodo);
  const form = $('form', nodo), area = $('textarea', form), contador = $('.contador', form), fb = $('.reto-feedback', form);
  const contar = () => {
    const n = area.value.trim().length;
    contador.textContent = `${n} / ${MIN_JUSTIFICACION} caracteres`;
    contador.classList.toggle('ok', n >= MIN_JUSTIFICACION);
  };
  contar();
  area.addEventListener('input', () => { F.texto = area.value; guardar(); contar(); fb.textContent = ''; });
  form.addEventListener('change', e => {
    fb.textContent = '';
    if (e.target.name === 'eleccion') F.eleccion = e.target.value;
    if (e.target.type === 'checkbox') F.usadas = [...form.querySelectorAll('.usadas input:checked')].map(c => c.value);
    guardar();
  });
  $('#volver-sala', nodo).addEventListener('click', () => ir('sala'));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const errores = [];
    if (!F.eleccion) errores.push('elige una alternativa');
    if (F.usadas.length < MIN_EVIDENCIAS_USADAS) errores.push(`marca al menos ${MIN_EVIDENCIAS_USADAS} evidencias`);
    if (F.texto.trim().length < MIN_JUSTIFICACION) errores.push(`escribe una justificación de al menos ${MIN_JUSTIFICACION} caracteres`);
    if (errores.length) {
      Sonido.error(); fb.className = 'reto-feedback mal';
      fb.textContent = 'Para presentar tu propuesta: ' + errores.join(', ') + '.';
      return;
    }
    Sonido.clic(); ir('desenlace');
  });
};

/* 13. Escena de desenlace */
PANTALLAS.desenlace = async main => {
  const F = S.final;
  if (!F.eleccion || F.texto.trim().length < MIN_JUSTIFICACION) { ir('decision'); return; }
  ponerFondo('asamblea');
  const o = OPCIONES[F.eleccion];
  main.append(html(`
    <section class="desenlace">
      <div class="desenlace-propuesta panel">
        <p class="mision-materia">Propuesta presentada a la comunidad</p>
        <h2 class="mision-titulo">${o.letra} · ${o.nombre}</h2>
        <blockquote>${esc(F.texto)}</blockquote>
      </div>
    </section>`));
  const breve = F.texto.trim().length > 160 ? F.texto.trim().slice(0, 157) + '…' : F.texto.trim();
  await dialogo([
    ['yaku', `La comunidad escuchó su propuesta: ${o.nombre.toLowerCase()}. Ustedes dijeron: «${breve}»`],
    ...DESENLACE[F.eleccion],
    ...DESENLACE.comun,
  ]);
  S.terminado = true; guardar();
  ir('fin');
};

/* 14. Pantalla de misión completada */
PANTALLAS.fin = main => {
  if (!S.terminado) { ir('mapa'); return; }
  ponerFondo('asamblea');
  const F = S.final, o = OPCIONES[F.eleccion];
  main.append(html(`
    <section class="fin">
      <header class="fin-cabecera">
        <p class="fin-sello">${icono('estrella')} Misión completada</p>
        <h1>Lloa tiene una propuesta</h1>
        <p class="fin-metafora">«${METAFORA}»</p>
        <p class="fin-firma">— Mama Quilla</p>
      </header>
      <div class="fin-grid">
        <article class="panel fin-bloque">
          <h3>Recorrido de la misión</h3>
          <ol class="fin-misiones">${MISIONES.map(m => `<li><img src="assets/icons/${m.icono}.svg" alt=""><span><b>${m.numero}: ${m.titulo}</b><small>${m.materia} · clave «${m.recompensa.clave}»</small></span></li>`).join('')}</ol>
        </article>
        <article class="panel fin-bloque">
          <h3>Alternativa seleccionada</h3>
          <p class="fin-eleccion alt-${o.color}"><span class="alt-letra">${o.letra}</span>${o.nombre}</p>
          <h4>Tu justificación</h4>
          <blockquote>${esc(F.texto)}</blockquote>
          <h4>Evidencias que la respaldan</h4>
          <ul>${F.usadas.map(id => `<li>${EVIDENCIAS[id].texto} <small>(${EVIDENCIAS[id].fuente})</small></li>`).join('')}</ul>
        </article>
        <article class="panel fin-bloque fin-reflexion">
          <h3>Reflexión final</h3>
          <p>${REFLEXION}</p>
        </article>
      </div>
      <div class="fin-botones">
        <button class="btn btn-claro" id="fin-mapa">${icono('mapa')} Ver el mapa</button>
        <button class="btn btn-oro btn-grande" id="fin-otra">${icono('repetir')} Volver a jugar</button>
      </div>
    </section>`));
  $('#fin-mapa', main).addEventListener('click', () => ir('mapa'));
  $('#fin-otra', main).addEventListener('click', async () => {
    if (await confirmar('¿Volver a jugar desde el inicio? Se borrará el progreso.')) { S = estadoNuevo(); guardar(); ir('inicio'); }
  });
};

/* =====================================================================
   RETOS (cada tipo de desafío)
   Cada función recibe la definición del reto y un contexto con:
   cuerpo, acciones, feedback, bien(), mal() y resuelto().
   ===================================================================== */
const RETOS = {};
const botonComprobar = (ctx, alPulsar) => {
  const b = html(`<button class="btn btn-oro">${icono('check')} Comprobar</button>`);
  b.addEventListener('click', () => { Sonido.clic(); alPulsar(); });
  ctx.acciones.prepend(b);
  return b;
};

/* Lectura de fuentes académicas */
RETOS.lectura = (reto, ctx) => {
  ctx.cuerpo.append(html(`<div class="lectura">
    ${reto.formula ? `<p class="formula">${reto.formula}</p>` : ''}
    ${reto.fuentes.map(f => `<figure class="fuente"><blockquote>${f.texto}</blockquote><figcaption>${f.cita}</figcaption></figure>`).join('')}
  </div>`));
  const b = html(`<button class="btn btn-oro">${icono('bitacora')} Lo he leído</button>`);
  b.addEventListener('click', () => ctx.resuelto());
  ctx.acciones.prepend(b);
};

/* Selección con retroalimentación por opción */
RETOS.opcion = (reto, ctx) => {
  const lista = html(`<div class="opciones"><p class="pregunta">${reto.pregunta}</p></div>`);
  reto.opciones.forEach(o => {
    const b = html(`<button class="opcion">${o.texto}</button>`);
    b.addEventListener('click', () => {
      if (o.correcta) { b.classList.add('ok'); ctx.resuelto(); }
      else { b.classList.add('mal'); b.disabled = true; ctx.mal(o.fb || 'No es correcto. Vuelve a intentarlo.'); }
    });
    lista.append(b);
  });
  ctx.cuerpo.append(lista);
};

/* Acertijo de respuesta escrita */
RETOS.acertijo = (reto, ctx) => {
  const f = html(`<form class="acertijo"><p class="pregunta">${reto.pregunta}</p>
    <label class="campo"><span>Tu respuesta</span><input type="text" autocomplete="off" spellcheck="false"></label></form>`);
  ctx.cuerpo.append(f);
  const input = $('input', f);
  const probar = () => {
    if (!input.value.trim()) { ctx.mal('Escribe una respuesta.'); return; }
    if (reto.respuestas.map(normalizar).includes(normalizar(input.value))) ctx.resuelto();
    else ctx.mal('Esa no es la respuesta. Piensa en lo que leíste en el pergamino.');
  };
  f.addEventListener('submit', e => { e.preventDefault(); probar(); });
  botonComprobar(ctx, probar);
};

/* Candado numérico (uno o varios campos) */
RETOS.numero = (reto, ctx) => {
  const f = html(`<form class="candado" novalidate>
    <p class="pregunta">${reto.pregunta}</p>
    ${reto.figura ? `<div class="figura">${FIGURAS[reto.figura]()}</div>` : ''}
    <div class="candado-campos">
      <span class="candado-icono">${icono('candado')}</span>
      ${reto.campos.map((c, k) => `<label class="campo"><span>${c.etiqueta}</span>
        <span class="campo-unidad"><input type="text" inputmode="decimal" autocomplete="off" data-k="${k}"><em>${c.unidad}</em></span></label>`).join('')}
    </div>
  </form>`);
  ctx.cuerpo.append(f);
  if (reto.figura === 'funcion') activarGraficaFuncion(f);
  const inputs = [...f.querySelectorAll('.candado-campos input')];
  const probar = () => {
    if (inputs.some(i => !i.value.trim())) { ctx.mal('Completa todos los campos del candado.'); return; }
    let malos = 0;
    inputs.forEach((inp, k) => {
      const ok = aceptaNumero(inp.value, reto.campos[k].respuesta, reto.campos[k].tol);
      inp.classList.toggle('mal', !ok); inp.classList.toggle('ok', ok);
      if (!ok) malos++;
    });
    if (malos) ctx.mal(malos === inputs.length ? 'El candado no se abre. Revisa tus cálculos.' : `Casi: ${malos} de ${inputs.length} valores no coinciden.`);
    else { $('.candado-icono', f).innerHTML = icono('abierto'); f.classList.add('abierto'); ctx.resuelto(); }
  };
  f.addEventListener('submit', e => { e.preventDefault(); probar(); });
  botonComprobar(ctx, probar);
};

/* Medidores con rango objetivo (laboratorio de suelo) */
RETOS.medidor = (reto, ctx) => {
  const v = {};
  const caja = html(`<div class="medidor">
    <div class="muestra" aria-hidden="true"><div class="muestra-tierra"></div><div class="muestra-tira"></div></div>
    <div class="medidor-controles">${reto.controles.map(c => {
      v[c.id] = c.inicio;
      return `<label class="deslizador"><span>${c.etiqueta}: <output data-o="${c.id}">${fmt(c.inicio)}${c.unidad ? ' ' + c.unidad : ''}</output></span>
        <input type="range" min="${c.min}" max="${c.max}" step="${c.paso}" value="${c.inicio}" data-id="${c.id}"></label>`;
    }).join('')}</div>
  </div>`);
  ctx.cuerpo.append(caja);
  const pintar = () => {
    const mo = v.mo ?? 0, ph = v.ph ?? 7;
    $('.muestra-tierra', caja).style.background = `hsl(28 ${30 + mo * 2}% ${62 - mo * 3.5}%)`;
    $('.muestra-tira', caja).style.background = `hsl(${(ph - 4) * 30} 55% 52%)`;
  };
  caja.querySelectorAll('input').forEach(inp => inp.addEventListener('input', () => {
    const c = reto.controles.find(x => x.id === inp.dataset.id);
    v[c.id] = +inp.value;
    caja.querySelector(`[data-o="${c.id}"]`).textContent = fmt(+inp.value) + (c.unidad ? ' ' + c.unidad : '');
    pintar();
  }));
  pintar();
  botonComprobar(ctx, () => {
    const fuera = reto.controles.filter(c => v[c.id] < c.objetivo[0] - 1e-9 || v[c.id] > c.objetivo[1] + 1e-9);
    if (fuera.length) ctx.mal(`${fuera.map(c => c.etiqueta).join(' y ')} aún no coincide${fuera.length > 1 ? 'n' : ''} con el suelo del estudio.`);
    else ctx.resuelto();
  });
};
const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');

/* Simulador del carrito (segunda ley de Newton) */
RETOS.carrito = (reto, ctx) => {
  let F = 0, x = 0, vel = 0, ultimo = performance.now();
  const caja = html(`<div class="carrito">
    <div class="pista-carrito" aria-hidden="true">
      <div class="carro"><span class="saco"></span><span class="saco"></span><span class="saco"></span><span class="rueda"></span><span class="rueda"></span></div>
      <div class="flecha-fuerza"></div>
    </div>
    <div class="carrito-datos">
      <span>Masa: <b>${reto.masa} kg</b></span>
      <span>Fuerza neta: <b><output id="c-f">0</output> N</b></span>
      <span>Aceleración: <b><output id="c-a">0</output> m/s²</b></span>
    </div>
    <label class="deslizador"><span>Fuerza aplicada por K'inich</span>
      <input type="range" min="0" max="${reto.fmax}" step="${reto.fpaso}" value="0"></label>
  </div>`);
  ctx.cuerpo.append(caja);
  const carro = $('.carro', caja), flecha = $('.flecha-fuerza', caja), pista = $('.pista-carrito', caja);
  $('input', caja).addEventListener('input', e => {
    F = +e.target.value;
    $('#c-f').textContent = F; $('#c-a').textContent = fmt(F / reto.masa);
    flecha.style.transform = `scaleX(${F / reto.fmax})`;
    x = 0; vel = 0;
  });
  // Animación: el carrito acelera con a = F/m y vuelve a empezar al llegar al final
  const animar = ahora => {
    if (!caja.isConnected) return;
    const dt = Math.min((ahora - ultimo) / 1000, 0.05); ultimo = ahora;
    const a = F / reto.masa;
    if (!reducirMovimiento) { vel += a * dt; x += vel * dt * 40; }
    const limite = pista.clientWidth - carro.clientWidth;
    if (x > limite) { x = 0; vel = 0; }
    carro.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animar);
  };
  requestAnimationFrame(animar);
  botonComprobar(ctx, () => {
    const a = F / reto.masa;
    if (a === reto.objetivo) ctx.resuelto();
    else ctx.mal(a < reto.objetivo ? `Con ${F} N la aceleración es ${fmt(a)} m/s²: falta fuerza.` : `Con ${F} N la aceleración es ${fmt(a)} m/s²: es demasiada fuerza.`);
  });
};

/* Interpretar una imagen tocando sus partes */
RETOS.imagen = (reto, ctx) => {
  let k = 0;
  const caja = html(`<div class="imagen-reto">
    <p class="pregunta" aria-live="polite"></p>
    <div class="imagen-marco"><img src="${reto.img}" alt="${reto.alt}">
      ${reto.puntos.map(p => `<button class="punto" style="left:${p.x}%;top:${p.y}%" data-id="${p.id}" aria-label="Fuerza ${p.id}"></button>`).join('')}
    </div></div>`);
  ctx.cuerpo.append(caja);
  const pregunta = $('.pregunta', caja);
  const enunciar = () => { const p = reto.puntos.find(q => q.id === reto.pasos[k]); pregunta.innerHTML = `Toca <b>${p.etiqueta}</b> (${k + 1} de ${reto.pasos.length}).`; };
  enunciar();
  caja.querySelectorAll('.punto').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.id === reto.pasos[k]) {
      Sonido.clic(); b.classList.add('ok'); b.disabled = true;
      ctx.feedback.className = 'reto-feedback ok'; ctx.feedback.textContent = 'Correcto.';
      if (++k < reto.pasos.length) enunciar(); else { pregunta.textContent = '¡Identificaste todas las fuerzas!'; ctx.resuelto(); }
    } else {
      const p = reto.puntos.find(q => q.id === b.dataset.id);
      ctx.mal(`Esa es ${p.etiqueta}. Busca otra flecha.`);
    }
  }));
};

/* Reto auditivo de inglés */
RETOS.escucha = (reto, ctx) => {
  let velocidad = 0.9, sonando = false, audio = null, oyo = false;
  const caja = html(`<div class="escucha">
    <div class="reproductor">
      <button class="btn btn-oro rep-play" type="button">${icono('play')} Escuchar</button>
      <button class="btn btn-claro rep-lento" type="button" aria-pressed="false">Velocidad lenta</button>
      <div class="ondas" aria-hidden="true">${'<span></span>'.repeat(12)}</div>
      <button class="btn btn-texto rep-trans" type="button" hidden>Ver transcripción</button>
    </div>
    <p class="transcripcion" hidden>${reto.guion}</p>
    <ol class="preguntas-ingles">${reto.preguntas.map((p, k) => `<li data-k="${k}"><p>${p.pregunta}</p>${p.tipo === 'opcion'
      ? `<div class="mini-opciones">${p.opciones.map((o, j) => `<label><input type="radio" name="q${k}" value="${j}"><span>${o}</span></label>`).join('')}</div>`
      : `<label class="campo campo-unidad"><input type="text" inputmode="decimal" aria-label="${p.pregunta}"><em>${p.unidad}</em></label>`}</li>`).join('')}</ol>
  </div>`);
  ctx.cuerpo.append(caja);
  const play = $('.rep-play', caja), trans = $('.rep-trans', caja);
  const estado = s => { sonando = s; caja.classList.toggle('sonando', s); play.innerHTML = s ? icono('pausa') + ' Detener' : icono('play') + ' Escuchar'; };
  // Si existe la grabación real en assets/audio se usa; si no, la voz del navegador lee el guion
  if (reto.audio) {
    audio = new Audio(); audio.preload = 'auto';
    audio.addEventListener('ended', () => estado(false));
    audio.addEventListener('error', () => { audio = null; });
    audio.src = reto.audio;
  }
  if (!('speechSynthesis' in window)) trans.hidden = false;
  play.addEventListener('click', () => {
    Sonido.iniciar();
    if (sonando) { audio?.pause(); speechSynthesis?.cancel(); estado(false); return; }
    estado(true); oyo = true;
    if (audio && audio.readyState > 0) { audio.playbackRate = velocidad; audio.currentTime = 0; audio.play().catch(() => estado(false)); }
    else if (!hablar(reto.guion, 'en-US', velocidad, () => estado(false))) { estado(false); trans.hidden = false; aviso('Tu navegador no puede reproducir el audio: usa la transcripción.', 'error', 'ayuda'); }
  });
  $('.rep-lento', caja).addEventListener('click', e => {
    velocidad = velocidad === 0.9 ? 0.65 : 0.9;
    e.currentTarget.setAttribute('aria-pressed', velocidad < 0.9);
    if (audio) audio.playbackRate = velocidad;
  });
  trans.addEventListener('click', () => { $('.transcripcion', caja).hidden = false; trans.hidden = true; });
  botonComprobar(ctx, () => {
    let malos = 0;
    reto.preguntas.forEach((p, k) => {
      const li = caja.querySelector(`li[data-k="${k}"]`);
      const ok = p.tipo === 'opcion'
        ? +(li.querySelector('input:checked')?.value ?? -1) === p.correcta
        : aceptaNumero(li.querySelector('input').value, p.respuesta);
      li.classList.toggle('mal', !ok); li.classList.toggle('ok', ok);
      if (!ok) malos++;
    });
    if (!malos) { audio?.pause(); speechSynthesis?.cancel(); ctx.resuelto(); return; }
    ctx.mal(oyo ? `${malos} respuesta${malos > 1 ? 's' : ''} por revisar. Escucha otra vez.` : 'Primero escucha el mensaje.');
    if (ctx.fallos >= 2 || !('speechSynthesis' in window)) trans.hidden = !$('.transcripcion', caja).hidden;
  });
};

/* ---------------------------------------------------------------------
   Arrastrar y soltar (relacionar y clasificar)
   - Con ratón o dedo: la ficha sigue al puntero 1:1 y se suelta en una zona.
   - Sin arrastrar: toca una ficha y luego la zona (también con teclado).
   --------------------------------------------------------------------- */
RETOS.relacionar = (reto, ctx) => crearArrastre(reto, ctx, 1);
RETOS.clasificar = (reto, ctx) => crearArrastre(reto, ctx, Infinity);

function crearArrastre(reto, ctx, capacidad) {
  const fichas = barajar(reto.fichas);
  const caja = html(`<div class="arrastre ${capacidad === 1 ? 'modo-relacionar' : 'modo-clasificar'} ${reto.compacto ? 'compacto' : ''}">
    <div class="zona zona-pool" data-zona="pool" tabindex="0" role="button" aria-label="Fichas sin ubicar"><span class="zona-titulo">Fichas</span><div class="zona-fichas"></div></div>
    <div class="zonas">${reto.zonas.map(z => `<div class="zona" data-zona="${z.id}" tabindex="0" role="button" aria-label="Zona: ${z.texto}">
      <span class="zona-titulo">${z.texto}</span><div class="zona-fichas"></div></div>`).join('')}</div>
  </div>`);
  ctx.cuerpo.append(caja);
  const zonaDe = id => caja.querySelector(`[data-zona="${id}"] .zona-fichas`);
  fichas.forEach(f => {
    const el = html(`<button class="ficha" type="button" data-id="${f.id}">${f.etiqueta ? `<small>${f.etiqueta}</small>` : ''}<span>${f.texto}</span></button>`);
    const inicial = reto.inicial?.[f.id];
    (inicial && zonaDe(inicial) ? zonaDe(inicial) : zonaDe('pool')).append(el);
  });
  let seleccionada = null, arrastre = null, ignorarClic = false;
  const ubicacion = () => Object.fromEntries([...caja.querySelectorAll('.ficha')].map(f => [f.dataset.id, f.closest('.zona').dataset.zona]));
  const actualizar = () => {
    caja.querySelector('.zona-pool').classList.toggle('vacia', !zonaDe('pool').children.length);
    reto.alCambiar?.(ubicacion());
    if (reto.libre) { const n = Object.values(ubicacion()).filter(z => z !== 'pool').length; ctx.feedback.textContent = n === 1 ? '1 evidencia ordenada.' : `${n} evidencias ordenadas.`; }
  };
  // Mueve una ficha a una zona con animación FLIP (desde donde estaba hasta su nuevo lugar)
  const mover = (ficha, zonaId) => {
    const destino = zonaDe(zonaId); if (!destino || ficha.parentElement === destino) return;
    const origen = ficha.parentElement;
    if (zonaId !== 'pool' && destino.children.length >= capacidad) { // zona llena: intercambio
      const otra = destino.firstElementChild; animarMovimiento(otra, () => origen.append(otra));
    }
    animarMovimiento(ficha, () => destino.append(ficha));
    ficha.querySelectorAll('.ok,.mal').forEach(n => n.classList.remove('ok', 'mal'));
    ficha.classList.remove('ok', 'mal');
    Sonido.clic(); actualizar();
  };
  const seleccionar = f => {
    seleccionada?.classList.remove('seleccionada'); seleccionada?.setAttribute('aria-pressed', 'false');
    seleccionada = f === seleccionada ? null : f;
    seleccionada?.classList.add('seleccionada'); seleccionada?.setAttribute('aria-pressed', 'true');
    caja.classList.toggle('eligiendo', !!seleccionada);
  };
  caja.addEventListener('click', e => {
    if (ignorarClic) { ignorarClic = false; return; }
    const ficha = e.target.closest('.ficha'), zona = e.target.closest('.zona');
    if (ficha && (!seleccionada || ficha === seleccionada || ficha.closest('.zona') === seleccionada.closest('.zona'))) { seleccionar(ficha); return; }
    if (seleccionada && zona) { mover(seleccionada, zona.dataset.zona); seleccionar(null); }
  });
  caja.addEventListener('keydown', e => {
    const zona = e.target.closest('.zona');
    if ((e.key === 'Enter' || e.key === ' ') && e.target === zona && seleccionada) { e.preventDefault(); mover(seleccionada, zona.dataset.zona); seleccionar(null); }
  });
  // Arrastre con puntero: fase de seguimiento 1:1, sin transición
  caja.addEventListener('pointerdown', e => {
    const ficha = e.target.closest('.ficha');
    if (!ficha || arrastre || ficha.disabled || e.button > 0) return;
    arrastre = { ficha, id: e.pointerId, x0: e.clientX, y0: e.clientY, cx: e.clientX, cy: e.clientY, s0: pantalla.scrollTop, movido: false, vel: 0 };
  });
  const pantalla = $('#pantalla');
  // La ficha sigue al puntero; se compensa el desplazamiento de la pantalla
  const seguir = () => {
    const a = arrastre;
    a.ficha.style.transform = `translate(${a.cx - a.x0}px, ${a.cy - a.y0 + pantalla.scrollTop - a.s0}px) scale(1.04)`;
    const zona = zonaBajo(a.cx, a.cy);
    caja.querySelectorAll('.zona.encima').forEach(z => z !== zona && z.classList.remove('encima'));
    zona?.classList.add('encima');
  };
  // Cerca de los bordes, la pantalla se desplaza sola para alcanzar zonas que no se ven
  const autodesplazar = () => {
    if (!arrastre?.vel) return;
    pantalla.scrollTop += arrastre.vel; seguir();
    requestAnimationFrame(autodesplazar);
  };
  caja.addEventListener('pointermove', e => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    arrastre.cx = e.clientX; arrastre.cy = e.clientY;
    if (!arrastre.movido) {
      if (Math.hypot(e.clientX - arrastre.x0, e.clientY - arrastre.y0) < 6) return;
      arrastre.movido = true;
      arrastre.ficha.setPointerCapture(e.pointerId);
      arrastre.ficha.classList.add('arrastrando');
      seleccionar(null);
    }
    seguir();
    const borde = 80, arriba = $('#hud').offsetHeight + borde;
    const vel = e.clientY > innerHeight - borde ? (e.clientY - innerHeight + borde) / borde * 14
              : e.clientY < arriba ? -(arriba - e.clientY) / borde * 14 : 0;
    const estaba = arrastre.vel; arrastre.vel = vel;
    if (vel && !estaba) requestAnimationFrame(autodesplazar);
  });
  const soltar = e => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    const { ficha, movido } = arrastre; arrastre.vel = 0; arrastre = null;
    if (!movido) return;
    ignorarClic = true; setTimeout(() => { ignorarClic = false; }, 0);
    const zona = e.type === 'pointerup' ? zonaBajo(e.clientX, e.clientY) : null;
    caja.querySelectorAll('.zona.encima').forEach(z => z.classList.remove('encima'));
    ficha.classList.remove('arrastrando');
    if (zona && zona.querySelector('.zona-fichas') !== ficha.parentElement) mover(ficha, zona.dataset.zona);
    else { // fase de liberación: regresa con una transición corta
      ficha.style.transition = 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)';
      ficha.style.transform = '';
      ficha.addEventListener('transitionend', () => { ficha.style.transition = ''; }, { once: true });
    }
  };
  caja.addEventListener('pointerup', soltar);
  caja.addEventListener('pointercancel', soltar);
  const zonaBajo = (x, y) => {
    const f = caja.querySelector('.arrastrando'); if (f) f.style.visibility = 'hidden';
    const el = document.elementFromPoint(x, y); if (f) f.style.visibility = '';
    return el?.closest('.arrastre .zona');
  };
  actualizar();
  if (reto.libre) return;
  botonComprobar(ctx, () => {
    const enPool = zonaDe('pool').children.length;
    if (enPool) { ctx.mal(enPool > 1 ? `Faltan ${enPool} fichas por ubicar.` : 'Falta 1 ficha por ubicar.'); return; }
    let malas = 0;
    caja.querySelectorAll('.ficha').forEach(f => {
      const def = reto.fichas.find(x => x.id === f.dataset.id);
      const ok = def.zona === f.closest('.zona').dataset.zona;
      f.classList.toggle('ok', ok); f.classList.toggle('mal', !ok);
      if (!ok) malas++;
    });
    if (malas) ctx.mal(`${malas} ficha${malas > 1 ? 's están' : ' está'} en un lugar incorrecto (marcadas en rojo).`);
    else { caja.querySelectorAll('.ficha').forEach(f => f.disabled = true); ctx.resuelto(); }
  });
}
function animarMovimiento(el, cambio) {
  const antes = el.getBoundingClientRect();
  el.style.transition = ''; el.style.transform = '';
  cambio();
  if (reducirMovimiento) return;
  const despues = el.getBoundingClientRect();
  el.animate([{ transform: `translate(${antes.left - despues.left}px, ${antes.top - despues.top}px)` }, { transform: 'none' }],
    { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
}
const barajar = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- Figuras de apoyo para los candados de Matemáticas ---------- */
const FIGURAS = {
  terreno: () => `<svg viewBox="0 0 320 150" role="img" aria-label="Terreno de 18 hectáreas con un 25 % poco favorable">
    <defs><pattern id="rayas" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#c9a26b"/><line x1="0" y1="0" x2="0" y2="8" stroke="#7a5233" stroke-width="3"/></pattern></defs>
    <rect x="10" y="20" width="225" height="110" rx="6" fill="#7d9a4a"/><rect x="235" y="20" width="75" height="110" rx="6" fill="url(#rayas)"/>
    <text x="122" y="80" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">¿? ha</text>
    <text x="272" y="80" text-anchor="middle" fill="#2b2118" font-size="14" font-weight="700">25 %</text>
    <text x="160" y="148" text-anchor="middle" fill="currentColor" font-size="13">Total: 18 ha</text></svg>`,
  pendiente: () => `<svg viewBox="0 0 320 160" role="img" aria-label="Triángulo con 120 metros horizontales y 36 metros de altura">
    <polygon points="20,140 290,140 290,60" fill="#a9bd7a" stroke="#4a3020" stroke-width="2"/>
    <path d="M276,140 v-14 h14" fill="none" stroke="#4a3020" stroke-width="1.5"/>
    <text x="155" y="157" text-anchor="middle" fill="currentColor" font-size="14">120 m</text>
    <text x="300" y="104" fill="currentColor" font-size="14">36 m</text>
    <text x="70" y="130" fill="#2b2118" font-size="13">P = ?</text></svg>`,
  funcion: () => `<div class="grafica-funcion">
    <svg viewBox="0 0 320 200" role="img" aria-label="Gráfica de ingreso y costo según las toneladas vendidas">
      <line x1="40" y1="170" x2="310" y2="170" stroke="currentColor" opacity=".5"/><line x1="40" y1="10" x2="40" y2="170" stroke="currentColor" opacity=".5"/>
      <polyline class="linea-i" points="40,170 310,${170 - 480 * 50 / 25000 * 160}" fill="none" stroke="#5f8f3e" stroke-width="3"/>
      <polyline class="linea-c" points="40,${170 - 2400 / 25000 * 160} 310,${170 - (180 * 50 + 2400) / 25000 * 160}" fill="none" stroke="#b5553a" stroke-width="3"/>
      <line class="marca-x" x1="0" y1="10" x2="0" y2="170" stroke="#d4a23c" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="300" y="188" font-size="12" fill="currentColor" text-anchor="end">x (toneladas, 0–50)</text>
      <text x="46" y="20" font-size="12" fill="#5f8f3e">I(x) = 480x</text><text x="46" y="36" font-size="12" fill="#b5553a">C(x) = 180x + 2.400</text>
    </svg>
    <label class="deslizador"><span>Explora: x = <output>10</output> t → I = <b class="v-i"></b> $, C = <b class="v-c"></b> $</span>
      <input type="range" min="0" max="50" step="1" value="10" aria-label="Toneladas vendidas"></label>
  </div>`,
};
function activarGraficaFuncion(raiz) {
  const r = $('input[type=range]', raiz), marca = $('.marca-x', raiz);
  const pintar = () => {
    const x = +r.value;
    $('output', raiz).textContent = x;
    $('.v-i', raiz).textContent = (480 * x).toLocaleString('es-EC');
    $('.v-c', raiz).textContent = (180 * x + 2400).toLocaleString('es-EC');
    const px = 40 + x / 50 * 270;
    marca.setAttribute('x1', px); marca.setAttribute('x2', px);
  };
  r.addEventListener('input', pintar); pintar();
}

/* =====================================================================
   BITÁCORA (inventario), MENÚ Y CONFIRMACIONES
   ===================================================================== */
function abrirBitacora(pestana = 'claves') {
  const hechas = MISIONES.filter(m => completada(m.id));
  const vacio = t => `<p class="vacio">${t}</p>`;
  const secciones = {
    claves: hechas.length ? `<ul class="bit-lista">${hechas.map(m => `<li>${icono('llave')}<span><b>«${m.recompensa.clave}»</b><small>${m.numero} · ${m.materia}</small></span></li>`).join('')}</ul>` : vacio('Aún no tienes claves. Completa la primera misión.'),
    pistas: hechas.length ? `<ul class="bit-lista">${hechas.map(m => `<li>${icono('pista')}<span>${m.recompensa.pista}<small>${m.numero} · ${m.titulo}</small></span></li>`).join('')}</ul>` : vacio('Las pistas aparecen al completar cada misión.'),
    evidencias: evidenciasGanadas().length ? `<ul class="bit-lista">${evidenciasGanadas().map(id => `<li>${icono('evidencia')}<span>${EVIDENCIAS[id].texto}<small>${EVIDENCIAS[id].materia} · ${EVIDENCIAS[id].fuente}</small></span></li>`).join('')}</ul>` : vacio('Las evidencias académicas se usan en la decisión final.'),
    objetos: hechas.length ? `<ul class="bit-lista">${hechas.map(m => `<li>${icono('objeto')}<span><b>${m.recompensa.objeto.nombre}</b><small>${m.recompensa.objeto.desc}</small></span></li>`).join('')}</ul>` : vacio('Todavía no has encontrado objetos.'),
    misiones: `<ul class="bit-lista">${[...MISIONES.map(m => ({ t: `${m.numero}: ${m.titulo}`, s: m.materia, ok: completada(m.id) })), { t: 'Decisión final: el futuro de Lloa', s: 'Casa Comunal', ok: S.terminado }]
      .map(x => `<li class="${x.ok ? '' : 'pendiente'}">${icono(x.ok ? 'check' : 'candado')}<span><b>${x.t}</b><small>${x.s} · ${x.ok ? 'completada' : 'pendiente'}</small></span></li>`).join('')}</ul>`,
  };
  const nombres = { claves: 'Claves', pistas: 'Pistas', evidencias: 'Evidencias', objetos: 'Objetos', misiones: 'Misiones' };
  const c = html(`<div class="bitacora">
    <h2>${icono('bitacora')} Bitácora del viajero</h2>
    <div class="pestanas" role="tablist">${Object.keys(nombres).map(k => `<button role="tab" data-p="${k}" aria-selected="${k === pestana}">${nombres[k]}</button>`).join('')}</div>
    <div class="bit-contenido" role="tabpanel">${secciones[pestana]}</div>
  </div>`);
  c.querySelectorAll('[role=tab]').forEach(b => b.addEventListener('click', () => {
    Sonido.clic();
    c.querySelectorAll('[role=tab]').forEach(x => x.setAttribute('aria-selected', x === b));
    $('.bit-contenido', c).innerHTML = secciones[b.dataset.p];
  }));
  abrirModal(c);
}

function abrirMenu() {
  const c = html(`<div class="menu">
    <h2>Menú</h2>
    <button class="btn btn-claro" data-m="personajes">Ver personajes</button>
    <button class="btn btn-claro" data-m="intro">Repetir la introducción</button>
    <button class="btn btn-claro" data-m="inicio">Pantalla de inicio</button>
    <button class="btn btn-peligro" data-m="reiniciar">Reiniciar partida</button>
    <p class="menu-nota">Tu progreso se guarda automáticamente en este navegador.</p>
  </div>`);
  c.addEventListener('click', async e => {
    const b = e.target.closest('[data-m]'); if (!b) return;
    const m = b.dataset.m;
    cerrarModal();
    if (m === 'reiniciar') {
      await esperar(220);
      if (await confirmar('¿Reiniciar la partida? Se borrará todo el progreso guardado.')) { S = estadoNuevo(); guardar(); ir('inicio'); }
    } else ir(m);
  });
  abrirModal(c);
}

function confirmar(texto) {
  const c = html(`<div class="confirmar"><p>${esc(texto)}</p><div class="reto-acciones">
    <button class="btn btn-claro" data-r="no" autofocus>Cancelar</button><button class="btn btn-peligro" data-r="si">Sí, continuar</button></div></div>`);
  c.addEventListener('click', e => { const b = e.target.closest('[data-r]'); if (b) cerrarModal(b.dataset.r === 'si'); });
  return abrirModal(c).then(Boolean);
}

/* =====================================================================
   INICIO
   ===================================================================== */
// Autoverificación del validador de números (se ve en la consola si algo falla)
console.assert(aceptaNumero('1.440', 1440) && aceptaNumero('1440', 1440) && aceptaNumero('14,400', 14400), 'miles');
console.assert(aceptaNumero('232,32', 232.32) && aceptaNumero('2.5', 2.5) && aceptaNumero('2,5 m/s²', 2.5) && aceptaNumero('0,18', 0.18), 'decimales');
console.assert(!aceptaNumero('', 0) && !aceptaNumero('13', 13.5) && aceptaNumero('29,2', 29.17, 0.05), 'rechazos');

document.addEventListener('visibilitychange', () => { if (document.hidden) speechSynthesis?.cancel(); });
document.addEventListener('pointerdown', () => Sonido.iniciar(), { once: true });
ir('inicio', { guardarEstado: false });
