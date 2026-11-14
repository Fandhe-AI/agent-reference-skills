# Environments

Vercel provides three default environments (Local, Preview, Production) and supports Custom Environments on Pro/Enterprise plans for workflows like staging or QA.

## Signature / Usage

```bash
# Deploy to a custom environment named "staging"
vercel deploy --environment=staging

# Pull env vars from "staging"
vercel pull --environment=staging

# Add env var to "staging"
vercel env add MY_KEY --environment staging

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

| Plan | Included per project | Additional environments | Maximum per project |
|------|----------------------|-------------------------|---------------------|
| Pro | 1 | $50 per month for each pack of five | 16 |
| Enterprise | 12 | $50 per month for each pack of five | 22 |

## Creating a Custom Environment (API)

```bash
curl --request POST \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/custom-environments \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "slug": "<environment_name_slug>",
    "description": "<environment_description>"
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

- The first deployment of a new project is always a production deployment, even from a non-production branch, via `vercel` / `vercel deploy` without `--prod`, or `vercel deploy --target=preview`. After that, the usual rules apply (this holds even if the first deployment failed). A failed, errored, or canceled first deployment still counts; deleted deployments don't, and requests rejected before a deployment is created (validation or permission errors) don't count. It builds with **Production** environment variables, so Preview-only variables are not available to it.
- Preview deployments create two URL types: a commit-specific URL and a branch-specific URL (always pointing to the latest commit on the branch).
- Pushing or merging to the production branch (default: `main`) triggers a production deployment and updates custom domains automatically.
- Custom environments require Pro or Enterprise plan; Pro: 1 and Enterprise: 12 per project (additional environments can be bought in packs of five up to the maximums in the table above; to buy more, open the project's **Environments** settings, use the stepper in **Custom Environments**, and click **Save**; reducing below current usage is not accepted, so delete custom environments first; purchased packs apply to a single project). Team owners and project admins can create, update, or remove them.
- Staging workflows (docs): (1) custom staging environment (Pro/Enterprise): create `staging` in Environments settings, set Branch Tracking to your staging branch, add its environment variables (review values if importing from another environment), assign a domain such as `staging.example.com`, push to the matching branch; `vercel deploy --environment=staging` also works. (2) Preview branch for staging (all plans): create a `staging` Git branch, assign a domain to that branch under **Preview** with **Git Branch** `staging`, push to create a preview deployment; create a new deployment after changing variables. (3) Staged production deployment: disable **Auto-assign Custom Production Domains**; it uses production environment variables, so use a custom environment or preview branch with staging credentials when you need separate resources.
- Staged production deployment: in **Environments** > **Production** > **Branch Tracking**, disable **Auto-assign Custom Production Domains**; deployments from the production branch then wait for manual promotion (no rebuild on promote). Promoting a preview deployment via **Promote to Production** in the Deployments list rebuilds it with Production environment variables.
- Preview deployments are not indexed by search engines by default (`X-Robots-Tag: noindex` is added), except when served from a custom domain assigned to a Git branch such as `staging.example.com`. New projects start with Standard Protection and Vercel Authentication unless the team set a different default. Preview deployments use Preview-scoped variables; a Git branch's own values override Preview variables with the same name.
- AI agents can reach protected previews through Vercel MCP (`web_fetch_vercel_url`, `get_access_to_vercel_url`), `vercel curl`, or Protection Bypass for Automation (`x-vercel-protection-bypass` header).
- Marketplace integrations: native Marketplace resources can be scoped to an exact Custom Environment, e.g. `vercel integration add neon --environment staging` (see storage/marketplace/overview.md); Vercel Connect also supports Custom Environments.
- Disabling **Auto-assign Custom Production Domains** in Production settings enables a staging workflow where new commits don't go live until manually promoted.
- Creating custom environments via the SDK: `vercel.environment.createCustomEnvironment({ idOrName, requestBody: { slug, description } })` from `@vercel/sdk`.
- Vercel Connect: `vercel connect attach slack/acme-slack --environment staging` scopes token access to a custom environment; add `--triggers --trigger-environment staging --trigger-path /api/slack-events` for trigger destinations (the environment's domain must be verified and serve its latest deployment directly, without redirect).
- Source: https://vercel.com/docs/deployments/environments (fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
- [git-integration.md](./git-integration.md)
- [promoting-deployments.md](./promoting-deployments.md)
- [generated-urls.md](./generated-urls.md)
