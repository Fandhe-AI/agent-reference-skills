<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/handle-streaming-refusals / last verified: 2026-10-17 -->

# Handle streaming refusals

Detect and handle refusal stop reasons in streaming responses, and retry refused requests on a fallback model.

Starting with Claude 4 models, streaming responses return `stop_reason: "refusal"` when streaming classifiers intervene to handle potential policy violations.

## API response format

```json
{
  "role": "assistant",
  "content": [{ "type": "text", "text": "Hello.." }],
  "stop_reason": "refusal",
  "stop_details": {
    "type": "refusal",
    "category": "cyber",
    "explanation": "This request was declined because it could enable cyber harm."
  }
}
```

In the event stream, `stop_details` arrives on the `message_delta` event alongside `stop_reason`. `stop_details` is always present on a refusal, but `category`/`explanation` can be `null` (for example when the refusal maps to no named category) — branch on `stop_reason` / `stop_details.type` rather than assuming those fields are populated.

## Reset context after refusal

On `stop_reason: "refusal"`, reset the conversation context (remove/rephrase the triggering turn, or clear history entirely) before continuing — attempting to continue without resetting results in repeated refusals. Usage metrics are still returned on a refusal. Whether a refused request is billed depends on when the refusal arrives and its category (see "How refusals are billed" in the official Refusals and fallback page).

## Implementation guide

```python
client = anthropic.Anthropic()
messages = []

def reset_conversation():
    global messages
    messages = []

try:
    with client.messages.stream(
        max_tokens=1024,
        messages=messages + [{"role": "user", "content": "Hello"}],
        model="claude-opus-5-5",
    ) as stream:
        for event in stream:
            if event.type == "message_delta":
                if event.delta.stop_reason == "refusal":
                    reset_conversation()
                    break
except Exception as e:
    print(f"Error: {e}")
```

## Current refusal types

| Refusal type | Response format | When it occurs |
| --- | --- | --- |
| Streaming classifier refusals | `stop_reason: "refusal"` | During streaming when content violates policies |
| API input and copyright validation | 400 error codes | When input fails validation checks |
| Model-generated refusals | Standard text responses | When the model itself refuses |

## Best practices

- **Monitor for refusals:** include `stop_reason: "refusal"` checks in your error handling.
- **Reset automatically:** implement automatic context reset when refusals are detected.
- **Fall back to another model:** configure server-side fallback or the SDK middleware so refused requests are retried on another Claude model instead of surfacing a refusal to the user. Claude Haiku 5.5 has no server-side fallback, so set up its retry in your client.
- **Redeem fallback credit on manual retries:** if you build the retry yourself, pass the refusal's fallback credit token so the retry doesn't pay the prompt-cache cost twice. Claude Haiku 5.5 refusals carry no fallback credit.
- **Provide custom messaging:** create user-friendly messages for better UX when refusals occur.
- **Track refusal patterns:** monitor refusal frequency to identify potential issues with your prompts.

## Notes

- Resetting context is not the only recovery path — refused requests can also be retried on a different Claude model via server-side fallback, SDK middleware, or a manual retry (see Refusals and fallback in anthropic-api-core).
- Migration notes: refusals are responses, not errors — they arrive as HTTP 200 with `stop_reason: "refusal"`, so monitoring built only on error rates will not surface them; track refusals as their own signal.
- On every model, a refusal includes a `stop_details` object that identifies the policy category behind the decline (`category` and `explanation` can be `null`).
- Re-sending a refused request to the same model usually results in another refusal; retry on a fallback model instead of only resetting context.
- A refused request in a Message Batch is returned as a **succeeded** result with `stop_reason: "refusal"`, not an errored result.
- Centralize handling on `stop_reason: "refusal"` rather than on model-specific behavior. For every `stop_reason` value, see handling-stop-reasons in anthropic-api-core.
- Fallback-credit / refusals-and-fallback mechanics are anthropic-api-core topics.

## Related

- [mitigate-jailbreaks](./mitigate-jailbreaks.md)
