---
source: https://opencode.ai/docs/build/plugins/cli/#slots
---

# Slots

Slots insert or replace JSX at named TUI locations, including the `session.panel` contribution slot.

## Signature / Usage

Slots insert or replace JSX at `app`, `home.footer`, `home.footer.status`, `prompt.footer`, `prompt.footer.status`,
`prompt.footer.file`, `session.composer.top`, `sidebar.content`, or `sidebar.footer`.

```tsx
return context.ui.slot({
  append: "sidebar.content",
  render: ({ sessionID }) => <text>{context.data.session.get(sessionID)?.title}</text>,
})
```

Use `prepend`, `append`, `before`, `after`, or `replace` for placement.

```tsx
context.ui.slot({ prepend: "home.footer", render: () => <text>Before footer content</text> })
context.ui.slot({ append: "home.footer", render: () => <text>After footer content</text> })
context.ui.slot({ before: "home.footer", render: () => <text>Before footer slot</text> })
context.ui.slot({ after: "home.footer", render: () => <text>After footer slot</text> })
context.ui.slot({ replace: "home.footer", render: () => <text>New footer</text> })
```

Use `home.footer.status` to add content to the built-in footer row without replacing it. Status contributions appear
after OpenCode's health indicators and before the version.

```tsx
context.ui.slot({ append: "home.footer.status", render: () => <text>SYNCED</text> })
```

### Session panels

Register a contribution to `session.panel`, then open the panel from a command. The host owns sizing, focus, and
full-screen presentation; the plugin owns its contents. The selected name is passed to every contribution as
`panel.name`, and each contribution decides whether to render.

```tsx
import { Show } from "solid-js"

context.ui.slot({
  append: "session.panel",
  render: (panel) => (
    <Show when={panel.name === "acme.review"}>
      <ReviewPanel panel={panel} />
    </Show>
  ),
})

context.ui.slot({
  append: "app",
  render: () => {
    context.keymap.layer(() => ({
      mode: "global",
      commands: [
        {
          id: "acme.review",
          title: "Open review",
          slash: { name: "review" },
          run: () => {
            context.ui.panel.open("acme.review")
          },
        },
      ],
    }))
    return null
  },
})
```

- Opening outside a session returns `false`.
- This is an ordinary slot: all five placements and the existing replacement ordering rules apply.
- Use `append` for independently selectable contributions so they can coexist. `replace` still takes over the slot.
- Names are shared selection values, not registered claims. Use a plugin-prefixed name such as `acme.review` to avoid collisions. Opening a name with no matching renderer leaves the slot empty.
- Changing presentation preserves the mounted contributions. Closing the panel disposes them; disabling a plugin removes its contributions through normal slot cleanup.
- Its keyboard layers and input modes are active only while the panel owns input.

The slot receives reactive `name`, `sessionID`, `width`, `presentation`, and `focused` properties, plus `focus`,
`close`, and `toggleFullscreen` actions. The host keeps narrow terminals full-screen; `toggleFullscreen` has no effect
until there is enough room for a side panel.

```tsx
import type { PanelInput } from "@opencode/plugin/tui/context"
import { usePlugin } from "@opencode/plugin/tui"

function ReviewPanel(props: { panel: PanelInput }) {
  const context = usePlugin()
  context.keymap.layer(() => ({
    commands: [
      {
        id: "acme.review.fullscreen",
        bind: "f",
        run: props.panel.toggleFullscreen,
      },
    ],
  }))
  return <text>Reviewing {props.panel.sessionID}</text>
}
```

You can request full-screen presentation initially, inspect your active panel, or close it without affecting another
plugin's panel.

```ts
context.ui.panel.open("acme.review", { presentation: "fullscreen" })
const current = context.ui.panel.current()
context.ui.panel.close()
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- Use a plugin-prefixed panel name such as `acme.review` to avoid collisions.

## Related

- [solid-components.md](./solid-components.md)
- [commands-and-keymaps.md](./commands-and-keymaps.md)
- [routes-and-tabs.md](./routes-and-tabs.md)
