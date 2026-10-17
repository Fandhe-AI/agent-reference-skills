# Security Review

Research preview. Automatic or on-demand security review of a GitHub pull request diff, run alongside (or independently of) general Code Review — analyzes the PR diff, supporting repository context, and configured threat model for security-specific risks. Available to Enterprise, Business, Edu, and Pro workspaces; not available on Plus.

## Signature / Usage

Request manually by commenting on a pull request:

```text
@codex security review
```

## Options / Props

| Name | Description |
|------|-------------|
| Repository preferences | **Follow personal** (each contributor opts in), **Review all PRs**, or **Review team PRs** (ChatGPT workspace members). |
| Trigger | **On PR open**, **Every push**, or **Whenever code review runs** (requires Code Review enabled). |
| Threat-model context | Reuses an existing Codex Security scan's threat model, or a repository-checked-in threat model file; regenerated per review if unset. |
| Reporting threshold | Default: automatic reviews post **High**/**Critical**; manual reviews post **Medium**/**High**/**Critical**. Configurable independently per trigger type, with path-based overrides. |

## Notes

- Before you start: Codex Security Review access for your workspace, Codex cloud set up with a connected GitHub repository, and GitHub push or admin permission for the repository settings; an existing Codex Security scan is optional. Security reviews consume included Codex allowance or ChatGPT credits.
- Configure at `chatgpt.com/settings/code-review`: choose a repository, turn on **Auto security review** under **Review security vulnerabilities**, set **Review** (**Follow personal preferences**, **All PRs**, or **Team PRs** — members of your ChatGPT workspace, not a GitHub team — when available) and **Trigger** (**On PR open**, **On every push**, or **Whenever code review runs**, which requires Code Review). Repository settings are shared and affect the pull requests selected by the repository's **Review** policy; connecting GitHub or enabling personal reviews for another contributor doesn't request an extra review of your pull requests, later pushes can trigger another review per **Trigger**, and you can request additional reviews manually.
- Manual review: `@codex security review` — Codex reacts while running, then posts findings meeting the manual reporting threshold; open the associated Codex task and the **Security Report** tab for the full report (severity, attack path, supporting evidence, validation, remediation guidance). If no issues meet the threshold nothing is posted, so check the task status and full report before reading an empty comment result as a completed review with no findings.
- Findings posted to a PR inherit that PR's GitHub visibility — anyone who can view the PR (including public repos and outside contributors) can view them. The reporting threshold only controls what's posted to GitHub; the full report stays in the Codex task's **Security Report** tab.
- Distinct from [Review code changes for security](./code-changes.md): that page's `security-diff-scan` conversation prompt / CI invocation is a manually-triggered plugin skill run via `codex exec` or the desktop app's Scans flow, scoped to whatever diff you point it at. Security Review is GitHub-PR-native, can run automatically on push/open, and posts findings as PR comments directly.
- Code Review (general, non-security) can already surface security-related issues, so some overlap between the two is expected.

## Related

- [Review code changes for security](./code-changes.md)
- [Codex Security](./overview.md)
- [Codex Security cloud setup](./cloud-setup.md)
- [Improving the threat model](./threat-model.md)
