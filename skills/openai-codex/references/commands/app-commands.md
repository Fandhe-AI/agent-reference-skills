# ChatGPT desktop app commands

Keyboard shortcuts, chat search, and `codex://` deep links of the ChatGPT desktop app.

## Signature / Usage

```text
codex://threads/new?prompt=Show%20me%20some%20fun%20stats%20about%20how%20I%27ve%20been%20using%20Codex
codex://new?prompt=%5B%40Example%5D(plugin%3A%2F%2Fexample%40openai-curated)%20Summarize%20this%20document
```

## Options / Props

Selected default shortcuts (macOS / Windows and Linux; open **Settings > Keyboard Shortcuts** to search, change, or reset):

| Action | macOS | Windows / Linux |
|--------|-------|-----------------|
| Open command menu | Cmd+Shift+P or Cmd+K | Ctrl+Shift+P or Ctrl+K |
| Open settings | Cmd+, | Ctrl+, |
| Open keyboard shortcuts | Cmd+/ | Ctrl+/ |
| Toggle sidebar | Cmd+B or Cmd+Shift+S | Ctrl+B or Ctrl+Shift+S |
| Toggle terminal (Codex only) | Ctrl+` | Ctrl+` |
| New chat | Cmd+N or Cmd+Shift+O | Ctrl+N or Ctrl+Shift+O |
| New standalone chat (Codex only) | Cmd+Opt+O | Ctrl+Alt+O |
| Archive chat | Cmd+Shift+A | Ctrl+Shift+A |
| Open side chat (Codex only) | Cmd+Opt+S | Ctrl+Alt+S |
| Find in chat | Cmd+F | Ctrl+F |
| Open model picker | Ctrl+Shift+M | Ctrl+Shift+M |
| Search files (Codex only) | Cmd+P | Ctrl+P |
| Open review tab (Codex only) | Ctrl+Shift+G | Ctrl+Shift+G |
| Open browser tab | Cmd+T | Ctrl+T |
| Copy chat deep link | Cmd+Opt+L | Ctrl+Alt+L |
| Take an Appshot | Cmd+Cmd (both keys simultaneously) | not listed |

Deep links (the app keeps the `codex://` scheme for compatibility; encode query values):

| Deep link | Opens |
|-----------|-------|
| `codex://threads/new` | A new local chat. |
| `codex://new?<query>` | A new local chat; include at least one of `prompt`, `path`, or `originUrl`, otherwise the link does nothing. |
| `codex://threads/<thread-id>` | A local chat. |
| `codex://settings` | Settings. Sub-paths: `browser-use`, `computer-use/google-chrome`, `connections`, `connections/computer`, `connections/devices`, `connections/ssh`, `connections/ssh/add?name=<ssh-config-host>`. |
| `codex://skills` | Skills. |
| `codex://automations` | Scheduled with the create flow open. |
| `codex://plugins/install/<plugin-name>?marketplace=<marketplace-name>` | Plugin install flow (`openai-curated` for OpenAI-curated plugins). |
| `codex://plugins/<plugin-id>` | Plugin detail (`<plugin-name>@openai-curated` for curated). |
| `codex://plugins/<plugin-name>?marketplacePath=<absolute-marketplace-path>` | Local plugin detail; optional `mode=share`. |
| `codex://pets/install?name=<pet-name>&imageUrl=<https-image-url>` | Pet install flow; optional `description`, `spriteVersionNumber` (1 default, or 2). |

New-chat query parameters: `prompt=<text>` (initial composer text), `path=<absolute-path>` (local workspace), `originUrl=<git-remote-url>` (matches a workspace root; `path` resolves first).

## Notes

- Search chats has no default shortcut; assign one under Settings > Keyboard Shortcuts. Find in chat doesn't search across other chats.
- A link with a plugin mention opens a new chat with the decoded prompt but does not send it automatically.
- `codex://settings/connections/ssh/add?name=` must match a host alias in `~/.ssh/config`; the link disables automatic connection for the added host. Unsupported `codex://settings/...` paths open main Settings. Invalid pet links do nothing.
- Only a subset of shortcuts is listed here; the full per-platform tables (General, Chats, Input and modes, Workspace and browser) are on the source page. Some shortcuts appear only when the feature or view is available. On Linux, experimental native Wayland can affect shortcut support.
- Source: https://learn.chatgpt.com/docs/reference/commands (fetched 2026-10).

## Related

- [app-settings.md](./app-settings.md)
- [cli-slash-commands.md](./cli-slash-commands.md)
