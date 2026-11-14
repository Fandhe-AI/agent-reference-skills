# Guide: Hermes Plugin Setup

Use the `upstash-box` plugin for Hermes Agent (Nous Research) to run Hermes' terminal, code execution, and file tools in an Upstash Box while Hermes itself, your model calls, and your sessions stay on your machine.

## Signature / Usage

```bash
hermes plugins install upstash-box
hermes plugins enable upstash-box
```

```bash
hermes config set terminal.backend upstash_box
```

All settings are optional and go under `terminal:` in `~/.hermes/config.yaml`:

```yaml
terminal:
  backend: upstash_box
  container_persistent: true    # false: a new box per session, deleted when it ends
  upstash_box_size: small       # small | medium | large
  upstash_box_runtime: python   # node (default), python, golang, ruby, rust, ...
  upstash_box_name_prefix: hermes
```

Paused boxes count toward the plan's box limit; the plugin labels its boxes `hermes`:

```bash
box list --label hermes
box delete <box-id> --yes
```

## Options / Props

| Setting (under `terminal:`) | Description |
|------|-------------|
| `backend` | `upstash_box` to run terminal, `execute_code`, and file tools in a box |
| `container_persistent` | `true`: the box is paused when Hermes closes and resumed with files and installed tools; `false` gives a new box per session, deleted when it ends |
| `upstash_box_size` | `small`, `medium`, or `large` |
| `upstash_box_runtime` | `node` (default), `python`, `golang`, `ruby`, `rust`, ... Applies to boxes created after the change |
| `upstash_box_name_prefix` | Prefix for box names (example: `hermes`) |

## Notes

- Source: https://upstash.com/docs/box/guides/hermes-plugin-setup (fetched 2026-11-14; no version pin on the site).
- Needs Hermes Agent 0.22.3 or newer and an Upstash Box API key; the install asks for the key and saves it as `UPSTASH_BOX_API_KEY` in `~/.hermes/.env`
- Alternatively pick Upstash Box in `hermes setup terminal`; check with `hermes doctor`; restart Hermes (or quit and reopen Hermes Desktop) so it picks up the backend
- Try it by asking Hermes to run `uname -a and whoami`; the answer comes from the box as user `boxuser`, commands start in `/home/boxuser`, and the first command of a chat takes about 10-15 seconds while the box starts and Hermes skills are uploaded
- The default `node` image has Python but no `pip`; set `upstash_box_runtime: python` for Python work
- Each chat gets its own box and every Hermes Desktop chat gets its own box, so clean up paused boxes or set `container_persistent: false`
- What runs where: every command and every file the file tools read or write goes to the box; Hermes skills and cache are uploaded to `~/.hermes` in the box and changes are copied back when the session ends; with GitHub connected under Box, Settings, GitHub in the Upstash Console the box has your GitHub credentials so the agent can clone and push; the API key stays on your machine and is never sent into the box; Hermes skips its dangerous-command approval for commands in the box, as for its other cloud backends
- To run all of Hermes inside a box, including the agent, use the Hermes Setup guide instead

## Related

- [Guides: Hermes Setup](./guides-hermes-setup.md)
- [Shell](./shell.md)
- [Security](./security.md)
