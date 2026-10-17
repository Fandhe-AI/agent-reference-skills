---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/where_negation.rs
---

# sql::where_negation

WHERE 述語ツリーの否定を構文段で葉まで押し下げる純関数群（SQL-24・TASK-208 のポインタ。Issue #1184）。`NOT ( ... )` や数値リテラルの `NOT IN`／`NOT BETWEEN` を受理する際に `sql::allowlist::Parser` が呼ぶ。`WherePredicate` に新しい variant を足さず、既存 variant だけで否定を表現する。

## Signature / Usage

~~~rust,ignore
//! 設計の要点（fail-closed）: `sql::where_tree::BoundOrGroup::matches` 等の二値評価器は
//! UNKNOWN を false として扱うため、`Or`／AND 群の**上**に `Not` を置くと NULL 行で
//! UNKNOWN が真へ反転し fail-open になる。そこで De Morgan の法則（Kleene 三値論理でも
//! 厳密に成立する）で否定を葉まで押し下げ、葉の否定だけを既存の `WherePredicate::Not`
//! （宣言的フィルタの三値評価）または演算子の反転で表現する。
//!
//! 否定表:
//!
//! | 入力 | 結果 |
//! | ---- | ---- |
//! | 連言 `[p]` | `¬p` |
//! | 連言 `[p1..pn]`（n≥2） | `[Or([¬p1], ..., [¬pn])]` |
//! | `Or(branches)` | 各分岐の否定を連結（AND） |
//! | `Not(x)` | `x` |
//! | `IsNull` | `negated` を反転（IS NULL は UNKNOWN にならず厳密に同値） |
//! | 宣言的な葉 | `Not(leaf)` |
//! | `Expression(a > b)` 等 | 演算子反転（`>`↔`<=`、`<`↔`>=`） |
//! | `Expression(a = b)` | `Or([a < b], [a > b])`（`BinOp` に `<>` が無いため） |
//! | `visible()` | `42601`（RLS-7: 否定越しに RLS 述語を扱わせない） |
//! | `IN (SELECT)`／`EXISTS` | `Not(..)`（解決段 `sql::subquery` が NULL 規則込みで否定形を評価する。Issue #1191） |
//! | `<col> <op> (SELECT)` | 演算子反転（`=`↔`<>`・`<`↔`>=`・`>`↔`<=`。Issue #1191） |

/// 連言（AND で結ばれた述語列）の否定を、`Not` を群の上に残さない連言として返す。
/// `budget` はパーサーの式ノード予算（`Parser::expr_node_budget`）で、複製する
/// `Expr` のノード数を課金する（枯渇は `54000`）。
pub(crate) fn negate_conjunction(
    preds: Vec<WherePredicate>,
    budget: &mut usize,
) -> Result<Vec<WherePredicate>, SqlSurfaceError>

/// 式ノード数（パーサー予算 `consume_expr_node` と同じ単位）を数える。
pub(crate) fn expr_node_count(expr: &Expr) -> usize
~~~

## Notes

- 上記フェンスは原文 module doc と `pub(crate)` 関数シグネチャの抜粋（`negate_one` の本体・テストは省略）。本モジュールにクレート外へ公開される API は無い。
- 演算子反転の根拠: 束縛段の比較は同型（数値×数値・TEXT×TEXT・DATE/TIMESTAMP 系）でのみ成立し、値は全順序を持つ（非有限の REAL/DOUBLE は束縛・評価で拒否される）。NULL が絡む場合は反転前後とも UNKNOWN になるため三値論理でも同値。
- `NOT visible()` は `42601`（`NOT visible() is not supported`）。否定を伴う述語は式ノード予算を消費し、枯渇は `54000`。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): negation is rewritten at parse time into this engine's existing predicate variants rather than evaluated with three-valued logic at runtime.

## Related

- [where-tree](./where-tree.md)
- [allowlist](./allowlist.md)
- [declarative-predicate](./declarative-predicate.md)
