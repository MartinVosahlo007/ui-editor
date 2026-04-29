# ERP Wireframe Editor — refaktorovaná codebase

Refaktor původního single-file React prototypu do vrstvené React + TypeScript aplikace.

## Spuštění

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Testy:

```bash
npm run test
```

## Architektura

Projekt je rozdělený na vrstvy:

```txt
src/
  app/                 bootstrapping, provider a napojení controlleru na UI
  domain/              čistý model editoru, reducer, šablony, palette data
  features/            aplikační případy užití: editor controller, export, persistence
  ui/                  hloupé prezentační komponenty bez business logiky
  styles/              globální styly a grid canvasu
  tests/               základní testy reduceru, registry a factory funkcí
```

### Hlavní principy

- UI komponenty přijímají data a callbacky přes props.
- Editor state se mění přes reducer a command/controller vrstvu.
- Preview komponenty jsou napojené přes registry, ne přes jeden obří `switch`/`if` blok.
- Drag/resize interakce jsou izolované v `useCanvasPointerInteractions`.
- Export a lokální save jsou mimo UI.
- Runtime self-test z původního souboru je nahrazen Vitest testy.

## Funkce

- paleta ERP komponent
- šablony List / Flow / Dashboard
- canvas se zoomem a gridem
- select, drag, resize
- layers panel
- properties panel
- density, data binding a feature flags
- preview mode
- undo / redo
- export JSON
- save/load přes localStorage
