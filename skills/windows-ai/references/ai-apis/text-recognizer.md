# TextRecognizer

Performs AI-based optical character recognition (OCR) within an image, detecting, extracting, and converting text into a character stream. Runs exclusively on devices with an NPU, and is faster/more accurate than the legacy `Windows.Media.Ocr.OcrEngine`.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Imaging;
using Microsoft.Windows.AI;
using Microsoft.Graphics.Imaging;
using Windows.Graphics.Imaging;

public async Task<string> RecognizeTextFromSoftwareBitmap(SoftwareBitmap bitmap)
{
    TextRecognizer textRecognizer = await EnsureModelIsReady();
    ImageBuffer imageBuffer = ImageBuffer.CreateForSoftwareBitmap(bitmap);
    RecognizedText recognizedText = textRecognizer.RecognizeTextFromImage(imageBuffer);
    StringBuilder stringBuilder = new StringBuilder();

    foreach (var line in recognizedText.Lines)
    {
        stringBuilder.AppendLine(line.Text);
    }

    return stringBuilder.ToString();
}

public async Task<TextRecognizer> EnsureModelIsReady()
{
    if (TextRecognizer.GetReadyState() == AIFeatureReadyState.NotReady)
    {
        var loadResult = await TextRecognizer.EnsureReadyAsync();
        if (loadResult.Status != AIFeatureReadyResultState.Success)
        {
            throw new Exception(loadResult.ExtendedError.Message);
        }
    }

    return await TextRecognizer.CreateAsync();
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `CreateAsync()` | Asynchronously creates a new `TextRecognizer` instance. |
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install, same pattern as other Windows AI APIs. |
| `RecognizeTextFromImage(ImageBuffer[, TextRecognizerOptions])` | Recognizes text in an image; returns `RecognizedText` synchronously. |
| `RecognizeTextFromImageAsync(ImageBuffer[, TextRecognizerOptions])` | Asynchronous variant of the above. |
| `Close()` / `Dispose()` | Releases the recognizer; implements `IClosable`/`IDisposable`. |

## Notes

- Namespace: `Microsoft.Windows.AI.Imaging` (Windows App SDK). Distinct from the legacy `Windows.Media.Ocr.OcrEngine` platform SDK API — this NPU-accelerated recognizer supersedes it for supported devices.
- Requires NPU hardware (Copilot+ PC); no GPU/CPU fallback currently.
- Input is an `ImageBuffer` (`Microsoft.Graphics.Imaging`), obtained from a `SoftwareBitmap` via `ImageBuffer.CreateForSoftwareBitmap`.
- Characters that are illegible or very small can produce inaccurate results.
- Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`.

## Related

- [RecognizedText / RecognizedLine / RecognizedWord](./recognized-text.md)
- [Device requirements and fallback](./device-requirements.md)
