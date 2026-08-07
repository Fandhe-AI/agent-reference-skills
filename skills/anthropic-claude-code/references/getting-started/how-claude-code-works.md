<!-- source: https://code.claude.com/docs/en/how-claude-code-works.md / last verified: 2026-08-07 -->

# How Claude Code works

Explains the agentic loop, built-in tools, sessions, context window, checkpoints, and permissions that power Claude Code.

## Signature / Usage

```text
gather context -> take action -> verify results -> repeat until task complete
```

## Options / Props

| Tool category | What Claude can do |
|----------------|---------------------|
| File operations | Read files, edit code, create files, rename/reorganize |
| Search | Find files by pattern, search content with regex, explore codebases |
| Execution | Run shell commands, start servers, run tests, use git |
| Web | Search the web, fetch documentation, look up error messages |
| Code intelligence | See type errors/warnings after edits, jump to definitions, find references (requires code intelligence plugins) |

| Permission mode | Behavior |
|------------------|----------|
| Manual (default) | Claude asks before file edits and shell commands |
| Accept edits | Edits files and runs common filesystem commands without asking |
| Plan | Explores and proposes a plan without editing source files |
| Auto | Evaluates all actions with background safety checks |

## Notes

- Claude Code is the agentic harness around the Claude model: it provides tools, context management, and the execution environment.
- Each session starts with a fresh context window; JSONL transcripts are stored under `~/.claude/projects/`. `--continue`/`--resume` reopen the same session ID; `--fork-session`/`/branch` copy history into a new ID.
- Context holds conversation history, file contents, command outputs, CLAUDE.md, auto memory, loaded skills, and system instructions; Claude Code auto-compacts as it fills (clears older tool outputs first, then summarizes).
- Checkpoints (file-edit snapshots, `Esc` twice to rewind) are separate from git and don't cover Bash/external-process changes or symlinked/hard-linked files.
- Skills load on demand (descriptions at session start, full content when used); subagents get their own fresh, isolated context window.

## Related

- [Explore the context window](./context-window.md)
- [How Claude remembers your project](./memory.md)
- [Extend Claude Code](./features-overview.md)
- [Best practices](./best-practices.md)
