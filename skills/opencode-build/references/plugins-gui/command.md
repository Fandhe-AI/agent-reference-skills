---
source: https://opencode.ai/docs/build/plugins/gui/#commands
---

# Command

`Command` adds an action to the command palette, **Settings > Shortcuts**, and optionally the composer's `/` menu.

## Signature / Usage

`Command` adds an action to the command palette, **Settings > Shortcuts**, and optionally the composer's `/` menu. The
host publishes the command as `<plugin id>.<command id>`.

```ts
import { Command } from "@opencode/plugin/gui"

ctx.add(
  Command,
  (): Command => ({
    id: "toggle",
    title: ctx.t("command.toggle"),
    keywords: "notes scratch",
    group: ctx.t("command.category.view"),
    section: "terminal",
    bind: "ctrl+`",
    slash: { name: "notes", after: "open" },
    featured: true,
    enabled: !!ctx.sessions.current(),
    run: () => {
      const session = ctx.sessions.current()

      if (session) ctx.layout.toggle(`${ctx.id}:main`, session)
    },
  }),
)
```

- `title` is the palette label, `description` its second line, and `group` its category, as translated text.
- `keywords` holds extra words the palette matches, separated by spaces.
- `section` is the **Settings > Shortcuts** section. It defaults to `general`.
- `bind` is the default keybind, for example `mod+shift+t`. Users can change it.
- `slash` also offers the command in the `/` menu. With `arguments: true`, the text after the name goes to
  `run(input)`.
- `hidden` keeps the command out of the palette, but its keybind still works.
- `suggested` also lists the command under **Suggested** while it is enabled. `featured` lists it when the palette opens
  without a query.
- `enabled: false` takes the command out of the palette and turns its keybind off. It is reactive.
- `scope` is a CSS selector that keyboard focus must be inside for the binding to apply. With `editable`, the binding
  also fires while a text field has focus.
- To run a command from your own code, use `ctx.commands.run`; see [Run commands](./run-commands.md).

From a keybind, `run` can return `false` to decline the key. The event then goes on to its target, as if the command
had no keybind. This command continues the session when the user presses Enter in an empty prompt, and leaves every
other Enter to the prompt:

```ts
ctx.add(Command, () => ({
  id: "continue",
  title: ctx.t("command.continue"),
  bind: "enter",
  editable: true,
  hidden: true,
  run: () => {
    const composer = ctx.screen.current()?.composer
    const session = ctx.sessions.current()

    if (!composer?.focused() || composer.text().trim() || !session) return false
    void session.server.client.session.prompt({ sessionID: session.id, text: ctx.t("continue") })
  },
}))
```

- Return `false` synchronously; a promise handles the key.
- `false` from the palette or a slash command does nothing more.

#### Reference

```ts
interface Command {
  id: string
  title: string
  description?: string
  keywords?: string
  group?: string
  section?: "general" | "session" | "navigation" | "model" | "terminal" | "prompt"
  bind?: string
  slash?: { name: string; arguments?: true; after?: string }
  hidden?: true
  suggested?: boolean
  featured?: true
  enabled?: boolean
  scope?: string
  editable?: true
  run(input?: string): void | false | Promise<void>
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | — | Palette label. |
| description | string | — | Second line in the palette. |
| group | string | — | Palette category. |
| keywords | string | — | Extra words the palette matches, separated by spaces. |
| section | "general" \| "session" \| "navigation" \| "model" \| "terminal" \| "prompt" | `general` | **Settings > Shortcuts** section. |
| bind | string | — | Default keybind, for example `mod+shift+t`. |
| slash | { name: string; arguments?: true; after?: string } | — | Also offers the command in the `/` menu. |
| hidden | true | — | Keeps the command out of the palette; keybind still works. |
| suggested | boolean | — | Also lists under **Suggested** while enabled. |
| featured | true | — | Lists when the palette opens without a query. |
| enabled | boolean | — | `false` removes it from the palette and turns the keybind off. Reactive. |
| scope | string | — | CSS selector keyboard focus must be inside for the binding to apply. |
| editable | true | — | Binding also fires while a text field has focus. |

## Notes

- OpenCode commands and keybinds are distinct from Claude Code commands and keybindings (anthropic-claude-code / anthropic-claude-code-extend).

## Related

- [Run commands](./run-commands.md)
- [Keybinds](./keybinds.md)
- [Registries](./registries.md)
