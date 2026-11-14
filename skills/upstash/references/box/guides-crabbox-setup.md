# Guide: Running Tests with Crabbox

[Crabbox](https://crabbox.sh) is a CLI that runs commands inside a remote box from your local machine — run a test suite in a clean cloud environment without touching your local setup.

## Signature / Usage

```bash
brew install openclaw/tap/crabbox

export UPSTASH_BOX_API_KEY=your_api_key_here

crabbox warmup --provider upstash-box --upstash-box-runtime node --upstash-box-size small

crabbox run --provider upstash-box --id <box-id> -- pnpm test
```

## Options / Props

| Flag | Description | Values |
|------|-------------|--------|
| `--upstash-box-runtime` | Runtime environment | `node`, `python`, `golang`, `ruby`, `rust` (or `-alpine` variants) |
| `--upstash-box-size` | Box size | `small`, `medium`, `large` |
| `--upstash-box-workdir` | Working directory inside the box | Any path (default: `/workspace/home/crabbox`) |
| `--upstash-box-keep-alive` | Keep the box up and running at all times | `true` / `false` |

## Notes

- Source: https://upstash.com/docs/box/guides/crabbox-setup (fetched 2026-11-14; no version pin on the site).
- The page is listed in `llms.txt` again as of 2026-11-14 (the earlier copy of this page noted it had been removed and redirected to Remote Development)
- `warmup` provisions the box ahead of time so it's ready when needed
- The official page (2026-11-14) runs tests with `--id <box-id>` from the `warmup` output (`box=<box-id>`); a flag `--env-from-profile` that an earlier copy of this page showed is not in the current official guide, see the Crabbox provider reference
- Works with any package manager or test runner (`npm test`, `bun test`, etc.)
- Crabbox is a third-party CLI (not an Upstash package); see the [Upstash Box provider reference](https://crabbox.sh/providers/upstash-box.html) for the full command list

## Related

- [Quickstart](./quickstart.md)
- [Guides: Remote Development Environment for AI Coding Agents](./guides-remote-development.md)
- [Guides: Build a Code Review Agent](./guides-code-review-agent.md)
