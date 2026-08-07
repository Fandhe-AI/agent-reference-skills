# Configuration (Scripting Editor)

Customize the Rive code editor's appearance and behavior (theme, typography, execution settings) via a Lua configuration file, applied across all code editor views for the account.

## Signature / Usage

```lua
-- Import the default configuration
local config = require('config/default')

config.theme = require('theme/shades-of-purple-super-dark')
config.code.fontSize = 14
config.code.lineHeight = 20
config.code.selectionCornerRadius = 5
config.code.executionTimeoutMs = 2000

return config
```

Open the configuration with `⌘,` (macOS) or `Ctrl,` (Windows).

## Options / Props

| Option | Description |
| --- | --- |
| `config.theme` | The editor theme |
| `config.code.fontSize` | Font size in the code editor |
| `config.code.lineHeight` | Line height |
| `config.code.selectionCornerRadius` | Selection highlight corner radius |
| `config.code.executionTimeoutMs` | Max script run time before being stopped |

## Notes

- Type `config.theme = require('theme/')` to browse the full theme list via autocomplete.

## Related

- [keyboard-shortcuts.md](./keyboard-shortcuts.md)
