---
source: https://v2.tauri.app/reference/javascript/api/namespaceimage/
---

# image

Load and inspect images to use as window icons, tray icons and menu item icons. Images live on the Rust side (`Image extends Resource`); call `close()` when no longer needed. Also accessible with `window.__TAURI__.image` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { Image } from '@tauri-apps/api/image';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { resolveResource } from '@tauri-apps/api/path';

const icon = await Image.fromPath(await resolveResource('icons/icon.png'));
await getCurrentWindow().setIcon(icon);
await icon.close();
```

## Exports

| Name | Signature | Since |
| --- | --- | --- |
| Image.new | `static new(rgba: number[] \| Uint8Array \| ArrayBuffer, width: number, height: number): Promise<Image>` (buffer must be exactly `width * height * 4` bytes) | 2.0.0 |
| Image.fromBytes | `static fromBytes(bytes: number[] \| Uint8Array \| ArrayBuffer): Promise<Image>` | 2.0.0 |
| Image.fromPath | `static fromPath(path: string): Promise<Image>` | 2.0.0 |
| Image#rgba | `rgba(): Promise<Uint8Array<ArrayBuffer>>` (`width * height * 4` bytes) | 2.0.0 |
| Image#size | `size(): Promise<ImageSize>` | 2.0.0 |
| ImageSize | `interface ImageSize { width: number; height: number }` (pixels) | |
| JsImage | `type JsImage = string \| Uint8Array \| ArrayBuffer \| number[] \| Image` | |
| MenuIcon | `type MenuIcon = JsImage \| NativeIcon` | |
| transformImage | `transformImage<T>(image: JsImage \| null): T` (signature not stable) | |

`JsImage` variants map to `tauri::image::JsImage`: `string` is `Path`, bytes are `Bytes`, `Image` is `Resource`. The Rust `Rgba` variant is not exposed; use `Image.new`.

## Cargo features

`Image.fromPath` and `Image.fromBytes` decode PNG / ICO and need the `image-png` and/or `image-ico` features of the `tauri` crate:

```toml
[dependencies]
tauri = { version = "2", features = ["image-png"] }
```

## Notes

- The usage example resolves the icon path with `resolveResource` (the module-level source example passes a relative path); `Window.setIcon` additionally requires `core:window:allow-set-icon`.
- `Image.new` takes raw RGBA data and needs no extra feature.
- `Image.fromPath` resolves the path on the Rust side: use a path on the user's machine (e.g. from the path APIs or `resolveResource`), not a frontend asset URL.
- All commands used by this module are part of the default-enabled `core:image:default` permission set.
- Values of type `JsImage` must go through `transformImage` before being placed in `invoke` arguments; an `Image` instance is not serializable on its own.
- Tauri (Rust core + system WebView). Not Electron's API (`nativeImage`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/image.ts`.

## Related

- [core](./core.md) (`Resource`)
- [tray](./tray.md)
- [menu-items](./menu-items.md)
- [window](./window.md)
