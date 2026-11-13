---
source: https://opencode.ai/docs/build/plugins/gui/#registries
---

# Registries

Pass a registry token and an item to `ctx.add` to contribute to the window shell.

## Signature / Usage

Pass a registry token and an item to `ctx.add` to contribute to the window shell. Pass the item as a function,
`() => item | undefined`, when it follows reactive state such as the language. The host runs the function again when
what it reads changes. Return `undefined` to withdraw the item until the function returns one again.

```ts
ctx.add(Command, () => ({ id: "open", title: ctx.t("command.open"), run: () => open() }))
```

- Read labels with `ctx.t` inside the function. A label read once, in a fixed item, keeps the language it was read in.
- When the item has a field of a literal type, such as `hidden: true`, a `section`, an `icon`, or a menu name, annotate
  the function's return type: `(): Command => ({ ... })`. Without it, TypeScript widens the field to `string` or
  `boolean`, and no overload matches.
- Pass a fixed item when it never changes, such as a [style](./style.md).
- The host keeps some objects stable: the tabs a panel returns from `list`, and items with a `render`, such as panels
  and settings pages. Read their labels from getters, such as `get title() { return ctx.t("title") }`.
- `ctx.add` returns a function that withdraws the item early.

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Command](./command.md)
- [Panel](./panel.md)
- [Slot](./slot.md)
