---
source: https://ui.shadcn.com/docs/registry/github
---

# GitHub Registries

Any `github.com` repository with a root `registry.json` is a registry; users install with `shadcn add <owner>/<repo>/<item>`. Items can distribute any files, not only React code.

## Signature / Usage

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
        }
      ]
    }
  ]
}
```

```bash
npx shadcn@latest add <username>/<repo>/<item>
npx shadcn@latest registry validate acme/toolkit
npx shadcn@latest registry validate acme/toolkit#v1.0.0
npx shadcn@latest list acme/toolkit
npx shadcn@latest search acme/toolkit --query conventions
npx shadcn@latest view acme/toolkit/project-conventions
npx shadcn@latest add acme/toolkit/project-conventions#v1.0.0
```

## Notes

- Requirements: a `github.com` repository; a `registry.json` at the repo root; valid `registry.json` / `registry-item.json` schemas; referenced source files must exist. GitHub Enterprise hosts are not supported by GitHub addresses; for custom servers with request authentication use a namespace with authentication.
- `registry validate` reads the root `registry.json`, resolves includes, validates items and checks that referenced files exist. A branch, tag or commit SHA can follow `#`.
- Use `target` when a file must land at a specific path (`~` is the project root). For larger repos use `include` with nested `registry.json` files; paths are relative to the declaring file.
- GitHub address: the first two path segments are owner and repo; the remaining segments are the item name (e.g. `acme/toolkit/rules/agent`), not a file path. An address ending in `.json` is treated as a file path.
- `registryDependencies`: same-repo dependencies need the full address (`acme/toolkit/agent-rules`); external ones use `@acme/tsconfig` or `contoso/devtools/prettier-config`. Refs are not inherited across dependencies; pin each (`acme/toolkit/agent-rules#v1.0.0`).
- Refs (`#ref`) may be a branch, tag or commit SHA and may contain slashes (`#feature/conventions`). Without a ref, the default branch is used. Branches / tags / short refs are resolved to a commit SHA with Git; full 40-character SHAs are used directly.
- Private repositories: authenticate with `gh auth login` (token stays inside the GitHub CLI), or set `GH_TOKEN` / `GITHUB_TOKEN` in CI (`GH_TOKEN` takes precedence; a fine-grained PAT with Contents: Read-only is recommended; sent only to `api.github.com`). Public repos are always read anonymously; credentials are tried only when the root `registry.json` is not publicly readable. Files are read via the Contents API pinned to the resolved SHA.
- Limits: 5 MiB per source file; avoid symlinks in registry source files.
- Review before installing: inspect `files`, `target`, `dependencies`, `devDependencies`, `registryDependencies`, `envVars`; prefer a full 40-character commit SHA; preview with `shadcn view`, `shadcn add ... --dry-run`, `--diff` or `--view`.
- Public GitHub registries need not be submitted to the registry directory; the directory is for namespaces such as `@acme`.

## Related

- [Getting Started](./getting-started.md)
- [Namespaces](./namespace.md)
- [registry.json](./registry-json.md)
- [registry-item.json](./registry-item-json.md)
