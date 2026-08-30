---
source: https://orm.drizzle.team/docs/seed-versioning
---

# Versioning

`drizzle-seed` versions its generator outputs (separate from the npm package version) so that upgrading the package for new features doesn't silently change previously-generated deterministic data unless opted into.

## Signature / Usage

```ts
// pin generators to a specific api version while using the latest package
await seed(db, schema, { version: '2' });
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `version` (seed option) | `string` (`'1' \| '2' \| '3' \| '4'`) | Max generator API version to use; omit to use the latest |

## Notes

- History: `v1` (npm `0.1.1`, initial) → `v2` (npm `0.2.1`, changed `string()` and `interval({ isUnique: true })`) → `v3` (npm `0.4.0`, changed hash generating function for cross-runtime determinism) → `v4` / LTS (npm `1.0.0-beta.8`, changed `uuid` for Zod v4 UUID validation compatibility).
- Each generator can independently be at a different version internally (e.g. `firstName` at v3 while `lastName` stays at v2) depending on when each was last changed; `{ version: 'N' }` caps all generators at API version N or below.
- Version 2: unique `interval` generator previously could produce equivalent-but-distinct intervals (e.g. `1 minute 60 seconds` vs `2 minutes 0 seconds`) that caused unique-constraint errors after DB-side normalization; affected schemas using a unique `interval` column.
- Version 3: hash generating function changed to be deterministic across Node.js/Bun versions; all generators produce different output than v1/v2 for the same seed.
- Version 4: `uuid` generator changed because old output failed Zod's v4 UUID validation when used together with `drizzle-zod`'s `createSelectSchema`.
- Transcribed from `pg/seed-versioning.mdx` (dialect-specific source path; `source:` above uses the dialect-less rendered URL). The `mysql/seed-versioning.mdx` variant was also checked and differs only in the target database named in the Version 2 rationale (MySQL vs PostgreSQL) and the dialect of the code examples — the generator history and rationale are otherwise identical.

## Related

- [seed-overview](./seed-overview.md)
- [seed-functions](./seed-functions.md)
