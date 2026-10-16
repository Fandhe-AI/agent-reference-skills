# Get started with Foundry Local (Windows)

Run large language models locally in a C#/.NET app on Windows with the `Microsoft.AI.Foundry.Local.WinML` NuGet package. The native SDK runs in the app process and needs neither the Foundry Local CLI nor a separate local REST server. The same pattern works in a console app, WinUI 3, WPF, or any .NET host.

## Signature / Usage

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <TargetFramework>net9.0-windows10.0.26100.0</TargetFramework>
  <Nullable>enable</Nullable>
  <ImplicitUsings>enable</ImplicitUsings>
  <RuntimeIdentifiers>win-x64;win-arm64</RuntimeIdentifiers>
</PropertyGroup>
```

```bash
dotnet new console -n FoundryLocalDemo
cd FoundryLocalDemo
dotnet restore
dotnet add package Microsoft.AI.Foundry.Local.WinML
```

```csharp
using Microsoft.AI.Foundry.Local;
using Microsoft.Extensions.Logging.Abstractions;
using Betalgo.Ranul.OpenAI.ObjectModels.RequestModels;

// 1. Initialize the native in-process Foundry Local SDK.
await FoundryLocalManager.CreateAsync(
    new Configuration { AppName = "my-app" },
    NullLogger.Instance);

var manager = FoundryLocalManager.Instance;
try
{
    // 2. Look up the model in the catalog by alias.
    var catalog = await manager.GetCatalogAsync();
    var model = await catalog.GetModelAsync("phi-4-mini")
        ?? throw new Exception(
            "Model 'phi-4-mini' not found in catalog. " +
            "Check your internet connection and available model aliases.");

    // 3. Download the model if it is not already cached.
    if (!await model.IsCachedAsync())
    {
        Console.Write("Downloading phi-4-mini...");
        await model.DownloadAsync(progress =>
        {
            Console.Write($"\rDownloading phi-4-mini  {progress,5:F1}%");
        });
        Console.WriteLine();
    }

    // 4. Load the model into memory.
    await model.LoadAsync();

    // 5. Run a chat completion.
    var chatClient = await model.GetChatClientAsync();
    var response = await chatClient.CompleteChatAsync(new[]
    {
        new ChatMessage { Role = "system", Content = "You are a helpful assistant." },
        new ChatMessage { Role = "user", Content = "Explain async/await in C# in two sentences." }
    });

    if (!response.Successful)
        throw new Exception(
            $"Chat completion failed: {response.Error?.Message ?? "unknown error"} " +
            $"(code: {response.Error?.Code})");

    var content = response.Choices![0].Message.Content;
    if (string.IsNullOrEmpty(content))
        throw new Exception(
            "Model returned empty content. " +
            "Try the request again or select another compatible model variant.");

    Console.WriteLine(content);
}
finally
{
    // 6. Clean up — always runs even if an earlier step throws.
    manager.Dispose();
}
```

Streaming — insert inside the `try` block after step 5 (before `manager.Dispose()` in `finally`):

```csharp
using var cts = new CancellationTokenSource();

await foreach (var chunk in chatClient.CompleteChatStreamingAsync(
    new[] { new ChatMessage { Role = "user", Content = "Write a haiku about Windows." } },
    cts.Token))
{
    Console.Write(chunk.Choices?[0]?.Message?.Content);
}
Console.WriteLine();
```

Generation parameters — also inside the `try` block, after `GetChatClientAsync` (step 5) and before `CompleteChatAsync`/streaming:

```csharp
chatClient.Settings.Temperature = 0.7f;
chatClient.Settings.MaxTokens = 512;
chatClient.Settings.TopP = 0.9f;
```

WinUI 3 / WPF: initialize once in `App.xaml.cs` or `App.cs`, resolve `FoundryLocalManager.Instance` elsewhere, and call `Dispose()` in the exit handler.

```csharp
protected override async void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
{
    await FoundryLocalManager.CreateAsync(
        new Configuration { AppName = "MyWinUIApp" },
        NullLogger.Instance);
    // ...
}
```

Python quick-start (install only one of the two packages):

```bash
pip install foundry-local-sdk-winml   # Windows — includes hardware acceleration (recommended on Windows)
pip install foundry-local-sdk         # macOS/Linux, or Windows without hardware acceleration
```

```python
from foundry_local_sdk import Configuration, FoundryLocalManager

FoundryLocalManager.initialize(Configuration(app_name="my-app"))
manager = FoundryLocalManager.instance

model = manager.catalog.get_model("phi-4-mini")
model.download(lambda p: print(f"\rDownloading {p:.0f}%", end="", flush=True))
model.load()

client = model.get_chat_client()
for chunk in client.complete_streaming_chat([{"role": "user", "content": "Why is the sky blue?"}]):
    print(chunk.choices[0].delta.content or "", end="", flush=True)
print()

model.unload()
```

## Options / Props

| Item | Description |
|------|-------------|
| Prerequisites | Windows 11 24H2 (build 26100) or later; .NET 9.0 SDK or later; x64 or Arm64 device with enough memory and disk for the model; internet access for the initial package, model, and runtime-component downloads |
| `Microsoft.AI.Foundry.Local.WinML` | Windows package; can use Windows ML execution providers for hardware acceleration |
| `Microsoft.AI.Foundry.Local` | Same API surface without the Windows ML integration; use for non-Windows targets |
| Model alias | Pass an alias (not a full model ID) to `GetModelAsync` so Foundry Local selects a compatible variant (QNN NPU on Snapdragon, CUDA on NVIDIA, or CPU) |
| `foundry model list` | Lists available aliases (requires the optional CLI: `winget install Microsoft.FoundryLocal`, then reopen the terminal; verify with `foundry --version`) |

## Notes

- Documented as of the page dated 2026-09-21 (learn.microsoft.com, en-us). The quick-start installs the current stable package without pinning a version; the WinUI tutorial pins versions for reproducibility.
- A dedicated GPU, NPU, or Copilot+ PC is not required when the selected model has a compatible CPU variant. Acceleration and performance depend on the device, model, and execution provider.
- The quick-start uses Phi-4 Mini via alias `phi-4-mini`; catalog aliases and recommended models can change. It is separate from Phi Silica (a Windows AI API model, still a Limited Access Feature needing an unlock token, scheduled to be replaced by Aion Instruct without a token requirement).
- Troubleshooting: `OGA Error: N instances of struct Generators::Model were leaked` and `Error in cpuinfo: Unknown chip model name 'Snapdragon...'` are benign warnings. `Model '...' not found in catalog` means check the network (the catalog is fetched from the internet) or run `foundry model list`. Empty content: retry, or choose a smaller model or CPU variant and check available memory.
- pip conflict `foundry-local-sdk-winml requires onnxruntime-core==X.Y.Z`: both Python packages are installed and cannot coexist; uninstall one (`pip uninstall foundry-local-sdk` or `pip uninstall foundry-local-sdk-winml`) or use a virtual environment.
- The `foundry-local` package on PyPI (without `-sdk`) is an unrelated third-party package.
- Namespace collision: `Microsoft.AI.Foundry.Local.WinML` (Foundry Local's C# client) is distinct from the `windows-ml` category's Windows ML (`LearningModel`, bring-your-own ONNX model) in this skill.
- Full Foundry Local documentation (CLI, REST API, Python SDK, model management) lives in the Microsoft Foundry documentation, not the Windows AI docs.
- The official page presents these snippets as continuations of step 5; `chatClient` is scoped to the `try` block and the runtime is disposed in `finally`, so they must run before `Dispose()`.
- Source: https://learn.microsoft.com/en-us/windows/ai/foundry-local/get-started (retrieved 2026-10-16)

## Related

- [Microsoft.AI.Foundry.Local.WinML (Windows NuGet package)](./winml-package.md)
- [Foundry Local SDK](./sdk.md)
- [What is Foundry Local?](./overview.md)
- [Tutorial: Add local AI to a WinUI app](./winui-local-ai-tutorial.md)
