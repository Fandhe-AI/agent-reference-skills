---
source: https://developers.cloudflare.com/agents/examples/browser-agent/
---

# Browser extraction with Puppeteer

Agent method that renders pages with Browser Run through Puppeteer and asks Workers AI to extract structured data.

## Signature / Usage

```sh
npm i -D @cloudflare/puppeteer
```

```jsonc
{
	"ai": {
		"binding": "AI",
	},
	"browser": {
		"binding": "BROWSER",
	},
}
```

Adapted (not in the official docs): `Agent` import added, https-only URL check with a host allowlist, browser closed in `finally`, and page content truncated before it is sent to the model (see Notes).

```ts
import { Agent } from "agents";
import puppeteer from "@cloudflare/puppeteer";

interface Env {
	BROWSER: Fetcher;
	AI: Ai;
}

// Hosts this agent may render (placeholder).
const ALLOWED_HOSTS = new Set(["example.com"]);

export class MyAgent extends Agent<Env> {
	async browse(browserInstance: Fetcher, urls: string[]) {
		const responses: unknown[] = [];
		for (const url of urls) {
			const target = new URL(url);
			if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
				throw new Error(`URL not allowed: ${url}`);
			}

			const browser = await puppeteer.launch(browserInstance);
			try {
				const page = await browser.newPage();
				await page.goto(target.href);

				await page.waitForSelector("body");
				const bodyContent = (
					await page.$eval("body", (element) => element.innerHTML)
				).slice(0, 20000);

				const resp = await this.env.AI.run("@cf/zai-org/glm-4.7-flash", {
					messages: [
						{
							role: "user",
							content: `Return a JSON object with the product names, prices and URLs from the website content below. <content>${bodyContent}</content>`,
						},
					],
				});

				responses.push(resp);
			} finally {
				await browser.close();
			}
		}

		return responses;
	}
}
```

Call it from server code with the binding, for example `agent.browse(this.env.BROWSER, ["https://example.com"])`.

## Notes

- Corrected from the official docs: `browser.close()` was skipped when `goto` / `waitForSelector` threw, leaking a browser session; it now runs in `finally`. The page also omitted the `Agent` import and typed `responses` implicitly.
- Adapted from the official docs (safety hardening): the URL list is caller-supplied, so an `https:` scheme check and a host allowlist (`ALLOWED_HOSTS`, `example.com` is a placeholder) were added, matching the `fetch_page` tool in the Pi harness reference. A page can still navigate or redirect elsewhere after load, so do not mark `browse` as `@callable()` for untrusted clients. The 20,000-character truncation is an arbitrary cap to bound model input.
- Fetched page HTML is untrusted and is interpolated into the prompt, so it can carry prompt injection; treat the model output as untrusted data.
- Use this when you want deterministic browser control; for LLM-driven CDP use the browser agent tools sample. The page also describes Browserbase via `puppeteer.connect` with an API key in the WebSocket URL; it is not reproduced here because it places a secret in a URL.

## Related

- [Browser](../references/tools/browser.md)
- [Browser agent tools](./browser-agent-tools.md)
