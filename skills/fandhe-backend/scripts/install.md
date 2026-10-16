# install

fandhe-backend のコア / プラグインを `cargo add` で導入するコマンド集。

## コアクレートを導入する

```sh
cargo new my-app && cd my-app

cargo add fandhe-backend-core fandhe-backend-http fandhe-backend-routes
cargo add tokio --features rt-multi-thread,macros
```

`fandhe-backend-core` / `fandhe-backend-http` / `fandhe-backend-routes` が公開対象のコア 3 クレート。通常は `fandhe-backend-core` の feature 経由でプラグインを有効化すれば十分（個別クレートを直接依存に追加する必要はない）。ただし Gate 型の 3 クレート（hub-wiring / jwt / csrf）は例外で、次節のとおり独立クレートとして追加する。

## プラグインを feature で有効化する

```sh
# 例: WebSocket プラグインを有効化
cargo add fandhe-backend-core --features websocket

# 例: 複数 feature の同時有効化
cargo add fandhe-backend-core --features graphql,openapi,cors
```

feature を何も指定しない場合、`fandhe-backend-plugin-*` の依存・コードは一切バイナリに含まれない（pay-for-what-you-use）。`fandhe-backend-core` の feature 一覧: `websocket` / `graphql` / `webrtc-proxy` / `webrtc` / `tracing` / `openapi` / `cors` / `compression` / `static`。

## Gate 型プラグイン（hub-wiring / jwt / csrf）を導入する

```sh
# hub-wiring（テナント境界強制。JWT 検証は jwt クレートへ移動済み）
cargo add fandhe-backend-plugin-hub-wiring

# JWT 認証ゲート
cargo add fandhe-backend-plugin-jwt

# CSRF 対策ゲート
cargo add fandhe-backend-plugin-csrf
```

Gate 型の `fandhe-backend-plugin-hub-wiring` / `fandhe-backend-plugin-jwt` / `fandhe-backend-plugin-csrf` は `fandhe-backend-core` の feature を持たない独立クレート。直接依存に追加し、`Server::gate` で登録する。`fandhe-backend-plugin-jwt` と `fandhe-backend-plugin-csrf` は 0.5.0 で初公開（CHANGELOG 記載。0.4.2 以前の crates.io には存在しない）。
