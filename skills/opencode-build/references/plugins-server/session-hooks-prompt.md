---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Session Hooks: Forks and Prompt Admission

Session hooks intercept prompt admission, model calls, native HTTP, and retries. This page covers `fork` and `prompt`.

## Signature / Usage

### Forks

The `fork` hook runs after OpenCode copies the history and before the fork call returns. `sessionID` identifies the new session.

```ts
await ctx.session.hook("fork", ({ sessionID }) => console.log(sessionID))
```

### Prompt admission

Intercept incoming user prompts before attachment and skill resolution and durable inbox admission:

```ts
await ctx.session.hook("prompt", (event) => {
  event.prompt.text = event.prompt.text.replaceAll("company-secret", "[redacted]")
  event.prompt.files ??= []
  event.prompt.files.push({ uri: "file:///project/policy.md" })
  event.metadata = { ...event.metadata, source: "company-policy" }
  event.delivery = "queue"
})
```

The hook receives an owned, mutable draft:

- `prompt` contains `text`, `files`, agent mentions in `agents`, and selected `skills`.
- `metadata` contains application-defined admission metadata.
- `delivery` is `"steer"` by default and can be changed to `"queue"`.
- Session and message IDs are readonly; a hook cannot redirect admission.

Files and skills added by a hook follow the normal resolution and validation path. When rewriting text, update or remove attachment `mention` offsets that no longer match. Agent mentions do not switch the session's active agent.

Prompt hooks run under these conditions:

- Hooks run in registration order after the session's location plugins are ready.
- Commands that submit through `session.prompt` run the hook.
- Synthetic messages, shell messages, compaction controls, and move controls do not.
- The hook runs once during admission, not before every model call.
- Provider scoping is unavailable because model resolution happens after admission.

Edits become the canonical persisted user input. If preparation fails or is interrupted, OpenCode does not admit the prompt.

Keep prompt hooks retry-safe. They are not an exactly-once side-effect boundary:

- Retrying an ID already pending or delivered returns the original admission without rerunning hooks.
- Concurrent submissions can run hooks more than once, but only the first successful admission wins.
- Prompt hooks transform input and do not expose a typed rejection API.

### Reference

```ts
import type { SessionPrompt } from "@opencode/plugin/promise/session"

interface SessionHooks {
  prompt: SessionPrompt
  context: SessionContextHook
  compaction: SessionContextHook & { result?: SessionCompactionResult }
  generate: SessionContextHook
  title: SessionRequestHook & { result?: string }
  "experimental.model.resolve": SessionModelResolveHook
  "model.request": SessionModelRequestHook
  "http.request": SessionHttpRequestHook
  "http.response": SessionHttpResponseHook
  "experimental.ws.handshake": SessionWebSocketHandshakeHook
  "experimental.ws.send": SessionWebSocketSendHook
  "experimental.ws.receive": SessionWebSocketReceiveHook
  retry: SessionRetryHook
}
```

```ts
interface SessionHookContext {
  hook<Name extends keyof SessionHooks>(
    name: Name,
    callback: (event: SessionHooks[Name]) => Promise<void> | void,
    options?: Name extends "prompt" ? never : { providerID?: string },
  ): Promise<Registration>
}
```

## Notes

- Source inconsistency: the `fork` hook is documented above but is not listed in the `SessionHooks` interface in the official docs.
- The V1 `chat.message` hook migrates to the `prompt` hook.
- OpenCode plugin hooks are distinct from Claude Code hooks such as UserPromptSubmit (anthropic-claude-code-extend).

## Related

- [Hooks overview](./hooks-overview.md)
- [Session hooks: model requests](./session-hooks-model-request.md)
- [Session API](./session-api.md)
