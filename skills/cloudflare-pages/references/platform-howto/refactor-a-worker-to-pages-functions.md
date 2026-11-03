---
source: https://developers.cloudflare.com/pages/how-to/refactor-a-worker-to-pages-functions/
---

# Refactor a Worker to a Pages Function

Convert a form-handling Worker into a file-based Pages Function in the `/functions` folder.

## Signature / Usage

Original Worker (handles `POST /submit` and forwards entries to Airtable):

```js
export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === "/submit") {
			return submitHandler(request, env);
		}

		return fetch(request.url);
	},
};

async function submitHandler(request, env) {
	if (request.method !== "POST") {
		return new Response("Method not allowed", {
			status: 405,
		});
	}
	const body = await request.formData();

	const { first_name, last_name, email, phone, subject, message } =
		Object.fromEntries(body);

	const reqBody = {
		fields: {
			"First Name": first_name,
			"Last Name": last_name,
			Email: email,
			"Phone number": phone,
			Subject: subject,
			Message: message,
		},
	};

	return HandleAirtableData(reqBody, env);
}

const HandleAirtableData = (body, env) => {
	return fetch(
		`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
			env.AIRTABLE_TABLE_NAME,
		)}`,
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
				"Content-type": `application/json`,
			},
		},
	);
};
```

Adapted (not in the official docs): the official final `submitHandler` passes an undefined `env` to `HandleAirtableData`; this version reads `context.env`. See Notes.

Refactored Pages Function, saved as `functions/form.js`:

```js
export async function onRequestPost(context) {
	return await submitHandler(context);
}

async function submitHandler(context) {
	const body = await context.request.formData();

	const { first_name, last_name, email, phone, subject, message } =
		Object.fromEntries(body);

	const reqBody = {
		fields: {
			"First Name": first_name,
			"Last Name": last_name,
			Email: email,
			"Phone number": phone,
			Subject: subject,
			Message: message,
		},
	};

	return HandleAirtableData({ body: reqBody, env: context.env });
}

const HandleAirtableData = async function onRequest({ body, env }) {
	return fetch(
		`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
			env.AIRTABLE_TABLE_NAME,
		)}`,
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
				"Content-type": `application/json`,
			},
		},
	);
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onRequestPost` | handler export | — | Replaces the `fetch` handler and the method check for POST requests. |
| `context.request` | Request | — | The incoming request. |
| `context.env` | object | — | Bindings, variables and secrets (`AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`, `AIRTABLE_API_KEY`). |
| `context.params`, `context.next` | context properties | — | Also available on `context`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Corrected from the official docs: the page's final Function calls `HandleAirtableData({ body: reqBody, env: env })` inside `submitHandler(context)`, where `env` is not defined (`ReferenceError`); it must be `context.env`.
- General steps: remove the fetch handler and export the appropriate `onRequest` method, take the `context` argument, and use middleware for logic before or after route handlers. Store Airtable credentials as secrets (Wrangler `secret`), never in code. Validate form input before forwarding in real use.
- Alternative: place the Worker in the output directory as `_worker.js` (advanced mode, module syntax). Then the entire `/functions` directory, including routing and middleware, is ignored.
- Use Pages Functions when the logic belongs to one application; if several applications share it, keep a Worker.
- Test locally with Wrangler (Pages Functions local development).

## Related

- [Pages Functions A/B testing](./use-worker-for-ab-testing-in-pages.md)
- [Migrating from Workers Sites](./migrating-from-workers.md)
