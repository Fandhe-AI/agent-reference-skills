---
source: https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures
---

# Thought signatures (generateContent)

Thought signatures are encrypted representations of the model's internal thought process, used to preserve reasoning context across multi-step interactions. Pass them back exactly as received.

## Signature / Usage

Sequential function calling: the signature rides on the `functionCall` part and must be returned in that exact part.

```json
{
  "content": {
    "role": "model",
    "parts": [
      {
        "functionCall": {
          "name": "check_flight",
          "args": {
            "flight": "AA100"
          }
        },
        "thoughtSignature": "<Signature A>"
      }
    ]
  }
}
```

Parallel function calls: the signature is on the first part only.

```json
{
  "content": {
    "parts": [
      {
        "functionCall": {
          "name": "get_current_temperature",
          "args": {
            "location": "Paris"
          }
        },
        "thoughtSignature": "<Signature_A>"// INCLUDED on First FC
      },
      {
        "functionCall": {
          "name": "get_current_temperature",
          "args": {
            "location": "London"
          }// NO signature on subsequent parallel FCs
        }
      }
    ]
  }
}
```

Expected return for parallel calls: `FC1 + signature, FC2, FR1, FR2` (not interleaved).

## Notes

- API surface: generateContent (REST / manual history). "Thought signatures are handled automatically when you use the official Google Gen AI SDKs and append the full model response object directly to history. You only need to work with thought signatures directly when using the REST API, or if you are manually extracting and returning parts history in multi-turn conversations."
- Gemini 4 and Gemini 3: you must pass back thought signatures during function calling, otherwise a validation error (4xx / 400) occurs, including with the `minimal` thinking level for Gemini 3 Flash. Validation applies to the current turn only: the first `functionCall` part in each step of the current turn must include its `thought_signature`. Error form: "Function call `<Function Call>` in the `<index of contents array>` content block is missing a `thought_signature`."
- Signatures in non-`functionCall` parts (final `text` / `inlineData` part): returning them is recommended; not strictly validated.
- Per model: Gemini 4 and Gemini 3 always put the signature on the first function call part (mandatory to return); with no function call, on the last part if a thought was generated. Gemini 2.5 puts it in the first part regardless of type (optional); with no function call, none.
- FAQ: to inject function call parts without a signature (transferred history), the source says you can set the dummy signatures `"context_engineering_is_the_way_to_go"` or `"skip_thought_signature_validator"` to skip validation, while strongly discouraging injected function call blocks.
- FAQ: interleaving parallel calls and responses as `FC1 + signature, FR1, FC2, FR2` returns a 400.
- FAQ: when streaming without a function call the signature may arrive in a part with empty text; parse until `finish_reason`.
- OpenAI compatibility: the signature appears in `tool_calls[].extra_content.google.thought_signature`.
- For Gemini 3 image models see the thinking process section of image generation.

## Related

- [Thinking (generateContent)](./thinking.md)
- [Function calling (generateContent)](./function-calling.md)
