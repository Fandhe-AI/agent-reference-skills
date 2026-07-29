# IDWriteFontFace / IDWriteFontFile

`IDWriteFontFace` exposes low-level, glyph-level font data — metrics, glyph outlines, and glyph indices — for a single physical font face, as distinct from `IDWriteFontCollection` (family/font enumeration) and `IDWriteTextLayout` (formatted text). `IDWriteFontFile` represents the underlying font file(s) backing a face and is used to check whether a file is a supported font type.

## Signature / Usage

```cpp
IDWriteFontFace* pFontFace = nullptr;
hr = pFont->CreateFontFace(&pFontFace);

UINT32 codePoints[1] = { L'A' };
UINT16 glyphIndices[1];
hr = pFontFace->GetGlyphIndices(codePoints, 1, glyphIndices);

DWRITE_GLYPH_METRICS glyphMetrics;
hr = pFontFace->GetDesignGlyphMetrics(glyphIndices, 1, &glyphMetrics);

UINT32 fileCount = 0;
pFontFace->GetFiles(&fileCount, nullptr);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetGlyphIndices | Maps UCS4 Unicode code points to glyph indices via the font's 'cmap' table. |
| GetGlyphCount | Obtains the number of glyphs in the font face. |
| GetDesignGlyphMetrics / GetGdiCompatibleGlyphMetrics | Obtains ideal or GDI-compatible glyph metrics in font design units. |
| GetGlyphRunOutline | Computes the outline of a glyph run by calling back to an outline sink (`ID2D1SimplifiedGeometrySink`-compatible). |
| GetMetrics / GetGdiCompatibleMetrics | Obtains face-wide design metrics used for layout calculations. |
| GetFiles | Obtains the `IDWriteFontFile` object(s) representing the font face. |
| GetIndex | Obtains the index of the face within its font file(s) (for TrueType collections). |
| GetType | Obtains the file format type of the font face. |
| TryGetFontTable / ReleaseFontTable | Finds and reads a raw OpenType font table by tag. |
| IsSymbolFont | Determines whether the font is a symbol font. |
| **IDWriteFontFile** — Analyze | Analyzes a file and reports whether it is a supported font type. |
| **IDWriteFontFile** — GetReferenceKey | Obtains the reference key identifying the font file, valid until the object is released. |
| **IDWriteFontFile** — GetLoader | Obtains the `IDWriteFontFileLoader` associated with the file. |

## Notes

- Namespace: Win32 COM (dwrite.h). Both interfaces inherit directly from IUnknown (not from a shared DirectWrite base type).
- `IDWriteFontFace` is created via `IDWriteFont::CreateFontFace` or `IDWriteFactory::CreateFontFace`; `IDWriteFontFile` is created via `IDWriteFactory::CreateFontFileReference` (see [IDWriteFactory](./idwritefactory.md)).
- Needed for custom text renderers and `DrawGlyphRun`-based rendering, as opposed to the higher-level `DrawText`/`DrawTextLayout` APIs on [ID2D1RenderTarget](./id2d1rendertarget.md).

## Related

- [IDWriteFactory](./idwritefactory.md)
- [IDWriteFontCollection](./idwritefontcollection.md)
- [IDWriteTextLayout](./idwritetextlayout.md)
