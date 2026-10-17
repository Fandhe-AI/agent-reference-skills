# Codex IDE extension

Use Codex beside your code and editor context. Bring open files and selections into the prompt, review edits in place, and hand off longer work without breaking your flow.

## Signature / Usage

Install the extension, then open it from the editor:

- Visual Studio Code / Cursor / Windsurf: install the Codex extension (`openai.chatgpt` on the VS Code Marketplace), then select the Codex icon or run **Codex: Open Codex Sidebar** from the Command Palette.
- Xcode: open the coding assistant, start a new chat, and choose Codex as the agent.
- JetBrains IDEs: open AI Chat and select Codex.

## Getting started

1. **Install or enable Codex** for your IDE (VS Code and compatible editors use the Codex extension; Xcode and JetBrains provide their own integrations).
2. **Open Codex** in the editor sidebar / AI chat panel.
3. **Start your first chat.** Ask Codex to explain the codebase, make a focused change, or help debug an issue. Create Git checkpoints before and after a task so you can revert changes.

## See what Codex can do in your IDE

- **Use the context already open:** add an open file, a selection, or a recent chat to the composer, then ask Codex to explain or edit with that context attached.
- **Review changes beside your code:** read a concise summary and the changed lines, keep the edits you want, and ask for a follow-up from the same view.
- **Delegate when the task gets bigger:** keep quick iterations local, or connect Codex web to delegate a longer task; the chat stays available when you return to review the result.
- Use the extension when you are making focused edits, learning unfamiliar code, reviewing changes in place, or delegating a larger task.

Install links: Visual Studio Code, Cursor, and Windsurf (`openai.chatgpt` extension), Visual Studio Code Insiders (Marketplace), Xcode (coding intelligence setup), and JetBrains IDEs (AI Assistant Codex agent).

## Next steps

- Prompt with editor context (prompting.md), IDE commands (`../commands/ide-commands.md`), and extension settings (`../commands/ide-settings.md`).

## Notes

- The IDE extension can reference open files, selections, and recent chats directly from the composer as editor context.
- Longer tasks can be delegated to Codex cloud from the same editor workflow and the chat stays available when you return to review the result.
- IDE-specific keyboard shortcuts/commands and settings (`chatgpt.*` keys) are documented on the separate pages `../commands/ide-commands.md`, `../commands/ide-slash-commands.md`, and `../commands/ide-settings.md`.
- Source: https://learn.chatgpt.com/docs/codex/ide (retrieved 2026-10).

## Related

- [cli.md](./cli.md)
- [cloud.md](./cloud.md)
- [models.md](./models.md)
- [best-practices.md](./best-practices.md)
