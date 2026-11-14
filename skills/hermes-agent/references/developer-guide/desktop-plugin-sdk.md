# Desktop Plugin SDK (@hermes/plugin-sdk)

Extend the native Hermes Desktop app (panes, pages, sidebar nav, status bar, palette commands, keybinds, themes, scoped backend namespace) with a single ESM file default-exporting a `HermesPlugin`, importing only `@hermes/plugin-sdk`, with no build step.

## Signature / Usage

```javascript
// ~/.hermes/desktop-plugins/hello/plugin.js   (folder name must equal the plugin id)
import { host, haptic, useValue } from '@hermes/plugin-sdk'
import { jsx, jsxs } from 'react/jsx-runtime'

function HelloPane() {
  const gateway = useValue(host.state.gateway)

  return jsxs('div', {
    className: 'flex h-full flex-col gap-2 p-3 text-sm',
    children: [
      jsx('div', { className: 'font-medium', children: 'Hello, Hermes' }),
      jsx('div', { className: 'text-(--ui-text-tertiary)', children: `gateway: ${gateway}` })
    ]
  })
}

export default {
  id: 'hello', // must match the folder name
  name: 'Hello',
  register(ctx) {
    ctx.register({
      id: 'pane',
      area: 'panes',
      title: 'hello',
      data: { placement: 'right', width: '260px' },
      render: () => jsx(HelloPane, {})
    })
    ctx.register({
      id: 'chip',
      area: 'statusBar.right',
      order: 130,
      render: () =>
        jsx('button', {
          type: 'button',
          onClick: () => {
            haptic('tap')
            host.notify({ kind: 'info', message: 'Hello from my plugin!' })
          },
          children: 'hello'
        })
    })
  }
}
```

Contract types:

```ts
interface HermesPlugin {
  id: string                 // stable slug; becomes `plugin:<id>` source and id namespace
  name?: string
  defaultEnabled?: boolean   // default true; false = opt-in
  capabilities?: readonly string[]  // sensitive doors used, declared up front; today 'preview.executeJavaScript' (ctx.preview); an undeclared door refuses
  register: (ctx: PluginContext) => void
}

interface Contribution {
  id: string
  area: string
  title?: string
  order?: number
  when?: () => boolean
  enabled?: boolean
  render?: () => ReactNode
  data?: unknown
}
```

## Options / Props

Delivery modes:

| Mode | Where | Build step |
|------|-------|------------|
| Disk (recommended) | `$HERMES_HOME/desktop-plugins/<id>/plugin.js` | none (plain uncompiled ESM) |
| Unified package | `$HERMES_HOME/plugins/<id>/desktop/plugin.js` | none (same disk pipeline) |
| Bundled | `apps/desktop/src/plugins/<id>/plugin.tsx` | app's Vite build |

`PluginContext` members: `source`, `register(c)` / `registerMany(cs)` (return disposers), `registerSettingsPage(page)`, `rest(path, opts)` and `socket(path, onMessage)` (plugin's `/api/plugins/<id>` namespace), `onEvent(type, listener)`, `onDispose(fn)`, scoped `setTimeout` / `setInterval` / `addEventListener`, `os` (`notify`, `openExternal`, `revealPath`, `writeClipboard`), `files` (`dataFolder`, `folders`, `requestFolder`, `list`, `readText`, `writeText`, `rename`, `trash`, `readDataUrl`, `stat`, `release`), `preview` (`isAvailable`, `executeJavaScript`; needs the declared capability + per-origin user consent), `pet` (`say`, `clear`, `visible`), `storage` (`get`, `set`, `remove`, keys `hermes.plugin.<id>.*`), `runAction(id)`, `listActions()`.

Contribution areas:

| Surface | `area` | You provide |
|---------|--------|-------------|
| Layout pane | `PANES_AREA` (`'panes'`) | `title` + `render` + `data: { placement: 'main'\|'left'\|'right'\|'top'\|'bottom', dock?: { pane, pos }, width?, height? }` |
| Full page | `ROUTES_AREA` | `data: { path }` + `render` |
| Sidebar nav | `SIDEBAR_NAV_AREA` | `data: { path, label, codicon }` |
| Status bar | `STATUSBAR_AREAS.left` / `.right` | `render` or `data` as `StatusbarItem` |
| Title bar | `TITLEBAR_AREAS.left` / `.center` / `.right` | `TitlebarTool` data or `<Contribute>` |
| Page header | `WORKSPACE_PAGE_HEADER_AREA` | `<WorkspacePageHeaderControl>` inside your page |
| Command palette | `PALETTE_AREA` | `data: { id, label, keywords, run }` |
| Keybind | `KEYBINDS_AREA` | `data: { id, label, category, defaults: ['mod+shift+r'], run }` |
| Theme | `THEMES_AREA` | `data` as `DesktopTheme` |
| Composer | `COMPOSER_AREAS.*` (`top`, `bottom`, `underside`, `leading`, `actions`, `attachments`, `middleware`, `contextMenu`) | render slots, middleware, attachment providers; `contextMenu`: `data: { items(context) }` rows on a right-click in the composer |
| Model menu rows | `MODEL_MENU_ROW_AREA` | `ModelMenuRowContribution` |
| Kanban card badges | `KANBAN_CARD_AREAS.badges` | `data: KanbanCardBadgeContribution` — short text labels per card, painted by the board |
| Tool media | `TOOL_MEDIA_RENDERER_AREA` (`'transcript.toolMedia'`) | `data: { tools, render }` — draw the `MEDIA:` files your package's own tools produced |
| Appearance settings | `APPEARANCE_AREAS.extra` | `render` |
| Plugin settings page | `SETTINGS_PLUGINS_AREA` | `ctx.registerSettingsPage({ id, title, render, icon?, order?, children? })` |

`host.state` atoms (readonly; `.get()` in handlers, `useValue(atom)` in components): `activeSessionId`, `awaitingResponse`, `busy`, `busyBySession`, `focusedSessionId`, `focusedSessionProfile`, `focusedStoredSessionId`, `focusedUsage`, `cwd`, `gateway`, `model`, `profile`, `viewport`.

`host` verbs: `notify({ kind, message, title?, detail?, action? })`, `notifyError(error, fallbackMessage)`, `navigate('/route')`, `openSession(id, { profile?, intent? })`, `newChat(profile?)`, `openWorkspace(id, { render, title?, minWidth?, onClose? })`, `paneVisibility(paneId)`, `onEvent(type, fn)`, `logs(...)`, `status()`, `restartGateway()`, `profileRoutes()`, `requestProfile(route, method, params?, timeoutMs?, { spawnPriority? })`, `request(method, params?)`, `spellcheck.{addWord, removeWord}` (Chromium spell-check dictionary; one bounded word, resolves `false` otherwise), `sessions.{pin, reorder, reorderPinned, setColor}`, `skills.{list, setEnabled}`, `toolsets.{list, setEnabled}`, `profiles.list`, `pluginDecisions`, `i18n.{registerAppLocale, languageOptions}`.

SDK export groups: host, plugin contract types, area constants, area payload types, React/state (`useValue`, `atom`, `computed`, `useQuery`, `useMutation`, `useQueryClient`, `queryClient`, `Contribute`, `WorkspacePageHeaderControl`), theming (`useTheme`, `requestTheme`, OKLCH helpers), the UI kit (`Button`, `Input`, `Select*`, `Switch`, `Tabs*`, `Dialog*`, `Badge`, `Codicon`, ...) and helpers (`cn`, `icons`, `haptic`, `useI18n`, `relativeTime`, ...). `gatewayActivationEpoch()` is a named SDK export: a read-only counter that changes on every active route selection (including same-profile source swaps); capture it alongside the route before async work and check `gatewayActivationEpoch() === epoch` before mutation or UI publication. It is not a credential, permission grant, or durable gateway/session identity. New export names in v0.23.1: `PluginFiles`, `PluginFolder`, `PluginFileEntry`, `PluginFilesResult`, `KANBAN_CARD_AREAS`, `KanbanCardBadgeContribution` (+ `KanbanCard`, `KanbanCardBoard`, `KanbanCardBadge`, `KanbanCardBadgeTone`, `KANBAN_CARD_BADGE_HUES`, `KANBAN_CARD_BADGE_LIMITS`), `ComposerContextMenuProvider` (+ `ComposerContextMenuItem`, `ComposerContextMenuContext`, `ComposerContextMenuAction`), `TOOL_MEDIA_RENDERER_AREA`. Canonical list: `apps/desktop/src/sdk/index.ts`.

## Notes

- Not the web-dashboard plugin SDK (`window.__HERMES_PLUGIN_SDK__` with `manifest.json`) and not Python CLI/gateway plugins; only the backend `plugin_api.py` namespace (`/api/plugins/<id>`) is shared with the dashboard SDK.
- Disk plugins load uncompiled: JSX does not parse, use `jsx()` / `jsxs()` or `React.createElement`. Only `@hermes/plugin-sdk`, `react`, `react/jsx-runtime` resolve. Module evaluation has a 10 s deadline (put waiting inside `register()`).
- Hot reload: the app watches `desktop-plugins/`; if a plugin does not appear use the palette command Reload desktop plugins and `hermes logs gui -f`.
- Disabled plugins stay disabled; users toggle under Capabilities > Plugins; `defaultEnabled: false` ships an opt-in plugin.
- Unified package: a `desktop/plugin.js` inside the agent package is copied to `$HERMES_HOME/desktop-plugins/<id>/` with a `.hermes-package.json` marker, refreshed on Rescan / `hermes plugins update` / restart. Develop from a checkout linked into `plugins/`; editing the installed package in place does nothing until refreshed.
- Style with theme variables (`var(--ui-text-secondary)`, `var(--ui-accent)`, ...), never hardcoded colors; leave pane backgrounds alone.
- Gate actions on the focused session's turn-busy (`host.state.busyBySession[id]`), never on `host.state.gateway` (socket state).
- Use `ctx.setTimeout` / `ctx.setInterval` / `ctx.addEventListener` / `ctx.onDispose`; bare globals survive disable and hot reload. Do not poll `host.request` faster than a few seconds; `ctx.socket` is a no-op on OAuth remotes (keep a polling fallback). Use `ctx.runAction(id)` instead of synthetic KeyboardEvents.
- Pet bubble lines: plain text capped at 120 chars, TTL default 6 s (clamped 1–30 s), at most 3 live lines per plugin. `ctx.os.notify` fires only while Hermes is backgrounded and is throttled; action buttons render only on signed macOS builds.
- Security: a loaded plugin runs in the renderer with full app authority (error isolation only, not a sandbox). Catalog installs rely on admission review plus the `desktop surface` lint and the import allowlist; neither is a sandbox. Doors that touch user data outside the app are gated on top of that: `ctx.preview.executeJavaScript` needs a declared capability and the user's per-origin consent; file access should go through `ctx.files` (enforced in the main process, limited to the plugin's data folder and folders the user granted), not the raw `window.hermesDesktop` file bridge, which has no such limit (catalog review asks for `ctx.files`).
- `host.requestProfile(...)`: a call that has to open a connection to another profile dials at background priority by default. After a failed dial to that profile, background calls fail fast while the reconnect backoff runs (`Backend for "<profile>" is reconnecting; retry after it settles.`). For a user action (a save, a button press, a dialog opening) pass `{ spawnPriority: 'foreground' }` so it dials at once; keep the background default for polling and roster warming.
- Transcript directives: `render` receives `{ attrs, source, streaming, sessionId }`; `sessionId` names the chat whose transcript shows the card (stored id, else runtime id; `null` while the chat has no session yet; older hosts pass `undefined`). Pass it to the `host.composer` verbs (e.g. `host.composer.submit(sessionId ?? null, text)`) so a card action lands in that chat; addressed verbs fail closed (`submit` returns `false` when the chat has no visible composer).
- Embedded guest frames (`SandboxedFrame`): in the Webapp (browser tab) a `data:text/html` src is rendered through the gateway's guest shell (`/assets/webapp-guest.html`); post to `parent`, not `top`; changing `sandbox` after mount gives the Webapp a fresh frame (new `ref.current`, `onLoad` fires again).
- `ctx.socket` authentication: a token-mode remote gets the `?token=` query credential; a local gateway authenticates with the native grant minted by Desktop's main process for the active profile (sent as a header, never in a URL your code sees; refused if the plugin is disabled for that profile). The socket keeps retrying (jittered backoff capped at 30 s) while the connection or grant is not yet available, stops after 5 refusals in a row that do not clear by themselves, and restarts on connection/profile change or remount.
- A root `plugin.js` in a unified package is now also supported and wins over `desktop/plugin.js`; the whole package folder is copied as the desktop half (without `.git` and `__pycache__`); it must hold no symlinks and stay under 64 MB or nothing is copied.
- Backend event push to Desktop (source page's caller table): a call from the process Desktop is connected to (the host gateway a local Desktop attaches to, or a remote `hermes serve`: `plugin_api.py` routers, plugin slash commands, tools and hooks in the agent turn) reaches every Desktop window connected to that process; from the `dashboard.turn_isolation` compute-host child it is relayed to its parent process; from `hermes chat`, cron, `hermes plugins validate`, or a gateway with no Desktop window connected it is a logged no-op (v0.22.2 named `hermes serve` / `hermes gateway run` here).
- Build tooling in the page is now `pnpm run ...` (`pnpm run build`, `pnpm run i18n:keys` in `apps/desktop`); v0.22.2 said `npm run`.
- Agents writing desktop plugins should load the bundled `hermes-desktop-plugins` skill (includes `templates/plugin.js`).
- The Pet bubble, theme / composer / session-row / model-pill, embedding, transcript-directive, and backend (`plugin_api.py`, event push) sections of the source page are summarized only through the tables above; read the source page for their full payload details.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/desktop-plugin-sdk (pinned to v0.23.1)

### Composer context menu rows (`COMPOSER_AREAS.contextMenu`, new since v0.22.2)

`COMPOSER_AREAS.contextMenu` adds rows to the menu the app opens when the user right-clicks the composer (the main input or the message-edit composer). A contribution is data: an `items(context)` function called once per right-click; the app renders the rows with its own menu items.

```javascript
import { COMPOSER_AREAS, host } from '@hermes/plugin-sdk'

ctx.register({
  id: 'spelling',
  area: COMPOSER_AREAS.contextMenu,
  data: {
    // context = { word: string | null, selection: string } — nothing else.
    items: ({ word }) => {
      if (!word || isKnown(word)) return []

      return [
        ...suggest(word).slice(0, 5).map(suggestion => ({
          label: suggestion,
          // Runs after the menu closed, with the caret back in the composer.
          onSelect: action => action.replaceWord(suggestion)
        })),
        { label: ctx.i18n.t('addToDictionary'), onSelect: () => void host.spellcheck.addWord(word) }
      ]
    }
  }
})
```

```ts
interface ComposerContextMenuContext {
  word: string | null // the word under the caret (or at the selection's start)
  selection: string // the selected composer text, '' when the caret is collapsed
}

interface ComposerContextMenuItem {
  label: string // plain text: controls/bidi overrides stripped, clamped to 80 chars
  disabled?: boolean
  onSelect: (action: ComposerContextMenuAction) => void
}

interface ComposerContextMenuAction extends ComposerContextMenuContext {
  replaceWord(text: string): boolean // one line, <= 200 chars
}
```

A provider sees only the word and the composer selection (capped at 2,000 chars). `replaceWord` is the only edit it offers (works once; returns `false` when the composer no longer holds that word there); for anything else use `host.composer`. Each plugin gets its own section after the app's spell-check rows and before Cut / Copy / Paste, ordered by plugin id then contribution id; at most six rows per plugin; a throwing provider contributes nothing. `host.spellcheck.addWord(word)` / `removeWord(word)` resolve `Promise<boolean>` (letters, combining marks, digits and inner `'` / `-`, at least one letter, at most 64 characters; `false` otherwise or on an older desktop shell).

### Kanban card badges (`KANBAN_CARD_AREAS.badges`, new since v0.22.2)

A contribution supplies `decorate(card, board)` (one badge, an array, or `null`); the board paints chips in a fixed row above the card title.

```ts
import {
  KANBAN_CARD_AREAS,
  KANBAN_CARD_BADGE_HUES,
  type KanbanCardBadgeContribution
} from '@hermes/plugin-sdk'

interface KanbanCard {            // frozen; identity and routing fields only
  id: string                      // task id (t_…): key your own per-card data by it
  status: string                  // the column: 'triage', 'ready', 'running', …
  tenant: string | null
  assignee: string | null
}
interface KanbanCardBoard {       // frozen; shared by every card on the board
  tenants: readonly string[]      // every tenant on the board (its filter menu's list)
}
interface KanbanCardBadge {
  label: string                   // plain text
  tone?: KanbanCardBadgeTone      // 'neutral' (default) or one of KANBAN_CARD_BADGE_HUES
  tooltip?: string                // plain text hover line
}

ctx.register({
  area: KANBAN_CARD_AREAS.badges,
  id: 'tenant',
  data: {
    // `tenants` lets you give each tenant on the board its own hue instead of
    // hashing blind (two tenants can hash to the same one).
    decorate: ({ tenant }, { tenants }) =>
      tenant
        ? { label: tenant, tone: KANBAN_CARD_BADGE_HUES[distinctIndex(tenant, tenants) % 12], tooltip: `Tenant: ${tenant}` }
        : null
  } satisfies KanbanCardBadgeContribution
})
```

Limits (`KANBAN_CARD_BADGE_LIMITS`): text only (`label` up to 24 chars, `tooltip` up to 160, control/bidi/zero-width characters removed); `tone` is `'neutral'` or one of twelve `KANBAN_CARD_BADGE_HUES`; two badges per plugin per card; every tooltip ends with the plugin's name; row ordered by plugin id, then contribution id (a contribution's `order` is ignored); a throwing decorator contributes nothing. `decorate()` re-runs on registry or card/board changes, so keep it a pure lookup; re-call `ctx.register` with the same `id` to repaint. Replaces DOM-decorating plugins (route poll, `MutationObserver`).

### Tool media renderers (`TOOL_MEDIA_RENDERER_AREA`, new since v0.22.2)

A unified package (agent tools + a desktop half) can decide how Desktop shows the media its own tools produce: when a reply delivers a file with a `MEDIA:` line, Desktop finds the tool call whose result first named the path and, if the plugin that owns that tool registered a renderer for the tool's name, your component replaces the built-in player.

```javascript
import * as sdk from '@hermes/plugin-sdk'
import { useEffect, useState } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

export default {
  id: 'sound-fx', // the desktop half of the `sound-fx` package
  register(ctx) {
    // Older Desktops don't export the area: keep your old path there.
    if (typeof sdk.TOOL_MEDIA_RENDERER_AREA !== 'string') return

    ctx.register({
      id: 'sound-card',
      area: sdk.TOOL_MEDIA_RENDERER_AREA,
      data: {
        tools: ['sound_fx_generate'], // a tool this package's plugin.yaml registers
        render: props => jsx(SoundCard, props)
      }
    })
  }
}

function SoundCard({ file, args, result, sessionId, fallback }) {
  const [src, setSrc] = useState(null)
  useEffect(() => {
    let live = true
    file.resolveUrl().then(url => live && setSrc(url), () => live && setSrc(''))
    return () => { live = false }
  }, [file])

  if (file.kind !== 'audio' || src === '') return fallback // the built-in player
  return jsxs('figure', {
    children: [
      jsx('figcaption', { children: args.prompt ?? file.name }),
      src && jsx('audio', { controls: true, src })
    ]
  })
}
```

`render` props: `file` (`{ path, name, kind, mime, resolveUrl() }`; `path` is on the backend's machine, never open it yourself), `toolName`, `toolCallId`, `args`, `result` (read defensively: a reopened chat rebuilds them from history), `sessionId`, `fallback` (the built-in player; return it or `null` for anything you do not draw). Ownership is provenance, never file type: only tools your package's own code registered (native `ctx.register_tool`, or the MCP servers your portable package declares, a trailing `*` matching by prefix such as `mcp__meshy__*`); a claim on a core tool or another plugin's tool is refused with a console warning. A renderer that throws or returns `null`, a disabled plugin, or a too-old backend falls back to the built-in player. Other surfaces (CLI, TUI, messaging) still just deliver the `MEDIA:` file.

### Files: `ctx.files` (new since v0.22.2)

`ctx.files` is the one sanctioned way for a plugin to touch files on the computer running Desktop: its own data folder (handle `'data'`, no prompt) and folders the user grants through `ctx.files.requestFolder()` (the app's own picker; remembered across restarts; revocable under Capabilities → Plugins → Folder access; dropped on uninstall). Every call names a folder handle and a path relative to that folder; `..`, absolute paths, drive letters and symlinks resolving outside are refused, Hermes' own data and key folders (`~/.ssh`) cannot be granted, only plain files are read or written.

```ts
// First run: ask once, remember the handle.
let vault = (await ctx.files.folders())[0]
if (!vault) {
  const picked = await ctx.files.requestFolder()
  if (!picked.ok || !picked.folder) return   // cancelled, refused, or an older app
  vault = picked.folder
}

const listing = await ctx.files.list(vault.id, 'notes')        // { ok, entries: [{ name, path, isDirectory }], truncated }
const note = await ctx.files.readText(vault.id, 'notes/a.md')  // { ok, text, size, mtimeMs }
await ctx.files.writeText(vault.id, 'notes/b.md', '# B\n', { exclusive: true }) // refuses to replace a file
await ctx.files.rename(vault.id, 'notes/b.md', 'c.md')         // same folder only
await ctx.files.trash(vault.id, 'notes/c.md')                  // OS trash, recoverable
await ctx.files.readDataUrl(vault.id, 'img/cover.png')         // { ok, url: 'data:image/png;base64,…' }
await ctx.files.stat(vault.id, 'notes/a.md')                   // { ok, exists, isDirectory?, size?, mtimeMs? }
await ctx.files.writeText('data', 'index.json', JSON.stringify(index))
await ctx.files.release(vault.id)                              // give the folder back
```

No member throws. `folders()` resolves `{ id, name, path }[]`; `release(id)` resolves a boolean; every other member resolves `{ ok: true, … }` or `{ ok: false, error, message }` with `error` one of `invalid-path`, `outside-folder`, `protected`, `not-granted`, `folder-missing`, `folder-changed`, `not-found`, `exists`, `is-directory`, `not-a-directory`, `not-a-file`, `binary`, `too-large`, `sensitive-file` (`.env`, SSH keys and similar, even inside a granted folder), `io-error`, `unavailable` (feature-detect with `ctx.files?.…`). Limits: text reads and writes up to 4 MiB, data URLs up to 16 MiB, listings up to 10,000 entries; reads past the limit are refused, never truncated; a write needs its parent folder to exist. Paths are on the machine running Desktop, not a remote backend (use `ctx.rest` routes for that).

### Preview page scripts: `ctx.preview` (new since v0.22.2)

`ctx.preview.executeJavaScript(code)` runs `code` in the focused session's preview Browser tab (the guest runner `drive_preview` uses) and resolves the completion value. Closed by default; the app arbitrates every call: (1) declare `capabilities: ['preview.executeJavaScript']` in the plugin's default export (undeclared = refused); (2) the user allows it per page origin (first call raises an app-owned dialog; *Allow on this site* persists, *Don't allow* refuses for the rest of the app run; grants listed and revocable under Capabilities → Plugins); (3) web origins only (`http(s)://host[:port]`; `about:blank`, `data:`, `file:` refused); (4) the origin is re-checked in the page behind a `window.location.origin` guard.

```js
export default {
  id: 'page-tools',
  name: 'Page Tools',
  capabilities: ['preview.executeJavaScript'],
  register(ctx) {
    ctx.register({ area: PALETTE_AREA, id: 'title', data: {
      id: 'pageTools.title', label: 'Copy page title',
      run: async () => ctx.os.writeClipboard(String(await ctx.preview.executeJavaScript('document.title')))
    } })
  }
}
```

```js
ctx.preview.isAvailable()             // declared AND a live Browser page in this window (not consent)
await ctx.preview.executeJavaScript(code)
// rejects: undeclared · 'No preview page is open.' · non-web origin ·
//          '<Plugin> is not allowed to run scripts on <origin>.' · page changed origin
```

Reach the page only through this door; querying or creating a `<webview>` (`document.querySelector('webview')`) bypasses declaration and consent and fails the catalog's `desktop surface` lint (`preview guest reach`). A popped-out Browser window is not bridged.

### Live tool progress: `tool.progress` event (new since v0.22.2)

An MCP server that sends `notifications/progress` reaches the renderer as a `tool.progress` event (Hermes sends `_meta.progressToken` on every `tools/call`); the native tool row shows `42% · <message>`.

```javascript
ctx.onEvent('tool.progress', ({ session_id, payload }) => {
  // payload: { tool_id, name, progress, total, percent, message }
  if (payload.name.startsWith('mcp__meshy__')) showRefineProgress(payload.tool_id, payload.percent, payload.message)
})
ctx.onEvent('tool.complete', ({ payload }) => clearRefineProgress(payload.tool_id))
```

Payload fields: `tool_id`, `name` (`mcp__<server>__<tool>`), `progress`, `total` (`number | null`), `percent` (`0`–`100` when `total` is set, else `null`), `message` (`string | null`). Throttled to one per 500 ms per call (first update and the one reaching `total` always arrive); never stored in the transcript.

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Submitting to the Plugin Catalog](./plugins-catalog-submission.md)
