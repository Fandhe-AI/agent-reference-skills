# RecognizedText / RecognizedLine / RecognizedWord

`RecognizedText` represents the result of a `TextRecognizer` OCR operation on an image, exposing recognized `RecognizedLine` objects, each containing `RecognizedWord` tokens with bounding boxes and confidence scores.

## Signature / Usage

```csharp
ImageBuffer imageBuffer = ImageBuffer.CreateForSoftwareBitmap(bitmap);
RecognizedText result = textRecognizer.RecognizeTextFromImage(imageBuffer);

foreach (var line in result.Lines)
{
    foreach (var word in line.Words)
    {
        var bounds = word.BoundingBox; // RecognizedTextBoundingBox: TopLeft/TopRight/BottomLeft/BottomRight points
        double confidence = word.MatchConfidence; // 0.0 - 1.0
    }
}
```

## Options / Props

| Type | Member | Description |
|------|------|-------------|
| `RecognizedText` | `Lines` | Collection of `RecognizedLine` objects detected in the image. |
| `RecognizedLine` | `Text` | The full text of the line. |
| `RecognizedLine` | `Words` | Collection of `RecognizedWord` tokens in the line. |
| `RecognizedLine` | `Style` | `RecognizedLineStyle` — the detected text style. |
| `RecognizedWord` | `Text` | The tokenized word text. |
| `RecognizedWord` | `BoundingBox` | `RecognizedTextBoundingBox` struct — quadrilateral polygon (`TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`) surrounding the word. |
| `RecognizedWord` | `MatchConfidence` | Confidence level (0.0-1.0) for the recognized word. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging`. `RecognizedTextBoundingBox` is a struct (not a class); `RecognizedLineStyle` is an enum describing detected text styles.
- `BoundingBox` points can be used directly to draw overlay polygons (e.g. `Microsoft.UI.Xaml.Shapes.Polygon`) for visualizing word locations and confidence (e.g. color-coding by `MatchConfidence` thresholds).

## Related

- [TextRecognizer](./text-recognizer.md)
