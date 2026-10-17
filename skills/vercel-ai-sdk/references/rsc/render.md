---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/render
---

# render (Removed)

`render` was removed in AI SDK 4.0. It was a helper to create a streamable UI from LLM providers; it was deprecated in favor of `streamUI`.

## Signature / Usage

The following import no longer works:

```ts
import { render } from '@ai-sdk/rsc';
```

Use `streamUI` instead.

## Options / Props

Parameters of the removed `render` (as documented):

| Name | Type | Description |
| --- | --- | --- |
| model | `string` | Model identifier, must be OpenAI SDK compatible. |
| provider | provider client | Currently the only provider available is OpenAI. Must match the model name. |
| initial | `ReactNode` (optional) | The initial UI to render. |
| messages | `Array<SystemMessage \| UserMessage \| AssistantMessage \| ToolMessage>` | Conversation messages. `AssistantMessage` may carry `tool_calls: ToolCall[]` (`id`, `type: 'function'`, `function: { name, arguments }`); `ToolMessage` has `toolCallId`. |
| functions | `ToolSet` (optional) | Tools callable by the model; each has `description?`, `parameters` (zod schema), `render?: async (parameters) => any`. |
| tools | `ToolSet` (optional) | Same shape as `functions`. |
| text | `(Text) => ReactNode` (optional) | Callback for generated tokens; `Text` has `content`, `delta`, `done`. |
| temperature | `number` (optional) | The temperature to use for the model. |

Returns any valid `ReactNode`.

## Notes

- Removed in AI SDK 4.0. Replaced by `streamUI`; during migration ensure the `messages` parameter follows the `streamUI` specification.
- AI SDK RSC is currently experimental.

## Related

- [streamUI](./stream-ui.md)
- [Migrating from RSC to UI](./migrating-to-ui.md)
