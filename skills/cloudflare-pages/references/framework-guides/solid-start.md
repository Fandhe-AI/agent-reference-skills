---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/
---

# SolidStart

SolidStart deploys to Pages with the `cloudflare-pages` Nitro preset.

## Signature / Usage

Adapted (not in the official docs): `--platform=pages` is added; without it C3 creates a Workers project, not a Pages project (see Notes).

```
npm create cloudflare@latest -- my-solid-app --framework=solid --platform=pages
```

Answer `yes` to Server Side Rendering when prompted. To configure manually, update the SolidStart config:

```diff
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
+  server: {
+    preset: "cloudflare-pages",

+    rollupConfig: {
+      external: ["node:async_hooks"]
+    }
+  }
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.preset` | — | — | `"cloudflare-pages"` |
| `server.rollupConfig.external` | — | — | `["node:async_hooks"]` |
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `dist` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- With C3, the adapter is installed and configured automatically, so you can skip the manual config.
- Adapted from the official docs: the official C3 command for Solid omits `--platform=pages`, which would create a Workers project; the flag is added to match the other Pages framework guides.
- SolidStart APIs themselves are out of scope for this skill.

## Related

- [overview.md](./overview.md)
- [qwik.md](./qwik.md)
