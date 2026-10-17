# CLI

| Name | Description | Path |
|------|-------------|------|
| CLI Symbols Glossary | Decoder for the symbols in the Hermes terminal UI: transcript markers, status-bar badges, overlay glyphs, and approval prompts. | [cli-symbols.md](./cli-symbols.md) |
| CLI Commands Reference | Complete reference for all `hermes` CLI commands, subcommands, options, and flags. | [commands.md](./commands.md) |
| CLI Interface | Overview of the Hermes Agent interactive CLI — startup modes, status bar, key bindings, slash commands, session management, context compression, and background sessions. | [interface.md](./interface.md) |
| Profile Commands Reference | All commands related to Hermes profiles: `hermes profile <subcommand>`, the global `-p` / `--profile` flag, and `hermes completion`. | [profile-commands.md](./profile-commands.md) |
| Slash Commands Reference | Hermes has two slash-command surfaces driven by a central `COMMAND_REGISTRY` in `hermes_cli/commands.py`: interactive CLI slash commands (dispatched by `cli.py`) and messaging slash commands (dispatched by `gateway/run.py`). | [slash-commands.md](./slash-commands.md) |
| TUI | The TUI is the modern front-end for Hermes: a terminal UI backed by the same Python runtime as the Classic CLI. | [tui.md](./tui.md) |
