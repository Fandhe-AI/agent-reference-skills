<!-- source: https://code.claude.com/docs/en/troubleshooting / last verified: 2026-08-07 -->
# Troubleshooting

Fixes for high CPU/memory usage, hangs, auto-compact thrashing, and search problems once Claude Code is running. For install/login issues see Troubleshoot installation and login; for settings/hooks/MCP not applying see Debug your configuration; for API error codes see the Error reference.

## Signature / Usage

```bash
/doctor                     # automated setup checkup with proposed fixes
/mcp                        # check MCP server status
claude --safe-mode          # restart with all plugins/MCP/hooks disabled to isolate the cause
/heapdump                   # write a heap snapshot + diagnostics to ~/Desktop for memory leaks
/compact                    # reduce context size
/terminal-setup             # fix garbled rendering in VS Code/Cursor integrated terminals
```

## Options / Props

| Symptom | Fix |
|---------|-----|
| High CPU / memory | `/compact` regularly, restart between major tasks, gitignore large build dirs, `claude --safe-mode` to isolate a plugin/MCP/hook, `/heapdump` if memory stays high |
| Large Markdown tables cut off | Display caps at 200 rows (`… N more rows not shown`); the full table stays in context and `/copy` copies every row — ask Claude to write it to a file instead |
| `Autocompact is thrashing: the context refilled to the limit...` | A file/tool output immediately refills context after compaction — read files in smaller chunks, `/compact` with a narrow focus, delegate to a subagent, or `/clear` |
| Command hangs or freezes | `Ctrl+C` to cancel; if unresponsive, close the terminal and `claude --resume` in the same directory |
| Garbled/corrupted text in editor terminal | GPU renderer issue — run `/terminal-setup` to disable `terminal.integrated.gpuAcceleration` |
| Search / `@file` / skills not finding files | Bundled `ripgrep` may not run on your system — install a native `ripgrep` package and set `USE_BUILTIN_RIPGREP=0` |
| Fewer search results than expected on WSL | Cross-filesystem read penalty — narrow searches, move the project to the Linux filesystem (`/home/`), or run natively on Windows |

## Notes

- `/doctor` proposes fixes it can apply after confirmation; if `claude` won't start at all, run `claude doctor` from the shell instead.
- `.heapsnapshot` files contain the full process memory including conversation content and credentials — never attach them to a public issue; only share the `-diagnostics.json` summary.
- `/compact` returns `Not enough messages to compact.` when the conversation has too few turns to summarize, which can happen even with a full context if a single large paste filled it.
- For account/billing/subscription problems (not install or runtime issues), contact Anthropic support directly rather than filing a GitHub issue.

## Related

- [Troubleshoot installation and login](./troubleshoot-install.md): install, PATH, and login failures
