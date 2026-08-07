# Codex Security

Codex Security is an application security agent that helps security and engineering teams find, confirm, and fix vulnerabilities. Use it in Codex, from your terminal, through the TypeScript SDK, or with connected GitHub repositories.

## Signature / Usage

Available through four surfaces:

- **Desktop app plugin** — `Security` sidebar with Scans, Findings, and Repositories views (see [Security workbench](./workbench.md))
- **CLI and TypeScript SDK** — public `@openai/codex-security` npm package
- **Codex Security cloud** — scans connected GitHub repositories through Codex cloud (research preview)

```bash
npm install @openai/codex-security
```

Running scans requires Codex Security access. For best results, use an account verified for Trusted Access for Cyber (https://chatgpt.com/cyber).

## How Codex Security cloud works

Codex Security cloud scans connected repositories commit by commit. It builds scan context from the repo, checks likely vulnerabilities against that context, and validates high-signal issues in an isolated environment before surfacing them:

1. **Find likely vulnerabilities** using a repo-specific threat model and real code context
2. **Reduce noise** by validating findings before review
3. **Move findings toward fixes** with ranked results, evidence, and suggested patch options

## Notes

- Codex Security cloud works with connected GitHub repositories through Codex cloud; if a repository isn't visible, confirm it is available in your Codex cloud workspace
- Codex Security (this product family) is distinct from Codex's built-in approvals / sandbox / network controls, which are covered separately (see `security-automation` category, e.g. Agent approvals & security)

## Related

- [Codex Security plugin quickstart](./plugin-quickstart.md)
- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security TypeScript SDK](./sdk.md)
- [Codex Security cloud setup](./cloud-setup.md)
