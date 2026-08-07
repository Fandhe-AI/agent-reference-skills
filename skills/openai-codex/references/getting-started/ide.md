> OpenAI Codex (learn.chatgpt.com) のドキュメント.

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

## Notes

- The IDE extension can reference open files, selections, and recent chats directly from the composer as editor context.
- Longer tasks can be delegated to Codex cloud from the same editor workflow and the chat stays available when you return to review the result.
- IDE-specific keyboard shortcuts/commands and settings (`chatgpt.*` keys) are documented on separate reference pages outside this category.

## Related

- [cli.md](./cli.md)
- [cloud.md](./cloud.md)
- [models.md](./models.md)
- [best-practices.md](./best-practices.md)
