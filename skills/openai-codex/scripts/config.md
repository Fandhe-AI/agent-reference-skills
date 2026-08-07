# Config

Customize the Codex terminal interface: shell completions, editor, and themes.

## Shell completions (zsh)

```bash
codex completion zsh
```

Prints the zsh completion script.

```bash
eval "$(codex completion zsh)"
```

Loads completions into the current shell session.

```bash
autoload -Uz compinit && compinit
eval "$(codex completion zsh)"
```

Full setup when `compinit` has not already been run (e.g. in `~/.zshrc`).

## Config home and files

- `$CODEX_HOME/config.toml` — main configuration file
- `$CODEX_HOME/themes` — custom theme directory (`.tmTheme` files)

## Environment variables

| Variable | Purpose |
| --- | --- |
| `CODEX_HOME` | Overrides the default Codex config directory |
| `VISUAL` | External editor used for longer prompts |
| `EDITOR` | Fallback external editor |

## Editor shortcut

<kbd>Ctrl</kbd>+<kbd>G</kbd> opens the external editor (`$VISUAL` / `$EDITOR`) for composing longer prompts. <kbd>Tab</kbd> triggers shell completion inside the CLI.
