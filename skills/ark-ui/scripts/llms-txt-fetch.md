# llms-txt-fetch

Fetch Ark UI's LLMs.txt documentation routes so AI assistants and tools that support the LLMs.txt standard can consume them directly.

## Fetch the overview

```sh
curl https://ark-ui.com/llms.txt
```

A structured overview with links to all component docs.

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

All documentation for one framework in a single file.

## Fetch a single page as markdown

```sh
curl https://ark-ui.com/llms.txt/components/accordion
```

Route form: `https://ark-ui.com/llms.txt/<slug>` (`<slug>` is a placeholder, e.g. `components/accordion`).

## Fetch a single page for another framework

```sh
curl "https://ark-ui.com/llms.txt/components/accordion?framework=vue"
```

Add `?framework=<framework>` to switch the framework of the single-page route.

## Notes

`https://ark-ui.com/llms-full.txt` is no longer a canonical route (it returned 307 to `/llms.txt` as of 2026-10-17). `https://ark-ui.com/docs/react/...` still returns 404. The form `https://ark-ui.com/react/docs/...` (the one `llms.txt` links to) returns 307 to `https://ark-ui.com/docs/...`; both `/docs/<slug>` and `/docs/<slug>.mdx` return 200. Cursor consumes these via its `@Docs` feature; Windsurf via `@` mentions or `.windsurfrules`.
