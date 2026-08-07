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

- Configure under **Codex settings > Repository preferences** at `chatgpt.com/codex/settings/code-review`; requires Codex cloud with a connected GitHub repository and GitHub push/admin permission.
- Findings posted to a PR inherit that PR's GitHub visibility — anyone who can view the PR (including public repos and outside contributors) can view them. The reporting threshold only controls what's posted to GitHub; the full report stays in the Codex task's **Security Report** tab.
- Distinct from [Review code changes for security](./code-changes.md): that page's `security-diff-scan` conversation prompt / CI invocation is a manually-triggered plugin skill run via `codex exec` or the desktop app's Scans flow, scoped to whatever diff you point it at. Security Review is GitHub-PR-native, can run automatically on push/open, and posts findings as PR comments directly.
- Code Review (general, non-security) can already surface security-related issues, so some overlap between the two is expected.

## Related

- [Review code changes for security](./code-changes.md)
- [Codex Security](./overview.md)
- [Codex Security cloud setup](./cloud-setup.md)
- [Improving the threat model](./threat-model.md)
