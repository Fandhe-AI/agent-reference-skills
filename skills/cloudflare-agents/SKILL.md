---
name: cloudflare-agents
description: >
  Cloudflare Agents SDK (agents パッケージ、Durable Objects 上のエージェント) の
  リファレンス。Agent class、state / setState、this.sql、schedule、@callable RPC、routeAgentRequest、
  useAgent / AgentClient、AIChatAgent。
  OpenAI Agents SDK (openai-agents)・Claude Agent SDK (anthropic-agent-sdk) とは別、MCP 仕様は mcp-spec。
user-invocable: false
---

# Cloudflare Agents SDK リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

Cloudflare Agents SDK（npm `agents`）を扱う。Durable Objects 上で動く状態保持型エージェントの `Agent` クラス、state / SQL / スケジューリング / `@callable` RPC / WebSocket・HTTP ルーティング、チャット（`AIChatAgent`）、リモート MCP サーバー公開（`McpAgent`）と MCP クライアント（`MCPClientManager`）、Think などの harness、モデルプロバイダー（`createAI`）、ツール群（browser / Code Mode / web fetch・search / sandbox / x402・MPP 課金）、Agent skills（agents SDK）を参照する。

## 対象バージョン

- agents 0.32.0、@cloudflare/ai-chat 0.12.2
- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin

## 他スキルとの使い分け

- cloudflare-stateful: Durable Objects 基盤そのもの（クラス定義・storage API・alarms・Workflows 等）。本スキルは DO の上に載る Agents SDK の `Agent` クラス以降を扱う
- cloudflare-ai: Workers AI・AI Gateway・Vectorize・AI Search のモデル推論基盤。本スキルは `createAI` 経由でエージェントからモデルを呼ぶ側のみ扱う
- cloudflare-sandbox-containers: Sandbox SDK / Containers 本体。本スキルはエージェントにサンドボックスを接続するツール（`tools/sandbox.md`）のみ扱う
- cloudflare-workers: Worker のランタイム API・env bindings・service bindings・RPC
- cloudflare-wrangler: Wrangler CLI・`wrangler.jsonc` のキー仕様・テスト基盤。本スキルの `scripts/` はエージェント固有のコマンド（create / dev / deploy / MCP Inspector）のみ
- vercel-ai-sdk: AI SDK（`ai` / `@ai-sdk/*`）本体。本スキルは `AIChatAgent` や `createAI` から AI SDK を使う接点のみ扱う
- mcp-spec: MCP プロトコル仕様そのもの。本スキルは Agents SDK 上の MCP サーバー公開（`McpAgent`）・クライアント接続（`MCPClientManager`）の実装を扱う
- anthropic-claude-code-extend: Claude Code から MCP サーバーへ接続する設定は別スキル。本スキルの MCP は Cloudflare Workers 上で公開・接続する側
- anthropic-api-tools-mcp: Claude API の MCP connector・tool use は別スキル
- openai-agents: OpenAI Agents SDK（Python / TypeScript、handoffs・guardrails・tracing）は別物。本スキルの `agents` パッケージは Cloudflare 製
- openai-apps-sdk: ChatGPT 内アプリを MCP サーバーとして公開する SDK は別物
- anthropic-agent-sdk: Claude Agent SDK（自前ホスト型のエージェントループ）は別物。本スキルは Durable Objects 上でホストされる Cloudflare のエージェント
- 「Agent skills (agents SDK)」（`references/agent-skills/` と `references/tools/skills-tools.md`）は Agents SDK が提供するスキル読み込み機能であり、Claude Code の Agent Skills（SKILL.md）や本リポジトリのスキルとは別物。SKILL.md 形式の仕様自体は `references/concepts/agent-skills.md` にあるが、Claude Code 側の skills 設定は anthropic-claude-code-extend を参照
- cloudflare-stateful / cloudflare-ai / cloudflare-sandbox-containers は同ファミリーの分割 PR で順次追加中。未マージの間は公式 docs（cloudflare-stateful: https://developers.cloudflare.com/durable-objects/ ・ /queues/ ・ /workflows/、cloudflare-ai: https://developers.cloudflare.com/workers-ai/ ・ /ai-gateway/ ・ /vectorize/ ・ /ai-search/、cloudflare-sandbox-containers: https://developers.cloudflare.com/sandbox/ ・ /containers/）を参照

## ディレクトリ構成

```text
skills/cloudflare-agents/
  SKILL.md
  references/
    agent-class/
      README.md
      agent-tools.md
      autonomous-responses.md
      callable-methods.md
      chat-agents-advanced.md
      chat-agents.md
      chat-sdk.md
      client-sdk.md
      durable-execution.md
      email.md
      internals.md
      overview.md
      push-notifications.md
      queue-tasks.md
      retries.md
      routing.md
      run-workflows.md
      schedule-tasks.md
      state.md
      sub-agents.md
      voice.md
      webhooks.md
      websockets.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（agent-class）を探す
2. そのカテゴリの `references/{category}/README.md`を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

`agent-class/` は `Agent` クラスの機能別ガイド、`runtime/` は SDK ランタイム層（lifecycle・routing・scheduler・sessions・tracing 等）のリファレンス。両者で同名のページ（`state` / `routing` / `websockets`）があるため、README の説明で選ぶ。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Agent class の state / setState・this.sql・schedule・`@callable` RPC を使いたい | agent-class | [references/agent-class/README.md](references/agent-class/README.md) |
| チャットエージェント（AIChatAgent）・useAgent / AgentClient・WebSocket クライアントを実装したい | agent-class | [references/agent-class/README.md](references/agent-class/README.md) |
| email・voice・webhooks・push notifications・Workflows 連携を組み込みたい | agent-class | [references/agent-class/README.md](references/agent-class/README.md) |
| sub-agents・retries・durable execution・queue tasks を扱いたい | agent-class | [references/agent-class/README.md](references/agent-class/README.md) |
