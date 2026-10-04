# Table

`fandhe-frontend-wireframe-ui` の N 列 × M 行のデータ表配置部品。「ここにデータ表がある」という配置イメージだけを示す非インタラクティブな部品。API は `table(headers, rows, size)` の 3 引数。

## Signature / Usage

```rust
pub fn table(headers: &[&str], rows: &[&[&str]], size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{table, Size};

const HEADERS: [&str; 3] = ["Name", "Role", "Status"];
const ROWS: [[&str; 3]; 3] = [
    ["Alice", "Engineer", "Active"],
    ["Bob", "Designer", "Invited"],
    ["Carol", "Manager", "Active"],
];

let rows: Vec<&[&str]> = ROWS.iter().map(|row| row.as_slice()).collect();
table(&HEADERS, &rows, Size::Md);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| headers | `&[&str]` | - | 列見出しの文言。空スライスならヘッダー行を出力しない。 |
| rows | `&[&[&str]]` | - | 行ごとのセル文言。20 行を超える入力は先頭のみへ飽和する。短い行は空セルで埋める。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

公開定数:

| Name | Type | Value |
| --- | --- | --- |
| `MAX_TABLE_COLUMNS` | `usize` | `12` |
| `MAX_TABLE_ROWS` | `usize` | `20` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/table/
- 低忠実度ワイヤーフレーム部品。Themes の `Table` / `Data table`、Primitives の `Data table` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。データ表示・並べ替え・行選択が必要な場合は Themes の Table / Data table を使う。
- `<table>` / `<th>` は使わず `div` / `span` + CSS grid で表現する（プレースホルダーの文言を支援技術へ「データ表」として伝えないため）。
- ヘッダー有無は bool ではなく `headers.is_empty()` で表す。列数は明示引数にせず、`headers.len()` と各行長の最大値のうち大きい方を `1..=12` へ丸めて導く。行数は `rows.len()` で、`MAX_TABLE_ROWS`（20 行）超は先頭のみを描画する。
- 短い行は空セル（`fw-wire-table-cell-empty`）で埋め、列数より長い行は先頭の列数分だけを使う。セル種別は持たず全セルがテキストのみ。
- 配色は `--fw-wire-fill-subtle`（ヘッダー）ほかグレースケールトークンのみ。`role` / `aria-*` / `tabindex` / `style` / `on*` / `<table>` / `<th>` / `<button>` / `<input>` / `<select>` / `<a href>` は出力しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Table）。

## Related

- [Media wireframes](./overview.md)
- [Table (Themes)](../../themes/data-display/table.md)
- [Data table (Themes)](../../themes/data-display/data-table.md)
