---
source: https://opencode.ai/docs/build/plugins/gui/#themes
---

# Theme

`Theme` adds a color theme to Settings › Appearance › Theme.

## Signature / Usage

`Theme` adds a color theme to Settings › Appearance › Theme. It takes the same format as the app's own theme files, so
a theme file imports as it is.

```ts
import { Theme } from "@opencode/plugin/gui"
import midnight from "./midnight.json"

ctx.add(Theme, midnight)
```

A theme file names itself and gives a light and a dark variant. Each variant starts from a `palette` or from `seeds`,
never both, and can pin single tokens with `overrides`.

```json
{
  "$schema": "https://opencode.ai/desktop-theme.json",
  "name": "Midnight",
  "id": "midnight",
  "light": {
    "palette": {
      "neutral": "#eceff4",
      "ink": "#2e3440",
      "primary": "#5e81ac",
      "success": "#8fbcbb",
      "warning": "#d08770",
      "error": "#bf616a",
      "info": "#81a1c1"
    }
  },
  "dark": {
    "palette": {
      "neutral": "#1b1f27",
      "ink": "#e5e9f0",
      "primary": "#88c0d0",
      "success": "#a3be8c",
      "warning": "#d08770",
      "error": "#bf616a",
      "info": "#81a1c1"
    },
    "overrides": { "syntax-keyword": "#88c0d0" }
  }
}
```

- The picker lists plugin themes among the app's themes, alphabetically by `name`.
- The host keys each theme as `<plugin id>:<theme id>`, so it never replaces an app theme or another plugin's.
- Withdrawing the theme, or disabling the plugin, takes it out of the picker. A user who picked it keeps the choice: the
  window shows the default theme until the theme returns.
- At startup, the window shows the colors cached from the last run until the plugin contributes the theme again.

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Style](./style.md)
- [System and environment](./system-environment.md)
