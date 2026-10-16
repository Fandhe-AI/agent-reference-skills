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

## Choose where to start

| Use | When you want to | Start here |
|-----|------------------|------------|
| Codex Security Cloud | Scan connected GitHub repositories in Codex cloud or monitor new commits | cloud-setup.md |
| Codex Security plugin | Scan a local repository in Codex and work through findings interactively | plugin-quickstart.md |
| Codex Security CLI | Run repeatable terminal scans or add checks to CI | cli-quickstart.md |
| Codex Security SDK | Run scans and handle results in an application or developer tool | sdk.md |

For your first local scan use the plugin: in the ChatGPT desktop app select **Codex**, install **Codex Security**, and open **Security** in the sidebar (the plugin also works in Codex CLI). Codex Security Cloud is a separate plugin in research preview on the web and in the desktop app; it requires workspace access, a GitHub connection, and a compatible Codex cloud environment (you can connect the repository and create an environment during setup). For security reviews posted to GitHub pull requests see security-review.md.

## Choose the next task

| Task | Guide |
|------|-------|
| Focus a scan on a service or add security context | scans.md |
| Run repeated reviews of the same repository or folder | deep-scans.md |
| Check a pull request, commit, or local diff | code-changes.md |
| Assess findings from another scanner or issue tracker | triage-backlog.md |
| Generate a patch and check whether it fixes the issue | fix-findings.md |
| Share results or assign remediation work | export-findings.md |

For automation use the CLI guides to scan repositories in bulk (cli-bulk-scans.md) or run scans in CI (cli-ci.md, cli-ci-gitlab.md); look up commands and defaults in cli-reference.md.

## Notes

- Codex Security cloud works with connected GitHub repositories through Codex cloud; if a repository isn't visible, confirm it is available in your Codex cloud workspace
- Codex Security (this product family) is distinct from Codex's built-in approvals / sandbox / network controls, which are covered separately (see `security-automation` category, e.g. Agent approvals & security)

## Related

- [Codex Security plugin quickstart](./plugin-quickstart.md)
- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security TypeScript SDK](./sdk.md)
- [Codex Security cloud setup](./cloud-setup.md)
