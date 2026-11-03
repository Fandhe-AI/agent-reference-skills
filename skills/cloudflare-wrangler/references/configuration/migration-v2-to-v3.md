---
source: https://developers.cloudflare.com/workers/wrangler/migration/update-v2-to-v3/
---

# Migrate from Wrangler v2 to v3

No special instructions are required; update Wrangler normally with no workflow disruption.

## Signature / Usage

Adapted (not in the official docs): `wrangler@latest` replaced with `wrangler@3` because `@latest` now installs v4; see Notes.

```sh
npm i -D wrangler@3
```

## Notes

- Adapted from the official docs: the official page uses `npm i -D wrangler@latest`, which installs Wrangler v4 today. `wrangler@3` pins the v2 to v3 target of this guide; to move to the current release see [migration-v3-to-v4.md](./migration-v3-to-v4.md).
- If you tried updating to v3 prior to v3.3, you may have hit compatibility issues with older operating systems; retry with the latest v3.
- Deprecations introduced in v3: see [deprecations.md](./deprecations.md).
- For further help, file an issue in the `workers-sdk` GitHub repo.

## Related

- [deprecations.md](./deprecations.md)
- [migration-v3-to-v4.md](./migration-v3-to-v4.md)
- [install-and-update.md](./install-and-update.md)
