> OpenAI Codex (learn.chatgpt.com) のドキュメント。

# CLI customization

Terminal-specific options for how interactive Codex CLI sessions look and how you enter commands and prompts: syntax-highlight themes, shell completions, and an external prompt editor.

## Signature / Usage

```bash
# Generate a completion script (bash | zsh | fish | powershell)
codex completion zsh
eval "$(codex completion zsh)"
```

```text
/theme
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/theme` | slash command | Opens the theme picker for the TUI's Markdown/diff syntax highlighting; saves the selection to `tui.theme` in `$CODEX_HOME/config.toml`. |
| custom `.tmTheme` | file | Place under `$CODEX_HOME/themes` to make it selectable from the theme picker. |
| `codex completion <shell>` | CLI | Prints a completion script for Bash, Z shell, Fish, or PowerShell. |
| Ctrl+G | keyboard shortcut | Opens the external editor set by `VISUAL` (falling back to `EDITOR`) for composing a longer prompt; saving and closing returns the text to the composer. |

## Notes

- If the Z shell reports `command not found: compdef`, run `autoload -Uz compinit && compinit` before `eval "$(codex completion zsh)"`.
- For the full interactive keyboard shortcut and command/option list, see the CLI reference page (`/docs/developer-commands`).

## Related

- [Codex CLI](./cli.md)
