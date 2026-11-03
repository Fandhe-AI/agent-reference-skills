---
source: https://developers.cloudflare.com/ai-search/get-started/wrangler/
---

# Get started: Wrangler CLI

Create and manage AI Search instances from the command line.

## Signature / Usage

```sh
npm install wrangler
wrangler ai-search create my-instance
wrangler ai-search create my-instance --type web-crawler --source developers.cloudflare.com
wrangler ai-search create my-instance --type r2 --source my-bucket
wrangler ai-search stats my-instance
wrangler ai-search search my-instance --query "What is Cloudflare?"
```

## Notes

- Without a data source the instance uses built-in storage; upload files via the dashboard or the Items REST API.
- `--type web-crawler` only crawls domains onboarded to the same Cloudflare account.
- The official page also lists `yarn`, `pnpm`, and `bun` install tabs; the `yarn install wrangler` form shown there is not a valid way to add a dependency, so use `yarn add wrangler`.
- Corrected from the official docs: the source shows `yarn install wrangler`; replaced by the standard add command.
- R2 data sources and `wrangler r2`: see the cloudflare-storage skill. Full flag list: wrangler-commands.md.

## Related

- [Wrangler commands](./wrangler-commands.md)
- [R2 data source](./data-source-r2.md)
- [Website data source](./data-source-website.md)
