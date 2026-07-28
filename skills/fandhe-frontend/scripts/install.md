# install

`fw` CLI と WASM ビルドに必要なツールチェーンの導入コマンド（公式クイックスタートで確認済み）。

## 前提バージョンの確認

```sh
cargo --version
rustup --version
```

## fw CLI の導入（crates.io 経由）

```sh
cargo install fandhe-frontend-cli
fw
```

`fw` バイナリが `cargo install` 先（既定 `~/.cargo/bin`）に導入される。引数なしで `fw` を実行するとサブコマンド一覧が表示され、導入確認になる。

## 開発版 fw の導入（ソースから）

```sh
git clone git@github.com:Fandhe-AI/fandhe-frontend.git
cd fandhe-frontend
cargo install --path crates/cli
```

リポジトリを clone してソースから `fw` を導入する場合。都度実行するだけなら `cargo run -p fandhe-frontend-cli --bin fw -- <サブコマンド>` でも可。

## CSR（WASM）ビルド用ツールチェーンの追加

```sh
rustup target add wasm32-unknown-unknown
```

```sh
grep -A1 'name = "wasm-bindgen"' wasm/Cargo.lock | head -2
```

生成したプロジェクト（`fw new --template app`）の `wasm/Cargo.lock` から必要な `wasm-bindgen` バージョンを確認する。

```sh
cargo install wasm-bindgen-cli --version <確認したバージョン> --locked
```

`wasm-bindgen-cli` のバージョンは `wasm/Cargo.lock` が解決した `wasm-bindgen` のバージョンと完全一致させる必要がある（不一致は `tools/wasm/build.sh` が実行前チェックで検出し停止する）。
