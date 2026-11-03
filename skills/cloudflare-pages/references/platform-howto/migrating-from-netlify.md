---
source: https://developers.cloudflare.com/pages/migrations/migrating-from-netlify/
---

# Migrating from Netlify to Pages

Move a Netlify site to Pages, including build settings, `_redirects`, `_headers`, forms and functions.

## Signature / Usage

Netlify function:

```js
exports.handler = async function (event, context) {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Hello World" }),
	};
};
```

Adapted (not in the official docs): the official Pages example is `onRequestPost(request)`, which takes the request instead of `context` and does not match the prose that says to export `onRequest(context)`; this version follows the prose and returns the same JSON. See Notes.

Pages Function:

```js
export async function onRequest(context) {
	return Response.json({ message: "Hello World" });
}
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Corrected from the official docs: the page's Pages Function was `export async function onRequestPost(request) { return new Response("Hello world"); }`; Functions receive a `context` object (`request`, `env`, `params`, `next`), and `onRequest` handles all methods.
- Get the build command and publish directory from Netlify **Site Settings** > **Build & Deploy** and use them when creating the Pages project; custom domain can match the Netlify one; update the DNS CNAME to your `<SUBDOMAIN>.pages.dev`.
- A `_redirects` file in the publish directory works as is. Redirects in `netlify.toml` must be moved into `_redirects` (the page calls it a folder; it is a file). Advanced redirect support is limited; above 2,000 static or 100 dynamic rules use Bulk Redirects. Header rules move to a `_headers` file (also a file). `_headers` is not applied to Pages Functions responses; redirects run before headers. The same files work with Workers static assets (see the cloudflare-workers skill, static-assets/migrate-from-netlify).
- Forms: remove `data-netlify="true"` and handle submissions in a Pages Function (see the Pages forms tutorial at https://developers.cloudflare.com/pages/tutorials/forms/). Netlify Forms are not supported.
- Netlify functions and Pages Functions both use a `functions` directory, but the syntax differs; Pages Functions run on Workers and provide middleware.
- `netlify.toml` can be deleted after its settings are migrated. Access management can move to Cloudflare Zero Trust.

## Related

- [Redirects](../configuration/redirects.md)
- [Headers](../configuration/headers.md)
- [Custom domains](../configuration/custom-domains.md)
