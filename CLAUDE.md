# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

The repo holds one static game, «Misión Lloa: yaku kamachikkuna»: `index.html`, `styles.css`, `script.js` (editable content at the top, engine below) and `assets/`. No build, package manifest or test suite: open `index.html` directly in a browser (works offline via `file://`). Saved progress lives in `localStorage` key `misionLloa.v1`. All academic data must come from the project documents; do not invent figures.

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
