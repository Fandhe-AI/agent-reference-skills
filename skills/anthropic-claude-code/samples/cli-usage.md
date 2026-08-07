<!-- source: https://code.claude.com/docs/en/cli-reference.md, https://code.claude.com/docs/en/quickstart.md / last verified: 2026-08-07 -->

# CLI Startup Patterns

Common ways to launch and control the `claude` CLI from a terminal or shell pipeline.

```bash
claude --version              # confirm install
claude                        # start interactive session, prompts login on first use
claude "task"                 # run a one-time task
claude "explain this project" # start interactive session with an initial prompt
claude -p "explain this function"   # query via SDK, then exit (non-interactive)
cat logs.txt | claude -p "explain"  # process piped content
claude -c                     # continue most recent conversation in current directory
claude -c -p "query"          # continue, then run one query non-interactively
claude -r                     # resume a previous conversation (picker)
claude -r "<session>" "query" # resume a session by ID or name
claude --continue             # resume most recent session
claude --resume auth-refactor # resume a named/ID session
```

## Notes

- `claude -p` (`--print`) runs in print/non-interactive mode and exits after responding.
- `-c` is short for `--continue`; `-r` is short for `--resume`. `--resume` without an argument shows a session picker.
- Session-scoped flags (`--model`, `--effort`, `--fallback-model`) apply only to the session they're passed to and don't persist; use `/model`, `/effort`, or the matching `settings.json` key to persist a choice.
- `claude --help` does not list every flag; absence from `--help` doesn't mean the flag is unavailable.
- Example from the Claude Code docs (code.claude.com) `cli-reference` and `quickstart` pages.
