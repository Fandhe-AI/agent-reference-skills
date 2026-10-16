# First Windows AI API Call

Check model readiness with `GetReadyState`, install it with `EnsureReadyAsync`, then create a `LanguageModel` and generate a response.

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        InitAI();
    }

    private async void InitAI()
    {
        OutputText.Text = "Loading..";

        var readyState = LanguageModel.GetReadyState();
        if (readyState == AIFeatureReadyState.NotReady)
        {
            var ensureResult = await LanguageModel.EnsureReadyAsync();
            if (ensureResult.Status != AIFeatureReadyResultState.Success)
            {
                throw ensureResult.ExtendedError;
            }

            readyState = LanguageModel.GetReadyState();
        }

        if (readyState != AIFeatureReadyState.Ready)
        {
            throw new Exception($"LanguageModel is unavailable: {readyState}");
        }

        using LanguageModel languageModel = 
           await LanguageModel.CreateAsync();

        string prompt = "Provide the molecular formula of glucose.";
        var result = await languageModel.GenerateResponseAsync(prompt);
        OutputText.Text = result.Text;
    }
}
```

## Notes

- Prerequisite in `Package.appxmanifest`: add `<systemai:Capability Name="systemAIModels"/>` under `<Capabilities>`, the `systemai` namespace (`xmlns:systemai="http://schemas.microsoft.com/appx/manifest/systemai/windows10"`) in `IgnorableNamespaces`, and `MaxVersionTested="10.0.26226.0"` or later.
- `GetReadyState` must be called before any call to the model. Do not call `EnsureReadyAsync` when the state is `NotSupportedOnCurrentSystem`; hide the feature or fall back instead.
- Use a Windows App SDK version meeting the get-started page requirement (stable 2.5.1 or later; Phi Silica on GPU needs 2.2.2-experimental9 or later).
- The XAML side is `<TextBlock x:Name="OutputText" HorizontalAlignment="Center" VerticalAlignment="Center" />`. Windows AI APIs (Phi Silica, `Microsoft.Windows.AI.*`) are distinct from Foundry Local and Windows ML samples in this directory.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/get-started (retrieved 2026-10-16)
