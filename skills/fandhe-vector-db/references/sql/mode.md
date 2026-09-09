---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/mode.rs
---

# sql::mode

取得モード（`recall`／`precision`）の構文解決コア（TASK-161、SQL-12）。クエリ単位の `USING MODE` 句・セッション変数 `SET search_mode`（いずれも `allowlist` が構文として受理し、生のリテラル文字列を返す）から得られる値と、`query_planner.rs::QueryExpansion::mode_hint` 由来のプランナー推定を `resolve_mode_with_planner` が決定的に解決する。

## Signature / Usage

~~~rust,ignore
//! 取得モード（`recall`／`precision`）の構文解決コア（TASK-161、対象ビヘイビア: SQL-12。
//! ポインタ: docs/spec/05-tasks.md TASK-161・docs/spec/04-behavior/sql-surface.md SQL-12）。
//!
//! 責務境界: クエリ単位の `USING MODE` 句・セッション変数 `SET search_mode`
//! （いずれも [`allowlist`](crate::sql::allowlist) が構文として受理し、生のリテラル
//! 文字列を返す）から得られる値と、`query_planner.rs::QueryExpansion::mode_hint`
//! 由来のプランナー推定を [`resolve_mode_with_planner`] が決定的に解決する
//! （優先順位・fail-safe の解決契約は spec のビヘイビア定義〔TASK-164・PLAN-11〕を
//! 参照）。解決結果（[`ResolvedMode`]）は
//! [`parser::BoundStatement`](crate::sql::parser::BoundStatement)
//! （`bind_with_session`）が保持する。SQL 表層はプランナー推定の結線を持たない
//! （TASK-77/78 の管轄）ため、そちらは引き続き [`resolve_mode`]（2 引数版）を呼ぶ。
//!
//! `precision` の**実行契約**（確信度判定・空集合 fail-closed 応答）は本モジュールの
//! 管轄外（TASK-162・対象ビヘイビア SEARCH-9）。本モジュールは構文・優先順位の解決
//! までを担い、`recall`／`precision` いずれの値も対等に解決する（fail-open のような
//! 値の書き換えは行わない）。
//!
//! [`SessionState`] は wire 接続 1 本につき 1 個、呼び出し元（wire-server の接続
//! ハンドラ。TASK-73・TASK-165 の管轄）が所有する値型として設計する。`EngineCore`
//! 等の複数接続で共有される構造体には置かない（接続間でモードが混線しない構造を
//! 型で担保するため）。

/// 取得モード（README「実装方針（要点）」で公開済みの `recall`〔既定・広域〕／
/// `precision`〔ピンポイント〕の 2 値）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SearchMode {
    Recall,
    Precision,
}

/// `USING MODE`／`SET search_mode` のリテラル値を解決する（SQL-12）。
///
/// 完全一致のみ受理する（大文字・前後空白・空文字はすべて拒否）。fail-closed
/// 側に倒す方針（緩和は後から容易だが、逆〔一度緩めた受理範囲を狭める〕は
/// 互換性破壊になるため）。不一致は [`SqlSurfaceError::InvalidInput`]
/// （ERR-2: `22000`。構文上は文字列リテラルとして正しく受理されたが値が不正）。
pub fn parse_literal(literal: &str) -> Result<Self, SqlSurfaceError>

pub fn as_str(&self) -> &'static str

/// 実効モードの指定元（4 値。TASK-164・PLAN-11 で `PlannerEstimate` を追加し確定。
/// `#[non_exhaustive]` により TASK-161 時点で確保していた拡張点を実際に使用した。
/// 優先順位の解決契約は spec のビヘイビア定義〔PLAN-11〕を参照）。
///
/// **TASK-161 で意図的に付与した破壊的変更（BREAKING CHANGE）**: `#[non_exhaustive]` を
/// 付与したため、クレート外で本 enum を網羅的に `match` していたコードは
/// `_ => ...` 等のワイルドカードアーム追加が必須になる（詳細は PR #188 の
/// Breaking Changes 節を参照）。
///
/// `#[non_exhaustive]`: TASK-164 で `PlannerEstimate` variant を追加した際、
/// クレート外の `match` 式が網羅性エラーでコンパイル不能になる破壊的変更を防いだ
/// （AGENTS.md「公開 API・エラー契約の互換性（P1）」。PR #188 レビュー指摘対応:
/// `BoundStatement`／`ValidatedStatement` と同種の拡張点保護）。クレート外で本 enum を
/// `match` する場合は `_ => ...` 等のワイルドカードアームが必須になる。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum ModeSource {
    QueryClause,
    SessionVariable,
    PlannerEstimate,
    Default,
}

/// `EXPLAIN` 等での可視化用の識別子（プログラム出力文字列は英語。
/// TASK-78・SQL-6 が wire 応答へ載せる際の値として使う想定の安定した公開契約
/// のため、一度出した値は今後変更しない）。
pub fn as_str(&self) -> &'static str

/// 優先順位解決を終えた実効モードと、その指定元。
///
/// **TASK-161 で意図的に非公開化した破壊的変更（BREAKING CHANGE）**: 全フィールドを
/// `pub` から `pub(crate)` へ変更し `#[non_exhaustive]` を付与した。クレート外からの
/// 直接のフィールド参照・構造体リテラル構築は今後不可能。構築は [`ResolvedMode::new`]、
/// 読み取りは [`ResolvedMode::mode`]／[`ResolvedMode::source`] を使う（詳細は PR #188 の
/// Breaking Changes 節を参照。TASK-164 拡張点の前方互換確保とカプセル化のため）。
///
/// `#[non_exhaustive]`: 本構造体に将来フィールドを追加しても（例:
/// `ModeSource::PlannerEstimate` 導入時の付随情報）、既存の構造体リテラル構築コードが
/// 必須フィールド不足でコンパイル不能になる破壊的変更を防ぐ（PR #188 レビュー指摘
/// 対応: `BoundStatement`／`ValidatedStatement` と同種の拡張点保護）。フィールドは
/// カプセル化のため `pub(crate)` とし、クレート外からの構築は [`ResolvedMode::new`]、
/// 読み取りは [`ResolvedMode::mode`]／[`ResolvedMode::source`] を経由する。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub struct ResolvedMode {
    pub(crate) mode: SearchMode,
    pub(crate) source: ModeSource,
}

/// クレート外から解決済みモードを構築する constructor（`resolve_mode` を経ない
/// テスト・拡張コード向け）。
pub fn new(mode: SearchMode, source: ModeSource) -> Self

/// 解決された実効モード。
pub fn mode(&self) -> SearchMode

/// 実効モードの指定元。
pub fn source(&self) -> ModeSource

/// クエリ句・セッション変数それぞれの解決済み値から実効モードを決定する
/// （副作用なし・決定的。同一入力には常に同一の結果を返す）。優先順位は
/// **クエリ句 > セッション変数 > 既定（`recall`）**（SQL-12）。
///
/// SQL 表層（`sql/parser.rs::bind_with_session` 等。TASK-77/78 が管轄する
/// `USING PLAN`／`EXPLAIN` 結線までは未実装）はプランナー推定を持たないため、
/// 引き続きこの 2 引数版を呼ぶ（[`resolve_mode_with_planner`] へ `planner: None`
/// を渡す後方互換の薄い委譲。TASK-164・PLAN-11）。
pub fn resolve_mode(query: Option<SearchMode>, session: Option<SearchMode>) -> ResolvedMode

/// クエリ句・セッション変数・プランナー推定の 3 系統から実効モードを短絡順序で
/// 決定的に解決する（TASK-164・PLAN-11。解決契約〔優先順位・fail-safe 方針〕は
/// spec のビヘイビア定義〔PLAN-11〕を参照）。`planner`
/// （`query_planner.rs::QueryExpansion::mode_hint` 由来。不正値の丸めは
/// `query_planner::parse_expansion` 側が担う）は既に検証済みの
/// `Option<SearchMode>` を受け取るだけの契約とする。
pub fn resolve_mode_with_planner(
    query: Option<SearchMode>,
    session: Option<SearchMode>,
    planner: Option<SearchMode>,
) -> ResolvedMode

/// 接続（セッション）単位のモード状態。呼び出し元が 1 接続につき 1 個所有する
/// 値型（モジュールドキュメント参照）。意図的に `Copy` を実装しない
/// （`Copy` だと呼び出し元が値でコピーを保持したまま `set_search_mode` を
/// コピー側へ適用し、`SET` が見かけ上成功しつつ元のセッションへ反映されない
/// 事故を型で防げなくなるため。呼び出し元は `&mut SessionState` を経由して
/// 更新する契約とする）。
#[derive(Debug, Clone, Default)]
pub struct SessionState

pub fn search_mode(&self) -> Option<SearchMode>

/// このセッションに登録済みの UDF レジストリ（読み取り専用）。
pub fn udfs(&self) -> &crate::sql::udf_call::UdfRegistry

/// `core.rs::EngineCore::execute_sql_in_session` の `CreateFunction` 分岐から
/// 呼ばれる。登録の検証自体は `udf_call::define_function` が担い、本メソッドは
/// セッションが保持する `&mut UdfRegistry` を貸し出すだけの薄いアクセサ。
pub fn udfs_mut(&mut self) -> &mut crate::sql::udf_call::UdfRegistry

/// TASK-149（対象ビヘイビア: EXT-5, EXT-6）: 検証済みの `Arc<dyn WasmUdfBackend>`
/// をこのセッションのレジストリへ登録する。名前空間の衝突検査は
/// `udf_call::define_wasm_function` が担い、登録は宣言的 UDF と同じ
/// 「セッション（＝認証済みテナントの接続単位）に閉じる・永続化しない」構造に
/// 従う。SQL からの登録構文（`CREATE FUNCTION ... AS WASM ...`）・wire 経由の
/// モジュール搬送・モジュールバイト列からのバックエンド構築（wasmtime 依存の
/// ユーザー承認待ち。`crate::wasm_udf` モジュールドキュメント参照）は本タスクの
/// スコープ外で、呼び出し元が検証済みバックエンドの構築を担う。
pub fn register_wasm_udf(
    &mut self,
    name: &str,
    backend: std::sync::Arc<dyn crate::wasm_udf::WasmUdfBackend>,
) -> Result<(), crate::sql::allowlist::SqlSurfaceError>

/// 検証済みの値のみを受け取る契約（呼び出し元 `core.rs::EngineCore::execute_sql_in_session`
/// が `SearchMode::parse_literal` の検証成功後にのみ呼ぶ）。失敗した `SET` が
/// セッションを変更しないことは、この「検証→代入」の呼び出し順序で保証する
/// （部分更新＝黙った既定化と同種の fail-open を防ぐ。security.md 準拠）。
pub fn set_search_mode(&mut self, mode: SearchMode)
~~~

## Notes

- `ModeSource` / `ResolvedMode` はいずれも `#[non_exhaustive]` — TASK-161 で意図した破壊的変更として導入し、クレート外の網羅的 `match` にワイルドカードアームを要求する（PR #188）。
- `SessionState` は wire-server の接続ハンドラ（wire-server scope の管轄）が所有する値型として設計され、`EngineCore` 等の複数接続で共有される構造体には置かない。
- `QueryExpansion` / `query_planner.rs` の実体は本 scope 外（search scope）の管轄のため参照のみ記載する。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `SET search_mode` is a proprietary session variable, not standard SQL `SET`.

## Related

- [using-plan](./using-plan.md)
- [explain](./explain.md)
- [parser](./parser.md)
