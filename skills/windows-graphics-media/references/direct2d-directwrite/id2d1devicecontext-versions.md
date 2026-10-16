# ID2D1DeviceContext1 – ID2D1DeviceContext7 (geometry realizations, ink, gradient mesh, sprite batch, color/SVG glyphs, SVG documents, BlendImage, paint glyph runs)

Successive versions of the Direct2D device context. Each inherits from the previous one and adds a feature group.

## Signature / Usage

```cpp
// Illustrative: the source pages contain no sample code.
// Query a context for a newer interface, then use its added methods.
ID2D1DeviceContext5* pContext5 = nullptr;
HRESULT hr = pContext->QueryInterface(__uuidof(ID2D1DeviceContext5),
                                      reinterpret_cast<void**>(&pContext5));
```

## Options / Props

| Interface | Header | Adds | Methods |
|-----------|--------|------|---------|
| ID2D1DeviceContext1 | d2d1_2.h | Geometry realizations | CreateFilledGeometryRealization; CreateStrokedGeometryRealization; DrawGeometryRealization |
| ID2D1DeviceContext2 | d2d1_3.h | Ink rendering, gradient mesh rendering, improved image loading | CreateGradientMesh; CreateImageSourceFromDxgi; CreateImageSourceFromWic (3 overloads); CreateInk; CreateInkStyle; CreateLookupTable3D; CreateTransformedImageSource; DrawGdiMetafile (3 overloads); DrawGradientMesh; DrawInk; GetGradientMeshWorldBounds |
| ID2D1DeviceContext3 | d2d1_3.h | Sprite batches | CreateSpriteBatch; DrawSpriteBatch (overloads: whole batch, or a range of sprites) |
| ID2D1DeviceContext4 | d2d1_3.h | New types of color font glyphs | CreateSvgGlyphStyle; DrawColorBitmapGlyphRun; DrawSvgGlyphRun; DrawText (2 overloads, with an ID2D1SvgGlyphStyle); DrawTextLayout; GetColorBitmapGlyphImage; GetSvgGlyphImage |
| ID2D1DeviceContext5 | d2d1_3.h | Color contexts and SVG documents | CreateColorContextFromDxgiColorSpace; CreateColorContextFromSimpleColorProfile (2 overloads); CreateSvgDocument (from a stream); DrawSvgDocument |
| ID2D1DeviceContext6 | d2d1_3.h | BlendImage | BlendImage (draws an image using the specified blend mode; equivalent to the built-in Blend effect) |
| ID2D1DeviceContext7 | d2d1_3.h | Advanced color fonts (COLR v1) | DrawGlyphRunWithColorSupport (draws a glyph run using color representations if available in the font); DrawPaintGlyphRun (draws a color glyph run in DWRITE_GLYPH_IMAGE_FORMATS_COLR_PAINT_TREE format); GetPaintFeatureLevel (maximum paint feature level supported by DrawPaintGlyphRun) |

## Notes

- Namespace: Win32 COM. Only ID2D1DeviceContext1 (Windows 8.1 / Server 2012 R2) and ID2D1DeviceContext2 (Windows 10 / Server 2016) document a minimum OS in the HTML source; the others leave it empty.
- ID2D1DeviceContext7 is marked `prerelease: true` in the sdk-api source (ms.date 09/15/2023): treat it as preview.
- ID2D1DeviceContext5 `CreateColorContextFromDxgiColorSpace` / `CreateColorContextFromSimpleColorProfile`: "only valid to use this with the Color Management Effect in 'Best' mode".
- ID2D1DeviceContext3 sprite batches: after `CreateSpriteBatch`, use `ID2D1SpriteBatch::AddSprites` to add sprites, then `DrawSpriteBatch` to draw.
- ID2D1DeviceContext4 `DrawTextLayout`: if the layout is not subsequently changed, this can be more efficient than `DrawText` when drawing the same layout repeatedly.
- Contexts are created by the versioned devices; see [ID2D1Device1 – ID2D1Device7](./id2d1device-versions.md).
- Source: https://learn.microsoft.com/en-us/windows/win32/api/d2d1_2/nn-d2d1_2-id2d1devicecontext1 and https://learn.microsoft.com/en-us/windows/win32/api/d2d1_3/nn-d2d1_3-id2d1devicecontext2 (through ID2D1DeviceContext7 in d2d1_3).

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1Device1 – ID2D1Device7](./id2d1device-versions.md)
- [ID2D1SvgDocument](./id2d1svgdocument.md)
- [ID2D1Effect](./id2d1effect.md)
