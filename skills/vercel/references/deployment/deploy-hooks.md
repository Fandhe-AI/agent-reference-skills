# Deploy Hooks

Deploy Hooks are unique URLs that accept HTTP requests to trigger deployments without needing a new commit. Each URL is linked to a specific project, repository, and branch.

## Signature / Usage

```bash
# Trigger a deployment (GET or POST)
curl -X POST https://api.vercel.com/v1/integrations/deploy/<project-id>/<hook-id>

# Disable build cache
curl -X POST https://api.vercel.com/v1/integrations/deploy/<project-id>/<hook-id>?buildCache=false
```

## Example Response

```json
{
  "job": {
    "id": "okzCd50AIap1O31g0gne",
    "state": "PENDING",
    "createdAt": 1662825789999
  }
}
```

## Options / Props

| Query Parameter | Default | Description |
|-----------------|---------|-------------|
| `buildCache` | `true` | Set to `false` to bypass the build cache for this deployment |

## Creating a Deploy Hook

1. Connect your project to a Git repository.
2. Go to **Project Settings → Git → Deploy Hooks**.
3. Enter a name and select the branch to deploy.
4. Copy the generated URL.

## Limits

| Plan | Deploy Hooks per Project |
|------|------------------------|
| Hobby | 5 |
| Pro | 5 |
| Enterprise | 10 |

## Notes

- No authentication header is needed to trigger a hook; the unique URL acts as the secret — treat it like a token/password.
- If the same version is deployed multiple times, Vercel cancels previous deployments for the same hook to reduce build times.
- Deploy Hooks will not trigger if `github.enabled = false` is set in `vercel.json`.
- If a hook URL is compromised, revoke it in Project Settings and create a new one.
- Build cache is included by default; hooks created before May 11, 2021 must explicitly append `?buildCache=true` or be replaced with a new hook.

## Use Cases

- Headless CMS content change → trigger rebuild
- Scheduled deployments via third-party cron service
- Forced deployments from the command line without a code change

## Related

- [overview.md](./overview.md)
- [managing-deployments.md](./managing-deployments.md)
