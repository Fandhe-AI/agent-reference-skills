<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/github-actions-cloud-providers.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/github-enterprise-server.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/gitlab-ci-cd.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/code-review.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/code-review-local.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/code-review-pull-requests.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/ultrareview.md / last verified: 2026-10-16 -->
<!-- source: https://code.claude.com/docs/en/slack.md / last verified: 2026-10-16 -->

# cicd-setup

Setup commands, workflow examples, and trigger phrases for running Claude Code through GitHub Actions, GitHub Enterprise Server, GitLab CI/CD, Code Review (managed, local, and ultrareview), and Slack.

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

- `@claude review` and `@claude review once` start a single review without subscribing the PR to future pushes; `@claude review always` also subscribes the PR to push-triggered reviews.
- Before a July 2026 update, `@claude review` subscribed the PR to push-triggered reviews. To keep that behavior, comment `@claude review always` instead.
- Post it as a new top-level pull request comment (not an inline diff comment, not a review body, and editing an earlier comment doesn't count), with the command at the start of the comment and `always` on the same line.
- The commenter needs write, maintain, or admin permission on the repository. Comments from bots don't start reviews.

## Code Review のトリガー（ローカル、GitHub App 不要）

```text
/code-review
/code-review --fix
/code-review --comment
/code-review ultra
```

`/review` is an alias of `/code-review` (v2.1.223+; before that, `/review` was a separate single-pass, read-only PR review). With no target, the review covers your branch's commits ahead of its upstream plus uncommitted changes. `--fix` applies findings to the working tree through your permission mode; `--comment` posts findings as inline comments on a GitHub PR, or as a single note on a GitLab MR.

## ローカルレビューの対象指定

```text
/code-review HEAD~15..HEAD
/code-review main...my-feature
/code-review abc1234^..abc1234
/code-review 1234
/code-review src/auth
```

A target can be a PR number, a branch name, a file or directory path, or a Git revision range (`abc1234` is a commit hash).

## ローカルレビューの effort と上限

```text
/code-review high
/code-review --max-findings 50
/code-review --max-findings all
/code-review --max-findings default
```

An effort level (`low` through `max`) trades coverage for confidence; with no level typed, the review reuses the last level you typed. `--max-findings <n|all|default>` requires Claude Code v2.1.288+; the findings-tool limit is 32, and the value typed in a non-interactive `-p` run isn't remembered.

## GitLab MR へのレビュー投稿

```text
/code-review --comment !123
```

Requires Claude Code v2.1.257+ and the `glab` CLI (without it, findings are printed in the terminal). Pass the MR as its URL or `!123`; a bare number or branch name is treated as an MR only when the checkout's origin is on `gitlab.com`.

## ultrareview（クラウド、対話）

```text
/code-review ultra
/code-review ultra develop
/code-review ultra 1234
/code-review ultra 1234 --post
/code-review ultra --fix
```

`/code-review ultra` escalates to the deeper cloud ultrareview; `--post` (v2.1.227+) preselects posting the findings to a `github.com` PR as one plain comment from your GitHub account, and the launch dialog still asks before launching. Requires claude.ai auth. Unavailable on Bedrock/Vertex/Foundry, with Zero Data Retention, or with the HIPAA configuration applied (in these cases `/code-review ultra` runs a local review instead). Organizations that use customer-managed encryption keys (CMEK) can't run ultrareview.

## ultrareview（非対話、CI / スクリプト）

```bash
claude ultrareview
claude ultrareview 1234
claude ultrareview origin/main
claude ultrareview 1234 --json --timeout 30 --post
```

Syntax: `claude ultrareview [<PR>|<base>] [--json] [--timeout <minutes>] [--post|--no-post]`. Blocks until the remote review finishes and prints findings to stdout (progress goes to stderr).

| Flag | Description |
| --- | --- |
| `--json` | Print the raw `bugs.json` payload instead of the formatted findings |
| `--timeout <minutes>` | Maximum minutes to wait. Defaults to 45 |
| `--post` | Post findings to a `github.com` PR as one plain comment (v2.1.227+) |
| `--no-post` | Don't post (default; wins if both are passed; v2.1.227+) |

Exit codes: `0` review completed (with or without findings); `1` failed to launch, stopped, cloud session errored, or timeout elapsed; `130` interrupted with Ctrl-C.

> **警告**: Running the subcommand yourself counts as consent to the usage-credits billing prompt and to the whole-repository fallback when no merge base exists. After the free runs, a review typically bills about $5 to $25 in usage credits. `claude -p '/code-review ultra'` launches the cloud review and exits without the findings, so use `claude ultrareview` in scripts.

## Slack: Claude Tag の接続とチャンネルメンション

```text
@Claude connect
```

`@Claude connect` is the command named in the retirement notice that the earlier Claude Code in Slack shows when the workspace is connected to Claude Tag; it is the starting point for connecting the workspace (Claude Tag is available on Team and Enterprise plans), followed by "Set up Claude Tag".

The earlier Claude Code in Slack (documented in `slack.md`) answers channel mentions only from Pro and Max accounts, in workspaces not connected to Claude Tag:

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
- To stop Claude and scheduled tasks from starting `/code-review` on their own, set `skillOverrides` (see `references/cicd/code-review-local.md`).
- Full inputs and environment variables for each surface: `references/cicd/github-actions.md`, `references/cicd/github-actions-cloud-providers.md`, `references/cicd/github-enterprise-server.md`, `references/cicd/gitlab-ci-cd.md`, `references/cicd/code-review.md`, `references/cicd/slack.md`.
