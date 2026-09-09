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
make setup   # submodule → rustup → lefthook
~~~

wire-server の起動（TASK-73）:

~~~bash
cargo run -p fandhe-vector-db-wire-server -- --users <path> --db <path> \
  [--bind 127.0.0.1:5432] [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>]
~~~

## Options / Props

タスクランナー（Makefile）主要ターゲット:

| Command | Purpose |
|------|------|
| `make setup` | 環境セットアップ一括実行（submodule → rustup → lefthook） |
| `make ci` | CI と同等のローカルチェック |
| `make lint-docs` | Markdown・YAML・editorconfig・commit lint |
| `make fmt` / `make lint` / `make test` / `make deny` | Rust ツールチェーンのチェック |
| `make docker-build` / `make docker-ci` | 環境非依存の開発・検証 |
| `make e2e-three-client` | 結合テスト（psql・psycopg・node pg） |

`make help` で全ターゲット一覧を確認できる。

wire-server CLI フラグ:

| Flag | Required | Description |
|------|------|------|
| `--users` | 必須 | ユーザー定義ファイルのパス（未指定は fail-closed で起動しない） |
| `--db` | 必須 | DB ファイルのパス（未指定は fail-closed で起動しない） |
| `--bind` | 任意 | 待受アドレス。既定 `127.0.0.1:5432` |
| `--search-engine` | 任意 | `default` / `hnsw` / `hnsw_f16` / `hnsw_i8` から選択 |
| `--hnsw-full-scan-ratio` | 任意 | HNSW 全走査比率 |
| `--hnsw-acorn-max-visible-ratio` | 任意 | HNSW ACORN 可視上限比率 |
| `--hnsw-sparse-visited-max` | 任意 | HNSW 疎経路の訪問上限 |

crates.io への公開（`.github/workflows/release.yml`）:

| Input | Values |
|------|------|
| `crate` | `fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` / `all` |
| `version` | 対象 `Cargo.toml` の値と完全一致が必須 |
| `mode` | `dry-run-only`（既定）/ `publish` |

## Notes

- `docs/spec` submodule は private リポジトリのため、アクセス権が無い環境では `make setup` が警告付きで続行する。core のビルド・テストは spec 非依存。
- 公開クレート名は `fandhe-vector-db-engine`（lib）と `fandhe-vector-db-wire-server`（binary）。公開はタグトリガーではなく `workflow_dispatch` のみで、`publish` ジョブは GitHub Environment `crates-io-release` の承認ゲートを通す。`CARGO_REGISTRY_TOKEN` シークレットは publish ステップにのみ注入される。
- `--users` / `--db` は両方必須で、未指定時は fail-closed（起動しない）。cleartext password 認証で psql・psycopg・node pg が無改造で接続できる。
- ライセンスは MIT OR Apache-2.0（`LICENSE-MIT` / `LICENSE-APACHE`）のデュアルライセンス。

## Related

- [overview](./overview.md)
- [crate-layout](./crate-layout.md)
