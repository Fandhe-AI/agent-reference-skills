---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/README.md
---

# Start wire-server

`fandhe-vector-db-wire-server` バイナリを起動し、PostgreSQL wire protocol v3 互換で接続を受け付ける。

## Usage

```bash
cargo run -p fandhe-vector-db-wire-server -- --users <ユーザーストアのパス> --db <redb ファイルのパス> \
  [--bind 127.0.0.1:5432] [--search-engine default|hnsw|hnsw_f16|hnsw_i8] \
  [--hnsw-full-scan-ratio <num>/<den>] \
  [--hnsw-acorn-max-visible-ratio <num>/<den>] \
  [--hnsw-sparse-visited-max <N>]
```

## Notes

- `--users`・`--db` はいずれも必須（省略時は匿名ログイン・匿名 DB を暗黙生成せず fail-closed で起動を拒否する）
- `--bind` 省略時は `127.0.0.1:5432`。psql・psycopg・node pg から無改造で cleartext password 認証つき接続できる
- `--search-engine` 未指定または `default` は brute-force のまま不変。`hnsw` / `hnsw_f16` / `hnsw_i8` は ANN（HNSW）を opt-in で有効化する。不正な値・値欠落・重複指定は fail-closed で起動エラー
- `--hnsw-*` 系フラグは `--search-engine` が `hnsw` / `hnsw_f16` / `hnsw_i8` のときのみ指定できる
- 本サンプルは `fandhe-vector-db-wire-server` の起動手順。`upstash`（@upstash/vector の SaaS クライアント）・`supabase`（pgvector 拡張）とは別物

## Related

- [main-cli.md](../references/wire-server/main-cli.md)
