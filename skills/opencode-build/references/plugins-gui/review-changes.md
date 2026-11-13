---
source: https://opencode.ai/docs/build/plugins/gui/#review-changes
---

# Review changes

`@opencode/plugin/gui/review` exports `Changes`, the app's view of a session's changes, and `ChangeKind`.

## Signature / Usage

`@opencode/plugin/gui/review` exports `Changes`, the app's view of a session's changes, and `ChangeKind`
(`"add"`, `"del"`, or `"mix"`).

```ts
import { Changes } from "@opencode/plugin/gui/review"

const changes = ctx.use(Changes)

const count = () => {
  const live = changes()
  const session = ctx.sessions.current()

  return live.status === "active" && session ? live.value.diffs(session).length : 0
}
```

- `diffs(session)` is the current review mode's diffs, and `ready(session)` is `true` once they have loaded. Both are
  reactive. Only the routed session has changes; other sessions read as empty.
- `kinds(session)` maps each changed file and directory to its `ChangeKind`.
- `active(session)` is the file the review panel shows.
- `details(session)` is the session directory's uncommitted changes, whatever the review mode.
- `focus(session, path)` shows a file in the review panel, and `open(session)` shows all changes.
- `watch(screen, source)` keeps the changes of a view loaded while it shows them, across the view's session switches.
  Pass the owning screen from the panel or slot input. It returns a function that stops watching; see
  [createKeyed](./reactive-primitives.md).
- A `tree` watch is a persistent change list: opening the side region refreshes it. A `details` watch loads
  `details(session)`.

#### Reference

```ts
interface Changes {
  diffs(session: SessionRef): FileDiffInfo[]
  ready(session: SessionRef): boolean
  kinds(session: SessionRef): Map<string, ChangeKind>
  active(session: SessionRef): string | undefined
  details(session: SessionRef): FileDiffInfo[] | undefined
  focus(session: SessionRef, path: string): void
  open(session: SessionRef): void
  watch(screen: SessionScreen, source: "tree" | "files" | "details"): () => void
}

type ChangeKind = "add" | "del" | "mix"
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [App contracts: Files](./app-contract-files.md)
- [createKeyed](./reactive-primitives.md)
