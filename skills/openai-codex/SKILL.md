---
name: openai-codex
description: >
  OpenAI Codex (CLI / IDE / cloud / ChatGPT desktop app) リファレンス。
  GPT-6 系, Fast / Ultrafast mode, codex exec, スラッシュコマンド, prompting, AGENTS.md, rules, subagents,
  approvals, auto-review, sandbox, permission profiles, profiles, config.toml, 環境変数, roles, MCP 設定,
  GitHub Action, Codex SDK, App Server (JSON-RPC), Agents SDK 連携, Codex skills (.agents/skills), plugins,
  scheduled tasks, Browser, Computer Use, cloud / local / worktree 環境, git worktrees, Record & Replay, cloud 委譲,
  GitHub / GitLab / Linear / Slack 連携, administration, provisioning, analytics API, compliance API, LLM gateway,
  Codex Security 脆弱性スキャン (SARIF), deep scan, triage, findings, threat model, security hardening。
user-invocable: false
---

# openai-codex

OpenAI Codex — `codex` CLI / IDE 拡張 / ChatGPT desktop app（公式表記は Codex in the ChatGPT desktop app）/ cloud からなる OpenAI 公式のコーディングエージェント製品。
対象は learn.chatgpt.com/docs の取得日 2026-10-16 時点（URL に版なし。対象モデル世代は GPT-6 系: gpt-6-astra / gpt-6.1-sol / gpt-6-sol / gpt-6-luna）。
CLI・IDE・desktop app・cloud への導入、CLI / IDE / desktop app のコマンドと設定、AGENTS.md/rules/subagents/memories によるエージェント設定、
Fast / Ultrafast mode、config.toml/MCP 設定、approvals・sandbox・GitHub Action・Codex SDK・App Server による自動化、
plugins・Codex skills 作成・scheduled tasks・Browser・Computer Use・web search による拡張、
ワークスペース administration（LLM gateway・service accounts・Agent Security 含む）、
Codex Security による脆弱性スキャン・修復、cloud/local/worktree 環境の切り替えと Record & Replay、
GitHub・GitLab・Linear・Slack との連携・code review をカバーする。

`codex mcp-server` は削除済みで、App Server（JSON-RPC）が後継。`references/security-automation/agents-sdk-mcp-server.md` は `codex mcp-server` 削除と App Server への移行手順をまとめたページ（旧 Agents SDK 連携例はサポート終了）。

本スキルは OpenAI Codex の公式ドキュメントを蒸留したものであり、本リポジトリが対象とする Claude Code の
`.claude/` 体系とは別物である。`AGENTS.md` / `rules` / `subagents` など用語が重なる箇所があるが、
設定ファイルの形式・置き場所・意味は Claude Code の `CLAUDE.md` / `.claude/rules/` / `.claude/agents/` と互換性がない
（AGENTS.md・rules・subagents の詳細は `references/agent-configuration/README.md` の索引から各ページを参照）。

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
      desktop-app.md
      windows-app.md
      linux-app.md
      cloud.md
      cloud-internet-access.md
      remote.md
      remote-connections.md
      models.md
      model-selection.md
      codex-micro.md
      best-practices.md
      troubleshooting.md
    commands/
      README.md
      cli-global-flags.md
      cli-subcommands.md
      cli-slash-commands.md
      ide-commands.md
      ide-slash-commands.md
      ide-settings.md
      app-commands.md
      app-settings.md
    agent-configuration/
      README.md
      agents-md.md
      rules.md
      hooks.md
      speed.md
      subagents.md
      prompting.md
      memories.md
      import.md
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
      app-server.md
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
      service-accounts.md
      analytics-api.md
      compliance-api.md
      governance.md
      agent-security.md
      workspace-analytics.md
      workspace-model-availability.md
      plugin-controls.md
      plugin-management.md
      skill-controls.md
      managed-configuration.md
      manage-app-updates.md
      windows-deployment.md
      authentication.md
      connect-to-a-gateway.md
      roll-out-a-gateway.md
      gateway-compatibility.md
      sign-in-with-chatgpt-through-a-gateway.md
      bedrock-through-litellm.md
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
      cli-ci-gitlab.md
      sdk.md
    environments/
      README.md
      cloud-environments.md
      cloud-environment.md
      git-worktrees.md
      local-environment.md
      modes.md
    extend/
      README.md
      plugins.md
      build-skills.md
      automations.md
      browser.md
      computer-use.md
      web-search.md
      record-and-replay.md
    third-party/
      README.md
      github.md
      gitlab.md
      code-review.md
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
| Codex CLI / IDE 拡張 / desktop app / cloud の導入・違いを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CLI の出力・エイリアスをカスタマイズしたい、desktop app（Windows / Linux）・リモート接続から使いたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| モデル選択（GPT-6 系・Codex Micro 含む）・reasoning effort・ベストプラクティス・トラブルシュートを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CLI のフラグ・サブコマンド・スラッシュコマンド、IDE / desktop app のコマンドと設定を引きたい | commands | [references/commands/README.md](references/commands/README.md) |
| AGENTS.md / prompting / subagents / memories ワークフローを設定したい | agent-configuration | [references/agent-configuration/README.md](references/agent-configuration/README.md) |
| サンドボックス外で実行するコマンドを rules（`.rules` / Starlark `prefix_rule`）で許可したい、hooks でエージェントのライフサイクルにフックしたい | agent-configuration | [references/agent-configuration/README.md](references/agent-configuration/README.md) |
| Fast / Ultrafast mode で速度を切り替えたい、Claude Code / Cursor の設定を取り込みたい（import） | agent-configuration | [references/agent-configuration/README.md](references/agent-configuration/README.md) |
| config.toml のキー・プロファイル・MCP サーバー設定、Amazon Bedrock 経由の利用を知りたい | config | [references/config/README.md](references/config/README.md) |
| 環境変数の一覧を知りたい | config | [references/config/README.md](references/config/README.md) |
| approvals / sandbox / permission profiles / permission modes を設計したい | security-automation | [references/security-automation/README.md](references/security-automation/README.md) |
| codex exec を CI/GitHub Action/Codex SDK から自動実行したい、Windows/WSL 上のサンドボックスを設定したい | security-automation | [references/security-automation/README.md](references/security-automation/README.md) |
| App Server でカスタムクライアントを作りたい（旧 MCP server からの移行） | security-automation | [references/security-automation/README.md](references/security-automation/README.md) |
| ワークスペースの roles / provisioning / analytics / compliance を管理したい | administration | [references/administration/README.md](references/administration/README.md) |
| Enterprise ロールアウト・アクセストークン運用を知りたい | administration | [references/administration/README.md](references/administration/README.md) |
| LLM gateway 経由の利用・service accounts・Agent Security・plugin 管理を設定したい | administration | [references/administration/README.md](references/administration/README.md) |
| リポジトリの脆弱性スキャン・トリアージ・修復（Codex Security）を行いたい、PR/差分のセキュリティレビューをしたい | security | [references/security/README.md](references/security/README.md) |
| 検出結果の SARIF/CSV/JSON エクスポート・CI（GitLab 含む）連携・threat model 調整をしたい | security | [references/security/README.md](references/security/README.md) |
| Cloud / Local / Worktree 環境の設定・切り替え、git worktree でチャットを分離したい | environments | [references/environments/README.md](references/environments/README.md) |
| 新 Cloud environments と Legacy の違いを知りたい | environments | [references/environments/README.md](references/environments/README.md) |
| plugins・Codex skills 作成（.agents/skills）・scheduled tasks（automations）・Browser・Computer Use・web search を使いたい | extend | [references/extend/README.md](references/extend/README.md) |
| ワークフローを録画してスキル化したい（Record & Replay） | extend | [references/extend/README.md](references/extend/README.md) |
| GitHub / GitLab / Linear / Slack（ChatGPT in Slack）から Codex を呼び出したい | third-party | [references/third-party/README.md](references/third-party/README.md) |
| GitLab MR レビュー・code review 全般を設定したい | third-party | [references/third-party/README.md](references/third-party/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
