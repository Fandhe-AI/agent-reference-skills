---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
---

# MRTR Input Required Flow

Server answers a request with `InputRequiredResult`; the client gathers input and retries with `inputResponses` and `requestState`.

Step 1: server responds to the initial request (`tools/call`, id 1) with `InputRequiredResult`.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "input_required",
    "inputRequests": {
      "github_login": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Please provide your GitHub username",
          "requestedSchema": {
            "type": "object",
            "properties": {
              "name": { "type": "string" }
            },
            "required": ["name"]
          }
        }
      },
      "capital_of_france": {
        "method": "sampling/createMessage",
        "params": {
          "messages": [
            {
              "role": "user",
              "content": {
                "type": "text",
                "text": "What is the capital of France?"
              }
            }
          ],
          "modelPreferences": {
            "hints": [{ "name": "claude-3-sonnet" }],
            "intelligencePriority": 0.8,
            "speedPriority": 0.5
          },
          "systemPrompt": "You are a helpful assistant.",
          "maxTokens": 100
        }
      }
    },
    "requestState": "AEAD-protected blob"
  }
}
```

Step 2: the client builds an `InputResponses` object keyed by the same identifiers.

```json
{
  "github_login": {
    "action": "accept",
    "content": {
      "name": "octocat"
    }
  },
  "capital_of_france": {
    "role": "assistant",
    "content": {
      "type": "text",
      "text": "The capital of France is Paris."
    },
    "model": "claude-3-sonnet-20240307",
    "stopReason": "endTurn"
  }
}
```

Step 3: the retry is a new request (different JSON-RPC `id`) whose params carry these fields (`schema.ts`).

```ts
export interface InputResponseRequestParams extends RequestParams {
  inputResponses?: InputResponses;
  requestState?: string;
}
```

## Notes

- Sources: `basic/patterns/mrtr.mdx` (Core Types, Basic Workflow) and `schema/2026-07-28/schema.ts` (tag `2026-07-28`); the spec shows no full retry message, so only the params interface is reproduced.
- Client MUST echo `requestState` exactly and MUST NOT include one in the retry if the result had none; the retry `id` MUST differ from the initial request.
- Servers MUST treat `requestState` as attacker-controlled and protect its integrity when it influences authorization, access or business logic.
- Replaced in 2026-07-28: server-initiated requests (`roots/list`, `sampling/createMessage`, `elicitation/create`) are delivered through MRTR; only `prompts/get`, `resources/read` and `tools/call` may return `InputRequiredResult`.
