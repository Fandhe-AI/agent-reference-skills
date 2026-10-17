# Extending the CLI

Build wrapper CLIs that extend the Hermes TUI with custom widgets, keybindings and layout changes through protected extension hooks on `HermesCLI` (defined in `hermes_cli/cli_tui_mixin.py`, mixed into `HermesCLI` in `cli.py`), without overriding `run()`.

## Signature / Usage

```python
#!/usr/bin/env python3
"""my_cli.py — Example wrapper CLI that extends Hermes."""

from cli import HermesCLI
from prompt_toolkit.layout import FormattedTextControl, Window
from prompt_toolkit.filters import Condition


class MyCLI(HermesCLI):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._panel_visible = False

    def _get_extra_tui_widgets(self):
        """Add a toggleable info panel above the status bar."""
        cli_ref = self
        return [
            Window(
                FormattedTextControl(lambda: "My custom panel content"),
                height=1,
                filter=Condition(lambda: cli_ref._panel_visible),
            ),
        ]

    def _register_extra_tui_keybindings(self, kb, *, input_area):
        """F2 toggles the custom panel."""
        cli_ref = self

        @kb.add("f2")
        def _toggle_panel(event):
            cli_ref._panel_visible = not cli_ref._panel_visible

    def process_command(self, cmd: str) -> bool:
        """Add a /panel slash command."""
        if cmd.strip().lower() == "/panel":
            self._panel_visible = not self._panel_visible
            return True
        return super().process_command(cmd)


if __name__ == "__main__":
    MyCLI().run()
```

```bash
source ./activate
python my_cli.py
```

## Options / Props

| Hook | Purpose | Override when... |
|------|---------|------------------|
| `_get_extra_tui_widgets()` | Inject widgets into the layout (between spacer and status bar) | Persistent UI element (panel, status line, mini-player) |
| `_register_extra_tui_keybindings(kb, *, input_area)` | Add keyboard shortcuts; `kb` is the `KeyBindings`, `input_area` the main `TextArea` | Hotkeys |
| `_build_tui_layout_children(**widgets)` | Full control over widget ordering | Reorder or wrap existing widgets (rare) |
| `process_command()` | Add custom slash commands (pre-existing hook) | `/mycommand` handling |
| `_build_tui_style_dict()` | Custom prompt_toolkit styles (pre-existing hook) | Custom colors |

`_build_tui_layout_children` keyword widgets: `sudo_widget, secret_widget, approval_widget, clarify_widget, model_picker_widget=None, spinner_widget=None, spacer, status_bar, input_rule_top, image_bar, input_area, input_rule_bot, voice_status_bar, completions_menu`; `None` widgets are filtered out.

Default layout top to bottom: output area, spacer, extra widgets, status bar, image bar, input area, voice status, completions menu.

## Notes

- The first three hooks are new protected hooks; the last two already existed.
- Avoid conflicts with built-in keybindings: `Enter` (submit), `Escape Enter` (newline), `Ctrl-C` (interrupt), `Ctrl-D` (exit), `Tab` (auto-suggest accept). Function keys F2+ and Ctrl-combinations are generally safe.
- Call `self._invalidate()` after state changes to trigger a redraw; `self.agent`, `self.model`, `self.conversation_history` are available.
- Use `ConditionalContainer` or `filter=Condition(...)` to make widgets toggleable.
- Do not override `run()` unless absolutely necessary.
- Source: developer-guide/extending-the-cli (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Programmatic Integration](./programmatic-integration.md)
