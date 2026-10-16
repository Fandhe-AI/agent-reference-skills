<!-- source: https://code.claude.com/docs/en/plugins/mods/interface / last verified: 2026-10-17 -->

# Draw in the interface with a mod

A mod draws in render sites (pane, band above the prompt, spinner, messages, tool rows) by returning an element tree from a `ui.render` hook; callbacks change state and request a redraw.

## Signature / Usage

```javascript
const PANE = 'hello-tabs'
let tab = 'one'
let count = 0

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'hello-tabs', description: 'Open the hello-tabs pane' })
    const saved = await $.store.get('count')
    if (typeof saved === 'number') count = saved
    return next(e)
  })

  on('command.run', { command: 'hello-tabs' }, async ($) => {
    await $.ui.open({ id: PANE, title: 'Hello tabs', focus: true, closeOnEscape: true })
    return {}
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    const redraw = () => $.ui.invalidate('ui.render')
    return Box({
      flexDirection: 'column',
      children: [
        Button({ key: 'more', label: 'Add one', hotkey: 'a', onPress: async () => {
          count += 1
          redraw()
          await $.store.set('count', count)
        } }),
        Text({ children: ['Count: ' + count] }),
      ],
    })
  })
}
```

Change a site Claude Code already draws (keep, replace, or leave alone):

```javascript
on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
  return next({ ...e, props: { ...e.props, suffix: ' · tool calls: ' + calls + '…' } })
})
```

## Options / Props

`$.ui.open({ id, ... })` fields:

| Field | What it does |
|-------|--------------|
| `title` | Pane tab label when more than one pane is open |
| `focus` | Requests keyboard focus (only `true`; omit otherwise) |
| `closeOnEscape` | Esc closes the pane (only `true`) |
| `holdToasts` | In the terminal, holds toasts while this pane is showing (only `true`) |
| `rows` | Height when the pane sits above the prompt (default a third of the space) |
| `columns` | Width when beside the transcript |

Render sites a mod can restyle: `UserMessage`, `AssistantMessage`, `ToolUse`, `ToolResult`, `ToolGroup`, `CommandOutput`, `AskUserQuestion`, `Spinner`, `ToolProgress`, `TurnDuration`, `InfoNotice`, `SessionMode`, `PromptHint`.

Elements: `Box`, `Text`, `Button`, `Link`, `Code`, `Markdown`, `Input`, `Select`, `Svg` (Desktop, VS Code), `Client` (Terminal, Desktop), `Raster` / `Image` (Terminal). Control callbacks: `Button` `onPress(e)`; `Input` `onSubmit(value)` / `onInput(value)`; `Select` `onSelect(value)` with `options` `[{ value, label }]` (at least one, unique values).

Where to keep state:

| Keep it in | It lasts until |
|------------|----------------|
| Module-level variable | The module reloads (every save in development) |
| `$.state` | Session ends or `/clear`, `/resume`, `/branch` |
| `$.store` | Your mod deletes it, or no session touches the store for `cleanupPeriodDays`; JSON file under `~/.claude/plugins/store/` |

Key map while a pane or band has focus: Tab next control; Up/Down move or scroll; Enter presses/submits/picks; a button's `hotkey` (one digit or one lowercase letter) presses it; Page Up/Down, Home, End scroll; Ctrl+X then arrow resizes; Ctrl+X then X closes; Esc returns focus to the prompt.

## Notes

- Opening a pane draws nothing by itself; Claude Code then fires `ui.render`. A hook returning `next(e)` shows Claude Code's own drawing; returning a tree without calling `next` replaces it.
- The band above the prompt is shared by every mod; a tree you return replaces what later mods draw, so include `await next(e)` among the `children` of a `Box` to keep theirs.
- The permission prompt is not a render site and cannot be changed. For `AskUserQuestion`, a tree must hold the `next(e)` reference exactly once, otherwise Claude Code draws its own dialog.
- Claude Code reruns `ui.render` only when site props or terminal width change; call `$.ui.invalidate('ui.render')` after your own data changes, or use `$.clock.every(1000, () => $.ui.invalidate('ui.render'))` for a timer. Writing a `$.state` value read by the hook redraws automatically. Redraws are throttled (see Mods reference limits).
- A pane opened by a mod acting alone (timer, `turn.start`) appears only in terminals at least 144 columns wide (110 after the user opened it once). `$.ui.open` resolves to `{ isPlaced: true }` or `{ isPlaced: false, reason }`.
- A tree with an unknown element, a prop an element does not take, or a bad child makes Claude Code draw its own version; with `--plugin-dir` a transcript line says `ui.render (Pane) refused: ...`.
- `$.state` setup: declare `PluginState` in `types/index.d.ts` (`declare module 'claude-code' { interface PluginState { 'hello-tabs': { count: number } } }`), add `"types": "./types/index.d.ts"` to the manifest, then `atom({ plugin: 'hello-tabs', key: 'count' }, 0)`, `read($, count)`, `update($, count, fn)` imported from `claude-code`. Hold each `atom` in a `const`, write `plugin` / `key` as string literals, and write only from callbacks or other events' hooks.
- `/clear`, `/resume`, `/branch` reset every `$.state` value to its default and `session.start` does not fire again; reload saved values in a `classic.SessionStart` hook with `{ source: ['clear', 'resume', 'fork'] }`.
- `$.store` is shared by every session on the machine; `get` then `set` is not atomic. Give each item its own key and re-read right before writing.
- `Raster` cells are a base64 string of 32-bit values per cell (code point, color, background); `0x01000000` means the terminal default. Animate with `$.ui.blit({ requestId, key, columns, rows, cells })`. Use `e.surface` to fall back to text in non-terminal apps.
- `Link` in Desktop / VS Code draws as plain text unless `href` is `https:` or `http://localhost`, contains no `@` (use `%40`), and equals `new URL(href).href` apart from a missing trailing `/` after the host.
- A failed `Client` draws a dimmed `<mod>: Client <file>: <reason>` line and fires `ui.fault` if handled; Claude Code then redraws the site.
- VS Code extension (2.1.299+): panes dock beside the conversation when the panel is 800 px or wider (`placement` `'dock'`), otherwise inline with 12 rows before scroll; buttons have no hotkeys; `focus: true` is granted only when the panel has focus, Claude is idle with no question waiting, and the prompt box is empty; `$.prompt.suggest` resolves with `isShown: false`; status lines are cut at 200 characters or two rows, toasts at 500 characters.
- Submitting an `Input` does not start a turn unless the callback calls `$.prompt.submit`.

## Related

- [Mods overview](./overview.md)
- [Interface gallery for mods](./interface-gallery.md)
- [React to events](./events.md)
- [Use the mods API](./api.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
