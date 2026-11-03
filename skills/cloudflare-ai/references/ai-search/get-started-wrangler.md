---
source: https://developers.cloudflare.com/ai-search/get-started/wrangler/
---

# Get started: Wrangler CLI

Create and manage AI Search instances from the command line.

## Signature / Usage

Adapted (not in the official docs): `npm install wrangler` installs Wrangler locally, so the commands run it with `npx`; the official page calls bare `wrangler`. The three `create` lines are alternatives (they share the name `my-instance`), now marked as such. See Notes.

```sh
npm install wrangler

# Create the instance with ONE of the following (same name, so pick one):
# built-in storage,
npx wrangler ai-search create my-instance
# or a website as the data source,
npx wrangler ai-search create my-instance --type web-crawler --source developers.cloudflare.com
# or an R2 bucket as the data source.
npx wrangler ai-search create my-instance --type r2 --source my-bucket

npx wrangler ai-search stats my-instance
npx wrangler ai-search search my-instance --query "What is Cloudflare?"
```

## Notes

- The three `create` commands are alternatives for different data sources; running all of them fails on the duplicate name. Run one, then `stats` / `search`.
- Corrected from the official docs: after the local `npm install wrangler`, bare `wrangler` is not on `PATH` unless Wrangler is also installed globally; the commands use `npx wrangler`.
- Without a data source the instance uses built-in storage; upload files via the dashboard or the Items REST API.
- `--type web-crawler` only crawls domains onboarded to the same Cloudflare account.
- The official page also lists `yarn`, `pnpm`, and `bun` install tabs; the `yarn install wrangler` form shown there is not a valid way to add a dependency, so use `yarn add wrangler`.
- Corrected from the official docs: the source shows `yarn install wrangler`; replaced by the standard add command.
- R2 data sources and `wrangler r2`: see the cloudflare-storage skill. Full flag list: wrangler-commands.md.

## Related

- [Wrangler commands](./wrangler-commands.md)
- [R2 data source](./data-source-r2.md)
- [Website data source](./data-source-website.md)
