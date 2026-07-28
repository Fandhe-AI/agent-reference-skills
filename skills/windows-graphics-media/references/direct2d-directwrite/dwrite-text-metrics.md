# DWRITE_TEXT_METRICS

Contains the metrics associated with text after layout. All coordinates are in device-independent pixels (DIPs). Retrieved via [IDWriteTextLayout::GetMetrics](./idwritetextlayout.md).

## Signature / Usage

```cpp
struct DWRITE_TEXT_METRICS {
  FLOAT  left;
  FLOAT  top;
  FLOAT  width;
  FLOAT  widthIncludingTrailingWhitespace;
  FLOAT  height;
  FLOAT  layoutWidth;
  FLOAT  layoutHeight;
  UINT32 maxBidiReorderingDepth;
  UINT32 lineCount;
};

DWRITE_TEXT_METRICS metrics;
hr = pTextLayout->GetMetrics(&metrics);
```

## Options / Props

| Field | Type | Description |
|------|------|-------------|
| left | FLOAT | Left-most point of formatted text relative to the layout box, excluding glyph overhang. |
| top | FLOAT | Top-most point of formatted text relative to the layout box, excluding glyph overhang. |
| width | FLOAT | Width of the formatted text, ignoring trailing whitespace at the end of each line. |
| widthIncludingTrailingWhitespace | FLOAT | Width including trailing whitespace at the end of each line. |
| height | FLOAT | Height of the formatted text. |
| layoutWidth | FLOAT | Initial width given to the layout. |
| layoutHeight | FLOAT | Initial height given to the layout. |
| maxBidiReorderingDepth | UINT32 | Maximum bidirectional reordering count of any line, used for hit-testing boxes. |
| lineCount | UINT32 | Total number of lines. |

## Notes

- Namespace: Win32 struct (dwrite.h).

## Related

- [IDWriteTextLayout](./idwritetextlayout.md)
