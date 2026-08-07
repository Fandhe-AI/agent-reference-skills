---
name: openai-codex
description: >
  OpenAI Codex (CLI / IDE / cloud) の公式リファレンス。
  codex CLI, codex exec, AGENTS.md, rules, subagents, prompting,
  approvals, sandbox, permission profiles, auto-review,
  config.toml, profiles, MCP 設定, 環境変数,
  GitHub Action, Codex SDK, Agents SDK 連携, cloud 委譲,
  administration, roles, provisioning, analytics API, compliance API,
  Codex Security 脆弱性スキャン, deep scan, triage, findings, SARIF export,
  threat model, security hardening,
  cloud / local / worktree 環境, git worktrees, Record & Replay,
  GitHub / Linear / Slack 連携。
user-invocable: false
---

# openai-codex

OpenAI Codex — `codex` CLI / IDE 拡張 / cloud からなる OpenAI 公式のコーディングエージェント製品。
CLI・IDE・cloud への導入、AGENTS.md/rules/subagents によるエージェント設定、config.toml/MCP 設定、
approvals・sandbox・GitHub Action・Codex SDK による自動化、ワークスペース administration、
Codex Security による脆弱性スキャン・修復、cloud/local/worktree 環境の切り替えと Record & Replay
によるスキル化、GitHub・Linear・Slack との連携をカバーする。

本スキルは OpenAI Codex の公式ドキュメントを蒸留したものであり、本リポジトリが対象とする Claude Code の
`.claude/` 体系とは別物である。`AGENTS.md` / `rules` / `subagents` など用語が重なる箇所があるが、
設定ファイルの形式・置き場所・意味は Claude Code の `CLAUDE.md` / `.claude/rules/` / `.claude/agents/` と互換性がない
（詳細は `references/agent-configuration/README.md` の冒頭注記を参照）。

## ディレクトリ構成

```text
skills/openai-codex/
  SKILL.md
  references/
    getting-started/
      README.md
      cli.md
      cli-customization.md
      ide.md
      windows-app.md
      cloud.md
      cloud-internet-access.md
      remote.md
      remote-connections.md
      models.md
      codex-micro.md
      best-practices.md
    agent-configuration/
      README.md
      agents-md.md
      rules.md
      hooks.md
      speed.md
      subagents.md
      prompting.md
    config/
      README.md
      config-basics.md
      config-advanced.md
      config-reference.md
      config-sample.md
      environment-variables.md
      mcp-config.md
      amazon-bedrock.md
    security-automation/
      README.md
      agent-approvals-security.md
      sandbox.md
      permission-profiles.md
      permission-modes.md
      auto-review.md
      windows-sandbox.md
      windows-wsl.md
      non-interactive-mode.md
      github-action.md
      codex-sdk.md
      agents-sdk-mcp-server.md
    administration/
      README.md
      administration.md
      admin-rollout-guide.md
      work-admin-faq.md
      usage-limits.md
      groups-and-provisioning.md
      roles-and-workspace-permissions.md
      access-tokens.md
      analytics-api.md
      compliance-api.md
      governance.md
      workspace-analytics.md
      workspace-model-availability.md
      plugin-controls.md
      skill-controls.md
      managed-configuration.md
      manage-app-updates.md
      windows-deployment.md
      authentication.md
    security/
      README.md
      overview.md
      cloud-setup.md
      cloud-faq.md
      threat-model.md
      plugin-quickstart.md
      workbench.md
      scans.md
      deep-scans.md
      code-changes.md
      security-review.md
      triage-backlog.md
      fix-findings.md
      export-findings.md
      vulnerability-reports.md
      security-hardening.md
      plugin-changelog.md
      cli-quickstart.md
      cli-reference.md
      cli-faq.md
      cli-bulk-scans.md
      cli-ci.md
      sdk.md
    environments/
      README.md
      cloud-environment.md
      git-worktrees.md
      local-environment.md
      modes.md
    extend/
      README.md
      record-and-replay.md
    third-party/
      README.md
      github.md
      linear.md
      slack.md
  samples/
    README.md
    follow-goals.md
    github-code-reviews.md
    codebase-onboarding.md
    automation-bug-triage.md
    slack-coding-tasks.md
    reusable-codex-skills.md
    refactor-your-codebase.md
    code-migrations.md
    update-documentation.md
    agent-friendly-clis.md
    verified-operations-workflows.md
    ai-app-evals.md
    scan-code-changes-for-security.md
    deep-security-scan.md
    remediate-vulnerability-backlog.md
    dependency-incident-audits.md
    ios-simulator-bug-debugging.md
  scripts/
    README.md
    install.md
    auth.md
    cli-basics.md
    automation.md
    config.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Codex CLI / IDE 拡張 / cloud の導入・違いを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CLI の出力・エイリアスをカスタマイズしたい、Windows デスクトップアプリ・リモート接続から使いたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| モデル選択（Codex Micro 含む）・reasoning effort・ベストプラクティスを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| AGENTS.md / prompting / subagents ワークフローを設定したい | agent-configuration | [references/agent-configuration/README.md](references/agent-configuration/README.md) |
| サンドボックス外で実行するコマンドを rules（`.rules` / Starlark `prefix_rule`）で許可したい、hooks でエージェントのライフサイクルにフックしたい | agent-configuration | [references/agent-configuration/README.md](references/agent-configuration/README.md) |
| config.toml のキー・プロファイル・MCP サーバー設定、Amazon Bedrock 経由の利用を知りたい | config | [references/config/README.md](references/config/README.md) |
| 環境変数の一覧を知りたい | config | [references/config/README.md](references/config/README.md) |
| approvals / sandbox / permission profiles / permission modes を設計したい | security-automation | [references/security-automation/README.md](references/security-automation/README.md) |
| codex exec を CI/GitHub Action/Codex SDK から自動実行したい、Windows/WSL 上のサンドボックスを設定したい | security-automation | [references/security-automation/README.md](references/security-automation/README.md) |
| ワークスペースの roles / provisioning / analytics / compliance を管理したい | administration | [references/administration/README.md](references/administration/README.md) |
| Enterprise ロールアウト・アクセストークン運用を知りたい | administration | [references/administration/README.md](references/administration/README.md) |
| リポジトリの脆弱性スキャン・トリアージ・修復（Codex Security）を行いたい、PR/差分のセキュリティレビューをしたい | security | [references/security/README.md](references/security/README.md) |
| 検出結果の SARIF/CSV/JSON エクスポート・CI 連携・threat model 調整をしたい | security | [references/security/README.md](references/security/README.md) |
| Cloud / Local / Worktree 環境の設定・切り替え、git worktree でチャットを分離したい | environments | [references/environments/README.md](references/environments/README.md) |
| ワークフローを録画してスキル化したい（Record & Replay） | extend | [references/extend/README.md](references/extend/README.md) |
| GitHub / Linear / Slack から Codex を呼び出したい | third-party | [references/third-party/README.md](references/third-party/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
