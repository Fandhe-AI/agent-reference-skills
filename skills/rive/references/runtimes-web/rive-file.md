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
      stateMachines: "Motion",
      autoplay: true,
    });

    const r2 = new Rive({
      riveFile: file,
      canvas: document.getElementById("canvas2") as HTMLCanvasElement,
      stateMachines: "Motion",
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

### View Model access from RiveFile

| Method | Signature | Description |
|--------|-----------|-------------|
| `viewModelByName` | `(name: string) => ViewModel` | Get a View Model by name |
| `getBindableArtboard` | `(name: string) => Artboard` | Get an artboard suitable for component swap |

## Notes

- `file.init()` must be called after constructing `RiveFile` to begin loading.
- Each `Rive` instance receives independent playback state even when sharing the same `RiveFile`.
- Useful when the same `.riv` file is used in multiple locations on the same page (e.g., a list of animated cards).

## Related

- [rive-constructor.md](./rive-constructor.md)
- [data-binding.md](./data-binding.md)
