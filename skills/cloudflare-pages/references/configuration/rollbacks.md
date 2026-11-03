---
source: https://developers.cloudflare.com/pages/configuration/rollbacks/
---

# Rollbacks

Instantly revert a Pages project to a previous successful production deployment.

## Signature / Usage

Dashboard: Pages project > **Deployments** > **All deployments** > three dot menu on the target > **Rollback to this deployment** > confirm.

Snippet taken from https://developers.cloudflare.com/pages/configuration/api/ (list deployments to find a target):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Gradual Deployments are listed there as Workers-only.
- Any successfully built production deployment is a valid rollback target. After rolling back you can still roll forward to newer deployments. Preview deployments are not valid targets.
- The change to production is instant once confirmed. The source documents rollback only through the dashboard.

## Related

- [Preview deployments](./preview-deployments.md)
- [Branch deployment controls](./branch-build-controls.md)
