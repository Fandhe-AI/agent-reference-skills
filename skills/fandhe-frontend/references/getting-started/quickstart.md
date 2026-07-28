# クイックスタート

`fw new` でのプロジェクト作成からビルド・ブラウザ確認までを最短経路でたどる入門ガイド。必要なツールは Rust ツールチェーン（`rustup` / `cargo`）と `git` のみ。

## Signature / Usage

```sh
# fw CLI の導入（crates.io 経由）
cargo install fandhe-frontend-cli

# プロジェクト作成（SSR/SSG + CSR(WASM) の拡充テンプレート）
fw new my-app --template app

# ビルド・テスト
cd my-app
cargo test
cargo run   # dist/ に SSG 出力（静的 HTML）を書き出す
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `default` | template | `fw new` の既定テンプレート。標準的な cargo プロジェクト構成 |
| `app` | template | SSR/SSG 出力と CSR（WASM）ビルドの両方を含む拡充テンプレート |
| `embed` | template | 静的単一ファイル（`embed.html`）のみの最小埋め込み構成（cargo パッケージなし） |

## Notes

- CSR（WASM）ビルドを試す場合は `rustup target add wasm32-unknown-unknown` と `wasm-bindgen-cli` が追加で必要。`wasm-bindgen-cli` のバージョンは `wasm/Cargo.lock` の `wasm-bindgen` バージョンと完全一致させ、`--locked` 付きで導入する
- WASM ビルドは `./tools/wasm/build.sh` で実行し、生成物は `static/` を HTTP サーバー（`python3 -m http.server` 等）で配信して確認する（`file://` では ES モジュール/WASM が動作しない）
- 開発版 `fw` を使う場合は `git clone` してソースから `cargo install --path crates/cli` する、または `cargo run -p fandhe-frontend-cli --bin fw -- <サブコマンド>` で都度実行できる
- 生成したプロジェクトは `fw gate --project .` で型チェック・既定エスケープ検査・lint・テスト・依存ポリシーを一括検証できる。生成直後は無編集で PASS する
- 最小埋め込み構成を試す場合は `fw new my-embed --template embed` を使う（詳細は最小埋め込みガイド参照）

## Related

- [はじめに](./introduction.md)
- [コンポーネント記述ガイド](../guides/component-authoring.md)
- [最小埋め込みガイド](../guides/embedding-guide.md)
- [View Transitions ガイド](../guides/view-transitions.md)
- [NPM アセットビルドガイド](../guides/npm-asset-build.md)
