# IDWriteTextFormat

Describes the font and paragraph properties used to format text, and describes locale information. Used to draw text with a single, uniform format.

## Signature / Usage

```cpp
IDWriteTextFormat* pTextFormat = nullptr;
hr = pDWriteFactory->CreateTextFormat(
    L"Gabriola", nullptr,
    DWRITE_FONT_WEIGHT_REGULAR, DWRITE_FONT_STYLE_NORMAL, DWRITE_FONT_STRETCH_NORMAL,
    72.0f, L"en-us",
    &pTextFormat
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| GetFontFamilyName / GetFontSize / GetFontWeight / GetFontStyle / GetFontStretch | Retrieves the font properties used to create the format. |
| SetTextAlignment / GetTextAlignment | Sets/gets alignment of text relative to the layout box's leading/trailing edge. |
| SetParagraphAlignment / GetParagraphAlignment | Sets/gets alignment relative to the layout box's top/bottom edge. |
| SetWordWrapping / GetWordWrapping | Sets/gets the word wrapping option. |
| SetTrimming / GetTrimming | Sets/gets trimming options for text overflowing the layout box. |
| SetLineSpacing / GetLineSpacing | Sets/gets line spacing for multiline paragraphs. |
| SetReadingDirection / SetFlowDirection | Sets the paragraph reading/flow direction. |

## Notes

- Namespace: Win32 COM (dwrite.h). Inherits from IUnknown. Created via [IDWriteFactory::CreateTextFormat](./idwritefactory.md); properties are immutable after creation (create a new object to change them).
- To draw simple single-format text, Direct2D provides [ID2D1RenderTarget::DrawText](./id2d1rendertarget.md), which accepts an `IDWriteTextFormat` directly.
- For multi-format text or custom rendering, use [IDWriteTextLayout](./idwritetextlayout.md) instead.

## Related

- [IDWriteFactory](./idwritefactory.md)
- [IDWriteTextLayout](./idwritetextlayout.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
