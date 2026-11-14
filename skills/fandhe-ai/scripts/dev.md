---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/Makefile, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/scripts/help.sh
---

# dev

`fandhe-ai` workspace（クローン済みリポジトリ）でのビルド・実行・テストコマンド集。対象は v0.14.0。

## Signature / Usage

### リポジトリのクローン

```sh
git clone --recurse-submodules git@github.com:Fandhe-AI/fandhe-ai.git
```

クローン済みの場合は次でサブモジュールを取得する。

```sh
git submodule update --init
```

`docs/spec` サブモジュールは private リポジトリのため、アクセス権のない環境では取得に失敗する。その場合も `cargo build --workspace` と `cargo test --workspace`（`#[ignore]` を除く通常テスト）は成立する（README 記載）。

Linux では TLS 依存（`ureq`。`native-tls` + `vendored`）が OpenSSL をソースから静的に同梱するため、`perl`・`make`・C ツールチェーンが必要（`libssl-dev` は不要。debug ビルドで +21〜42 秒。macOS は不要。開発コンテナ〈`Dockerfile`〉は導入済み）。

### 開発環境の一括構築

```sh
make setup
make help
```

サブモジュール取得、rustup（stable）、lefthook（git hooks）の順に構築する。`make help` でターゲット一覧を表示する。Makefile は薄い入口で処理の定義は `scripts/*.sh` にあり、Make を使わない場合の同等コマンドは `scripts/help.sh` で表示する。

### サンプル実行

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

### ベンチマーク系サンプル

```sh
cargo run --release -p fandhe-ai --example facade_gemm_bench
```

計測を伴うため `--release` 必須。example 名は `facade_gemm_bench`（ソースは `examples/gemm_bench.rs`）。旧名 `gemm_bench` では実行できない。

### workspace 全体のビルド・テスト

```sh
cargo build --workspace
cargo test --workspace
```

### バックエンド実機テスト（CUDA / Metal）

```sh
cargo test -p fandhe-ai-backend-cuda --release -- --ignored --nocapture
cargo test -p fandhe-ai-backend-metal --release -- --ignored --nocapture
```

`#[ignore]` 付きの実機依存テストを明示的に実行する。CUDA テストは CUDA ツールキットが動的ロード可能な環境、Metal テストは macOS 環境が前提（`fandhe-ai-backend-metal` は `cfg(target_os = "macos")` でのみビルド対象になる）。

`make test-ignored-metal` は `--all-features` 付きで実行する（feature ゲートされたテストバイナリが暗黙にスキップされる false-green の回避。Makefile のコメント参照）。`make test-ignored-cuda` は `scripts/test-ignored.sh cuda` で、`backend-cuda` を `--release --all-features` で実行し（一部テストを `--skip` する）、続けて `graph_capture_real_device` を `--test-threads=1` で実行する。上記の直接実行はこの指定を含まない。

`backend-rocm` の実機テスト（`tests/*_real_device.rs`）は `#[ignore]` で、実機（AMD GPU）での確認は未実施（README に明記）。この README が列挙する Make ターゲットに ROCm 実機用のものはない。

### バックエンド選択の仕組み（コマンドではなく API 経由）

バックエンド切り替えは Cargo feature や `RUSTFLAGS` ではなく、`cfg(target_os = ...)` による自動条件分岐とランタイム API で行う。

- `fandhe_ai::tape()` — CPU バックエンド固定（既定、非 fallible）
- `fandhe_ai::tape_for(Device::Cuda(0))` — CUDA を明示指定（`Result` を返し、ツールキット不在時はエラー）
- `fandhe_ai::tape_for(Device::Metal)` — Metal を明示指定（macOS 以外はビルド時点で対象外）
- `fandhe_ai::tape_for(Device::Rocm(0))` — ROCm を明示指定（条件付き・実験的。HIP・HIPRTC・gfx942 のロードがそろわないホストでは `DeviceUnavailable`）

コード中の `Device` 選択で切り替えるため、ビルドコマンド自体にバックエンド指定フラグは存在しない。

### 静的検査

```sh
cargo clippy -- -D warnings
cargo fmt --all --check
```

`make lint` は次の 2 行を実行する。2 行目は `--workspace --all-features` では `backend-cuda` の `internal-diagnostics` feature が常に有効になり、feature 無効（既定ビルド）時のみ表面化する dead code を再現できないため、CI（`build-no-cuda-toolkit` ジョブ）と同じ条件をローカルで再現する（イシュー #2299）。

```sh
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo clippy -p fandhe-ai-backend-cuda --all-targets -- -D warnings
```

### Make ターゲット（上記コマンドの包装）

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
make build-cross
make build-no-cuda
make check-cross-metal-tests
make check-cross-cpu-tests
make check-cross-rocm-tests
make check-cross-windows-interop
make doc-warnings
make deny
make deps-forbidden
make runner-policy
make guardrail-regression
make verification-gates
make verification-gate-bench
make startup-bench
make peak-memory-bench
make ci
```

`make test` は `cargo test --workspace --all-features`（実機依存の `#[ignore]` テストは除く）。`make ci` は CI と同一のフルチェック（fmt-check / lint / build-cross / build-no-cuda / check-cross-metal-tests / check-cross-cpu-tests / check-cross-rocm-tests / check-cross-windows-interop / doc-warnings / test / deny / deps-forbidden / runner-policy / guardrail-regression / verification-gates）を一括実行する。

`make startup-bench` / `make peak-memory-bench` は `scripts/bench-harness.sh` の入口で、環境変数 `BACKEND`（`cpu` / `cuda` / `metal`。既定 `cpu`）・`TRIALS`（既定 5）・`SIZE`（peak-memory のみ。既定 4096）で切り替える。

Adapted (not in the official docs): README・Makefile の環境変数と既定値から組み立てた呼び出し例。

```sh
BACKEND=cpu TRIALS=5 make startup-bench
BACKEND=cpu SIZE=4096 make peak-memory-bench
```

開発コンテナ（CPU バックエンドのみ）は `make docker-build` / `make docker-shell` / `make docker-ci`（コンテナ内で `make ci`）。

### Metal 実機テスト（facade 側）

```sh
make test-ignored-metal-facade
```

facade（`fandhe-ai`）の `DeviceParamStore` 契約 `#[ignore]` テストのみを release で実行する。`make test-ignored-metal` は `backend-metal` クレート単体限定で facade のテストを含まない。facade の同一テストバイナリには CUDA 実機必須のテストが混在するため、Mac では本ターゲットを使う（README 記載）。

### クロスターゲットの型検査・lint

```sh
make check-cross-windows-interop
make check-cross-rocm-tests
```

`check-cross-windows-interop` は `onnx-interop` と facade を `x86_64-pc-windows-msvc` で `cargo clippy -D warnings` 検査する。`check-cross-rocm-tests` は `backend-rocm` の cfg 分岐（非 Linux では HIP 候補が空）を tests 込みで `aarch64-apple-darwin` に対し `cargo check` する。未導入ターゲットは `rustup target add` で自動追加される。

### ROCm / CUDA 非搭載環境でのビルド・実行検証

```sh
make build-no-cuda
```

CUDA toolkit と ROCm がどちらも非搭載であることを検査（`scripts/check-cuda-toolkit-absent.sh`・`scripts/check-rocm-absent.sh`）したうえで `cargo build --workspace --locked` と `cargo test --workspace --locked` を実行する。いずれかが搭載された環境ではスキップされる（`make docker-ci` で検証可能）。

### rustdoc 警告ゲート

```sh
make doc-warnings
```

`RUSTDOCFLAGS="-D warnings"` で次の 3 通りの `cargo doc` を実行する。Linux ホスト分（`--workspace --no-deps --locked`）、aarch64-apple-darwin クロス分（`fandhe-ai-backend-metal` / `fandhe-ai-backend-cpu`）、`fandhe-ai-backend-cuda --all-features` 分。

### 依存監査

```sh
cargo deny --locked check advisories bans licenses sources
```

`make deny` と同一内容。`cargo-deny` は `make deny` 実行時に未導入なら自動導入される。

### ドキュメントサイトのビルド

```sh
cargo run -p docs-site -- --out dist/
```

生成物は `dist/index.html` から閲覧できる。内部リンク検証（linkcheck）が内蔵されており、リンク切れ検出時は非 0 終了する。

## Notes

- 対象は v0.14.0 の README・Makefile・`scripts/help.sh`。Makefile のターゲットは `scripts/*.sh` への薄い入口で、追加・変更時は `scripts/help.sh` も同じ変更で更新される運用（`scripts/help.sh` の冒頭コメント）
- `make setup` 等は `docs/spec`（private サブモジュール）が取得できない環境では一部失敗しうる
- ROCm / CUDA の実機テストは対象ハードのあるホストでのみ実行する
- Adapted: the `BACKEND=… make startup-bench` / `make peak-memory-bench` examples are assembled from the Makefile comments and `scripts/bench-harness.sh` defaults, not quoted from the README
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/Makefile（v0.14.0, 取得日 2026-11-14）

## Related

- [install.md](./install.md)
- [cli.md](./cli.md)
