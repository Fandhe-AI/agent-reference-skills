---
source: https://developers.cloudflare.com/pages/configuration/monorepos/
---

# Monorepos

Deploy several Pages projects from one repository, each with its own build command and root directory.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/build-watch-paths/ (limit rebuilds per project):

```txt
Include paths: project-a/*, packages/*
Exclude paths:
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Projects per repository | limit | max 5 | Raise through your account team or the Limit Increase Request Form. |
| Build system | requirement | V2 or later | Monorepo support requires it. |
| Root directory | project setting | repository root | Where the build command runs. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Create one Pages project per app the same way as any Git project; project names must be unique even for the same repository.
- By default a change to any file builds every connected project. Use build watch paths or branch controls to skip builds.
- GitHub shows separate comments and check runs per project when a pull request exists; GitLab shows separate commit statuses. A skipped build shows no check run.
- Pages ships no monorepo dependency tooling; npm, pnpm and Yarn workspaces, Turborepo, NX or Lerna can be added.

## Related

- [Build watch paths](./build-watch-paths.md)
- [Branch deployment controls](./branch-build-controls.md)
- [Build image](./build-image.md)
