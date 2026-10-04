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
- 初回ビルド時は `Cargo.toml` で宣言された fandhe-frontend-core / fandhe-frontend-app を crates.io から取得するため、インターネット接続が必要
- `cargo run` の出力例は `wrote 5 pages to dist/`。`dist/index.html` をブラウザで開くと記事一覧、リンクから詳細ページへ遷移できる。`cargo test` は既定エスケープがテンプレートのサンプルデータで効いていることを確認する回帰テスト（2 件）
- `fw`（`fandhe-frontend-cli`）を引数なしで実行するとサブコマンド一覧が出る: `structure`（構造マニフェストの生成・検証）、`gate`（AI 自己保守検証ゲート: type/escape/lint/test/policy）、`impact`（シンボルの変更影響分析）、`new`（テンプレートからの決定的なプロジェクト生成）。`fw new` は生成ファイルパス一覧を JSON 1 行で出力する
- WASM ビルドは `./tools/wasm/build.sh` で実行する。`wasm-bindgen` のバージョンが一致しない場合は fail-closed で停止し、是正用の `cargo install` 例を標準エラー出力へ表示する。生成物（`static/wasm/`）は `static/` を HTTP サーバーで配信して確認する（`file://` では ES モジュール/WASM が動作しない）。意図しない公開を避けるため `python3 -m http.server 8000 --bind 127.0.0.1 --directory static` のように `127.0.0.1` にバインドし、`http://127.0.0.1:8000/embed.html` を開く
- 開発版 `fw` を使う場合は `git clone` してソースから `cargo install --path crates/cli` する、または `cargo run -p fandhe-frontend-cli --bin fw -- <サブコマンド>` で都度実行できる
- 生成したプロジェクトは `fw gate --project .` で型チェック・既定エスケープ検査・lint・テスト・依存ポリシーを一括検証できる。生成直後は無編集で PASS する
- 最小埋め込み構成を試す場合は `fw new my-embed --template embed` を使う（詳細は最小埋め込みガイド参照）

## Related

- [はじめに](./introduction.md)
- [コンポーネント記述ガイド](../guides/component-authoring.md)
- [最小埋め込みガイド](../guides/embedding-guide.md)
- [View Transitions ガイド](../guides/view-transitions.md)
- [NPM アセットビルドガイド](../guides/npm-asset-build.md)
