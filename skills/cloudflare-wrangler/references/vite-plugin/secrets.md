---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/
---

# Secrets

Secrets store sensitive information such as API keys and auth tokens. Deployed Workers set them via the dashboard or Wrangler CLI; in local development they come from a `.dev.vars` file.

## Signature / Usage

```sh
CLOUDFLARE_ENV=staging vite dev
```

With Cloudflare Environments this loads `.dev.vars.staging` if it exists and falls back to `.dev.vars`.

## Notes

- `vite build` copies the relevant `.dev.vars` file to the output directory. It is used only by `vite preview` and is not deployed with the Worker.
- Full `.dev.vars` / `.env` loading rules, precedence and controlling environment variables: see cloudflare-environments.

## Related

- [cloudflare-environments.md](./cloudflare-environments.md)
