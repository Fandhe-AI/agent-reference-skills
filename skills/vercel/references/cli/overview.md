# Vercel CLI Overview

Command-line interface for managing Vercel Projects, deployments, domains, environment variables, and more from a terminal.

## Signature / Usage

```bash
# Install
npm i -g vercel
pnpm i -g vercel
yarn global add vercel
bun add -g vercel

# Update
pnpm i -g vercel@latest

# Check version
vercel --version

# Opt into experimental native binary
vercel upgrade --enable-binary

# CI/CD authentication
export VERCEL_TOKEN=<token>
vercel deploy
```

## Notes

- Default command (no subcommand) is `vercel deploy`
- CI/CD: set `VERCEL_TOKEN` env var or pass `--token`
- Experimental native binaries ship in the standard `vercel` package as optional dependencies (still needs Node.js for the launcher); enable with `vercel upgrade --enable-binary`, disable with `vercel upgrade --disable-binary`. The CLI banner shows `(native)` when running the native binary
- macOS uses the installed native binary by default unless you opt out. Linux packages target glibc; on musl hosts (e.g. Alpine) the launcher looks for a musl package and falls back to Node.js if missing. A missing native package falls back to Node.js; a failure after native execution starts does not retry with Node.js
- If native package is missing because optional dependencies were omitted, reinstall with optional dependencies (e.g. `npm install --global vercel@latest --include=optional`)
- Migrating from legacy `@vercel/vc-native`: remove it (e.g. `pnpm remove -g @vercel/vc-native`), install `vercel@latest`, then `vercel upgrade --enable-binary`. Package-manager upgrades now update `vercel`, not the legacy `@vercel/vc-native` wrapper
- Commands listed in the CLI overview (docs last_updated 2026-10-07) include newer ones: `comments` (beta), `pricing`, `security`, `setup`, `signup`; also `crons` (beta), `deploy-hooks`, `global-config` (`vercel edge-config` still works as alias), `tokens`, `skills`
- If you don't have an account, `vercel signup` creates one; `vercel login` for existing accounts
- `vc` is an alias for `vercel`

## Related

- [global-options.md](./global-options.md)
- [deploy.md](./deploy.md)
- [login.md](./login.md)
- [link.md](./link.md)
