---
source: https://developers.cloudflare.com/pages/functions/plugins/cloudflare-access/, https://developers.cloudflare.com/pages/functions/plugins/stytch/, https://developers.cloudflare.com/pages/functions/plugins/hcaptcha/, https://developers.cloudflare.com/pages/functions/plugins/turnstile/
---

# Security plugins: Cloudflare Access, Stytch, hCaptcha, Turnstile

Official Pages Plugins that validate identity or human verification: `@cloudflare/pages-plugin-cloudflare-access`, `-stytch`, `-hcaptcha`, `-turnstile` (install with `npm i <package>`; yarn/pnpm/bun equivalents work).

## Signature / Usage

Cloudflare Access (rejects failed validation with `403`):

```typescript
import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction = cloudflareAccessPlugin({
	domain: "https://test.cloudflareaccess.com",
	aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
});
```

Read the validated JWT payload and look up identity:

```typescript
import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
	data,
}) => {
	const identity = await data.cloudflareAccess.JWT.getIdentity();

	return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

`getIdentity` and login URL helpers. Adapted (not in the official docs): the long sample JWT is replaced by a placeholder; see Notes.

```typescript
import { getIdentity } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest: PagesFunction = async ({ data }) => {
	const identity = await getIdentity({
		jwt: "<ACCESS_JWT>",
		domain: "https://test.cloudflareaccess.com",
	});

	return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

```typescript
import { generateLoginURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest = () => {
	const loginURL = generateLoginURL({
		redirectURL: "https://example.com/greet",
		domain: "https://test.cloudflareaccess.com",
		aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
	});

	return new Response(null, {
		status: 302,
		headers: { Location: loginURL },
	});
};
```

```typescript
import { generateLogoutURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest = () =>
	new Response(null, {
		status: 302,
		headers: {
			Location: generateLogoutURL({
				domain: "https://test.cloudflareaccess.com",
			}),
		},
	});
```

Stytch. Adapted (not in the official docs): credentials come from `env` instead of string literals.

```typescript
import stytchPlugin from "@cloudflare/pages-plugin-stytch";
import { envs } from "@cloudflare/pages-plugin-stytch/api";

export const onRequest: PagesFunction<{
	STYTCH_PROJECT_ID: string;
	STYTCH_SECRET: string;
}> = (context) => {
	return stytchPlugin({
		project_id: context.env.STYTCH_PROJECT_ID,
		secret: context.env.STYTCH_SECRET,
		env: envs.live,
	})(context);
};
```

hCaptcha (the keys shown are hCaptcha's public test values):

```typescript
import hCaptchaPlugin from "@cloudflare/pages-plugin-hcaptcha";

export const onRequestPost: PagesFunction[] = [
	hCaptchaPlugin({
		secret: "0x0000000000000000000000000000000000000000",
		sitekey: "10000000-ffff-ffff-ffff-000000000001",
	}),
	async (context) => {
		// Request has been validated as coming from a human

		const formData = await context.request.formData();

		// Store user credentials

		return new Response("Successfully registered!");
	},
];
```

Turnstile. Adapted (not in the official docs): the secret is read from `env` (the official primary example embeds a demo secret and keeps the env form commented out); see Notes.

```typescript
import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

/**
 * POST /api/submit-with-plugin
 */

export const onRequestPost: PagesFunction<{ SECRET_KEY: string }>[] = [
	(context) => turnstilePlugin({ secret: context.env.SECRET_KEY })(context),
	async (context) => {
		// Request has been validated as coming from a human
		const formData = await context.request.formData();
		// Additional solve metadata data is available at context.data.turnstile
		return new Response(
			`Successfully verified! ${JSON.stringify(context.data.turnstile)}`,
		);
	},
];
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Access `domain` | string | — | Cloudflare Access account domain. |
| Access `aud` | string | — | Policy audience to validate against. |
| Access `getIdentity({ jwt, domain })` | function | — | Returns a Promise of the object from `/cdn-cgi/access/get-identity`. |
| Access `generateLoginURL({ redirectURL, domain, aud })` | function | — | Builds a login URL. |
| Access `generateLogoutURL({ domain })` | function | — | Builds a logout URL. |
| Stytch `project_id` | string | — | Mandatory. From the Stytch dashboard. |
| Stytch `secret` | string | — | Mandatory. From the Stytch dashboard. |
| Stytch `env` | string | — | Mandatory. `envs.test` or `envs.live`. |
| Stytch `session_token` / `session_jwt` | string | cookie `session_token` | Optional override for how the session is identified. |
| Stytch `session_duration_minutes` | number | — | Optional. Extends session lifetime. |
| hCaptcha `secret` | string | — | Mandatory. From the hCaptcha dashboard. |
| hCaptcha `sitekey` | string | — | Optional. |
| hCaptcha / Turnstile `response` | string | token from `h-captcha-response` / `cf-turnstile-response` in a multipart form | Token to verify. |
| hCaptcha / Turnstile `remoteip` | string | `CF-Connecting-IP` header | Requester IP. |
| hCaptcha / Turnstile `onError` | function | human-readable error Response | Takes context, returns a Promise of a Response. |
| Turnstile `secret` | string | — | Mandatory. From the Turnstile dashboard. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Plugin results are placed on `data`: `data.cloudflareAccess.JWT.payload` (fields differ between identity authorizations such as a browser user and non-identity ones such as a service token), `data.stytch.session`, `data.hCaptcha` (hCaptcha response object), `context.data.turnstile` (Turnstile Siteverify response). They are available in subsequent Functions, including `onError`.
- The hCaptcha and Turnstile plugins expose a single route wherever mounted (for example `functions/register.ts` validates `/register`). Turnstile verifies the `cf-turnstile-response` POST parameter.
- Adapted from the official docs: the Access `getIdentity` example contained a full sample JWT literal; use the request's real JWT (for example the `CF-Access-Jwt-Assertion` header) instead. Stytch and Turnstile secrets are read from `env` rather than embedded; the official Stytch text recommends KV for the secret. The Turnstile demo secret in the official code is a public demo key; never ship a real secret in source.
- hCaptcha's `0x00…` secret and `10000000-ffff-…` sitekey are test values; use real keys from the hCaptcha dashboard, stored as secrets.

## Related

- [plugins.md](./plugins.md)
- [plugins-integrations.md](./plugins-integrations.md)
- [bindings-env-secrets.md](./bindings-env-secrets.md)
