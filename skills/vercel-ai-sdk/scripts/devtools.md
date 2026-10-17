---
source: https://ai-sdk.dev/docs/ai-sdk-core/devtools
---

# devtools

Commands to install AI SDK DevTools and start the viewer.

> **Warning**: DevTools is experimental and intended for local development only. Do not use it in production (official warning). Captured data is stored in `.devtools/generations.json`.

## Install the DevTools package

```sh
npm i @ai-sdk/devtools
```

The official page uses `pnpm add @ai-sdk/devtools`. AI SDK v7 (`ai@latest`) is required.

## Start the viewer

```sh
npx @ai-sdk/devtools@latest
```

Run it in a separate terminal and open `http://localhost:4983`.

## Start in a monorepo

```sh
cd apps/api
npx @ai-sdk/devtools@latest
```

Start it from the workspace where the AI SDK code runs (for example `apps/api`). `@latest` is used so that `npx` installs an executable copy instead of a transitive dependency whose bin is not linked (official explanation).

## Notes

- For the integration registration code (`registerTelemetry(DevToolsTelemetry())`), see `references/operations/devtools.md`.
