---
source: https://developers.cloudflare.com/pages/configuration/preview-deployments/
---

# Preview deployments

Unique preview URLs and branch aliases for every non-production branch and pull request, with optional Cloudflare Access protection.

## Signature / Usage

Delete old previews with Wrangler (the latest deployment for a branch cannot be deleted):

```sh
npx wrangler pages deployment delete <DEPLOYMENT_ID> --project-name <PROJECT_NAME>
```

Verify that a preview sends `X-Robots-Tag: noindex`:

```bash
curl -I https://<your-preview-url>.pages.dev
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--force`, `-f` | flag | — | Skip the confirmation prompt and force deletion of aliased deployments. |
| `--project-name` | string | — | Project containing the deployment. |
| Enable access policy | project setting | off | **Settings** > **General**; protects preview deployments with Cloudflare Access. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Workers has its own preview URLs setup (`preview_urls`, `previews`) described there.
- Each pull request gets a unique preview URL kept updated on new commits, only for pull requests from the repository itself. Production commits update `<project>.pages.dev` and attached custom domains; previews do not affect them.
- Hash-based addresses (`<hash>.<project>.pages.dev`) stay reachable. A branch alias such as `development.<project>.pages.dev` always points to the branch's latest commit; names are lowercased and non-alphanumeric characters become hyphens (`fix/api` becomes `fix-api`). Attach an alias to a custom domain via the custom branch alias guide.
- Preview URLs are public by default. The access policy protects only the random preview links, not the `*.pages.dev` domain or custom domains; see Known issues for protecting those as well.
- Every preview deployment includes `X-Robots-Tag: noindex` by default to avoid duplicate-content SEO issues.
- Find deployment IDs with `wrangler pages deployment list` (see the cloudflare-wrangler skill, commands/pages).

## Related

- [Branch deployment controls](./branch-build-controls.md)
- [Custom domains](./custom-domains.md)
- [Rollbacks](./rollbacks.md)
