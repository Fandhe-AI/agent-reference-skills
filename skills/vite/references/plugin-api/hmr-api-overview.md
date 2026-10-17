---
source: https://vite.dev/guide/api-hmr
---

# HMR API (import.meta.hot)

Vite exposes its manual HMR API via the special `import.meta.hot` object. This is the client HMR API; for handling HMR updates in plugins, see `handleHotUpdate`.

## Signature / Usage

```ts
interface ImportMeta {
  readonly hot?: ViteHotContext
}

interface ViteHotContext {
  readonly data: any

  accept(): void
  accept(cb: (mod: ModuleNamespace | undefined) => void): void
  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void
  accept(
    deps: readonly string[],
    cb: (mods: Array<ModuleNamespace | undefined>) => void,
  ): void

  dispose(cb: (data: any) => void): void
  prune(cb: (data: any) => void): void
  invalidate(message?: string): void

  on<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void
  off<T extends CustomEventName>(
    event: T,
    cb: (payload: InferCustomEventPayload<T>) => void,
  ): void
  send<T extends CustomEventName>(
    event: T,
    data?: InferCustomEventPayload<T>,
  ): void
}
```

Required conditional guard (enables tree-shaking in production):

```js
if (import.meta.hot) {
  // HMR code
}
```

TypeScript IntelliSense via `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

## Notes

- The manual HMR API is primarily intended for framework and tooling authors; end users usually get HMR from framework starter templates.
- Always guard all HMR API usage with `if (import.meta.hot)` so the code can be tree-shaken in production.
- Type definitions for `import.meta.hot` live in `vite/client.d.ts`.
- The `ModuleNamespace` type is `Record<string, any> & { [Symbol.toStringTag]: 'Module' }` (from `vite/types/hot.d.ts`). The same `.d.ts` at v8.3.4 also declares `acceptExports(exportNames, cb?)` on `ViteHotContext`, which the guide page does not document.
- Further reading: "Hot Module Replacement is Easy" (bjornlu.com/blog/hot-module-replacement-is-easy).

## Related

- [hot.accept](./hot-accept.md)
- [hot.dispose / hot.prune / hot.data](./hot-dispose-prune-data.md)
- [hot.decline / hot.invalidate](./hot-decline-invalidate.md)
- [hot.on / hot.off / hot.send](./hot-events.md)
- [handleHotUpdate](./hook-handle-hot-update.md)
