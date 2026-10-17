---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/ui
---

# Harnesses with AI SDK UI

Harness streams are compatible with AI SDK UI message streams: use `useChat()` on the client and stream `HarnessAgent` output from a server route. The key difference from model-based chat routes is session management; resume or create a `HarnessAgentSession` for the chat id instead of replaying the whole UI message history into a model.

## Signature / Usage

Route (convert UI messages, run the harness turn, convert the stream back):

```ts
import { agent } from './agent';
import { detachAndPersist, resumeOrCreateSession } from './session-store';
import { getHarnessErrorMessage } from '@ai-sdk/harness/agent';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from 'ai';

export async function POST(request: Request) {
  const body: {
    id?: string;
    messages: UIMessage[];
  } = await request.json();

  if (!body.id) {
    throw new Error('Missing chat id');
  }

  const chatId = body.id;
  const messages = await convertToModelMessages(body.messages);

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: async ({ writer }) => {
        const { session } = await resumeOrCreateSession({ agent, chatId });
        const result = await agent.stream({ session, messages });

        writer.merge(
          toUIMessageStream({
            stream: result.stream,
            onError: getHarnessErrorMessage,
            onEnd: async () => {
              await detachAndPersist({ chatId, session });
            },
          }),
        );
      },
      onError: getHarnessErrorMessage,
    }),
  });
}
```

Client: `useChat({ id: 'example-chat', transport: new DefaultChatTransport({ api: '/api/chat' }) })`. Session store (`session-store.ts`): `resumeOrCreateSession({ agent, chatId })` derives `sandboxId = \`harness-${chatId}\``, calls `resumeVercelNetworkSandboxSession({ sandboxId })` when stored resume state exists, otherwise `createVercelNetworkSandboxSession({ sandboxId, runtime: 'node24', ports: [4000], template: await agent.getSandboxTemplate() })`, then `agent.createSession({ sessionId: chatId, resumeFrom, sandboxSession })`; `detachAndPersist` stores `await session.detach()` (type `HarnessAgentResumeSessionState` from `@ai-sdk/harness/agent`).

Type-safe tool parts:

```ts
import type { InferUITools, UIMessage } from 'ai';
import { agent } from './agent';

export type HarnessMessage = UIMessage<
  unknown,
  never,
  InferUITools<typeof agent.tools>
>;
```

Then use `useChat<HarnessMessage>()` on the client.

## Notes

- Stability: harness packages are experimental.
- Use durable storage instead of an in-memory map in production. The creator always creates a new sandbox and fails on a conflicting `sandboxId`; only the resume function reattaches an existing one. If no stable `sandboxId` is derived, persist `sandboxSession.id` separately.
- Creating the UI message stream before acquiring the session ensures sandbox, bootstrap, and harness startup failures are sent as UI error parts instead of generic HTTP errors. `getHarnessErrorMessage` preserves reviewed client-safe harness messages and masks unknown server errors.
- Do not use `createAgentUIStreamResponse` directly with `HarnessAgent` unless you wrap the agent to inject the required session; `HarnessAgent.stream()` requires `session` on every call.
- `session.detach()` parks the runtime and keeps the sandbox warm for the next request (includes continuation state if the turn is unfinished). `session.stop()` saves resume state and stops the runtime but not a supplied sandbox; the caller calls the network session's `destroy()` when the chat ends, not while a later request needs to reattach.
- Rendered parts: `text` and `reasoning`; typed tool parts (`tool-bash`, `tool-read`, host tools like `tool-weather`); `dynamic-tool` parts for `fileChange` and `compaction`. Check `part.state` for `input-streaming`, `input-available`, `output-available`.
- Distance: HTTP framework integration (hono, fastify, nextjs-app, tanstack-start) is covered by those skills; the route above is the Next.js-style example from the official page.

## Related

- [HarnessAgent](./harness-agent.md)
- [Workflow utilities](./workflow-utilities.md)
- [useChat](../ui/use-chat.md)
