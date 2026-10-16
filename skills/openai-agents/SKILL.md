---
name: openai-agents
description: >
  OpenAI API (developers.openai.com) の Agents SDK (Python / TypeScript)・Agents API (beta)。
  Agent, Runner, handoffs, guardrails, tracing, SandboxAgent、
  client.beta.agents の sessions / environments / vaults / plugins、
  built-in tools（web search, file search, computer use, code interpreter, image generation）、
  function tools, vector stores, MCP (Model Context Protocol) connectors, background mode, multi-agent orchestration。
user-invocable: false
---

## スコープ

Nous Research の `hermes-agent`（サードパーティ AI CLI）とは別物。Responses API 本体は `openai-api-core` スキル、Codex CLI は `openai-codex` スキルが担当する（本スキルは Agents SDK / built-in tools / MCP / orchestration に特化）。本スキルの MCP は Agents SDK から MCP サーバー・connectors を消費する側であり、MCP サーバーを ChatGPT アプリとして公開する側（`window.openai`, `registerAppTool`, ChatGPT UI コンポーネント）は `openai-apps-sdk` スキルが扱う。クロススキル参照は名前のみで行い、相対リンクは張らない。

Agents API（OpenAI が Codex harness をホストする beta の managed agent サービス。`client.beta.agents.*`、ヘッダー `OpenAI-Beta: agents=v1`）も本スキルで扱う（`references/agents-api/`）。名前と概念（sessions / environments / vaults / managed agents）が衝突する `anthropic-managed-agents`（Claude Managed Agents）とは別物。Codex CLI / cloud 自体は `openai-codex` スキルの担当。Agents API の Session webhooks と Responses API の汎用 webhooks（`openai-api-core`）も別物。

出典は developers.openai.com/api/docs の .md twin（取得日 2026-10-17）。Agents API は beta。docs 例の既定モデルは gpt-6-astra、multi-agent / computer use の例は gpt-6.1-sol。

## ディレクトリ構成

```text
skills/openai-agents/
  SKILL.md
  references/
    agents-api/
      README.md
      overview.md
      quickstart.md
      architecture.md
      configuration.md
      sessions.md
      session-events.md
      manage-sessions.md
      session-webhooks.md
      functions.md
      mcp-connections.md
      plugins.md
      vaults.md
      web-search.md
      computer-use.md
      multi-agent.md
      observability.md
      tracing.md
      errors.md
      openai-hosted-sandboxes.md
      self-hosted-sandboxes.md
      prewarmed-sandboxes.md
      sandbox-lifecycle.md
      files-and-artifacts.md
      sandbox-security.md
      provider-aws.md
      provider-blaxel.md
      provider-cloudflare.md
      provider-daytona.md
      provider-digitalocean.md
      provider-e2b.md
      provider-modal.md
      provider-oci.md
      provider-runloop.md
      provider-vercel.md
    agents-sdk/
      README.md
      overview.md
      quickstart.md
      define-agents.md
      models-and-providers.md
      running-agents.md
      results-and-state.md
      sandboxes.md
    tools/
      README.md
      tools-overview.md
      web-search.md
      file-search.md
      vector-stores.md
      code-interpreter.md
      computer-use.md
      image-generation.md
      shell.md
      local-shell.md
      apply-patch.md
      function-tools.md
      tool-search.md
      programmatic-tool-calling.md
      skills.md
    mcp/
      README.md
      mcp-and-connectors.md
      agents-sdk-integration.md
      realtime-sessions.md
      secure-mcp-tunnel.md
    orchestration/
      README.md
      handoffs-and-agents-as-tools.md
      multi-agent.md
      guardrails-and-human-review.md
      background-mode.md
      tracing.md
  samples/
    README.md
    single-agent-function-tool.md
    web-search-tool.md
    file-search-tool.md
    remote-mcp-server.md
    multi-agent-handoffs.md
    input-guardrails.md
    streaming-output.md
    agents-api-hosted-session.md
    agents-api-function-tool.md
  scripts/
    README.md
    install.md
    environment.md
    tracing.md
    run.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Agent の定義・実行・conversation state・streaming を知りたい | agents-sdk | [references/agents-sdk/README.md](references/agents-sdk/README.md) |
| モデル/provider の選択、SDK 全体像を知りたい | agents-sdk | [references/agents-sdk/README.md](references/agents-sdk/README.md) |
| SandboxAgent でファイルシステム/shell 等の隔離実行環境を使いたい | agents-sdk | [references/agents-sdk/README.md](references/agents-sdk/README.md) |
| Agents API / Agents SDK / Responses API のどれを使うか決めたい | agents-sdk | [references/agents-sdk/README.md](references/agents-sdk/README.md) |
| Agents API でセッションを作成・継続・ストリーム・webhook 処理したい | agents-api | [references/agents-api/README.md](references/agents-api/README.md) |
| Agents API の sandbox（OpenAI-hosted / self-hosted / pre-warm / 外部 provider: AWS・Cloudflare・Daytona・DigitalOcean・E2B・Modal・OCI・Runloop・Vercel・Blaxel）を設定したい | agents-api | [references/agents-api/README.md](references/agents-api/README.md) |
| Agents API の functions / MCP / plugins / vaults / web search / computer use を使いたい | agents-api | [references/agents-api/README.md](references/agents-api/README.md) |
| Agents API の tracing・observability・エラー復旧を知りたい | agents-api | [references/agents-api/README.md](references/agents-api/README.md) |
| web search / file search / code interpreter / computer use 等の built-in tool を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| function tool の定義や vector store の作成・検索を知りたい | tools | [references/tools/README.md](references/tools/README.md) |
| shell tool に Agent Skills（SKILL.md バンドル）をアタッチしたい | tools | [references/tools/README.md](references/tools/README.md) |
| remote MCP server / connectors への接続・認証を知りたい | mcp | [references/mcp/README.md](references/mcp/README.md) |
| Agents SDK からの MCP tool 統合や Realtime セッションでの MCP 利用を知りたい | mcp | [references/mcp/README.md](references/mcp/README.md) |
| handoffs / agents-as-tools でマルチエージェント構成を組みたい | orchestration | [references/orchestration/README.md](references/orchestration/README.md) |
| guardrails・human review・tracing・background mode を設定したい | orchestration | [references/orchestration/README.md](references/orchestration/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・環境変数・トレーシング設定・実行コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
