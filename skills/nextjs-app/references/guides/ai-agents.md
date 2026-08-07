# AI Coding Agents

Configure a Next.js project so AI coding agents read version-matched bundled docs, runtime state, and error output instead of relying on outdated training data.

## Signature / Usage

```md filename="AGENTS.md"
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — read the relevant guide in
`node_modules/next/dist/docs/` before writing any code.
<!-- END:nextjs-agent-rules -->
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `create-next-app` | CLI | Generates `AGENTS.md` and `CLAUDE.md` automatically for new projects; `--no-agents-md` opts out |
| `next dev` (16.3+) | CLI behavior | Auto-generates/upserts `AGENTS.md` and `CLAUDE.md` when an AI agent is detected and no managed block exists |
| `agentRules: false` | `next.config.ts` | Disables auto-generation of the managed `AGENTS.md`/`CLAUDE.md` block |
| `npx @next/codemod@canary agents-md` | CLI | Legacy command for 16.1 and earlier; downloads a version-matched docs copy to `.next-docs/` |
| `.md` URL suffix / `Accept: text/markdown` | HTTP | Any page on nextjs.org/docs is available as plain Markdown over the network |
| `/docs/llms.txt`, `/docs/llms-full.txt` | endpoint | `llms.txt`-convention indexes of the Next.js docs |

## Notes

- Docs are bundled at `node_modules/next/dist/docs/`, mirroring the site structure (`01-app/`, `02-pages/`, `03-architecture/`).
- Upgrading Next.js also upgrades the bundled docs.
- Runtime visibility comes from the [Next.js MCP server](./mcp.md) at `/_next/mcp` plus [`agent-browser`](https://github.com/vercel-labs/agent-browser) for DOM/console/network/Web Vitals inspection.
- With Cache Components, blocking prerender errors present labeled fixes (`stream` / `cache` / `block`) and a "Copy prompt" button in the dev overlay; the same menu prints in terminal and `next build` output.
- Multi-step workflows (adopting Cache Components, Partial Prefetching, `next-dev-loop`) are packaged as installable Skills via `npx skills add vercel/next.js --skill <name>`, browsable at [skills.sh/vercel/next.js](https://www.skills.sh/vercel/next.js).
- Framework knowledge should come from the bundled docs, not Skills — Skills are reserved for multi-step workflows rather than lookups.

## Related

- [Next.js MCP Server](./mcp.md)
- [Instant Navigation](./instant-navigation.md)
