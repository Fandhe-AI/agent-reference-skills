# dev

fandhe-backend を組み込んだアプリのビルド・実行・検証コマンド集。

## 最小サーバーを起動する

```sh
cargo run
```

[`最小サーバ例`](../references/getting-started/minimal-server.md) の最小構成（`Server` + `Router`）を組み込んだアプリを起動する。別ターミナルから `curl` で疎通確認する。

```sh
curl -v http://127.0.0.1:3000/            # 200 応答
curl -v http://127.0.0.1:3000/health      # 200 応答
```

## standalone サンプルをそのまま実行する

`examples/with-<feature>/`（1 サンプル = 1 機能）・`templates/app/`（複数 feature 組み合わせ）は独立プロジェクトとしてコピーしてそのまま実行できる。fandhe-backend リポジトリ自体のクローンは不要。

```sh
cargo run
```

コピー後は `Cargo.toml` の依存から `path = ...` を外し、`version = "0.1.0"` のみの crates.io 版参照に切り替える。

## feature 別サンプルを実行する（fandhe-backend 本体クローン内）

```sh
# websocket
cargo run --release --example ws_echo -p fandhe-backend-core --features websocket

# graphql
cargo run --release --example graphql_nfr6 -p fandhe-backend-core --features graphql

# webrtc（in-process、攻撃表面が大きいため通常は webrtc-proxy を推奨）
cargo build --release --example webrtc_nfr6 -p fandhe-backend-core --features webrtc

# tracing
cargo run --release --example tracing_nfr -p fandhe-backend-core --features tracing

# cors
cargo run --example cors_demo -p fandhe-backend-core --features cors

# compression
cargo run --example compression_demo -p fandhe-backend-core --features compression

# static
cargo run --example static_demo -p fandhe-backend-core --features static

# hub-wiring
cargo run --release -p fandhe-backend-plugin-hub-wiring --example hub_service_demo
```

`crates/core/examples/*` は最小 example。`fandhe-backend-plugin-hub-wiring` は `fandhe-backend-core` の feature ではなく独立クレートであり、直接依存として利用する。

## OpenAPI ドキュメントを再生成する

```sh
cargo run -p fandhe-backend-plugin-openapi --bin gen-openapi --features gen-cli
```

> **警告**: 実行すると `crates/plugin-openapi/openapi.json` / `openapi.yaml` がコミット済みの内容ごと上書きされる。

`Server::openapi()` を登録すると `GET /openapi.json` と `GET /openapi.yaml` が同一スキーマ源から配信される。

## ビルド・テストを実行する（fandhe-backend 本体クローン内）

```sh
# コアクレートのビルド確認
cargo build -p fandhe-backend-core

# クレート単体の doc test のみ
cargo test --doc -p fandhe-backend-core
```

## 依存グラフを確認する（pay-for-what-you-use の検証）

```sh
# 既定（feature なし）構成で plugin-* 依存が一切出ないことを確認する
cargo tree -p fandhe-backend-core

# 個別 feature を有効化した場合のみ対応する依存が現れることを確認する
cargo tree -p fandhe-backend-core --features websocket
```

## ドキュメントを生成して開く

```sh
cargo doc --open -p fandhe-backend-core
```
