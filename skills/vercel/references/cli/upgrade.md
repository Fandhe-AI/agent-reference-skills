# vercel upgrade

Upgrade the Vercel CLI to the latest version and manage automatic updates.

## Signature / Usage

```bash
vercel upgrade
vercel upgrade --dry-run
vercel upgrade --enable-auto
vercel upgrade --disable-auto
vercel upgrade --format=json
vercel upgrade --enable-binary
vercel upgrade --disable-binary
```

## Options / Props

| Name | Description |
|------|-------------|
| `--dry-run` | Print the upgrade command that would run without running it |
| `--enable-binary` | Opt a package-manager installation into its installed experimental native binary (saves a runtime preference; does not install a separate package) |
| `--disable-binary` | Disable native execution and return to Node.js execution; handled by the Node.js launcher even if the native binary can't start |
| `--enable-auto` | Enable automatic CLI updates |
| `--disable-auto` | Disable automatic CLI updates |
| `--format json` | Emit the upgrade plan as JSON; implies `--dry-run` |

## Notes

- Detects the package manager used to install the CLI and runs the matching upgrade command
- Falls back to `npm i -g vercel@latest` if the package manager can't be inferred
- Package-manager upgrades update the `vercel` package (Node.js or native execution), not the legacy `@vercel/vc-native` wrapper; if you installed `@vercel/vc-native` directly, migrate to `vercel` first (see overview.md)
- If `vercel upgrade` can't detect a supported global package-manager installation it exits with an error; update with the package manager that installed it. Use `--dry-run` to inspect the command
- Keep optional dependencies enabled when installing `vercel` so the native package is available. If `VERCEL_CLI_USE_NATIVE_BINARY=1` or `true` is set, remove it so the saved `--disable-binary` opt-out takes effect

## Related

- [overview.md](./overview.md)
