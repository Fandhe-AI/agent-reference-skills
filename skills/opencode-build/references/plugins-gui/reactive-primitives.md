---
source: https://opencode.ai/docs/build/plugins/gui/#reactive-primitives
---

# Reactive primitives

`createKeyed`, `createLatest`, `createVisitState`, `usePanel`, and `useDrawer`: helpers that follow a plugin's lifetime.

## Signature / Usage

Prefer these helpers to raw `createEffect`, `createRenderEffect`, and `createComputed`. They follow a plugin's lifetime
and its dependencies' restarts, which hand-written effects tend to get wrong.

### createKeyed

`createKeyed(source, fn, { otherwise?, equals? })` runs `fn` in a fresh owner for each key: each active generation of a
`ctx.use` accessor, or each value of a plain accessor. Anything registered inside `fn` ends with that run.

```tsx
import { onCleanup } from "solid-js"
import { createKeyed, usePlugin, type SessionScreen } from "@opencode/plugin/gui"
import { Changes } from "@opencode/plugin/gui/review"

function ChangedFiles(props: { readonly screen: SessionScreen }) {
  const ctx = usePlugin()

  // Each active generation of Changes keeps this view's changes loaded; the watch ends with it.
  createKeyed(ctx.use(Changes), (changes) => onCleanup(changes.watch(props.screen, "files")))

  return <FileMarkers screen={props.screen} />
}
```

- `otherwise` runs while the source has no key: a `Live` accessor that is not active, or a plain accessor whose value
  is `undefined`, `null`, or `false`.
- `equals` decides whether a plain accessor's new value is the same key, so `fn` does not run again. Use it when the
  source builds a new object each time. A `Live` accessor always keys by generation.

#### Reference

```ts
function createKeyed<T>(
  source: () => Live<T> | T,
  fn: (value: T) => void,
  options?: { otherwise?(): void; equals?(previous: T, next: T): boolean },
): void
```

### createLatest

`createLatest(source, (value, signal) => promise)` fetches whenever `source` changes, aborts stale requests, and never
suspends.

```ts
const summary = createLatest(
  () => ctx.sessions.current()?.directory,
  (directory, signal) => fetchSummary(directory, signal),
)
const text = () => summary.latest ?? ""
```

- `latest` is the last result, kept while a newer request runs. It is `undefined` before the first.
- `loading` is `true` while a request for the current value is in flight.
- `error` is the current request's rejection, if any.

#### Reference

```ts
function createLatest<S, T>(
  source: () => Live<S> | S,
  fetch: (value: S, signal: AbortSignal) => Promise<T>,
): { latest: T | undefined; loading: boolean; error: unknown }
```

### createVisitState

`createVisitState(initial)` creates a `[value, setValue]` signal that resets whenever the user leaves the session and
returns.

```ts
const [expanded, setExpanded] = createVisitState(false)
```

#### Reference

```ts
function createVisitState<T>(initial: T): [value: () => T, set: (next: T) => void]
```

### usePanel and useDrawer

`usePanel()` reads the surrounding panel frame, and throws outside a panel render. `useDrawer()` returns the mobile
drawer around a contribution, or `undefined` outside one.

```ts
const panel = usePanel()
const drawer = useDrawer()
const compact = () => panel.placement() === "mobile"
const close = () => drawer?.close()
```

- `placement()` is `"side"` in the side region and `"mobile"` in a narrow-screen view.
- `visible()` is `true` while the region is open and this tab is selected. `present()` stays `true` while the region
  animates closed.
- `reserve()` asks you to leave room at the end of a header for the host's region toggle.
- `sidebar` is the inner sidebar preference that every side panel shares. A panel with a sidebar renders its own
  toggle.
- `drawer.open(view)` shows content in place of the drawer's view, with a back control.

#### Reference

```ts
function usePanel(): PanelFrame
function useDrawer(): { close(): void; open(view: DrawerView): void } | undefined

interface PanelFrame {
  visible(): boolean
  present(): boolean
  placement(): "side" | "mobile"
  reserve(): boolean
  animate(): boolean
  open(): string[]
  sidebar: {
    opened(): boolean
    width(): number
    transition(): boolean
    resize(width: number): void
    toggle(): void
  }
}

interface DrawerView {
  title: string
  content: JSX.Element
  trigger: HTMLElement
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| otherwise | () => void | — | `createKeyed`: runs while the source has no key. |
| equals | (previous: T, next: T) => boolean | — | `createKeyed`: decides whether a plain accessor's new value is the same key. |

## Notes

- Solid reactivity (`createEffect`, `onCleanup`) here is from `solid-js`, not React hooks such as `useEffect`.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Live dependencies and failure handling](./live-dependencies.md)
- [Lifetimes and cleanup](./lifetimes.md)
- [Panel](./panel.md)
