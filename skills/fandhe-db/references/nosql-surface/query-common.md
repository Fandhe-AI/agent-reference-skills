---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# POST /v1/query 共通規則

3 パスの要求ターゲット厳密一致・判定順序・`op` 許可リスト・JSON 構文の受理規則。

## Signature / Usage

```sh
curl -s -X POST http://127.0.0.1:5432/v1/query \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"op":"search","table":"docs","vector":[0.1,0.2,0.3,0.4],"limit":10}'
```

3 パスとも要求ターゲットのバイト厳密一致でのみ受理する（クエリ文字列付き・末尾スラッシュ・大文字小文字違いはすべて `08P01`）。

判定順序（fail-closed。この順が契約）:

1. パス上の `tenant_id` 相当マーカー（`/v1/query?tenant_id=...`・`/v1/query/tenant-id/...` 等）の拒否（`42601`。認証より前）
2. `Authorization: Bearer` 認証（`28000`）
3. ヘッダの `tenant_id` 相当拒否（`42601`）
4. 本文の UTF-8／JSON 構文／`op` フィールドの形（`42601`）
5. `op` 許可リスト判定（11 値の厳密一致。語彙外は `0A000`。許可リスト外の DDL（`CREATE INDEX`／`DROP INDEX`／`CREATE VIEW`／`DROP VIEW` 等。`create_table`／`alter_table`／`drop_table` は 11 値に含まれ受理される）・UDF 呼び出し・トランザクション制御を含む）
6. op 別スキーマ検証（必須キー欠落・未知キー・型不一致・`null` は `42601`）
7. op 別の意味検証・実行（`search` は `explain: true` を通常実行より先に判定）

## Notes

- `op` は完全一致のみで判定する（大文字小文字の読み替え・前後空白のトリムはしない）。`"SEARCH"`・`" search"`・`"select"`・`"explain"`・`"begin"` 等はいずれも `0A000`。
- JSON 本文の構文受理規則は `engine::json`（NOSQL-8）に従う: ネスト深さ 16 まで・文字列 1 個あたり 1 MiB まで・配列/オブジェクトの要素数 65,536 まで、オブジェクトの重複キーは拒否（後勝ちで無警告に上書きしない）、数値リテラルは RFC 8259 準拠（先頭ゼロ・小数部/指数部の数字欠落は拒否）。いずれの違反も `42601`。
- `op` 別の各スキーマは [op-search.md](./op-search.md)・[op-scan.md](./op-scan.md)・[op-aggregate.md](./op-aggregate.md)・[op-insert.md](./op-insert.md)・[op-update-delete.md](./op-update-delete.md)・[partitioned-dml.md](./partitioned-dml.md)・[ddl.md](./ddl.md) を参照。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql1_endpoint_routing.rs`・`nosql9_op_allowlist.rs`・`nosql1_op_vocabulary.rs`・`nosql8_schema_validation.rs`。

## Related

- [overview.md](./overview.md)
- [session.md](./session.md)
- [filter.md](./filter.md)
- [error-response.md](./error-response.md)
