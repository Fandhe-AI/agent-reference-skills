# Filtering Tasks

Run tasks only for specific packages using `--filter`.

```bash
# By package name
turbo run build --filter=@acme/web

# By directory glob
turbo run lint --filter="./packages/*"

# Include all packages that depend on ui (upstream)
turbo run build --filter=...ui

# Include ui and all packages it depends on (downstream)
turbo run dev --filter=web...

# Only packages changed since last commit
turbo run build --affected

# Only changed packages, narrowed to one package (intersection)
turbo run build --affected --filter=web

# Only packages changed relative to a branch
turbo run build --filter=[origin/main]

# Tasks carrying a tag (task or package tag)
turbo run test --filter=tag:ci

# Tagged tasks, excluding another tag
turbo run test --filter=tag:ci --filter='!tag:slow'

# Combine multiple filters (union)
turbo run test --filter=@acme/web --filter=@acme/api

# Exclude a package
turbo run lint --filter=!@acme/docs

# Shorthand: run specific package#task pairs (v2.2.4+)
turbo run web#build docs#lint
```

Root `package.json` scripts for common workflows:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

## Notes

- Multiple `--filter` flags are combined as OR (union)
- `...pkg` means "pkg and all packages that depend on it"; `pkg...` means "pkg and all packages it depends on"
- `^` in filter syntax (e.g. `^...ui`) excludes the matched package itself and includes only its relatives
- `--affected` combined with `--filter` narrows to the intersection (e.g. `--affected --filter=web`)
- `tag:<label>`: a package tag matches every requested task in that package; a task tag matches only tasks carrying that label. No future flag is required
- Do not write `turbo` commands inside individual package `package.json` scripts — only in the root
