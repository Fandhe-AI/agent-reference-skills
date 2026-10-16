# Remote Caching

## Usage

Shares task cache artifacts across machines and CI systems. When inputs are identical, duplicate work is prevented.

The standard Turborepo cache lives on the local machine only, so developers, teammates, and CI systems each end up re-running the same tasks independently. Remote Caching solves this by sharing cache artifacts through a central location.

```bash
# Step 1: authenticate
turbo login

# For SSO
npx turbo login --sso-team=team-name

# Step 2: link the repository
turbo link

# Step 3: verify it works
rm -rf ./.turbo/cache
turbo run build
```

## Options / Props

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| Vercel Remote Cache (managed) | implementation | — | Free on all plans; usable even without hosting the app on Vercel |
| Self-hosted | implementation | — | Custom implementation on any HTTP server that satisfies the Turborepo API spec |

## Notes

- Artifact signature verification supports HMAC-SHA256:

```json
{
  "remoteCache": {
    "signature": true
  }
}
```

- Set the secret key via the `TURBO_REMOTE_CACHE_SIGNATURE_KEY` environment variable. Turborepo verifies signatures on download; artifacts that fail verification are ignored and treated as a cache miss.
- Remote Caching is optional. Turborepo treats logs as artifacts, so be careful what tasks print, and make sure environment variables are accounted for in hashing before enabling it.
- Vercel Remote Cache is free on all plans even if apps are not hosted on Vercel; when building and hosting on Vercel it is set up automatically. If the cache uses single sign-on, run `npx turbo login --sso-team=team-name` to get a token with the correct privileges.
- Self-hosting: any HTTP server meeting the Remote Caching API specification (OpenAPI spec; all versions of `turbo` are compatible with the `v8` endpoints). Log in with `turbo login --manual` to provide API URL, team, and token.
  ```bash
  turbo login --manual
  ```
- Community implementations: `brunojppb/turbo-cache-server`, `ducktors/turborepo-remote-cache`, `Tapico/tapico-turborepo-remote-cache`.
- Vercel's open-source Vercel Remote Cache SDK (`vercel/remote-cache`) integrates the managed cache with Vercel deployments.
- Without global `turbo` installed, run login through the package manager (`pnpm dlx` / `yarn dlx` / `npx` / `bunx` / `nubx` / `aubx turbo login`).

## Related

- [Package and Task Graph](./package-and-task-graph.md)
- [Remote Cache API overview](../remote-cache-api/overview.md)
