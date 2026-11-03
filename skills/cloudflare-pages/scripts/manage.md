---
source: https://developers.cloudflare.com/pages/get-started/direct-upload/, https://developers.cloudflare.com/pages/configuration/preview-deployments/, https://developers.cloudflare.com/pages/functions/debugging-and-logging/, https://developers.cloudflare.com/pages/platform/known-issues/
---

# Manage projects and deployments

Copy-paste commands for listing projects and deployments, deleting preview deployments, and streaming Functions logs. Full flag tables are in the cloudflare-wrangler skill (`commands/pages.md`).

## Signature / Usage

### List projects

```sh
npx wrangler pages project list
```

```sh
npx wrangler pages project list --json
```

`--json` prints machine-readable output for scripting.

### List deployments (and preview URLs)

```sh
npx wrangler pages deployment list
```

Lists deployments for the project, including their unique preview URLs. Deployment IDs from this output feed the delete command below.

### Delete a deployment

```sh
npx wrangler pages deployment delete <DEPLOYMENT_ID> --project-name <PROJECT_NAME>
```

> **Warning**: Deleting is irreversible and removes the preview URL. `--force` (`-f`) skips the confirmation prompt and forces deletion of aliased deployments. The latest deployment for a branch cannot be deleted.

Also the documented workaround when a project cannot be deleted because it still has deployments: delete the deployments individually, then delete the project.

### Stream Functions logs

```sh
npx wrangler pages deployment tail
```

Run in the Pages project directory to livestream logs for a project and deployment as structured JSON. At most 10 clients (dashboard sessions plus tail sessions) can view a deployment's logs at once. Filter options are in the cloudflare-wrangler skill.

### Check that a preview deployment is not indexed

```bash
curl -I https://<your-preview-url>.pages.dev
```

Look for `x-robots-tag: noindex` in the response headers.

## Notes

- Full flag tables are in the cloudflare-wrangler skill (`commands/pages.md`).
- A project that still has deployments cannot be deleted; delete the deployments individually, then the project.

## Related

- [Preview deployments](../references/configuration/preview-deployments.md)
- [Debugging and logging](../references/functions/debugging-and-logging.md)
- [Known issues](../references/platform-howto/known-issues.md)
