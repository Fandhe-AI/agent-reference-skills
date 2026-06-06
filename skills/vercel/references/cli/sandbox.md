# vercel sandbox

Entry point for managing Vercel Sandbox from the CLI. Modeled on the Docker CLI.

## Signature / Usage

```bash
vercel sandbox list
vercel sandbox create --connect
vercel sandbox exec <sandbox-id> <command>
vercel sandbox connect <sandbox-id>
vercel sandbox stop <sandbox-id>
vercel sandbox remove <sandbox-id>
vercel sandbox snapshot <sandbox-id>
```

## Notes

- Full command surface documented at [Sandbox CLI Reference](https://vercel.com/docs/sandbox/cli-reference)
- Subcommands: `list`, `create`, `config`, `copy` / `cp`, `exec`, `connect` / `ssh`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, `logout`
- `stop` snapshots and suspends the sandbox (filesystem preserved, resumable)
- `remove` permanently deletes the sandbox including all snapshots and sessions

## Related

- [deploy.md](./deploy.md)
