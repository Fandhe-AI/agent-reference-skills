# クレート構成

fandhe-backend は 15 クレートで構成される（すべて v0.6.1（2026-10-28）、lockstep で crates.io に公開済み）。コア 3 クレート + プラグイン 12 クレートに分かれ、依存方向は `server → routes → http::*` の一方向。

## Usage

```bash
cargo add fandhe-backend-core fandhe-backend-http fandhe-backend-routes

# プラグインは feature で有効化する（例: WebSocket）
cargo add fandhe-backend-core --features websocket
```

## Options / Props

**コア（3 クレート）**

| クレート | 役割 |
|---------|------|
| `fandhe-backend-core` | 最小コア。HTTP/1.1 サーバ・4 種拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）・Cargo feature 駆動のプラグイン配線を提供する |
| `fandhe-backend-http` | HTTP/1.1 プリミティブ（sans-IO パーサ・レスポンス構築・chunked / query / form / cookie 各パーサ） |
| `fandhe-backend-routes` | ルータ（静的・パスパラメータ・ワイルドカード・フォールバック・async ハンドラ対応）。`fandhe-backend-http` にのみ依存する中間層 |

**プラグイン（12 クレート）**

| クレート | feature 名 | 役割 |
|---------|-----------|------|
| `fandhe-backend-plugin-websocket` | `websocket` | RFC 6455 ハンドシェイクの検証・101 応答の送出・tokio-tungstenite へのフレーミング委譲（`UpgradeHandler` 経由） |
| `fandhe-backend-plugin-graphql` | `graphql` | パスインターセプト型プラグイン。`async-graphql` による実クエリ実行（`POST /graphql`） |
| `fandhe-backend-plugin-openapi` | `openapi` | OpenAPI ドキュメント生成。`utoipa::path` を付与したドキュメント専用関数を `ApiDoc` に集約 |
| `fandhe-backend-plugin-webrtc-proxy` | `webrtc-proxy` | WebRTC シグナリングプロキシ。別プロセスの WebRTC サービスへ SDP Offer/Answer を中継し、`webrtc-rs` 系の巨大依存をコア・他プラグインの監査対象から隔離する |
| `fandhe-backend-plugin-webrtc` | `webrtc` | in-process WebRTC。SDP Offer/Answer・データチャネル確立を `webrtc-rs` でプロセス内完結。`webrtc-proxy` より攻撃表面が大きい選択肢 |
| `fandhe-backend-plugin-tracing` | `tracing` | サンプリング付き可観測性。`Middleware` 拡張点上で一定割合のみ span/event を記録する |
| `fandhe-backend-plugin-cors` | `cors` | CORS プラグイン。プリフライト応答の組み立てと実リクエストへのヘッダ付与 |
| `fandhe-backend-plugin-compression` | `compression` | レスポンス圧縮プラグイン。gzip での帯域削減 |
| `fandhe-backend-plugin-static` | `static` | 静的ファイル配信プラグイン。パストラバーサル対策・`spawn_blocking` I/O を備えたディレクトリ配信 |
| `fandhe-backend-plugin-hub-wiring` | （独立クレート、feature 無し） | hub 共通配線プラグイン。コアの `RequestGate` 拡張点上に `TenantGate` を実装し、`org_id` 抽出 → フェイルクローズの配線を集約する。JWT 検証は `fandhe-backend-plugin-jwt` に依存・委譲する（v0.5.0） |
| `fandhe-backend-plugin-jwt` | （独立クレート、feature 無し。Gate 型） | 汎用 JWT 検証プラグイン。RS256・ES256 の検証ポリシー（`JwtPolicy`）、JWKS 鍵集合、`RequestGate` 実装 `JwtGate`（v0.5.0 で初公開） |
| `fandhe-backend-plugin-csrf` | （独立クレート、feature 無し。Gate 型） | CSRF 検査ゲート。`RequestGate` 実装 `CsrfGate`（v0.5.0 で初公開） |

## Notes

- Gate 型の `fandhe-backend-plugin-hub-wiring` / `fandhe-backend-plugin-jwt` / `fandhe-backend-plugin-csrf` の 3 つは core の feature を持たない独立クレートで、直接依存に加えて `Server::gate` で登録する
- コア 4 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）のいずれにも載らない「レスポンス後処理型」プラグインパターンも存在する（`cors` が第 1 号、`compression` が第 2 インスタンス）。`Interceptor` はプラグインではなくユーザーコード向けの拡張点である点に注意（v0.2.0 で追加、イシュー #420）

## Related

- [overview.md](./overview.md)
- [features.md](./features.md)
- [installation.md](./installation.md)
