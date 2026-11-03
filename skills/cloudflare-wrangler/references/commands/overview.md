---
source: https://developers.cloudflare.com/workers/wrangler/commands/
---

# Commands overview

Wrangler offers a number of commands to manage your Cloudflare Workers. The core commands for creating, developing, and deploying Workers (`wrangler dev`, `wrangler deploy`, `wrangler versions`, and more) are on the Workers commands page.

## Signature / Usage

```txt
wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

Since Cloudflare recommends installing Wrangler locally in your project (rather than globally), the way to run Wrangler depends on your package manager.

```sh
npx wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
yarn wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
pnpm wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

You can add Wrangler commands that you use often as scripts in your project's `package.json` file:

```json
{
  ...
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev"
  }
  ...
}
```

You can then run them using your package manager of choice:

```sh
npm run deploy
yarn run deploy
pnpm run deploy
```

## Notes

- The official page shows each example as npm / yarn / pnpm tabs; in this reference only the `npx` form is shown for per-command examples. Substitute `yarn wrangler` or `pnpm wrangler` as needed.

## Related

- [Workers](./workers.md)
- [General commands](./general.md)
- [Artifacts](./artifacts.md)
- [Basin Pipelines](./pipelines.md)
- [Browser](./browser.md)
- [Certificates](./certificates.md)
- [Containers](./containers.md)
- [D1](./d1.md)
- [Flagship](./flagship.md)
- [Hyperdrive](./hyperdrive.md)
- [KV](./kv.md)
- [Pages](./pages.md)
- [Queues](./queues.md)
- [R2](./r2.md)
- [Secrets Store](./secrets-store.md)
- [Tunnel](./tunnel.md)
- [Vectorize](./vectorize.md)
- [VPC](./vpc.md)
- [Workers for Platforms](./workers-for-platforms.md)
- [Workflows](./workflows.md)
