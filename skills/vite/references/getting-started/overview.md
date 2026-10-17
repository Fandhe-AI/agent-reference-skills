---
source: https://vite.dev/guide/
---

# Overview & Browser Support

Vite is a build tool for a faster, leaner development experience: a dev server over native ES modules plus a Rolldown-based build command.

## Signature / Usage

```bash
$ npx vite
```

Vite consists of two major parts:

- A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
- A build command that bundles your code with Rolldown, pre-configured to output highly optimized static assets for production.

## Notes

- Pronounced `/viːt/`, like "veet" (French for "quick").
- Dev browser assumption: Vite assumes a modern browser and sets `esnext` as the transform target, which prevents syntax lowering. Injected runtime code uses features in Baseline Newly Available at the time of each major release (2026-01-01 for this major).
- Production browser target: by default Baseline Widely Available browser versions as of a date fixed for each major release (for this major, browser versions released around mid-2023). The target can be lowered via configuration; legacy browsers can be supported via the official `@vitejs/plugin-legacy`.
- Trying online: StackBlitz at `vite.new/{template}`. Presets: `vanilla`, `vue`, `react`, `preact`, `lit`, `svelte`, `solid`, `qwik`, each with a `-ts` variant.
- Extensible via the Plugin API and JavaScript API with full typing support.

## Related

- [scaffolding.md](./scaffolding.md)
- [why-vite.md](./why-vite.md)
- [plugin-legacy.md](./plugin-legacy.md)
