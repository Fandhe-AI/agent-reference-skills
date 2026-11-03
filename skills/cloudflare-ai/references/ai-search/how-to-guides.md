---
source: https://developers.cloudflare.com/ai-search/how-to/, https://developers.cloudflare.com/ai-search/how-to/nlweb/
---

# How-to guides index

Step-by-step guides on the official site. This index lists them with the pages in this category that cover the underlying APIs.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/how-to/nlweb/

```html
<!-- Add css on head -->
<link rel="stylesheet" href="https://ask.example.com/nlweb-dropdown-chat.css" />
<link rel="stylesheet" href="https://ask.example.com/common-chat-styles.css" />

<!-- Add container on body -->
<div id="docs-search-container"></div>

<!-- Include JavaScript -->
<script type="module">
	import { NLWebDropdownChat } from "https://ask.example.com/nlweb-dropdown-chat.js";

	const chat = new NLWebDropdownChat({
		containerId: "docs-search-container",
		site: "https://ask.example.com",
		placeholder: "Search for docs...",
		endpoint: "https://ask.example.com",
	});
</script>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Add search to your website | Beginner | — | Prebuilt UI snippets; see ui-snippets.md. https://developers.cloudflare.com/ai-search/how-to/add-search-to-your-website/ |
| Connect to an MCP client | Beginner | — | See mcp.md. |
| Create a simple search engine | Beginner | — | Query an instance with the binding; see get-started-workers.md. https://developers.cloudflare.com/ai-search/how-to/simple-search-engine/ |
| Multitenancy | Intermediate | — | See multitenancy.md. |
| Search multiple sources at once | Intermediate | — | Shared plus tenant-specific knowledge base in one query; see search.md (cross-instance). https://developers.cloudflare.com/ai-search/how-to/search-multiple-sources/ |
| Fetch and index single web pages | Intermediate | — | Browser Run renders a page, then index and search. https://developers.cloudflare.com/ai-search/how-to/fetch-and-index-web-pages/ |
| Bring your own generation model | Intermediate | — | See bring-your-own-generation-model.md. |
| Show source citations | Intermediate | — | Chunk citations in answers. https://developers.cloudflare.com/ai-search/how-to/chunk-citations/ |
| Human-in-the-loop knowledge base updates | Advanced | — | Agent proposes documents, human approves, with rollback. https://developers.cloudflare.com/ai-search/how-to/human-in-the-loop-knowledge-base/ |
| Talk to your knowledge base | — | — | https://developers.cloudflare.com/ai-search/how-to/talk-to-your-knowledge-base/ |
| NLWeb | — | — | Deploys an NLWeb Worker with `/ask` and `/mcp`. |

## Notes

- NLWeb is a public preview (contact nlweb@cloudflare.com for production). Enable via the instance **Settings** > **NLWeb Worker** with a Website data source; to customize, deploy the NLWeb Worker template and set `RAG_ID` to the AI Search instance name. NLWeb is an open Microsoft project defining `/ask` and `/mcp`.
- Guides not distilled here (add-search-to-your-website, simple-search-engine, search-multiple-sources, fetch-and-index-web-pages, chunk-citations, talk-to-your-knowledge-base, human-in-the-loop-knowledge-base) were not reproduced to keep this category compact; consult the linked official pages for full code.

## Related

- [Multitenancy](./multitenancy.md)
- [MCP endpoint](./mcp.md)
- [UI snippets](./ui-snippets.md)
- [Agent integrations](./agent-sdks.md)
