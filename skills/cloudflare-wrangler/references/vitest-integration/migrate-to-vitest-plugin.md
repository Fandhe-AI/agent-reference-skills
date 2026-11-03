---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/
---

# Migrate to Vitest plugin

`@cloudflare/vitest-plugin` replaces `@cloudflare/vitest-pool-workers`. The package API and Vitest configuration are unchanged.

## Signature / Usage

Run the codemod from the project root (updates dependency, imports, and test TypeScript configuration):

```sh
npx @cloudflare/codemods vitest:pool-workers-to-vitest-plugin
```

Manual update:

```diff
- "@cloudflare/vitest-pool-workers": "^0.16.0"
+ "@cloudflare/vitest-plugin": "^1.0.0"

- import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
+ import { cloudflareTest } from "@cloudflare/vitest-plugin";

- "types": ["@cloudflare/vitest-pool-workers/types"]
+ "types": ["@cloudflare/vitest-plugin/types"]
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview the changes. |
| `--files <glob>` | Limit the files the codemod updates. |

## Notes

- The same rename applies to subpath imports, including `@cloudflare/vitest-plugin/config`.
- Request mocking: use `@msw/cloudflare` (see [mock-outbound-requests.md](./mock-outbound-requests.md)).
- Relationship stated in the docs: the plugin "replaces" the pool-workers package with the same API and configuration; the Vitest 3 to 4 guide says that guide "applies to `@cloudflare/vitest-pool-workers` version 0.x" and sends readers to this page "to migrate to version 1". The docs do not state whether pool-workers continues to be published or maintained in parallel (relationship beyond "replaces" not stated in the docs). The versions 0.23.0 (pool-workers) and 1.5.0 (plugin) are not stated in these pages.

## Related

- [migrate-from-vitest-3-to-vitest-4.md](./migrate-from-vitest-3-to-vitest-4.md)
- [configuration.md](./configuration.md)
