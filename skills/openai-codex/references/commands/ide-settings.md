# Codex IDE extension settings

Two settings layers: Codex settings (`config.toml`, shared with the CLI) and editor settings (`chatgpt.*` keys in the editor's settings system).

## Signature / Usage

```text
1. Open your editor settings.
2. Search for `@ext:openai.chatgpt`, `Codex`, or the setting name.
3. Update the value.
```

Open Codex settings via the gear icon in the Codex sidebar, then **Codex Settings**; **Open config.toml** edits the active configuration layer directly.

## Options / Props

| Setting | Default | Description |
|---------|---------|-------------|
| `chatgpt.commentCodeLensEnabled` | `true` | Show CodeLens above `TODO` comments so Codex can address them. |
| `chatgpt.openOnStartup` | `false` | Focus the Codex sidebar when the extension finishes starting. |
| `chatgpt.followUpQueueMode` | `queue` | Messages sent during a run wait for the next run (`queue`) or steer the current run (`steer`). Legacy `interrupt` is treated as `steer`. Cmd/Ctrl+Shift+Enter inverts the behavior for one message. |
| `chatgpt.composerEnterBehavior` | `enter` | Enter always sends (`enter`), Cmd/Ctrl+Enter sends multiline prompts (`cmdIfMultiline`), or the modifier is always required (`cmdAlways`). |
| `chatgpt.reviewDelivery` | `inline` | Run `/review` in the current chat when possible (`inline`) or start a separate review chat (`detached`). |
| `chatgpt.localeOverride` | Auto | Preferred language for the Codex UI; empty to auto-detect. |
| `chatgpt.runCodexInWindowsSubsystemForLinux` | `false` | Windows only: run Codex in WSL when available. Changing this reloads VS Code. |
| `chatgpt.cliExecutable` | Unset | Development only: path to the Codex CLI executable. Overriding the bundled executable can break parts of the extension. |
| `chat.fontSize` | Editor default | Chat text in the Codex sidebar, including the composer. |
| `chat.editor.fontSize` | Editor default | Code-rendered content in Codex chats, including snippets and diffs. |

## Notes

- The `chatgpt.*` keys belong to the IDE extension and don't go in `config.toml`; shared agent settings (model, reasoning effort, permissions, sandbox, MCP servers, personalization) live in `config.toml`.
- The extension also honors VS Code's built-in chat font settings for Codex chat surfaces.
- Source: https://learn.chatgpt.com/docs/developer-settings?surface=ide (fetched 2026-10).

## Related

- [ide-commands.md](./ide-commands.md)
- [ide-slash-commands.md](./ide-slash-commands.md)
