---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/README.md
---

# development-setup

開発環境構築・タスクランナー（Makefile）・wire-server の起動・crates.io への公開手順。

## Signature / Usage

開発環境構築:

~~~bash
git clone git@github.com:Fandhe-AI/vector-db.git
cd vector-db
make setup   # サブモジュール → rustup → lefthook（git hooks）を一括構築
~~~

wire-server の起動（TASK-73）:

~~~bash
cargo run -p fandhe-vector-db-wire-server -- --users <ユーザーストアのパス> --db <redb ファイルのパス> \
  [--bind 127.0.0.1:5432] [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>]
~~~

## Options / Props

タスクランナー（Makefile）主要ターゲット:

| Command | Purpose |
|------|------|
| `make setup` | 開発環境の一括構築（submodule → rustup → lefthook） |
| `make ci` | CI（`.github/workflows/ci.yml`）と同等のチェックをローカル一括実行 |
| `make lint-docs` | ドキュメント／設定ファイル系 lint（markdownlint・yamllint・editorconfig-checker・commitlint） |
| `make fmt` / `make fmt-check` / `make lint` / `make test` / `make deny` | Rust 系チェック |
| `make docker-build` / `make docker-shell` / `make docker-ci` | Docker による環境非依存の開発・検証（`compose.yaml` 参照） |
| `make e2e-three-client` | TASK-73（WIRE-1）／TASK-165（SQL-12・SEARCH-9）／TASK-168（SQL-13・SQL-14）実 `psql` / `psycopg` / `pg` クライアント統合テスト（`ci` には含めない opt-in） |

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

crates.io への公開（`.github/workflows/release.yml`）:

| Input | Values |
|------|------|
| `crate` | `fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` / `all`（`--workspace` で engine → wire-server の依存順に一括公開。初回公開はこれを使う） |
| `version` | 公開するバージョン。対象クレートの `Cargo.toml` と完全一致が必須 |
| `mode` | `dry-run-only`（既定。ガード群 + `cargo publish --dry-run` のみ）/ `publish`（実公開） |

## Notes

- `docs/spec` submodule は private リポジトリのため、アクセス権が無い環境では `make setup` が警告付きで続行する。core のビルド・テストは spec 非依存。
- `rustup` が未導入の場合、`make setup` は内部で `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable` を実行する（`Makefile` の `rustup` ターゲット。`command -v rustup` 等で未導入と判定した場合のみ）。取得元スクリプトを未検証のまま自動実行する経路であるため、CI・自動化環境ではこの経路を実行手順として案内しない。rustup は公式手順（https://rustup.rs）で事前導入済みであることを前提とし、その場合 `make setup` はこのステップをスキップする。
- 公開名は `fandhe-vector-db-engine`（`crates/engine`）・`fandhe-vector-db-wire-server`（`crates/wire-server`）。ライブラリ名 `engine`・バイナリ名 `wire-server` は据え置きのため、ソース内の `use engine::...`・`target/release/wire-server` は不変で、`cargo` の `-p`/`--package` に渡す名前だけが公開名になる（例: `cargo test -p fandhe-vector-db-engine`）。
- 公開は `release` workflow の `workflow_dispatch` からのみ行う（タグ push 起点は不採用）。`publish` ジョブは GitHub Environment `crates-io-release` の承認ゲートを通り、secret `CARGO_REGISTRY_TOKEN` を publish ステップにのみ注入する。Environment の required reviewers と secret の設定はオーナー作業。
- `wire-server` 単体の dry-run は engine の公開版が crates.io に無い間は依存解決で失敗するため、初回は `all` を使う。
- ライセンスは MIT OR Apache-2.0 のデュアルライセンス（`LICENSE-MIT` / `LICENSE-APACHE`）。

## Related

- [overview](./overview.md)
- [crate-layout](./crate-layout.md)
