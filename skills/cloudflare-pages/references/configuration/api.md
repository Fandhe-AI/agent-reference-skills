---
source: https://developers.cloudflare.com/pages/configuration/api/
---

# REST API

Manage Pages projects, deployments and builds programmatically with the Cloudflare REST API.

## Signature / Usage

Create an API token with the **Cloudflare Pages** permission (Edit), then send it as a Bearer token:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Trigger a new build every hour from a Worker with a Cron Trigger (store the token as a secret named `API_TOKEN`; replace `{account_id}` and `{project_name}`):

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

Delete deployments older than `expirationDays` (the latest deployment for a branch cannot be deleted):

```js
const endpoint =
	"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments";
const expirationDays = 7;

export default {
	async scheduled(_, env) {
		const init = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				Authorization: `Bearer ${env.API_TOKEN}`,
			},
		};

		const response = await fetch(endpoint, init);
		const deployments = await response.json();

		for (const deployment of deployments.result) {
			// Check if the deployment was created within the last x days (as defined by `expirationDays` above)
			if (
				(Date.now() - new Date(deployment.created_on)) / 86400000 >
				expirationDays
			) {
				// Delete the deployment
				await fetch(`${endpoint}/${deployment.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json;charset=UTF-8",
						Authorization: `Bearer ${env.API_TOKEN}`,
					},
				});
			}
		}
	},
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Pages Read | token permission | — | Read-only access; one of Pages Read or Pages Write is required for the list-deployments call. |
| Pages Write | token permission | — | Write access; the source says to grant **Cloudflare Pages** with **Edit** access on a custom token. |
| `$ACCOUNT_ID` | string | — | Account ID used in the URL path (see https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/). |
| `$PROJECT_NAME` | string | — | Pages project name used in the URL path. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Deploy Hooks are the API-free way to trigger builds from a CMS.
- The `{account_id}` / `{project_name}` markers in the Worker examples are literal placeholders in the source; replace them (for example from `vars`) before deploying. Run the Workers with a Cron Trigger (see the cloudflare-workers skill).
- The source prose says "after a week" and "after a month" for the delete example; the code uses `expirationDays = 7`.
- The delete example does not check `response.ok` and does not handle pagination; it processes only the deployments returned by a single list call.
- The third official example (a Worker that renders project status and preview links as HTML) is not reproduced here; it serves preview URLs to anyone who can reach the Worker, so protect such a Worker (for example with Cloudflare Access) before using it.
- `wrangler pages deployment delete` deletes individual deployments from the command line (see the cloudflare-wrangler skill, commands/pages).

## Related

- [Deploy Hooks](./deploy-hooks.md)
- [Preview deployments](./preview-deployments.md)
- [Branch deployment controls](./branch-build-controls.md)
