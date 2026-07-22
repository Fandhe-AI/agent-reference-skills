# llms-txt-fetch

Fetch Ark UI's LLMs.txt documentation routes so AI assistants and tools that support the LLMs.txt standard can consume them directly.

## Fetch the overview

```sh
curl https://ark-ui.com/llms.txt
```

A structured overview with links to all component docs.

## Fetch the full documentation

```sh
curl https://ark-ui.com/llms-full.txt
```

Comprehensive documentation including implementation details and examples.

## Fetch framework-specific documentation

```sh
curl https://ark-ui.com/llms-react.txt
```

```sh
curl https://ark-ui.com/llms-vue.txt
```

```sh
curl https://ark-ui.com/llms-solid.txt
```

```sh
curl https://ark-ui.com/llms-svelte.txt
```

Framework-scoped paths like `https://ark-ui.com/docs/react/...` do not exist (404). Only the framework-agnostic `https://ark-ui.com/docs/...` path and the `https://ark-ui.com/llms-<framework>.txt` routes are canonical. Cursor consumes these via its `@Docs` feature; Windsurf via `@` mentions or `.windsurfrules`.
