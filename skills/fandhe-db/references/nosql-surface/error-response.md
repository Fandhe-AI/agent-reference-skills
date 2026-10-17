---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# エラー応答 (本文仕様・wire_code → HTTP ステータス射影表・緊急応答)

NoSQL 表層の HTTP エラー応答。`wire_code` は SQL 表層と共有し（ERR-4・ERR-5）、`crates/wire-server/src/http/status.rs`（`wire_code` → HTTP ステータスの射影）・`error_body.rs`（JSON 本文エンコーダ）・`response.rs`（ステータス行・ヘッダ）を単一情報源とする実装既定値。表とコードの一致は `tests/nosql_api_doc.rs` が機械検証する。

## Signature / Usage

通常応答の本文形（`http::error_body::encode`）。実際にはトップレベルが `{"error": { ... }}` で包まれる。golden 例（`ErrorClass::InternalError`・`message="internal error"`。バイト単位で一致することをテストが固定する）:

```json
{"error":{"wire_code":"XX000","code":"INTERNAL_ERROR","message":"internal error"}}
```

緊急応答（`encode_may_be_committed`）:

```json
{"error":{"wire_code":"XX000","code":"INTERNAL_ERROR","message":"internal error","data":{"state":"may_be_committed"}}}
```

ステータス行・ヘッダ:

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: <本文バイト長>
Connection: close
Date: <IMF-fixdate>
```

**本文仕様**

- キー順は `wire_code` → `code` → `message` →（緊急応答時のみ）`data` に固定。空白を含まないコンパクト形・改行を含まない 1 行（0x20 未満のバイトを一切含まない）。
- `code` は `ErrorClass::label()`（`SCREAMING_SNAKE_CASE`。人間可読な補助ラベルであり、契約として確定しているのは `wire_code` のみ）。
- エスケープ規則: `"`・`\`・U+0000〜U+001F のみをエスケープする。`\b`／`\t`／`\n`／`\f`／`\r` はよく使う短縮形、それ以外の一般制御文字は小文字 `\u00xx`。非 ASCII（日本語・補助面文字を含む）・U+007F はエスケープせず UTF-8 のまま透過する。
- `message` の契約: 固定の英語文言、または内部エラー時に固定文言へ差し替えられた `WireError` 由来の値のみ（長さ上限あり）。他テナントのデータ・存在情報・内部詳細を含まない（存在オラクルを提供しない）。利用者は `message` の具体的な文言そのものを契約として依存しないこと。
- 通常応答は `data` キーを**決して**含まない。緊急応答専用の `encode_may_be_committed` と本文組み立てが構造的に分離されている。例外は分割実行 DML の `VD001`・`VD002`（専用の `encode_partitioned`）で、`data` は `{"committed": <n>, "operation_id": "<id>"}` の 2 キーだけを持つ（自テナントで commit 済みの件数と、クライアントが指定した `operation_id`。他テナントの情報・テーブル名・内側のメッセージは載せない）。

**ステータス行・ヘッダ規則**

- `Content-Type` は常に `application/json; charset=utf-8`。`Content-Length` は本文の実バイト長。`Connection: close` を常に付ける（1 応答ごとに接続を閉じる）。
- `Date` は RFC 9110 IMF-fixdate。システムクロックが `UNIX_EPOCH` より前の異常値を指す場合でも応答送出自体は止めず、`UNIX_EPOCH` 相当へ fail-closed に縮退する（可用性を優先し `Date` の正確性を犠牲にする設計判断）。
- `401`（`AuthRequired`／`AuthInvalid`）応答のみ `WWW-Authenticate: Bearer` を追加する（RFC 9110 §11.6.1）。他のステータスでは付与しない。
- 射影表の値域（`{400, 401, 403, 404, 409, 413, 500, 501, 503}`）外のステータスが渡された場合、理由句を捏造せず `500`＋`XX000` 固定本文へ fail-closed に縮退する。`ErrorClass` の値域は `#[deny(clippy::wildcard_enum_match_arm)]` で網羅性が強制されるため、現状はこの縮退経路自体が到達不能な防波堤。

**wire_code → HTTP ステータス射影表**

「1 つの `wire_code` → 常に 1 つの HTTP ステータス」の方向にのみ 1:1 の射影であり、逆方向は 1:1 ではない（例えば `400` は 27 分類が共有する）。

| `wire_code` | `code` | HTTP ステータス | 理由句 | NoSQL 表層での主な発生源 |
| --- | --- | --- | --- | --- |
| `08P01` | `PROTOCOL_VIOLATION` | 400 | Bad Request | 要求行・ヘッダ形状違反、未知ターゲットへのアクセス |
| `21000` | `CARDINALITY_VIOLATION` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（スカラーサブクエリは SQL 表層専用） |
| `22000` | `INVALID_INPUT` | 400 | Bad Request | `op` 別スキーマ検証での値の型・形状不正 |
| `22003` | `NUMERIC_OUT_OF_RANGE` | 400 | Bad Request | 集計（`aggregate`）でのオーバーフロー、`CHECK` 制約式の数値あふれ、`BIGINT` が `f64` で正確に表せない値（絶対値が 2^53 超）の拒否 |
| `22007` | `INVALID_DATETIME_FORMAT` | 400 | Bad Request | `DATE`／`TIMESTAMP` リテラルの書式違反（`insert`／`update`／`filter`。Issue #1187） |
| `22008` | `DATETIME_FIELD_OVERFLOW` | 400 | Bad Request | `DATE`／`TIMESTAMP` リテラルの範囲外・暦上不正（`update` の `set` 経由） |
| `22012` | `DIVISION_BY_ZERO` | 400 | Bad Request | `insert`／`update` が書き込む行の `CHECK` 制約（TABLE-16・TASK-204）の式評価での 0 除算 |
| `22023` | `OPERATION_ID_CONTENT_MISMATCH` | 400 | Bad Request | `insert` の `operation_id` 再送時の内容不一致 |
| `22P02` | `INVALID_TEXT_REPRESENTATION` | 400 | Bad Request | 値の形式不正: ENUM 列の語彙外ラベル・INTEGER／BIGINT 列への小数／指数表記・BYTEA の不正 base64・NUMERIC／配列／JSON 列の形式不正（`insert`／`update`／`filter`。Issue #1187） |
| `23502` | `MISSING_OPERATION_ID` | 400 | Bad Request | `insert` の `operation_id` 欠落 |
| `23502` | `NOT_NULL_VIOLATION` | 400 | Bad Request | `NOT NULL` 列（TABLE-16・TASK-204）への `insert`／`update` での省略・明示 `null` |
| `25000` | `INVALID_TRANSACTION_STATE` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（明示トランザクション制御が op 語彙に無い） |
| `25001` | `ACTIVE_SQL_TRANSACTION` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（同上） |
| `25P01` | `NO_ACTIVE_SQL_TRANSACTION` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（同上） |
| `25P02` | `IN_FAILED_SQL_TRANSACTION` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（同上） |
| `2BP01` | `DEPENDENT_OBJECTS_STILL_EXIST` | 400 | Bad Request | NoSQL `drop_table` 経由の到達性は未確認（原文は `DROP TABLE`／`DROP VIEW` を SQL 表層専用と記述するが DDL op 追加前の記述） |
| `42601` | `UNSUPPORTED_SQL_SYNTAX` | 400 | Bad Request | JSON 構文エラー、`op` 別スキーマ違反、`tenant_id` 相当値の自己申告 |
| `42701` | `DUPLICATE_COLUMN` | 400 | Bad Request | `alter_table` の `add_column` での重複列（CREATE VIEW／CREATE INDEX は引き続き op 許可リスト外） |
| `42702` | `AMBIGUOUS_COLUMN` | 400 | Bad Request | `aggregate.sort` が複数一致する出力名を参照したとき到達可能（Issue #1270）。`INNER JOIN`〔SQL-28・RLS-10、Issue #925〕は NoSQL 表層の op 語彙に無い |
| `42703` | `UNDEFINED_COLUMN` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（`CREATE INDEX` は op 許可リスト外） |
| `42704` | `UNDEFINED_OBJECT` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（`DROP INDEX` は op 許可リスト外） |
| `42710` | `DUPLICATE_OBJECT` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（`ALTER TABLE ... ADD CONSTRAINT` は SQL 表層専用） |
| `42723` | `DUPLICATE_FUNCTION` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（`CREATE FUNCTION` は SQL 表層専用） |
| `42804` | `DATATYPE_MISMATCH` | 400 | Bad Request | NoSQL 表層の実要求からは到達不能（`CASE`／`COALESCE`／`NULLIF`・集合演算・`INNER JOIN` の結合キー型不一致〔SQL-28・RLS-10、Issue #925〕・式層の演算子／関数引数の型不一致〔Issue #1186〕のいずれも SQL 表層専用） |
| `42809` | `WRONG_OBJECT_TYPE` | 400 | Bad Request | NoSQL `drop_table` 経由の到達性は未確認（原文は `DROP TABLE`／`DROP VIEW`・ビューへの書き込みを SQL 表層専用と記述するが DDL op 追加前の記述） |
| `42830` | `INVALID_FOREIGN_KEY` | 400 | Bad Request | `create_table.constraints[kind=foreign_key].references.on_delete`／`on_update`（Issue #1148）が宣言時に常に失敗する組み合わせ（`NOT NULL` 列への `set_null`・DEFAULT の無い `NOT NULL` 列への `set_default` 等） |
| `42883` | `UNDEFINED_FUNCTION` | 400 | Bad Request | `aggregate` の `sum`／`avg` を `DATE`／`TIMESTAMP` 列に指定した場合（SQL-26、Issue #1186）、または `sum`／`avg`（TEXT 以外は `min`／`max` も）を非数値型（TEXT・BOOLEAN・BYTEA・JSON・ARRAY・UUID・ENUM・VECTOR）の列に指定した場合（Issue #1349。未知関数・非決定的関数の呼び出しは SQL 表層専用で到達しない） |
| `42P16` | `INVALID_TABLE_DEFINITION` | 400 | Bad Request | `create_table.constraints` に `primary_key` を 2 個以上指定した場合（名前付きを含む。TABLE-22 (d)、Issue #1412・#1437。`ALTER TABLE ... ADD PRIMARY KEY` の重複宣言は SQL 表層専用） |
| `28000` | `AUTH_REQUIRED` | 401 | Unauthorized | `Authorization` ヘッダ欠落・スキーム不一致・トークン不正・未知・期限切れ・close 済み（`/v1/query` 共通。`/v1/session/close` の二重 close・未知トークンも含む） |
| `28P01` | `AUTH_INVALID` | 401 | Unauthorized | `POST /v1/session` の資格情報照合失敗・未知ユーザー |
| `42501` | `FORBIDDEN_TENANT_MISMATCH` | 403 | Forbidden | `--ddl-allowed-users` に含まれないセッションの `create_table`／`alter_table`／`drop_table`（対象テーブルの有無にかかわらず。[ddl.md](./ddl.md) 参照） |
| `34000` | `INVALID_CURSOR_NAME` | 404 | Not Found | NoSQL 表層の実要求からは到達不能（カーソル〔`DECLARE`／`FETCH`／`CLOSE`〕は SQL 表層専用で op 許可リストに無い） |
| `42P01` | `TABLE_NOT_FOUND` | 404 | Not Found | 未定義テーブルへの `search`／`scan`／`aggregate`／`insert` |
| `P0002` | `ROW_NOT_FOUND` | 404 | Not Found | NoSQL 表層の実要求からは到達不能（対応する op が許可リストに無い） |
| `23503` | `FOREIGN_KEY_VIOLATION` | 409 | Conflict | `FOREIGN KEY`（TABLE-17・TASK-205）を宣言したテーブルへの `insert`／`update` で参照先の値が同一テナント内に無い、または参照先の `update`／`delete` で参照元の行が残る |
| `23505` | `UNIQUE_VIOLATION` | 409 | Conflict | 行 `id` の重複、`PRIMARY KEY`／UNIQUE 制約のテナント内一意性違反（`insert`／`update`）。行制約由来のため commit 済みの根拠にならない |
| `23505` | `DUPLICATE_OPERATION_ID` | 409 | Conflict | 台帳照合で内容一致と判定された `operation_id` の再送（`insert`／`update`／`delete`。`wire_code` は `UNIQUE_VIOLATION` と共有し `code` で区別。commit 済み確定の根拠。Issue #1180） |
| `23514` | `CHECK_VIOLATION` | 409 | Conflict | `insert`／`update` が書き込む行が `CHECK` 制約（TABLE-16・TASK-204）を満たさない |
| `42P07` | `DUPLICATE_TABLE` | 409 | Conflict | `create_table` のテーブル名衝突（CREATE VIEW／CREATE INDEX は引き続き op 許可リスト外） |
| `VD001` | `PARTIAL_COMPLETION` | 409 | Conflict | 分割実行 DML（`update`／`delete` の `mode: "partitioned"`。SQL 表層は `... PARTITIONED`）が 1 チャンク以上 commit した後に止まった（Issue #1130。本文に `data` が付く） |
| `VD002` | `PARTITIONED_DML_CANCELLED` | 409 | Conflict | `cancel_partitioned_dml`（SQL 表層は `CANCEL PARTITIONED DML`）で取り消された分割実行 DML、または取り消し済みジョブへの再送（Issue #1130。本文に `data` が付く） |
| `54000` | `PAYLOAD_TOO_LARGE` | 413 | Content Too Large | 要求本文サイズ超過、`filter` 件数超過、INDEX-4 バッチ上限超過、`FOREIGN KEY` 参照アクション連鎖（`ON DELETE CASCADE` 等。Issue #1148）の深さ・行数上限超過（副作用ゼロ） |
| `XX000` | `INTERNAL_ERROR` | 500 | Internal Server Error | 内部エラー（詳細は非開示。`message` は固定文言へ差し替え） |
| `0A000` | `FEATURE_NOT_SUPPORTED` | 501 | Not Implemented | 語彙外の `op` 指定 |
| `53300` | `CONNECTION_LIMIT_EXCEEDED` | 503 | Service Unavailable | 接続数上限（64）超過、同時有効セッション数上限（256）超過 |
| `55P03` | `LOCK_NOT_AVAILABLE` | 503 | Service Unavailable | SQL 表層の明示トランザクション（SQL-31・TASK-221）が単一ライタを保持している間に、書き込み op（`insert`／`update`／`delete`）が書き込みゲートの待機上限を超えた |

**緊急応答の data**

`data.state == "may_be_committed"` は緊急応答（ERR-5・`RECOVER-5` (3) ポインタ。commit 成功境界を跨いだ panic 時に「commit は成功しているかもしれない」ことを伝える契約）にのみ付き、通常応答の直後の 3 キーに加えて `"data":{"state":"may_be_committed"}` を追加する（分割実行の `VD001`／`VD002` が付ける `{committed, operation_id}` の `data` は別扱い。上記「本文仕様」参照）。SQL 表層側（`ErrorResponse` の `D` フィールド `state=may_be_committed`）と状態語を共有しており、両表層で乖離しないことをテストで固定している。

現状の到達性: `http::response::encode_error_may_be_committed` を呼び出す production 経路は原文時点で `http/` 配下にまだ存在せず、commit 成功境界を跨いだ panic は RECOVER-8 の panic hook が既にプロセス abort へ倒すため、NoSQL 表層の実要求からは `may_be_committed` の緊急応答は現時点で観測できない。エンコーダの契約としては予約済み。

利用者向け指針（接続され次第有効になる契約。現時点では観測不能）: `data.state == "may_be_committed"` を受け取った場合、同一 `operation_id` で `insert` を再送し、台帳照合の結果で確定させる。`code == "DUPLICATE_OPERATION_ID"`（wire_code `23505`）なら commit 済み、`code == "OPERATION_ID_CONTENT_MISMATCH"`（`22023`）なら同一 operation_id が別内容で使用済み。同じ `23505` でも `code == "UNIQUE_VIOLATION"` は行制約違反で、commit 済みの根拠にならない。これは `insert` の既存の再送契約をそのまま使うもので、`data` 付き応答専用の新たな再送契約を追加するものではない。

## Notes

- 本ページは NoSQL 表層（HTTP）の応答。SQL 表層（pg wire）の `ErrorResponse` バイト列整形は wire-server の error-response ページ（`../wire-server/error-response.md`）で、`ErrorClass` 自体は getting-started の error-format ページで扱う。
- 原文が到達不能とする分類のうち、本ページが到達不能と扱うのは 12 分類（`21000`・`34000`・`P0002`・`42703`・`42704`・`42804`・`42710`・`42723`・`25000`・`25001`・`25P01`・`25P02`。原文の `2BP01`／`42809` は上記のとおり未確認）。理由（原文要約）: テナントはセッション（`SessionPrincipal::policy_context()`）からのみ導出し、クライアント自己申告の `tenant_id` 相当値は JSON／ヘッダ／パスいずれの位置でも `42601` で先に拒否する（DDL 権限なしによる `42501` は別経路で到達可能）。`P0002` に対応する op、カーソル操作（`34000`）、明示トランザクション制御（`25xxx`）、ビュー／インデックス DDL・`CREATE FUNCTION`・`ALTER TABLE ... ADD CONSTRAINT`・`CASE`／`COALESCE`／`NULLIF`・集合演算・スカラーサブクエリ・`CREATE TYPE` は NoSQL `op` 許可リストに無い。参照先が他テナントにだけ存在する場合と、どのテナントにも存在しない場合の応答は区別できない（RLS-9・RLS-10）。
- 原文の射影表は `42501`／`42701`／`42P07`（および `2BP01`／`42809`）を到達不能と記述するが DDL 追加前の記述（同原文の DDL 節は権限なしセッションを常に `42501`・403 とする）。`ddl.md` と 0.2.0 ソース（`http/query/ddl.rs` の `run_ddl` → engine `sql/allowlist.rs` の `ForbiddenTenantMismatch`）に従った。`2BP01`／`42809` は一次ソースで確認できていないため「未確認」とした。
- 認証系: 原文の射影表は `28P01` を Bearer 失敗としているが、同原文のセッション節と 0.2.0 ソース（`http/session/bearer.rs`・`middleware.rs`・`close.rs` → `AuthRequired`／`28000`、`issue.rs` → `AuthInvalid`／`28P01`）に従った。
- 到達可能へ移った分類（原文の記載に加え、上記 DDL 経由の `42501`／`42701`／`42P07`）: `42702`（`aggregate.sort` 曖昧参照。Issue #1270）・`42P16`（`primary_key` 重複宣言。Issue #1412）・`VD001`／`VD002`（分割実行 DML。Issue #1130）・`42830`／`23503`／`54000`（`FOREIGN KEY` 参照アクション。Issue #1148）。
- テナント境界の検査を緩める・バイパスする production 経路をこれらの分類のために新設することはせず（`.claude/rules/security.md` P0）、射影表としての一致のみを production の応答エンコーダ経由で固定する。
- 各 op スキーマ節では引き続き `wire_code` のみを示す。HTTP ステータスを引く際は本表を参照する。

## Related

- [overview.md](./overview.md)
- [partitioned-dml.md](./partitioned-dml.md)
- [http-module.md](./http-module.md)
- [../getting-started/error-format.md](../getting-started/error-format.md)
- [../wire-server/error-response.md](../wire-server/error-response.md)
