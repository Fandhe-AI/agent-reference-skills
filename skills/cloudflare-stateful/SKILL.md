---
name: cloudflare-stateful
description: >
  Cloudflare Workers のステートフル基盤 (Durable Objects) の
  リファレンス。DurableObject、ctx.storage SQL / KV API、alarms、WebSocket hibernation。
  ランタイムは cloudflare-workers、Wrangler は cloudflare-wrangler、Upstash QStash・Inngest・BullMQ とは別。
user-invocable: false
---

# Cloudflare ステートフル基盤 リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

Cloudflare Workers 上のステートフル 3 製品 — Durable Objects（強い一貫性を持つ単一インスタンス + 永続ストレージ）、Queues（メッセージキュー）、Workflows（耐久実行ワークフロー）— を扱う。各製品の Workers バインディング API、設定、運用、制限、料金、実例、`wrangler` コマンドを参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
- binding 型製品のため npm パッケージの版数は無い

## 他スキルとの使い分け

- cloudflare-workers: `env` / bindings の概念、service bindings、RPC、ランタイム API。本スキルは Durable Objects / Queues / Workflows 固有のバインディング API のみ扱う
- cloudflare-wrangler: Wrangler 全般、設定ファイルのキー仕様、Miniflare / Vitest。本スキルは製品別の `wrangler queues` / `workflows` 等のサブコマンドのみ扱う
- cloudflare-storage: D1 / KV / R2 / Hyperdrive は別製品。Durable Objects の `ctx.storage`（SQLite / KV API）は本スキルが担当
- cloudflare-agents: Durable Objects 上に構築するエージェント（Agents SDK）は cloudflare-agents が担当
- drizzle: Durable Objects の SQLite を Drizzle ORM で扱う場合は drizzle が担当
- upstash / inngest / bullmq: Upstash QStash、Inngest、BullMQ は別製品。Cloudflare Queues / Workflows とは別物
- 未収録の Cloudflare 製品は公式 docs（`https://developers.cloudflare.com/<product>/`）を参照
- cloudflare-agents は同ファミリーの分割 PR で順次追加中。未マージの間は公式 docs（cloudflare-agents: https://developers.cloudflare.com/agents/）を参照

## ディレクトリ構成

```text
skills/cloudflare-stateful/
  SKILL.md
  references/
    durable-objects/
      README.md
      access-storage.md
      alarms.md
      base-class.md
      class-migrations-legacy.md
      code-updates.md
      create-stubs-and-send-requests.md
      data-location.md
      data-security.md
      data-studio.md
      durable-object-lifecycle.md
      environments.md
      error-handling.md
      faq.md
      get-started.md
      glossary.md
      id.md
      in-memory-state.md
      known-issues.md
      legacy-kv-storage-api.md
      limits.md
      metrics-and-analytics.md
      migrations.md
      namespace.md
      overview.md
      pricing.md
      rules-of-durable-objects.md
      sqlite-storage-api.md
      state.md
      stub.md
      troubleshooting.md
      webgpu.md
      websockets.md
      what-are-durable-objects.md
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（durable-objects）を探す
2. そのカテゴリの `references/{category}/README.md`を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Durable Objects の概念・ライフサイクル・設計ルールを知りたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| DurableObject クラス・stub・namespace・ID の API を調べたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| ctx.storage の SQL API / KV API を使いたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| alarms・WebSocket hibernation・in-memory state を扱いたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| Durable Objects の migrations・制限・料金・トラブルシュートを確認したい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
