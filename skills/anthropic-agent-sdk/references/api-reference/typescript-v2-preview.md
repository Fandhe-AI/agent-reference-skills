<!-- source: https://code.claude.com/docs/en/agent-sdk/typescript-v2-preview.md / last verified: 2026-11-14 -->

# TypeScript SDK V2 session API (removed)

Reference for the removed V2 TypeScript Agent SDK session API, with session-based send/stream patterns for multi-turn conversations. Kept for code on Agent SDK 0.2.x or earlier.

## Signature / Usage

```typescript
import { unstable_v2_createSession } from "@anthropic-ai/claude-agent-sdk";

await using session = unstable_v2_createSession({
  model: "claude-opus-4-7"
});

await session.send("Hello!");
for await (const msg of session.stream()) {
  // Filter for assistant messages to get human-readable output
  if (msg.type === "assistant") {
    const text = msg.message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    console.log(text);
  }
}
```

Resume a stored session (V2):

```typescript
function unstable_v2_resumeSession(
  sessionId: string,
  options: {
    model: string;
    // Additional options supported
  }
): SDKSession;
```

Migration target (`query()` with `resume`):

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const resumedQuery = query({
  prompt: "What number did I ask you to remember?",
  options: {
    model: "claude-opus-4-7",
    resume: sessionId
  }
});
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `unstable_v2_createSession()` | `(options: { model: string; ... }) => SDKSession` | Creates a new session for multi-turn conversations |
| `unstable_v2_resumeSession()` | `(sessionId: string, options: { model: string; ... }) => SDKSession` | Resumes an existing session by ID |
| `unstable_v2_prompt()` | `(prompt: string, options: { model: string; ... }) => Promise<SDKResultMessage>` | One-shot convenience function for single-turn queries |
| `SDKSession.sessionId` | `readonly string` | Session ID |
| `SDKSession.send()` | `(message: string \| SDKUserMessage) => Promise<void>` | Dispatches a message |
| `SDKSession.stream()` | `() => AsyncGenerator<SDKMessage, void>` | Streams back the response |
| `SDKSession.close()` | `() => void` | Closes the session (or use `await using`, TypeScript 5.2+) |

## Notes

- The V2 session API is no longer supported. TypeScript Agent SDK 0.3.142 removes `unstable_v2_createSession`, `unstable_v2_resumeSession`, `unstable_v2_prompt`, and the `SDKSession` and `SDKSessionOptions` types.
- Agent SDK 0.2.x is the last version that includes the V2 interface. The package version jumped from 0.2.x directly to 0.3.142. To install the last V2-compatible release, pin `npm install @anthropic-ai/claude-agent-sdk@0.2`.
- Migrate to the `query()` API and the session options it accepts: pass an `AsyncIterable<SDKUserMessage>` for multi-turn conversations, or `options.resume` to continue a saved session.
- V2 did not support session forking (`forkSession` option) or some advanced streaming input patterns; those required V1 `query()`.
- Source: https://code.claude.com/docs/en/agent-sdk/typescript-v2-preview.md (fetched 2026-11-14)

## Related

- [Agent SDK reference - TypeScript](./typescript.md)
- [Work with sessions](../sessions-io/sessions.md)
- [Streaming Input](../sessions-io/streaming-vs-single-mode.md)
