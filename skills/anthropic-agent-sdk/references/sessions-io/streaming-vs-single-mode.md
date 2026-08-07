<!-- source: https://code.claude.com/docs/en/agent-sdk/streaming-vs-single-mode.md / last verified: 2026-08-07 -->

# Streaming Input

The Claude Agent SDK supports two input modes: **Streaming Input Mode** (a persistent, interactive session) and **Single Message Input** (one-shot queries using session state and resuming).

## Signature / Usage

```typescript
// Streaming Input Mode (recommended)
async function* generateMessages(): AsyncGenerator<SDKUserMessage> {
  yield {
    type: "user",
    message: { role: "user", content: "Analyze this codebase for security issues" },
    parent_tool_use_id: null
  };
}

for await (const message of query({
  prompt: generateMessages(),
  options: { maxTurns: 10, allowedTools: ["Read", "Grep"] }
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

```typescript
// Single Message Input
try {
  for await (const message of query({
    prompt: "Explain the authentication flow",
    options: { maxTurns: 5, allowedTools: ["Read", "Grep"] }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(message.result);
    }
  }
} catch (error) {
  console.error(`Query failed: ${error}`);
}
```

## Options / Props

| Mode | Supports | Use when |
| --- | --- | --- |
| Streaming Input | Image uploads, queued messages, interruption, full tool/MCP access, real-time feedback, context persistence | Long-lived interactive sessions |
| Single Message Input | One-shot response via `query()`, session resuming (`continue`) | Stateless environments (e.g. lambda); no image attachments or mid-session control needed |

## Notes

- Streaming Input Mode lets the agent operate as a long-lived process: it takes user input, handles interruptions, surfaces permission requests, and manages sessions, with the filesystem/tool state persisting across yielded messages.
- In TypeScript, if the message generator throws (e.g. reading a missing file), the stream ends with the generic error `Claude Code process aborted by user` instead of the original error — check the generator code first, and read to the end of the output since a long minified SDK source line may precede the error text.
- In Python, a generator exception is logged at debug level and the session stalls without raising; enable debug logging if a streaming session hangs with no output.
- Single Message Input does **not** support direct image attachments, dynamic message queueing, real-time interruption, or natural multi-turn conversation.
- A single-shot `query()` call raises/throws after yielding a final error result (e.g. `error_max_turns`); wrap the loop in a try block if your code needs to continue.

## Related

- [streaming-output](./streaming-output.md)
- [sessions](./sessions.md)
