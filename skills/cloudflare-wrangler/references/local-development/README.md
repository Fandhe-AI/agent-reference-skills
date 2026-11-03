# local-development

| Name | Description | Path |
|------|-------------|------|
| Local development | Miniflare/workerd local dev, defaults, remote bindings, Access auth, remote proxy API, legacy `--remote` | [overview.md](./overview.md) |
| Supported bindings per development mode | Matrix of local simulation / remote binding / remote dev support per binding | [bindings-per-env.md](./bindings-per-env.md) |
| Environment variables and secrets | `.dev.vars` / `.env` files, per-environment files, precedence | [environment-variables.md](./environment-variables.md) |
| Adding local data | Populate local KV/R2/D1 with `--local`, `.wrangler/state`, `--persist-to` | [local-data.md](./local-data.md) |
| Share a local dev server | Cloudflare Tunnel from `wrangler dev` / Vite plugin | [local-dev-tunnels.md](./local-dev-tunnels.md) |
| Local Explorer | Browser UI/API for local bindings, Cron Trigger testing, traces and logs | [local-explorer.md](./local-explorer.md) |
| Developing with multiple Workers | Single vs multiple dev commands, `auxiliaryWorkers` | [multi-workers.md](./multi-workers.md) |
| Choosing between Wrangler & Vite | Capability comparison and guidance | [wrangler-vs-vite.md](./wrangler-vs-vite.md) |
