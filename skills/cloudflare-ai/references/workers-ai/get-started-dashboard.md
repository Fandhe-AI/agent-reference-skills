---
source: https://developers.cloudflare.com/workers-ai/get-started/dashboard/
---

# Get started: dashboard

Create a Workers AI application from the dashboard "LLM Chat App" template, then continue with Wrangler.

## Signature / Usage

```sh
npm create cloudflare@latest -- [<DIRECTORY>] --type=pre-existing
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [<DIRECTORY>] | string | — | Location for the downloaded Worker script. |
| --type | string | — | `pre-existing` downloads an existing Worker created in the dashboard. |

## Notes

- Dashboard steps: **Workers & Pages**, **Create application**, **Select a template** > **LLM Chat App**, **Deploy**, name the Worker, **Create and deploy**; preview on the `workers.dev` subdomain.
- Edit in the dashboard via **Edit Code**.
- After downloading with the CLI, local changes do not sync back to the dashboard; continue with the CLI.
- yarn: `yarn create cloudflare [<DIRECTORY>] --type=pre-existing`; pnpm: `pnpm create cloudflare@latest [<DIRECTORY>] --type=pre-existing`.
- Wrangler install and requirements: cloudflare-wrangler.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [REST API](./rest-api.md)
