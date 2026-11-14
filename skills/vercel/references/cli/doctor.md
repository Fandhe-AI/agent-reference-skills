# vercel doctor

Check your Vercel CLI setup: version, install, login, team, project link, `vercel.json`, and Vercel status.

## Signature / Usage

```bash
vercel doctor
vercel doctor --json
vercel doctor --json | jq -r '.checks[] | select(.status == "failed") | .id'
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Print results as JSON: each check has `id`, `status`, `message`, and the `next` commands that fix it; `summary` counts checks by status |

Checks:

| Check | What it checks |
|-------|----------------|
| CLI version | Whether a newer version of Vercel CLI is available |
| CLI install | How the CLI was installed, and whether `vercel upgrade` can update it |
| Installs on PATH | Whether `PATH` has more than one Vercel CLI install (`vercel` runs the first one) |
| Login | Whether you are logged in and the token is valid |
| Team | Which team commands use, and whether you can access it |
| Project | Whether the current directory is linked to a project that still exists |
| vercel.json | Whether the `vercel.json` in the current directory is valid |
| Vercel status | Whether the Vercel status page reports active incidents |

## Notes

- Each check reports OK, Warning, Failed, or Skipped. A check that needs a login is skipped and says why. When the directory is not linked, Project reports Warning and suggests `vercel link`. Next steps list the exact command for each problem that has one
- The command exits with code `0` when the checks run, even if some of them fail
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`
- Source: https://vercel.com/docs/cli/doctor (fetched 2026-11-14)

## Related

- [upgrade.md](./upgrade.md)
- [link.md](./link.md)
- [login.md](./login.md)
