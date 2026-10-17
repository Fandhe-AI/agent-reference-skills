# Guide: Herdr Coding Agents in Isolated Cloud Sandboxes

The Upstash Box plugin for Herdr (terminal workspace manager for coding agents) runs your agent in a box: it uploads a Git worktree, opens the agent in a new pane, and brings changes back as a reviewed patch via Apply changes.

## Signature / Usage

```bash
herdr plugin install upstash/herdr-upstash-box
herdr plugin action invoke setup --plugin upstash.box
herdr plugin action invoke start-agent --plugin upstash.box
```

Bind to a key:

```toml
[[keys.command]]
key = "prefix+shift+u"
command = "herdr plugin action invoke start-agent --plugin upstash.box"
```

## Options / Props

| Action (`herdr plugin action invoke <action> --plugin upstash.box`) | Description |
|---|---|
| `setup` | Popup for Box API key, agent, and provider credential |
| `start-agent` / `start-claude` / `start-codex` / `start-opencode` | Upload worktree to a new box and open the agent (the latter three override the configured agent for one launch) |
| `reconnect` | Reattach to the agent, resuming the box if paused |
| `apply-changes` | Export agent changes as a Git patch, check against the worktree, apply after approval |
| `info` / `stop` | Box status and paths / end session and keep the box |
| `pause` / `resume` / `snapshot` / `previews` / `delete-box` / `dashboard` | Box management; `previews` exposes a port with a public URL |

Settings `excludedPaths` and `allowSensitivePaths` control the upload filter (config dir: `herdr plugin config-dir upstash.box`; full list in the plugin README).

## Notes

- Source: https://upstash.com/docs/box/guides/herdr-setup (fetched 2026-10-17; no version pin on the site).
- Needs Herdr 0.8.0 or newer and Node.js 22 or newer
- Credentials and `.env` files are left out of the upload, with every excluded file shown with its reason first
- Local files are never edited directly; changes return only through Apply changes
- Upload caps: 100 MiB total and 10 MiB per file (Box rejects anything over 100 MB, so raising `maxUploadBytes` does not help); exclude heavy directories, e.g. `{ "excludedPaths": ["img", "public/video"] }`
- One box per worktree by default; a second Start is refused (reconnect or delete from the dashboard). Delete boxes from the dashboard, not the console, so the plugin forgets them
- Claude Code `401 OAuth access token is invalid`: run setup, press `r` at the credential prompt, then stop and reconnect
- Plugin source: https://github.com/upstash/herdr-upstash-box

## Related

- [Live Sessions](./live-sessions.md)
- [Snapshots](./snapshots.md)
- [Public URLs](./preview.md)
