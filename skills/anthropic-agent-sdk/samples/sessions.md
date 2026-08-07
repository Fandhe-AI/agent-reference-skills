<!-- source: https://code.claude.com/docs/en/agent-sdk/sessions.md / last verified: 2026-08-07 -->

# Continue, Resume, and Fork a Session

Use `ClaudeSDKClient` (Python) or `continue`/`resume`/`forkSession` options (TypeScript) to keep multi-turn state across `query()` calls or process restarts.

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

## Notes

- `continue`/`continue_conversation` resumes the most recent session in the current directory (no ID tracking needed). `resume` takes a specific session ID — required for concurrent sessions or returning to a non-recent one. `forkSession`/`fork_session` (combined with `resume`) copies the original history into a new session, leaving the original unchanged.
- Capture the session ID from the `session_id` field on the result message, present on every result regardless of success or error.
- Sessions are stored under `~/.claude/projects/<encoded-cwd>/*.jsonl` (or `$CLAUDE_CONFIG_DIR/projects/...` if set); sessions persist the conversation, not the filesystem — use file checkpointing to snapshot/revert file changes.
- TypeScript-only `persistSession: false` keeps a session in memory only for the call's duration; Python always persists to disk.
