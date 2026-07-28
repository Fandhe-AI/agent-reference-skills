# query

クエリ文字列 key-value パーサー（sans-IO）。`RequestHead::query()` が返す `?` より後の生文字列を `&`/`=` へ分解する。

## Signature / Usage

```rust
pub const MAX_QUERY_BYTES: usize = 8 * 1024;
pub const MAX_QUERY_PAIRS: usize = 256;

pub enum QueryError {
    QueryTooLong,
    TooManyPairs,
}

pub fn parse_query(query: &str) -> Result<QueryPairs<'_>, QueryError>;

pub struct QueryPairs<'a> { /* 非公開 */ }
impl<'a> Iterator for QueryPairs<'a> {
    type Item = (&'a str, &'a str);
}
```

```rust
use fandhe_backend_http::query::parse_query;

let pairs: Vec<(&str, &str)> = parse_query("a=1&a=2").unwrap().collect();
assert_eq!(pairs, vec![("a", "1"), ("a", "2")]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_QUERY_BYTES` | `usize` (8 KiB) | クエリ文字列全体の許容バイト数上限。超過は `QueryTooLong` |
| `MAX_QUERY_PAIRS` | `usize` (256) | key-value 組数の上限。超過は `TooManyPairs` |

## Notes

- 重複キー（`a=1&a=2`）はすべて出現順に返す。除重・上書きは呼び出し側の責務
- `=` を含まないセグメント（`a`）は値を空文字列として扱う（`("a", "")`）。キーが空（`=v`）でも `("", "v")` として保持する
- 空セグメント（`&&`・先頭/末尾の `&`）はスキップする
- 2 個目以降の `=` は値の一部として扱う（`a=b=c` → `("a", "b=c")`）
- percent-decode・`+` → 半角スペースのデコードは一切行わない（ルーティング層とのデコード差異による正規化バイパスを防ぐ契約）
- 上限超過時は `QueryPairs` を一切生成せず `Err` を返す（fail-closed、部分結果を返さない）
- `QueryPairs` はゼロコピーイテレータで、追加の割り当ては行わない

## Related

- [request](./request.md)
- [form](./form.md)
- [percent](./percent.md)
