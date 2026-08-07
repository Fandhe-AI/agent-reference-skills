<!-- source: https://code.claude.com/docs/en/agent-sdk/file-checkpointing.md / last verified: 2026-08-07 -->

# Rewind file changes with checkpointing

File checkpointing tracks file modifications made through the Write, Edit, and NotebookEdit tools during an agent session, allowing you to rewind files to any previous state.

Only changes made through Write, Edit, and NotebookEdit are tracked. Changes made through Bash commands (`echo > file.txt`, `sed -i`) are not captured, and neither are edits a subagent applies, except a skill with `context: fork` running in the foreground.

## Signature / Usage

```python
options = ClaudeAgentOptions(
    enable_file_checkpointing=True,
    permission_mode="acceptEdits",
    extra_args={"replay-user-messages": None},  # Required to receive checkpoint UUIDs
)

checkpoint_id = None
session_id = None

async with ClaudeSDKClient(options) as client:
    await client.query("Refactor the authentication module")
    async for message in client.receive_response():
        if isinstance(message, UserMessage) and message.uuid and not checkpoint_id:
            checkpoint_id = message.uuid
        if isinstance(message, ResultMessage) and not session_id:
            session_id = message.session_id

# Later, rewind by resuming the session with an empty prompt
if checkpoint_id and session_id:
    async with ClaudeSDKClient(
        ClaudeAgentOptions(enable_file_checkpointing=True, resume=session_id)
    ) as client:
        await client.query("")
        async for message in client.receive_response():
            await client.rewind_files(checkpoint_id)
            break
```

## Options / Props

| Name (Python / TypeScript) | Type | Description |
| --- | --- | --- |
| `enable_file_checkpointing` / `enableFileCheckpointing` | boolean | Tracks file changes for rewinding. |
| `extra_args={"replay-user-messages": None}` / `extraArgs: { "replay-user-messages": null }` | option | Required to get user message UUIDs (checkpoints) in the response stream. |
| `rewind_files(checkpoint_id)` / `rewindFiles(checkpointId)` | method | Restores tracked files to the given checkpoint UUID's state. |

## Notes

- Checkpoint works with Write, Edit, and NotebookEdit. When rewinding, Claude Code deletes files it created and restores modified files to their checkpoint-time content. Symlinks, hard links, and other non-regular files are skipped and counted in `RewindFilesResult.skippedLinks` (requires Claude Code v2.1.216+; earlier versions wrote/deleted through links).
- File rewinding restores files on disk; it does not rewind the conversation itself.
- Capture the first user message UUID as the checkpoint for most use cases (restores tracked files to their original state). Store multiple checkpoints for intermediate restore points.
- To rewind after the stream completes, resume the session with an empty prompt, then call `rewind_files()` / `rewindFiles()`. Calling it after the loop has fully completed without resuming raises "ProcessTransport is not ready for writing".
- From the CLI (not the SDK), rewinding requires `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING=true claude -p --resume <session-id> --rewind-files <checkpoint-uuid>`; the flag doesn't appear in `claude --help`.
- Limitations: only Write/Edit/NotebookEdit tracked (not Bash); subagent edits untracked (except foreground `context: fork` skills, use git to revert); checkpoints tied to the creating session; directory creation/move/deletion not undone; only local files tracked.

## Related

- [sessions](./sessions.md)
