# Migration Guides (Web)

Migration paths between web runtime package versions and legacy packages.

## Options / Props

| From | To | Breaking changes |
|------|----|-----|
| `@rive-app/webgl` | `@rive-app/webgl2` | None — update package install/import only; `webgl` deprecated since v2.37.0 |
| v1 packages | v2 packages | None — v2 adds Rive Text/Layouts/Audio/Scripting support, increasing WASM bundle size; use `@rive-app/canvas-lite` for a smaller footprint |
| `rive-js` (legacy monolithic package) | `@rive-app/webgl2` / `@rive-app/canvas` | None to the high-level API — only the package name and import statement change |

## Notes

- All three migrations preserve the high-level API surface; no code changes to `new Rive({...})` usage are required.

## Related

- [canvas-vs-webgl.md](./canvas-vs-webgl.md)
- [packages.md](./packages.md)
