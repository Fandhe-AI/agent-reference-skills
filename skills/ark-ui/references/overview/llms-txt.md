# LLMs.txt

LLMs.txt files make the Ark UI documentation available to large language models (LLMs), helping AI assistants understand the component library, its APIs, and usage approaches.

## Signature / Usage

```text
https://ark-ui.com/llms.txt
```

## Options / Props

| File | Description |
| --- | --- |
| `llms.txt` | Overview with component links |
| `llms-react.txt` | React-specific documentation |
| `llms-solid.txt` | Solid-specific documentation |
| `llms-vue.txt` | Vue-specific documentation |
| `llms-svelte.txt` | Svelte-specific documentation |

## Notes

- Framework-specific files follow the pattern `https://ark-ui.com/llms-[framework].txt`.
- Single page as markdown: `https://ark-ui.com/llms.txt/<slug>` (e.g. `https://ark-ui.com/llms.txt/components/accordion`). Add `?framework=vue` to switch framework.
- `llms-full.txt` was removed from this page: as of 2026-10-17, `https://ark-ui.com/llms-full.txt` returns 307 to `/llms.txt`, and the 5.39.3 `llms.txt.mdx` no longer lists it.
- Cursor: reference via the `@Docs` feature. Windsurf: reference via `@` symbol or `.windsurfrules`.
- Any tool supporting the LLMs.txt standard can consume these routes.

## Related

- [MCP Server](./mcp-server.md)
