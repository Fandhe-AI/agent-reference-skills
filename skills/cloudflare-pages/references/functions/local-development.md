---
source: https://developers.cloudflare.com/pages/functions/local-development/
---

# Local development

Run and test a Pages project locally with `wrangler pages dev`, which serves static assets and runs Functions.

## Signature / Usage

```sh
npx wrangler pages dev <DIRECTORY-OF-ASSETS>
```

Serve over HTTPS with a self-signed certificate:

```sh
npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--local-protocol` | string (`https`) | http | Serve over HTTPS with a self-signed certificate. Also settable as `local_protocol` in the Wrangler configuration file. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). Full `wrangler pages dev` flags are in the cloudflare-wrangler skill (commands/pages.md).
- The dev server is by default at http://localhost:8788; press `b` to open the browser.
- With a Wrangler configuration file, `wrangler pages dev` can run without specifying a directory.
- Dev server values such as port, local protocol and ip can be set in the Wrangler file's local development settings.
- Attach bindings locally by following the Bindings page.

## Related

- [bindings.md](./bindings.md)
- [wrangler-configuration.md](./wrangler-configuration.md)
- [debugging-and-logging.md](./debugging-and-logging.md)
