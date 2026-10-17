# Extending the Dashboard

Themes, UI plugins, and backend plugins for the web dashboard (`hermes dashboard`). All three are drop-in at runtime: no repo clone, no build step.

## Signature / Usage

```yaml
# ~/.hermes/dashboard-themes/neon.yaml
name: neon
label: Neon
description: Pure magenta on black

palette:
  background: "#000000"
  midground: "#ff00ff"
```

```json
// ~/.hermes/plugins/my-plugin/dashboard/manifest.json
{
  "name": "my-plugin",
  "label": "My Plugin",
  "icon": "Sparkles",
  "version": "1.0.0",
  "tab": { "path": "/my-plugin", "position": "after:skills" },
  "entry": "dist/index.js"
}
```

```javascript
// ~/.hermes/plugins/my-plugin/dashboard/dist/index.js (plain IIFE)
(function () {
  const SDK = window.__HERMES_PLUGIN_SDK__;
  const { React } = SDK;
  const { Card, CardContent } = SDK.components;
  function MyPage() {
    return React.createElement(Card, null,
      React.createElement(CardContent, null, "Hello from my custom dashboard tab."));
  }
  window.__HERMES_PLUGINS__.register("my-plugin", MyPage);
})();
```

## Theme keys

| Key | Description |
|-----|-------------|
| `palette.background` / `midground` / `foreground` | 3-layer palette (`{hex, alpha}` or bare hex); all shadcn tokens derive via `color-mix()` |
| `palette.warmGlow` | `rgba(...)` vignette color |
| `palette.noiseOpacity` | 0-1.2 grain multiplier |
| `typography.fontSans` / `fontMono` / `fontDisplay` / `fontUrl` / `baseSize` / `lineHeight` / `letterSpacing` | Font stacks, external stylesheet, sizing |
| `layout.radius` | Any CSS length; maps to `--radius` |
| `layout.density` | `compact` (0.85x) / `comfortable` (1.0x, default) / `spacious` (1.2x) |
| `layoutVariant` | `standard` (default, 1600px) / `cockpit` (260px left rail, `sidebar` slot) / `tiled` (full width) |
| `assets` | `bg`, `hero`, `crest`, `logo`, `sidebar`, `header`, `custom.<name>` as `--theme-asset-<name>` CSS vars (`-raw` variant too); `bg` is auto-wired |
| `componentStyles` | Buckets: `card`, `header`, `footer`, `sidebar`, `tab`, `progress`, `badge`, `backdrop`, `page`; camelCase to `--component-<bucket>-<kebab>` |
| `colorOverrides` | Keys: `card`, `cardForeground`, `popover`, `popoverForeground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `muted`, `mutedForeground`, `accent`, `accentForeground`, `destructive`, `destructiveForeground`, `success`, `warning`, `border`, `input`, `ring` |
| `customCSS` | Raw CSS in a scoped `<style data-hermes-theme-css>`; capped at 32 KiB per theme |

Built-in themes: `default` (Hermes Teal), `default-large`, `midnight`, `ember`, `mono`, `cyberpunk`, `rose`. Selection persists to `config.yaml` under `dashboard.theme`; the font picker override persists under `dashboard.font`.

## Manifest fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique plugin identifier |
| `label` | Yes | Nav tab display name |
| `description` | No | Short description |
| `icon` | No | Lucide icon name, default `Puzzle`; mapped: `Activity`, `BarChart3`, `Clock`, `Code`, `Database`, `Eye`, `FileText`, `Globe`, `Heart`, `KeyRound`, `MessageSquare`, `Package`, `Puzzle`, `Settings`, `Shield`, `Sparkles`, `Star`, `Terminal`, `Wrench`, `Zap` |
| `version` | No | Semver, default `0.0.0` |
| `tab.path` | Yes | URL path for the tab |
| `tab.position` | No | `"end"` (default), `"after:<path>"`, `"before:<path>"` |
| `tab.override` | No | Built-in route (`"/"`, `"/sessions"`, `"/config"`, ...) to replace; first plugin wins |
| `tab.hidden` | No | Register component and slots without a nav tab |
| `slots` | No | Documentation aid only; real registration via `registerSlot()` |
| `entry` | Yes | JS bundle relative to `dashboard/`, default `dist/index.js` |
| `css` | No | CSS file injected as `<link>` |
| `api` | No | Python file with FastAPI `router`, mounted at `/api/plugins/<name>/` |

## Slots

```javascript
window.__HERMES_PLUGINS__.registerSlot("my-plugin", "sidebar", MySidebar);
```

| Slot | Location |
|------|----------|
| `backdrop` | Inside `<Backdrop />`, above noise layer |
| `header-left` / `header-right` / `header-banner` | Top bar before brand / before switchers / strip below nav |
| `sidebar` | Cockpit rail; rendered only when `layoutVariant === "cockpit"` |
| `pre-main` / `post-main` | Above / below route outlet |
| `footer-left` / `footer-right` | Footer cells (replace default) |
| `overlay` | Fixed layer above everything |
| `<page>:top` / `<page>:bottom` | For pages `sessions`, `analytics`, `logs`, `cron`, `skills`, `config`, `env`, `docs`, `chat` (`chat` only with embedded chat) |

## SDK (`window.__HERMES_PLUGIN_SDK__`)

| Member | Description |
|--------|-------------|
| `React`, `hooks.*` | `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`, `createContext` |
| `components.*` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Badge`, `Button`, `Input`, `Label`, `Select`, `SelectOption`, `Separator`, `Tabs`, `TabsList`, `TabsTrigger`, `PluginSlot` |
| `api` | Typed client (`getStatus`, `getSessions`, `getConfig`, ...) |
| `fetchJSON` | Authenticated JSON fetch for plugin routes |
| `utils` | `cn`, `timeAgo`, `isoTimeAgo` |
| `useI18n` | i18n hook |

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/dashboard/themes` | GET | List themes + active name |
| `/api/dashboard/theme` | PUT | Set active theme, body `{"name": "midnight"}` |
| `/api/dashboard/plugins` | GET | List discovered plugins |
| `/api/dashboard/plugins/rescan` | GET | Force rescan without restart |
| `/dashboard-plugins/<name>/<path>` | GET | Static assets from `dashboard/` |
| `/api/plugins/<name>/*` | * | Plugin backend routes |

## Notes

- Layout: `~/.hermes/plugins/<name>/dashboard/{manifest.json, dist/index.js, dist/style.css, plugin_api.py}`. Discovery priority: `~/.hermes/plugins/` (`user`), `<repo>/plugins/...` (`bundled`), `./.hermes/plugins/` (`project`, requires `HERMES_ENABLE_PROJECT_PLUGINS`).
- This page covers the web dashboard only. The native desktop app (`hermes desktop`) has a separate `@hermes/plugin-sdk`; only the backend `plugin_api.py` namespace is shared. The CLI skin system is unrelated to dashboard themes.
- Backend routes are mounted once at startup, not on rescan; the module must export `router = APIRouter()`. Routes sit behind the dashboard auth gate. Avoid `--host 0.0.0.0` with untrusted plugins.
- A plugin has up to 2 seconds after script load to call `register()`. The `name` passed to `register()` must match `manifest.json` `name`.
- `colorOverrides` are scoped to the active theme and cleared on switch. A re-registered `(plugin, slot)` replaces the earlier one.
- Dashboard plugins are installed by directory layout, not pip entry point.

## Related

- [Web Dashboard](./web-dashboard.md)
- [Skins](./skins.md)
- [Plugins](./plugins.md)
