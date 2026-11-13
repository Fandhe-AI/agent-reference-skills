---
source: https://opencode.ai/docs/build/plugins/cli/
---

# TUI Plugin with a Command

Add a TUI part that shows a toast on load and registers a palette, slash, and keyboard command.

```ts title="src/tui.tsx"
import { Plugin } from "@opencode/plugin/tui"

export default Plugin.define({
  id: "acme.cli",
  setup(context) {
    context.ui.toast.show({ message: "TUI plugin loaded", variant: "success" })
  },
})
```

Register a command in a reactive keymap layer (inside `setup`):

```ts
context.keymap.layer(() => ({
  mode: "global",
  priority: 10,
  commands: [
    {
      id: "acme.status",
      title: "Show Acme status",
      group: "Acme",
      bind: "ctrl+g",
      palette: true,
      slash: { name: "acme", aliases: ["status"], arguments: true },
      enabled: () => true,
      suggested: true,
      run: async (input) => context.ui.toast.show({ message: input ?? "Ready" }),
    },
  ],
  bindings: ["acme.status"],
}))
```

## Notes

- Import from `@opencode/plugin/tui`; OpenCode resolves it at runtime.
- The layer factory must be pure; the layer is removed when the plugin is disabled or reloaded.
- Expose the file through the `./tui` export of the package. A TUI-only package is configured in `cli.json`.
- OpenCode keybinds and commands are distinct from Claude Code keybindings and commands (anthropic-claude-code).
