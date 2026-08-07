<!-- source: https://code.claude.com/docs/en/checkpointing / last verified: 2026-08-07 -->
# Checkpointing

Claude Code automatically captures the state of your code before each user prompt, so you can undo changes or rewind the conversation and code to a previous point with `/rewind`.

## Signature / Usage

```text
/rewind
```

Or press `Esc` twice with an empty prompt input to open the rewind menu. Select a prior prompt, then choose an action.

## Options / Props

| Name | Description |
|------|-------------|
| Restore code and conversation | Revert both code and conversation to the selected point |
| Restore conversation | Rewind the conversation while keeping current code |
| Restore code | Revert file changes while keeping the conversation |
| Summarize from here | Compress the conversation from this point forward into a summary |
| Summarize up to here | Compress the conversation before this point, keeping later messages intact |
| Never mind | Return to the message list without changes |

## Notes

- Every user prompt creates a checkpoint; Claude Code keeps snapshots for the 100 most recent checkpoints per session, and checkpoints persist with the conversation across resumes (deleted after `cleanupPeriodDays`, default 30 days).
- The two code-restore options appear only if the checkpoint has tracked file changes; otherwise the menu offers only conversation restore, summarize options, and Never mind.
- If you ran `/clear` earlier in the same process, the rewind menu shows a `/resume <session-id> (previous session)` entry to get back to the pre-clear conversation.
- **Not tracked**: files modified by Bash commands (`rm`, `mv`, `cp`, etc.), most subagent edits (except a foreground-forked skill via `context: fork` with `background: false`), external/manual edits outside the session, and symlinked or hard-linked paths (restore skips these with a `Restored the code, but skipped N files` warning).
- Checkpointing is session-level recovery, not a replacement for version control — use git for permanent history and collaboration.

## Related

- [Manage sessions](./sessions.md): `/clear`, `/compact`, and `/branch` for other ways to manage session state
- [Worktrees](./worktrees.md): isolate file edits across parallel sessions
