# RiveFile

Pre-parse a `.riv` file once and share it across multiple `Rive` instances to avoid redundant loading and parsing.

## Signature / Usage

```ts
import { Rive, RiveFile } from "@rive-app/webgl2";

const file = new RiveFile({
  src: "vehicles.riv",
  onLoad: () => {
    // File is parsed and ready — create instances
    const r1 = new Rive({
      riveFile: file,
      canvas: document.getElementById("canvas1") as HTMLCanvasElement,
      stateMachine: "Motion",
      autoplay: true,
    });

    const r2 = new Rive({
      riveFile: file,
      canvas: document.getElementById("canvas2") as HTMLCanvasElement,
      stateMachine: "Motion",
      autoplay: true,
    });
  },
  onLoadError: (err) => console.error(err),
});
file.init();
```

## Options / Props

### RiveFile constructor

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` | URL or path to the `.riv` file |
| `buffer` | `ArrayBuffer` | Raw bytes alternative to `src` |
| `onLoad` | `() => void` | Called when the file is parsed and ready |
| `onLoadError` | `(err: unknown) => void` | Called on load failure |
| `assetLoader` | `AssetLoadCallback` | Custom asset loading callback |
| `enableRiveAssetCDN` | `boolean` | Allow loading assets hosted on Rive's CDN |
| `enablePerfMarks` | `boolean` | Emit `performance.mark` / `performance.measure` entries |
| `enableGPUCanvas` | `boolean` | Experimental. Render mode is fixed at import and has no setter; set it here and re-import the file to change it |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `init` | `() => Promise<void>` | Start loading/parsing; resolves when ready to pass to `new Rive({ riveFile })` |
| `on` / `off` | `(type: EventType, callback: EventCallback) => void` | Subscribe/unsubscribe `EventType.Load` and `EventType.LoadError` on the file |
| `getBindableArtboard` | `(name: string) => BindableArtboard \| null` | Named artboard as a `BindableArtboard`; set its `.viewModel` to bind a `ViewModelInstance`, or use it as a value of an artboard property on another ViewModel |
| `getDefaultBindableArtboard` | `() => BindableArtboard \| null` | Default artboard as a `BindableArtboard` |
| `viewModelByName` | `(name: string) => ViewModel \| null` | Get a View Model by name, before any `Rive` instance exists |
| `globalViewModelNames` | `() => string[]` | Names of the file's global view models, in file order |
| `cleanup` | `() => void` | Release the WASM file handle and all listeners |

## Notes

- `file.init()` must be called after constructing `RiveFile` to begin loading.
- Each `Rive` instance receives independent playback state even when sharing the same `RiveFile`.
- A GPU Canvas `RiveFile` (`enableGPUCanvas: true`) cannot be shared across `Rive` instances.
- Call `cleanup()` when the `RiveFile` is no longer needed.
- Useful when the same `.riv` file is used in multiple locations on the same page (e.g., a list of animated cards).

## Related

- [rive-constructor.md](./rive-constructor.md)
- [data-binding.md](./data-binding.md)
