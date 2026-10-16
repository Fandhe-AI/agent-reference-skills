# Foundry Local C# Quick-start

Run a chat completion with `phi-4-mini` in-process through the Foundry Local native SDK from a .NET console app.

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

## Notes

- Project setup: `dotnet new console -n FoundryLocalDemo`, set `<TargetFramework>net9.0-windows10.0.26100.0</TargetFramework>` and `<RuntimeIdentifiers>win-x64;win-arm64</RuntimeIdentifiers>`, run `dotnet restore`, then `dotnet add package Microsoft.AI.Foundry.Local.WinML`. Requires Windows 11 24H2 (build 26100) or later and the .NET 9.0 SDK or later.
- Pass a model alias (`phi-4-mini`), not a full model ID, so Foundry Local picks a compatible CPU / GPU / NPU variant. Catalog aliases can change over time.
- Phi-4 Mini here is separate from Phi Silica (Windows AI API, Limited Access Feature requiring an unlock token). For non-Windows targets use `Microsoft.AI.Foundry.Local` instead of the `.WinML` package.
- The SDK runs in the app process; the Foundry Local CLI and REST server are not required.
- Source: https://learn.microsoft.com/en-us/windows/ai/foundry-local/get-started (retrieved 2026-10-16)
