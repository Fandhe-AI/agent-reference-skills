# Browser

The `browser` toolset gives the agent a real web browser. `browser_exec` runs model-written Python against the browser over the Chrome DevTools Protocol (CDP), with companion tools `browser_cdp`, `browser_dialog` and `browser_vault`. The browser source is a separate choice: Hermes-launched local Chromium (default), cloud browsers (Nous subscription, Browserbase, Browser Use, Firecrawl, provider plugins), Lightpanda, your own Chrome via `/browser connect`, or a managed copy of your real profile.

## Signature / Usage

```yaml
# ~/.hermes/config.yaml
browser:
  executable_path: ""     # Chromium binary to launch instead of the packaged one
  user_data_dir: ""       # persistent profile directory; "" = fresh profile per session
  chromium_args: []       # extra Chromium command-line flags, e.g. ["--lang=de-DE"]
  headed: false           # true = visible window
  command_timeout: 30     # Chromium launch timeout floor (seconds)
  inactivity_timeout: 120 # close an idle browser after N seconds
```

```python
# Searching GitHub trending for Python repos
new_tab("https://github.com/trending/python")
wait_for_load()
print(js("[...document.querySelectorAll('article h2 a')].slice(0, 10).map(a => a.textContent.trim())"))
```

```bash
# ~/.hermes/.env (credentials only; the provider is selected via `hermes tools` -> Browser Automation)
BROWSERBASE_API_KEY=***
BROWSERBASE_PROJECT_ID=your-project-id-here
```

## Browser sources

| Source | Setup |
|---|---|
| Local Chromium (default) | No key. Hermes launches its own packaged Chromium, headless, one browser per session, fresh throwaway profile. If none is found: `hermes pm install chromium` (also undoes an earlier `--skip-browser`) |
| Browser Use cloud | `BROWSER_USE_API_KEY` |
| Browserbase | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` |
| Firecrawl | `FIRECRAWL_API_KEY`; optional `FIRECRAWL_API_URL` (default `https://api.firecrawl.dev`), `FIRECRAWL_BROWSER_TTL` (default 300) |
| Nous Subscription | Via Tool Gateway; `hermes setup --portal` |
| Lightpanda | `browser.cloud_provider: local` + `browser.engine: lightpanda` (binary on `PATH`) |
| Your own browser (CDP) | `/browser connect`, `/browser connect ws://host:port`, `/browser status`, `/browser disconnect` (interactive CLI only); or `browser.cdp_url` / `BROWSER_CDP_URL` |
| Real profile | `browser.use_real_profile: true` (opt-in managed copy of your everyday profile) |
| Camofox | Plugin: `hermes plugins install camofox` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `browser.cloud_provider` | string | Active source written by `hermes tools` (`local`, `browserbase`, `browser-use`, `firecrawl`, `nous`; provider plugins add their own names); a selection is not switched by adding/removing keys |
| `browser.engine` | string | `auto` (Chromium, default) / `lightpanda`; lowest-precedence browser setting (a cloud provider, `browser.cdp_url` / `/browser connect`, or `browser.use_real_profile` all win) |
| `browser.executable_path` | string | Chromium binary; first in the lookup order |
| `browser.user_data_dir` | string | Persistent profile directory shared by every session; empty = isolated throwaway profile |
| `browser.chromium_args` | list | Extra Chromium command-line flags |
| `browser.headed` | bool | Visible window, default false; keeps browser open between turns; always headless on display-less hosts |
| `browser.command_timeout` | int | Chromium launch timeout floor in seconds, default 30 |
| `browser.inactivity_timeout` | int | Seconds before an idle browser is closed, default 120 |
| `browser.cdp_url` / `BROWSER_CDP_URL` | string | Persistent CDP endpoint; enables `browser_cdp` and `browser_dialog` |
| `browser.auto_local_for_private_urls` | bool | Default on; local Chromium sidecar for private/loopback/LAN URLs when a cloud provider is set |
| `security.allow_private_urls` / legacy `browser.allow_private_urls` | bool | Hands private URLs to the cloud provider when auto-routing is off (usually useless) |
| `browser.use_real_profile` | bool | Default false; snapshot your active browser profile under `~/.hermes/browser-profile/<browser>/` |
| `browser.real_profile_pin` | string | Pin snapshot source to a profile directory name (e.g. `"Profile 2"`); a missing pin yields a fresh browser plus a message naming it, never a silent fallback |
| `browser.real_profile_autoclose` | bool | Offer to close the browser holding the profile lock (always asks first) |
| `browser.dialog_policy` | string | `must_respond` (default) / `auto_dismiss` / `auto_accept` |
| `browser.dialog_timeout_s` | int | Safety auto-dismiss under `must_respond`, default 300 |
| `BROWSERBASE_PROXIES` | bool | Residential proxies, default true |
| `BROWSERBASE_ADVANCED_STEALTH` | bool | Default false; requires Scale Plan |
| `BROWSERBASE_KEEP_ALIVE` | bool | Default true; requires paid plan |
| `BROWSERBASE_SESSION_TIMEOUT` | seconds | Max 21600 (6 hours) |

## Tools

| Tool | Description |
|---|---|
| `browser_exec` | Navigate, read, click, type, scrape and screenshot by running Python with pre-imported helpers; params `code`, `timeout_s` (default 300, max 1800), `session` (own driver process and own browser per name), and `local` when the real-profile toggle is on |
| `browser_cdp` | One raw CDP command; offered only while a CDP endpoint is configured (`/browser connect`, `BROWSER_CDP_URL` or `browser.cdp_url`) |
| `browser_dialog` | Accept or dismiss a native JS dialog (`alert` / `confirm` / `prompt` / `beforeunload`): `action="accept"` or `"dismiss"`, `prompt_text`, `dialog_id` when several are queued; offered only while a CDP endpoint is configured |
| `browser_vault` | Fill saved logins, cards, addresses and 2FA codes without secrets entering the conversation: `action="list"` then `fill`, `save_login`, `enter_code` or `unlock` (1Password / Bitwarden); fills refused unless page origin matches the saved item |

`browser_exec` helpers:

| Helper | Does |
|---|---|
| `new_tab(url)` | Open a URL (first navigation) |
| `goto_url(url)` | Navigate the current tab |
| `wait_for_load()` | Wait for page load |
| `page_info()` | Summarize current page state |
| `js(expr)` | Evaluate JavaScript (wrap function bodies as `js('(() => {...})()')`) |
| `fill_input(selector, text)` | Type into an input |
| `click_at_xy(x, y)` | Click viewport coordinates |
| `capture_screenshot()` | Save a screenshot and print its path |
| `cdp('Domain.method', **kwargs)` | Raw CDP, e.g. `cdp('Accessibility.getFullAXTree')`, `cdp('DOM.getBoxModel', backendNodeId=n)` |
| `ensure_real_tab()` | Recover from a stale or internal tab |

```text
browser_cdp(method="Target.getTargets")
browser_cdp(method="Runtime.evaluate",
            params={"expression": "document.title", "returnByValue": true},
            target_id="<tabId>")
```

## Notes

- Disable browsing by turning off the `browser` toolset (there is no config switch): `hermes tools` -> untick Browser Automation, or `hermes tools disable browser` / `hermes tools disable browser --platform telegram`. `browser_exec` is only offered to sessions that also have the `terminal` toolset, because it executes model-written Python on the machine.
- Each `browser_exec` call starts a fresh Python interpreter: the browser session persists (tabs, cookies, current page) but Python variables do not; the per-session workspace `$BH_AGENT_WORKSPACE` (returned as `workspace`) survives between calls. The driver is browser-harness (engine of the Browser Use CLI), a regular Python dependency of Hermes, so every install including Desktop ships it. On a model with native vision, `capture_screenshot()` images are attached to the tool result; text-only models work text-first (`page_info()`, `js()`, `fill_input()`) or pass the path to `vision_analyze`.
- Local Chromium lookup order: `browser.executable_path`; the PM-installed Chromium (Chrome for Testing; installers and `hermes update` install it by default); `/etc/hermes/chromium-executable-path` in the official Docker image; a system `chromium` / `chromium-browser` on `PATH` (Android/Termux, unsupported platforms). On Linux it may also need system libraries (`npx playwright install-deps chromium` on Debian/Ubuntu); on Termux run `pkg install chromium` where available. Your installed Chrome is never touched (no `chrome://inspect` toggle, no "Allow remote debugging?" popup). The browser closes after `browser.inactivity_timeout`, at exit, and via an orphan sweep.
- Headed mode launches a visible window and skips the per-turn browser cleanup so login state stays warm; idle browsers are still reaped and all close on shutdown. It only affects local browsers.
- Private hosts: with a local terminal backend the local Chromium can open `localhost` and LAN addresses whatever `security.allow_private_urls` says. The private-address guard applies when the browser can reach networks the terminal can't (cloud provider, `/browser connect` endpoint, Docker/SSH/Modal terminal backend). Cloud-metadata URLs (`169.254.169.254`, `metadata.google.internal`) written in `browser_exec` code or in a URL a raw CDP call fetches are always refused; a page that redirects there on its own is not.
- Hybrid routing: with a cloud provider set, a local Chromium sidecar opens private/loopback/LAN URLs (on by default, not governed by `security.allow_private_urls`, so a hosted Hermes lets the agent browse that host's loopback services and LAN). Routing is decided from the URLs written in the `browser_exec` code; a public page that later redirects to a private address stays on the cloud browser. Disable auto-routing to refuse private URLs.
- Browserbase falls back by disabling `keepAlive`, then proxies, when the plan lacks paid features. Browser Use Cloud includes stealth, residential proxies, CAPTCHA solving and persistent profiles. Cloud sessions consume provider credits and are released when the conversation ends, after `browser.inactivity_timeout`, and on process exit.
- Lightpanda: Hermes launches `lightpanda serve --host 127.0.0.1 --port <free>` per `browser_exec` session (no Chromium or Node needed); shared HTTP cache at `$HERMES_HOME/cache/browser-use/lightpanda/http-cache` (cache flag only when Lightpanda 0.3.x+). No `capture_screenshot()`, one page per session (call `new_tab()` once, then `goto_url()`).
- Real-profile browsing copies only the active profile into a snapshot and never opens the live profile; turning the toggle off deletes `~/.hermes/browser-profile/`. If the profile can't be copied the agent gets a fresh browser without your logins and its first browser result says why (`real_profile_unavailable`): Windows first use with the browser not fully quit (after one successful copy, a later launch reuses it), a non-Chromium default browser or a missing pinned profile, or an unreadable/corrupt cookie database. On macOS/Linux a running Chrome write-locks `Login Data` / `Login Data For Account` / `Web Data` but `Cookies` still copies, so Hermes copies cookies and skips the locked password/autofill files. It is a consent-gated convenience, not an isolation boundary.
- For scheduled runs with real-profile browsing, set `enabled_toolsets=["browser", ...]` on the `cronjob` and save credentials ahead of time in the credential vault; unattended sessions cannot answer prompts. On Windows the first snapshot needs the browser fully quit; later ticks reuse the last snapshot, and with no snapshot yet the tick runs on a fresh, signed-out browser.
- Chrome 136+ ignores `--remote-debugging-port` on the default data directory; use a dedicated `--user-data-dir` (e.g. `$HOME/.hermes/chrome-debug`) for `/browser connect`. Chrome 144+ shows an "Allow remote debugging?" dialog for real-profile debugging.
- `/browser connect` is an interactive-CLI slash command and is not dispatched by gateway chats. When connected, all four browser tools drive your live browser. For Hermes in WSL2 controlling Windows Chrome, prefer `chrome-devtools-mcp` through MCP.
- `browser_dialog`: a persistent CDP supervisor (one WebSocket per task subscribed to Page/Runtime/Target events) detects dialogs. On Browserbase, whose CDP proxy auto-dismisses native dialogs, the supervisor injects an XHR-based override of `alert` / `confirm` / `prompt` via `Page.addScriptToEvaluateOnNewDocument` and fulfils it through `Fetch.enable` / `Fetch.fulfillRequest`.
- `browser_cdp` cross-origin iframes: pass the `frame_id` of an out-of-process iframe to route through the supervisor's live session; same-origin iframes use `document.querySelector('iframe').contentDocument` from a top-level `Runtime.evaluate`. Browser-level methods (`Target.*`, `Browser.*`, `Storage.*`) omit `target_id`; page-level methods need one from `Target.getTargets`.
- Bot Desktop screen: with the Bot Screen running, the bot's browser and the dock's Browser icon are the same headed Chromium with one persistent profile per bot.
- Limitations: cloud sessions expire per provider plan; cloud sessions consume credits (local Chromium and `/browser connect` are free); Lightpanda has no screenshots and one page per session; no terminal, no `browser_exec`.
- Prefer `web_search` / `web_extract` for simple retrieval; use the browser to interact (click, fill forms, dynamic content).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/browser (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Rewritten around `browser_exec`: the v0.22.2 built-in tools `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_scroll`, `browser_press`, `browser_back`, `browser_get_images`, `browser_vision`, `browser_console` are no longer documented, and `@e1`-style ref IDs / accessibility-tree snapshots are replaced by `page_info()`, `js()` and `cdp('Accessibility.getFullAXTree')`. `browser_vault` is new.
- Settings and env vars no longer documented in v0.23.1 (removal not confirmed): `browser.backend` (`"off"` / `"browser-use"`; `/browser use off`), `browser.snapshot_threshold`, `browser.restrict_evaluate`, `browser.record_sessions`, `AGENT_BROWSER_HEADED`, `AGENT_BROWSER_ENGINE`, `AGENT_BROWSER_ARGS` (-> `browser.chromium_args`), `BROWSER_INACTIVITY_TIMEOUT`, `hermes pm install agent-browser` (-> `hermes pm install chromium`). Use `browser.headed`, `browser.engine`, `browser.inactivity_timeout` instead.
- Camofox moved to a plugin (`hermes plugins install camofox`). Existing setups (`CAMOFOX_URL` set, or `browser.cloud_provider: camofox`) are migrated automatically on update: the plugin is installed and the core `browser` toolset is turned off in that profile; a profile that had disabled `browser` everywhere (`agent.disabled_toolsets`) gets `camofox` disabled too. A `browser.camofox` block with no `CAMOFOX_URL` is not a Camofox setup; a profile that sets up the plugin after the update keeps `browser_exec` alongside it. The Camofox config keys (`managed_persistence`, `user_id`, `session_key`, `adopt_existing_tab`, `rewrite_loopback_urls`) are no longer on this page.
- The browser tools are no longer available through the Codex app-server runtime's MCP callback (see Codex App-Server Runtime).
- Windows real-profile launch no longer requires the browser fully quit on every launch: only for the first copy.

## Related

- [Tool Gateway](./tool-gateway.md)
- [Computer Use](./computer-use.md)
- [Bot Screen](./bot-screen.md)
- [Credential Vault](./credential-vault.md)
- [Web Search](./web-search.md)
