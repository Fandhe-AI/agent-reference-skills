---
source: https://developers.cloudflare.com/workers/configuration/cloudflare-access/
---

# Cloudflare Access

Cloudflare Access requires sign-in before visitors reach a Worker, its previews, all Workers in the account, or a specific hostname or path. Every request is checked before the Worker runs. Inside the Worker, `ctx.access` exposes the authenticated identity.

## Signature / Usage

```js
export default {
	async fetch(request, env, ctx) {
		if (!ctx.access) {
			return new Response("Access required", { status: 403 });
		}

		const identity = await ctx.access.getIdentity();
		const email = identity?.email ?? "unknown";

		return new Response(`Hello, ${email}`);
	},
};
```

Local simulation (`wrangler dev` or the Cloudflare Vite plugin):

```jsonc
{
	"access": {
		"dev": {
			"aud": "my-app",
			"identity": { "email": "admin@example.com" }
		}
	}
}
```

```toml
[access.dev]
aud = "my-app"

  [access.dev.identity]
  email = "admin@example.com"
```

Configuration file keys: see the cloudflare-wrangler skill.

## Options / Props

What to protect and the API destination type:

| I want to protect... | Section | API destination type |
| --- | --- | --- |
| Preview deployments for all Workers | Protect all Workers | `all_preview_workers` |
| Production and preview deployments for all Workers | Protect all Workers | `all_workers` |
| Preview deployments for one Worker | Protect one Worker | `preview_worker` |
| Production and preview deployments for one Worker | Protect one Worker | `worker` |
| A specific hostname (can be `workers.dev`, a Custom Domain, or a path) | Protect a specific hostname, Custom Domain, or path | Self-hosted application domain |

Policy options (dashboard):

| Policy option | Result |
| --- | --- |
| Cloudflare account | Allows members of this Cloudflare account to sign in. Use when access should be limited to people who already belong to the account. |
| Email domain | Allows anyone with a verified email address at the domain you enter, such as `example.com`, even if they are not Cloudflare account members. |

Local dev block:

| Name | Type | Description |
| --- | --- | --- |
| `aud` (required) | string | Access application audience tag, available as `ctx.access.aud`. Wrangler will not start without it. |
| `identity` (optional) | object | Simulated identity claims (email, name, groups, and so on) returned by `ctx.access.getIdentity()`. Omit if the Worker only checks whether Access is enabled. |

## Notes

- Prerequisites: Zero Trust enabled on the account and permission to manage Workers and Access applications.
- Protect all Workers (dashboard: Workers & Pages overview > Protect all Workers card > Enable Access; choose Previews only or All traffic; pick an authentication policy; review session duration; Apply Access). Via the API send `destinations` in `POST /accounts/{account_id}/access/apps`:

```json
"destinations": [
  {
    "type": "all_preview_workers"
  }
]
```

and `all_workers` instead to protect production and previews:

```json
"destinations": [
  {
    "type": "all_workers"
  }
]
```

- Protect one Worker (dashboard: Workers & Pages > Worker > Access > Protect this Worker behind Access). It protects every domain of the Worker: routes, Custom Domains, `workers.dev`, and previews. Example API request for previews only:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "type": "self_hosted",
    "name": "Access for my-worker",
    "destinations": [
      {
        "type": "preview_worker",
        "worker_id": "c81a2d22c29840ed9d61681a3270dbff"
      }
    ],
    "policies": [
      {
        "decision": "allow",
        "include": [
          {
            "email_domain": {
              "domain": "example.com"
            }
          }
        ]
      }
    ]
  }'
```

  Use destination `{ "type": "worker", "worker_id": "..." }` to protect production and previews.
- WebSocket limitation: Worker-level Access policies do not support WebSocket connections; upgrade requests to a Worker protected by a worker-level policy fail with `403`. For Workers using WebSockets (Durable Objects, real-time apps, RDP-over-WebSocket) use a hostname-based Access application.
- Hostname, Custom Domain, or path: create a self-hosted application (Zero Trust > Access > Applications) with the hostname or path as the application domain. Hostname-based Access protects only that exact URL (for example `my-worker.example.workers.dev`, `admin.example.com`, or `example.com/login`). Subdomain, multi-path, and wildcard matching follow the Access application paths docs.
- Make one Worker public when all Workers are protected: add a Worker-level bypass (Worker > Access > make public), i.e. a Worker-level application with destination `worker`, `worker_id`, and policy:

```json
"policies": [
  {
    "decision": "bypass",
    "include": [
      {
        "everyone": {}
      }
    ]
  }
]
```

  Only useful when account-level Access already protects the Worker.
- For advanced policy configuration (multiple identity providers, device posture, service tokens, policy ordering, custom login or block pages) edit the Access application in Zero Trust.
- `ctx.access`: available when Access authenticated a request that directly invokes the Worker; `undefined` otherwise. No extra configuration or JWT parsing needed. It is not propagated through service binding HTTP requests or RPC (the downstream Worker does not receive the caller's Access context). A `fetch()` subrequest to an Access-protected hostname with valid service token headers or a `CF_Authorization` cookie creates a new `ctx.access` for the downstream Worker (a newly authenticated context).
- Workers with Static Assets run behind an internal router Worker that does not pass `ctx.access` to the user Worker (Access still protects the app and assets). The Cloudflare Vite plugin can add `assets` to the generated deployment configuration (affecting frameworks such as TanStack Start).
- For a non-browser client over WARP, `ctx.access` only populates `aud`; the `Cf-Access-Jwt-Assertion` header stays complete and can be validated directly.
- Local testing: change identity fields and restart to test as another user; remove the `dev` block to make `ctx.access` `undefined`. With the config above, `localhost:8787` returns `Hello, admin@example.com`. The identity object accepts any field matching the production Access identity shape.
- Disable Access by disabling the rule in the Worker's Access tab or the Protect all Workers card, and delete the Access application that protects the Worker, all Workers, or the hostname or path.
- Hierarchy (most specific first): hostname or path-based Access, then Worker-level Access, then account-level Worker Access. Removing a more specific rule can reveal a broader one.
- The source page shows the `ctx.access` snippets twice (JavaScript and a second identical tab, likely TypeScript lost in conversion).
- Access policies and applications are Cloudflare Zero Trust features; see https://developers.cloudflare.com/cloudflare-one/access-controls/policies/ and the Access applications API https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/methods/create/.

## Related

- [Custom Domains](./custom-domains.md)
- [workers.dev](./workers-dev.md)
- [Routes and domains](./routing-overview.md)
- [Handlers and context](../handlers-context/README.md)
