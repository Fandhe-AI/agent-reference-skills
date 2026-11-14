# vercel upgrade

Upgrade the Vercel CLI to the latest version and manage automatic updates.

## Signature / Usage

```bash
vercel upgrade
vercel upgrade --dry-run
vercel upgrade --autoupdate
vercel upgrade --no-autoupdate
vercel upgrade --json
vercel upgrade 59.11.7
vercel upgrade latest
vercel upgrade --bypass-min-release-age
vercel upgrade --no-bypass-min-release-age
vercel upgrade --enable-binary
vercel upgrade --disable-binary
```

## Options / Props

| Name | Description |
|------|-------------|
| `--dry-run` | Print the upgrade command that would run without running it |
| `--enable-binary` | Opt a package-manager installation into its installed experimental native binary (saves a runtime preference; does not install a separate package) |
| `--disable-binary` | Disable native execution and return to Node.js execution; handled by the Node.js launcher even if the native binary can't start |
| `--autoupdate` | Enable automatic CLI updates for future releases (changes the setting only; no upgrade runs) |
| `--no-autoupdate` | Disable automatic CLI updates (changes the setting only) |
| `--json` | Emit the upgrade plan as JSON; implies `--dry-run`, no upgrade is performed |
| `--bypass-min-release-age` | Skip the package manager's minimum release-age check and install the newest release. npm and pnpm only; remembered for later manual upgrades (automatic updates always follow package manager settings) |
| `--no-bypass-min-release-age` | Turn the minimum release-age check back on (changes the setting only) |
| `[version]` | `vercel upgrade 59.11.7` installs an exact full `major.minor.patch` version; `vercel upgrade latest` installs the newest release your package manager's settings allow |

## Notes

- Detects the package manager used to install the CLI and runs the matching upgrade command
- Package-manager upgrades update the `vercel` package (Node.js or native execution), not the legacy `@vercel/vc-native` wrapper; if you installed `@vercel/vc-native` directly, migrate to `vercel` first (see overview.md)
- If `vercel upgrade` can't detect a supported global package-manager installation it exits with an error; update with the package manager that installed it. Use `--dry-run` to inspect the command
- Keep optional dependencies enabled when installing `vercel` so the native package is available. If `VERCEL_CLI_USE_NATIVE_BINARY=1` or `true` is set, remove it so the saved `--disable-binary` opt-out takes effect

- If npm/pnpm minimum release age blocks the newest release, `vercel upgrade` does not install it and offers two options: keep the check (`vercel upgrade latest`) or skip it (`--bypass-min-release-age`).
- Earlier docs listed `--enable-auto`, `--disable-auto`, and `--format json`; the current official page documents `--autoupdate`, `--no-autoupdate`, and `--json`. `--enable-binary` / `--disable-binary` are not mentioned on the current page (not confirmed).
- Source: https://vercel.com/docs/cli/upgrade (fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
