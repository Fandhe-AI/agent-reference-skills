---
source: https://orm.drizzle.team/docs/drizzle-kit-studio
---

# `drizzle-kit studio`

Spins up a server for Drizzle Studio (the database browser) hosted at `local.drizzle.studio`. Requires database connection credentials via `drizzle.config.ts`.

## Signature / Usage

```bash
npx drizzle-kit studio
```

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
});
```

By default the server starts on `127.0.0.1:4983`.

```bash
drizzle-kit studio --port=3000
drizzle-kit studio --host=0.0.0.0
drizzle-kit studio --verbose
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `host` | string | `127.0.0.1` | Studio server host |
| `port` | number | `4983` | Studio server port |
| `verbose` | boolean | `false` | Log every SQL statement |

## Notes

- Safari and Brave block localhost access by default; install `mkcert`, run `mkcert -install`, then restart `drizzle-kit studio` to use a self-signed certificate.
- Meant for local development only — not for deployment on a remote host (VPS etc). Deploying Drizzle Studio remotely is the purpose of the separately-productized Drizzle Gateway (self-hosted), plus a Chrome extension and an embeddable component; these are not part of the open-source `drizzle-kit`/`drizzle-orm` docs covered here.
- Drizzle Studio itself is closed-source (unlike Drizzle ORM and Drizzle Kit, which are fully open source).

## Related

- [drizzle-config-file](./drizzle-config-file.md)
