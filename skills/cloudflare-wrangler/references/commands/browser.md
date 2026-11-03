---
source: https://developers.cloudflare.com/workers/wrangler/commands/browser/
---

# Browser

Interact with the Browser Run service using Wrangler.

## Signature / Usage

```sh
npx wrangler browser create
npx wrangler browser close <SESSIONID>
npx wrangler browser list
npx wrangler browser view [SESSIONID]
```

## Options / Props

### `browser create`

Create a new Browser Run session

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--lab` | boolean | false | Enable lab browser session with experimental Chrome features (e.g., WebMCP) |
| `--keepAlive` | number | — | Keep-alive duration in seconds (60-600). Alias: `--k` |
| `--json` | boolean | false | Return session info as JSON |
| `--open` | boolean | — | Open DevTools in browser (default: true in interactive mode) |

### `browser close`

Close a Browser Run session

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<SESSIONID>` | string (required) | — | The session ID to close |
| `--json` | boolean | false | Return result as JSON |

### `browser list`

List active Browser Run sessions

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | boolean | false | Return output as JSON |

### `browser view`

View a live browser session

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `[SESSIONID]` | string | — | The session ID to inspect (optional if only one session exists) |
| `--target` | string | — | Target selector (matches id exactly, or url/title by substring) |
| `--json` | boolean | false | Return live browser session URL(s) as JSON |
| `--open` | boolean | — | Open in browser (default: true in interactive mode) |

## Notes

- Each command also accepts the global flags; see the global flags page.
- Browser Run product behavior (Puppeteer / Playwright / binding API) is outside this skill; the Browser binding belongs to the cloudflare-workers skill.

## Related

- [Global flags](./global-flags.md)
- [Commands overview](./overview.md)
