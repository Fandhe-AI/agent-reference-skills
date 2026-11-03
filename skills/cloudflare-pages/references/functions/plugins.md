---
source: https://developers.cloudflare.com/pages/functions/plugins/, https://developers.cloudflare.com/pages/functions/plugins/community-plugins/
---

# Pages Plugins: using, authoring, community plugins

A Pages Plugin is a distributable bundle of Functions (routing, middleware, assets) that you mount in a project and configure through `pluginArgs`.

## Signature / Usage

Mount an installed plugin (default export is a function that takes the normal context):

```typescript
import staticFormInterceptorPlugin from "@cloudflare/static-form-interceptor";

export const onRequest = (context) => {
	return staticFormInterceptorPlugin({
		kv: context.env.FORM_KV,
		respondWith: async ({ formData }) => {
			// Could call email/notification service here
			const name = formData.get("name");
			return new Response(`Thank you for your submission, ${name}!`);
		},
	})(context);
};
```

Author a plugin: `package.json` build script and typings.

```json
{
	"name": "@cloudflare/static-form-interceptor",
	"main": "dist/index.js",
	"types": "index.d.ts",
	"files": ["dist", "index.d.ts", "tsconfig.json"],
	"scripts": {
		"build": "npx wrangler pages functions build --plugin --outdir=dist",
		"prepare": "npm run build"
	}
}
```

```typescript
export type PluginArgs = {
	kv: KVNamespace;
	respondWith: (args: { formData: FormData }) => Promise<Response>;
};

export default function (args: PluginArgs): PagesFunction;
```

Plugin implementation (`functions/_middleware.ts`). Adapted (not in the official docs): stores under the computed `key`; see Notes.

```typescript
class FormHandler {
	element(element) {
		const name = element.getAttribute("data-static-form-name");
		element.setAttribute("method", "POST");
		element.removeAttribute("action");
		element.append(
			`<input type="hidden" name="static-form-name" value="${name}" />`,
			{ html: true },
		);
	}
}

export const onRequestGet = async (context) => {
	// We first get the original response from the project
	const response = await context.next();

	// Then, using HTMLRewriter, we transform `form` elements with a `data-static-form-name` attribute, to tell them to POST to the current page
	return new HTMLRewriter()
		.on("form[data-static-form-name]", new FormHandler())
		.transform(response);
};

export const onRequestPost = async (context) => {
	// Parse the form
	const formData = await context.request.formData();
	const name = formData.get("static-form-name");
	const entries = Object.fromEntries(
		[...formData.entries()].filter(([name]) => name !== "static-form-name"),
	);

	// Get the arguments given to the Plugin by the developer
	const { kv, respondWith } = context.pluginArgs;

	// Store form data in KV under key `form-name:YYYY-MM-DDTHH:MM:SSZ`
	const key = `${name}:${new Date().toISOString()}`;
	context.waitUntil(kv.put(key, JSON.stringify(entries)));

	// Respond with whatever the developer wants
	const response = await respondWith({ formData });
	return response;
};
```

Chain plugins. Adapted (not in the official docs): `context.next()` and the documented `cloudflareAccess.JWT` data path; see Notes.

```typescript
import sentryPlugin from "@cloudflare/pages-plugin-sentry";
import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";
import adminDashboardPlugin from "@cloudflare/a-fictional-admin-plugin";

export const onRequest = [
	// Initialize a Sentry Plugin to capture any errors
	sentryPlugin({ dsn: "https://sentry.io/welcome/xyz" }),

	// Initialize a Cloudflare Access Plugin to ensure only administrators can access this protected route
	cloudflareAccessPlugin({
		domain: "https://test.cloudflareaccess.com",
		aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
	}),

	// Populate the Sentry plugin with additional information about the current user
	(context) => {
		const email =
			context.data.cloudflareAccess.JWT.payload?.email || "service user";

		context.data.sentry.setUser({ email });

		return context.next();
	},

	// Finally, serve the admin dashboard plugin, knowing that errors will be captured and that every incoming request has been authenticated
	adminDashboardPlugin(),
];
```

## Options / Props

### `wrangler pages functions build` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--plugin` | flag | — | Build a Pages Plugin rather than Functions for a project. |
| `--outdir` | string | — | Where to output the built Plugin. |
| `--external` | string | — | Avoid bundling external modules in the Plugin. |
| `--watch` | flag | — | Rebuild automatically on source changes. |

### Community plugins

| Name | Type | Default | Description |
|------|------|---------|-------------|
| pages-plugin-asset-negotiation | community | — | Negotiates with the client to serve an optimized format of an asset (https://github.com/Cherry/pages-plugin-asset-negotiation). |
| proxyflare-for-pages | community | — | Reverse proxy for ports/redirects/subpath mounting (https://github.com/flaregun-net/proxyflare-for-pages). |
| cloudflare-pages-plugin-rollbar | community | — | Captures exceptions below it in the execution chain and reports to Rollbar (https://github.com/hckr-studio/cloudflare-pages-plugin-rollbar). |
| cloudflare-pages-plugin-trpc | community | — | tRPC server as a Pages Function (https://github.com/toyamarinyon/cloudflare-pages-plugin-trpc). |
| pages-plugin-twind | community | — | Injects Tailwind CSS styles into HTML based on used classes (https://github.com/helloimalastair/twind-plugin). |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Plugin file layout: `functions/index.ts` for a single route, `functions/[[path]].ts` to serve everything beyond a path, `functions/_middleware.ts` to intercept and fall back to other Functions or assets. Do not include the mounted path in the plugin's file structure. Handlers receive an extra `pluginArgs` property.
- Add `dist/` to `.gitignore`; publish `dist/`, `index.d.ts` and a `README.md`. Plugin testing tooling is still in progress; test via an example project with `wrangler pages dev` and the bindings the plugin expects.
- Plugins can be chained in an array; middleware higher in the filesystem runs first.
- Corrected from the official docs: the plugin stored data under `name` (the form name) with `kv.put(name, …)` although the comment and computed `key` say entries are stored per timestamped key; each submission would overwrite the last. It now uses `key`.
- Corrected from the official docs: the chain example called bare `next()` (undefined) and read `context.data.cloudflareAccessJWT`; the Cloudflare Access plugin exposes `data.cloudflareAccess.JWT`, and the call is `context.next()`.
- The interceptor writes the unescaped `data-static-form-name` attribute into HTML; it comes from your own markup, so keep it a trusted value.
- The plugin author snippet's `wrangler pages functions build` command is documented in the cloudflare-wrangler skill (commands/pages.md).

## Related

- [plugins-security.md](./plugins-security.md)
- [plugins-integrations.md](./plugins-integrations.md)
- [middleware.md](./middleware.md)
- [event-context.md](./event-context.md)
