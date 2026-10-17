# samples

| Name | Description | Path |
| --- | --- | --- |
| Connect with extended query protocol | node `pg` / Python `psycopg` / `psql` から拡張クエリプロトコル（Parse / Describe / Bind / Execute）で SQL を実行する。 | [connect-extended-query.md](./connect-extended-query.md) |
| Connect with curl (NoSQL surface) | `--surface nosql` で起動した wire-server へ curl で接続し、セッション発行・検索・セッション終了を行う。 | [connect-http-curl.md](./connect-http-curl.md) |
| Connect with node pg | 無改造の Node.js `pg` から wire-server へ接続し、簡易クエリプロトコルで SQL を 1 文実行する。 | [connect-node-pg.md](./connect-node-pg.md) |
| Connect with psql | 無改造の `psql` から wire-server へ接続し、C1〜C4 の代表クエリを実行する。 | [connect-psql.md](./connect-psql.md) |
| Connect with psycopg | 無改造の Python `psycopg` から wire-server へ接続し、簡易クエリプロトコルで SQL を 1 文実行する。 | [connect-psycopg.md](./connect-psycopg.md) |
| Docker development container | `compose.yaml` の開発コンテナを使い、環境非依存でビルド・検証する。 | [docker-compose.md](./docker-compose.md) |
| Three-client e2e harness (HTTP) | NoSQL 表層へ無改造の HTTP クライアントで実接続し、session → search → close を検証する統合テストを実行する。 | [e2e-three-client-http.md](./e2e-three-client-http.md) |
| Three-client e2e harness (TLS) | TLS 1.3 越しの実 `psql` / `psycopg` / node `pg` 接続を検証する統合テストを実行し、TLS 有効で wire-server を起動する。 | [e2e-three-client-tls.md](./e2e-three-client-tls.md) |
| Three-client e2e harness | `psql` / Python `psycopg` / Node.js `pg` の 3 クライアントを子プロセスとして駆動し、wire-server への実接続を検証する。 | [e2e-three-client.md](./e2e-three-client.md) |
| Start wire-server | `fandhe-db-wire-server` バイナリを起動し、PostgreSQL wire protocol v3 互換で接続を受け付ける。 | [start-wire-server.md](./start-wire-server.md) |
| Transaction status | 無改造の psycopg / node pg で、明示トランザクションの `ReadyForQuery` 状態（`I` / `T` / `E`）の遷移を観測する。 | [txn-status.md](./txn-status.md) |
