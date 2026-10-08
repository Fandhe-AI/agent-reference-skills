---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/plan.rs
---

# sql::plan

SQL 表層の評価順序規則・`HINT ORDER(...)`（TASK-76・SQL-7、RLS-5・RLS-7・RLS-8）。`allowlist` が構造検証で受理した `HINT ORDER(...)`（RLS・SCALAR・DISTANCE の順列）を、実行不能な状態を型で作れない `EvaluationOrder` へ変換する。`exec` はこの値から `ExecutionPlan` を導出して実行順序を決める。

## Signature / Usage

~~~rust,ignore
/// HINT ORDER(...) が受理する評価段。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Stage { Rls, Scalar, Distance }

/// untrusted な段名トークン（大文字小文字を区別しない）を Stage へ写像する。
/// 未知の名前は None（呼び出し元の allowlist 側で 42601 に写像する）。
pub fn parse_stage_name(name: &str) -> Option<Stage>

/// RLS・SCALAR・DISTANCE を重複なく漏れなく並べた検証済み順列。
/// try_from_stages を通過した値だけが存在できる。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct EvaluationOrder([Stage; 3]);

/// TASK-75 時点の固定順序（HINT ORDER 未指定時の既定値）。
pub const DEFAULT: EvaluationOrder = EvaluationOrder([Stage::Rls, Stage::Scalar, Stage::Distance]);

/// stages が RLS・SCALAR・DISTANCE の順列（3 要素・重複なし）であることを検証
/// してから構築する。それ以外（個数不正・重複・欠落）は Err。
pub fn try_from_stages(stages: &[Stage]) -> Result<Self, PlanError>

pub fn stages(&self) -> [Stage; 3]

/// SCALAR 段が DISTANCE 段より先に評価されるか。exec.rs が事前適用と事後適用の
/// どちらを使うかを決める唯一の分岐点。
pub fn scalar_before_distance(&self) -> bool

/// EvaluationOrder::try_from_stages の失敗理由。呼び出し元
/// （sql::allowlist::Parser::parse_hint_order）が SqlSurfaceError::unsupported
/// （42601）へ写像する。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PlanError {
    /// 3 個以外の個数（省略・重複起因の水増し・不足）。
    WrongStageCount { got: usize },
    /// 個数は 3 だが RLS・SCALAR・DISTANCE の順列になっていない（重複段）。
    NotAPermutation,
}

/// crate::sql::parser::BoundStatement から導出する、exec.rs が直接参照する実行方針。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ExecutionPlan {
    /// SCALAR 条件を候補構築時（on_visible_row）に事前適用するか。false の場合、
    /// DISTANCE 段の後に事後フィルタとして適用する。
    pub scalar_prefilter: bool,
}

/// sql::parser::BoundStatement::evaluation_order（EvaluationOrder）から導出する。
pub fn from_evaluation_order(order: EvaluationOrder) -> Self

/// RLS 実行時安全網（RLS-5）の旧 API（TASK-76）。TASK-136 で実装を
/// crate::rls::RlsSafetyNet へ再配置した後も、公開 API 互換性のために残す。
#[deprecated(note = "use crate::rls::RlsSafetyNet instead")]
pub fn apply_rls_safety_net<F>(
    hits: Vec<(u64, f64)>,
    tenant_and_visibility: impl Fn(u64) -> Option<(String, crate::storage::Visibility)>,
    is_visible: F,
) -> Vec<(u64, f64)>
where
    F: Fn(&str, crate::storage::Visibility) -> bool,
~~~

## Notes

- P0（テナント境界）: `HINT ORDER` は RLS を後段に置くことを許すが、候補集合構築時の暗黙 RLS 事前フィルタ（`exec.rs` の `VectorArena::build_filtered_with_rows_in_txn` の `predicate`）は `HINT ORDER` の内容にかかわらず常に適用され続ける。`HINT ORDER` は RLS 段の実行位置の見かけ上の記述に過ぎず、RLS 適用そのものを外す・弱める手段にはならない。
- `exec.rs` は最終結果に対して `crate::rls::RlsSafetyNet`（TASK-136・RLS-5）を無条件に適用する。安全網を `Option` や条件分岐で無効化できない構造にしておくのは、候補集合の構築元が将来広がった場合の構造的な歯止め（defense-in-depth）。
- `apply_rls_safety_net` は `#[deprecated]` — 実装は `crate::rls::RlsSafetyNet` へ再配置済み（TASK-136、rls.rs は security scope の管轄）。ワークスペース内では未参照だが、main へマージ済みの公開 `pub fn` との互換性のため残置。
- `EvaluationOrder` は不正な状態（段の省略・重複・未知の段）を型で表現できないよう `try_from_stages` の検証を経由してのみ構築できる設計（許可リスト層の再検証を実行層で重複させない）。
- `VectorArena` / `RlsSafetyNet` の実体は本 scope 外（sql-execution / security scope）の管轄のため参照のみ記載する。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `HINT ORDER(...)` is a proprietary evaluation-order hint over RLS/SCALAR/DISTANCE stages, not a query planner hint in those systems' sense.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
