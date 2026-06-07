# Loading Assets

Three strategies for supplying image, font, and audio assets to a Rive file at runtime.

## Signature / Usage

```ts
import { Rive, decodeFont, decodeImage } from "@rive-app/webgl2";

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  assetLoader: async (asset, bytes) => {
    if (asset.isFont) {
      const response = await fetch("/fonts/custom.ttf");
      const font = await decodeFont(new Uint8Array(await response.arrayBuffer()));
      asset.setFont(font);
      font.unref();
      return true;   // we handled it
    }
    if (asset.isImage) {
      const response = await fetch("/images/hero.png");
      const image = await decodeImage(new Uint8Array(await response.arrayBuffer()));
      asset.setImage(image);
      image.unref();
      return true;
    }
    return false;    // let runtime handle it
  },
});
```

## Options / Props

### Asset loading strategies

| Strategy | How | When to use |
|----------|-----|-------------|
| **Embedded** | Asset baked into the `.riv` binary | Simple setup; larger file |
| **Hosted (CDN)** | Asset stored on Rive's CDN; fetched automatically | Voyager/Enterprise plan; zero-config |
| **Referenced** | Asset excluded from binary; loaded via `assetLoader` | Minimal file size; dynamic asset selection |

### `assetLoader` callback

```ts
assetLoader: (asset: FileAsset, bytes: Uint8Array) => boolean
```

Called for every asset the runtime detects in the `.riv` file on load.

| Parameter | Type | Description |
|-----------|------|-------------|
| `asset` | `FileAsset` | Asset metadata and setter methods |
| `bytes` | `Uint8Array` | Asset bytes when embedded; empty for referenced assets |

Return `true` if your code handled the asset; `false` to let the runtime handle it.

### FileAsset properties and methods

| Member | Type | Description |
|--------|------|-------------|
| `asset.name` | `string` | Asset name as set in the editor |
| `asset.isFont` | `boolean` | True for font assets |
| `asset.isImage` | `boolean` | True for image assets |
| `asset.isAudio` | `boolean` | True for audio assets |
| `asset.cdnUuid` | `string` | CDN identifier (for hosted assets) |
| `asset.setFont(font)` | `(font: Font) => void` | Assign a decoded font |
| `asset.setImage(image)` | `(image: Image) => void` | Assign a decoded image |

### Decode helpers

| Function | Description |
|----------|-------------|
| `decodeFont(bytes: Uint8Array): Promise<Font>` | Decode raw bytes into a Rive `Font` object |
| `decodeImage(bytes: Uint8Array): Promise<Image>` | Decode raw bytes into a Rive `Image` object |

### Supported image formats

JPEG, PNG, WebP.

## Notes

- Always call `asset.unref()` (or `font.unref()` / `image.unref()`) after assigning the decoded asset to allow garbage collection.
- `enableRiveAssetCDN: false` disables automatic CDN fetching when you want full control over all asset loading.
- For Data Binding image properties, use `decodeImage` and assign via `vmi.image("name").value = decoded` — see [data-binding.md](./data-binding.md).

## Related

- [rive-constructor.md](./rive-constructor.md)
- [fonts.md](./fonts.md)
- [audio.md](./audio.md)
- [data-binding.md](./data-binding.md)
