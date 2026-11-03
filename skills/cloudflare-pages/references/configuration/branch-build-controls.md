---
source: https://developers.cloudflare.com/pages/configuration/branch-build-controls/
---

# Branch deployment controls

Control which production and preview branches trigger automatic deployments in a Git-connected Pages project.

## Signature / Usage

Dashboard path: Pages project > **Settings** > **Builds & deployments** > **Configure Production deployments**. For a Direct Upload project there are no production branch controls; call the Update Project endpoint instead:

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data "{\"production_branch\": \"main\"}"
```

Example: deploy only `release/` branches as previews. Adapted (not in the official docs): the exclude list is empty, because excludes are evaluated first and an exclude of `*` would also exclude `release/*`; see Notes.

```txt
Include Preview branches: release/*
Exclude Preview branches: (empty)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | branch name | first branch you push | Branch used for the production environment. |
| Enable automatic production branch deployments | checkbox | — | Turns automatic production deployments on or off; settings must be saved. |
| All non-Production branches | preview option | default | Every commit to a preview branch is deployed. |
| None | preview option | — | Turns off automatic builds for all preview branches. |
| Custom branches | preview option | — | Include and exclude lists of static branch names or wildcard rules. |
| Wildcard `*` | syntax | — | Matches zero or more characters; allowed alone or at the start or end of a rule (for example `fix/*`). |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Branch Deploy Controls are listed there as Pages-only.
- Evaluation order for custom branches: (1) Excludes, (2) Includes, (3) Skip. A branch matching neither is skipped.
- Source examples: include `fix/*`, `feat/*`, `chore/*` with an empty exclude list; include `*` and exclude `dependabot/*` to avoid dependabot deployments.
- The PATCH example uses placeholders in the URL and header; supply a real token through your shell or secret store rather than committing it.
- Adapted from the official docs: the preview-branch example uses an empty exclude list, because excludes are evaluated first and an exclude of `*` would also exclude `release/*`.

## Related

- [Git integration](./git-integration.md)
- [Preview deployments](./preview-deployments.md)
- [Rollbacks](./rollbacks.md)
