# Browser: Cookbook

Runnable browser examples grouped by use case. Each is a single self-contained file in the Box SDK repo (`packages/sdk/examples/browser`).

## Signature / Usage

```text
packages/sdk/examples/browser/agentic/01-in-box-agent.ts
packages/sdk/examples/browser/agentic/02-build-your-own-loop.ts
packages/sdk/examples/browser/automation/01-checkout-with-one-ai-step.ts
packages/sdk/examples/browser/automation/02-download-and-process.ts
packages/sdk/examples/browser/automation/03-upload-from-box.ts
packages/sdk/examples/browser/automation/04a-login-once-keep-alive.ts
packages/sdk/examples/browser/retrieval/01-catalog-extraction.ts
packages/sdk/examples/browser/retrieval/02-ai-compiled-scraper.ts
packages/sdk/examples/browser/retrieval/03-crawl-to-dataset.ts
packages/sdk/examples/browser/retrieval/04-evidence-pack.ts
packages/sdk/examples/browser/testing/01-playwright-migration.ts
packages/sdk/examples/browser/testing/02-test-your-own-app.ts
packages/sdk/examples/browser/testing/04-visual-regression.ts
```

## Options / Props

| Group | Example | Description |
|---|---|---|
| Agentic browsing | In-box agent | `box.agent.run` drives the browser through the chrome-devtools MCP and writes results to the box (needs an agent key; bills coding-agent tokens) |
| Agentic browsing | Build your own loop | Live `observe`, `act(action)`, `extract` loop with `extract` as stop check (AI) |
| Automation | Checkout with one AI step | Script deterministic steps, delegate the judgment call to a single `act`, assert the result |
| Automation | Download and process | Download lands on the box filesystem and is processed in place |
| Automation | Upload from box | Upload a box-generated file through a real form over CDP |
| Automation | Log in once, reuse session | Log in once into a keep-alive box; later scripts reuse the session |
| Retrieval | Catalog extraction | One `extract` call, schema-validated typed output, screenshot provenance (AI) |
| Retrieval | AI-compiled scraper | AI compiles selectors once; later runs scrape deterministically (AI, first run only) |
| Retrieval | Crawl to dataset | Crawl a client-rendered docs section into chunked JSONL via `tab.content()` |
| Retrieval | Evidence pack | Full-page captures plus hashed manifest, downloaded as one archive |
| Testing | Playwright migration | Existing Playwright test where only the launch line changes |
| Testing | Test your own app | Box hosts the app under test and browses it on its own localhost |
| Testing | Visual regression | Pixelmatch diffs against baselines stored on the box |

## Notes

- Source: https://upstash.com/docs/box/overall/browser/cookbook (fetched 2026-10-17; no version pin on the site).
- All examples need `UPSTASH_BOX_API_KEY`
- Examples marked AI use metered browser AI (`act`, `extract`, `observe`) and need a model provider key on the box or account; everything else runs with the Box key alone
- Base URL: https://github.com/upstash/box/tree/%40upstash/box%400.7.9/packages/sdk/examples/browser (pinned to tag @upstash/box@0.7.9; the docs page links main)

## Related

- [Browser Overview](./browser-overview.md)
- [Browser Connect](./browser-connect.md)
- [Browser AI Actions](./browser-ai-actions.md)
- [Browser Tabs](./browser-tabs.md)
