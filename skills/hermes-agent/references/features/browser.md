# Browser

Browser automation toolset with multiple backends: Browser Use cloud, Browserbase, Firecrawl, Camofox, Lightpanda, local Chromium-family via CDP, and local Chromium through `agent-browser`. Pages are exposed as accessibility-tree snapshots with ref IDs (`@e1`, `@e2`).

## Signature / Usage

```yaml
# ~/.hermes/config.yaml
browser:
  cloud_provider: browserbase     # browserbase | browser-use | camofox | nous | local
  headed: false
  inactivity_timeout: 120
  snapshot_threshold: 15000
```

```bash
# ~/.hermes/.env (credentials only; the provider is selected via `hermes tools` -> Browser Automation)
BROWSERBASE_API_KEY=***
BROWSERBASE_PROJECT_ID=your-project-id-here
```

## Backends

| Backend | Setup |
|---|---|
| Browser Use mode (default driver) | Single `browser_exec` tool; engine is browser-harness (Python dependency of Hermes). Opt out with `/browser use off` or `browser.backend: "off"`; `backend: "browser-use"` forces it |
| Browser Use cloud | `BROWSER_USE_API_KEY` |
| Browserbase | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` |
| Firecrawl | `FIRECRAWL_API_KEY`; optional `FIRECRAWL_API_URL` (default `https://api.firecrawl.dev`), `FIRECRAWL_BROWSER_TTL` (default 300) |
| Camofox | `CAMOFOX_URL=http://localhost:9377`; select in `hermes tools` |
| Lightpanda | `browser.cloud_provider: local` + `browser.engine: lightpanda` (or `AGENT_BROWSER_ENGINE=lightpanda`) |
| Local CDP | `/browser connect`, `/browser connect ws://host:port`, `/browser status`, `/browser disconnect` (interactive CLI only) |
| Local Chromium | `hermes pm install agent-browser` |
| Nous Subscription | Via Tool Gateway; `hermes setup --portal` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `browser.cloud_provider` | string | Active provider written by `hermes tools`; a selection is not switched by adding/removing keys |
| `browser.backend` | string | `"off"` forces built-in browser tools; `"browser-use"` forces Browser Use mode |
| `browser.engine` | string | `auto` / `lightpanda` / `chrome`; lowest-precedence browser setting |
| `browser.auto_local_for_private_urls` | bool | Default on; spawns a local Chromium sidecar for private/loopback/LAN URLs when a cloud provider is set |
| `browser.allow_private_urls` | bool | Lets the cloud provider attempt private URLs (usually fails) |
| `browser.use_real_profile` | bool | Default false; snapshot your active browser profile under `~/.hermes/browser-profile/<browser>/` |
| `browser.real_profile_pin` | string | Pin snapshot source to a profile directory name (e.g. `"Profile 2"`); fails closed if absent |
| `browser.real_profile_autoclose` | bool | Offer to close the browser holding the profile lock (always asks first) |
| `browser.headed` / `AGENT_BROWSER_HEADED=1` | bool | Visible window, default false; keeps window open between turns |
| `browser.inactivity_timeout` / `BROWSER_INACTIVITY_TIMEOUT` | int | Seconds before auto-cleanup, default 120 |
| `browser.snapshot_threshold` | int | Truncation threshold, default 15000 characters (minimum 1000) |
| `browser.restrict_evaluate` | bool | Strict denylist over sensitive JS primitives in `browser_console` expressions |
| `browser.dialog_policy` | string | `must_respond` (default) / `auto_dismiss` / `auto_accept` |
| `browser.dialog_timeout_s` | int | Safety auto-dismiss under `must_respond`, default 300 |
| `browser.record_sessions` | bool | Record WebM to `~/.hermes/browser_recordings/` (default false; cleaned after 72 hours) |
| `browser.camofox.managed_persistence` | bool | Persistent Camofox profile; must be nested under `browser.camofox` |
| `browser.camofox.user_id` / `CAMOFOX_USER_ID` | string | Opt into externally managed session mode |
| `browser.camofox.session_key` / `CAMOFOX_SESSION_KEY` | string | `sessionKey` (`listItemId`) used to match a tab for adoption |
| `browser.camofox.adopt_existing_tab` / `CAMOFOX_ADOPT_EXISTING_TAB` | bool | Reuse an existing tab via `GET /tabs?userId=<user_id>` |
| `browser.camofox.rewrite_loopback_urls` | bool | Rewrite loopback page URLs for Dockerized Camofox; `loopback_host_alias` defaults to `host.docker.internal` |
| `BROWSERBASE_PROXIES` | bool | Residential proxies, default true |
| `BROWSERBASE_ADVANCED_STEALTH` | bool | Default false; requires Scale Plan |
| `BROWSERBASE_KEEP_ALIVE` | bool | Default true; requires paid plan |
| `BROWSERBASE_SESSION_TIMEOUT` | seconds | Max 21600 (6 hours) |
| `AGENT_BROWSER_ARGS` | string | Extra Chromium launch flags; setting disables auto-injected `--no-sandbox,--disable-dev-shm-usage` |

## Available Tools

| Tool | Description |
|---|---|
| `browser_navigate` | Navigate to a URL; must be called first |
| `browser_snapshot` | Accessibility-tree snapshot; `full=false` compact (default), `full=true` complete |
| `browser_click` | Click by ref ID |
| `browser_type` | Clear then type into a field |
| `browser_scroll` | Scroll up or down |
| `browser_press` | Press a key (`Enter`, `Tab`, `Escape`, `ArrowDown`, `ArrowUp`, ...) |
| `browser_back` | Previous page |
| `browser_get_images` | List page images with URLs and alt text |
| `browser_vision` | Screenshot + vision analysis; saved under `~/.hermes/cache/screenshots/` (cleaned after 24 hours) |
| `browser_console` | Console output and JS exceptions; `clear=True`; `expression` argument evaluates JS |
| `browser_cdp` | Raw CDP passthrough; only when a CDP endpoint is reachable at session start (`/browser connect` or `browser.cdp_url`) |
| `browser_dialog` | Respond to `alert` / `confirm` / `prompt` / `beforeunload`: `action="accept"` or `"dismiss"`, `prompt_text` |
| `browser_exec` | Browser Use mode; `session=<name>` isolates concurrent work; `local` argument when real-profile toggle is on |

```text
browser_cdp(method="Target.getTargets")
browser_cdp(method="Runtime.evaluate",
            params={"expression": "document.title", "returnByValue": true},
            target_id="<tabId>")
```

## Notes

- The `browser` toolset must be in `toolsets` (e.g. `hermes config set toolsets '["hermes-cli", "browser"]'`).
- `browser_exec` is only offered to sessions that also have terminal access, because it executes model-written Python on the machine.
- Browser Use mode composes with the selected backend; Camofox has no CDP endpoint, so Camofox setups keep the built-in tools.
- Real-profile browsing copies only the active profile into a snapshot and never opens the live profile; turning the toggle off deletes `~/.hermes/browser-profile/`. On Windows the browser must be fully quit; on macOS/Linux a running Chrome typically holds `Login Data` and `Web Data` locks, so quit it too. It is a consent-gated convenience, not an isolation boundary.
- For scheduled runs with real-profile browsing, set `enabled_toolsets=["browser", ...]` on the `cronjob` and save credentials ahead of time in the credential vault; unattended sessions cannot answer prompts.
- Chrome 136+ ignores `--remote-debugging-port` on the default data directory; use a dedicated `--user-data-dir` (e.g. `$HOME/.hermes/chrome-debug`) for `/browser connect`. Chrome 144+ shows an "Allow remote debugging?" dialog for real-profile debugging.
- `/browser connect` is an interactive-CLI slash command and is not dispatched by gateway chats. For Hermes in WSL2 controlling Windows Chrome, prefer `chrome-devtools-mcp` through MCP.
- `browser_dialog` detection works via a CDP supervisor on local Chrome (`/browser connect` or `browser.cdp_url`) and Browserbase; not on Camofox or default local agent-browser. `browser_snapshot.frame_tree` is capped to 30 frames and OOPIF depth 2.
- Camofox persistence is only honored if the Camofox server maps the stable `userId` to a persistent profile directory; Hermes state lives under `~/.hermes/browser_auth/camofox/`.
- Lightpanda has no graphical renderer (no `capture_screenshot()`), holds one page per session, and with built-in tools falls back to Chrome for unsupported actions; screenshots and `browser_vision` go to Chrome.
- Browserbase falls back by disabling `keepAlive`, then proxies, when the plan lacks paid features.
- Limitations: text-based interaction, large pages truncated at `browser.snapshot_threshold` (full snapshot saved under `~/.hermes/cache/web/`), cloud sessions consume provider credits, no file downloads.
- Prefer `web_search` / `web_extract` for simple retrieval; use browser tools to interact.

## Related

- [Tool Gateway](./tool-gateway.md)
- [Computer Use](./computer-use.md)
- [Bot Screen](./bot-screen.md)
- [Credential Vault](./credential-vault.md)
- [Web Search](./web-search.md)
