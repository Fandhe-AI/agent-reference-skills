# Frameworks

Storybook supports a wide range of officially maintained and community-maintained frameworks for component development.

## Overview

Choose the framework that matches your project. Official frameworks are maintained by the Storybook team; community frameworks are actively developed by contributors.

```js
// .storybook/main.js
export default {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|ts)'],
};
```

## Officially Supported Frameworks

| Framework | Build Tools |
|-----------|-------------|
| Next.js | Vite (`nextjs-vite`), Webpack (`nextjs`) |
| React | Vite, Webpack |
| TanStack React | Vite (`@storybook/tanstack-react`; added in 10.4.0, requires React >= 18 and Vite >= 7) |
| React Native Web | Vite (in-browser) |
| React Native | On-device |
| Preact | Vite |
| Vue | Vite |
| Angular | Webpack (`@storybook/angular`); Vite (`@storybook/angular-vite`, Preview, planned stable in Storybook 11) |
| SvelteKit | — |
| Svelte | Vite |
| Web Components | Vite |

The per-framework pages in the official docs (13): Angular (Webpack), Angular (Vite), Next.js (Webpack), Next.js (Vite), Preact (Vite), React Native Web (Vite), React (Vite), React (Webpack 5), Svelte (Vite), SvelteKit, TanStack React (Vite), Vue (Vite), Web Components (Vite). See the `frameworks/` subcategory README for the individual pages.

## Community-Maintained Frameworks

| Framework | Build Tools |
|-----------|-------------|
| Analog | Vite |
| Nuxt | Vite |
| SolidJS | Vite |
| React | Rspack / Rsbuild |
| Vue | Rspack / Rsbuild |
| Web Components | Rspack / Rsbuild |

## Notes

- Use `npm create storybook@latest --type <framework>` to install a specific framework
- Framework-specific setup guides are available in the official documentation
- The community actively maintains additional frameworks beyond those listed here

## Related

- [frameworks/README.md](./frameworks/README.md)
- [Install](./install.md)
- [Setup](./setup.md)
