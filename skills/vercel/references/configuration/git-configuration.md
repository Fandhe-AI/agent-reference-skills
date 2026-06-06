# git / github Configuration

Git-related configuration options available in `vercel.json` and `vercel.ts` to control automated deployments and GitHub integration behavior.

## Signature / Usage

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "dev": false,
      "internal-*": false
    }
  }
}
```

## Options / Props

### `git` object

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `git.deploymentEnabled` | `boolean \| Record<string, boolean>` | `true` | Disable automatic deployments for specific branches. Supports minimatch glob patterns. If a branch matches multiple rules and at least one is `true`, deployment proceeds |

### `github` object

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `github.autoAlias` | `boolean` | — | When `false`, preview deployments are created upon merge. **Deprecated**: use the staged production build workflow instead |
| `github.autoJobCancelation` | `boolean` | — | When `false`, builds are never cancelled; all pushes build sequentially |
| `github.silent` | `boolean` | — | **Deprecated**: When `true`, stops PR and commit comments. Use dashboard Git settings instead |
| `github.enabled` | `boolean` | — | **Deprecated**: When `false`, Vercel for GitHub will not deploy the project. Use `git.deploymentEnabled` instead |

## Notes

- Branch patterns use [minimatch syntax](https://github.com/isaacs/minimatch): e.g. `"internal-*": false`
- If a branch matches multiple rules, any `true` match triggers a deployment
- Setting `git.deploymentEnabled: false` (boolean) disables all automatic deployments
- `github.silent` and `github.enabled` are deprecated; use dashboard settings or `git.deploymentEnabled`

## Related

- [vercel-json.md](./vercel-json.md)
- [vercel-ts.md](./vercel-ts.md)
