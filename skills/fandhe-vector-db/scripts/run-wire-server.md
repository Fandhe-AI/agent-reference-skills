---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/README.md
---

# run-wire-server

`fandhe-vector-db-wire-server`（PostgreSQL wire protocol v3 互換サーバー）を起動するコマンド（TASK-73）。

## Usage

```bash
cargo run -p fandhe-vector-db-wire-server -- --users <ユーザーストアのパス> --db <redb ファイルのパス> \
  [--bind 127.0.0.1:5432] [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>]
```

- `--users`・`--db` はいずれも必須。省略した場合は匿名ログイン・匿名 DB を暗黙生成せず fail-closed で起動を拒否する
- `--bind` 省略時のデフォルトは `127.0.0.1:5432`
- `--search-engine` は opt-in の ANN 選択フラグ。未知の値を渡すと起動エラーになる

## Notes

- 起動したサーバーには psql・psycopg・node pg から無改造で cleartext password 認証つき接続ができる。ただし README には具体的な接続コマンド例（接続文字列・ユーザー名・DB 名の値）の記載が無いため、本スキルには接続コマンドのページを収録していない
- crates.io 上の公開バイナリ名は `fandhe-vector-db-wire-server` だが、ソース内の `use engine::...` やビルド成果物 `target/release/wire-server` の名前自体は変わらない（README「crates.io への公開」節。`cargo` の `-p`/`--package` に渡す名前だけが公開名になる）
- `compose.yaml` の `dev` サービスは shell/CI 用の開発コンテナ（`bash` 起動、Cargo registry / target のキャッシュ volume）であり、wire-server 用のポート公開や起動コマンドは定義されていない。Docker 経由でサーバーを起動する README 記載の手順は無い

## Related

- [install.md](./install.md)
