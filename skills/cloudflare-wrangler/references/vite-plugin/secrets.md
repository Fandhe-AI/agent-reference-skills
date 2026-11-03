---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/
---

# Secrets

Secrets store sensitive information such as API keys and auth tokens. Deployed Workers set them via the dashboard or Wrangler CLI; in local development they come from a `.dev.vars` file.

## Signature / Usage

```sh
CLOUDFLARE_ENV=staging vite dev
```

With Cloudflare Environments this loads `.dev.vars.staging` if it exists; when it exists, `.dev.vars` is not loaded.

## Notes

- Corrected from the official docs: this page says `CLOUDFLARE_ENV=staging vite dev` loads `.dev.vars.staging` "if it exists and fall back to `.dev.vars`". The official Cloudflare Environments page of the same plugin docs (and Wrangler's secrets documentation) states that when `.dev.vars.<environment-name>` exists only it is loaded and `.dev.vars` is not, so all secrets must be defined per environment; the sentence was changed to match. `.dev.vars` falls through only when no environment-specific file exists.
- Do not commit `.dev.vars` / `.env` files; add `.dev.vars*` and `.env*` to `.gitignore`.
- `vite build` copies the relevant `.dev.vars` file to the output directory. It is used only by `vite preview` and is not deployed with the Worker.
- Full `.dev.vars` / `.env` loading rules, precedence and controlling environment variables: see cloudflare-environments.

## Related

- [cloudflare-environments.md](./cloudflare-environments.md)
