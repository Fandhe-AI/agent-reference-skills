---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/README.md
---

# development-setup

開発環境構築・タスクランナー（Makefile）・wire-server の起動・crates.io への公開手順。

## Signature / Usage

開発環境構築:

~~~bash
git clone git@github.com:Fandhe-AI/fandhe-db.git
cd fandhe-db
make setup   # サブモジュール → rustup → lefthook（git hooks）を一括構築
~~~

wire-server の起動（TASK-73）:

~~~bash
cargo run -p fandhe-db-wire-server -- --users <ユーザーストアのパス> --db <redb ファイルのパス> \
  [--bind 127.0.0.1:5432] [--surface sql|nosql] \
  [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>] \
  [--hnsw-scope all|declared] \
  [--durability immediate|none] \
  [--max-dml-affected-rows <1-1000000>] [--max-insert-rows <1-1000000>] \
  [--batch-max-files <1-1000000>] \
  [--partitioned-dml-chunk-rows <1-1000000>] [--partitioned-dml-scan-budget <1-1000000>] \
  [--partitioned-dml-max-hold-ms <100-5000>] \
  [--partitioned-dml-max-jobs-per-tenant <1-64>] [--partitioned-dml-max-jobs <1-64>] \
  [--partitioned-dml-max-interrupted-records <1-1000000>] \
  [--ddl-allowed-users <user1>[,<user2>...]] \
  [--auth-method cleartext|scram-sha-256] \
  [--scram-mock-key-file <path>] \
  [--tls-cert <pem> --tls-key <pem> [--tls-mode require|allow] \
   [--tls-scram-channel-binding enable|disable]]
~~~

各フラグの詳細は wire-server の main-cli ページを参照。

## Options / Props

タスクランナー（Makefile）主要ターゲット:

| Command | Purpose |
|------|------|
| `make setup` | 開発環境の一括構築（submodule → rustup → lefthook） |
| `make ci` | CI（`.github/workflows/ci.yml`）と同等のチェックをローカル一括実行 |
| `make lint-docs` | ドキュメント／設定ファイル系 lint（markdownlint・yamllint・editorconfig-checker・commitlint） |
| `make fmt` / `make fmt-check` / `make lint` / `make test` / `make deny` | Rust 系チェック（`make test` は `--all-features`） |
| `make test-default-build` | 既定ビルド（feature `fault-injection` 無効）専用の回帰テスト（`ci` に含む） |
| `make crash-test` / `make crash-test-interrupt` / `make crash-test-cross-table` / `make crash-test-unique-index` / `make crash-test-partitioned-dml` / `make tmp-leak-check` / `make core-api-check` / `make sort-determinism-check` / `make simd-codegen-check` | `ci` に含まれるガード系（クラッシュ耐性・テスト一時領域の残置検出・コア API 差分・ソート非決定性・SIMD 生成コード検査） |
| `make check-cross` / `make simd-codegen-check-cross` | aarch64 クロスコンパイル確認（`ci` には含めない） |
| `make docker-build` / `make docker-shell` / `make docker-ci` | Docker による環境非依存の開発・検証（`compose.yaml` 参照） |
| `make e2e-three-client` | 実 `psql` / `psycopg` / `pg` クライアント統合テスト（SCRAM／psql `\copy`／複数行 INSERT と NoSQL `rows[]` パリティ／拡張クエリ・型復元・バイナリ受信を含む。`ci` には含めない opt-in） |
| `make e2e-three-client-tls` | TLS 1.3 越しの実 `psql` / `psycopg` / `pg` クライアント統合テスト（`ci` には含めない opt-in。証明書・鍵は実行時に生成） |
| `make e2e-three-client-http` | NoSQL 表層（`--surface nosql`）の無改造 HTTP クライアント（curl／urllib／fetch）統合テスト（`ci` には含めない opt-in） |

`make help` で全ターゲット一覧を確認できる。ベンチ系ターゲット（`make bench-simd` 等）・`make precision-report` は本ページの対象外（README のベンチ節は本 scope で読まない）。

wire-server CLI フラグ:

| Flag | Required | Description |
|------|------|------|
| `--users` | 必須 | ユーザーストアのパス（未指定は匿名ログイン・匿名 DB を暗黙生成せず fail-closed で起動を拒否） |
| `--db` | 必須 | redb ファイルのパス（未指定は同様に fail-closed） |
| `--bind` | 任意 | 待受アドレス。既定 `127.0.0.1:5432` |
| `--search-engine` | 任意 | `default` / `hnsw` / `hnsw_f16` / `hnsw_i8` から選択。未指定（または `default`）は brute-force のまま不変。不正な値・値欠落・重複指定は fail-closed で起動エラー |
| `--hnsw-full-scan-ratio` | 任意 | 可視カーディナリティ切替の閾値比。可視候補数 ÷ 索引ノード数がこの比未満なら plain scan。既定 `1/10`。`--search-engine` が `hnsw` 系のときのみ指定可 |
| `--hnsw-acorn-max-visible-ratio` | 任意 | ACORN-1 の 2-hop 展開を有効化する可視比率の上限。既定 none（無効） |
| `--hnsw-sparse-visited-max` | 任意 | visited 集合の実装切替閾値。既定 `0`（常に dense） |
| `--surface` | 任意 | `sql`（既定）/ `nosql`。クエリインターフェース（SQL wire / HTTP/1.1 NoSQL）の排他選択 |
| `--hnsw-scope` | 任意 | `all`（既定）/ `declared`。HNSW opt-in 時に HNSW を使うテーブルの範囲 |
| `--durability` | 任意 | `immediate`（既定）/ `none`。`none` は commit 成功応答が永続を保証しない |
| `--max-dml-affected-rows` / `--max-insert-rows` | 任意 | 述語形 `UPDATE`／`DELETE` の影響行数上限・複数行 `VALUES` の行数上限（`1`〜`1,000,000`）。未指定は上限なし |
| `--batch-max-files` | 任意 | 1 バッチ件数上限（既定 64。CLI > 環境変数 `FANDHE_DB_BATCH_MAX_FILES` > 既定） |
| `--partitioned-dml-*` | 任意 | 分割実行 DML の資源上限 6 種（`chunk-rows` 1,000 / `scan-budget` 100,000 / `max-hold-ms` 1,000 / `max-jobs-per-tenant` 1 / `max-jobs` 4 / `max-interrupted-records` 1,000） |
| `--ddl-allowed-users` | 任意 | DDL 実行権限を持つ username のカンマ区切り。未指定は全ユーザー `42501` で拒否 |
| `--auth-method` | 任意 | `cleartext`（既定）/ `scram-sha-256` |
| `--scram-mock-key-file` | 条件付き | `scram-sha-256` 選択時のみ必須（32 バイト以上） |
| `--tls-cert` / `--tls-key` / `--tls-mode` / `--tls-scram-channel-binding` | 任意 | TLS 1.3 の opt-in。`--tls-mode` は `require`（既定）/ `allow`、`--tls-scram-channel-binding` は `enable` / `disable`（既定 `disable`） |

crates.io への公開（`.github/workflows/release.yml`）:

| Input | Values |
|------|------|
| `crate` | `fandhe-db-engine` / `fandhe-db-wire-server` / `all`（`--workspace` で engine → wire-server の依存順に一括公開。初回公開はこれを使う） |
| `version` | 公開するバージョン。対象クレートの `Cargo.toml` と完全一致が必須 |
| `mode` | `dry-run-only`（既定。ガード群 + `cargo publish --dry-run` のみ）/ `publish`（実公開） |

## Notes

- `docs/spec` submodule は private リポジトリのため、アクセス権が無い環境では `make setup` が警告付きで続行する。core のビルド・テストは spec 非依存。
- `rustup` が未導入の場合、`make setup` は内部で `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable` を実行する（`Makefile` の `rustup` ターゲット。`command -v rustup` 等で未導入と判定した場合のみ）。取得元スクリプトを未検証のまま自動実行する経路であるため、CI・自動化環境ではこの経路を実行手順として案内しない。rustup は公式手順（https://rustup.rs）で事前導入済みであることを前提とし、その場合 `make setup` はこのステップをスキップする。
- 公開名は `fandhe-db-engine`（`crates/engine`）・`fandhe-db-wire-server`（`crates/wire-server`）。ライブラリ名 `engine`・バイナリ名 `wire-server` は据え置きのため、ソース内の `use engine::...`・`target/release/wire-server` は不変で、`cargo` の `-p`/`--package` に渡す名前だけが公開名になる（例: `cargo test -p fandhe-db-engine`）。
- Migration (0.1.0 → 0.2.0): 旧名 `fandhe-vector-db-*` で書かれた `cargo run -p` / `cargo test -p` / 公開 workflow の `crate` 入力は新名へ置き換える。
- Makefile には他にも bench 系ターゲット（`bench-crossdb-ab`・`bench-ingest-durability-ab`・`bench-relational-p95`・`wire-tenant-latency`・`worktree-lag-check` など）が追加されたが、本ページの対象外（名前のみ記載。`make help` で確認）。
- 公開は `release` workflow の `workflow_dispatch` からのみ行う（タグ push 起点は不採用）。`publish` ジョブは GitHub Environment `crates-io-release` の承認ゲートを通り、secret `CARGO_REGISTRY_TOKEN` を publish ステップにのみ注入する。Environment の required reviewers と secret の設定はオーナー作業。
- `wire-server` 単体の dry-run は engine の公開版が crates.io に無い間は依存解決で失敗するため、初回は `all` を使う。
- ライセンスは MIT OR Apache-2.0 のデュアルライセンス（`LICENSE-MIT` / `LICENSE-APACHE`）。

## Related

- [overview](./overview.md)
- [crate-layout](./crate-layout.md)
