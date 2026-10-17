---
source: https://zod.dev/v4/versioning
---

# Zod 4 Versioning

Versioning strategy for Zod 4: subpath versioning (`"zod/v4"`) used during the transition, and the root `"zod"` export now pointing at Zod 4 since `zod@4.0.0`.

## Signature / Usage

```sh
npm install zod@^4.0.0
```

Optional import rewrites after upgrading (existing `"zod/v4"` and `"zod/v4-mini"` imports keep working forever):

| | Before | After |
|---|---|---|
| Zod 4 | `"zod/v4"` | `"zod"` |
| Zod 4 Mini | `"zod/v4-mini"` | `"zod/mini"` |
| Zod 3 | `"zod"` | `"zod/v3"` |

Library authors: bump the peer dependency range. No other code changes are necessary (no code changes were made between the latest `3.25.x` release and `4.0.0`).

```jsonc
// package.json
{
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

Historical rollout write-up: libraries supporting both majors imported from the subpaths, never the root:

```ts
import * as z3 from "zod/v3"
import * as z4 from "zod/v4"
```

## Notes

- Code fence language changed from json to jsonc because the official snippet contains a // comment.
- The `zod/v3` / `zod/v4` import snippet is from the historical rollout write-up; current library-author guidance (zod.dev/library-authors) is to import only from "zod/v4/core" (plus "zod/v3"), since building against "zod/v4" excludes Zod Mini.
- Fetched from tag v4.6.7: https://github.com/colinhacks/zod/blob/v4.6.7/packages/docs/content/v4/versioning.mdx
- Update of July 8th, 2025: `zod@4.0.0` was published to npm; the package root (`"zod"`) now exports Zod 4. All other subpaths are unchanged and remain available forever.
- Original plan: Zod 4 shipped at subpath `"zod/v4"` alongside `zod@3.25.0` and was considered stable and production-ready; Zod 3 stayed at the root and at `"zod/v3"`, receiving bug fixes and stability improvements. Later the root switched to Zod 4 and `zod@4.0.0` was published. The approach is analogous to how Go handles major version changes.
- Rationale: many libraries accept user-defined Zod schemas, so a breaking Zod change breaks their users (a Zod 3 `ZodType` is not assignable to a Zod 4 `ZodType`). Publishing `zod@4.0.0` directly would have forced a "version bump avalanche" across the ecosystem.
- Subpath versioning lets libraries keep a single peerDependency on `"zod"` and support Zod 3, Zod 4 and Zod Mini simultaneously; they must raise the minimum peer range to `zod@^3.25.0`. As long as libraries import only from subpaths (not the root), their implementations work across the major bump without code changes.
- Rejected alternatives, per the source: npm aliases with both versions as dependencies (`instanceof` checks likely fail), a peer range spanning majors (fundamental generics differ between Zod 3 and 4), optional peer dependencies (no reliable runtime detection, bundler problems, npm v10 cannot combine peer dependencies with aliases), and a `zod-compat` package (types only, error-prone).

## Related

- [Zod 4 Release Notes](./v4-release-notes.md)
- [Zod 4 Migration Guide](./v4-migration-guide.md)
