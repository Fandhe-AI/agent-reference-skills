# Guide: Pi Setup

Use [Pi](https://pi.dev) with the [`@upstash/box-pi`](https://www.npmjs.com/package/@upstash/box-pi) extension, which runs every tool call (`bash`, file I/O, search) inside an Upstash Box while Pi itself and model API keys stay on the local machine — only tool execution happens remotely.

## Signature / Usage

```bash
npm install -g @earendil-works/pi-coding-agent
pi install npm:@upstash/box-pi

export UPSTASH_BOX_API_KEY="box_xxxxxxxxxxxxxxxxxxxxxxxx"

cd my-project
pi --box
# or: pi --box --repo github.com/acme/api --branch dev
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--box` | Run tools inside an Upstash Box sandbox |
| `--repo <url>` | Git repo to clone into the box (defaults to the repo you're in) |
| `--branch <name>` | Branch to clone (defaults to your current branch) |
| `--runtime <name>` | Box runtime image: `node`, `python`, `golang`, `ruby`, `rust` (append `-alpine` for musl) |
| `--size <name>` | Box size: `small` (default), `medium`, `large` |

Slash commands: `/sandbox` (box status/branch link), `/github` (open the session branch), `/compare`, `/merge`, `/pr`.

## Notes

- The repo is cloned **from GitHub** into the box — the box never sees local files, so the repo must exist on github.com and any needed content must be committed and pushed first
- With `gh auth login` on a github.com repo, each session gets its own `pi/<short-session-id>` branch, auto-pushed after each turn
- `preview_url` tool returns a live, basic-auth-protected URL for any port the agent starts a server on
- Session lifecycle mirrors the box: resuming reattaches the box, idle auto-pauses (filesystem preserved), deleting a session deletes its box
- This is the inverse of running Pi *inside* a box as a custom harness — here Pi runs locally and only its tools execute remotely

## Related

- [Quickstart](./quickstart.md)
- [Git](./git.md)
