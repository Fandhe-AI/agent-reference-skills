# Playwright CLI (playwright-cli)

`playwright-cli` is a command-line interface for browser automation designed for coding agents. It offers token-efficient browser control through concise commands and installable skills, avoiding large tool schemas and verbose accessibility trees in the model context.

## Signature / Usage

Prerequisites: Node.js 20 or newer and a coding agent (Claude Code, GitHub Copilot, or similar).

```bash
# global install
npm install -g @playwright/cli@latest
playwright-cli --help

# or as a local dependency
npm install -D @playwright/cli@latest
npx playwright cli --help

# install skills for coding agents (-g: into home directory, e.g. ~/.claude/skills,
# or ~/.agents/skills with --skills=agents)
playwright-cli install --skills
playwright-cli install --skills -g
```

Skills-less operation: point the agent at the CLI and let it discover commands.

```txt
Test the "add todo" flow on https://demo.playwright.dev/todomvc using playwright-cli.
Check playwright-cli --help for available commands.
```

Manual walkthrough (each command prints a snapshot of the page state):

```bash
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli check e21
playwright-cli screenshot
```

## Commands

Interacting with pages:

```bash
playwright-cli open [url]               # open browser, optionally navigate to url
playwright-cli goto <url>               # navigate to a url
playwright-cli click <ref> [button]     # click an element
playwright-cli type <text>              # type text into editable element
playwright-cli fill <ref> <text>        # fill text into editable element
playwright-cli select <ref> <value>     # select an option in a dropdown
playwright-cli check <ref>              # check a checkbox or radio button
playwright-cli uncheck <ref>            # uncheck a checkbox
playwright-cli hover <ref>              # hover over element
playwright-cli drag <startRef> <endRef> # drag and drop between elements
playwright-cli upload <files...>        # upload one or multiple files
playwright-cli close                    # close the page
```

Targeting elements (snapshot refs, CSS, or role selectors):

```bash
playwright-cli snapshot                 # get snapshot with element refs
playwright-cli click e15                # click using a ref
playwright-cli click "#main > button.submit"
playwright-cli click "role=button[name=Submit]"
playwright-cli click "#footer >> role=button[name=Submit]"
```

Screenshots, navigation, keyboard and mouse:

```bash
playwright-cli snapshot --filename=f    # save snapshot to specific file
playwright-cli screenshot [ref]         # screenshot of page or a specific element
playwright-cli screenshot --filename=f  # save with specific filename
playwright-cli screenshot --hires       # capture using device pixels
playwright-cli pdf                      # save page as PDF
playwright-cli go-back                  # go back
playwright-cli go-forward               # go forward
playwright-cli reload                   # reload the page
playwright-cli press <key>              # press a key (e.g. Enter, ArrowLeft)
playwright-cli keydown <key>            # key down
playwright-cli keyup <key>              # key up
playwright-cli mousemove <x> <y>        # move mouse
playwright-cli mousedown [button]       # mouse button down
playwright-cli mouseup [button]         # mouse button up
playwright-cli mousewheel <dx> <dy>     # scroll
```

Tabs and network:

```bash
playwright-cli tab-list                 # list all tabs
playwright-cli tab-new [url]            # create a new tab
playwright-cli tab-select <index>       # select a tab
playwright-cli tab-close [index]        # close a tab
playwright-cli requests                 # list network requests since page load
playwright-cli request <num>            # show full details of a single request
playwright-cli route <pattern> [opts]   # mock network requests
playwright-cli route-list               # list active routes
playwright-cli unroute [pattern]        # remove routes
```

Storage:

```bash
playwright-cli state-save [filename]    # save storage state (cookies, localStorage)
playwright-cli state-load <filename>    # load storage state
playwright-cli cookie-list [--domain]   # list cookies
playwright-cli cookie-get <name>        # get a cookie
playwright-cli cookie-set <name> <val>  # set a cookie
playwright-cli cookie-delete <name>     # delete a cookie
playwright-cli cookie-clear             # clear all cookies
playwright-cli localstorage-list        # list entries
playwright-cli localstorage-get <key>   # get value
playwright-cli localstorage-set <k> <v> # set value
playwright-cli localstorage-delete <k>  # delete entry
playwright-cli localstorage-clear       # clear all
```

DevTools and WebMCP:

```bash
playwright-cli console [min-level]      # list console messages
playwright-cli eval <func> [ref]        # evaluate JavaScript on page
playwright-cli run-code <code>          # run Playwright code snippet
playwright-cli tracing-start            # start trace recording
playwright-cli tracing-stop             # stop trace recording
playwright-cli video-start              # start video recording
playwright-cli video-chapter <title>    # add chapter marker to video
playwright-cli video-stop --filename=f  # stop video recording
playwright-cli webmcp-list                       # list tools registered by the page
playwright-cli webmcp-call <name> [--params]     # call one, passing a JSON object
```

## Sessions

```bash
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent
playwright-cli list                     # list all sessions
playwright-cli close-all                # close all browsers
playwright-cli kill-all                 # forcefully kill all browser processes
playwright-cli -s=name delete-data      # delete user data for a named session
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

Monitoring dashboard:

```bash
playwright-cli show
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--headed` | flag | Show the browser (default is headless). |
| `--browser=<name>` | string | `chrome`, `firefox`, `webkit`, or `msedge`. |
| `--persistent` | flag | Save the browser profile to disk (default is in-memory). |
| `-s=<name>` | string | Named session. |
| `PLAYWRIGHT_CLI_SESSION` | env var | Session name used by default. |
| `--config <path>` | path | JSON config file; `.playwright/cli.config.json` is loaded automatically if present. |
| `open --idle-timeout=<ms>` | number | Idle timeout for headless sessions; `0` disables. Also `timeouts.idle` in the config file. |
| `attach --extension` | flag | Connect to existing browser tabs (requires the Playwright Extension). |

## Notes

- Choose `playwright-cli` for coding agents favoring token-efficient, skill-based workflows; choose MCP for agentic loops that benefit from persistent state and iterative reasoning over page structure.
- A headless session shuts itself down after an hour without commands. Headed and attached browsers are never closed automatically.
- The browser profile is kept in memory by default; cookies and storage persist between calls within a session but are lost when the browser closes (use `--persistent`).
- `playwright-cli show` opens a dashboard with a session grid (live screencast previews grouped by workspace) and a session detail view with remote control (click the viewport to take over, Escape to release).
- WebMCP tool names, descriptions, schemas and results come from the page; treat them as untrusted input.
- Playwright bundles `playwright-cli`, runnable as `npx playwright cli` (v1.62). Not to be confused with the `npx playwright` test-runner CLI.
- Source: https://playwright.dev/docs/getting-started-cli (microsoft/playwright v1.64.1 `docs/src/getting-started-cli.md`)

## Related

- [Playwright MCP](./mcp.md)
- [Playwright CLI](./cli.md)
- [Playwright Test Agents](./test-agents.md)
