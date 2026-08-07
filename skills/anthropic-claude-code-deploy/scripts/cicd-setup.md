<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/github-actions-cloud-providers.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/github-enterprise-server.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/gitlab-ci-cd.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/code-review.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/slack.md / last verified: 2026-08-07 -->

# cicd-setup

Setup commands, workflow examples, and trigger phrases for running Claude Code through GitHub Actions, GitHub Enterprise Server, GitLab CI/CD, Code Review, and Slack.

## GitHub App のクイックセットアップ

```text
/install-github-app
```

Installs the Claude GitHub App, adds the `ANTHROPIC_API_KEY`/`CLAUDE_CODE_OAUTH_TOKEN` secret, and opens a workflow PR. Manual setup instead: install the app, add the secret, copy `examples/claude.yml`.

## GitHub Actions ワークフロー（最小構成）

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## GitHub Actions: クラウドプロバイダー経由の推論

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    use_bedrock: "true"
```

`use_vertex: "true"` / `use_foundry: "true"` route through Google Cloud's Agent Platform / Microsoft Foundry instead. Pair with the matching OIDC secrets (`AWS_ROLE_TO_ASSUME`; `GCP_WORKLOAD_IDENTITY_PROVIDER` + `GCP_SERVICE_ACCOUNT`; `AZURE_CLIENT_ID` + `AZURE_TENANT_ID` + `AZURE_SUBSCRIPTION_ID`) and `id-token: write` permission.

## GitHub Enterprise Server: クローンとクラウド実行

```bash
git clone git@github.example.com:platform/api-service.git
cd api-service
claude --cloud "Add retry logic to the payment webhook handler"
```

`/install-github-app` is github.com only, so GHES needs manual GitHub Actions workflow setup instead.

## Code Review のトリガー（GitHub コメント）

```text
@claude review
@claude review always
@claude review once
```

## Code Review のトリガー（ローカル、GitHub App 不要）

```text
/code-review
/code-review --fix
/code-review --comment
/code-review ultra
```

`/code-review ultra` escalates to the deeper cloud ultrareview; requires claude.ai auth, unavailable on Bedrock/Vertex/Foundry or with Zero Data Retention.

## Slack: チャンネルへの招待とメンション

```text
/invite @Claude
```

```text
@Claude fix the TypeError in the user dashboard component
```

Works only in channels (public or private) via explicit `@Claude` mentions after `/invite @Claude`; does not work in direct messages.

## GitLab CI/CD: ジョブ定義

> **警告**: `--permission-mode acceptEdits` lets Claude apply edits without per-change prompts inside the job.

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

Quick setup: add `ANTHROPIC_API_KEY` as a masked CI/CD variable, then add this job to `.gitlab-ci.yml`. Production setup additionally configures provider OIDC/WIF trust (`AWS_ROLE_TO_ASSUME`/`AWS_REGION` for Amazon Bedrock; `GCP_WORKLOAD_IDENTITY_PROVIDER`/`GCP_SERVICE_ACCOUNT`/`CLOUD_ML_REGION` for Google Cloud's Agent Platform) and `GITLAB_ACCESS_TOKEN` for GitLab API operations beyond `CI_JOB_TOKEN`.

## Notes

- Manage run cost with `--max-turns`, workflow/job-level timeouts, and GitHub's/GitLab's concurrency controls.
- GitHub doesn't trigger workflows on commits made with the default `GITHUB_TOKEN`; use a custom app token if CI must run on Claude's own commits.
- The Code Review **Claude Code Review** check always completes with a neutral conclusion, so it never blocks merges via branch protection. To gate merges, parse its machine-readable `bughunter-severity` JSON in your own CI via `gh api ... | jq` (the literal API path is elided in the source docs — 要確認).
- Full inputs and environment variables for each surface: `references/cicd/github-actions.md`, `references/cicd/github-actions-cloud-providers.md`, `references/cicd/github-enterprise-server.md`, `references/cicd/gitlab-ci-cd.md`, `references/cicd/code-review.md`, `references/cicd/slack.md`.
