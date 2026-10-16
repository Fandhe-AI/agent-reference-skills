# Text recognizer (OCR) walkthrough

WinForms sample that runs `TextRecognizer` OCR on an image file and summarizes the recognized text with `LanguageModel`.

## Signature / Usage

```csharp
private async Task<string> PerformTextRecognition()
{
    using TextRecognizer textRecognizer = await TextRecognizer.CreateAsync();
    ImageBuffer? imageBuffer = await LoadImageBufferFromFileAsync(pathToImage);

    if (imageBuffer == null)
    {
        throw new Exception("Failed to load image buffer.");
    }

    RecognizedText recognizedText = 
        textRecognizer!.RecognizeTextFromImage(imageBuffer);

    var recognizedTextLines = recognizedText.Lines.Select(line => line.Text);
    string text = string.Join(Environment.NewLine, recognizedTextLines);

    richTextBoxForImageText.Text = text;
    return text;
}
```

## Notes

- The `MainForm` class (MainForm.cs) provides Select File (loads an image into a `PictureBox`) and Process Image (OCR, then summary).
- Key functions: `SelectFile_Click`, `ProcessButton_Click`, `LoadAIModels` (loads `TextRecognizer` and `LanguageModel`), `PerformTextRecognition`, `SummarizeImageText`.
- Run: clone `microsoft/WindowsAppSDK-Samples`, switch to `release/experimental`, open `Samples/WindowsAIFoundry/cs-winforms-pckg/WindowsAISample.sln` in Visual Studio 2022, set Solution Platform to the device architecture (ARM64 for Copilot+ PCs, x64 for Intel/AMD devices), build, set as startup project, press F5.
- Hardware and setup prerequisites are in the get-started page.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/text-recognition-tutorial (retrieved 2026-10-16)

## Related

- [TextRecognizer](./text-recognizer.md)
- [RecognizedText / RecognizedLine / RecognizedWord](./recognized-text.md)
- [Get started building an app with Windows AI APIs](./get-started.md)
