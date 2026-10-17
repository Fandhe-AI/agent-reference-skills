---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.11.0/README.md, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.11.0/Makefile
---

# dev

`fandhe-ai` workspace（クローン済みリポジトリ）でのビルド・実行・テストコマンド集。対象は v0.11.0。

## リポジトリのクローン

```sh
git clone --recurse-submodules git@github.com:Fandhe-AI/fandhe-ai.git
```

クローン済みの場合は次でサブモジュールを取得する。

```sh
git submodule update --init
```

`docs/spec` サブモジュールは private リポジトリのため、アクセス権のない環境では取得に失敗する。その場合も `cargo build --workspace` と `cargo test --workspace`（`#[ignore]` を除く通常テスト）は成立する（README 記載）。

## 開発環境の一括構築

```sh
make setup
make help
```

サブモジュール取得、rustup（stable）、lefthook（git hooks）の順に構築する。`make help` でターゲット一覧を表示する。

## サンプル実行

```sh
cargo run -p fandhe-ai --example getting_started
cargo run -p fandhe-ai --example array_shapes
cargo run -p fandhe-ai --example backend_switching
cargo run -p fandhe-ai --example training_loop
cargo run -p fandhe-ai --example inference
cargo run -p fandhe-ai --example main
cargo run -p fandhe-ai --example reference_models
cargo run -p fandhe-ai --example hf_safetensors_sequential
```

`crates/facade/examples/` 配下の各ソースに対応する。`hf_safetensors_sequential` は `examples/hf_safetensors_sequential/main.rs`、`main` は `examples/main.rs`（held-out 精度をログ出力する例）。

## ベンチマーク系サンプル

```sh
cargo run --release -p fandhe-ai --example facade_gemm_bench
```

計測を伴うため `--release` 必須。example 名は `facade_gemm_bench`（ソースは `examples/gemm_bench.rs`）。旧名 `gemm_bench` では実行できない。

## workspace 全体のビルド・テスト

```sh
cargo build --workspace
cargo test --workspace
```

## バックエンド実機テスト（CUDA / Metal）

```sh
cargo test -p fandhe-ai-backend-cuda --release -- --ignored --nocapture
cargo test -p fandhe-ai-backend-metal --release -- --ignored --nocapture
```

`#[ignore]` 付きの実機依存テストを明示的に実行する。CUDA テストは CUDA ツールキットが動的ロード可能な環境、Metal テストは macOS 環境が前提（`fandhe-ai-backend-metal` は `cfg(target_os = "macos")` でのみビルド対象になる）。

`make test-ignored-cuda` / `make test-ignored-metal` は `--all-features` 付きで実行する（feature ゲートされたテストバイナリが暗黙にスキップされる false-green の回避。Makefile のコメント参照）。上記の直接実行はこの feature 指定を含まない。

## バックエンド選択の仕組み（コマンドではなく API 経由）

バックエンド切り替えは Cargo feature や `RUSTFLAGS` ではなく、`cfg(target_os = ...)` による自動条件分岐とランタイム API で行う。

- `fandhe_ai::tape()` — CPU バックエンド固定（既定、非 fallible）
- `fandhe_ai::tape_for(Device::Cuda(0))` — CUDA を明示指定（`Result` を返し、ツールキット不在時はエラー）
- `fandhe_ai::tape_for(Device::Metal)` — Metal を明示指定（macOS 以外はビルド時点で対象外）

コード中の `Device` 選択で切り替えるため、ビルドコマンド自体にバックエンド指定フラグは存在しない。

## 静的検査

```sh
cargo clippy -- -D warnings
cargo fmt --all --check
```

`make lint` は次の 2 行を実行する。2 行目は `--workspace --all-features` では `backend-cuda` の `internal-diagnostics` feature が常に有効になり、feature 無効（既定ビルド）時のみ表面化する dead code を再現できないため、CI（`build-no-cuda-toolkit` ジョブ）と同じ条件をローカルで再現する（イシュー #2299）。

```sh
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo clippy -p fandhe-ai-backend-cuda --all-targets -- -D warnings
```

## Make ターゲット（上記コマンドの包装）

```sh
make setup
make fmt
make fmt-check
make lint
make test
make test-ignored
make test-ignored-cuda
make test-ignored-metal
make test-ignored-metal-facade
make deny
make deps-forbidden
make ci
```

`make ci` は CI と同一のフルチェック（fmt-check / lint / build-cross / build-no-cuda / check-cross-* / doc-warnings / test / deny / deps-forbidden / runner-policy / guardrail-regression / verification-gates）を一括実行する。

## Metal 実機テスト（facade 側）

```sh
make test-ignored-metal-facade
```

facade（`fandhe-ai`）の `DeviceParamStore` 契約 `#[ignore]` テストのみを release で実行する。`make test-ignored-metal` は `backend-metal` クレート単体限定で facade のテストを含まない。facade の同一テストバイナリには CUDA 実機必須のテストが混在するため、Mac では本ターゲットを使う（README 記載）。

## クロスターゲットの型検査・lint

```sh
make check-cross-windows-interop
```

`onnx-interop` と facade を `x86_64-pc-windows-msvc` で `cargo clippy -D warnings` 検査する。未導入ターゲットは `rustup target add` で自動追加される。

## rustdoc 警告ゲート

```sh
make doc-warnings
```

`RUSTDOCFLAGS="-D warnings"` で次の 3 通りの `cargo doc` を実行する。Linux ホスト分（`--workspace --no-deps --locked`）、aarch64-apple-darwin クロス分（`fandhe-ai-backend-metal` / `fandhe-ai-backend-cpu`）、`fandhe-ai-backend-cuda --all-features` 分。

## 依存監査

```sh
cargo deny --locked check advisories bans licenses sources
```

`make deny` と同一内容。`cargo-deny` は `make deny` 実行時に未導入なら自動導入される。

## ドキュメントサイトのビルド

```sh
cargo run -p docs-site -- --out dist/
```

生成物は `dist/index.html` から閲覧できる。内部リンク検証（linkcheck）が内蔵されており、リンク切れ検出時は非 0 終了する。
