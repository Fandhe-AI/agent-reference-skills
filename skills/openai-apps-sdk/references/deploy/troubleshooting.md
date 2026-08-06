# Troubleshooting

How to triage plugin issues — components failing to render, discovery missing prompts, auth loops — by isolating which layer is responsible: server, component, or ChatGPT client. Server, tool, and discovery checks apply to plugins in ChatGPT and Codex; UI, widget state, and client-authentication checks describe ChatGPT behavior specifically.

## Server-side issues

- **No tools listed**: confirm the server is running and connecting to the `/mcp` endpoint. If ports changed, update the connector URL and restart MCP Inspector.
- **Structured content only, no component**: confirm the tool descriptor sets `_meta.ui.resourceUri` to a registered HTML resource with `mimeType: "text/html;profile=mcp-app"` (ChatGPT also honors `_meta["openai/outputTemplate"]` as an optional compatibility alias), and that the resource loads without CSP errors.
- **Schema mismatch errors**: ensure Python/TypeScript models match the schema advertised in `outputSchema`; regenerate types after changes.
- **Slow responses**: components feel sluggish when tool calls exceed a few hundred milliseconds; profile server calls and cache results.

## Widget issues

- **Widget fails to load**: check the browser console (or MCP Inspector logs) for CSP violations or missing bundles; ensure the HTML contains the compiled JavaScript with all dependencies.
- **Drag-and-drop or editing doesn't persist**: if relying on ChatGPT's widget-state persistence, call `window.openai.setWidgetState` after each update and restore state from `window.openai.widgetState` on mount.
- **Layout problems on mobile**: inspect `window.openai.displayMode` and `window.openai.maxHeight` to adjust layout; avoid fixed heights or hover-only actions.

## Discovery and entry-point issues

- **Tool never triggers**: revisit metadata — rewrite descriptions with "Use this when…" phrasing, update starter prompts, retest against a golden prompt set.
- **Wrong tool selected**: add clarifying detail to similar tools or specify disallowed scenarios in the description; consider splitting large tools into smaller, purpose-built ones.
- **Launcher ranking feels off**: refresh directory metadata; ensure the plugin icon and descriptions match user expectations.

## Authentication problems

- **401 errors**: include a `WWW-Authenticate` header in the error response so ChatGPT restarts the OAuth flow; double-check issuer URLs and audience claims.
- **Client registration fails**: for CIMD, confirm the authorization server metadata includes `client_id_metadata_document_supported: true` and can fetch ChatGPT's client metadata document; for `private_key_jwt`, confirm the authorization server can fetch ChatGPT's public JWKS and validate the signed client assertion; for DCR, confirm the authorization server exposes `registration_endpoint` and newly created clients have at least one login connection enabled.
- **An existing connector returns `invalid_client`**: confirm the dynamically registered OAuth client still exists and the authorization server accepts its client secret (if any) — ChatGPT reuses these credentials, so restore rather than recreate. An expired access token requires a different fix.

## Deployment problems

- **ngrok tunnel times out**: restart the tunnel and verify the local server is running before sharing the URL; use a stable hosting provider with health checks for production.
- **Streaming breaks behind proxies**: ensure the load balancer or CDN allows server-sent events or streaming HTTP responses without buffering.

## When to escalate

If the above checks don't resolve the issue:

1. Collect logs (server, component console, ChatGPT tool call transcript) and screenshots.
2. Note the prompt issued and any confirmation messages.
3. Share details with the OpenAI partner contact for internal reproduction.

## Notes

- A crisp troubleshooting log shortens turnaround time and keeps the connector reliable for users.

## Related

- [Connect and Test](./connect-and-test.md)
- [Review Requirements](./review-requirements.md)
