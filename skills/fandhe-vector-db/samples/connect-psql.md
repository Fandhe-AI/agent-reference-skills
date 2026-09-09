---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/crates/wire-server/tests/three_client_e2e.rs
---

# Connect with psql

無改造の `psql` から wire-server へ接続し、C1〜C4 の代表クエリを実行する。

## Usage

```bash
PGPASSWORD=pw-alice psql -h 127.0.0.1 -p <port> -U alice -d irrelevant-db-name -X -w -At -c "SELECT 1"
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

## Notes

> **警告**: wire-server は 0.1.0 時点で cleartext password 認証のみ・TLS 未実装（`references/wire-server/auth.md` 参照）。`pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと。また `PGPASSWORD=` のインライン指定はシェル履歴・`ps` 出力に露出しうる

- `-X`（`~/.psqlrc` 無視）・`-w`（パスワードプロンプト無効・`PGPASSWORD` 必須）・`-At`（区切り文字なし tuples-only）を付ける。誤りパスワードは非 0 終了・`28P01` またはパスワード関連の文言で失敗する
- `dbname` は接続時に必須だが wire-server 側では無視される（`irrelevant-db-name` のようなダミー値で通る）
- 接続ユーザー名・パスワードは `--users` で指定したユーザーストア（`username:tenant_id:phc` 形式、Argon2id）に登録済みである必要がある
- 標準の PostgreSQL クライアントで接続できるが、SQL 面は MVP サブセット（C1〜C4 相当）に限定される。`mssql` / `drizzle` / `supabase` の SQL 方言・ORM とは別物

## Related

- [start-wire-server.md](./start-wire-server.md)
- [e2e-three-client.md](./e2e-three-client.md)
