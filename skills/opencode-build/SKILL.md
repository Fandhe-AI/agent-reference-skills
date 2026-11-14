---
name: opencode-build
description: >
  OpenCode v2 (opencode.ai) の拡張・組み込み開発 (@opencode/plugin / @opencode/client / @opencode/sdk / HTTP API) の
  リファレンス。server plugin hooks, transforms, ctx API, plugin RPC, TUI plugin, GUI plugin (Desktop / Web),
  Electron main process, Ipc, Effect 版, Cloudflare workerd, openapi.json, session API, PTY, SSE event,
  V1 プラグイン移行。
user-invocable: false
---

# OpenCode Build (v2 拡張・組み込み開発)

OpenCode v2 を拡張・組み込みする開発者向けのリファレンス。プラグイン作成、クライアント / SDK からの利用、サーバー HTTP API を扱う。

## 対象

- 出典: https://opencode.ai/docs/build/ と https://opencode.ai/docs/api/
- 原本: `anomalyco/opencode` タグ `v2.3.0`（commit `a6b15d3`、2026-11-13）の `services/site/src/docs/content/build/**/*.mdx` と `packages/protocol/openapi.json`
- サーバープラグイン: `@opencode/plugin`
- TUI プラグイン: `@opencode/plugin/tui`（公式 URL は `/docs/build/plugins/cli/`）
- GUI (Desktop / Web) プラグイン: `@opencode/plugin/gui`（experimental）
- RPC: `@opencode/plugin/rpc`
- ネットワーククライアント: `@opencode/client`
- 組み込み SDK: `@opencode/sdk`（Cloudflare は `@opencode/sdk/workerd`）
- Effect 版: `@opencode/plugin/effect` 等（effect@4.0.1）
- HTTP API: `openapi.json`（OpenAPI 3.1.0、info.version 0.0.1、139 paths / 170 operations / 32 tags）
- V1 プラグイン（`@opencode-ai/plugin`）は移行ページ（`references/plugins-server/migrate-v1.md`、`support-v1.md`）のみ収録

## 他スキルとの使い分け

- `opencode-usage`: 利用者向け CLI・`opencode.jsonc`・agents / models / MCP の設定。プラグインを導入する側は `opencode-usage` の `agents-models/plugins.md`。本スキルはプラグインを作る側
- `opencode-console`: OpenCode Console ゲートウェイ。Console の Inference API は本スキルの HTTP API（OpenCode サーバーの API）とは別
- `anthropic-claude-code-extend`: Claude Code の plugins / hooks。OpenCode の plugin hooks とは別物
- `anthropic-agent-sdk` / `openai-agents`: 各社の Agent SDK。`@opencode/sdk` は OpenCode 本体を組み込む SDK
- `cloudflare-agents` / `cloudflare-sandbox-containers`: Cloudflare 側の Agents SDK・Sandbox。本スキルは `@opencode/sdk/workerd` による OpenCode ホストのみ
- `mcp-spec`: MCP プロトコル仕様。本スキルの MCP は OpenCode の `ctx.mcp` と HTTP API
- Effect 版の `effect` は Effect-TS ライブラリであり、React の `useEffect` とは無関係

## ディレクトリ構成

```text
skills/opencode-build/
  SKILL.md
  references/
    client-sdk/        # overview, client, sdk, sdk-cloudflare
      README.md
    plugins-server/    # lifecycle, transforms, ctx.* API, hooks, rpc, migrate-v1, support-v1 ほか
      README.md
    plugins-tui/       # overview, context, client, events, sessions, slots, commands-and-keymaps, publish-and-load ほか
      README.md
    plugins-gui/       # overview, package, build-bundle, registries, command, panel, slot, ipc, main-process ほか
      README.md
    effect/            # overview, lifecycle, transforms, api, hooks, publish, rpc, client, sdk
      README.md
    http-api/          # overview, session*, agent, model, provider, event, pty, rpc, plugin ほか
      README.md
  samples/
    README.md
    minimal-server-plugin.md
    plugin-options.md
    add-tool-plugin.md
    model-request-hooks.md
    tool-and-shell-guard-hooks.md
    register-command-plugin.md
    tui-plugin-command.md
    gui-plugin-command.md
    plugin-rpc.md
    client-session-prompt.md
    sdk-embedded-host.md
    sdk-cloudflare-durable-object.md
    effect-plugin.md
    plugin-package-and-publish.md
    migrate-v1-plugin.md
  scripts/
    README.md
    install.md
    plugin-dev.md
```

各カテゴリの全ページ一覧は、そのカテゴリの `README.md` を参照する。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実装例が必要なら `samples/README.md`、コマンドが必要なら `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `@opencode/client` で接続・イベント購読・plugin RPC 呼び出しをしたい | client-sdk | [references/client-sdk/README.md](references/client-sdk/README.md) |
| `@opencode/sdk` で OpenCode をプロセス内に組み込みたい | client-sdk | [references/client-sdk/README.md](references/client-sdk/README.md) |
| Cloudflare Durable Object で `@opencode/sdk/workerd` を使いたい | client-sdk | [references/client-sdk/README.md](references/client-sdk/README.md) |
| サーバープラグインを `Plugin.define` / `setup` で書きたい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| agent / provider / model / command / tool / MCP / skill を transform で編集したい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| session / tool / shell / permission の hooks を差し込みたい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| `ctx.session` / `ctx.storage` / `ctx.permission` などの API を使いたい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| `Rpc.define` でプラグイン RPC を定義・呼び出したい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| V1 プラグイン (`@opencode-ai/plugin`) を V2 へ移行したい | plugins-server | [references/plugins-server/README.md](references/plugins-server/README.md) |
| TUI プラグインでダイアログ・ルート・スロット・キーマップを追加したい | plugins-tui | [references/plugins-tui/README.md](references/plugins-tui/README.md) |
| TUI プラグインからセッション・イベント・モデルのデータを読みたい | plugins-tui | [references/plugins-tui/README.md](references/plugins-tui/README.md) |
| TUI プラグインを package.json exports と cli.json で公開・読み込みたい | plugins-tui | [references/plugins-tui/README.md](references/plugins-tui/README.md) |
| GUI (Desktop / Web) プラグインを作りたい（experimental） | plugins-gui | [references/plugins-gui/README.md](references/plugins-gui/README.md) |
| GUI の command / panel / slot / settings page / titlebar item を登録したい | plugins-gui | [references/plugins-gui/README.md](references/plugins-gui/README.md) |
| GUI プラグインの Vite ビルド・ロード・リロードを知りたい | plugins-gui | [references/plugins-gui/README.md](references/plugins-gui/README.md) |
| Electron main process 側の `main` setup・`Ipc` を使いたい | plugins-gui | [references/plugins-gui/README.md](references/plugins-gui/README.md) |
| Effect-native でプラグイン・クライアント・SDK を書きたい | effect | [references/effect/README.md](references/effect/README.md) |
| Effect 版の Scope 管理・peer dependency での公開を知りたい | effect | [references/effect/README.md](references/effect/README.md) |
| OpenCode サーバーの HTTP エンドポイント（session / agent / model / provider）を知りたい | http-api | [references/http-api/README.md](references/http-api/README.md) |
| SSE イベント・PTY WebSocket・`rpc.call` の仕様を知りたい | http-api | [references/http-api/README.md](references/http-api/README.md) |
| `openapi.json` の構成・tag・operation を確認したい | http-api | [references/http-api/README.md](references/http-api/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
