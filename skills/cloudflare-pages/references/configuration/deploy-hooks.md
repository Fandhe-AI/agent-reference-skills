---
source: https://developers.cloudflare.com/pages/configuration/deploy-hooks/
---

# Deploy Hooks

Unique URLs that trigger a Pages build when they receive an HTTP POST, for CMS webhooks, custom CI/CD or scheduled rebuilds.

## Signature / Usage

Create: **Workers & Pages** > Pages project > **Settings** > **Builds** > **Add deploy hook**, then POST to the generated URL. The page shows the POST snippet only in a screenshot, so no command is reproduced here.

Snippet taken from https://developers.cloudflare.com/pages/configuration/api/ (scheduled rebuild through the REST API instead of a hook):

```js
const endpoint =
	"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments";

export default {
	async scheduled(_, env) {
		const init = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				// We recommend you store the API token as a secret using the Workers dashboard or using Wrangler as documented here: https://developers.cloudflare.com/workers/wrangler/commands/general/#secret
				Authorization: `Bearer ${env.API_TOKEN}`,
			},
		};

		await fetch(endpoint, init);
	},
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Deploy hook name | string | — | Unique identifier, for example `contentful-site`. |
| Branch to build | branch name | — | Repository branch the hook builds. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Deploy Hook URLs need no further authentication: treat them like application secrets. If misuse is suspected, delete the hook and create a new one.
- Deployments triggered by a hook show it in the **Source** column of the deployment log.
- CMS setup in the source: Contentful (Webhooks, filter events), Ghost (Custom Integration webhook, event **Site changed (rebuild)**), Sanity (Webhooks, optional Dataset filter), WordPress (WP Webhooks plugin triggers), Strapi (Settings > Webhooks, add to the production Strapi app), Storyblok (Settings > Webhooks, **Story published & unpublished**).
- Dashboard paths for each CMS are described in prose only.

## Related

- [REST API](./api.md)
- [Git integration](./git-integration.md)
