---
name: anthropic-managed-agents
description: >
  Claude Managed Agents (platform.claude.com) リファレンス。Agents / Sessions / Environments API,
  SSE event streaming, event deltas, session threads, session budgets,
  multiagent orchestration (subagents, dynamic workflows, workflow runs, advisor),
  deployments (cron), dreams, vaults, memory stores, self-hosted sandboxes, webhooks,
  web search / fetch ドメイン制限, secure deployment, permission policies,
  Agent Skills, MCP connector, user profiles。
user-invocable: false
---

# anthropic-managed-agents

Claude Managed Agents (platform.claude.com/docs/en/managed-agents) — Anthropic 管理インフラ上で動く
非同期エージェントハーネス。agent 定義・environment（cloud / self-hosted sandbox）・
session ライフサイクル・SSE イベントストリーミング・deployment（cron スケジュール）・dreams（メモリ統合）・
vaults（credentials）・memory stores・webhooks・multiagent orchestration（subagents / dynamic workflows = workflow runs / advisor）・
session budgets・session threads・event deltas・web tool のドメイン制限・secure deployment をカバーする公式リファレンス。

Messages API 直接呼び出しは `anthropic-api-core`、自前ホストの Agent SDK は `anthropic-agent-sdk`、
tool use / Agent Skills / MCP の API 本体は `anthropic-api-tools-mcp`、Admin API は `anthropic-admin-platform`
を参照（本スキルは Claude Managed Agents の運用面を担当）。

## ディレクトリ構成

```text
skills/anthropic-managed-agents/
  SKILL.md
  references/
    getting-started/
      README.md
      agent-setup.md
      define-outcomes.md
      migration.md
      onboarding.md
      overview.md
      quickstart.md
    sessions/
      README.md
      files.md
      github.md
      memory.md
      mcp-connector.md
      permission-policies.md
      reference.md
      session-observability.md
      session-operations.md
      sessions.md
      skills.md
      tools.md
      tools-web-restrictions.md
      budgets.md
    environments/
      README.md
      choosing-an-environment.md
      cloud-sandboxes-reference.md
      environments.md
      self-hosted-sandboxes.md
      self-hosted-sandboxes-custom-tools.md
      self-hosted-sandboxes-memory.md
      self-hosted-sandboxes-operations.md
      self-hosted-sandboxes-reference.md
      self-hosted-sandboxes-security.md
      self-hosted-sandboxes-workers.md
      vaults.md
    orchestration/
      README.md
      dreams.md
      event-deltas.md
      events-and-streaming.md
      multiagent-orchestration.md
      scheduled-deployments.md
      session-threads.md
      webhooks.md
      workflow-runs.md
    security/
      README.md
      secure-deployment.md
      secure-deployment-monitoring.md
      secure-deployment-risks.md
    endpoints/
      README.md
      agents.md
      deployments.md
      dreams.md
      environments.md
      memory-stores.md
      sessions.md
      user-profiles.md
      vaults.md
      webhooks.md
  samples/
    README.md
    create-agent-session.md
    event-streaming.md
    custom-tool-and-permission-events.md
    session-files.md
    scheduled-deployment.md
    multiagent.md
    self-hosted-worker.md
    session-budget.md
    vault-credentials.md
    workflow-runs.md
  scripts/
    README.md
    curl-lifecycle.md
    curl-resources.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. `endpoints` はエンドポイント個別ページではなく**リソース単位の集約ページ**（1 リソース 1 ファイルに全エンドポイントを表で網羅、beta ヘッダー値も各ページ Notes に記載）なので、リソース名（Agents / Sessions / Environments / Deployments / Dreams / Vaults / Memory Stores / User Profiles / Webhooks）から直接ページを引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| agent 定義（model / system prompt / tools / skills / MCP servers）・outcome 設計・Messages API/Agent SDK からの移行・Console でのプロトタイピングを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| session の作成・操作（取得・一覧・更新・archive・削除）・files・GitHub 連携・memory・MCP connector・permission policies・tools・web tool（web search / fetch）のドメイン制限・session budgets（予算）・usage の確認（observability）を知りたい | sessions | [references/sessions/README.md](references/sessions/README.md) |
| environment の選び方（choosing an environment）・cloud sandbox の構成とプリインストール内容・self-hosted sandbox の worker デプロイ / custom tools / memory / 運用 / リファレンス / security model・vaults 認証を知りたい | environments | [references/environments/README.md](references/environments/README.md) |
| SSE event streaming・event deltas（応答テキストのプレビュー）・deployment の cron スケジュール・dreams によるメモリ統合・multiagent orchestration（subagents / dynamic workflows / advisor）・session threads・workflow runs・webhooks 購読を知りたい | orchestration | [references/orchestration/README.md](references/orchestration/README.md) |
| デプロイのセキュリティ強化（ネットワーク制限・vaults・web ドメイン制限・承認・最小 tools・信頼できない入力・limits と停止経路）・session のレビューと監視・リスクと sandbox 境界を知りたい | security | [references/security/README.md](references/security/README.md) |
| Agents / Sessions / Environments / Deployments / Dreams / Vaults / Memory Stores / User Profiles / Webhooks の各リソースのエンドポイント仕様（リクエスト・レスポンス表）を確認したい | endpoints | [references/endpoints/README.md](references/endpoints/README.md) |
| 典型的な使い方を知りたい（agent 作成〜session 起動, event streaming, custom tool/permission, session files, scheduled deployment, multiagent, self-hosted worker, workflow runs, session budget, vault credentials） | samples | [samples/README.md](samples/README.md) |
| curl でのライフサイクル操作・environments/vaults/memory stores/deployments の代表的な curl コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
