# feature 構成別サンプルガイド

fandhe-backend は「最小コア + Cargo feature 駆動プラグイン」で構成される。feature ごとの有効化方法・実行可能なサンプル・動作確認手順・pay-for-what-you-use の検証方法の一覧。

## Signature / Usage

```rust,ignore
// cors: プリフライトを CORS プラグインへ委譲し、実リクエスト応答へヘッダ付与する
let server = Server::new()
    .handler(router)
    .cors(config);

// compression: 条件を満たすレスポンスを gzip 圧縮する
let server = Server::new()
    .handler(router)
    .compression(config);

// static: 静的ファイルを配信する
let server = Server::new().static_files(config);

// webrtc-proxy: シグナリングを別プロセスへ切り出す（MVP 推奨）
let server = Server::new()
    .handler(router)
    .webrtc_proxy(fandhe_backend_plugin_webrtc_proxy::ProxyConfig::default());
```

## Options / Props

| feature | クレート | 動作確認コマンド |
|------|------|-------------|
| websocket | `fandhe-backend-plugin-websocket` | `cargo run --release --example ws_echo -p fandhe-backend-core --features websocket` |
| graphql | `fandhe-backend-plugin-graphql` | `cargo run --release --example graphql_nfr6 -p fandhe-backend-core --features graphql` |
| webrtc-proxy | `fandhe-backend-plugin-webrtc-proxy` | runnable example 未整備（コード断片 + 設計ドキュメント参照） |
| webrtc | `fandhe-backend-plugin-webrtc`（in-process 型） | `cargo build --release --example webrtc_nfr6 -p fandhe-backend-core --features webrtc` |
| tracing | `fandhe-backend-plugin-tracing` | `cargo run --release --example tracing_nfr -p fandhe-backend-core --features tracing` |
| openapi | `fandhe-backend-plugin-openapi`（`gen-cli` feature） | `cargo run -p fandhe-backend-plugin-openapi --bin gen-openapi --features gen-cli` |
| cors | `fandhe-backend-plugin-cors` | `cargo run --example cors_demo -p fandhe-backend-core --features cors` |
| compression | `fandhe-backend-plugin-compression` | `cargo run --example compression_demo -p fandhe-backend-core --features compression` |
| static | `fandhe-backend-plugin-static` | `cargo run --example static_demo -p fandhe-backend-core --features static` |
| hub-wiring | `fandhe-backend-plugin-hub-wiring` | `cargo run --release -p fandhe-backend-plugin-hub-wiring --example hub_service_demo` |

## 各 feature の要点

- **websocket**: RFC 6455 ハンドシェイク検証・101 応答を `UpgradeHandler` 拡張点経由で提供する。`GET /ws`（既定パス）へ接続するとエコーセッションが確立する
- **graphql**: `POST /graphql` をパスインターセプトし、`async-graphql` で実クエリを実行する。`Server::graphql` にスキーマを登録した場合のみ処理し、未登録時は feature 有効でもフォールスルーする
- **webrtc-proxy**: WebRTC シグナリングを別プロセスに切り出すプロキシ型。攻撃表面を抑えるため MVP では in-process 型（`webrtc`）よりこちらを推奨する
- **webrtc**: `webrtc-rs` に直接依存する in-process 型。攻撃表面が大きいため通常は `webrtc-proxy` を推奨する。`POST /rtc/offer` へのシグナリングを扱う
- **tracing**: サンプリング付き可観測性を `Middleware` 拡張点経由で提供する。決定的カウンタ方式のサンプリング + 既定で非同期・バッファ済み I/O（`tracing-appender` の non-blocking writer）により RPS への影響を抑える
- **openapi**: `utoipa::path` 定義から `gen-openapi` CLI で `openapi.json` / `openapi.yaml` を生成し静的埋め込みする。`Server::openapi()` を登録すると両方が同一スキーマ源（`ApiDoc`）から配信される
- **cors**: 配線は 2 点のみ。`Router::options_fallback(...)` でプリフライトを委譲し、`Server::new().handler(router).cors(config)` で実リクエスト応答へのヘッダ付与を有効化する（未登録なら feature 有効でも完全フォールスルー、opt-in）。`CorsConfig::builder()` は許可オリジン完全一致リスト（既定）・`allow_any_origin()`・`allow_credentials`・`allow_headers`・`max_age` 等を提供し、`allow_any_origin()` と `allow_credentials(true)` の併用は `build()` が `Err` を返す（フェイルクローズ）
- **compression**: 配線は 1 点のみ。`Server::new().handler(router).compression(config)` で登録すると、ステータス・`Content-Type`・body サイズ・`Accept-Encoding` の判定基準を満たすレスポンスを gzip 圧縮する（未登録なら feature 有効でも完全フォールスルー、opt-in）。`CompressionConfig::builder()` は `min_size`（既定 1024 バイト）・`compressible_types`（既定 `text/*`・`application/json` 等）を提供する
- **static**: 配線は `Server::new().static_files(config)` の 1 点のみ。`StaticFilesConfig::builder(mount, root)` は `root` を構築時に `canonicalize` し、不在・非ディレクトリを `Err` で早期拒否する
- **hub-wiring**: マルチテナント JWT 検証（RS256 / JWKS）・テナント境界強制を `RequestGate` 拡張点（`TenantGate`）だけで実現する

## Notes

- 掲載する example の多くは NFR（性能）計測専用として追加されたものである（doc comment に「計測専用」と明記）。production 配線の書き方は各 example のコードと `../getting-started/minimal-server.md` の `Server` builder 呼び出し例を参照する
- `crates/core/examples/*` は最小 example。独立プロジェクトとして `cargo run` できる standalone 版（`with-<feature>` 命名）は `examples/` に、複数 feature を同時配線した実運用形の雛形は `templates/app/` にある
- **static**: パストラバーサル対策は二層防御（I/O 前の字句検証 + `canonicalize` 後の実パスが正規化済み root 配下か確認）で行い、シンボリックリンク経由の脱出も拒否する。先頭が `.` のセグメントは一律拒否し、`.env`・`.git/config` 等の機密ファイルが配信されることを防ぐ。ファイル未検出・検証失敗・サイズ超過（`max_file_bytes`、既定 8 MiB）は一律 404（フェイルクローズ）。ファイル I/O は `tokio::task::spawn_blocking` に閉じる
- **compression**: 秘密情報を含みやすいレスポンスは BREACH 類似の情報漏洩リスクがあるため、対象 `Content-Type` から除外することを推奨する
- pay-for-what-you-use の検証は各 feature を無効化した状態で当該プラグインの依存が依存グラフから完全に消えることで確認する: `cargo tree -p fandhe-backend-core`（feature なし） / `cargo tree -p fandhe-backend-core --features websocket`（feature あり）

## Related

- [tutorial](./tutorial.md)
- [extension-points](./extension-points.md)
