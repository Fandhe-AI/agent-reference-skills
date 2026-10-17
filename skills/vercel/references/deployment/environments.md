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
- Custom environments require Pro or Enterprise plan; Pro: 1 and Enterprise: 12 per project (docs 2026-10 confirm; a changelog notes additional custom environments can be purchased). Team owners and project admins can create, update, or remove them.
- Staging workflows (docs): (1) custom staging environment (Pro/Enterprise): create `staging` in Environments settings, set Branch Tracking to your staging branch, add its environment variables (review values if importing from another environment), assign a domain such as `staging.example.com`, push to the matching branch; `vercel deploy --target=staging` also works. (2) Preview branch for staging (all plans): create a `staging` Git branch, assign a domain to that branch under **Preview** with **Git Branch** `staging`, push to create a preview deployment; create a new deployment after changing variables. (3) Staged production deployment: disable **Auto-assign Custom Production Domains**; it uses production environment variables, so use a custom environment or preview branch with staging credentials when you need separate resources.
- Marketplace integrations: native Marketplace resources can be scoped to an exact Custom Environment, e.g. `vercel integration add neon --environment staging` (see storage/marketplace/overview.md); Vercel Connect also supports Custom Environments.
- Disabling **Auto-assign Custom Production Domains** in Production settings enables a staging workflow where new commits don't go live until manually promoted.

## Related

- [overview.md](./overview.md)
- [git-integration.md](./git-integration.md)
- [promoting-deployments.md](./promoting-deployments.md)
- [generated-urls.md](./generated-urls.md)
