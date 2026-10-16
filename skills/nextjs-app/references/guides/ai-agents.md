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
| `create-next-app` | CLI | Generates `AGENTS.md` automatically for new projects; `--no-agents-md` opts out |
| `next dev` (16.3+) | CLI behavior | Auto-generates/upserts the managed `AGENTS.md` block when an AI agent is detected and no managed block exists |
| `agentRules: false` | `next.config.ts` | Disables auto-generation of the managed `AGENTS.md` block (enabled by default in 16.3+) |
| `experimental.agentFeedback` | `next.config.ts` | Experimental, disabled by default, requires Next.js Telemetry enabled, does not run in CI; `next dev` adds a managed `nextjs-agent-feedback` block to the agent file |
| `next upgrade --agent` | CLI | Checks for an upgrade, gathers version-matched migration guides and hands the task to a coding agent (e.g. `npx next@canary upgrade --agent=latest`) |
| `experimental.agentUpgrade` | `next.config.ts` | Experimental; shows security upgrade reminders during `next dev` and `next build` by default |
| `npx @next/codemod@canary agents-md` | CLI | Legacy command for 16.1 and earlier; downloads a version-matched docs copy to `.next-docs/` |
| `.md` URL suffix / `Accept: text/markdown` | HTTP | Any page on nextjs.org/docs is available as plain Markdown over the network |
| `/docs/llms.txt`, `/docs/llms-full.txt` | endpoint | `llms.txt`-convention indexes of the Next.js docs |

## Notes

- Docs are bundled at `node_modules/next/dist/docs/`, mirroring the site structure (`01-app/`, `02-pages/`, `03-architecture/`).
- Upgrading Next.js also upgrades the bundled docs.
- Managed documentation instructions: Next.js writes only the content between the `<!-- BEGIN:nextjs-agent-rules -->` / `<!-- END:nextjs-agent-rules -->` markers in `AGENTS.md` and preserves the rest of the file. Only `AGENTS.md` is generated now (the earlier docs also described a `CLAUDE.md`).
- Version support: 16.3 and later include bundled docs and managed agent instructions; 16.2 includes the bundled docs but does not generate instructions automatically; 16.1 and earlier have no bundled docs (the legacy `agents-md` command downloads a version-matched copy to `.next-docs/` and indexes it in `AGENTS.md`).
- Automatic agent feedback: the agent keeps anonymized candidates for meaningful Next.js issues during the request and, before the final response, opens each qualifying report in a review form in the default browser; nothing is sent until you select Send feedback. Managed block markers: `<!-- BEGIN:nextjs-agent-feedback -->` / `<!-- END:nextjs-agent-feedback -->`.
- Agent-guided upgrades: `next upgrade --agent` (see the Upgrade with a coding agent guide, `agent-upgrade.md`).
- Built-in error guidance: `next dev` shows all validation errors with source-mapped stacks in the overlay and terminal; production builds minify server code and stop after a route fails, so use `next build --debug-prerender` to enable server source maps and continue checking other routes. The `Learn more` link goes to a per-error page under `/docs/messages`.
- Skills (`npx skills add vercel/next.js --skill <name>`): `next-dev-loop`, `next-cache-components-adoption` (turns the flag on, fixes routes one feature at a time, supports a series of PRs or single-branch migration), `next-cache-components-optimizer` (expands a route's static shell, guarded by an `instant()` test), `next-partial-prefetching-adoption` (audits `<Link prefetch={true}>`, captures prefetched UI in `instant()` tests, then migrates; needs Cache Components already adopted), `next-partial-prefetching-optimizer` (turns navigation goals into prefetch contracts captured in `instant()` tests; needs Cache Components and Partial Prefetching), and `next-bundle-optimizer` (added `v16.4.0`; uses Turbopack's bundle analyzer to find large client-side bundles; audit-only mode available).
- The page is titled "How Next.js supports AI coding agents" in the `v16.4.2` docs; results are published at nextjs.org/evals.
- Runtime visibility comes from the [Next.js MCP server](./mcp.md) at `/_next/mcp` plus [`agent-browser`](https://github.com/vercel-labs/agent-browser) for DOM/console/network/Web Vitals inspection.
- With Cache Components, blocking prerender errors present labeled fixes (`stream` / `cache` / `block`) and a "Copy prompt" button in the dev overlay; the same menu prints in terminal and `next build` output.
- Multi-step workflows (adopting Cache Components, Partial Prefetching, `next-dev-loop`) are packaged as installable Skills via `npx skills add vercel/next.js --skill <name>`, browsable at [skills.sh/vercel/next.js](https://www.skills.sh/vercel/next.js).
- Framework knowledge should come from the bundled docs, not Skills — Skills are reserved for multi-step workflows rather than lookups.

## Related

- [Next.js MCP Server](./mcp.md)
- [Instant Navigation](./instant-navigation.md)
