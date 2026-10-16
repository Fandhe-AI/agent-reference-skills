# Tutorial: Build a chat app with Phi Silica and .NET MAUI

Walkthrough of the Windows AI API sample for .NET MAUI (`LanguageModel` text generation and `ImageScaler`).

## Signature / Usage

Summarization via prompt engineering with `LanguageModel`:

```csharp
using Microsoft.Windows.AI; 
using Microsoft.Windows.AI.Text;
 
using LanguageModel languageModel = await LanguageModel.CreateAsync(); 
 
string inputText = "This is a large amount of text I want to have summarized.";
string prompt = $"Summarize the following text concisely:\n\n{inputText}";
 
var result = await languageModel.GenerateResponseAsync(prompt); 
 
Console.WriteLine(result.Text); 
```

## Notes

- Phi Silica APIs are a Limited Access Feature (see the `LimitedAccessFeatures` class); an unlock token is requested through the LAF Access Token Request Form. Phi Silica features are not available in China.
- Prerequisites: Copilot+ PC with NPU, Windows 11 build 26100 or later (25H2), Developer Mode, Visual Studio 2022 with the Windows application development workload, Windows App SDK 2.0.0-preview1 (`Microsoft.WindowsAppSDK` version `2.0.0-preview1`).
- Complete the .NET MAUI platform-specific steps in the get-started page first.
- Sample files: `MauiWindowsAISample.csproj` (Windows App SDK package reference and Windows `TargetFramework`), `Platforms/Windows/MainPage.cs` (implements partial methods for text generation and image scaling), `MainPage.xaml`, `MainPage.xaml.cs` (partial method definitions).
- The `LanguageModelSkill` enum (`Summarize`, `Rewrite`) is not available in Windows App SDK 2.0 preview. Prepend an instruction to the input text instead; when the Skill API is released, use `new LanguageModelOptions { Skill = LanguageModelSkill.Summarize }`.
- Run: clone `microsoft/WindowsAppSDK-Samples`, check out `release/experimental`, open `Samples/WindowsAIFoundry/cs-maui/MauiWindowsAISample.sln` in Visual Studio 2022, set "Windows Machine" as target, press F5.
- Distinct from the WinUI 3 variant of this tutorial, which targets Windows App SDK 1.8 experimental.

## Related

- [Get started building an app with Windows AI APIs](./get-started.md)
- [LanguageModel](./language-model.md)
- [ImageScaler](./image-scaler.md)
- [Tutorial: Phi Silica and WinUI 3](./phi-silica-tutorial-winui.md)
