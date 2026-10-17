# インストール

crates.io に v0.5.0（2026-10-16）として公開済みで、リポジトリのクローンは不要。

## Signature / Usage

```bash
cargo new my-app && cd my-app

cargo add fandhe-backend-core fandhe-backend-http fandhe-backend-routes
cargo add tokio --features rt-multi-thread,macros

# プラグインは feature で有効化する（例: WebSocket）
cargo add fandhe-backend-core --features websocket
```

## Notes

- 前提: Rust の stable ツールチェーン（`rustup` でインストールされていれば追加設定は不要）
- 公開対象クレートは `fandhe-backend-core` / `fandhe-backend-http` / `fandhe-backend-routes` と `fandhe-backend-plugin-*` の計 15 クレート（すべて v0.5.0 の lockstep）だが、通常は `fandhe-backend-core` の feature 経由で利用すれば十分（Gate 型の `fandhe-backend-plugin-hub-wiring` / `fandhe-backend-plugin-jwt` / `fandhe-backend-plugin-csrf` は feature を持たないため、`cargo add` で直接依存に加え `Server::gate` で登録する。features.md 参照）
- feature を何も指定しない場合、`fandhe-backend-plugin-*` の依存・コードは一切バイナリに含まれない（pay-for-what-you-use）
- `cargo new` の代わりに雛形から始めることもできる。複数 feature を組み合わせた実運用形の雛形は `templates/app/`、1 機能ずつの独立サンプルは `examples/` にあり、いずれも standalone プロジェクトとしてコピーしてそのまま `cargo run` できる（コピー後は `Cargo.toml` の依存から `path = ...` を外し、`version = "0.5.0"` のみの crates.io 版参照に切り替える）

## Related

- [overview.md](./overview.md)
- [features.md](./features.md)
- [minimal-server.md](./minimal-server.md)
