# feature フラグ一覧

`fandhe-backend-core` の Cargo feature（`crates/core/Cargo.toml` の `[features]` が feature 一覧の正）。既定は `default = []` で、何も指定しなければプラグインのコード・依存・`unsafe` は一切バイナリに含まれない（pay-for-what-you-use）。

## Signature / Usage

```bash
# 単一 feature の有効化
cargo add fandhe-backend-core --features websocket

# 複数 feature の同時有効化
cargo add fandhe-backend-core --features graphql,openapi,cors
```

## Options / Props

| feature | 提供クレート | 概要 |
|---------|-------------|------|
| （なし・既定） | — | HTTP/1.1 コア + ルーティングのみ |
| `websocket` | `fandhe-backend-plugin-websocket` | RFC 6455 ハンドシェイク + フレーミング（`UpgradeHandler` 経由） |
| `graphql` | `fandhe-backend-plugin-graphql` | `POST /graphql` パスインターセプト + `async-graphql` 実行 |
| `webrtc-proxy` | `fandhe-backend-plugin-webrtc-proxy` | WebRTC シグナリングを別プロセスに切り出すプロキシ型（MVP 推奨） |
| `webrtc` | `fandhe-backend-plugin-webrtc` | in-process WebRTC（`webrtc-rs` 直接依存、攻撃表面が大きいため通常は `webrtc-proxy` を推奨） |
| `tracing` | `fandhe-backend-plugin-tracing` | サンプリング付き可観測性（`Middleware` 経由） |
| `openapi` | `fandhe-backend-plugin-openapi` | `Server::openapi()` / `openapi_with(doc)` 登録時のみ `GET /openapi.json` / `GET /openapi.yaml` を配信 |
| `cors` | `fandhe-backend-plugin-cors` | `Server::cors(config)` 登録時のみ実リクエスト応答へ CORS ヘッダを付与（プリフライトは `Router::options_fallback` で配線） |
| `compression` | `fandhe-backend-plugin-compression` | `Server::compression(config)` 登録時のみ条件を満たすレスポンスを gzip 圧縮 |
| `static` | `fandhe-backend-plugin-static` | `Server::static_files(config)` 登録時のみ静的ファイルを `GET` 配信（二層防御のパストラバーサル対策付き） |

## Notes

- Gate 型の `fandhe-backend-plugin-hub-wiring`（テナント境界強制、JWT 検証は plugin-jwt に委譲）・`fandhe-backend-plugin-jwt`（`JwtGate`）・`fandhe-backend-plugin-csrf`（`CsrfGate`）は `crates/core` の feature ではなく、feature なしの独立クレートとして直接依存に加え `Server::gate` で登録する（`fandhe-backend-core` の `[features]` 一覧は v0.6.1 でも変わらない）
- Gate 型クレート側の opt-in feature（いずれも既定は無効、`default = []`）: `fandhe-backend-plugin-jwt` の `dpop`（v0.6.0 で追加、RFC 9449 DPoP 結合トークンの検証。新規依存なし）と `jwks-refresh`（v0.6.0 で追加、`SharedKeySet` の取り直しタスク。`dep:tokio` を有効化）、`fandhe-backend-plugin-hub-wiring` の `dpop`（v0.6.0 で追加、`fandhe-backend-plugin-jwt/dpop` の転送のみ。有効化しただけでは挙動は変わらず、DPoP を設定した認証器を `TenantGateConfig::from_authenticator` に渡したときだけ働く）。`fandhe-backend-plugin-csrf` は feature を持たない
- 注意（`dpop` 無効、または DPoP を設定していないゲートは、DPoP 結合トークンも bearer として受理する）。DPoP を強制したい下流は必ず `dpop` を有効化して設定すること
- `cargo add fandhe-backend-plugin-jwt --features dpop,jwks-refresh` のように直接依存側で有効化する
- プラグインは大きく 4 パターンに分かれる: `UpgradeHandler` 経由（`websocket`）、`Middleware` 経由（`tracing`）、パスインターセプト型（`graphql` / `openapi` / `static`）、レスポンス後処理型（`cors` / `compression`）
- feature 無効時は該当プラグインの依存・コード・バイナリ増が一切発生しない（`cargo tree -p fandhe-backend-core` で検証可能）

## Related

- [crates.md](./crates.md)
- [installation.md](./installation.md)
- [minimal-server.md](./minimal-server.md)
