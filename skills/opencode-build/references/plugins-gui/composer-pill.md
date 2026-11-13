---
source: https://opencode.ai/docs/build/plugins/gui/#composer-pills
---

# ComposerPill

`ComposerPill` adds a pill to the row above a session's composer, beside the app's background work and todo pills.

## Signature / Usage

`ComposerPill` adds a pill to the row above a session's composer, beside the app's background work and todo pills.
Use it for status that belongs to the session the user is working in, such as the pull requests of its branch. Pills
float over the timeline, so a pill that comes or goes never resizes the composer. The row follows the user's background
activity alignment, and it does not show in a subagent's session.

`show` returns the pill for one session, or `undefined` to show none there. The host runs it for each mounted
composer, and again when what it reads changes. This plugin lists the open pull requests of each session's directory
through its server part's [RPC](https://opencode.ai/docs/build/plugins/rpc/), and shows them as one pill:

Adapted (not in the official docs): the official example has no rejection handler; `.catch` clears the list when the server is unreachable instead of leaving an unhandled rejection.

```tsx
import { createStore } from "solid-js/store"
import { ComposerPill, createKeyed } from "@opencode/plugin/gui"
import { GitHub, type Pull } from "./rpc"

const [pulls, setPulls] = createStore<Record<string, readonly Pull[]>>({})

createKeyed(
  () => ctx.sessions.current()?.directory,
  (directory) =>
    void ctx.client
      .rpc(GitHub)
      .pulls({ directory })
      .then((list) => setPulls(directory, list))
      .catch(() => setPulls(directory, [])),
)

ctx.add(ComposerPill, {
  id: "pulls",
  show: (input) => {
    const list = pulls[input.session.directory] ?? []

    if (list.length === 0) return undefined

    return {
      icon: "github",
      label: ctx.plural("pulls", list.length),
      tone: list.some((pull) => pull.checks === "failure") ? "danger" : undefined,
      title: ctx.t("pulls.title"),
      rows: list.map((pull) => ({
        id: String(pull.number),
        label: `#${pull.number} ${pull.title}`,
        icon: pull.checks === "failure" ? "circle-x" : "circle-check",
        tone: pull.checks === "failure" ? "danger" : "success",
        detail: pull.branch,
        run: () => ctx.system.openExternal(pull.url),
      })),
    }
  },
})
```

- `label` is the pill's text and truncates when long. `icon` is optional.
- `tone` colors the icon: `"success"`, `"warning"` or `"danger"`.
- `rows` make the pill open a menu under the heading `title`, or `label` without one. Each row has its own `icon`,
  `tone` and muted `detail`, and runs `run` when picked; a row without `run` only shows.
- Without `rows`, the pill runs `run` on click.
- `title` is also the pill's accessible name when it differs from `label`.
- `order` sorts your pills among other plugins' pills, lowest first. The app's own pills come first.
- A `show` that throws fails only your plugin's contribution.

#### Reference

```ts
interface ComposerPill {
  id: string
  order?: number
  show(input: ComposerPillProps): ComposerPillView | undefined
}

interface ComposerPillProps {
  session: MountedSession
  screen: SessionScreen
}

interface ComposerPillView {
  label: string
  icon?: IconName
  tone?: ComposerPillTone
  title?: string
  rows?: ComposerPillRow[]
  run?(): void
}

interface ComposerPillRow {
  id: string
  label: string
  icon?: IconName
  tone?: ComposerPillTone
  detail?: string
  run?(): void
}

type ComposerPillTone = "success" | "warning" | "danger"
```

## Notes

- Adapted from the official docs: the RPC call adds `.catch(() => setPulls(directory, []))`, because client calls reject while the server is unreachable.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Reactive primitives](./reactive-primitives.md)
- [Titlebar items](./titlebar-item.md)
