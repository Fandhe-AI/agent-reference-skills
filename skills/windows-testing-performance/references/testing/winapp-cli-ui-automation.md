# winapp CLI: UI Automation

`winapp ui` is a command-line tool (2026) that inspects and interacts with running Windows app UIs from the terminal, built on Windows UI Automation (UIA). It works with WPF, WinForms, Win32, WinUI 3, Electron (limited), and Flutter (basic) — no test project or SDK reference needed. Most commands drive the app through UIA patterns and are headless/locked-session friendly; a few (`click`, `hover`, `drag`, `touch`, `pen`, `scroll --wheel`, `send-keys --via send-input`) inject real OS-level input and require an unlocked, interactive desktop.

## Signature / Usage

```bash
# Inspect the UI tree, then act on an element by its printed selector
winapp ui inspect -a notepad
winapp ui search Button -a notepad
winapp ui invoke Close -a notepad
winapp ui screenshot -a notepad

# CI assertion: wait-for exits 0 on match, 1 on timeout
winapp ui invoke "Login" -a $appPid
winapp ui wait-for "Dashboard" -a $appPid --timeout 10000
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `-a <name\|pid\|title>` | targeting | Target by process name (partial match), window title (partial match), or PID; lists candidates with HWNDs when ambiguous |
| `-w <hwnd>` | targeting | Target a specific window by HWND — stable across tab/title changes; discover via `list-windows` |
| `inspect` | command | Print the element tree; `--depth N`, `--interactive` (invokable elements only), `--ancestors <sel>`, `--hide-disabled`, `--hide-offscreen` |
| `search <text\|selector>` | command | Find matching elements; non-invokable results (e.g. a `TextBlock`) surface the nearest invokable ancestor to `invoke` |
| `invoke <selector>` | command | Activate an element; tries `InvokePattern` → `TogglePattern` → `SelectionItemPattern` → `ExpandCollapsePattern` in order |
| `click <selector>` | command | Mouse-simulated click at the element's coordinates for controls without `InvokePattern` (e.g. column headers); `--double`, `--right` |
| `wait-for <selector>` | command | Poll for an element to appear/disappear or reach a value; `--timeout`, `--gone`, `--value`, `--property`, `--contains` — **exit 0 on match, exit 1 on timeout**, making it a CI-friendly assertion |
| `screenshot [selector]` | command | Capture PNG via Windows.Graphics.Capture (falls back to PrintWindow); `--output`, `--capture-screen` (include popups/overlays), `--focus` |
| `set-value <selector> <value>` | command | Programmatic write via ValuePattern → RangeValuePattern → LegacyIAccessible fallback chain; no keystrokes |
| `get-value <selector>` | command | Read current value via TextPattern → ValuePattern → SelectionPattern → Name fallback chain |
| `send-keys <keys>` | command | Synthesize keyboard input; `--target <selector>`, `--via post-message\|send-input`, `--verbatim` |
| `--json` | flag | Structured output; `search`/`wait-for` write a parseable envelope to stdout even on no-match/timeout (exit code still signals success/failure) |

## Notes

- **Selectors**: an **AutomationId** (e.g. `MinimizeButton`) is shown directly when unique in the tree and is the most stable form (survives layout/localization changes). A **semantic slug** (e.g. `btn-close-d1a0`, format `prefix-normalizedname-hash`) is generated when no unique AutomationId exists; the hash detects staleness ("Element may have changed. Re-run inspect."). Plain text also works as a case-insensitive substring search against Name/AutomationId.
- Input-injecting verbs (`click`, `hover`, `drag`, `touch`, `pen`, `scroll --wheel`, `send-keys --via send-input`) need the target window in the foreground on an unlocked desktop; they fail fast with `no_interactive_desktop` on a locked/secure desktop rather than silently no-opping.
- In CI (GitHub Actions, Azure Pipelines), launch with `winapp run --detach --json` to capture the PID, then chain `invoke` / `wait-for` / `screenshot` calls — each `wait-for` acts as an assertion via its exit code. Use `;` rather than `&&` to chain PowerShell commands (`&&` can deadlock on ANSI/stderr output from native CLIs).
- This is distinct from **WinAppDriver/Appium** (`ui-testing-winappdriver.md`), which is a Selenium/WebDriver-protocol service; `winapp ui` is a direct CLI with no server/session model.

## Related

- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)
- [winapp CLI: Package-Identity Debugging](./winapp-cli-debugging.md)
- [Running Windows App Tests in CI](./ci-testing.md)
