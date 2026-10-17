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

`PluginContext` members: `source`, `register(c)` / `registerMany(cs)` (return disposers), `registerSettingsPage(page)`, `rest(path, opts)` and `socket(path, onMessage)` (plugin's `/api/plugins/<id>` namespace), `onEvent(type, listener)`, `onDispose(fn)`, scoped `setTimeout` / `setInterval` / `addEventListener`, `os` (`notify`, `openExternal`, `revealPath`, `writeClipboard`), `pet` (`say`, `clear`, `visible`), `storage` (`get`, `set`, `remove`, keys `hermes.plugin.<id>.*`), `runAction(id)`, `listActions()`.

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
| Composer | `COMPOSER_AREAS.*` | render slots, middleware, attachment providers |
| Model menu rows | `MODEL_MENU_ROW_AREA` | `ModelMenuRowContribution` |
| Appearance settings | `APPEARANCE_AREAS.extra` | `render` |
| Plugin settings page | `SETTINGS_PLUGINS_AREA` | `ctx.registerSettingsPage({ id, title, render, icon?, order?, children? })` |

`host.state` atoms (readonly; `.get()` in handlers, `useValue(atom)` in components): `activeSessionId`, `awaitingResponse`, `busy`, `busyBySession`, `focusedSessionId`, `focusedSessionProfile`, `focusedStoredSessionId`, `focusedUsage`, `cwd`, `gateway`, `model`, `profile`, `viewport`.

`host` verbs: `notify({ kind, message, title?, detail?, action? })`, `notifyError(error, fallbackMessage)`, `navigate('/route')`, `openSession(id, { profile?, intent? })`, `newChat(profile?)`, `openWorkspace(id, { render, title?, minWidth?, onClose? })`, `paneVisibility(paneId)`, `onEvent(type, fn)`, `logs(...)`, `status()`, `restartGateway()`, `profileRoutes()`, `requestProfile(route, method, params?, timeoutMs?, { spawnPriority? })`, `request(method, params?)`, `sessions.{pin, reorder, reorderPinned, setColor}`, `skills.{list, setEnabled}`, `toolsets.{list, setEnabled}`, `profiles.list`, `pluginDecisions`, `i18n.{registerAppLocale, languageOptions}`.

SDK export groups: host, plugin contract types, area constants, area payload types, React/state (`useValue`, `atom`, `computed`, `useQuery`, `useMutation`, `useQueryClient`, `queryClient`, `Contribute`, `WorkspacePageHeaderControl`), theming (`useTheme`, `requestTheme`, OKLCH helpers), the UI kit (`Button`, `Input`, `Select*`, `Switch`, `Tabs*`, `Dialog*`, `Badge`, `Codicon`, ...) and helpers (`cn`, `icons`, `haptic`, `useI18n`, `relativeTime`, ...). Canonical list: `apps/desktop/src/sdk/index.ts`.

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
- Security: a loaded plugin runs in the renderer with full app authority (error isolation only, not a sandbox). Catalog installs rely on admission review plus the `desktop surface` lint and the import allowlist; neither is a sandbox.
- Agents writing desktop plugins should load the bundled `hermes-desktop-plugins` skill (includes `templates/plugin.js`).
- The Pet bubble, theme / composer / session-row / model-pill, embedding, transcript-directive, and backend (`plugin_api.py`, event push) sections of the source page are summarized only through the tables above; read the source page for their full payload details.
- Source: developer-guide/desktop-plugin-sdk (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Submitting to the Plugin Catalog](./plugins-catalog-submission.md)
