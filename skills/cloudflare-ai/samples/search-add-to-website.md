---
source: https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/
---

# Add AI Search UI snippets to a React site

Create a web-crawler instance and drop a search bar, chat bubble, and search modal into a React app.

## Signature / Usage

Create an instance that crawls your domain:

```sh
npx wrangler ai-search create my-search --type web-crawler --source <YOUR_DOMAIN>
```

Check indexing progress:

```sh
npx wrangler ai-search stats my-search
```

Once indexing completes, test a query from the command line:

```sh
npx wrangler ai-search search my-search --query 'What is this site about?'
```

Enable **Settings > Public Endpoint** in the dashboard and copy the public endpoint ID. Then, in your website's project, install the snippet library:

```sh
npm i @cloudflare/ai-search-snippet
```

`src/App.tsx`:

```tsx
import type { CSSProperties } from "react";
import "@cloudflare/ai-search-snippet";

export default function App() {
	return (
		<div>
			<search-bar-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				placeholder="Search..."
				max-results={50}
				max-render-results={10}
				show-url="true"
				show-date="true"
			/>
			<chat-bubble-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				style={
					{
						"--search-snippet-primary-color": "#F6821F",
					} as CSSProperties
				}
			/>
			<search-modal-snippet
				api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
				placeholder="Search documentation..."
				shortcut="k"
				show-url="true"
				show-date="true"
			/>
		</div>
	);
}
```

`src/ai-search-snippet.d.ts` (declares the custom elements for JSX):

```ts
import type { HTMLAttributes } from "react";

// Register the snippet web components as valid JSX elements. The index
// signature allows their custom attributes (such as api-url and placeholder).
type SnippetElement = HTMLAttributes<HTMLElement> & {
	[attribute: string]: unknown;
};

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"search-bar-snippet": SnippetElement;
			"chat-bubble-snippet": SnippetElement;
			"search-modal-snippet": SnippetElement;
		}
	}
}
```

## Notes

- The public endpoint requires no authentication: only index content that is safe to expose, and enable rate limiting under Settings > Public Endpoint.
- Under **Authorized hosts** add each origin that embeds the snippets (for example `http://localhost:5173` for a Vite dev server, and the production origin later). This is CORS, which only restricts browsers.
- `<YOUR_DOMAIN>` must be a domain onboarded to your Cloudflare account. To index your own files without crawling, the source page creates the instance with `npx wrangler ai-search create my-search --type builtin` and uploads from the dashboard (the Wrangler commands reference lists only `r2` and `web-crawler` for `--type`).
- The snippets are framework-agnostic web components; importing the package registers them once.

## Related

- [Public endpoint usage](../references/ai-search/public-endpoint-usage.md)
- [Get started with Wrangler](../references/ai-search/get-started-wrangler.md)
