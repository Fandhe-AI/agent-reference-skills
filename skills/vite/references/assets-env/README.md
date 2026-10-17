# assets-env

| Name | Description | Path |
|------|-------------|------|
| Importing Asset as URL | Importing a static asset returns the resolved public URL when it is served. | [asset-url-imports.md](./asset-url-imports.md) |
| Importing Script as a Worker | Scripts can be imported as web workers via `?worker` or `?sharedworker`. | [asset-worker-imports.md](./asset-worker-imports.md) |
| Built-in Constants (import.meta.env) | Vite exposes constants under `import.meta.env`. | [built-in-constants.md](./built-in-constants.md) |
| IntelliSense for Env Variables | Vite provides `import.meta.env` type definitions in `vite/client.d.ts`. | [env-intellisense.md](./env-intellisense.md) |
| Env Variables and .env Files | Vite exposes env variables under `import.meta.env` as strings. | [env-variables.md](./env-variables.md) |
| HTML Constant Replacement | Any `import.meta.env` property can be used in HTML via `%CONST_NAME%`. | [html-constant-replacement.md](./html-constant-replacement.md) |
| Modes and NODE_ENV | By default the dev server runs in `development` mode. | [modes.md](./modes.md) |
| new URL(url, import.meta.url) | Combines native ESM `import.meta.url` with the `URL` constructor. | [new-url-import-meta-url.md](./new-url-import-meta-url.md) |
| The public Directory | A special `public` directory under the project root holds assets served at `/`. | [public-directory.md](./public-directory.md) |
