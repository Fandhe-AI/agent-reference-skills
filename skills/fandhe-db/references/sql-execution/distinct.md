---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/distinct.rs
---

# sql::distinct

`SELECT DISTINCT`・`COUNT(DISTINCT <expr>)`（SQL-25 (c)・TASK-209）が共有する正準キー化・予算管理。

## Signature / Usage

```rust,ignore
//! 呼び出し元は 2 経路:
//!
//! - `sql::allowlist::validate_sql_tokens` が `SELECT DISTINCT` を
//!   `sql::group_by`（既存の `GROUP BY` 実行器）へ脱糖する経路（`GROUP BY` と
//!   同じ [`crate::sql::group_by::ResultBudget`] を継承するため、本モジュールの
//!   予算は対象外）。
//! - `sql::aggregate`／`sql::group_by` の `Accumulator::CountDistinct` が
//!   `COUNT(DISTINCT <expr>)` の中間状態（クエリ全体で 1 つ）として使う
//!   [`DistinctBudget`]。

pub(crate) const MAX_DISTINCT_VALUES: usize = 100_000;
pub(crate) const MAX_DISTINCT_TOTAL_BYTES: usize = 16 * 1024 * 1024;
const DISTINCT_ENTRY_OVERHEAD_BYTES: usize = 32;

pub(crate) struct DistinctBudget {
    entries: usize,
    bytes: usize,
}

impl DistinctBudget {
    pub(crate) fn new() -> Self;

    /// 新規キー 1 件（バイト長 `key_len`）を計上し、上限超過なら `54000` で
    /// fail-closed に拒否する。`checked_*` を使い、加算のオーバーフローも
    /// `54000` として扱う。
    pub(crate) fn charge(&mut self, key_len: usize) -> Result<(), SqlSurfaceError>;
}

/// `f64` の正準化。`-0.0` を `+0.0` へ、NaN をすべて単一の正準表現へ正規化する
/// （PostgreSQL の `DISTINCT`／`GROUP BY` は NaN 同士・±0 同士をそれぞれ同一視
/// する契約に合わせる）。
pub(crate) fn canon_f64(v: f64) -> [u8; 8];
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `MAX_DISTINCT_VALUES` | 100_000 | `COUNT(DISTINCT)` の中間状態がクエリ全体で保持してよい異なり値の件数上限。`SELECT DISTINCT` の結果行数は既存の `sql::group_by::MAX_GROUPS` を継承するため対象外 |
| `MAX_DISTINCT_TOTAL_BYTES` | 16 MiB | 中間状態が保持するキーの累計バイト数上限（エントリごとの固定オーバーヘッド見積り込み） |
| `DISTINCT_ENTRY_OVERHEAD_BYTES` | 32 | 1 エントリあたりの固定オーバーヘッド見積り（`HashSet<Vec<u8>>` のバケット・`Vec` のヒープ管理コストの概算） |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/distinct.rs`（全154行、テスト除く先頭 114 行）。`charge` / `canon_f64` 本体は上記のとおり原文の要点のみ（本体はオーバーフロー検査付きの加算と上限比較）
- 超過時の detail 文言は `COUNT(DISTINCT) cardinality exceeds the allowed limit` / `COUNT(DISTINCT) accumulated key size exceeds the allowed limit` / `COUNT(DISTINCT) budget accounting overflowed`。集計・GROUP BY 側の TEXT 予算エラーと重ならない別文字列で、索引経路と全走査で成否が変わってはならないため全走査へのフォールバック対象にしない
- キーの数値正準化は `crate::constraint::push_canonical_component`（UNIQUE／FOREIGN KEY の正準キー）とは役割が異なる。1 つの `CountDistinct` は束縛時に決まった単一の入力型しか観測しないため、型タグ・長さ接頭辞を付けない生の正準バイト列をそのままキーにする
- 新規キー 1 件の挿入が確定した時点でのみ `charge` を呼ぶ（既存キーへの再ヒットでは呼ばない）
- distinct from `mssql` / `drizzle`: fandhe-db 内部の DISTINCT 用予算・正準化であり、各 SQL ダイアレクトの DISTINCT 仕様ではない

## Related

- [group-by](./group-by.md)
- [aggregate](./aggregate.md)
- [order-value](./order-value.md)
