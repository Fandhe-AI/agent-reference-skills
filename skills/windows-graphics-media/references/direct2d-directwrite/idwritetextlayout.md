# IDWriteTextLayout

Represents a block of text after it has been fully analyzed and formatted. Extends [IDWriteTextFormat](./idwritetextformat.md) with the ability to apply formatting to sub-ranges of text, and supports hit-testing and metrics.

## Signature / Usage

```cpp
IDWriteTextLayout* pTextLayout = nullptr;
hr = pDWriteFactory->CreateTextLayout(
    wszText, cTextLength, pTextFormat,
    width, height,
    &pTextLayout
    );

DWRITE_TEXT_RANGE textRange = {0, 4};
hr = pTextLayout->SetFontWeight(DWRITE_FONT_WEIGHT_BOLD, textRange);

DWRITE_TEXT_METRICS metrics;
hr = pTextLayout->GetMetrics(&metrics);
```

## Options / Props

| Method | Description |
|------|-------------|
| SetFontSize / SetFontWeight / SetFontStyle / SetFontStretch / SetFontFamilyName | Applies a format property to a text range specified by a DWRITE_TEXT_RANGE. |
| SetUnderline / SetStrikethrough | Sets underline/strikethrough for a text range. |
| SetMaxWidth / SetMaxHeight | Sets the layout box dimensions. |
| GetMetrics | Retrieves overall [DWRITE_TEXT_METRICS](./dwrite-text-metrics.md) for the formatted string. |
| GetLineMetrics / GetClusterMetrics | Retrieves per-line / per-glyph-cluster metrics. |
| HitTestPoint / HitTestTextPosition / HitTestTextRange | Hit-tests between pixel coordinates and text positions (e.g. for text selection). |
| Draw | Draws the layout using a custom IDWriteTextRenderer callback. |

## Notes

- Namespace: Win32 COM (dwrite.h). Inherits from [IDWriteTextFormat](./idwritetextformat.md). Created via [IDWriteFactory::CreateTextLayout](./idwritefactory.md).
- To draw the block of text, Direct2D provides [ID2D1RenderTarget::DrawTextLayout](./id2d1rendertarget.md). For custom rendering (e.g. per-glyph effects, GDI), implement `IDWriteTextRenderer` and call `Draw`.

## Related

- [IDWriteTextFormat](./idwritetextformat.md)
- [IDWriteFactory](./idwritefactory.md)
- [DWRITE_TEXT_METRICS](./dwrite-text-metrics.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
