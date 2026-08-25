# dev

`fandhe-ai` workspace（クローン済みリポジトリ）でのビルド・実行・テストコマンド集。

## サンプル実行

```sh
cargo run -p fandhe-ai --example getting_started
cargo run -p fandhe-ai --example array_shapes
cargo run -p fandhe-ai --example backend_switching
cargo run -p fandhe-ai --example training_loop
cargo run -p fandhe-ai --example inference
```

`crates/facade/examples/` 配下の各 `.rs` ファイルに対応する。

## ベンチマーク系サンプル

```sh
cargo run --release -p fandhe-ai --example gemm_bench
```

計測を伴うため `--release` 必須。

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

## バックエンド選択の仕組み（コマンドではなく API 経由）

バックエンド切り替えは Cargo feature や `RUSTFLAGS` ではなく、`cfg(target_os = ...)` による自動条件分岐とランタイム API で行う。

- `fandhe_ai::tape()` — CPU バックエンド固定（既定、非 fallible）
- `fandhe_ai::tape_for(Device::Cuda(0))` — CUDA を明示指定（`Result` を返し、ツールキット不在時はエラー）
- `fandhe_ai::tape_for(Device::Metal)` — Metal を明示指定（macOS 以外はビルド時点で対象外）

コード中の `Device` 選択で切り替えるため、ビルドコマンド自体にバックエンド指定フラグは存在しない。

## 静的検査

```sh
cargo clippy -D warnings
cargo fmt --all --check
```

## Make ターゲット（上記コマンドの包装）

```sh
make setup
make fmt-check
make lint
make test
make test-ignored-cuda
make test-ignored-metal
make deny
make ci
```

`make ci` は CI と同一のフルチェック（fmt / lint / test / deny 等）を一括実行する。

## ドキュメントサイトのビルド

```sh
cargo run -p docs-site -- --out dist/
```
