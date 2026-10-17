---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/Makefile
---

# make-targets

開発ワークフローで使う Makefile ターゲット（CI 相当のローカル実行・Rust 品質チェック・クラッシュ耐性ガード・ドキュメント lint・E2E・Docker）。ベンチマーク系ターゲット（`bench-*`）と recall/precision 回帰系（`*-regression`、`precision-report`）は時間依存・spec 閾値依存のため収録しない。

## Usage

### CI 相当の一括実行

```bash
make ci
```

`ci` は次のターゲットを順に実行する（Makefile 実体）。

```makefile
ci: lint-docs fmt-check lint test test-default-build crash-test crash-test-interrupt crash-test-cross-table crash-test-unique-index crash-test-partitioned-dml tmp-leak-check core-api-check sort-determinism-check simd-codegen-check deny
```

### Rust 品質チェック個別実行

```bash
make fmt          # cargo fmt --all
make fmt-check    # cargo fmt --all --check
make lint         # cargo clippy --workspace --all-targets --all-features -- -D warnings
make test         # cargo test --workspace --all-features
make deny         # cargo deny --locked check advisories bans licenses sources（cargo-deny 未導入時は自動 install）
```

`Cargo.toml` が存在しない環境ではこれらのターゲットは skip メッセージを出して何もしない（`ifdef HAS_CARGO` ガード）。

### 既定ビルド専用の回帰テスト

```bash
make test-default-build
```

```makefile
cargo test -p fandhe-db-wire-server --test wire_fault_injection_cli
```

feature `fault-injection` 無効の既定ビルド専用（`ci` に含む）。`make test` は `--all-features` のため対象外となるテストをピンポイントで実行する。

### クラッシュ耐性・残置検出ガード

```bash
make crash-test                  # scripts/crash_test.sh
make crash-test-interrupt        # scripts/crash_test_interrupt.sh
make crash-test-cross-table      # scripts/crash_test_cross_table.sh
make crash-test-unique-index     # scripts/crash_test_unique_index.sh（永続一意索引。Issue #1070・TABLE-16）
make crash-test-partitioned-dml  # scripts/crash_test_partitioned_dml.sh（分割実行 DML。Issue #1131）
make tmp-leak-check              # scripts/check_tmp_leak.sh（テスト一時領域の残置検出。Issue #1303。FULL=1 で workspace 全テスト）
```

いずれも `ci` に含まれるガード系。個別実行や詳細は `make help` を参照。

### ドキュメント / 設定ファイル lint

```bash
make lint-docs
```

`lint-docs` は markdownlint（`npx --yes markdownlint-cli@<pinned> --ignore-path .markdownlintignore "**/*.md"`）・yamllint・editorconfig-checker・commitlint をまとめて実行する。

### E2E クライアント統合テスト

```bash
make e2e-three-client        # psql / psycopg / pg（SQL wire）
make e2e-three-client-tls    # TLS 1.3 越しの psql / psycopg / pg
make e2e-three-client-http   # NoSQL 表層（--surface nosql）の curl / urllib / fetch
```

`e2e-three-client` の実体。

```makefile
cargo test -p fandhe-db-wire-server --features fault-injection --test three_client_e2e -- --ignored
cargo test -p fandhe-db-wire-server --test extended_syntax_e2e -- --ignored
cargo test -p fandhe-db-wire-server --test three_client_extended_e2e -- --ignored
```

`e2e-three-client-tls` と `e2e-three-client-http` の実体。

```makefile
cargo test -p fandhe-db-wire-server --test wire9_tls -- --ignored --nocapture --test-threads=1
cargo test -p fandhe-db-wire-server --test three_client_http_e2e -- --ignored --nocapture --test-threads=1
```

いずれも `ci` には含まれない opt-in ターゲット。

- `e2e-three-client` / `e2e-three-client-tls`: 要 `psql`・`python3`+`psycopg`・`node`+`pg`。`PSQL_BIN` / `PYTHON_BIN` / `NODE_BIN` で上書き可。TLS 版の証明書・鍵は実行時に生成しリポジトリへは置かない
- `e2e-three-client-http`: 要 `curl`・`python3`・`node`（>=18）。Makefile の説明では `psql` も SQL 経路パリティ検証に使用。`CURL_BIN` / `PYTHON_BIN` / `NODE_BIN` で上書き可。実行記録（`[e2e-record]`）を stderr へ出力する。PR 記録様式は `docs/design/three-client-e2e-harness.md` 参照

### Docker（環境非依存の開発・検証）

```bash
make docker-build   # docker compose build
make docker-shell    # docker compose run --rm dev
make docker-ci       # docker compose run --rm dev make ci
```

`compose.yaml` の `dev` サービスはカレントディレクトリを `/work` にマウントし `bash` を起動する開発・CI 用コンテナで、Cargo registry / target 用のキャッシュ volume を持つ。wire-server 用のポート公開は定義されておらず、サーバー起動用途のターゲットではない（サーバー起動は [run-wire-server.md](./run-wire-server.md) の `cargo run` を参照）。

### ターゲット一覧

```bash
make help
```

## Notes

- `make bench-simd` / `make bench-c1` / `make recall-regression` / `make precision-regression` / `make precision-report` は時間依存・spec 閾値依存の回帰チェックであり `ci` には含まれない。`precision-report` は実測値を標準出力へ出すためローカル専用（CI からは実行しない）。いずれも本スキルには収録しない
- `make check-cross` / `make simd-codegen-check-cross`（aarch64 クロスコンパイル確認）と `make test-eval`（`scripts/eval` のユニットテスト。要 `python3`）は `ci` に含まれず、本スキルには収録しない
- パッケージ名は 0.2.0 以降 `fandhe-db-wire-server` / `fandhe-db-engine`（旧 `fandhe-vector-db-*`）

> **警告**: `make deny` は `cargo-deny` 未導入の場合、初回実行時にネットワーク経由で `cargo install cargo-deny@<pinned> --locked` を自動実行しツールチェインへ新規バイナリを追加する。信頼できるネットワーク環境でのみ実行すること

## Related

- [install.md](./install.md)
- [run-wire-server.md](./run-wire-server.md)
