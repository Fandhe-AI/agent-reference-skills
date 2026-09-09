---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/Makefile
---

# make-targets

開発ワークフローで使う Makefile ターゲット（CI 相当のローカル実行・Rust 品質チェック・ドキュメント lint・Docker）。ベンチマーク系ターゲット（`bench-*`）と recall/precision 回帰系（`*-regression`、`precision-report`）は時間依存・spec 閾値依存のため収録しない。

## Usage

### CI 相当の一括実行

```bash
make ci
```

`ci` は次のターゲットを順に実行する（Makefile 実体）。

```makefile
ci: lint-docs fmt-check lint test crash-test crash-test-interrupt crash-test-cross-table core-api-check sort-determinism-check simd-codegen-check deny
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

### ドキュメント / 設定ファイル lint

```bash
make lint-docs
```

`lint-docs` は markdownlint（`npx --yes markdownlint-cli@<pinned> --ignore-path .markdownlintignore "**/*.md"`）・yamllint・editorconfig-checker・commitlint をまとめて実行する。

### E2E クライアント統合テスト

```bash
make e2e-three-client
```

```makefile
cargo test -p fandhe-vector-db-wire-server --test three_client_e2e -- --ignored
cargo test -p fandhe-vector-db-wire-server --test extended_syntax_e2e -- --ignored
```

実 `psql` / `python3`+`psycopg` / `node`+`pg` クライアントを使う統合テスト（TASK-73/WIRE-1・TASK-165・TASK-168）。`ci` には含まれない opt-in ターゲットで、`PSQL_BIN` / `PYTHON_BIN` / `NODE_BIN` 環境変数でバイナリパスを上書きできる。

### Docker（環境非依存の開発・検証）

```bash
make docker-build   # docker compose build
make docker-shell    # docker compose run --rm dev
make docker-ci       # docker compose run --rm dev make ci
```

`compose.yaml` の `dev` サービスはカレントディレクトリを `/work` にマウントし `bash` を起動する開発・CI 用コンテナで、Cargo registry / target 用のキャッシュ volume を持つ。wire-server 用のポート公開は定義されておらず、サーバー起動用途のターゲットではない（サーバー起動は `../run-wire-server.md` の `cargo run` を参照）。

### ターゲット一覧

```bash
make help
```

## Notes

- `make bench-simd` / `make bench-c1` / `make recall-regression` / `make precision-regression` / `make precision-report` は時間依存・spec 閾値依存の回帰チェックであり `ci` には含まれない。`precision-report` は実測値を標準出力へ出すためローカル専用（CI からは実行しない）。いずれも本スキルには収録しない

> **警告**: `make deny` は `cargo-deny` 未導入の場合、初回実行時にネットワーク経由で `cargo install cargo-deny@<pinned> --locked` を自動実行しツールチェインへ新規バイナリを追加する。信頼できるネットワーク環境でのみ実行すること

## Related

- `./install.md`
- `./run-wire-server.md`
