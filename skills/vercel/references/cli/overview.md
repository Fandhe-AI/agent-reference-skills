# Vercel CLI Overview

Command-line interface for managing Vercel Projects, deployments, domains, environment variables, and more from a terminal.

## Signature / Usage

```bash
# Install
npm i -g vercel
pnpm i -g vercel
yarn global add vercel
bun i -g vercel

# Update
npm i vercel@latest

# Check version
vercel --version

# CI/CD authentication
export VERCEL_TOKEN=<token>
vercel deploy
```

## Notes

- Default command (no subcommand) is `vercel deploy`
- CI/CD: set `VERCEL_TOKEN` env var or pass `--token`
- Native binaries available via `@vercel/vc-native` (experimental)
- `vc` is an alias for `vercel`

## Related

- [global-options.md](./global-options.md)
- [deploy.md](./deploy.md)
- [login.md](./login.md)
- [link.md](./link.md)
