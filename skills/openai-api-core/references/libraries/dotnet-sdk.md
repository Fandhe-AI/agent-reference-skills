# .NET SDK

Officially supported API client for C#, developed in collaboration with Microsoft. Distributed as the `OpenAI` NuGet package.

## Signature / Usage

```bash
dotnet add package OpenAI
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

ResponseResult response = await client.CreateResponseAsync(
    "gpt-5.6",
    "Say 'this is a test.'"
);

Console.WriteLine($"[ASSISTANT]: {response.GetOutputText()}");
```

## Notes

- Unlike the Python/JS SDKs, the key is read explicitly from `OPENAI_API_KEY` via `Environment.GetEnvironmentVariable` and passed to the client constructor.
- The `Responses` client API is still marked experimental (`OPENAI001` warning) at the time of writing.
- Not to be confused with the community-maintained Azure OpenAI .NET library, which targets Azure OpenAI deployments.

## Related

- [Java SDK](./java-sdk.md)
- [OpenAI CLI](./openai-cli.md)
