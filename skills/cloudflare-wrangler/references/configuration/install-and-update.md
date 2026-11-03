---
source: https://developers.cloudflare.com/workers/wrangler/install-and-update/
---

# Install and Update Wrangler

Wrangler is installed locally into each project so a team uses the same version and can roll back.

## Signature / Usage

```sh
npm i -D wrangler@latest
# yarn add -D wrangler@latest
# pnpm add -D wrangler@latest
# bun add -d wrangler@latest

npx wrangler --version
# or
npx wrangler -v
```

## Notes

- Requires Node.js and npm. Wrangler CLI supports the Current, Active, and Maintenance versions of Node.js. Workers always execute in `workerd`.
- Supported OSes: macOS 13.5+, Windows 11, and Linux distros that support glib 2.35 (follows workerd's policy).
- Updating uses the same install command (`wrangler@latest`).
- If Wrangler is not installed, `npx wrangler` uses the latest version.
- The docs suggest Vite+ (`vp env`) to manage Node.js versions.

## Related

- [migration-v3-to-v4.md](./migration-v3-to-v4.md)
- [overview.md](./overview.md)
