# Agentic review (experimentalReview)

Lets an agent summarize its UI changes with a curated selection of affected stories, giving you one focused view to review.

## Signature / Usage

Requirements: Storybook 10.5 or later, the `experimentalReview` feature flag enabled, and the MCP server running and connected to your agent (or an ADE plugin installed).

```ts
// .storybook/main.ts
features: {
  experimentalReview: true,
},
```

The agent creates the review with the `review-create` tool of the MCP development toolset, which returns the review-page URL.

## Notes

- Experimental; the experience may change in future releases.
- `experimentalReview` is enabled automatically when a Storybook ADE plugin is used.
- Open the review via the link from the agent, by requesting a review in a prompt, or via the review widget in the sidebar. The widget takes precedence over change detection filters when a review is available.
- The review is a curated selection of the most relevant stories, grouped into collections with titles and summaries, not a comprehensive list.
- Click a thumbnail for the story detail view (inspect, run tests if configured); use next/previous buttons to move through stories and "Back to review" to return.
- A banner indicates when the review may be stale; use the provided prompt to request a new review.
- Source: https://storybook.js.org/docs/ai/agentic-review (Storybook v10.6.2).

## Related

- [MCP server](./mcp-server.md)
- [Using Storybook with AI](./overview.md)
