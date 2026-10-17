---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/crates/wire-server/tests/three_client_e2e.rs
---

# Connect with psql

無改造の `psql` から wire-server へ接続し、C1〜C4 の代表クエリを実行する。

## Usage

```bash
PGPASSWORD=pw-alice psql -h 127.0.0.1 -p <port> -U alice -d irrelevant-db-name -X -w -At \
  -c "SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3"
```

```sql
-- C1: 純粋 Top-k
SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3;

-- C2: スカラー条件付き
SELECT id, lang FROM docs WHERE lang = 'ja' ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3;

-- C3: RLS（visible() 述語の有無を問わず RLS は常時適用される）
SELECT id FROM docs WHERE visible() ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3;

-- C4: ハイブリッド（RRF）
SELECT id FROM docs ORDER BY hybrid_rrf(embedding, '[1.0,0.0]', body, 'zzz-term-absent-from-any-seed-body') LIMIT 3;
```

```bash
# TLS 越し（--tls-cert / --tls-key 付きで起動した wire-server。tests/wire9_tls.rs と同じ conninfo 形式）
PGPASSWORD=pw-alice psql -d "host=127.0.0.1 port=<port> user=alice dbname=irrelevant-db-name sslmode=require" \
  -X -w -At -c "SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3"
```

```bash
# 認証失敗の確認用。誤りパスワードは wire ハンドシェイク段階で拒否されるため
# SELECT 文は構文検証・allowlist 検証まで到達しない。正常系の確認には使えない
PGPASSWORD=definitely-not-the-password psql -h 127.0.0.1 -p <port> -U alice -d irrelevant-db-name -X -w -At -c "SELECT 1"
```

## Notes

> **警告**: `pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと。`PGPASSWORD=` のインライン指定はシェル履歴・`ps` 出力に露出しうる

- `sslmode=require` は通信路の暗号化のみでサーバー証明書検証を行わないため、中間者を正規サーバーと誤認しうる（README の注意）。非ループバック運用では信頼する CA 証明書を `sslrootcert` に設定した `sslmode=verify-full` を使う
- `--tls-mode require`（既定）のサーバーへ `sslmode=disable` で接続すると、平文 StartupMessage が `08P01` で拒否される
- `SELECT 1`（`FROM` 句なし）は allowlist が要求する形（`SELECT ... FROM <table> ...`）を満たさず、正しいパスワードで実行すると構文エラーになる。実行内容の確認には C1〜C4 のいずれかを使う
- `-X`（`~/.psqlrc` 無視）・`-w`（パスワードプロンプト無効・`PGPASSWORD` 必須）・`-At`（区切り文字なし tuples-only）を付ける。誤りパスワードは非 0 終了・`28P01` またはパスワード関連の文言で失敗する
- `dbname` は接続時に必須だが wire-server 側では無視される（`irrelevant-db-name` のようなダミー値で通る）
- 接続ユーザー名・パスワードは `--users` で指定したユーザーストア（`username:tenant_id:phc` 形式、Argon2id）に登録済みである必要がある。`--auth-method scram-sha-256` では SCRAM 検証子も必要
- 標準の PostgreSQL クライアントで接続できるが、SQL 面は fandhe-db の対応範囲に限定される。`mssql` / `drizzle` / `supabase` の SQL 方言・ORM とは別物

## Related

- [start-wire-server.md](./start-wire-server.md)
- [e2e-three-client.md](./e2e-three-client.md)
- [e2e-three-client-tls.md](./e2e-three-client-tls.md)
