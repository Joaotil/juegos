# Misión Lloa: El secreto de las aguas

*yaku kamachikkuna · Guardianes del agua en los Andes*

Escape room educativo digital del proyecto interdisciplinario ABP de la Unidad Educativa Franciscana «San Andrés Quitumbe». El jugador visita **Valle Verde** (Lloa, Pichincha), una comunidad que cultiva oca y cuyos depósitos comunitarios no alcanzan para guardar el agua que necesita. Para ayudarla, supera 7 desafíos, reúne evidencias y defiende una decisión final basada en el cálculo del llenado.

## Cómo ejecutarlo

No necesita instalar nada ni tener internet.

1. Abre la carpeta `escape-room`.
2. Haz doble clic en `index.html`. Se abre en Chrome, Edge, Firefox o Safari.

Para proyectarlo en clase o abrirlo desde otro equipo de la misma red, puedes servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador.

Con internet se cargan las fuentes Fraunces y Nunito Sans de Google Fonts. Sin internet, el juego usa las fuentes del sistema y funciona igual.

## Estructura

```
escape-room/
├── index.html          Página principal
├── css/styles.css      Diseño, colores, animaciones y versión móvil
├── js/dialogue.js      Personajes, retratos, introducción y desenlace
├── js/missions.js      Los 7 desafíos, sus actividades, respuestas y evidencias
├── js/game.js          Puntuación, progreso, guardado (localStorage) y rúbrica
├── js/audio.js         Sonidos generados por el navegador (sin archivos)
├── js/scene.js         Paisaje de papel recortado y mapa del río (SVG)
├── js/minigames.js     Minijuegos: lluvia, candado, canales, memoria, tarjetas y letras
├── js/main.js          Pantallas, mapa, mecánicas de juego y navegación
└── assets/             Carpetas para tus imágenes, audios y personajes
```

El juego no usa bibliotecas externas.

## Cómo editar

### Textos y diálogos

- **Introducción y desenlace:** edita `STORY_INTRO` y `STORY_ENDING` en `js/dialogue.js`. Cada línea tiene este formato:

  ```js
  ['rosa', 'Texto que dice Rosa', 'sonido opcional']
  ```

- **Diálogos de cada desafío:** edita `intro` (antes de la actividad) y `success` (al terminarla) dentro de cada desafío en `js/missions.js`.

### Personajes

En `CHARACTERS` (`js/dialogue.js`) puedes cambiar:
- `name`, `role` y `desc`: nombre, papel y descripción.
- `color`: color del borde del retrato.
- `look`: colores del retrato dibujado (piel, ropa, sombrero y cabello).

Para usar una imagen propia en lugar del dibujo:
1. Guarda la imagen en `assets/characters/`, por ejemplo `rosa.png`, de forma cuadrada.
2. Agrega al personaje la línea `img: 'assets/characters/rosa.png'`.

### Actividades y respuestas

Cada desafío de `MISSIONS` (`js/missions.js`) tiene una lista `steps` de actividades. Hay seis tipos:

| Tipo | Qué es | Dónde está la respuesta |
|---|---|---|
| `quiz` | Preguntas de opción | `answer`: número de la opción correcta, contando desde 0 (0 = A, 1 = B, 2 = C) |
| `numbers` | Cálculos | `answer` y `tol`, el margen de error aceptado. Se acepta coma decimal |
| `place` | Arrastrar y soltar | `items[].zone`: zona correcta de cada tarjeta, desde 0. `mode` puede ser `match`, `order` o `classify` |
| `hotspots` | Explorar la escena tocando pistas | `x` e `y`: posición en % sobre el dibujo |
| `decision` | Decisión final del Desafío 6 | `proposals`: `quality` (0 a 3) y `relevant` (evidencias que la apoyan) |
| `pledge` | Compromiso final | `items`: lista de compromisos |
| `catch` | Minijuego «Guarda la lluvia»: mover el depósito y atrapar gotas | `cap`: capacidad del depósito; `demand`: unidades que necesita la comunidad |
| `lock` | Candado de combinación | `dials[].answer`: número correcto de cada rueda; `digits`: cuántas cifras tiene |
| `pipes` | Girar piezas de canal hasta que el agua llegue a las 3 familias | La solución está en `STEPS.pipes.SOL` (`js/minigames.js`) |
| `memory` | Memoria de parejas | `pairs`: lista de `[concepto, ejemplo]` |
| `swipe` | Deslizar tarjetas: derecha = sí, izquierda = no | `cards[].ok`: `true` si la idea ayuda; `why`: explicación si se equivoca |
| `scramble` | Ordenar letras para formar una frase | `answer`: la frase correcta |
| `radio` | Escucha en inglés: el navegador lee cada pregunta en voz alta | `questions[].answer`: opción correcta (0 = A) |

`hint` es la pista que da el personaje cuando el estudiante se equivoca.

Las evidencias están en `EVIDENCE`, al inicio de `js/missions.js`.

### Puntuación

Los valores están en `js/game.js`:
- `BASE`: 100 puntos por desafío.
- `PENALTY`: se restan 10 puntos por cada intento fallido.
- `MIN`: un desafío completado nunca vale menos de 40 puntos.
- La decisión final vale hasta 150 puntos y se calcula en `scoreDecision`. Las palabras clave que se valoran en la justificación están en `JUSTIFY_KEYS`, al final de `js/missions.js`.

### Colores

Cambia las variables de `:root` al inicio de `css/styles.css`, por ejemplo `--forest`, `--moss`, `--water` y `--beige`. El paisaje se dibuja en la función `landscape()` de `js/main.js`.

### Imágenes y sonidos

- **Sonidos:** se generan con el navegador. Para usar un archivo propio:
  1. Cópialo a `assets/audio/`.
  2. Regístralo en `FILES` (`js/audio.js`), por ejemplo `success: 'assets/audio/exito.mp3'`.

  Nombres disponibles: `click`, `drip`, `water`, `wind`, `bell`, `mystery`, `success`, `error`, `unlock` y `win`.
- **Fondo:** para usar una foto de Lloa en vez del paisaje dibujado:
  1. Guárdala en `assets/images/`, por ejemplo `lloa.jpg`.
  2. En `css/styles.css`, agrega a `.bg` la regla `background: url(../assets/images/lloa.jpg) center/cover`.
  3. En `js/main.js`, haz que `landscape()` devuelva `''`.

## Funcionalidades

- **Pantallas:** bienvenida, personajes, introducción con diálogos, mapa interactivo, 7 desafíos, desenlace y resultados.
- **Personajes:** 7 personajes con retrato, nombre, papel y voz propia. Aparecen en las escenas de cada desafío.
- **Personajes animados:** respiran, parpadean, mueven la boca y saludan mientras su diálogo se escribe letra por letra, con «voz» propia.
- **Estación de inglés «Radio Lloa»:** apartado propio con escucha en voz alta (comprensión auditiva), memoria de vocabulario y mensaje secreto.
- **Mapa del río:** vista desde arriba; el agua avanza con cada estación completada y la niebla cubre las bloqueadas.
- **Minijuegos:** atrapa la lluvia, candado de combinación, conectar canales, memoria, deslizar tarjetas y ordenar letras.
- **Mecánicas variadas:** exploración de escena, opción múltiple, cálculos, arrastrar y soltar (con mouse, dedo o teclado), ordenar, relacionar, clasificar, análisis de fuentes, retos en inglés, decisión argumentada y compromiso firmado.
- **Desbloqueo:** las misiones se abren en orden. Cada una muestra su estado: bloqueada, disponible o completada.
- **Evidencias:** 10 evidencias con nombre, descripción, información y misión de origen.
- **Decisión final:** se evalúa con una rúbrica de 150 puntos (propuesta, evidencias pertinentes y justificación), con retroalimentación y opción de reintentar.
- **Consecuencias:** las decisiones cambian la historia. Los personajes reaccionan a la propuesta elegida y el desenlace menciona tu decisión y tu nombre.
- **Gamificación:** puntos, barra de progreso, tiempo, recompensas animadas, pistas tras un error y reintentos sin límite.
- **Guardado:** el progreso se guarda automáticamente en el navegador, y el menú permite reiniciar la aventura.
- **Sonido:** efectos con botón de silencio y música ambiental opcional.
- **Adaptable:** funciona en computadora, tablet y celular, y respeta la preferencia de reducir movimiento.

## Datos usados y correcciones

Todos los datos salen de los documentos del proyecto:
- Demanda: A 6 u, B 5 u y C 4 u, con 10 u disponibles y 7 u en sequía (presentación ABP).
- Diálogos y desafíos: guion de Animación a la lectura.
- Evolución de la oca: fichas de Biología.
- Sacsayhuamán: producto de Historia.
- Segunda ley de Newton: informe de Física.
- Matriz de viabilidad: Emprendimiento y Gestión.
- Preguntas en inglés: Missions Save Water in Lloa.

Se corrigieron estos errores de los documentos:
- **Clave de respuestas en inglés.** Estaba desalineada. La correcta es 1B, 2A, 3B, 4B, 5B, 6A.
- **Matriz de Emprendimiento.** Se usaron los totales de la tabla (A 19, B 17, C 11). El mapa del documento decía «B 15» y el acertijo decía «si B suma 19».
- **Informe de Física.** Registra 9,8 m/s² en todos los ensayos. El juego lo plantea como reto: F ÷ m da otras aceleraciones, porque 9,8 m/s² es la gravedad.

**Cálculo del llenado.** Los documentos no dan litros ni medidas de los depósitos, así que el cálculo se hace en unidades:
- Con 10 u se cubre el 66,7 % de la demanda.
- En sequía, con 7 u, se cubre el 46,7 %.
- Faltan 8 u.

Si el equipo de Matemática obtiene datos reales de capacidad, se pueden cambiar en el Desafío 6 de `js/missions.js`.
