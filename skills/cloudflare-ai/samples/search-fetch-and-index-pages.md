---
source: https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/
---

# Fetch rendered web pages and index them

Render a page with the Browser Run binding, upload the HTML to an instance's built-in storage, and search it from the same Worker.

## Signature / Usage

Bindings (`wrangler.jsonc`). `quickAction` needs a compatibility date of `2026-03-24` or later:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "fetch-and-index",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "browser": {
    "binding": "BROWSER",
    "remote": true
  },
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

`src/index.ts` (`API_TOKEN` is a secret; `ALLOWED_HOSTS` is a comma-separated secret or var):

Adapted (not in the official docs): the official Worker accepts any `?url=` from any caller, which makes it an open fetch proxy. This version requires a bearer token (fail closed), allows only `https` URLs on the default port whose hostname is listed in `ALLOWED_HOSTS`, rejects an unparsable URL or Browser Run body with a 4xx/502 instead of throwing, and rejects pages over the 4 MB per-item upload limit before uploading. See Notes.

```ts
export interface Env {
	BROWSER: BrowserRun;
	AI_SEARCH: AiSearchNamespace;
	API_TOKEN?: string;
	ALLOWED_HOSTS?: string;
}

// The instance that indexes the fetched page.
const INSTANCE_NAME = "my-instance";

function isAuthorized(request: Request, token: string | undefined): boolean {
	if (!token) return false; // fail closed when the secret is unset
	const enc = new TextEncoder();
	const given = enc.encode(request.headers.get("authorization") ?? "");
	const expected = enc.encode(`Bearer ${token}`);
	return (
		given.byteLength === expected.byteLength &&
		crypto.subtle.timingSafeEqual(given, expected)
	);
}

// Build a stable item key that ends in .html, so AI Search converts the HTML
// to Markdown before indexing it.
function itemKey(pageUrl: URL): string {
	const slug = `${pageUrl.hostname}${pageUrl.pathname}`
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return `${slug || "index"}.html`;
}

export default {
	async fetch(request, env): Promise<Response> {
		if (!isAuthorized(request, env.API_TOKEN)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);

		// Search route: query the indexed content and return the matching chunks.
		if (url.pathname === "/search") {
			const query = url.searchParams.get("q");
			if (!query) {
				return new Response("Add a ?q= query parameter", { status: 400 });
			}
			const results = await env.AI_SEARCH.get(INSTANCE_NAME).search({ query });
			return Response.json({
				query: results.search_query,
				results: results.chunks.map((chunk) => ({
					key: chunk.item.key,
					score: chunk.score,
					text: chunk.text,
				})),
			});
		}

		// Index route: fetch a URL's rendered HTML and index it.
		const target = url.searchParams.get("url");
		if (!target) {
			return new Response(
				"Add a ?url= parameter to index a page, or use /search?q= to search",
				{ status: 400 },
			);
		}

		let pageUrl: URL;
		try {
			pageUrl = new URL(target);
		} catch {
			return new Response("Invalid url", { status: 400 });
		}
		const allowed = (env.ALLOWED_HOSTS ?? "")
			.split(",")
			.map((host) => host.trim().toLowerCase())
			.filter(Boolean);
		if (
			pageUrl.protocol !== "https:" ||
			pageUrl.port !== "" ||
			!allowed.includes(pageUrl.hostname)
		) {
			return new Response("URL not allowed", { status: 403 });
		}

		// Fetch the fully rendered HTML with the Browser Run /content endpoint.
		// networkidle2 waits until the page has no more than two network
		// connections for at least 500 ms, giving client-side JavaScript time
		// to render the content.
		const response = await env.BROWSER.quickAction("content", {
			url: pageUrl.toString(),
			gotoOptions: {
				waitUntil: "networkidle2",
				timeout: 30000,
			},
		});

		if (!response.ok) {
			const detail = (await response.text()).slice(0, 500);
			return new Response(
				`Browser Run failed with ${response.status}: ${detail}`,
				{ status: 502 },
			);
		}

		// The /content endpoint returns a JSON envelope with the rendered HTML
		// in the result field.
		let data: { success?: boolean; result?: unknown };
		try {
			data = await response.json();
		} catch {
			return new Response("Browser Run returned invalid JSON", { status: 502 });
		}

		if (!data.success || typeof data.result !== "string") {
			return new Response("Browser Run returned an unsuccessful response", {
				status: 502,
			});
		}

		const html = data.result;

		// Uploaded content is limited to 4 MB per item; measure in bytes.
		if (new TextEncoder().encode(html).byteLength > 4 * 1024 * 1024) {
			return new Response("Page is larger than 4 MB", { status: 413 });
		}

		// Upload the rendered HTML to built-in storage. uploadAndPoll waits until
		// the page is indexed and searchable.
		const item = await env.AI_SEARCH.get(INSTANCE_NAME).items.uploadAndPoll(
			itemKey(pageUrl),
			html,
			{ timeoutMs: 60_000 },
		);

		return Response.json({ key: item.key, status: item.status });
	},
} satisfies ExportedHandler<Env>;
```

Optional: define custom metadata fields on the instance, then pass `metadata` in the upload options (replacing the upload call in the handler above; `html` and `pageUrl` are the handler's variables).

```sh
npx wrangler ai-search create my-instance --type builtin --custom-metadata title:text --custom-metadata section:text
```

```ts
const item = await env.AI_SEARCH.get(INSTANCE_NAME).items.uploadAndPoll(
	itemKey(pageUrl),
	html,
	{ timeoutMs: 60_000, metadata },
);
```

Secrets set with `npx wrangler secret put` apply to the deployed Worker only. For `wrangler dev`, put `API_TOKEN="<random-token>"` and `ALLOWED_HOSTS="example.com"` in a `.dev.vars` file in the project root (gitignored), then start a local development server:

```sh
npx wrangler dev
```

In another terminal, index a page on an allowed host and search it:

Adapted (not in the official docs): the requests add the bearer token the adapted Worker requires; `example.com` must be listed in `ALLOWED_HOSTS`. See Notes.

```sh
curl -H "Authorization: Bearer <TOKEN>" "http://localhost:8787/?url=https://example.com/"
curl -H "Authorization: Bearer <TOKEN>" "http://localhost:8787/search?q=what+is+this+domain+for"
```

## Notes

- Adapted from the official docs: bearer-token auth (fail closed), https-only on the default port, a hostname allowlist, `try`/`catch` around `new URL()` and `response.json()`, and a byte-size check against the 4 MB per-item limit before upload; the official page only cautions that fetching arbitrary URLs can become an open proxy. The allowlist checks the requested URL only; Browser Run follows the page's own redirects and subresource loads, so list only hosts you control. Set `ALLOWED_HOSTS` (for example `example.com`) and `API_TOKEN` as secrets; local values go in `.dev.vars`, kept out of git.
- The `.html` item key makes AI Search convert HTML to Markdown before indexing, dropping boilerplate such as header and footer.
- Uploaded content is limited to 4 MB per item. An instance supports up to five custom metadata fields (`text`, `number`, `boolean`, `datetime`); changing the schema re-indexes existing documents.
- The metadata snippet assumes a `metadata: Record<string, string>` built beforehand (the official page extracts it with the Browser Run `/json` endpoint; extraction is best-effort).
- `--type builtin` follows the source page; the Wrangler reference lists only `r2` and `web-crawler` for `--type`, so omit `--type` if your Wrangler version rejects it.

## Related

- [Items Workers binding](../references/ai-search/items-workers-binding.md)
- [Instance methods](../references/ai-search/instance-methods.md)
- [Bindings configuration](../references/ai-search/bindings-configuration.md)
