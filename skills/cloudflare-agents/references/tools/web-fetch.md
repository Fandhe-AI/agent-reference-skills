---
source: https://developers.cloudflare.com/agents/tools/web-fetch/
---

# Web fetch tool

A `web_fetch` tool that reads a URL, converts HTML/PDF/Office documents to Markdown, windows long pages, and enforces a request policy (host allow/block lists, redirects, byte limit, timeout).

## Signature / Usage

Requires a Workers AI binding for HTML and document conversion (`"remote": true` runs conversions against your account in local development):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai": {
    "binding": "AI",
    "remote": true
  }
}
```

```toml
[ai]
binding = "AI"
remote = true
```

AI SDK adapter (Pi Durable: `agents/webfetch/pi`; TanStack AI: `agents/webfetch/tanstack-ai`):

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { stepCountIs, streamText } from "ai";
import { webFetchTool } from "agents/webfetch/ai-sdk";

const tools = {
	web_fetch: webFetchTool({ binding: env.AI }),
};

const result = streamText({
	model,
	messages,
	tools,
	stopWhen: stepCountIs(5),
});
```

Restrict what the model may fetch:

```ts
import { webFetchTool } from "agents/webfetch/pi";

const readDocs = webFetchTool({
	binding: env.AI,
	allowedHosts: ["developers.cloudflare.com"],
	pageChars: 10_000,
	maxBytes: 1_000_000,
	timeoutMs: 15_000,
	maxRedirects: 3,
});
```

Other harnesses use `fetchWeb()`, `windowWebFetchPage()`, and `renderWebFetchPage()` from `agents/webfetch`:

```ts
import {
	fetchWeb,
	renderWebFetchPage,
	windowWebFetchPage,
	type WebFetchToolInput,
} from "agents/webfetch";

// Register this handler with your harness's tool interface.
// Forward the harness's cancellation signal when it provides one.
async function readUrl(
	input: WebFetchToolInput,
	env: { AI: Ai },
	signal?: AbortSignal,
) {
	const page = await fetchWeb(
		{ url: input.url, format: input.format },
		{ binding: env.AI, signal },
	);
	const output = windowWebFetchPage(page, {
		offset: input.offset,
		pageChars: 20_000,
	});
	return renderWebFetchPage(output);
}
```

## Options / Props

Model-chosen input: required `url`, optional nonnegative integer `offset`, optional `format` (`"auto"` or `"raw"`).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pageChars` | number | `20000` | Maximum characters in one tool result's content window. |
| `maxBytes` | number | `5000000` | Maximum response body bytes read before rejecting it. |
| `timeoutMs` | number | `30000` | Deadline in milliseconds, including redirects and conversion. |
| `maxRedirects` | number | `5` | Maximum redirects to follow; integers from 0 to 20. |
| `allowedHosts` | string[] | Any public host | Hostnames the tool may fetch. `*.example.com` matches subdomains, not `example.com` itself. |
| `blockedHosts` | string[] | None | Hostnames to reject, checked before `allowedHosts`. |
| `allowPrivateHosts` | boolean | `false` | Allows local and private hosts when `true`, for local development. |
| `binding` | Ai | — | Workers AI binding used for conversion. |
| `source` | WebFetchSource | — | Custom source instead of `binding`; it owns URL validation, host restrictions, byte limits, and redirects. |

## Notes

- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Requires Agents SDK 0.28.0 or later. Requests Markdown first (Markdown for Agents sites skip conversion); JSON is pretty-printed; Markdown and other text pass through.
- Results include a header (final URL, status, content type, character range, continuation offset) and wrap content in `<untrusted_web_content>`. The wrapper marks external content as data, not instructions, and is not a guarantee against prompt injection.
- SSRF: the built-in source rejects non-HTTP schemes, credentials in URLs, URLs over 2,000 characters, and HTTPS-to-HTTP redirects, and blocks private IP literals and local hostnames by default. It does not resolve DNS, so addresses behind public hostnames are not checked. Set `allowedHosts` for production agents; leave `allowPrivateHosts` off outside local development.
- Each tool call fetches the URL again (five windows = five fetches). Retain the `WebFetchPage` from `fetchWeb()` to reuse it.
- Makes GET requests without browser cookies, credentials, or custom headers. Bot challenges return `web_fetch_blocked`. Use the Browser tool for JavaScript-rendered content, logins, or screenshots.
- Errors use `WebFetchError` codes such as `web_fetch_timeout`, `web_fetch_too_large`, `web_fetch_unsupported_content_type` with a `retryable` field. Pi returns `ok: false` in `details`; AI SDK and TanStack AI adapters throw. Raw mode cannot return PDFs or binary documents; images, audio, and video are unsupported.
- Pi tool is `replay: "safe"`. With the AI SDK, pass the same `tools` to `convertToModelMessages(messages, { tools })` to keep the formatted header and wrapper.
- Workers AI Markdown Conversion belongs to the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); this page covers only the Agents SDK tool.

## Related

- [Web search](./web-search.md)
- [Browser](./browser.md)
