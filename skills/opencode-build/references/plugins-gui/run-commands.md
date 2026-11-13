---
source: https://opencode.ai/docs/build/plugins/gui/#run-commands
---

# Run commands

`ctx.commands.run(id)` runs a command as choosing it in the command palette does.

## Signature / Usage

`ctx.commands.run(id)` runs a command as choosing it in the command palette does. It returns `false` when the command
cannot run:

```ts
if (!ctx.commands.run("terminal.toggle")) ctx.toast.show({ title: ctx.t("terminal.unavailable") })
```

- `id` is a published plugin command, `<plugin id>.<command id>`, of any plugin, or one of the app's own commands,
  such as `command.palette`.
- The app's command ids are not a stable API and can change between releases.
- `run` returns `false` when no enabled command has the id. A listed but disabled command does not run.
- Before the app interface mounts, no command is registered, so `run` returns `false`.
- `run` does not wait for a command's async work.

#### Reference

```ts
interface Commands {
  run(id: string): boolean
}
```

## Notes

- OpenCode commands are distinct from Claude Code commands (anthropic-claude-code / anthropic-claude-code-extend).

## Related

- [Command](./command.md)
- [Keybinds](./keybinds.md)
