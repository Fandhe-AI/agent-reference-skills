# Codex IDE extension commands

Command Palette commands of the Codex VS Code extension and how to bind them to keyboard shortcuts.

## Signature / Usage

```text
1. Open the Command Palette (Cmd+Shift+P on macOS, Ctrl+Shift+P on Windows/Linux).
2. Run "Preferences: Open Keyboard Shortcuts".
3. Search for `Codex` or the command ID (for example, `chatgpt.newChat`).
4. Select the pencil icon, then enter the shortcut you want.
```

## Options / Props

| Command | Default key binding | Description |
|---------|---------------------|-------------|
| `chatgpt.addToThread` | - | Add selected text range as context for the current chat |
| `chatgpt.addFileToThread` | - | Add the entire file as context for the current chat |
| `chatgpt.newChat` | macOS: `Cmd+N`; Windows/Linux: `Ctrl+N` | Create a new chat |
| `chatgpt.newCodexPanel` | - | Create a new Codex panel |
| `chatgpt.openCommandMenu` | - | Open the Codex command menu |
| `chatgpt.openSidebar` | - | Open the Codex sidebar panel |

## Notes

- Source: https://learn.chatgpt.com/docs/developer-commands?surface=ide (fetched 2026-10).

## Related

- [ide-slash-commands.md](./ide-slash-commands.md)
- [ide-settings.md](./ide-settings.md)
