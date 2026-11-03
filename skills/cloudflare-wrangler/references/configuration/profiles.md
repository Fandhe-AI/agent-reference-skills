---
source: https://developers.cloudflare.com/workers/wrangler/profiles/
---

# Authentication Profiles (beta)

A profile is a named OAuth login scoped to a chosen set of accounts and bindable to a directory. Authentication profiles are in beta; commands and behavior may change.

## Signature / Usage

```sh
wrangler auth create client-a
wrangler auth activate client-a ~/clients/client-a
wrangler auth list
wrangler deploy --profile staging
wrangler auth deactivate ~/projects/staging
wrangler auth delete staging
```

Pin the account in config as a failsafe:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-worker",
  "account_id": "<PRODUCTION_ACCOUNT_ID>"
}
```

## Notes

- Profile resolution order (highest first): `CLOUDFLARE_API_TOKEN`; the `--profile` flag (single command); the nearest activated ancestor directory (resolved from the config file directory when `--config` is passed, else the working directory); the default profile from `wrangler login` / `wrangler logout`.
- Account selection within the profile: `account_id` in config or `CLOUDFLARE_ACCOUNT_ID`; otherwise the account selected at login. If a command targets an account the profile cannot reach, Wrangler fails with an error naming the account and profile (no fallback).
- `wrangler auth create <name>` starts OAuth and lets you choose reachable accounts; re-running with the same name re-authenticates. `wrangler auth activate <profile> [dir]` binds a profile to a directory and subdirectories (default: cwd); a subdirectory can override with another profile.
- `--profile` is not supported by `auth`, `login`, `logout`, and `whoami`.
- `wrangler auth deactivate` returns the directory to the profile above it or the default; `wrangler auth delete` removes a profile and all bindings.
- Profiles are local-machine only; CI/containers authenticate with `CLOUDFLARE_API_TOKEN`. While it is set you cannot create, activate, deactivate, or delete profiles. `CLOUDFLARE_ACCOUNT_ID` and config `account_id` are always respected.
- Command flag details for `wrangler auth` belong to the commands reference.

## Related

- [system-environment-variables.md](./system-environment-variables.md)
- [top-level-keys.md](./top-level-keys.md)
