---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/README.md
---

# run-wire-server

`fandhe-db-wire-server`（PostgreSQL wire protocol v3 互換サーバー）を起動するコマンド（TASK-73）。

## Usage

```bash
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
```

- `--users`・`--db` はいずれも必須。省略した場合は匿名ログイン・匿名 DB を暗黙生成せず fail-closed で起動を拒否する
- `--bind` 省略時のデフォルトは `127.0.0.1:5432`
- `--surface` 未指定（または `sql`）は従来どおり PostgreSQL wire。`nosql` は HTTP/1.1 最小サブセットのリスナーを 1 本だけ bind する。`sql` / `nosql` 以外の値・値欠落・重複指定は起動エラー
- `--search-engine` は opt-in の ANN 選択フラグ。未知の値を渡すと起動エラーになる
- `--auth-method` は `cleartext`（従来どおり）または `scram-sha-256`。不正な値・値欠落・重複指定は起動エラーで、認証方式はサーバー全体で 1 つに固定される
- `--tls-cert` / `--tls-key`（Ed25519 PKCS#8 PEM）で TLS 1.3 を opt-in できる。未指定時は平文・loopback 限定のまま。`--tls-mode` の既定は `require`

## SCRAM-SHA-256 用の検証子生成

```bash
wire-server hash-password --with-scram-sha-256
```

stdin からパスワードを 1 行読み、`<PHC 文字列>:<SCRAM 検証子文字列>` を標準出力へ出す。`--with-scram-sha-256` を省略すると従来どおり PHC 文字列のみを出力する。

## Notes

- `--auth-method scram-sha-256` の制約: 全ユーザーが SCRAM 検証子を持つ必要がある（欠けると起動拒否）、パスワードは印字可能 ASCII（0x20〜0x7e）限定（範囲外は `hash-password --with-scram-sha-256` の時点で拒否）、`--surface nosql` とは併用不可
- 起動したサーバーには psql・psycopg・node pg から無改造で接続できる。具体的な接続例は samples/ を参照
- TLS: `sslmode=require` は通信路の暗号化のみでサーバー証明書検証を行わない。README は非ループバック運用で信頼する CA 証明書を `sslrootcert` に設定した `sslmode=verify-full` を使用するよう記載している
- 公開名は `fandhe-db-wire-server`。ライブラリ名 `engine` / `wire_server`・ビルド成果物 `target/release/wire-server` は据え置きで、`cargo` の `-p` / `--package` に渡す名前だけが公開名になる（README「crates.io への公開」節）
- 旧名 `fandhe-vector-db-wire-server`（0.1.0）では `-p fandhe-vector-db-wire-server` と指定していた。0.2.0 以降は新名のみ
- `compose.yaml` の `dev` サービスは shell/CI 用の開発コンテナであり、wire-server 用のポート公開や起動コマンドは定義されていない。Docker 経由でサーバーを起動する README 記載の手順は無い
- バッチ上限の環境変数（`FANDHE_DB_BATCH_MAX_*`）は本ファイルでは扱わない

## Related

- [install.md](./install.md)
- [connect-psql.md](../samples/connect-psql.md)
- [connect-psycopg.md](../samples/connect-psycopg.md)
- [connect-node-pg.md](../samples/connect-node-pg.md)
