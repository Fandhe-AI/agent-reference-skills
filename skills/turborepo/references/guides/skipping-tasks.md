# Skipping Tasks

## Signature / Usage

Beyond cache hits, this optimization fully skips CI tasks for workspaces with no code changes.

Main commands:

```bash
turbo query affected --packages web
turbo query affected --tasks test --packages web
turbo query affected --packages web --base main --head HEAD
```

`--exit-code` flag:

```bash
turbo query affected --packages web --exit-code
```

Shell script example:

```bash
#!/bin/bash
AFFECTED=$(turbo query affected --packages web)
COUNT=$(echo "$AFFECTED" | jq '.data.affectedPackages.length')
if [ "$COUNT" -eq 0 ]; then
  echo "No affected packages, skipping tasks"
  exit 0
fi
turbo run test --filter=web
```

## Options / Props

| Exit code | Meaning |
|---|---|
| `0` | No impact (safe to skip) |
| `1` | Impacted (task run required) |
| `2` | Error |

## Notes

- Shallow clones may cause all packages to be treated as changed. For proper history retrieval, run:
  ```bash
  git fetch --filter=blob:none --depth=0
  ```
- `turbo-ignore` is deprecated; migrate to `turbo query affected`.
