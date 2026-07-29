# Microsoft.AI.Foundry.Local.WinML (Windows NuGet package)

`Microsoft.AI.Foundry.Local.WinML` is the Windows-only NuGet package for consuming Foundry Local from C#/.NET. It has the same API surface as the cross-platform `Microsoft.AI.Foundry.Local` package but bundles native Windows binaries that route inference through WinML, so it auto-selects a Qualcomm (QNN) NPU, an NVIDIA GPU, or CPU via ONNX Runtime without extra code. Use it for console apps, WinUI 3 apps, WPF apps, or any other .NET host targeting Windows 11 24H2+ with a DirectX 12–capable GPU.

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
dotnet add package Microsoft.AI.Foundry.Local.WinML --version 1.0.0
dotnet add package Betalgo.Ranul.OpenAI --version 9.1.0
```

```csharp
using Microsoft.AI.Foundry.Local;
using Microsoft.Extensions.Logging.Abstractions;
using Betalgo.Ranul.OpenAI.ObjectModels.RequestModels;

await FoundryLocalManager.CreateAsync(
    new Configuration { AppName = "my-app" },
    NullLogger.Instance);

var manager = FoundryLocalManager.Instance;
try
{
    var catalog = await manager.GetCatalogAsync();
    var model = await catalog.GetModelAsync("phi-3.5-mini")
        ?? throw new Exception("Model not found in catalog.");

    if (!await model.IsCachedAsync())
        await model.DownloadAsync(progress => Console.Write($"\r{progress,5:F1}%"));

    await model.LoadAsync();

    var chatClient = await model.GetChatClientAsync();
    var response = await chatClient.CompleteChatAsync(new[]
    {
        new ChatMessage { Role = "user", Content = "Explain async/await in two sentences." }
    });

    Console.WriteLine(response.Choices![0].Message.Content);
}
finally
{
    manager.Dispose();
}
```

## Options / Props

| Package | Platform | Notes |
|---|---|---|
| `Microsoft.AI.Foundry.Local.WinML` | Windows only | Bundles native Windows binaries; auto-selects QNN NPU / NVIDIA GPU / CPU via WinML + ONNX Runtime. Requires `net9.0-windows10.0.26100.0`+ target and `win-x64`/`win-arm64` runtime identifiers. Requires a DirectX 12–capable GPU (no virtual machines without GPU passthrough). |
| `Microsoft.AI.Foundry.Local` | Windows, Linux, macOS | Same API; omits Windows-specific hardware acceleration. Use when targeting non-Windows platforms. |
| `Betalgo.Ranul.OpenAI` | — | Required alongside either package. Provides the `ChatMessage` type and related request/response models used by `CompleteChatAsync`/`CompleteChatStreamingAsync`. |

Equivalent Python packages: `foundry-local-sdk-winml` (Windows, hardware-accelerated) vs `foundry-local-sdk` (macOS/Linux, or Windows without hardware acceleration) — install only one, since both pin conflicting `onnxruntime-core` versions.

## Notes

- This is the **current SDK generation** described in Foundry Local SDK's "two SDK generations" note (`Configuration`/`CreateAsync`, `catalog.GetModelAsync`, `model.GetChatClientAsync`) — the WinML package is that same generation's Windows-optimized variant, not a third API shape.
- Streaming: `await foreach (var chunk in chatClient.CompleteChatStreamingAsync(messages, cancellationToken))`.
- Tune generation with `chatClient.Settings.Temperature`, `.MaxTokens`, `.TopP`.
- In a WinUI 3 or WPF app, call `FoundryLocalManager.CreateAsync` once during startup (for example in `App.xaml.cs`/`OnLaunched`) and resolve `FoundryLocalManager.Instance` elsewhere; call `manager.Dispose()` on app exit.
- `OGA Error: N instances of struct Generators::Model were leaked` after process exit is a benign ONNX Runtime GenAI native-resource-tracking warning, not a bug.
- A successful response with empty `Content` on the WinML backend usually means no DirectX 12–capable GPU is available (for example, a VM without GPU passthrough).
- Namespace collision: this Windows `Microsoft.AI.Foundry.Local.WinML` NuGet package (Foundry Local's C# client, this page) is distinct from the `windows-ml` category's `Windows ML` (bring-your-own ONNX model with direct `LearningModel`/execution-provider control) in this same skill — the WinML package uses Windows ML under the hood but does not expose its `LearningModel` API.

## Related

- [Foundry Local SDK (foundry-local-sdk)](./sdk.md)
- [Foundry Local Architecture](./architecture.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
