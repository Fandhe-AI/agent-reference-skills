<!-- source: https://code.claude.com/docs/en/gitlab-ci-cd.md / last verified: 2026-11-14 -->

# Claude Code GitLab CI/CD

Integrate Claude Code into GitLab CI/CD pipelines: event-driven jobs that create/update MRs, respond to `@claude` mentions, and run on the Claude API, Amazon Bedrock, or Google Cloud's Agent Platform. Currently in beta, maintained by GitLab.

## Signature / Usage

Adapted (not in the official docs): the official `curl -fsSL https://claude.ai/install.sh | bash` is split into download, syntax check, and run steps.

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  variables:
    GIT_STRATEGY: fetch
  before_script:
    - apk update
    - apk add --no-cache git curl bash
    - curl -fsSL -o /tmp/claude-install.sh https://claude.ai/install.sh
    - bash -n /tmp/claude-install.sh
    - bash /tmp/claude-install.sh
    # The installer places claude in ~/.local/bin, which isn't on PATH in this image
    - export PATH="$HOME/.local/bin:$PATH"
  script:
    - /bin/gitlab-mcp-server || true
    - >
      claude
      -p "${AI_FLOW_INPUT:-'Review this MR and implement the requested changes'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write mcp__gitlab"
      --debug
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ANTHROPIC_API_KEY` | CI/CD variable | Masked, required for Claude API auth |
| `AWS_ROLE_TO_ASSUME` / `AWS_REGION` | CI/CD variable | Role ARN and region for Amazon Bedrock via OIDC (no static keys) |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` / `GCP_SERVICE_ACCOUNT` / `GCP_PROJECT_ID` / `CLOUD_ML_REGION` | CI/CD variable | Workload Identity Federation resources for Google Cloud's Agent Platform; provider name is given without the `//iam.googleapis.com/` prefix, region e.g. `us-east5` |
| `CLAUDE_CODE_USE_BEDROCK` / `CLAUDE_CODE_USE_VERTEX` / `ANTHROPIC_VERTEX_PROJECT_ID` | job variable | Official provider job examples set `"1"` / `"1"` / `"$GCP_PROJECT_ID"` |
| `id_tokens:` (`GITLAB_OIDC_TOKEN`, `aud`) | CI keyword | Job OIDC token for cloud auth; set `aud` to the audience configured on the AWS IAM OIDC provider / Workload Identity Pool provider, e.g. your GitLab instance URL |
| `GITLAB_ACCESS_TOKEN` | CI/CD variable | Project Access Token with `api` scope, when `CI_JOB_TOKEN` isn't sufficient for GitLab API operations |
| `--permission-mode acceptEdits` | CLI flag | Lets Claude apply edits without per-change prompts in the job |
| `--allowedTools` | CLI flag | Restricts which tools Claude can invoke, e.g. `"Bash Read Edit Write mcp__gitlab"` |

## Notes

- Adapted from the official docs: the installer line is split into download, `bash -n` check, and run instead of piping `curl` into `bash`; the official page uses the piped form.
- Quick setup: add `ANTHROPIC_API_KEY` as a masked CI/CD variable and a `claude` job to `.gitlab-ci.yml`; trigger manually, on `merge_request_event`, or via a webhook listener that calls the pipeline trigger API on `@claude` comments.
- Manual/production setup additionally configures provider OIDC/WIF trust and project credentials for GitLab API operations (`CI_JOB_TOKEN` or a Project Access Token).
- Each job runs in an isolated container; Claude's changes flow through MRs so branch protection and approval rules still apply.
- Costs come from GitLab Runner minutes plus API token usage; control with `--max-turns`, job-level `timeout` (e.g. `timeout: 30m`), and concurrency limits. Exact flags may vary by `@anthropic-ai/claude-code` version; run `claude --help` in the job.
- Bedrock job: `apk add --no-cache bash curl jq git aws-cli`, write `GITLAB_OIDC_TOKEN` to a file referenced by `AWS_WEB_IDENTITY_TOKEN_FILE`, call `aws sts assume-role-with-web-identity` (`--duration-seconds 3600`), then export `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_SESSION_TOKEN`; Bedrock model IDs carry a region prefix (e.g. `us.anthropic.claude-sonnet-4-6`). Agent Platform job: write the token to a file, generate an `external_account` credential configuration whose `credential_source.file` points at it, and set `GOOGLE_APPLICATION_CREDENTIALS` (no service account keys stored).
- Prerequisites per provider: Bedrock needs GitLab as an OIDC identity provider in AWS IAM and a role whose trust policy is restricted to your project/refs; Agent Platform needs IAM Credentials, STS, and Agent Platform APIs enabled, a Workload Identity Pool/provider for GitLab OIDC, and a dedicated least-privilege service account that the WIF principal may impersonate.
- Troubleshooting: if the job can't write comments or open MRs, check `CI_JOB_TOKEN` permissions (or use a Project Access Token with `api` scope), that `mcp__gitlab` is in `--allowedTools`, and that `AI_FLOW_*` variables supply context; mention `@claude` (not `/claude`) and confirm the mention trigger is configured.
- Source: https://code.claude.com/docs/en/gitlab-ci-cd.md, fetched 2026-11-14.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Use Claude Code GitHub Actions with cloud providers](./github-actions-cloud-providers.md)
