---
name: mcp-spec
description: >
  Model Context Protocol (MCP 仕様 2026-07-28, modelcontextprotocol.io) リファレンス。
  JSON-RPC, server/discover, tools/call, subscriptions/listen, MRTR (InputRequiredResult),
  CacheableResult, Streamable HTTP, CIMD, MCP Apps (ui://),
  MCP Registry (server.json, MCPB), tasks 拡張。ホスト設定・SDK は別スキル。
user-invocable: false
---

# mcp-spec

## 対象バージョン

- MCP specification 2026-07-28（GitHub `modelcontextprotocol/modelcontextprotocol` のタグ `2026-07-28`、non-prerelease、published 2026-07-28T16:47:49Z）
- 本文の出典は `raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/2026-07-28/<path>` のみ。`main` / `draft` / `2026-07-28-RC` は使用しない
- バージョン無しのサイトパス（`extensions/` `registry/` `community/`）は取得日 2026-10-16 を記録。サイトと `.md` twin は `main` からビルドされるため本文の出典にしない
- サイトの `llms.txt` に載る Inspector 配下のサブページと `local-server-security` はタグに存在しないため収録しない
- 本スキルはプロトコル仕様そのものを扱う。`.mcp.json` / `mcp_servers` などのホスト側設定と各 SDK の利用法は、`anthropic-claude-code-extend` / `anthropic-api-tools-mcp` / `anthropic-agent-sdk` / `openai-agents` / `openai-apps-sdk` など各ホストスキルの担当

## ディレクトリ構成

```text
skills/mcp-spec/
  SKILL.md
  references/
    overview/             # 仕様概要・アーキテクチャ・版管理・主要変更・非推奨
      README.md
      specification-overview.md
      architecture.md
      concepts-architecture.md
      concepts-server.md
      concepts-client.md
      concepts-versioning.md
      key-changes.md
      deprecated-features.md
      feature-lifecycle.md
    base-protocol/        # メッセージ・エラー・版ネゴシエーション・statelessness
      README.md
      messages.md
      responses-and-errors.md
      statelessness.md
      json-schema-usage.md
      meta-field.md
      icons.md
      protocol-version-negotiation.md
      extension-negotiation.md
      backward-compatibility.md
    transports/           # stdio / Streamable HTTP / ヘッダー
      README.md
      transports-overview.md
      stdio.md
      streamable-http.md
      http-request-headers.md
      custom-headers.md
      server-validation.md
      transport-backward-compatibility.md
    authorization/        # OAuth ベースの認可フロー・CIMD・スコープ
      README.md
      authorization-overview.md
      authorization-flow.md
      authorization-server-discovery.md
      client-id-metadata-documents.md
      client-registration-fallbacks.md
      resource-parameter.md
      scope-selection.md
      access-token-usage.md
      authorization-errors.md
      authorization-security.md
    server-features/      # tools / resources / prompts / discover / caching 等
      README.md
      server-overview.md
      discover.md
      tools.md
      tool-definition.md
      tool-result.md
      tool-errors-and-state.md
      resources.md
      resource-templates.md
      resource-change-notifications.md
      prompts.md
      completion.md
      logging.md
      pagination.md
      caching.md
    client-features/      # sampling / elicitation / roots
      README.md
      sampling.md
      sampling-with-tools.md
      elicitation.md
      elicitation-form-mode.md
      elicitation-url-mode.md
      roots.md
    patterns/             # MRTR / subscriptions / cancellation / progress
      README.md
      patterns-overview.md
      mrtr.md
      subscriptions.md
      cancellation.md
      progress.md
    extensions/           # MCP Apps / Tasks / 認可拡張
      README.md
      extensions-overview.md
      client-matrix.md
      mcp-apps.md
      mcp-apps-build.md
      tasks.md
      auth-extensions.md
      oauth-client-credentials.md
      enterprise-managed-authorization.md
    registry/             # MCP Registry / server.json / 公開
      README.md
      registry-about.md
      server-json.md
      package-types.md
      remote-servers.md
      registry-authentication.md
      registry-versioning.md
      registry-aggregators.md
    security/             # セキュリティベストプラクティス・攻撃類型
      README.md
      security-best-practices.md
      confused-deputy.md
      token-passthrough.md
      ssrf.md
      state-handle-hijacking.md
      oauth-redirect-attacks.md
      local-server-compromise.md
      scope-minimization.md
      authorization-tutorial.md
    tooling/              # SDK・Inspector・デバッグ・クライアント実装指針
      README.md
      sdks.md
      inspector.md
      debugging.md
      client-best-practices.md
      build-with-agent-skills.md
    schema/               # スキーマ型定義（メソッド別）
      README.md
      json-rpc.md
      common-types.md
      errors.md
      content.md
      discover-types.md
      tools-types.md
      resources-types.md
      prompts-types.md
      completion-types.md
      sampling-types.md
      elicitation-types.md
      roots-types.md
      mrtr-types.md
      subscriptions-types.md
      notifications-types.md
  samples/
    README.md
    discover-exchange.md
    tools-list-and-call.md
    structured-tool-output.md
    error-responses.md
    streamable-http-exchange.md
    mrtr-input-required-flow.md
    subscriptions-listen.md
    elicitation-requests.md
    tasks-extension.md
    mcp-app.md
    authorization-server-setup.md
    oauth-client-credentials-sdk.md
    registry-publish-github-actions.md
    claude-desktop-local-server.md
    build-server-typescript.md
    build-server-python.md
    build-client-typescript.md
    build-client-python.md
  scripts/
    README.md
    install-sdks.md
    inspector.md
    debugging-logs.md
    mcp-publisher.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実際のメッセージ例は `samples/README.md`、コマンドは `scripts/README.md` から引く
5. 型の正確なフィールドは `references/schema/` を参照する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| 仕様全体像・Host / Client / Server 構成・バージョン管理・主要変更・非推奨機能を知りたい | overview | [references/overview/README.md](references/overview/README.md) |
| JSON-RPC メッセージ・エラー・`_meta`・版ネゴシエーション・拡張ネゴシエーション・statelessness を知りたい | base-protocol | [references/base-protocol/README.md](references/base-protocol/README.md) |
| stdio / Streamable HTTP のトランスポート・必須 HTTP ヘッダー・後方互換を知りたい | transports | [references/transports/README.md](references/transports/README.md) |
| OAuth 認可フロー・CIMD・スコープ選択・認可サーバー探索・トークン利用を実装したい | authorization | [references/authorization/README.md](references/authorization/README.md) |
| `server/discover`・tools・resources・prompts・completion・logging・pagination・caching を実装したい | server-features | [references/server-features/README.md](references/server-features/README.md) |
| sampling・elicitation（form / URL）・roots を実装したい | client-features | [references/client-features/README.md](references/client-features/README.md) |
| MRTR・`subscriptions/listen`・cancellation・progress のパターンを知りたい | patterns | [references/patterns/README.md](references/patterns/README.md) |
| MCP Apps・Tasks 拡張・認可拡張・拡張の対応クライアントを知りたい | extensions | [references/extensions/README.md](references/extensions/README.md) |
| MCP Registry への公開・`server.json`・package types・認証・バージョニングを知りたい | registry | [references/registry/README.md](references/registry/README.md) |
| confused deputy・token passthrough・SSRF・ローカルサーバー侵害などの対策を知りたい | security | [references/security/README.md](references/security/README.md) |
| SDK 一覧・Inspector・デバッグ・クライアント実装指針・コーディングアシスタント向け Agent Skills を知りたい | tooling | [references/tooling/README.md](references/tooling/README.md) |
| メソッド別のスキーマ型（フィールド・必須性）を確認したい | schema | [references/schema/README.md](references/schema/README.md) |
| 典型的な使い方・メッセージ交換例・サーバー / クライアント構築例を知りたい | samples | [samples/README.md](samples/README.md) |
| SDK セットアップ・Inspector・mcp-publisher・ログ確認のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
