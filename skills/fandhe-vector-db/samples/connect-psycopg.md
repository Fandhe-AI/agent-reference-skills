---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/crates/wire-server/tests/three_client/psycopg_client.py
---

# Connect with psycopg

無改造の Python `psycopg` から wire-server へ接続し、簡易クエリプロトコルで SQL を 1 文実行する。

## Usage

```python
import psycopg

with psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="alice",
    password="pw-alice",
    dbname="irrelevant-db-name",
    autocommit=True,
    connect_timeout=5,
) as conn:
    with psycopg.ClientCursor(conn) as cur:
        cur.execute("SELECT id FROM docs ORDER BY embedding <=> '[1.0,0.0]' LIMIT 3")
        if cur.description is not None:
            for row in cur.fetchall():
                print("|".join(str(value) for value in row))
```

## Notes

> **警告**: wire-server は 0.1.0 時点で cleartext password 認証のみ・TLS 未実装（`references/wire-server/auth.md` 参照）。`pw-alice` は upstream 公開リポジトリのテストフィクスチャであり、本番相当の認証情報を使わないこと

- `autocommit=True` が必須。非 autocommit だと `BEGIN` が簡易クエリとして先行送信され、許可リスト外構文として engine に拒否される
- `psycopg.ClientCursor` を明示的に使う。既定の `Cursor` はサーバーサイドパラメータバインドを伴う拡張クエリプロトコル（Parse/Bind/Execute）で送信するため、拡張クエリ未対応の本サーバーには使えない。`ClientCursor` は SQL をクライアント側で文字列合成してから簡易クエリプロトコル（`Q` メッセージ）で送る
- `INSERT` 等 `CommandComplete` のみを返す文（結果セットを持たない）は `cur.description` が `None` になるため、`fetchall()` を呼ぶ前に確認する
- 標準の psycopg クライアントで接続できるが、SQL 面は MVP サブセット（C1〜C4 相当）に限定される。`supabase`（pgvector 拡張）とは別物

## Related

- `samples/start-wire-server.md`
- `samples/connect-psql.md`
