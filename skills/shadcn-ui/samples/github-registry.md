---
source: https://ui.shadcn.com/docs/registry/github
---

# GitHub Registry

Turn a GitHub repository into a registry by adding a root `registry.json`, then validate and install from it.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "project-conventions",
      "type": "registry:item",
      "title": "Project Conventions",
      "description": "Shared project conventions, editor settings and agent instructions.",
      "files": [
        {
          "path": "AGENTS.md",
          "type": "registry:file",
          "target": "~/AGENTS.md"
        },
        {
          "path": ".editorconfig",
          "type": "registry:file",
          "target": "~/.editorconfig"
        },
        {
          "path": "docs/conventions.md",
          "type": "registry:file",
          "target": "~/docs/conventions.md"
        }
      ]
    }
  ]
}
```

```bash
npx shadcn@latest registry validate acme/toolkit
npx shadcn@latest list acme/toolkit
npx shadcn@latest view acme/toolkit/project-conventions
npx shadcn@latest add acme/toolkit/project-conventions --dry-run
npx shadcn@latest add acme/toolkit/project-conventions
```

## Notes

- Item address is `<owner>/<repo>/<item>`; add `#ref` (branch, tag or full 40-character commit SHA) to pin, e.g. `acme/toolkit/project-conventions#v1.0.0`. Without a ref the default branch is used.
- Requires a `github.com` repository (GitHub Enterprise hosts are not supported). Private repositories work via `gh auth login`, or `GH_TOKEN` / `GITHUB_TOKEN` in CI.
- Review third-party items before installing: inspect with `shadcn view`, preview with `--dry-run`, or use `--diff` / `--view`.
