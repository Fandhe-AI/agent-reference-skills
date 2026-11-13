---
source: https://opencode.ai/docs/build/plugins/gui/#keybinds
---

# Keybinds

`ctx.keybinds` reads the user's shortcut for a published command id.

## Signature / Usage

```ts
const label = ctx.keybinds.keybind(`${ctx.id}.open`)
const chord = ctx.keybinds.keys("mod+k")
const pressed = (event: KeyboardEvent) => ctx.keybinds.matches(`${ctx.id}.open`, event)
```

- `keybind(command)` returns the display parts of the command's effective keybind, for example `["Ctrl", "K"]`. It is
  empty when the command is unbound.
- `keys(bind)` returns the display parts of a chord the app does not own, such as one a page handles itself.
- `matches(command, event)` is `true` when the event matches the command's effective keybind.

#### Reference

```ts
interface Keybinds {
  keybind(command: string): string[]
  keys(bind: string): string[]
  matches(command: string, event: KeyboardEvent): boolean
}
```

## Notes

- OpenCode keybinds are distinct from Claude Code keybindings (anthropic-claude-code / anthropic-claude-code-extend).

## Related

- [Command](./command.md)
- [Run commands](./run-commands.md)
