---
name: anthropic-managed-agents
description: >
  Claude Managed Agents (platform.claude.com/docs/en/managed-agents) リファレンス。
  Agents API, Sessions API, Environments API, SSE event streaming, threads,
  deployments (cron スケジュール), dreams (メモリ統合), vaults (credentials),
  memory stores, self-hosted sandboxes, webhooks, multiagent orchestration,
  user profiles, Agent Skills 添付, MCP connector 接続, permission policies。
user-invocable: false
---

# anthropic-managed-agents

Claude Managed Agents (platform.claude.com/docs/en/managed-agents) — Anthropic 管理インフラ上で動く
非同期エージェントハーネス。agent 定義・environment（cloud / self-hosted sandbox）・
session ライフサイクル・SSE イベントストリーミング・deployment（cron スケジュール）・dreams（メモリ統合）・
vaults（credentials）・memory stores・webhooks・multiagent orchestration をカバーする公式リファレンス。

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
      session-operations.md
      sessions.md
      skills.md
      tools.md
    environments/
      README.md
      cloud-sandboxes-reference.md
      environments.md
      self-hosted-sandboxes-security.md
      self-hosted-sandboxes.md
      vaults.md
    orchestration/
      README.md
      dreams.md
      events-and-streaming.md
      multiagent-orchestration.md
      scheduled-deployments.md
      webhooks.md
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
    vault-credentials.md
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
| session の作成・操作（取得・一覧・更新・archive・削除）・files・GitHub 連携・memory・MCP connector・permission policies・tools を知りたい | sessions | [references/sessions/README.md](references/sessions/README.md) |
| environment（cloud / self-hosted sandbox）の構成・cloud sandbox のプリインストール内容・security model・vaults 認証を知りたい | environments | [references/environments/README.md](references/environments/README.md) |
| SSE event streaming・deployment の cron スケジュール・dreams によるメモリ統合・multiagent orchestration・webhooks 購読を知りたい | orchestration | [references/orchestration/README.md](references/orchestration/README.md) |
| Agents / Sessions / Environments / Deployments / Dreams / Vaults / Memory Stores / User Profiles / Webhooks の各リソースのエンドポイント仕様（リクエスト・レスポンス表）を確認したい | endpoints | [references/endpoints/README.md](references/endpoints/README.md) |
| 典型的な使い方を知りたい（agent 作成〜session 起動, event streaming, custom tool/permission, session files, scheduled deployment, multiagent, self-hosted worker, vault credentials） | samples | [samples/README.md](samples/README.md) |
| curl でのライフサイクル操作・environments/vaults/memory stores/deployments の代表的な curl コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
