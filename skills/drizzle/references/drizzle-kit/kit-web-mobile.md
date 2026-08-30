---
source:
  - https://orm.drizzle.team/docs/kit-web-mobile
  - https://orm.drizzle.team/docs/get-started/expo-new
---

# Drizzle migrations in web and mobile environments

This page is a documentation stub in the official docs. The official text states this section will be updated in the next release.

## Signature / Usage

```ts
// get-started/expo-new.mdx: generate migrations, then apply them at runtime with useMigrations()
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

const db = drizzle(expo);
const { success, error } = useMigrations(db, migrations);
```

## Notes

- Supplementary source for the snippet: https://orm.drizzle.team/docs/get-started/expo-new (`get-started/expo-new.mdx`). This stub page itself has no code.

- Stub page as of drizzle-kit 1.0.0-rc.5. For Expo SQLite, OP SQLite, and React Native migrations, the official docs point to the Get Started guide (`/docs/get-started/expo-new`), which is outside the `drizzle-kit` scope covered here.
- The snippet above is quoted from `get-started/expo-new.mdx` (this stub page itself has no code), where migrations are generated with `npx drizzle-kit generate` and applied at app runtime via `useMigrations`, rather than `drizzle-kit migrate` (which targets Node.js server environments).

## Related

- [kit-overview](./kit-overview.md)
