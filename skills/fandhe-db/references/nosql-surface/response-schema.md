---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# 応答スキーマ

`search`（`explain` なし）／`scan`／`aggregate` 成功時の共通 JSON 応答形。

## Signature / Usage

```json
{"columns": [{"name": "id", "type": "numeric"}, {"name": "lang", "type": "text"}],
 "rows": [[1, "ja"], [2, "en"]],
 "row_count": 2}
```

## Notes

- キー順固定（`columns` → `rows` → `row_count`）・空白なし。
- `row_count` は常に `rows` の長さ。
- `columns[].type` は列型ごとの名前を返す（Issue #896・NOSQL-17）。SQL 表層 `RowDescription`（Issue #895）の OID 写像とは**独立**の対応表で、SQL wire 側は後方互換のため多くの新型を `text`（OID 25）へ丸めるが、NoSQL の JSON API は型情報をそのまま伝える。疑似列 `id`／式項目は `"numeric"`／`"text"`（wire 側と一致）、それ以外は `"text"`／`"vector"`／`"integer"`／`"bigint"`／`"real"`／`"double precision"`／`"boolean"`／`"date"`／`"timestamp"`／`"numeric"`／`"uuid"`／`"bytea"`／`"json"`／`"jsonb"`／`"enum"`／`"text[]"`／`"boolean[]"`（列型に対応）。値そのものは常に native JSON（配列・数値・真偽値・文字列）で返し、値表現を型名に合わせて文字列化してはいない。
- `BIGINT` の値（`Cell::SignedInteger`）は `±(2^53-1)` を超える場合のみ JSON 文字列で送出する（Issue #896。JS 系クライアントの `JSON.parse` による精度誤解を防ぐ。`id`／`COUNT` の値表現は不変のまま TASK-185 の担当）。
- `Cell::Vector` は `[1,2.5]` のような JSON 数値配列として返る。
- 非有限（`NaN`／`±Infinity`）な浮動小数は `null` に丸めず内部エラーとして fail-closed に拒否する（通常は engine 側の評価時点で `22000` になり到達しない）。
- `insert`・`explain: true` の応答形は専用形（`{"inserted",...}`／`{"explain":[...]}`）。[op-insert.md](./op-insert.md)・[explain.md](./explain.md) 参照。
- 検証コード（原文記載）: `crates/wire-server/tests/nosql11_response_schema.rs`。

## Related

- [op-search.md](./op-search.md)
- [op-scan.md](./op-scan.md)
- [op-aggregate.md](./op-aggregate.md)
- [http-module.md](./http-module.md)
