# nosql-surface

| Name | Description | Path |
| --- | --- | --- |
| op: create_table / alter_table / drop_table | NOSQL-13 で `op` 語彙へ加わった DDL 3 op。SQL 表層と同一の実行器へ写像したうえで到達させる。 | [ddl.md](./ddl.md) |
| エラー応答 (本文仕様・wire_code → HTTP ステータス射影表・緊急応答) | NoSQL 表層の HTTP エラー応答。本文仕様と wire_code → HTTP ステータスの射影表を定義する。 | [error-response.md](./error-response.md) |
| explain (NoSQL) | `explain: true` で実行せず QUERY PLAN を返す（search / scan / aggregate）。 | [explain.md](./explain.md) |
| filter 配列 (leaf / not / or / 上限) | search / scan / aggregate 共通の事前フィルタ配列。葉・or・not の語彙と上限を定義する。 | [filter.md](./filter.md) |
| http (HTTP/1.1 NoSQL 表層の実装モジュール) | NoSQL 表層が使う自作 HTTP/1.1 最小サブセットの実装モジュール群（crate `fandhe-db-wire-server` の `src/http/`）。 | [http-module.md](./http-module.md) |
| op: aggregate | 単一行集計と GROUP BY／HAVING 集計を、SQL テキストを組み立てずに束縛・実行する。 | [op-aggregate.md](./op-aggregate.md) |
| op: insert | `rows` をバッチ挿入する op。operation_id による台帳照合で再送を判定する。 | [op-insert.md](./op-insert.md) |
| op: scan (offset / sort) | 順序保証なしの広域取得。sort・offset で決定的な順序・ページングを指定する。 | [op-scan.md](./op-scan.md) |
| op: search | ベクトル検索・ハイブリッド検索・クエリ展開検索（plan）を実行する op。 | [op-search.md](./op-search.md) |
| op: update / delete | update／delete の where（単一行 id 形）と filter（述語形）を束縛・実行する。空の filter は 42601 で拒否。 | [op-update-delete.md](./op-update-delete.md) |
| NoSQL API overview | `POST /v1/session`・`POST /v1/session/close`・`POST /v1/query` の 3 エンドポイントと op 11 値の JSON スキーマの入口。 | [overview.md](./overview.md) |
| 分割実行 DML (show_partitioned_dml / cancel_partitioned_dml) | filter 付き update／delete を mode: partitioned でチャンク単位に commit する分割実行。進捗照会・取り消しを含む。 | [partitioned-dml.md](./partitioned-dml.md) |
| POST /v1/query 共通規則 | 3 パスの要求ターゲット厳密一致・判定順序・op 許可リスト・JSON 構文の受理規則。 | [query-common.md](./query-common.md) |
| 応答スキーマ | search（explain なし）／scan／aggregate 成功時の共通 JSON 応答形。 | [response-schema.md](./response-schema.md) |
| POST /v1/session / /v1/session/close / Authorization: Bearer | NoSQL 表層のセッション認証。トークン発行・Bearer 認証・close。 | [session.md](./session.md) |
| SQL ↔ NoSQL 対応表 | SQL 表層（pg wire）の文と NoSQL 表層の op の対応表。 | [sql-nosql-mapping.md](./sql-nosql-mapping.md) |
