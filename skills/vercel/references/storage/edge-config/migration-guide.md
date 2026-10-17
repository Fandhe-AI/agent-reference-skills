# Migrating from Edge Config to Global Config

Edge Config is now **Global Config**, a globally replicated data store for configuration that applications read at runtime (feature flags, redirects, experimentation settings). The store itself is unchanged.

## Signature / Usage

```bash
npm i @vercel/global-config
```

```diff
- import { get } from '@vercel/edge-config';
+ import { get } from '@vercel/global-config';
```

`@vercel/global-config` is a drop-in replacement for `@vercel/edge-config`. Other package managers: `pnpm i`, `yarn add`, `bun add`.

## What changed

| Area | Before | Now |
| --- | --- | --- |
| Domain | `https://edge-config.vercel.com` | `https://global-config.vercel.com` |
| REST API | `api.vercel.com/v1/edge-config` | `api.vercel.com/v1/global-config` |
| SDK package | `@vercel/edge-config` | `@vercel/global-config` |
| Default environment variable | `EDGE_CONFIG` | `GLOBAL_CONFIG` |
| CLI command | `vercel edge-config` | `vercel global-config` |
| Dashboard | Storage tab shows Edge Config | Storage tab shows Global Config, everything else is unchanged |
| Documentation | `/docs/edge-config` | `/docs/global-config`, old URLs redirect |
| Limits | Plan-based caps | Raised on every plan |

## New limits

| Limit | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| Stores | 1 (unchanged) | Unlimited (was 3) | Unlimited (was 10) |
| Writes | 250 per month (unchanged) | 100 per hour (was 480 per day) | 100 per hour (was 480 per day) |
| Store size | 1 MB (was 8 KB) | 1 MB (was 64 KB) | 1 MB (was 512 KB) |

## Notes

- The old connection string, API path, package, `vercel edge-config` CLI command, and `EDGE_CONFIG` environment variable all continue to work. There is no timeline for when they will be removed.
- Existing projects: no action required. Deployments, connected stores, and the `EDGE_CONFIG` environment variable continue to work.
- Upgrading proactively is safe: the new SDK reads `GLOBAL_CONFIG` by default and falls back to `EDGE_CONFIG`, so it works with stores connected before and after the rename.
- Creating stores and pushing new config values work without upgrading the SDK.
- Upgrade before connecting new stores to a project. Connecting a store now creates a `GLOBAL_CONFIG` environment variable, and the legacy SDK only reads `EDGE_CONFIG` by default, so a project still on `@vercel/edge-config` cannot read a newly connected store.
- Custom environment variable names read with `createClient`: both packages continue to work with the existing setup.
- REST API: new integrations should use `api.vercel.com/v1/global-config`; `api.vercel.com/v1/edge-config` continues to work.
- Connection strings: stores connected from now on receive `global-config.vercel.com` connection strings; existing `edge-config.vercel.com` ones remain valid.
- The hourly write limit allows up to 2,400 writes per day. The per-project connection limit is unchanged: 1 on Hobby, 3 on Pro and Enterprise. Pricing is unchanged.
- Source: https://vercel.com/docs/global-config/migration-guide (fetched 2026-10-16)

## Related

- [Overview](./overview.md)
- [Limits and Pricing](./limits.md)
- [Using Edge Config](./using-edge-config.md)
- [@vercel/edge-config SDK](./edge-config-sdk.md)
