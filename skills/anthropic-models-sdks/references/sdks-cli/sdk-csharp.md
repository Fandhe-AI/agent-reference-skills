<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/csharp / last verified: 2026-08-07 -->

# C# SDK

Install and configure the Anthropic C# SDK for .NET applications with `IChatClient` integration.

## Signature / Usage

```bash
dotnet add package Anthropic
```

```csharp
using Anthropic;
using Anthropic.Models.Messages;

AnthropicClient client = new();

MessageCreateParams parameters = new()
{
    MaxTokens = 1024,
    Messages = [ new() { Role = Role.User, Content = "Hello, Claude" } ],
    Model = Model.ClaudeOpus5,
};

var message = await client.Messages.Create(parameters);

foreach (var block in message.Content)
{
    if (block.TryPickText(out var textBlock))
        Console.WriteLine(textBlock.Text);
}
```

Streaming:

```csharp
await foreach (var message in client.Messages.CreateStreaming(parameters))
{
    Console.WriteLine(message);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ApiKey` / `ANTHROPIC_API_KEY` | string | API key |
| `AuthToken` / `ANTHROPIC_AUTH_TOKEN` | string | Auth token alternative |
| `BaseUrl` / `ANTHROPIC_BASE_URL` | string | Required, defaults to `https://api.anthropic.com` |
| `MaxRetries` | int | Retry count (default 2) |
| `Timeout` | `TimeSpan` | Request timeout (default 10 minutes) |
| `ResponseValidation` | bool | Validate response shape upfront |

Exception hierarchy: `AnthropicApiException` base, with `AnthropicBadRequestException` (400), `AnthropicUnauthorizedException` (401), `AnthropicForbiddenException` (403), `AnthropicNotFoundException` (404), `AnthropicUnprocessableEntityException` (422), `AnthropicRateLimitException` (429), `Anthropic5xxException` (5xx), `AnthropicUnexpectedStatusCodeException` (others); all 4xx inherit `Anthropic4xxException`.

## Notes

- Currently in beta; APIs may change between versions. Requires .NET Standard 2.0+.
- As of v10+, the `Anthropic` NuGet package is the official SDK. Versions 3.x and below were the community `tryAGI.Anthropic` client — migrate the package reference if you relied on that.
- `WithOptions(options => options with { ... })` creates a temporarily modified client/service reusing the same connection and thread pools.
- Provides `IChatClient` integration (`Microsoft.Extensions.AI.Abstractions`) via `client.AsIChatClient("claude-opus-5")`, enabling use with libraries like the MCP C# SDK.
- Pagination via `.Paginate()` (auto, returns `IAsyncEnumerable`) or `.Items` + `.HasNext()` / `.Next()` (manual).
- Platform integrations are separate NuGet packages: `Anthropic.Vertex`, `Anthropic.Bedrock` (`AnthropicBedrockMantleClient` for new projects, `AnthropicBedrockClient` legacy), `Anthropic.Aws` (beta), `Anthropic.Foundry`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [PHP SDK](./sdk-php.md)
- [SDK middleware](./middleware.md)
