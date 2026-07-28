# install

fandhe-backend のコア / プラグインを `cargo add` で導入するコマンド集。

## コアクレートを導入する

```sh
cargo new my-app && cd my-app

cargo add fandhe-backend-core fandhe-backend-http fandhe-backend-routes
cargo add tokio --features rt-multi-thread,macros
```

`fandhe-backend-core` / `fandhe-backend-http` / `fandhe-backend-routes` が公開対象のコア 3 クレート。通常は `fandhe-backend-core` の feature 経由でプラグインを有効化すれば十分（個別プラグインクレートを直接依存に追加する必要はない）。

## プラグインを feature で有効化する

```sh
# 例: WebSocket プラグインを有効化
cargo add fandhe-backend-core --features websocket

# 例: 複数 feature の同時有効化
cargo add fandhe-backend-core --features graphql,openapi,cors
```

feature を何も指定しない場合、`fandhe-backend-plugin-*` の依存・コードは一切バイナリに含まれない（pay-for-what-you-use）。`fandhe-backend-core` の feature 一覧: `websocket` / `graphql` / `webrtc-proxy` / `webrtc` / `tracing` / `openapi` / `cors` / `compression` / `static`。

## hub-wiring プラグインを導入する

`fandhe-backend-plugin-hub-wiring`（JWT 検証・テナント境界強制）のみ `fandhe-backend-core` の feature ではなく、独立クレートとして直接依存に追加する。
