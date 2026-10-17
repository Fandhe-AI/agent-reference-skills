---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/Makefile
---

# Three-client e2e harness (TLS)

TLS 1.3 越しの実 `psql` / `psycopg` / node `pg` 接続を検証する統合テストを実行し、TLS 有効で wire-server を起動する。

## Usage

```bash
make e2e-three-client-tls
```

```bash
# make e2e-three-client-tls の実体（Makefile より）
cargo test -p fandhe-db-wire-server --test wire9_tls -- --ignored --nocapture --test-threads=1
```

```bash
# TLS 有効で起動（--tls-mode 省略時は require）
cargo run -p fandhe-db-wire-server -- --users <ユーザーストア> --db <redb ファイル> \
  --tls-cert <サーバー証明書チェーン PEM> --tls-key <Ed25519 PKCS#8 秘密鍵 PEM> [--tls-mode require|allow]
```

```text
# 3 クライアントの TLS 指定（tests/wire9_tls.rs）
psql    : conninfo に sslmode=require
psycopg : WIRE_SSLMODE=require     （psycopg_client.py が sslmode として渡す）
node pg : WIRE_SSL=no-verify       （pg_client.js が ssl: { rejectUnauthorized: false } を渡す）
```

## Notes

- `#[ignore]` テストのため `make ci` には含まれない。要 `psql`・`python3`+`psycopg`・`node`+`pg`。`PSQL_BIN` / `PYTHON_BIN` / `NODE_BIN` で上書き可
- 証明書・鍵は RFC 8032 TEST 1 の公開テストベクタから実行時に生成し、リポジトリへは置かない（Makefile コメント）
- 秘密鍵は Ed25519 PKCS#8 のみ受理。`--tls-cert` / `--tls-key` は両方揃って初めて有効で、片方のみは起動エラー。`--tls-mode` 単独指定も fail-closed
- `--tls-mode require`（既定）では平文 StartupMessage が `08P01` で拒否され、非ループバック bind も許可される。`allow` は loopback 限定
- `--tls-scram-channel-binding enable` は SQL 表層で葉証明書の署名ハッシュが RFC 5929 に無い場合（Ed25519 自己署名など）は起動時に拒否される（Issue #1088）。詳細は README と upstream の `docs/design/tls-channel-binding.md`
- `sslmode=require` は暗号化のみで証明書検証をしない。非ループバック運用では `sslrootcert` 付きの `sslmode=verify-full` を使う（README の注意）

## Related

- [start-wire-server.md](./start-wire-server.md)
- [connect-psql.md](./connect-psql.md)
- [e2e-three-client.md](./e2e-three-client.md)
