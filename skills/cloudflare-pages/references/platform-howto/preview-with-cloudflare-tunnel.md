---
source: https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/
---

# Preview Local Projects with Cloudflare Tunnel

Share a locally running site over a temporary public URL with a `cloudflared` Quick Tunnel; no Cloudflare account needed.

## Signature / Usage

```sh
cloudflared --version
```

With a dev server running (for example Vite on port `5173`):

```sh
cloudflared tunnel --url http://localhost:5173
```

The output includes a randomly generated URL such as `https://seasonal-deck-organisms-sf.trycloudflare.com`, which forwards through Cloudflare's network to `localhost:5173`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--url` | string | — | Local service URL and port to expose. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- A Quick Tunnel exposes your local server to anyone with the URL; stop it when finished and do not expose sensitive services.
- Install `cloudflared` on Windows, Linux or macOS from the Cloudflare Tunnel downloads page (https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).
- Pages provides separate preview URLs for branches and commits; the tunnel is for sharing an in-development app. Sample log output and version numbers in the source are from 2021 and are omitted.
- Next steps in the source: a configuration file for complex routing, a DNS record for a long-lived tunnel, and Cloudflare Access to protect tunnels.

## Related

- [Preview deployments](../configuration/preview-deployments.md)
