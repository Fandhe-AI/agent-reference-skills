---
source: https://tanstack.com/table/latest/docs/installation
---

# Installation

Install the framework-specific adapter package for your project using your preferred package manager.

## Signature / Usage

```bash
npm install @tanstack/react-table
```

## Options / Props

| Framework | Package | Requirement |
| --- | --- | --- |
| React | `@tanstack/react-table` | React 18 or newer |
| Preact | `@tanstack/preact-table` | Preact 10 or newer |
| Octane | `@tanstack/octane-table` | Octane 0.1.21. Publishes authored TypeScript/TSRX, so the app must use Octane's compiler integration (e.g. the Octane Vite plugin) |
| Vue | `@tanstack/vue-table` | Vue 3.2 or newer |
| Solid | `@tanstack/solid-table` | Solid 1.3 or newer |
| Svelte | `@tanstack/svelte-table` | Svelte 5 (built on runes). For Svelte 3/4, use TanStack Table v8 |
| Angular | `@tanstack/angular-table` | Angular 19 or newer, built on Angular Signals |
| Ember | `@tanstack/ember-table` | Ember 5.8 or newer (Embroider or ember-auto-import v2). Built on Glimmer's tracking system; supports `.gts`/`.gjs` and Glint |
| Lit | `@tanstack/lit-table` | Lit 3 (3.1.3 or newer), requires `@lit/context` peer dependency |
| Alpine | `@tanstack/alpine-table` | Alpine 3 |

## Notes

- If your framework isn't listed, use `@tanstack/table-core` directly and build your own thin adapter to manage state and rendering; browse the [source of the other adapters](https://github.com/TanStack/table/tree/main/packages) for reference.

## Related

- [Overview](./overview.md)
- [React Quick Start](./quick-start.md)
