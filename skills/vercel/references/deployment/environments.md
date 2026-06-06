# Environments

Vercel provides three default environments (Local, Preview, Production) and supports Custom Environments on Pro/Enterprise plans for workflows like staging or QA.

## Signature / Usage

```bash
# Deploy to a custom environment named "staging"
vercel deploy --target=staging

# Pull env vars from "staging"
vercel pull --environment=staging

# Add env var to "staging"
vercel env add MY_KEY staging

# Deploy to production
vercel --prod
```

## Environment Types

| Environment | Plan | Trigger | Use Case |
|-------------|------|---------|----------|
| Local | All | `vercel dev` / `vercel env pull` | Local development |
| Preview | All | Non-production branch push, PR, CLI without `--prod` | Testing, QA, collaboration |
| Production | All | Production branch push, `vercel --prod` | Live user-facing site |
| Custom | Pro / Enterprise | Branch tracking (configurable) | Staging, QA, specialized workflows |

## Custom Environment Limits

| Plan | Custom Environments per Project |
|------|---------------------------------|
| Pro | 1 |
| Enterprise | 12 |

## Creating a Custom Environment (API)

```bash
curl --request POST \
  --url https://api.vercel.com/v9/projects/<project-id>/custom-environments \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "slug": "staging",
    "description": "Staging environment"
  }'
```

## Options / Props

| Option | Description |
|--------|-------------|
| Branch Tracking | Automatically deploy whenever a matching branch is pushed |
| Attach a Domain | Give a persistent URL to the environment |
| Import variables | Seed environment variables from another environment |
| Auto-assign Custom Production Domains | Toggle in Production environment settings; disable for staged promotion workflows |

## Notes

- Preview deployments create two URL types: a commit-specific URL and a branch-specific URL (always pointing to the latest commit on the branch).
- Pushing or merging to the production branch (default: `main`) triggers a production deployment and updates custom domains automatically.
- Custom environments require Pro or Enterprise plan.
- Disabling **Auto-assign Custom Production Domains** in Production settings enables a staging workflow where new commits don't go live until manually promoted.

## Related

- [overview.md](./overview.md)
- [git-integration.md](./git-integration.md)
- [promoting-deployments.md](./promoting-deployments.md)
- [generated-urls.md](./generated-urls.md)
