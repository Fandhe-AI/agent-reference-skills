<!-- source: https://code.claude.com/docs/en/gitlab-ci-cd.md / last verified: 2026-08-07 -->

# Claude Code GitLab CI/CD

Integrate Claude Code into GitLab CI/CD pipelines: event-driven jobs that create/update MRs, respond to `@claude` mentions, and run on the Claude API, Amazon Bedrock, or Google Cloud's Agent Platform. Currently in beta, maintained by GitLab.

## Signature / Usage

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
    - curl -fsSL https://claude.ai/install.sh | bash
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
| `GCP_WORKLOAD_IDENTITY_PROVIDER` / `GCP_SERVICE_ACCOUNT` / `CLOUD_ML_REGION` | CI/CD variable | Workload Identity Federation resources for Google Cloud's Agent Platform |
| `GITLAB_ACCESS_TOKEN` | CI/CD variable | Project Access Token with `api` scope, when `CI_JOB_TOKEN` isn't sufficient for GitLab API operations |
| `--permission-mode acceptEdits` | CLI flag | Lets Claude apply edits without per-change prompts in the job |
| `--allowedTools` | CLI flag | Restricts which tools Claude can invoke, e.g. `"Bash Read Edit Write mcp__gitlab"` |

## Notes

- Quick setup: add `ANTHROPIC_API_KEY` as a masked CI/CD variable and a `claude` job to `.gitlab-ci.yml`; trigger manually, on `merge_request_event`, or via a webhook listener that calls the pipeline trigger API on `@claude` comments.
- Manual/production setup additionally configures provider OIDC/WIF trust and project credentials for GitLab API operations (`CI_JOB_TOKEN` or a Project Access Token).
- Each job runs in an isolated container; Claude's changes flow through MRs so branch protection and approval rules still apply.
- Costs come from GitLab Runner minutes plus API token usage; control with `max_turns`, job timeouts, and concurrency limits.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Use Claude Code GitHub Actions with cloud providers](./github-actions-cloud-providers.md)
