# cicd

| Name | Description | Path |
|------|-------------|------|
| Code Review | 自動 PR review。logic error、security vulnerability、regression を multi-agent 分析で検出 | [code-review.md](./code-review.md) |
| Claude Code GitHub Actions | GitHub Actions での Claude Code 実行。`@claude` mention 対応、task automation、issue から PR 生成 | [github-actions.md](./github-actions.md) |
| Use Claude Code GitHub Actions with cloud providers | GitHub Actions を cloud provider 経由で実行。Bedrock/Agent Platform/Foundry、OIDC 認証 | [github-actions-cloud-providers.md](./github-actions-cloud-providers.md) |
| Claude Code with GitHub Enterprise Server | Claude Code を GitHub Enterprise Server に接続。Web session、Code Review、plugin marketplace | [github-enterprise-server.md](./github-enterprise-server.md) |
| Claude Code GitLab CI/CD | GitLab CI/CD への Claude Code 統合。Event-driven job、MR 作成/更新、Claude API/Bedrock/Agent Platform | [gitlab-ci-cd.md](./gitlab-ci-cd.md) |
| Claude Code in Slack | Slack から `@Claude` mention で coding task 委譲。Claude Code session を web で開始 | [slack.md](./slack.md) |
