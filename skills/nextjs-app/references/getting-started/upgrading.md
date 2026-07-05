# Upgrading

Upgrade a Next.js application to the latest version or canary.

## Signature / Usage

```bash
# Latest version (Next.js 16.1.0+)
npx next upgrade
```

```bash
# Manual upgrade
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
# Canary version
npm i next@canary
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `next upgrade` | CLI command | Upgrades to the latest Next.js version (Next.js 16.1.0+ only) |
| `@next/codemod@canary upgrade latest` | CLI command | Upgrade command for versions before 16.1.0 |
| `next@canary` | package version | Latest canary build; upgrade to latest stable first |

## Notes

- Canary includes experimental features ahead of stable, e.g. `forbidden`/`unauthorized` functions and file conventions, `authInterrupts` config
- Version-specific upgrade guides exist for Version 16, 15, and 14 with detailed migration steps and codemods

## Related

- [deploying](./deploying.md)
- [installation](./installation.md)
