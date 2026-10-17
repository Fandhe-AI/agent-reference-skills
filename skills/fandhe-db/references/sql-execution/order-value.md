---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/order_value.rs
---

# sql::order_value

行スカラー値の「並べ替え・グルーピング用」比較値と比較規約（Issue #915・#1185・SQL-25・TASK-209）。`sql::scan`（広域取得のスカラー `ORDER BY`）と `sql::group_by`（グループキー・`SELECT DISTINCT` の複数列／非 `TEXT` キー・集計文の `ORDER BY`）の双方が呼ぶ、NULL 位置・降順を含む比較器の唯一の実装。

## Signature / Usage

```rust,ignore
//! 両経路で NULL 位置・NaN／±0 の扱いが食い違わないよう、比較規約はここに一本化する。
//! RLS 適用は呼び出し元（可視行のみをここへ渡す）の責務で、本モジュールは行の
//! 可視性を一切判断しない。

#[derive(Debug, Clone, PartialEq)]
pub(crate) enum OrderValue {
    /// 疑似列 `id`（テナント内で一意な `u64`）。
    Id(u64),
    /// `TEXT`（バイト列順）。
    Bytes(Vec<u8>),
    /// `INTEGER`／`BIGINT`／`DATE`／`TIMESTAMP`。
    SignedInt(i64),
    /// `REAL`／`DOUBLE`。
    Float(f64),
    Bool(bool),
    Numeric(crate::numeric::Decimal),
    Uuid(crate::uuid::Uuid),
    /// `ENUM`（宣言順のラベル添字）。
    EnumOrdinal(usize),
}

pub(crate) fn compare_f64(a: f64, b: f64) -> Ordering;
pub(crate) fn compare_order_values(a: &OrderValue, b: &OrderValue) -> Ordering;

pub(crate) fn compare_order_key(
    a: Option<&OrderValue>,
    b: Option<&OrderValue>,
    descending: bool,
) -> Ordering;

#[derive(Debug, Clone, Copy)]
pub(crate) enum ScalarKeyRef<'a> {
    Id(u64),
    Bytes(&'a [u8]),
    SignedInt(i64),
    Float(f64),
    Bool(bool),
    Numeric(crate::numeric::Decimal),
    Uuid(crate::uuid::Uuid),
    EnumOrdinal(usize),
}

pub(crate) fn extract_order_value_ref<'a>(
    schema: &TableSchema,
    key: &BoundOrderKey,
    id: u64,
    scanned: &'a [Option<row_codec::ScalarRef<'a>>],
) -> Result<Option<ScalarKeyRef<'a>>, SqlSurfaceError>;

pub(crate) fn scalar_key_ref_to_owned(
    value: ScalarKeyRef<'_>,
) -> Result<OrderValue, SqlSurfaceError>;

pub(crate) fn compare_statement_order(
    spec: &[BoundOrderKey],
    a_keys: &[Option<OrderValue>],
    a_id: u64,
    a_tenant: &[u8],
    b_keys: &[Option<OrderValue>],
    b_id: u64,
    b_tenant: &[u8],
) -> Ordering;

pub(crate) fn compare_ref_and_owned_values(a: &ScalarKeyRef<'_>, b: &OrderValue) -> Ordering;
pub(crate) fn compare_key_refs(a: &ScalarKeyRef<'_>, b: &ScalarKeyRef<'_>) -> Ordering;

pub(crate) fn order_value_to_cell(
    value: &OrderValue,
    ty: Option<&ColumnType>,
) -> Result<crate::sql::exec::Cell, SqlSurfaceError>;

pub(crate) fn expr_value_to_key_ref<'v>(
    value: &'v crate::sql::udf_call::ExprValue<'_>,
    kind: OrderKind,
) -> Result<Option<ScalarKeyRef<'v>>, SqlSurfaceError>;
```

## Options / Props

| Name | Description |
|------|-------------|
| `compare_f64` | NaN はすべての非 NaN より大きく NaN 同士は等しい。`-0.0 == 0.0`。`f64::total_cmp` は符号ビットまで区別するため使わない |
| `compare_order_key` | 戻り値は「昇順に安定ソートすると最終出力順になる」意味の `Ordering`。ASC は NULL を末尾、DESC は NULL を先頭（PostgreSQL 既定。`sql::group_by` の NULL 規約とは異なる） |
| `compare_statement_order` | キーを順に比較し、全キー同点なら `id` 昇順 → `tenant_id` バイト順で確定。`sql::scan` の経路 (B) と `sql::window` の出力順計算の両方が呼ぶ |
| `extract_order_value_ref` | 可視行からキー値を複製せず借用で抽出。列の実型が束縛段の `kind` と一致しなければ `Internal`（`XX000`、fail-closed）。式キーが到達した場合も配線不備として `XX000` |
| `scalar_key_ref_to_owned` | 採用確定した候補にのみ呼ぶ。TEXT のみ `try_reserve_exact` で確保（失敗は abort ではなく `Err`） |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/order_value.rs`（全396行）。型・`pub(crate)` 関数のシグネチャと主要 doc comment の抜粋で、関数本体は `compare_f64` 等の要点を除き掲載していない
- 異なる variant の組み合わせは同一キーでは構築されない不変条件のため、`compare_order_values` は到達しても安全側（`Ordering::Equal`）に倒す
- ENUM は宣言順のラベル添字（`EnumOrdinal`）で比較する
- distinct from `mssql` / `drizzle`: fandhe-db 内部の比較器であり、SQL Server や Drizzle の ORDER BY / collation 仕様ではない

## Related

- [group-by](./group-by.md)
- [window](./window.md)
- [distinct](./distinct.md)
