# vercel upgrade

Upgrade the Vercel CLI to the latest version and manage automatic updates.

## Signature / Usage

```bash
vercel upgrade
vercel upgrade --dry-run
vercel upgrade --enable-auto
vercel upgrade --disable-auto
vercel upgrade --format=json
```

## Options / Props

| Name | Description |
|------|-------------|
| `--dry-run` | Print the upgrade command that would run without running it |
| `--enable-auto` | Enable automatic CLI updates |
| `--disable-auto` | Disable automatic CLI updates |
| `--format json` | Emit the upgrade plan as JSON; implies `--dry-run` |

## Notes

- Detects the package manager used to install the CLI and runs the matching upgrade command
- Falls back to `npm i -g vercel@latest` if the package manager can't be inferred

## Related

- [overview.md](./overview.md)
