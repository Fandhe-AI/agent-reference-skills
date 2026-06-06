# Testing Mode & Scope Limits

Unverified (testing mode) OAuth apps are limited by Google to approximately 25 scopes per consent. The `recommended` scope preset includes 85+ scopes and will fail for unverified apps.

## Problem

When using an unverified OAuth app (common during development), Google's consent screen rejects requests that exceed ~25 scopes. The `recommended` preset — which covers all Workspace APIs — exceeds this limit and will cause login to fail, particularly for `@gmail.com` accounts.

## Solution

Use `gws auth login -s` to select only the services you need:

```bash
gws auth login -s drive,gmail,sheets
```

## Notes

- The `-s` / `--scopes` flag accepts a comma-separated list of service names (e.g., `drive`, `gmail`, `sheets`, `calendar`).
- This keeps the total scope count below Google's ~25 scope limit for testing mode apps.
- If your app is verified (production), the `recommended` preset works without restriction.
- To add another account as a test user: OAuth consent screen → **Test users** → **Add users** in the Google Cloud Console.

## Related

- [auth-login.md](./auth-login.md)
- [auth-setup.md](./auth-setup.md)
