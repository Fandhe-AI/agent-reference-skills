---
source: https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/
---

# Workers Builds Deploy Hooks

Each Deploy Hook is a unique URL that triggers a manual build for one branch when it receives an HTTP POST request.

## Signature / Usage

Create: Worker > **Settings** > **Builds** > **Deploy Hooks**; enter a name, select the branch, **Create**, copy the URL. The Worker must be connected to a Git repository.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/<DEPLOY_HOOK_ID>"
```

Response:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "build_uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "branch": "main",
    "worker": "my-worker"
  }
}
```

Response when a pending build already exists (idempotency):

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "build_uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "status": "queued",
    "created_on": "2026-01-21T18:50:00Z",
    "already_exists": true
  }
}
```

Rebuild on a schedule (Cron Trigger):

```js
export default {
	async scheduled(event, env) {
		await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
	},
};
```

Deploy from a Slack slash command:

```js
export default {
	async fetch(request, env) {
		const body = await request.formData();
		const command = body.get("command");
		const token = body.get("token");

		if (token !== env.SLACK_VERIFICATION_TOKEN) {
			return new Response("Unauthorized", { status: 401 });
		}

		if (command === "/deploy") {
			const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
			const { result } = await res.json();
			return new Response(`Build started: ${result.build_uuid}`);
		}

		return new Response("Unknown command", { status: 400 });
	},
};
```

## Notes

- No `Authorization` header is needed; the ID in the URL is the credential. Store URLs as secrets (environment variables or a secrets manager), never in source or public config. If compromised, delete the hook immediately (the old URL stops working) and create a new one.
- For token-authenticated triggers or per-request branch choice, call the manual build endpoint of the Builds API (`triggers` create_build) with an API token.
- Verification: the Deploy Hooks list shows last triggered time; build history **Triggered by** shows the hook name with a `deploy hook` label; the API records `build_trigger_source: "deploy_hook"`.
- Idempotency: if the same hook is triggered while the previous build is `queued` or `initializing`, no duplicate build is created; the existing `build_uuid` is returned with `already_exists: true`. Safe for retried webhooks.
- CMS integration: create a webhook in your CMS (Contentful, Sanity, Strapi, Storyblok, DatoCMS, Prismic, etc.) with the hook URL as target and select trigger events.
- Slack example caveat (not in the official docs): comparing the form-body `token` to a stored value relies on Slack's legacy verification token, which Slack has deprecated in favor of request signing (`X-Slack-Signature` with a signing secret); prefer signature verification in production.
- Limits: 10 builds per minute per Worker, 100 per minute per account.

## Related

- [builds-api-reference.md](./builds-api-reference.md)
- [builds-overview.md](./builds-overview.md)
- [builds-git-integration.md](./builds-git-integration.md)
