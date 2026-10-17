---
source: https://vite.dev/guide/features#hot-module-replacement
---

# Hot Module Replacement

Vite provides an HMR API over native ESM so that frameworks can apply instant, precise updates without reloading the page or losing application state.

## Signature / Usage

Framework templates created via `create-vite` already have HMR integrations pre-configured. The HMR API is exposed on `import.meta.hot` (see the plugin-api HMR pages). This section of the official page has no code example; the snippet below is taken from the Client Types section of the same page, which provides the types for the HMR API on `import.meta.hot`.

```typescript
/// <reference types="vite/client" />
```

## Notes

- First-party HMR integrations: Vue Single File Components (`@vitejs/plugin-vue`) and React Fast Refresh (`@vitejs/plugin-react`).
- Official integration for Preact via `@prefresh/vite`.
- You do not need to set these up manually: when you create an app via `create-vite`, the selected templates have them pre-configured.

## Related

- [Client Types](./client-types.md)
- HMR API overview
