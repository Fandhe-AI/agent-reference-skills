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

- The comparison requires everything between base and head to exist in the checkout; if the checkout is too shallow, all packages are considered changed. Use a blobless clone with full history (`git clone --filter=blob:none`, without `--depth`) to get the right history.
- Official docs (v2.11.11): a blobless clone with full history (`git clone --filter=blob:none`, without `--depth`) gives the comparison the history it needs. With `actions/checkout`, set `filter: blob:none` and `fetch-depth: 0`. (Earlier v2.11.8 docs suggested `--filter=blob:none --depth=0`, which Git rejects with `fatal: depth 0 is not a positive number`.) To get full history on an existing shallow checkout, run `git fetch --unshallow`.
- Source: https://turborepo.dev/docs/guides/skipping-tasks (vercel/turborepo tag v2.11.11, fetched 2026-11-14).
- By default `turbo query affected` compares against the merge-base with the default branch, so it detects all changes across the branch, not just the latest commit. `--base` / `--head` override this; `TURBO_SCM_BASE` / `TURBO_SCM_HEAD` can be set instead, and explicit flags take precedence.
- Check before any other CI work (container provisioning, dependency installation); even with a Remote Cache hit those steps cost time. The JSON output includes the reason per item (e.g. `{"name":"web","path":"apps/web","reason":{"__typename":"FileChanged"}}`) and `length`.
- `turbo-ignore` is deprecated (it used `--filter` and `--dry=json` under the hood to detect package-level changes); migrate to `turbo query affected`.
