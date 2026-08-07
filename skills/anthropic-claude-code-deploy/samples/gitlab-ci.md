<!-- source: https://code.claude.com/docs/en/gitlab-ci-cd.md / last verified: 2026-08-07 -->

# Run Claude Code in GitLab CI/CD

Minimal `.gitlab-ci.yml` job that installs Claude Code and runs it against the Claude API, triggered from a web pipeline or a merge request event.

```yaml .gitlab-ci.yml
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
    # Optional: start a GitLab MCP server if your setup provides one
    - /bin/gitlab-mcp-server || true
    # Use AI_FLOW_* variables when invoking via web/API triggers with context payloads
    - echo "$AI_FLOW_INPUT for $AI_FLOW_CONTEXT on $AI_FLOW_EVENT"
    - >
      claude
      -p "${AI_FLOW_INPUT:-'Review this MR and implement the requested changes'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write mcp__gitlab"
      --debug
```

## Notes

- Requires an `ANTHROPIC_API_KEY` masked (and protected, as needed) CI/CD variable under **Settings > CI/CD > Variables**.
- This integration is maintained by GitLab, not Anthropic, and is currently in beta; it is built on the Claude Code CLI and Agent SDK.
- The `rules` block controls triggers; adjust to fit manual runs, merge request events, or web/API triggers where a comment contains `@claude` via a project webhook that calls the pipeline trigger API.
- For Amazon Bedrock or Google Cloud's Agent Platform instead of the Claude API, add `AWS_ROLE_TO_ASSUME` / `AWS_REGION` or `GCP_WORKLOAD_IDENTITY_PROVIDER` / `GCP_SERVICE_ACCOUNT` variables and exchange the GitLab OIDC token for cloud credentials in `before_script` (see `github-actions-bedrock-vertex.md` for the equivalent GitHub Actions credential exchange pattern).
