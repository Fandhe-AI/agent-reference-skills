---
name: fandhe-backend
description: >
  Rust 製バックエンド HTTP サーバーフレームワーク fandhe-backend のリファレンス。
  fandhe-backend-core / -http / -routes。Server, BoundServer, Router, Handler。
  4 拡張点 Middleware / UpgradeHandler / RequestGate / Interceptor（intercept, map_response）。
  StreamingResponse, sans-IO HTTP/1.1, graceful shutdown。
  feature フラグで切り出したプラグイン cors, websocket, graphql, openapi, webrtc 等。
user-invocable: false
---

# fandhe-backend

fandhe-backend は Rust 製バックエンド HTTP サーバーフレームワーク。`Server` / `BoundServer` を核に、`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor` という 4 つの拡張点で Web サーバーの挙動を組み立てる。sans-IO な HTTP/1.1 パーサー、DoS 上限、graceful shutdown を標準機能として持ち、CORS・圧縮・静的配信・WebSocket・GraphQL・OpenAPI・WebRTC 等はすべて feature フラグで切り出したプラグインとして提供される（pay-for-what-you-use）。

**他スキルとの使い分け** — `Server` / `Router` / `Middleware` / `CORS` / `WebSocket` という語は複数のフレームワークで共通するため誤参照しやすい。`hono` は JS/TS の Web フレームワーク、`go-echo` は Go の Web フレームワークであり、いずれも本スキルとは別物。`fandhe-frontend` は同じ fandhe ファミリーの Rust 製フロントエンド層（SSR / SPA / SSG）であり、Rust 製バックエンド HTTP サーバーを調べる場合は本スキル（`fandhe-backend`）を参照すること。

公式ドキュメント: https://fandhe-ai.github.io/fandhe-backend/

## ディレクトリ構成

```text
skills/fandhe-backend/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      crates.md
      features.md
      installation.md
      minimal-server.md
    guides/
      README.md
      reading.md
      tutorial.md
      feature-samples.md
      extension-points.md
      streaming.md
      graceful-shutdown.md
    core/
      README.md
      server.md
      bound-server.md
      handler.md
      middleware.md
      request-gate.md
      gate-context.md
      upgrade-handler.md
      rebind-handle.md
      interceptor.md
      streaming-response.md
      extension-points.md
    routes/
      README.md
      router.md
      path-patterns.md
      handler-types.md
    http/
      README.md
      overview.md
      request.md
      response.md
      cookie.md
      query.md
      form.md
      percent.md
      body.md
      chunked.md
      buffer.md
      error.md
      socket.md
      connection.md
    plugins/
      README.md
      cors.md
      compression.md
      static.md
      tracing.md
      websocket.md
      graphql.md
      openapi.md
      webrtc.md
      webrtc-proxy.md
      hub-wiring.md
  samples/
    README.md
    minimal-server.md
    crud-routing.md
    custom-middleware.md
    request-gate-auth.md
    interceptor.md
    cors.md
    websocket-handler.md
    graphql-schema.md
    streaming-response.md
    graceful-shutdown.md
    static-file-serving.md
    compression.md
    full-featured-app.md
  scripts/
    README.md
    install.md
    dev.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す。同名ファイルが複数カテゴリに存在する点に注意する（`extension-points.md` は guides = 拡張点の契約・自作手順、core = 型ごとの API 定義・全体フロー。`overview.md` は getting-started = フレームワーク全体像、http = crate 内モジュール構成。`minimal-server.md` / `streaming-response.md` / `graceful-shutdown.md` / `cors.md` / `compression.md` / `interceptor.md` は references と samples の双方に存在し、references = API 定義、samples = 動く配線例）
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| フレームワークの全体像・2 つの核となる原則、クレート構成、feature フラグ一覧、インストール手順、最小構成のコード例を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| 最小サーバから Middleware 実装までの段階的チュートリアル、feature 別サンプル一覧、4 拡張点の契約・自作手順、ストリーミング送信、graceful shutdown の手順、ガイド群の読み方・対象読者を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| `Server` / `BoundServer` / `Handler` / `Middleware` / `RequestGate` / `UpgradeHandler` / `Interceptor` / `StreamingResponse` の型定義・API、`GateContext`（`RequestGate::check` へ渡される接続コンテキスト、peer_addr）、`BoundServer::rebind_handle` / `RebindHandle`（稼働中 listener の無停止差し替え）、4 拡張点・plugin シームの全体フローを知りたい | core | [references/core/README.md](references/core/README.md) |
| リダイレクト返却・レスポンス差し替え（`Interceptor` の `intercept` / `map_response`）を知りたい | core | [references/core/README.md](references/core/README.md) |
| `Router` のルーティング規則、`{name}` / `{*name}` パスパターン、`HandlerFuture` 等の公開型エイリアスを知りたい | routes | [references/routes/README.md](references/routes/README.md) |
| sans-IO なリクエスト/レスポンスパーサー、Cookie・クエリ・フォーム・percent-decode、body フレーミング・chunked コーディング、読み取りバッファ、エラーレスポンス、ソケットオプション・keep-alive を知りたい | http | [references/http/README.md](references/http/README.md) |
| CORS・圧縮・静的配信・トレーシング・WebSocket・GraphQL・OpenAPI・WebRTC（in-process / proxy）・hub 共通配線など、feature 単位のプラグイン API を知りたい | plugins | [references/plugins/README.md](references/plugins/README.md) |
| 最小サーバ、CRUD ルーティング、Middleware / RequestGate / Interceptor 自作、CORS・WebSocket・GraphQL・ストリーミング・graceful shutdown・静的配信・圧縮の動く配線例、実運用形テンプレートを知りたい | samples | [samples/README.md](samples/README.md) |
| クレート導入・feature 有効化コマンド、ビルド・実行・テスト・lint・依存監査コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
