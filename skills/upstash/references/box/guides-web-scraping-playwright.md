# Guide: Scrape Dynamic Websites with Playwright

Use Upstash Box to run Playwright against a JavaScript-heavy site, scrape structured data, and pull results back — because a box is a real Linux container (not a restricted serverless runtime), Chromium and its system dependencies install exactly like on a laptop.

## Signature / Usage

```typescript
import { Agent, Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: { harness: Agent.ClaudeCode, model: "anthropic/claude-sonnet-4-6" },
})

await box.exec.command("npm init -y && npm install playwright")
await box.exec.command("npx playwright install chromium --with-deps")

const run = await box.agent.run({
  prompt: `
Write a Node.js script that uses Playwright to scrape the top 10 posts from
https://news.ycombinator.com/show and save the result as JSON to
/workspace/home/scraped_data.json. Then run it.`,
})

const raw = await box.files.read("/workspace/home/scraped_data.json")
const dataset = JSON.parse(raw)

await box.delete()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `npx playwright install chromium --with-deps` | — | `--with-deps` pulls in the Linux system libraries Chromium needs via `apt-get` |
| `box.snapshot({ name })` | `string` | Snapshot after installing Chromium so future runs skip the setup cost |
| `Box.fromSnapshot(id)` | `string` | Restores a pre-warmed box with Chromium already installed |

## Notes

- Boxes also ship a managed, pre-installed browser (`browser: true`) — for that path, drive Chromium through the SDK directly or connect Playwright over CDP, skipping this guide's manual install step (see Browser Overview)
- `npx playwright install chromium --with-deps` is slow (streams/unpacks OS packages); snapshot the box once it's ready and restore from that snapshot for subsequent scrape jobs instead of reinstalling every time

## Related

- [Browser Overview](./browser-overview.md)
- [Browser: Connect over CDP](./browser-connect.md)
- [Snapshots](./snapshots.md)
