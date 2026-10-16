# Fonts (React)

Loading and replacing fonts at runtime, and supplying fallback fonts for glyphs the active font cannot render.

## Signature / Usage

```tsx
import { useEffect } from "react";
import { useRive, RiveFont, decodeFont } from "@rive-app/react-webgl2";

const THAI_FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifthai/NotoSerifThai%5Bwdth%2Cwght%5D.ttf";

export default function MyRiveComponent() {
  useEffect(() => {
    const loadFonts = async () => {
      const notoSerifThai = await fetch(THAI_FONT_URL).then((res) => res.arrayBuffer());
      const riveThaiDecodedFont = await decodeFont(new Uint8Array(notoSerifThai));

      RiveFont.setFallbackFontCallback((codePoint: number, weight: number) => {
        // For Thai, use Noto Serif Thai font
        if (codePoint >= 0x0E00 && codePoint <= 0x0E7F) {
          return [riveThaiDecodedFont];
        }
        return null;
      });
    };
    loadFonts();
  }, []);

  const { RiveComponent } = useRive({
    src: "my.riv",
    autoplay: true,
    stateMachine: "State Machine 1",
  });

  return <RiveComponent />;
}
```

## Notes

- Data-bound fonts: swapped at runtime, only changes text bound to that font property (different parts of a file can use different fonts); they need not be embedded in the `.riv`. See the data-binding page (`#fonts`).
- Font assets: swapping a font asset replaces all instances of that font; useful for localization without growing the `.riv`. See the loading-assets page.
- Fallback fonts are used when the primary font cannot render a glyph (limited language/Unicode coverage, subsetted embedded font, unexpected dynamic text).
- Browsers do not allow direct access to system fonts, so fallback fonts must be provided explicitly for this runtime.
- Fallback font API available as of `v4.28.0`. `RiveFont.setFallbackFontCallback()` must be registered before Rive begins rendering.
- The callback receives the failed glyph as a Unicode code point and the font weight, and returns a list of decoded fonts (or `null`). It may be called multiple times if successive fallback fonts also lack the glyph.

## Related

- [Loading Assets](./loading-assets.md)
- [Data Binding](./data-binding.md)
- [useRive](./use-rive.md)

Source: https://rive.app/docs/runtimes/react/fonts (fetched 2026-10)
