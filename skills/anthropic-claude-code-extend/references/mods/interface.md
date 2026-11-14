<!-- source: https://code.claude.com/docs/en/plugins/mods/interface / last verified: 2026-11-14 -->

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
| `columns` | Width to ask for when beside the transcript, at most 45% of the terminal's width. Once the user has resized a pane beside the transcript (this session or an earlier one), panes open there at that width instead, under the same 45% limit |

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
- On v2.1.323+ each mod that draws above the prompt gets its own row in the band (filter on `{ component: 'AbovePrompt' }`; rows stack in the order mods run; return `next(e)` to draw nothing). Before v2.1.323 all mods shared one drawing and a tree you returned replaced what later mods drew, so to support those releases put `await next(e)` among the `children` of a `Box` that stays valid (no `width`, `height`, `minWidth`, `minHeight`, `position`, `top`, `left`, `right`, `bottom`, `display`, or `overflow` on it or on a `Box` around it).
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
- Collapsed band: the user collapses it with Ctrl+X then Ctrl+A (or the keys bound instead), or in fullscreen rendering by clicking `[-]` on its first row; it shows one dim `▸ plugin panel hidden` row, stays collapsed after `/clear` until the user expands it or restarts Claude Code, and no hotkey or `action` binding presses a button in it. A mod can't expand it. Read `e.props.isCollapsed` in your `ui.render` hook (v2.1.321+) to show something elsewhere only while collapsed.
- `$.ui.place({ id })` (v2.1.314+, terminal only) adds a row to the transcript after the latest message that Claude doesn't see; draw it at the `Placed` render site, whose hook runs for every mod's rows, so check `e.props.plugin !== $.plugin.name || e.props.id !== '<id>'` and return `next(e)` otherwise. `id` is 1 to 64 letters, digits, `_`, `-`. It resolves `{ isPlaced: true, requestId }`, or `{ isPlaced: false, reason }` (for example `no attached surface draws placed rows yet`, or the limit of 500 placed rows); a second call with the same `id` adds no row and resolves with the existing `requestId`. A row goes away when the conversation ends, the user rewinds past it, or (outside fullscreen rendering) the conversation is compacted; `--resume` doesn't bring it back.
- `$.theme.set({ backdrop, overrideColorScheme, colors })` and `$.theme.clear()` (v2.1.319+) set / remove a backdrop (Desktop and mobile apps; the terminal draws none) drawn at the `Backdrop` render site. They replace `$.ui.backdrop`, which v2.1.319 removed (`$.ui.backdrop(undefined)` becomes `$.theme.clear()`). From v2.1.323 write `scene` in `backdrop` and `e.props`; before that write `id`, and move `overrideColorScheme` into `backdrop` as `colorScheme`. `$.theme.set` resolves `isDrawn: true` when a connected Desktop or mobile app draws backdrops, otherwise `isDrawn: false` and a `reason`. One theme per session: `$.theme.set` replaces the session's backdrop and colors and `$.theme.clear()` removes them, whichever mod set them. Neither a mod reload nor `--resume` keeps the backdrop, so set it in `session.start`.
- Desktop app colors (v2.1.324+ in the Code tab): `$.theme.set({ colors: theme })` with a theme built by `makeColors` (files `make-colors.js` / `make-colors.d.ts` come from the `plugin-authoring` skill; light and dark `anchors` such as `surface-0`, `text-primary`, `text-muted`). Pass `colors` and `backdrop` in the same call because a later `$.theme` call from any mod drops the earlier colors and backdrop. A mod under `~/.claude/skills/<name>/` loads when a session starts. Colors are not applied with a third-party provider in Claude Desktop v5.11492.5 or earlier. To remove colors that stay after turning the mod off, use **Settings** > search `code appearance` > **Remove colors**.
- Where a pane waits: `$.ui.open` resolves `{ isPlaced: false, reason }` when a pane opened by the mod alone does not fit; it then appears when the user opens it or widens the terminal. To announce something without a pane, use `$.ui.toast`.
- `holdToasts` also holds other mods' toasts and Claude Code's own short-lived notifications; leave it off a pane that stays open.

### Changes from the changelog

- 2.1.323: `isPromptCovered` is added to the props a mod's pane is drawn with, telling it when a dialog or a field above the prompt covers the prompt.
- 2.1.305: a mod's docked pane stays within 45% of the terminal's width, including a width kept from a wider terminal. A mod's `Image` draws in iTerm2 3.5 and later with fullscreen rendering, where it showed only its `alt` text.
- 2.1.310: a mod's `Image` draws inside tmux with `allow-passthrough` and `focus-events` on, in kitty, Ghostty, and iTerm2 3.5+ with fullscreen rendering, where it showed only its `alt` text.
- 2.1.304: VS Code chat panel mod drawing was added for sessions on Amazon Bedrock, Google Vertex AI and Microsoft Foundry, behind an LLM gateway, or with telemetry turned off.
- Source: https://code.claude.com/docs/en/plugins/mods/interface.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304, 2.1.305, 2.1.310, 2.1.323, retrieved 2026-11-14)

## Related

- [Mods overview](./overview.md)
- [Interface gallery for mods](./interface-gallery.md)
- [React to events](./events.md)
- [Use the mods API](./api.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
