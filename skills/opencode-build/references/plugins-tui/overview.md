---
source: https://opencode.ai/docs/build/plugins/cli/
---

# TUI

Build the TUI part of an OpenCode plugin for the terminal UI using @opencode/plugin/tui.

## Signature / Usage

TUI plugins extend the terminal UI with commands, routes, slots, Markdown renderers, notifications, and local state. A
TUI plugin is the `./tui` part of a plugin package, usually beside a server part.

```ts title="src/tui.tsx"
import { Plugin } from "@opencode/plugin/tui"

export default Plugin.define({
  id: "acme.cli",
  setup(context) {
    context.ui.toast.show({ message: "TUI plugin loaded", variant: "success" })
  },
})
```

Import `@opencode/plugin/tui` directly. OpenCode resolves this import at runtime, so local TUI plugins do not need an
absolute path to an OpenCode checkout.

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [context.md](./context.md)
- [publish-and-load.md](./publish-and-load.md)
- Server part: https://opencode.ai/docs/build/plugins/server/
- Plugin package: https://opencode.ai/docs/build/plugins/
