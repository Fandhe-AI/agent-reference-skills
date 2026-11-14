# vercel sandbox

Entry point for managing Vercel Sandbox from the CLI. Modeled on the Docker CLI.

## Signature / Usage

```bash
vercel sandbox list
vercel sandbox list --all
vercel sandbox create --connect
vercel sandbox exec <sandbox-id> <command>
vercel sandbox connect <sandbox-id>
vercel sandbox stop <sandbox-id>
vercel sandbox remove <sandbox-id>
vercel sandbox snapshot <sandbox-id>
```

## Notes

- Full command surface documented at [Sandbox CLI Reference](https://vercel.com/docs/sandbox/cli-reference)
- Subcommands: `list`, `create`, `config`, `copy`, `exec`, `connect`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, `logout`
- `vercel sandbox list` shows running sandboxes; add `--all` to include stopped sandboxes
- `stop` stops the current session of a persistent sandbox (filesystem is snapshotted and can be resumed)
- `remove` permanently deletes the sandbox along with its sessions; its snapshots are kept until they expire or you delete them
- Source: https://vercel.com/docs/cli/sandbox (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
