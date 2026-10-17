---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# filter 配列 (leaf / not / or / 上限)

`search`／`scan`／`aggregate` 共通で使える事前フィルタ配列。要素は「葉」（`column`／`op`／`value`）または「グループ」（`or`／`not`）のいずれかで、トップレベル配列の要素同士は暗黙に `AND` 結合、`or` グループ配下の分岐は `OR` 結合、`not` は単一要素（葉または `or` グループ）の否定として扱う（Issue #945・NOSQL-14 で範囲比較・`IN`・`OR` へ拡張。それ以前は `eq`／`prefix` の 2 語彙・`AND` のみ。Issue #1197 で `ne`・`between`・`like`・`is_null`／`not_null`・`not` グループを追加）。`update`／`delete` の述語形（Issue #1062）でも同じ配列表現を使い、Issue #1356 以降は `search` と同じ語彙を受理する。

## Signature / Usage

```json
[
  {"column": "lang", "op": "eq", "value": "ja"},
  {"column": "price", "op": "gte", "value": "10"}
]
```

（`price` は `NUMERIC` 列を想定。）

```json
[{"or": [
  {"column": "lang", "op": "eq", "value": "ja"},
  {"column": "lang", "op": "in", "value": ["en", "fr"]}
]}]
```

追加語彙の例（Issue #1197。SQL の `NOT`・`BETWEEN`・`LIKE`・`IS [NOT] NULL` と同じ結果集合を返す）:

```json
[
  {"column": "lang", "op": "ne", "value": "ja"},
  {"column": "created", "op": "between", "value": ["2024-01-01", "2024-12-31"]},
  {"column": "path", "op": "like", "value": "%/docs/_%"},
  {"column": "note", "op": "not_null"},
  {"not": {"or": [
    {"column": "lang", "op": "eq", "value": "en"},
    {"column": "note", "op": "is_null"}
  ]}}
]
```

## Options / Props

葉（leaf）のフィールド:

| Name | Type | Description |
|------|------|-------------|
| `column` | string | 列名 |
| `op` | string | 次の 14 語彙（完全一致。大文字小文字の読み替えなし。`"op":"not"` は語彙外で `42601`）: `eq`／`prefix`／`ne`／`like`／`between`／`is_null`／`not_null`／`lt`／`le`／`lte`／`gt`／`ge`／`gte`／`in` |
| `value` | 文字列・数値・真偽値、`in`／`between` の配列、ARRAY／JSON 列への `eq`／`ne` の配列・オブジェクト、`in` の要素としての配列・オブジェクト | `is_null`／`not_null` は `value` を**持たない**（`null` を含め付いていれば `42601`） |

`op` 語彙:

| op | 意味・規則 |
|----|-----------|
| `eq` | 一致 |
| `prefix` | 前方一致。従来どおり `TEXT` 列限定（他の列型は `22000`） |
| `ne` | `NOT col = <値>` と同じ。値のレーンは `eq` と同じ。NULL 行は除外 |
| `like` | `TEXT` 列。文字列のみ。`%`・`_`・`\` をワイルドカード・エスケープとして解釈する。列型違反は `22000`、パターン長超過は `54000` |
| `between` | `[low, high]` の要素ちょうど 2 個のスカラー配列（違反は `42601`）。`DATE`／`TIMESTAMP`／`UUID`／`BYTEA`／`NUMERIC` と `INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION`（JSON 数値のみ。`>= low AND <= high` の式レーン）。`TEXT` 等は SQL の `BETWEEN` と同じく `22000` |
| `is_null`／`not_null` | `IS NULL`／`IS NOT NULL`。`VECTOR` 列は `22000` |
| `lt`／`le`／`lte`／`gt`／`ge`／`gte` | 範囲比較。`le`/`lte`・`ge`/`gte` はそれぞれ完全一致の同義語として両方受理する（Issue の受け入れ条件と対象ビヘイビア NOSQL-14 とで表記が食い違うため安全側に倒した判断。どちらに一本化するかは spec 側のオーナー判断事項） |
| `in` | 配列の要素のいずれかと一致。空配列は `42601`、256 要素超は `54000` |

## Notes

- 原文は「配列自体・グループ内の分岐はいずれも暗黙に `AND` 結合」と記述しているが、`or` グループの意味論（原文の例・NOSQL-14 の `OR` 拡張。wire-server `http/query/filter.rs` は `or` を `FilterNode::Or` へ束縛する）に合わせて書き分けた。
- `column` にサーバー側 RLS 述語名相当（`visible`／`visible()`。大文字小文字非区別）を指定する経路は `42601`（`or` 分岐の内側を含め再帰的に検査する。RLS はサーバー側暗黙適用のみで、クライアントは述語を書けない）。
- `eq` は対象列の型に応じたレーンへ振り分ける（Issue #896・NOSQL-17）: `TEXT`（旧来型。値・型不一致は `42601`。insert/update の「TEXT は旧来型 = `22000`」非対称は filter には適用しない）／`ENUM`（`42601`。語彙外は `22P02`）／`BOOLEAN`（`42601`）／`DATE`・`TIMESTAMP`・`UUID`（`42601`。形式・範囲は engine 側で検証）／`BYTEA`（base64 の JSON string。`42601`／`54000`。復号後 4 MiB 超で `54000`）／`NUMERIC`（数値または数値文字列。`42601`）。
- 範囲比較は `DATE`・`TIMESTAMP`・`UUID`（文字列）・`NUMERIC`（数値または数値文字列）・`BYTEA`（base64 の JSON string）・`TEXT`（文字列。バイト順の式レーン比較。Issue #1183）・`INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION`（JSON 数値）を受理する。`ENUM`／`BOOLEAN`／`VECTOR`／`ARRAY`／`JSON`／`JSONB` 列は engine 側の「範囲比較非対応列」判定（`22000`）へ委譲する。
- `in` は `TEXT`／`ENUM`（文字列配列）・`DATE`／`TIMESTAMP`／`UUID`（文字列配列）・`NUMERIC`（数値または数値文字列の配列）・`BYTEA`（base64 の JSON string の配列）・`INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION`（JSON 数値の配列。非数値要素は `42601`。`col = 1 OR col = 2` の式レーンへ展開し、要素 1 個は平坦化する。Issue #1356）・`ARRAY`（JSON 配列の配列。正規直列化して配列等価で照合）・`JSON`／`JSONB`（JSON オブジェクトか配列の配列。Issue #1429）のみ受理する。ARRAY／JSON 列へのスカラー要素は `42601`、要素数 256 超・配列要素数の上限超過は `54000`。他の列型（`BOOLEAN`／`VECTOR`）は engine 側の「IN 非対応列」判定（`22000`）へ委譲する。
- `INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION` 列への `eq`・範囲比較は JSON 数値のみ受理し（文字列・真偽値は型不一致）、式レーン（`udf_call::bind_expr`）で束縛する（Issue #1183）。`BIGINT` の |値| が 2^53 を超える場合（JSON リテラル・格納値とも）は `22003`（HTTP は `400`）。
- 未知列、および範囲比較・`prefix` に対する `VECTOR`／`ARRAY`／`JSON`／`JSONB` 列拒否（`22000`）は `engine::declarative_filter` の既存契約をそのまま透過する。
- ARRAY／JSON 列の `eq`／`ne`／`in`（Issue #1410）: 値はサーバーの正規直列化（text[] は `{"a","b"}`、JSON はキー昇順・空白なし）でリテラル化するため、SQL 側のリテラルが同じ綴りのときに台帳照合が `23505` になり、綴りが違えば `22023`（拒否側）になる。`search`／`scan`／`aggregate` の `filter` も ARRAY／JSON 列の `in` を同じ写像で受理し、SQL の `SELECT ... WHERE col IN (...)` と同じ結果集合になる（Issue #1429）。

グループ `not`:

- `{"not": <要素>}` の形のみ許可する（キーは `not` 1 つ、値はオブジェクトで、葉・`or` グループ・入れ子の `not` のいずれか）。違反は `42601`。
- 否定は**葉まで押し下げて**束縛する（De Morgan。`or` 群の上に否定を置くと NULL 行が UNKNOWN から真へ反転する fail-open になるため）。結果は SQL の `NOT ( ... )` と一致する。内側の葉の RLS 述語名検査も `not` を貫通する。
- ネスト深さは `or` と共有して数える（上限 32。超過は `54000`）。
- JSON 上の葉の数で事前検査するため、数値列の `between`／`ne`／`not eq` のように展開で 1 葉が 2 葉になる場合、JSON 上で 256 葉ちょうどのとき engine の事後検査だけが `54000` になりうる（拒否側に倒れる既知の差分）。

グループ `or`:

- `{"or": [<要素>, ...]}` の形のみ許可する。`or` 以外のキーが混在する・`or` の値が配列でない・空配列はいずれも `42601`。
- 各分岐は葉または入れ子の `or` グループ 1 つ。分岐が 1 つだけの場合は親の `AND` 列へ平坦化する（`{"or": [X]}` は `X` と等価）。
- ネスト深さの上限は 32（超過は `54000`）。HTTP 経由では JSON 自体の深さ上限 16（NOSQL-8）が先に効くため、実際に 32 段の `or` へ届くのは engine の `sql::declarative_predicate` API を直接呼び出す経路に限られる。

上限（`Vec` 確保より前に検査する）:

- 葉（`Leaf`）の総数: 256 個まで（超過は `54000`）
- `or` のネスト深さ: 32 段まで（超過は `54000`）
- `in` の要素数: 256 個まで（超過は `54000`。空配列は `42601`）

`update`／`delete` の `filter`（述語形）: `search`／`scan`／`aggregate` と同じ語彙（`eq`／`ne`／`prefix`／`like`／範囲比較 6 語彙／`in`／`between`／`is_null`／`not_null`、それらを包む `not`・`or` グループ、`AND` 結合）を受理する（Issue #1356）。SQL の述語形 `UPDATE`／`DELETE`（SQL-19）と同一の構文形（`WherePredicate`）へ写像するため、同じ述語は同じ結果集合・同じ `wire_code` になり、SQL⇄NoSQL の台帳照合（`23505`／`22023`）も成立する。数値列の `in` は JSON 上で 1 葉として事前検査されるが engine の事後検査は展開後の式を 1 個ずつ数えるため、他に葉があり `in` が 256 要素ちょうどのとき NoSQL だけが `54000` になりうる（拒否側に倒れる既知の差分）。実装は `filter::bind_filter_where_predicates`（`src/http/query/filter.rs`）。

検証コード（原文記載）: `crates/wire-server/tests/nosql7_filter_mapping.rs`・`nosql14_filter_operators.rs`・`nosql12_predicate_dml_numeric_filter.rs`・`nosql12_predicate_dml_composite_filter.rs`・`nosql14_query_composite_in_filter.rs`・`nosql12_update_delete.rs`。

## Related

- [op-search.md](./op-search.md)
- [op-scan.md](./op-scan.md)
- [op-aggregate.md](./op-aggregate.md)
- [op-update-delete.md](./op-update-delete.md)
- [../extensions/declarative-filter.md](../extensions/declarative-filter.md)
