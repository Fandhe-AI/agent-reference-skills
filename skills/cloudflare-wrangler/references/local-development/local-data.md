---
source: https://developers.cloudflare.com/workers/local-development/local-data/
---

# Adding local data

Local binding resources start empty; populate them with Wrangler commands using `--local`. Local data persists in `.wrangler/state`.

## Signature / Usage

```sh
npx wrangler kv key put <KEY> <VALUE> --binding=<BINDING> --local
```

KV bulk upload:

```sh
npx wrangler kv bulk put <FILENAME.json> --binding=<BINDING> --local
```

R2 upload a file:

```sh
npx wrangler r2 object put <BUCKET>/<KEY> --file=<PATH_TO_FILE> --local
```

D1 execute a SQL statement or file:

```sh
npx wrangler d1 execute <DATABASE_NAME> --command="<SQL_QUERY>" --local
npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql --local
```

Flagship:

```sh
npx wrangler flagship flags pull <APP_ID>
npx wrangler flagship flags create <APP_ID> new-checkout --local
```

Durable Objects: no CLI commands exist. Write application code (e.g. development endpoints or test routes) that creates Durable Object instances and calls methods that store state.

## Where local data gets stored

Wrangler and the Vite plugin both store local binding data in `.wrangler/state` (subdirectories per binding type). Delete the folder (or sub-folders) to reset; Miniflare recreates it on the next `dev`.

Change the directory with Wrangler (must be given on every `dev` run):

```sh
npx wrangler dev --persist-to <DIRECTORY>
```

When using a custom location, pass the same `--persist-to` with `--local` to other Wrangler commands that modify local data:

```sh
npx wrangler kv key put test 12345 --binding MY_KV_NAMESPACE --local --persist-to worker-local
```

Vite plugin:

```js
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			persistState: { path: "./my-custom-directory" },
		}),
	],
});
```

## Notes

- Data can only be populated via the Wrangler CLI, not the Vite plugin; accessing data is the same in both.
- Changes to local resources do not affect production data.
- Since Wrangler 3.60.0 the `kv ...` syntax is supported; below 3.60.0 use `kv:...`.
- Add the persistence folder (`.wrangler/state` or custom) to `.gitignore`.
- To share state between Wrangler and the Vite plugin, configure the same persistence path.
- If `--persist-to` is not specified, Wrangler defaults to `.wrangler/state`.

## Related

- [Local development](./overview.md)
- [Local Explorer](./local-explorer.md)
- [Wrangler commands](../commands/README.md)
