---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/
---

# UI snippets

Open-source web components (github.com/cloudflare/ai-search-snippet; playground at https://search.ai.cloudflare.com/) for search and chat backed by a public endpoint.

## Signature / Usage

```html
<!doctype html>
<html>
	<head>
		<script
			type="module"
			src="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/assets/v0.0.25/search-snippet.es.js"
		></script>
	</head>
	<body>
		<search-bar-snippet
			api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
			placeholder="Search..."
			max-results="10"
		></search-bar-snippet>
	</body>
</html>
```

React / Next.js:

```tsx
import "@cloudflare/ai-search-snippet";

export default function App() {
	return (
		<search-bar-snippet
			api-url="https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/"
			placeholder="Search..."
		/>
	);
}
```

Styling:

```css
search-bar-snippet {
	--search-snippet-primary-color: #f6821f;
	--search-snippet-border-radius: 12px;
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<search-bar-snippet>` | component | — | Inline search bar with dropdown results. |
| `<search-modal-snippet>` | component | — | Modal opened with Cmd/Ctrl+K. |
| `<chat-bubble-snippet>` | component | — | Floating chat bubble. |
| `<chat-page-snippet>` | component | — | Full-page chat with history. |
| `api-url` | attribute | — | Required; public endpoint URL. |
| `placeholder` | attribute | — | Input placeholder. |
| `max-results` | attribute | — | Maximum results to request. |
| `theme` | attribute | `auto` | `light`, `dark`, `auto`. |
| `hide-branding` | attribute | — | Hide Cloudflare branding. |
| `translations` | attribute | — | Override UI strings. |
| `chat-query-rewrite` | attribute | — | Chat components: rewrite follow-ups into standalone queries. |

## Notes

- Requires the public endpoint to be enabled. The versioned asset path (`v0.0.25`) comes from the official docs example; use the script tag from the playground (error `60001` for an outdated version).
- For local testing add your origin (e.g. `http://localhost:3000`) under **Authorized hosts**; replace any `*` with the production origin before deploying. CORS is not access control.
- Vue works the same way: `import "@cloudflare/ai-search-snippet";` and bind `:api-url`.
- Behind Cloudflare Access these stop working for public visitors.

## Related

- [Public endpoint settings](./public-endpoint-settings.md)
- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
