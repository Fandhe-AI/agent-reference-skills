---
source: https://ai-sdk.dev/docs/getting-started/nextjs-app-router
---

# install

Package installation commands for `ai` (7.0.142) and the companion `@ai-sdk/*` packages. Only packages that appear in the official docs are listed.

## Core and UI packages

```sh
npm i ai @ai-sdk/react zod
```

`<InstallPackages packages="ai @ai-sdk/react zod" />` in the Next.js / Expo / TanStack Start quickstarts. Nuxt uses `@ai-sdk/vue` and Svelte uses `@ai-sdk/svelte` in place of `@ai-sdk/react` (`ai @ai-sdk/vue zod`, `ai @ai-sdk/svelte zod`; the Svelte quickstart installs them as dev dependencies). Framework scaffolding commands are in the quickstart samples.

## Core only

```sh
npm i ai
```

## Provider packages

```sh
npm i @ai-sdk/openai
npm i @ai-sdk/anthropic
npm i ai @ai-sdk/google
npm i @ai-sdk/amazon-bedrock
npm i @ai-sdk/openai-compatible
```

One package per provider. Install only the provider you use. The Amazon Bedrock page also has an install line for `@aws-sdk/credential-providers` (see that page for when it is needed):

```sh
npm i @aws-sdk/credential-providers
```

## RSC (experimental)

```sh
npm install @ai-sdk/rsc
```

Source: the 5.0 migration guide note ("Don't forget to install the new package"). AI SDK RSC is experimental.

## Workflow agent

```sh
npm install @ai-sdk/workflow workflow@5
```

Verbatim from the workflow agent guide (`docs/agents/workflow-agent`). `@ai-sdk/workflow` requires Workflow 5, plus the `ai` package and `zod` peer dependencies.

## Harness (experimental)

```sh
npm i @ai-sdk/harness @ai-sdk/harness-claude-code @ai-sdk/sandbox-vercel
npm i @ai-sdk/harness @ai-sdk/harness-codex @ai-sdk/sandbox-vercel
npm i @ai-sdk/workflow-harness workflow
```

The first two are from the Claude Code and Codex harness pages, the third from the workflow utilities page. `@ai-sdk/harness` is experimental.

## Terminal UI

```sh
npm i @ai-sdk/tui ai @ai-sdk/openai
```

The official page writes this as `pnpm add @ai-sdk/tui ai @ai-sdk/openai`.

## MCP client

```sh
pnpm add @vercel/connect@^2.5.0 @ai-sdk/mcp@^2.0.74
```

Verbatim from the cookbook MCP events guide, the only place in the docs where an install command contains `@ai-sdk/mcp`. It also installs `@vercel/connect`, which that guide needs. No dedicated `@ai-sdk/mcp` install line exists in the docs/reference pages.

## Other packages shown in the docs

```sh
pnpm install @ai-sdk/otel
pnpm add ai @ai-sdk/code-mode zod
```

`@ai-sdk/otel` appears in the telemetry page and the 7.0 migration guide. `@ai-sdk/code-mode` appears in the code mode page.

## Notes

- The official docs mostly use `pnpm`; `npm i` for entries written with `<InstallPackages>` is the equivalent form (the component renders per-package-manager tabs). Entries written as `pnpm` or `npm install` in the source are kept as in the source.
- Version ranges are not pinned in the quickstarts; companion package versions at the `ai@7.0.142` tag are listed in `SKILL.md`.
