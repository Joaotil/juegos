/* =========================================================
   missions.js — Las 6 estaciones (una por materia), sus actividades y evidencias
   Todos los datos vienen de los documentos del proyecto ABP:
   guion de Animación a la lectura, presentación ABP, fichas de
   Biología, producto de Historia, informe de Física, trabajo de
   Emprendimiento y misiones en inglés.

   Tipos de actividad (type):
   - hotspots : explorar una escena y tocar las pistas
   - quiz     : preguntas de opción (questions[].answer = índice correcto, desde 0)
   - numbers  : cálculos (fields[].answer, tol = margen aceptado)
   - place    : arrastrar y soltar (mode: match | order | classify;
                items[].zone = índice de la zona correcta)
   - catch    : minijuego «atrapa la lluvia» (cap = capacidad del depósito, demand = demanda)
   - lock     : candado de combinación (dials[].answer = número correcto)
   - pipes    : conectar canales girando piezas
   - memory   : memoria de parejas (pairs = [concepto, descripción])
   - swipe    : deslizar tarjetas a la derecha (sí) o a la izquierda (no)
   - scramble : ordenar letras para formar una frase (answer)
   - decision : decisión final con evidencias (misión 6)
   - pledge   : compromiso final (misión 7)
   ========================================================= */

const EVIDENCE = {
  E6: { name: 'Memoria de la organización inca', mission: 1, desc: 'Lección histórica de Sacsayhuamán.',
        info: 'Sacsayhuamán fue «expresión del poder estatal inca, logrado con organización colectiva» (Protzen, 1993). La mita permitió una obra antisísmica duradera.',
        source: 'Producto de Historia' },
  E5: { name: 'La oca frente a la sequía', mission: 2, desc: 'Evolución de la oca (Oxalis tuberosa).',
        info: 'Las ocas difieren en color, forma y tamaño (Castañeta et al., 2022). Ante la sequía, las plantas con rasgos heredables favorables sobreviven y se reproducen más. El intercambio de material de siembra es flujo génico, no selección natural (Llaja-Zuta et al., 2026).',
        source: 'Fichas de Biología' },
  E4: { name: 'Física del transporte de agua', mission: 3, desc: 'Segunda ley de Newton aplicada al agua.',
        info: 'F = m · a. Ensayo 2: 5,48 N ÷ 7 kg ≈ 0,78 m/s². A fuerza constante, más masa de agua produce menor aceleración. El 9,8 m/s² anotado en la tabla corresponde a la gravedad, no al carrito.',
        source: 'Informe y consulta de Física' },
  E1: { name: 'Depósitos al límite', mission: 4, desc: 'Capacidad frente a demanda.',
        info: 'Los depósitos comunitarios no tienen capacidad suficiente para almacenar el agua necesaria. La demanda es de 15 unidades, pero solo hay 10 disponibles (7 en sequía crítica).',
        source: 'Guion · Presentación ABP' },
  E2: { name: 'Balance de necesidades', mission: 4, desc: 'Cuánta agua necesita cada familia.',
        info: 'Familia A 6 u + Familia B 5 u + Familia C 4 u = 15 u. Déficit de 5 u con la disponibilidad inicial (10 u) y de 8 u en sequía crítica (7 u).',
        source: 'Presentación ABP · Matemática' },
  E3: { name: 'Reparto justo por turnos', mission: 4, desc: 'Distribución proporcional del agua.',
        info: 'Con 7 u en sequía: Familia A 2,8 u · Familia B 2,33 u · Familia C 1,87 u (proporción 6 : 5 : 4). Los turnos ordenados evitan que unas familias reciban demasiado y otras se queden sin agua.',
        source: 'Guion · Matemática' },
  E9: { name: 'Cálculo de llenado', mission: 4, desc: 'Cuánto se llena el depósito frente a la demanda.',
        info: 'Frente a una demanda de 15 u, el almacenamiento cubre el 66,7 % con 10 u y solo el 46,7 % en sequía crítica (7 u). Faltan 8 u de almacenamiento.',
        source: 'Presentación ABP · Matemática' },
  E11: { name: 'Radio Lloa (English)', mission: 5, desc: 'El mensaje de la comunidad en inglés.',
        info: 'Not enough community water tanks. Build more deposits and manage water responsibly. Save water, save lives!',
        source: 'Missions: Save the water in Lloa' },
  E8: { name: 'Alternativas sostenibles', mission: 6, desc: 'Qué soluciones sirven y cuáles no.',
        info: 'Sirven: mejorar los depósitos existentes, construir nuevos espacios de almacenamiento, recolectar agua de lluvia y riego por goteo. Se descartan: cambiarse de ubicación, cerrar depósitos o desperdiciar agua.',
        source: 'Guion · Emprendimiento' },
  E7: { name: 'Matriz de viabilidad', mission: 6, desc: 'Evaluación de ideas de Emprendimiento.',
        info: 'Idea A (almacenamiento ventilado) 19/20 · Idea B (riego por goteo) 17/20 · Idea C (harina y conservas) 11/20. Criterios: necesidad inmediata, recursos disponibles, gasto accesible, equidad y sostenibilidad.',
        source: 'Emprendimiento y Gestión' },
  E10: { name: 'Compromiso del guardián', mission: 6, desc: 'Tu compromiso con el agua.',
        info: 'Me comprometo a proteger y promover el cuidado del agua, evitar su desperdicio y apoyar las soluciones comunitarias.',
        source: 'Guion' }
};

/* Una estación por materia, en el orden del proyecto ABP */
const MISSIONS = [
  /* ---------------- 1 · HISTORIA ---------------- */
  {
    id: 1, label: 'Historia', title: 'La memoria de los incas', char: 'narrador', icon: 'temple',
    goal: 'Ordena la historia de Sacsayhuamán, compara dos fuentes y descubre qué enseña a Valle Verde.',
    intro: [
      ['narrador', 'Antes de cuidar el agua, recordemos a quienes vinieron antes. Los incas levantaron obras enormes en los Andes.', 'wind'],
      ['visitante', '¿Como Sacsayhuamán, en el Cusco?'],
      ['narrador', 'Exacto. Fortaleza y centro ceremonial del siglo XV, unida al Qhapaq Ñan. Ordena su historia y descubre qué nos enseña.']
    ],
    steps: [
      { type: 'place', mode: 'order', title: 'Línea del tiempo',
        prompt: 'Ordena los hechos de Sacsayhuamán del más antiguo al más reciente.',
        zones: [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }],
        items: [
          { text: 'Siglo XV · Horizonte Tardío: los incas construyen Sacsayhuamán', zone: 0 },
          { text: '1553 · Pedro Cieza de León lo describe como «obra de gigantes»', zone: 1 },
          { text: '1993 · Jean-Pierre Protzen lo estudia como centro ceremonial', zone: 2 },
          { text: 'Hoy · cada año se celebra allí el Inti Raymi', zone: 3 }
        ],
        hint: 'Siglo XV es antes de 1553.' },
      { type: 'quiz', title: 'Reto de las fuentes',
        prompt: 'Lee las dos fuentes sobre Sacsayhuamán.',
        sources: [
          ['Fuente A · Pedro Cieza de León (1553)', '«Esta fortaleza era tan grande y de tan grandes piedras, que parecía obra de gigantes y no de hombres…»'],
          ['Fuente B · Jean-Pierre Protzen (1993)', '«Sacsayhuamán fue un complejo centro ceremonial y expresión del poder estatal inca, logrado con organización colectiva.»']
        ],
        questions: [
          { q: '¿Cuál es la diferencia entre ambas fuentes?',
            options: ['Ambas afirman que la obra fue construida por gigantes.', 'La Fuente A expresa asombro por su tamaño monumental; la Fuente B destaca su función ceremonial y la organización colectiva.', 'La Fuente B solo describe el tamaño de las piedras.'],
            answer: 1 },
          { q: '¿Qué enseñanza de esta obra inca sirve hoy a Valle Verde?',
            options: ['Que las obras grandes y duraderas se logran con organización colectiva del trabajo.', 'Que una sola persona debe decidir sobre el agua de todos.', 'Que es mejor construir fortalezas que depósitos de agua.'],
            answer: 0 }
        ] },
      { type: 'place', mode: 'classify', title: 'El pasado en el presente',
        prompt: 'Clasifica cada tarjeta: ¿es una causa, una consecuencia, una permanencia o un cambio?',
        zones: [{ label: 'Causas' }, { label: 'Consecuencias' }, { label: 'Permanencias' }, { label: 'Cambios' }],
        items: [
          { text: 'Consolidar y proteger la capital del Tahuantinsuyo', zone: 0 },
          { text: 'Tener un espacio monumental para rituales estatales', zone: 0 },
          { text: 'Fortalecimiento del poder del Inca', zone: 1 },
          { text: 'Consolidación de la mita', zone: 1 },
          { text: 'Una obra antisísmica duradera', zone: 1 },
          { text: 'Sigue siendo un espacio sagrado del Inti Raymi', zone: 2 },
          { text: 'Desgaste por el turismo masivo', zone: 3 },
          { text: 'Crecimiento urbano del Cusco y lluvias intensas', zone: 3 }
        ],
        hint: 'Las causas explican por qué se construyó; los cambios son problemas de hoy.' }
    ],
    success: [
      ['narrador', 'Así es: los incas lograron obras duraderas trabajando juntos. Valle Verde puede hacer lo mismo con su agua.', 'success']
    ],
    evidence: ['E6']
  },

  /* ---------------- 2 · BIOLOGÍA ---------------- */
  {
    id: 2, label: 'Biología', title: 'La oca y la sequía', char: 'nami', icon: 'leaf',
    goal: 'Descubre cómo evoluciona una población de oca cuando falta el agua.',
    intro: [
      ['nami', '¡Saludos, Visitante! Soy Nami Killa, guardiana de los cultivos andinos. La oca es parte importante de nuestra alimentación y debemos protegerla.', 'wind'],
      ['visitante', '¿Qué podemos hacer para que el cultivo no se vea afectado por la falta de agua?'],
      ['nami', 'Debemos usar el agua con responsabilidad y mejorar el riego. Pero antes, entiende cómo responde la oca a la sequía.']
    ],
    steps: [
      { type: 'place', mode: 'order', title: 'La oca y la sequía',
        prompt: 'Ordena las etapas del cambio evolutivo de una población de oca frente a la sequía.',
        zones: [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' }],
        items: [
          { text: 'Variación inicial: las ocas difieren en color, forma y tamaño', zone: 0 },
          { text: 'Presión ambiental por sequía', zone: 1 },
          { text: 'Selección: sobreviven las plantas con rasgos favorables', zone: 2 },
          { text: 'Reproducción diferencial: dejan más descendencia', zone: 3 },
          { text: 'Cambio poblacional a través de las generaciones', zone: 4 }
        ],
        hint: 'Todo empieza con la variación y termina con el cambio en la población.' },
      { type: 'memory', title: 'Memoria de la oca',
        prompt: 'Voltea las cartas y encuentra cada mecanismo evolutivo con su ejemplo en la oca.',
        pairs: [
          ['Variación', 'Las ocas difieren en color, forma y tamaño.'],
          ['Aislamiento', 'Poblaciones separadas por zonas enfrentan presiones locales distintas.'],
          ['Migración (flujo génico)', 'Las comunidades intercambian material de siembra.'],
          ['Selección natural', 'En la sequía sobreviven y se reproducen más las plantas con rasgos favorables.']
        ] },
      { type: 'swipe', title: '¿Verdadero o falso?',
        prompt: 'Desliza a la derecha si la afirmación es verdadera y a la izquierda si es falsa.',
        yes: 'Verdadero', no: 'Falso',
        cards: [
          { text: 'Las muestras de oca difieren en color, forma y tamaño.', ok: true },
          { text: 'El cambio evolutivo ocurre en una sola planta, de un día para otro.', ok: false, why: 'el cambio evolutivo ocurre en la población, a través de las generaciones.' },
          { text: 'La sequía y la escasez de agua actúan como presión ambiental.', ok: true },
          { text: 'Intercambiar material de siembra entre comunidades es selección natural.', ok: false, why: 'eso es migración o flujo génico, no selección natural.' },
          { text: 'Poblaciones separadas enfrentan presiones locales distintas.', ok: true }
        ] }
    ],
    success: [
      ['nami', 'Ahora sabes que la oca resiste porque es diversa. Cuidar el agua también es cuidar esa diversidad.', 'success']
    ],
    evidence: ['E5']
  },

  /* ---------------- 3 · FÍSICA ---------------- */
  {
    id: 3, label: 'Física', title: 'La fuerza del agua', char: 'mateo', icon: 'bolt',
    goal: 'Conduce el agua por los canales y aplica la segunda ley de Newton a su transporte.',
    intro: [
      ['mateo', 'Soy el encargado de distribuir el agua. Llevarla de un lugar a otro requiere canales bien conectados… y fuerza.', 'water'],
      ['visitante', '¿Qué tiene que ver la física con el agua?'],
      ['mateo', '¡Todo! Primero conectemos los canales; luego mediremos cuánta fuerza necesita el carrito con recipientes de agua.']
    ],
    steps: [
      { type: 'pipes', title: 'Conecta los canales',
        prompt: 'Gira las piezas del canal (tócalas) para que el agua del depósito llegue a las tres familias.' },
      { type: 'numbers', title: 'Segunda ley de Newton',
        prompt: 'Un carrito con recipientes de agua tiene una masa de 2,5 kg y se hala con una fuerza neta de 5 N (sin fricción). Además, recuerda que el peso es P = m · g, con g ≈ 9,8 m/s².',
        formula: 'F = m · a  →  a = F ÷ m',
        fields: [
          { label: 'Aceleración del carrito', answer: 2, tol: 0.01, unit: 'm/s²' },
          { label: 'Peso de 6 kg de agua', answer: 58.8, tol: 0.1, unit: 'N' }
        ],
        hint: 'a = 5 ÷ 2,5. Peso = 6 × 9,8.' },
      { type: 'numbers', title: 'El laboratorio del carrito',
        prompt: 'En la práctica se midió la fuerza con un dinamómetro en cuatro ensayos.',
        table: { head: ['Ensayo', 'Masa (kg)', 'Fuerza (N)'], rows: [['1', '6', '2,94'], ['2', '7', '5,48'], ['3', '6,6', '3,67'], ['4', '4', '1,66']] },
        formula: 'a = F ÷ m',
        fields: [
          { label: 'Aceleración del ensayo 2', answer: 0.78, tol: 0.01, unit: 'm/s²' },
          { label: 'Aceleración del ensayo 4', answer: 0.415, tol: 0.006, unit: 'm/s²' }
        ],
        hint: 'Ensayo 2: 5,48 ÷ 7. Ensayo 4: 1,66 ÷ 4.' },
      { type: 'quiz', title: 'Piensa como físico',
        prompt: 'En la tabla del informe, los cuatro ensayos registraron una aceleración de 9,8 m/s².',
        questions: [
          { q: '¿Qué conclusión es correcta sobre ese dato?',
            options: ['El carrito siempre acelera 9,8 m/s², sin importar la masa ni la fuerza.', 'El 9,8 m/s² se confundió con la gravedad: con F ÷ m, el ensayo 1 da 0,49 m/s².', 'Con más masa de agua, el carrito acelera más con la misma fuerza.'],
            answer: 1 },
          { q: 'Si se duplica la fuerza neta sobre el mismo carrito, ¿qué pasa con su aceleración?',
            options: ['Se reduce a la mitad.', 'Se duplica.', 'No cambia.'],
            answer: 1 }
        ],
        hint: 'La aceleración es directamente proporcional a la fuerza.' }
    ],
    success: [
      ['mateo', '¡Canales conectados y fuerzas calculadas! Mover el agua requiere más fuerza cuanta más masa transportamos.', 'success']
    ],
    evidence: ['E4']
  },

  /* ---------------- 4 · MATEMÁTICAS ---------------- */
  {
    id: 4, label: 'Matemáticas', title: 'Cuentas del agua', char: 'rosa', icon: 'calc',
    goal: 'Calcula la demanda, el déficit, el reparto justo y el llenado del depósito.',
    intro: [
      ['rosa', 'Debemos conocer las necesidades de todos: cuánta agua requieren las familias y los agricultores.'],
      ['visitante', '¿Y cómo evitamos que algunas familias reciban demasiada agua mientras otras se quedan sin ella?'],
      ['rosa', 'Con números claros. Primero mira qué pasa cuando intentamos guardar la lluvia.', 'drip']
    ],
    steps: [
      { type: 'catch', title: 'Guarda la lluvia', cap: 10, demand: 15, grant: 'E1',
        prompt: 'Mueve el depósito (con el dedo, el mouse o las flechas) y atrapa 15 unidades de agua: lo que necesita la comunidad. ¡Esquiva la basura!' },
      { type: 'place', mode: 'match', title: 'El cuaderno mojado de Rosa',
        prompt: 'Arrastra cada cantidad a su familia (o tócala y luego toca la familia). Usa las pistas.',
        clues: ['Entre las tres familias necesitan 15 unidades de agua.', 'La familia del maíz y las hortalizas es la que más agua necesita.', 'El huerto familiar es el que menos agua necesita.'],
        zones: [
          { label: 'Familia A', sub: 'Maíz y hortalizas' },
          { label: 'Familia B', sub: 'Tubérculos andinos (oca) y pastos de altura' },
          { label: 'Familia C', sub: 'Huerto familiar y consumo agropecuario' }
        ],
        items: [{ text: '6 unidades', zone: 0 }, { text: '5 unidades', zone: 1 }, { text: '4 unidades', zone: 2 }],
        hint: 'Ordena las cantidades de mayor a menor: 6, 5 y 4.' },
      { type: 'lock', title: 'El candado del cuaderno',
        prompt: 'Cada número de la clave es un resultado: al inicio hay 10 u disponibles y en la sequía crítica solo 7 u.',
        dials: [
          { label: 'Demanda total de las tres familias', digits: 2, answer: 15 },
          { label: 'Déficit con la disponibilidad inicial', digits: 1, answer: 5 },
          { label: 'Déficit en la sequía crítica', digits: 1, answer: 8 }
        ],
        hint: 'Demanda = 6 + 5 + 4. Déficit = demanda − disponibilidad.' },
      { type: 'numbers', title: 'Turnos en la sequía', sum: 7,
        prompt: 'Reparte las 7 unidades en proporción a lo que necesita cada familia (6 : 5 : 4). Usa dos decimales.',
        formula: 'Parte de cada familia = 7 × necesidad ÷ 15',
        fields: [
          { label: 'Turno de la Familia A (necesita 6 u)', answer: 2.8, tol: 0.02, unit: 'u' },
          { label: 'Turno de la Familia B (necesita 5 u)', answer: 2.33, tol: 0.02, unit: 'u' },
          { label: 'Turno de la Familia C (necesita 4 u)', answer: 1.87, tol: 0.02, unit: 'u' }
        ],
        hint: 'Familia A: 7 × 6 ÷ 15 = 2,8. Haz lo mismo con 5 y con 4.' },
      { type: 'numbers', tank: true, title: 'Calcular el llenado', grant: 'E9',
        prompt: 'La demanda es de 15 u. Calcula qué porcentaje de ella cubre el agua almacenada (usa un decimal).',
        formula: 'Llenado (%) = agua almacenada ÷ demanda × 100',
        fields: [
          { label: 'Llenado con la disponibilidad inicial (10 u)', answer: 66.7, tol: 0.2, unit: '%' },
          { label: 'Llenado en la sequía crítica (7 u)', answer: 46.7, tol: 0.2, unit: '%' },
          { label: 'Almacenamiento que falta en sequía para cubrir la demanda', answer: 8, tol: 0, unit: 'u' }
        ],
        hint: '10 ÷ 15 × 100 y 7 ÷ 15 × 100. Lo que falta = 15 − 7.' }
    ],
    success: [
      ['rosa', '¡Ahora sabemos cuánto falta! En plena sequía solo cubrimos el 46,7 % y nos faltan 8 unidades.', 'success'],
      ['mateo', 'Y con el reparto proporcional, cada familia recibe una parte justa.']
    ],
    evidence: ['E2', 'E3']
  },

  /* ---------------- 5 · INGLÉS ---------------- */
  {
    id: 5, label: 'Inglés', title: 'Radio Lloa · English', char: 'yaku', icon: 'radio',
    goal: 'Escucha los mensajes en inglés de la radio comunitaria y sube la señal al 100 %.',
    intro: [
      ['yaku', '¡Bienvenido a Radio Lloa, la estación del agua! Aquí todo se escucha en inglés.', 'water'],
      ['visitante', '¿En inglés? ¡Perfecto para practicar la comprensión auditiva!'],
      ['yaku', 'Escucha cada mensaje, responde y sube la señal al 100 %. Good luck!']
    ],
    steps: [
      { type: 'radio', title: 'Mission: Save the water in Lloa!',
        prompt: 'Presiona PLAY para escuchar cada misión en inglés y elige la respuesta correcta. Si lo necesitas, muestra el texto.',
        questions: [
          { q: 'Mission 1. Identify the problem. What is the main water problem in Lloa?', options: ['Too many water tanks.', 'Not enough community water tanks.', 'Too much rain.'], answer: 1 },
          { q: 'Mission 2. Find a solution. What can the community do to improve water storage?', options: ['Build more water tanks.', 'Waste more water.', 'Close all water deposits.'], answer: 0 },
          { q: 'Mission 3. Save water. What should people do to save water?', options: ['Leave the taps open.', 'Use water responsibly.', 'Throw water away.'], answer: 1 },
          { q: 'Mission 4. Protect water deposits. How can we keep community water tanks clean?', options: ['Throw garbage inside.', 'Clean and maintain them regularly.', 'Leave them uncovered.'], answer: 1 },
          { q: 'Mission 5. Evaluate water storage. Why are more community deposits necessary?', options: ['To waste more water.', 'To store enough water for everyone.', 'To make water disappear.'], answer: 1 },
          { q: 'Mission 6. Complete the mission! What is the best way to solve the problem in Lloa?', options: ['Build more deposits and manage water responsibly.', 'Stop collecting water.', 'Use all the water without planning.'], answer: 0 }
        ] },
      { type: 'memory', title: 'Vocabulary match',
        prompt: 'Encuentra cada palabra en inglés con su significado en español.',
        pairs: [['water tank', 'depósito de agua'], ['rain', 'lluvia'], ['waste', 'desperdiciar'], ['store', 'almacenar'], ['clean', 'limpiar']] },
      { type: 'scramble', title: 'Secret message',
        prompt: 'Ordena las letras del mensaje final de la radio.',
        answer: 'SAVE WATER SAVE LIVES',
        hint: 'Two words repeat: SAVE…' }
    ],
    success: [
      ['yaku', 'Signal at 100 %! Save water, save lives!', 'success'],
      ['narrador', 'Ahora el mensaje de Valle Verde también se escucha en inglés.']
    ],
    evidence: ['E11']
  },

  /* ---------------- 6 · EMPRENDIMIENTO Y GESTIÓN (decisión final) ---------------- */
  {
    id: 6, label: 'Emprendimiento y Gestión', title: 'Ruta al emprendimiento', char: 'manuel', icon: 'bulb', maxScore: 150,
    goal: 'Identifica el problema, evalúa soluciones con la matriz de viabilidad y defiende tu decisión final.',
    intro: [
      ['manuel', 'Visitante, con todo lo que aprendiste, ahora toca emprender: identificar el problema, buscar soluciones y elegir la más viable.', 'mystery'],
      ['visitante', '¿Por dónde empezamos?'],
      ['manuel', 'Por recorrer la comunidad y ver quiénes están afectados. Toca los lugares marcados.']
    ],
    steps: [
      { type: 'hotspots', title: '¿Quiénes están afectados?',
        prompt: 'Toca los cuatro lugares marcados para identificar la necesidad y al grupo afectado.',
        spots: [
          { x: 57.5, y: 58, label: 'Depósito comunitario', text: 'El depósito no tiene la capacidad suficiente para almacenar el agua necesaria. Demanda total 15 u · disponibilidad 10 u.' },
          { x: 39, y: 78, label: 'Canal de riego', text: 'El agua llega por el canal, pero no hay suficiente espacio para guardarla y repartirla.' },
          { x: 78, y: 86, label: 'Chacra de oca', text: 'Los cultivos de oca necesitan agua para crecer. Si falta, la producción se verá afectada.' },
          { x: 21, y: 67, label: 'Casas de las familias', text: 'El agua debe repartirse entre los hogares y los cultivos. Las familias están preocupadas.' }
        ] },
      { type: 'quiz', title: 'La problemática',
        prompt: 'Elige un problema real de necesidad básica y descarta las opciones de traslado.',
        questions: [
          { q: '¿Qué problema trabajará el emprendimiento de Valle Verde?',
            options: ['Cambiarse de ubicación a otra comunidad.', 'Agua: los depósitos comunitarios no tienen capacidad suficiente.', 'Acceso limitado a mercados para vender la oca.'],
            answer: 1 }
        ],
        hint: 'El traslado se descarta, y el problema principal del recorrido es el agua.' },
      { type: 'swipe', title: 'Agua limpia, agua turbia', grant: 'E8',
        prompt: 'Desliza cada idea: a la derecha si ayuda a Valle Verde, a la izquierda si se descarta.',
        yes: 'Ayuda', no: 'Se descarta',
        cards: [
          { text: 'Mejorar los depósitos existentes', ok: true },
          { text: 'Cambiarse de ubicación', ok: false, why: 'en Emprendimiento se descartó abandonar el territorio.' },
          { text: 'Construir nuevos espacios de almacenamiento', ok: true },
          { text: 'Desperdiciar más agua', ok: false, why: 'desperdiciar agua agrava el déficit.' },
          { text: 'Recolectar agua de lluvia', ok: true },
          { text: 'Cerrar todos los depósitos', ok: false, why: 'sin depósitos no hay dónde guardar el agua.' },
          { text: 'Instalar riego por goteo', ok: true }
        ] },
      { type: 'numbers', title: 'Matriz de viabilidad', grant: 'E7',
        prompt: 'El equipo calificó tres ideas (1 a 5 puntos). Suma cada columna para saber cuál es la más viable.',
        table: { head: ['Criterio', 'Idea A · Almacenamiento ventilado', 'Idea B · Riego por goteo', 'Idea C · Harina y conservas'],
                 rows: [['Responde a la necesidad inmediata', '5', '4', '3'], ['Es viable con los recursos y la organización disponibles', '5', '4', '2'], ['Mantiene un gasto accesible', '5', '4', '2'], ['Favorece la equidad y la sostenibilidad', '4', '5', '4']] },
        fields: [
          { label: 'Total de la Idea A', answer: 19, tol: 0, unit: '/20' },
          { label: 'Total de la Idea B', answer: 17, tol: 0, unit: '/20' },
          { label: 'Total de la Idea C', answer: 11, tol: 0, unit: '/20' }
        ],
        hint: 'Suma los cuatro valores de cada columna.' },
      { type: 'decision', title: 'Decisión final: valorar el almacenamiento',
        intro: [
          ['mateo', 'Hemos llegado a un momento importante. Tenemos varias alternativas, pero debemos elegir una solución que realmente ayude a Valle Verde.', 'mystery'],
          ['manuel', 'Podemos mejorar los depósitos actuales, construir nuevos o recolectar agua de lluvia.'],
          ['rosa', 'También debemos pensar en las familias y en nuestros cultivos de oca. Justifica tu decisión con al menos 2 evidencias.']
        ] },
      { type: 'pledge', title: 'Compromiso con la comunidad',
        intro: [
          ['nami', 'Antes de terminar, recuerda que el agua no solo es importante para los cultivos: también lo es para la vida de todas las personas.', 'wind'],
          ['yaku', 'Cada gota cuenta. Si desperdiciamos el agua, pondremos en riesgo el futuro de nuestra comunidad.', 'drip']
        ],
        prompt: 'Marca cada compromiso y escribe tu nombre para convertirte en guardián del agua.',
        items: ['Proteger y promover el cuidado del agua.', 'Evitar su desperdicio en mi casa y en mi comunidad.', 'Apoyar las soluciones comunitarias.'] }
    ],
    proposals: [
      { id: 'P1', name: 'Mejorar los depósitos existentes, recolectar agua de lluvia y organizar turnos', quality: 3,
        covers: ['Almacenamiento', 'Distribución', 'Recursos de la comunidad'],
        relevant: ['E1', 'E2', 'E3', 'E6', 'E8', 'E9'],
        reaction: ['mateo', 'Estoy de acuerdo: mejorar los depósitos y organizar los turnos nos permitirá aprovechar mejor el agua disponible.'] },
      { id: 'P2', name: 'Construir nuevos depósitos comunitarios', quality: 2,
        covers: ['Almacenamiento'],
        relevant: ['E1', 'E2', 'E6', 'E8', 'E9'],
        reaction: ['manuel', 'Más espacio ayuda, pero sin turnos organizados el agua podría repartirse mal. Es un buen paso, aunque incompleto.'] },
      { id: 'P3', name: 'Instalar riego por goteo en las chacras', quality: 2,
        covers: ['Uso eficiente en el riego'],
        relevant: ['E2', 'E5', 'E7', 'E8'],
        reaction: ['rosa', 'Ahorraríamos agua en las chacras, pero los depósitos seguirían siendo pequeños. Ayuda, aunque no resuelve el almacenamiento.'] },
      { id: 'P4', name: 'Cambiarse de ubicación', quality: 0, covers: [], relevant: [],
        reaction: ['manuel', '¿Abandonar nuestra tierra? Esa opción ya se descartó: no responde a la necesidad de la comunidad.'] },
      { id: 'P5', name: 'Usar toda el agua sin planificar', quality: 0, covers: [], relevant: [],
        reaction: ['mateo', 'Sin planificación el depósito se vaciaría en días. Las cuentas muestran que solo cubrimos el 46,7 % en sequía.'] }
    ],
    success: [
      ['visitante', 'Me comprometo a proteger y promover el cuidado del agua, evitar su desperdicio y apoyar las soluciones comunitarias.'],
      ['rosa', '¡Así podremos proteger nuestros cultivos y tener mejores condiciones!', 'success']
    ],
    evidence: ['E10']
  }
];

/* Palabras clave que se valoran en la justificación de la decisión final */
const JUSTIFY_KEYS = [
  { label: 'Capacidad o almacenamiento', re: /capacidad|almacen|dep[oó]sito/i },
  { label: 'Datos o cálculos', re: /\d/ },
  { label: 'Déficit o lo que falta', re: /d[eé]ficit|falta|insuficiente|no alcanza/i },
  { label: 'Distribución o turnos', re: /turno|distribu|reparto|repart/i },
  { label: 'Familias u oca', re: /familia|oca|cultivo/i },
  { label: 'Lluvia o sostenibilidad', re: /lluvia|sostenib|responsab/i }
];
