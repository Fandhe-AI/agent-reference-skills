# turbo boundaries

## Signature / Usage

```bash
turbo boundaries
```

Experimental feature that checks for dependency violations across workspaces.

## Notes

- Detects violations:
  1. File imports outside a package's directory
  2. Imports of packages not declared in `package.json` `dependencies`
- Assign tags to each package in its `turbo.json`:
  ```json
  { "tags": ["internal"] }
  ```
- Configure rules in the root `turbo.json`:
  - **allow rule**
    ```json
    {
      "boundaries": {
        "tags": {
          "public": { "dependencies": { "allow": ["public"] } }
        }
      }
    }
    ```
  - **deny rule**
    ```json
    {
      "boundaries": {
        "tags": {
          "public": { "dependencies": { "deny": ["internal"] } }
        }
      }
    }
    ```
  - **dependents rule**
    ```json
    {
      "boundaries": {
        "tags": {
          "private": { "dependents": { "deny": ["public"] } }
        }
      }
    }
    ```
  - Rules apply transitively through the dependency chain (including dependencies of dependencies). Package names can be used instead of tags as well.
- Tags vs run filters: per the turbo.json reference, package `tags` are arbitrary string labels and do not need to be registered in `boundaries.tags`; existing boundary rules are unchanged. The same labels (and task tags) can also be selected with `turbo run --filter=tag:<label>`, which is a task-selection feature separate from Boundaries rule checking.
- Feedback is collected on the Boundaries RFC (vercel/turborepo discussion 9435).
