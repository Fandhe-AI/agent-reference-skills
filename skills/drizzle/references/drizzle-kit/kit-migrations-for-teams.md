---
source:
  - https://orm.drizzle.team/docs/kit-migrations-for-teams
  - https://orm.drizzle.team/docs/drizzle-kit-check
---

# Migrations for teams

This page is a documentation stub in the official docs. The official text states this section will be updated after the release of the next version of the migrations folder structure, and points to GitHub discussion #2832 for details and updates.

## Signature / Usage

```shell
# drizzle-kit-check.mdx: check migration history consistency across branches
npx drizzle-kit check --dialect=postgresql
```

## Notes

- Supplementary source for the snippet: https://orm.drizzle.team/docs/drizzle-kit-check (`pg/drizzle-kit-check.mdx`). This stub page itself has no code.

- Stub page as of drizzle-kit 1.0.0-rc.5 — no substantive content beyond a pointer to `github.com/drizzle-team/drizzle-orm/discussions/2832`. Do not infer team-workflow guidance beyond what `drizzle-kit check` (commutativity checking across branches) already documents.
- The snippet above is quoted from `drizzle-kit-check.mdx` (not from this stub page itself), whose text explicitly says `check` "is extremely useful when you have multiple developers working on the project and altering database schema on different branches" and links back to this "migrations for teams" page.

## Related

- [drizzle-kit-check](./drizzle-kit-check.md)
