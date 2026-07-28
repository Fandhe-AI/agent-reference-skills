# Return streaming text with App Actions on Windows

How to implement an action that incrementally streams text output back to the caller, useful for LLM-backed actions.

## Signature / Usage

```csharp
[WindowsAction(Description = "Get a streaming response", UsesGenerativeAI = false)]
[WindowsActionInputCombination(Inputs = ["message"], Description = "Get a streaming response for: '${message.Text}'")]
public GetStreamingResponse GetStreamingResponseAction(string message, InvocationContext context)
{
    return new GetStreamingResponse
    {
        StreamingText = new StreamingTextEntityWriter(
            ActionEntityTextFormat.Plain,
            (textWriter) => GetStreamingTextAsync(textWriter, message))
    };
}

public record GetStreamingResponse
{
    public required StreamingTextEntityWriter StreamingText { get; init; }
}
```

## Options / Props

| Approach | Type | Description |
|------|------|-------------|
| `StreamingTextEntityWriter` | class (`Microsoft.AI.Actions.Annotations`) | Callback-based writer; call `SetText` with the accumulated text on each update (also supports replacing/backtracking previous text). |
| `IAsyncEnumerable<string>` | .NET type | Simpler alternative; `yield return` each token, but doesn't support text format or backtracking. |
| Output entity kind | `"StreamingText"` | The `ActionEntityKind` used for a streaming-text output in the action definition JSON. |

## Notes

- With manual `IActionProvider` implementation, create the writer via `ActionEntityFactory.CreateStreamingTextActionEntityWriter`, run the update loop with `Task.Run`, set `context.Result = ActionInvocationResult.Success`, and call `context.SetOutputEntity(name, streamingTextWriter.ReaderEntity)`.
- Not supported by URI launch activation — streaming text requires COM activation.
- Remember to add `allowedAppInvokers` manually to the generated action JSON, since code generation for streaming actions doesn't set it automatically.

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Manually implement IActionProvider](./actions-iactionprovider-manual.md)
- [Action definition JSON schema](./actions-json.md)
