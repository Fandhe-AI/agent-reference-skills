# 最小サーバ例

`fandhe_backend_core::Server` に `fandhe_backend_routes::Router` を 1 件登録しただけの最小構成。

## Signature / Usage

```rust,no_run
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new()
        .route("GET", "/", |_head, _body| {
            Response::new(200, b"hello fandhe-backend\n".to_vec())
        })
        .route("GET", "/health", |_head, _body| {
            Response::new(200, b"ok\n".to_vec())
        });

    let server = Server::new().handler(router);
    let bound = server.bind("127.0.0.1:3000").await?;
    println!("listening on http://{}", bound.local_addr()?);
    bound.run().await
}
```

起動して動作確認する。

```bash
cargo run
```

```bash
curl -v http://127.0.0.1:3000/            # 200 応答
curl -v http://127.0.0.1:3000/health      # 200 応答
curl -v -X POST http://127.0.0.1:3000/    # 405 応答（/ は GET のみ登録）
curl -v http://127.0.0.1:3000/missing     # 404 応答（未登録パス）
```

## コア構成の概観

- **`Server`**（`fandhe_backend_core::Server`）: builder パターンで構成するエントリポイント。`handler` でデフォルトハンドラ（通常は `fandhe_backend_routes::Router`）を、`middleware` / `gate` / `upgrade_handler` で拡張点を登録し、`bind` → `run` でサーバを起動する
- **`fandhe_backend_routes::Router`**: パス・メソッドごとにハンドラを登録するルーティング層。`impl Handler for Router` により `Server::handler` にそのまま渡せる
- **4 拡張点**（`fandhe_backend_core::{Middleware, UpgradeHandler, RequestGate, Interceptor}`）: 新機能はまずこの 4 種のいずれかに載るか検討する
  - `Middleware`: リクエスト/レスポンスの前後処理（例: `plugin-tracing`）
  - `UpgradeHandler`: プロトコルアップグレード（例: `plugin-websocket` の WebSocket ハンドシェイク）
  - `RequestGate`: リクエストの許可/拒否判定
  - `Interceptor`（v0.2.0 で追加）: ユーザーコード向けのリクエスト割り込み・レスポンス書き換え（既存 3 拡張点で表現できないリダイレクト返却・確定レスポンスの差し替え等）

## Notes

- `127.0.0.1` 固定でループバックにのみ待ち受ける。外部公開する場合は呼び出し側の責任でバインドアドレスを明示的に変更する必要がある（攻撃表面最小化方針）

## Related

- [installation.md](./installation.md)
- [features.md](./features.md)
- [overview.md](./overview.md)
