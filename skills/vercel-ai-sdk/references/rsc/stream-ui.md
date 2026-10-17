---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/stream-ui
---

# streamUI

A helper function to create a streamable UI from LLM providers. Similar to AI SDK Core APIs and supports the same model interfaces.

## Signature / Usage

```ts
import { streamUI } from '@ai-sdk/rsc';
```

Tool with a `generate` function (from the migration guide):

```tsx
const { value: stream } = await streamUI({
  model: openai('gpt-6-astra'),
  instructions: 'you are a friendly assistant!',
  messages,
  text: async function* ({ content, done }) {
    // process text
  },
  tools: {
    displayWeather: {
      description: 'Display the weather for a location',
      inputSchema: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      generate: async function* ({ latitude, longitude }) {
        yield <div>Loading weather...</div>;

        const { value, unit } = await getWeather({ latitude, longitude });

        return <Weather value={value} unit={unit} />;
      },
    },
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| model | `LanguageModel` | The language model to use. Example: `openai("gpt-6-astra")`. |
| initial | `ReactNode` (optional) | The initial UI to render. |
| instructions | `Instructions` (optional) | Instructions that specify the behavior of the model. |
| prompt | `string` | The input prompt to generate the text from. |
| messages | `Array<SystemModelMessage \| UserModelMessage \| AssistantModelMessage \| ToolModelMessage> \| Array<UIMessage>` | A list of messages representing a conversation. Automatically converts UI messages from the `useChat` hook. |
| allowSystemInMessages | `boolean` (optional) | Whether system messages are allowed in `prompt` or `messages`. Defaults to false. System messages in `instructions` are always allowed. Enabling this for user-controlled messages can create a prompt injection risk. |
| maxOutputTokens | `number` (optional) | Maximum number of tokens to generate. |
| temperature | `number` (optional) | Temperature setting, passed through to the provider. Set either `temperature` or `topP`, not both. |
| topP | `number` (optional) | Nucleus sampling, passed through to the provider. |
| topK | `number` (optional) | Only sample from the top K options for each subsequent token. Advanced use only. |
| presencePenalty | `number` (optional) | Affects the likelihood of repeating information already in the prompt. |
| frequencyPenalty | `number` (optional) | Affects the likelihood of repeatedly using the same words or phrases. |
| stopSequences | `string[]` (optional) | Sequences that stop generation. |
| seed | `number` (optional) | Integer seed for random sampling; deterministic results if supported by the model. |
| maxRetries | `number` (optional) | Maximum number of retries. 0 disables retries. Default: 2. |
| abortSignal | `AbortSignal` (optional) | Signal used to cancel the call. |
| headers | `Record<string, string>` (optional) | Additional HTTP headers (HTTP-based providers only). |
| tools | `ToolSet` | Tools callable by the model. Each `Tool` has `description?: string`, `inputSchema` (zod schema) and `generate?: (parameters) => ReactNode \| Promise<ReactNode> \| Generator<ReactNode, ReactNode, void> \| AsyncGenerator<ReactNode, ReactNode, void>`. |
| toolChoice | `"auto" \| "none" \| "required" \| { "type": "tool", "toolName": string }` (optional) | How tools are selected. Default is `"auto"`. |
| text | `(Text) => ReactNode` (optional) | Callback for generated tokens. `Text` has `content: string` (full content), `delta: string`, `done: boolean`. |
| providerOptions | `Record<string, JSONObject> \| undefined` (optional) | Provider-specific options; outer key is the provider name. |
| onFinish | `(result: OnFinishResult) => void` (optional) | Called when the LLM response and all tool executions (tools with `generate`) are finished. `OnFinishResult` has `usage` (`LanguageModelUsage`), `value` (`ReactNode`, the final UI node), `warnings` (`Warning[] \| undefined`) and optional `response` (`{ headers?: Record<string, string> }`). |

`LanguageModelUsage` fields: `inputTokens`, `inputTokenDetails` (`noCacheTokens`, `cacheReadTokens`, `cacheWriteTokens`), `outputTokens`, `outputTokenDetails` (`textTokens`, `reasoningTokens`), `totalTokens`, `raw` (provider's original usage). All are `number | undefined` except the detail objects and `raw` (`object | undefined`).

### Returns

| Name | Type | Description |
| --- | --- | --- |
| value | `ReactNode` | The user interface based on the stream output. |
| response | `Response` (optional) | Optional response data: `{ headers?: Record<string, string> }`. |
| warnings | `Warning[] \| undefined` | Warnings from the model provider (e.g. unsupported settings). |
| stream | `AsyncIterable<StreamPart> & ReadableStream<StreamPart>` | All events (text deltas, tool calls, errors, finish). Throws when an error occurs. |

`StreamPart` variants as documented: `{ type: 'text-delta', textDelta }`, `{ type: 'tool-call', toolCallId, toolName, args }`, `{ type: 'error', error }`, `{ type: 'finish', finishReason: 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other', usage }`.

## Notes

- AI SDK RSC is currently experimental; AI SDK UI is recommended for production.
- `streamUI` does not support parallel or multi-step tool calls; see the migration page.
- In the migration guide, `streamUI` combines generating text and rendering UI in one server action; AI SDK UI separates them into `streamText` and `useChat`.

## Related

- [Migrating from RSC to UI](./migrating-to-ui.md)
- [createAI](./create-ai.md)
- [render (Removed)](./render.md)
