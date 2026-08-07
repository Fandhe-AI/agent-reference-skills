<!-- source: https://code.claude.com/docs/en/agent-sdk/sessions.md / last verified: 2026-08-07 -->

# Work with sessions

A session is the conversation history the SDK accumulates while an agent works. It contains the prompt, every tool call, every tool result, and every response. The SDK writes it to disk automatically so you can return to it later.

Sessions persist the **conversation**, not the filesystem. To snapshot and revert file changes, use file checkpointing.

## Choose an approach

| What you're building | What to use |
| --- | --- |
| One-shot task: single prompt, no follow-up | Nothing extra. One `query()` call handles it. |
| Multi-turn chat in one process | `ClaudeSDKClient` (Python) or `continue: true` (TypeScript). |
| Pick up where you left off after a process restart | `continue_conversation=True` (Python) / `continue: true` (TypeScript). Resumes the most recent session in the directory. |
| Resume a specific past session (not the most recent) | Capture the session ID and pass it to `resume`. |
| Try an alternative approach without losing the original | Fork the session. |
| Stateless task, don't want anything written to disk (TypeScript only) | Set `persistSession: false`. Python always persists to disk. |

`Continue`, `resume`, and `fork` are option fields set on `query()` (`ClaudeAgentOptions` in Python, `Options` in TypeScript):

- **Continue** finds the most recent session in the current directory. No ID tracking.
- **Resume** takes a specific session ID. Required for multiple concurrent sessions or returning to a non-recent one.
- **Fork** creates a new session that starts with a copy of the original's history; the original stays unchanged.

## Signature / Usage

```python
# Python: ClaudeSDKClient tracks session state across calls automatically
async with ClaudeSDKClient(options=options) as client:
    await client.query("Analyze the auth module")
    async for message in client.receive_response():
        print_response(message)

    # Second query automatically continues the same session
    await client.query("Now refactor it to use JWT")
    async for message in client.receive_response():
        print_response(message)
```

```typescript
// TypeScript: pass continue: true on the next query() call
for await (const message of query({
  prompt: "Now refactor it to use JWT",
  options: {
    continue: true,
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep"]
  }
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `resume` (`resume`) | string (session ID) | Resume a specific past session. |
| `forkSession` (`fork_session`) | boolean | Combined with `resume`, creates a new session starting from a copy of the original's history. |
| `continue` (`continue_conversation`) | boolean | Resumes the most recent session in the current directory. |
| `persistSession` (TypeScript only) | boolean | When `false`, the session exists only in memory for the call's duration. |

## Notes

- Capture the session ID from the `session_id` field on the result message (`ResultMessage` in Python, `SDKResultMessage` in TypeScript), present on every result regardless of success or error. In TypeScript it's also on the init `SystemMessage`; in Python it's nested in `SystemMessage.data`.
- Sessions are stored under `~/.claude/projects/<encoded-cwd>/*.jsonl`, or under `$CLAUDE_CONFIG_DIR/projects/<encoded-cwd>/*.jsonl` if `CLAUDE_CONFIG_DIR` is set. `<encoded-cwd>` replaces every non-alphanumeric character of the absolute working directory with `-`.
- You can resume from any working directory: Claude Code searches every project directory for the session ID if the derived directory doesn't hold it. If two or more project directories hold a copy with messages, the session is reported as not found rather than resuming an arbitrary copy.
- Forking branches the conversation history, not the filesystem — file edits made by a forked agent are real and visible to any session working in the same directory.
- The experimental V2 session API (`createSession()` with `send`/`stream`) was removed in TypeScript Agent SDK 0.3.142; use `query()` and the session options described here.
- To resume sessions across machines or in serverless environments, mirror transcripts to shared storage with a `SessionStore` adapter.
- `listSessions()`/`list_sessions()`, `getSessionMessages()`/`get_session_messages()`, `get_session_info()`/`getSessionInfo()`, `rename_session()`/`renameSession()`, and `tag_session()`/`tagSession()` are available for enumerating, reading, and organizing sessions on disk.

## Related

- [session-storage](./session-storage.md)
- [file-checkpointing](./file-checkpointing.md)
