---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/agent
---

# Agent (Interface)

The `Agent` interface defines a contract for agents that can generate or stream AI-generated responses in response to prompts. Implementations such as `ToolLoopAgent` fulfill the same contract and integrate with all SDK APIs and utilities that expect an agent; you can supply custom agent classes or wrappers.

## Signature / Usage

```ts
export interface Agent<
  CALL_OPTIONS = never,
  TOOLS extends ToolSet = {},
  OUTPUT extends Output = never,
> {
  /**
   * The specification version of the agent interface. This will enable
   * us to evolve the agent interface and retain backwards compatibility.
   */
  readonly version: 'agent-v1';

  /**
   * The id of the agent.
   */
  readonly id: string | undefined;

  /**
   * The tools that the agent can use.
   */
  readonly tools: TOOLS;

  /**
   * Generates an output from the agent (non-streaming).
   */
  generate(
    options: AgentCallParameters<CALL_OPTIONS, TOOLS>,
  ): PromiseLike<GenerateTextResult<TOOLS, OUTPUT>>;

  /**
   * Streams an output from the agent (streaming).
   */
  stream(
    options: AgentStreamParameters<CALL_OPTIONS, TOOLS>,
  ): PromiseLike<StreamTextResult<TOOLS, OUTPUT>>;
}
```

`AgentCallParameters<CALL_OPTIONS, TOOLS>` is `{ options }` (required when `CALL_OPTIONS` is not `never`, otherwise `options?: never`) combined with either `{ prompt: string | Array<ModelMessage>; messages?: never }` or `{ messages: Array<ModelMessage>; prompt?: never }`, plus the optional fields listed below.

## Options / Props

Core properties and methods:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `version` | `'agent-v1'` | — | Interface version for compatibility. |
| `id` | `string \| undefined` | — | Optional agent identifier. |
| `tools` | `ToolSet` | — | The set of tools available to this agent. |
| `generate()` | `PromiseLike<GenerateTextResult<TOOLS, OUTPUT>>` | — | Generates full, non-streaming output for a text prompt or messages. |
| `stream()` | `PromiseLike<StreamTextResult<TOOLS, OUTPUT>>` | — | Streams output (chunks or steps) for a text prompt or messages. |

Generic parameters:

| Parameter | Default | Description |
| --- | --- | --- |
| `CALL_OPTIONS` | `never` | Optional type for additional call options that can be passed to the agent. |
| `TOOLS` | `{}` | The type of the tool set available to this agent. |
| `OUTPUT` | `never` | The type of additional output data that the agent can produce. |

Method parameters (`generate()` takes `AgentCallParameters`; `stream()` takes `AgentStreamParameters`, which extends it with an optional `experimental_transform`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | `string \| Array<ModelMessage>` | — | Optional. Use `prompt` or `messages`, not both. |
| `messages` | `Array<ModelMessage>` | — | Optional. Mutually exclusive with `prompt`. |
| `options` | `CALL_OPTIONS` | — | Additional call options when `CALL_OPTIONS` is not `never`. |
| `abortSignal` | `AbortSignal` | — | Cancel the operation. |
| `timeout` | `number \| { totalMs?: number }` | — | Timeout in milliseconds. The call will be aborted if it takes longer than the specified timeout. Can be used alongside `abortSignal`. |
| `experimental_sandbox` | `Experimental_SandboxSession` | — | Experimental sandbox environment forwarded to tool execution. |
| `onStart` | `GenerateTextOnStartCallback<TOOLS>` | — | Called when the agent operation begins, before any LLM calls. |
| `onStepStart` | `GenerateTextOnStepStartCallback<TOOLS>` | — | Called when a step (LLM call) begins, before the provider is called. |
| `onToolExecutionStart` | `OnToolExecutionStartCallback<TOOLS>` | — | Called right before a tool's execute function runs. |
| `onToolExecutionEnd` | `OnToolExecutionEndCallback<TOOLS>` | — | Called right after a tool's execute function completes or errors. |
| `onStepEnd` | `GenerateTextOnStepEndCallback<TOOLS>` | — | Called after each agent step (LLM/tool call) completes. |
| `onStepFinish` | `GenerateTextOnStepFinishCallback<TOOLS>` | — | Deprecated alias for `onStepEnd`. |
| `onEnd` | `GenerateTextOnEndCallback<TOOLS>` | — | Called when all steps are finished and the response is complete. |
| `onFinish` | `GenerateTextOnEndCallback<TOOLS>` | — | Deprecated alias for `onEnd`. |

### Example: Custom Agent Implementation (minimal sketch from the official page)

```ts
import { Agent, GenerateTextResult, StreamTextResult } from 'ai';
import type { ModelMessage } from '@ai-sdk/provider-utils';

class MyEchoAgent implements Agent {
  version = 'agent-v1' as const;
  id = 'echo';
  tools = {};

  async generate({ prompt, messages, abortSignal }) {
    const text = prompt ?? JSON.stringify(messages);
    return { text, steps: [] };
  }

  async stream({ prompt, messages, abortSignal }) {
    const text = prompt ?? JSON.stringify(messages);
    return {
      textStream: (async function* () {
        yield text;
      })(),
    };
  }
}
```

## Notes

- The official `MyEchoAgent` example is a minimal sketch: it returns only `{ text, steps }` / `{ textStream }` and does not satisfy the full `GenerateTextResult` / `StreamTextResult` contract, so it will not work with `createAgentUIStream*` helpers. A real implementation should delegate to `generateText` / `streamText` (or wrap `ToolLoopAgent`) to return complete results.
- Agents should define their `tools` property, even if empty (`{}`), for compatibility with SDK utilities.
- The interface accepts both plain prompts and message arrays as input, but only one at a time.
- All SDK utilities that accept an agent (`createAgentUIStream`, `createAgentUIStreamResponse`, `pipeAgentUIStreamToResponse`) expect an object adhering to the `Agent` interface. `ToolLoopAgent` is the official implementation (recommended for multi-step workflows with tool use).
- Distinct from other skills: this is the AI SDK `Agent` interface (`version: 'agent-v1'`), not the OpenAI Agents SDK `Agent` (openai-agents), the Claude Agent SDK (anthropic-agent-sdk), Managed Agents (anthropic-managed-agents) or Hermes (hermes-agent).

## Related

- [ToolLoopAgent](./tool-loop-agent.md)
- [createAgentUIStream](./create-agent-ui-stream.md)
- [createAgentUIStreamResponse](./create-agent-ui-stream-response.md)
- [pipeAgentUIStreamToResponse](./pipe-agent-ui-stream-to-response.md)
