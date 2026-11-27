# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

`escape-room/` holds «Misión Lloa: El secreto de las aguas», a static HTML/CSS/JS educational escape room with no build step and no dependencies. Open `escape-room/index.html` directly, or serve it with `python3 -m http.server 8000 --directory escape-room`. Game content (missions, answers, evidence) lives in `escape-room/js/missions.js`; dialogue and characters live in `escape-room/js/dialogue.js`. See `escape-room/README.md` for editing details. There is no automated test suite in the repo.

## Design rule

When designing any page or interface, also use the `frontend-design` skill.
# Reglas del proyecto

## Diseño de interfaces

- Para diseñar, rediseñar o pulir cualquier interfaz, usa SIEMPRE la skill `impeccable`.

## Animaciones y transiciones

- Para animaciones o transiciones de UI, usa las skills `animate` y `emil-design-eng`.

## Gestos

- Para gestos de arrastre o deslizar, usa la skill `gestures`.

## Antes de terminar una pantalla

- Usa la skill `break-ui` para probar la pantalla con datos de peor caso.
- Revisa la pantalla con `impeccable` en modo `audit`.

## Pruebas en navegador
- Después de crear o cambiar cualquier página o interfaz, ábrela con Playwright, toma una captura de pantalla y revisa que se vea y funcione bien.
- Si hay errores en la consola o algo se ve roto, corrígelo y vuelve a probar antes de dar el trabajo por terminado.
- Prueba también en tamaño móvil, no solo en escritorio.
