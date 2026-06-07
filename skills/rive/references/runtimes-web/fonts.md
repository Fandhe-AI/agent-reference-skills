# Fonts

Dynamic font loading and fallback font configuration for the Rive web runtime.

## Signature / Usage

```ts
import { RiveFont, decodeFont, Rive } from "@rive-app/webgl2";

// Set fallback font callback BEFORE creating Rive instance
RiveFont.setFallbackFontCallback((codePoint, weight) => {
  // Return decoded font(s) for the given Unicode code point, or null
  if (codePoint >= 0x0E00 && codePoint <= 0x0E7F) {
    return [decodedThaiFont];
  }
  return null;
});

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  assetLoader: async (asset, bytes) => {
    if (asset.isFont) {
      const res = await fetch("/fonts/custom.ttf");
      const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
      asset.setFont(font);
      font.unref();
      return true;
    }
    return false;
  },
});
```

## Options / Props

### Dynamic font loading via `assetLoader`

See [loading-assets.md](./loading-assets.md) for the full `assetLoader` API. For fonts, the key steps are:

1. Fetch the font file as an `ArrayBuffer`
2. Decode with `decodeFont(bytes: Uint8Array): Promise<Font>`
3. Call `asset.setFont(font)`
4. Call `font.unref()` to release the reference

### Fallback font API (v2.37.1+)

```ts
RiveFont.setFallbackFontCallback(
  (codePoint: number, weight: number) => Font[] | null
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `codePoint` | `number` | Unicode code point of the missing glyph |
| `weight` | `number` | Font weight value requested |

Returns an array of decoded `Font` objects to attempt in order, or `null` to skip fallback.

## Notes

- Browsers block access to system fonts for security; fallback fonts must be explicitly decoded and provided.
- `RiveFont.setFallbackFontCallback` must be called before Rive initialization to take effect.
- The fallback callback may be invoked multiple times per missing glyph if successive fallback fonts also lack support.
- Fonts embedded in the `.riv` file are loaded automatically with no extra code.

## Related

- [loading-assets.md](./loading-assets.md)
- [rive-constructor.md](./rive-constructor.md)
