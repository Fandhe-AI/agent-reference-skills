---
source: https://developers.cloudflare.com/pages/configuration/build-watch-paths/
---

# Build watch paths

Include or exclude file paths so that a push only triggers a Pages build when relevant files change.

## Signature / Usage

Configure under Pages project > **Settings** > **Build** > **Build watch paths**. Example for a monorepo, building only when `project-a/` or `packages/` change:

```txt
Include paths: project-a/*, packages/*
Exclude paths:
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Include paths | static paths or wildcard rules | `[*]` (everything) | A build is triggered if any non-excluded changed path matches. |
| Exclude paths | static paths or wildcard rules | `[]` (nothing) | Paths matching these are ignored first. |
| `*` | wildcard | — | Matches zero or more characters, including path separators (`/`); allowed at the start or end of a rule. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Evaluation per path in a push event: excludes are applied first, remaining paths are checked against includes, a match triggers the build, otherwise it is skipped.
- Because `*` crosses `/`: `docs/*` matches `docs/guides/advanced/config.md`; `*.md` matches `README.md`, `docs/README.md` and `src/content/guide.md`; `*` alone matches everything.
- Path matching is bypassed and the project is built when a push has 0 file changes (empty push) or 3000+ file changes or 20+ commits.
- Source examples: exclude all docs with include `*` and exclude `docs/*`; trigger on all Markdown with include `*.md`; build `src/` but ignore tests with include `src/*` and exclude `src/tests/*`.

## Related

- [Monorepos](./monorepos.md)
- [Branch deployment controls](./branch-build-controls.md)
- [GitHub integration](./github-integration.md)
