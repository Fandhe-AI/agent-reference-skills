# static file serving

`static` feature の `StaticFilesConfig` + `Server::static_files` で、二層防御のパストラバーサル対策付き静的配信を行う配線例。

```toml
[dependencies]
fandhe-backend-core = { version = "0.3.0", features = ["static"] }
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
fandhe-backend-plugin-static = "0.3.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_plugin_static::StaticFilesConfig;
use fandhe_backend_routes::Router;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new();

    // mount をルート "/" にはしない。パスインターセプト型プラグイン（静的配信含む）
    // は Router::dispatch より先に評価されるため、"/" mount は全 GET パスに一致し
    // 他の API ルートを横取りしてしまう。配信対象を 1 ファイルに限定する場合は
    // mount をファイルパスそのものにする。
    let static_root = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("static");
    let static_config = StaticFilesConfig::builder("/index.html", &static_root)
        .build()
        .expect("static/ ディレクトリが存在すれば構築に成功する");

    let server = Server::new().handler(router).static_files(static_config);
    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
curl -si http://127.0.0.1:3000/index.html               # 配信対象ファイル
curl -si --path-as-is http://127.0.0.1:3000/../Cargo.toml # パストラバーサル試行、404 を確認
```

## Notes

- `StaticFilesConfig::builder(mount, root)` は `root` を構築時に `canonicalize` し、不在・非ディレクトリを `Err` で早期拒否する
- パストラバーサル対策は二層防御（I/O 前の字句検証 + `canonicalize` 後の実パスが正規化済み root 配下であることの確認）。シンボリックリンク経由の脱出も拒否する
- 先頭が `.` のセグメント（ドットファイル・ドットディレクトリ）は一律拒否するため、`root` 配下に `.env`・`.git/config` 等が誤って置かれていても配信されない
- ファイル未検出・検証失敗・サイズ超過（`max_file_bytes`、既定 8 MiB）は一律 404（存在オラクルを作らないフェイルクローズ）。ファイル I/O は `tokio::task::spawn_blocking` に閉じ、非同期ランタイムスレッドをブロックしない
- `Server::static_files` を未登録のまま `static` feature を有効化しても完全にフォールスルーする（opt-in）
