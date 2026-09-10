---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/search_engine_opt.rs
---

# search_engine_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--search-engine` opt-in CLI 引数の閉じた語彙パーサ（Issue #656）。`engine::search_engine::SearchEngineKind` へ untrusted な CLI 文字列から到達する唯一の入口を本モジュールに置く。`engine::search_engine` は意図的に `FromStr` を持たないため、本モジュールは untrusted な文字列を wire-server 側のみで閉じた 4 値の語彙として判定し、通過した値だけを engine 側の検証入口へ渡す。

フィルタ付き ANN の探索パラメータ opt-in（Issue #657）として `--hnsw-full-scan-ratio`（Issue #409。可視カーディナリティ切替の閾値比、既定 1/10）・`--hnsw-acorn-max-visible-ratio`（Issue #501。ACORN-1 の 2-hop 展開を有効化する可視比率の上限、既定 `None`＝無効）・`--hnsw-sparse-visited-max`（Issue #497。visited 集合の実装切替閾値、既定 0＝常に dense）の 3 つを露出する。

## Signature / Usage

~~~rust,ignore
pub const FULL_SCAN_RATIO_FLAG: &str = "--hnsw-full-scan-ratio";
pub const ACORN_MAX_VISIBLE_RATIO_FLAG: &str = "--hnsw-acorn-max-visible-ratio";
pub const SPARSE_VISITED_MAX_FLAG: &str = "--hnsw-sparse-visited-max";
pub const TOKENS: [&str; 4] = ["default", "hnsw", "hnsw_f16", "hnsw_i8"];

/// `--search-engine <token>` の解決結果。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SearchEngineChoice {
    /// 未指定と同じ既定経路（ブルートフォース）。
    Default,
    /// HNSW opt-in（索引ノードは f32 常駐）。
    Hnsw,
    /// HNSW opt-in・索引ノード f16 常駐（Issue #514）。
    HnswF16,
    /// HNSW opt-in・索引ノード I8（SQ8）常駐（Issue #521・#522）。
    HnswI8,
}

pub fn parse(raw: &str) -> Result<SearchEngineChoice, String>

/// `--hnsw-*` 3 フラグの解決済み値（Issue #657）。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct HnswTuning {
    pub full_scan_ratio: Option<Ratio>,
    pub acorn_max_visible_ratio: Option<Ratio>,
    pub sparse_visited_max: Option<usize>,
}

impl HnswTuning {
    /// 3 フィールドすべてが未指定（`None`）かどうか。
    pub fn is_empty(&self) -> bool
}

/// `<num>/<den>` 形式（`u32`／`u32`）の厳密パース（Issue #657）。
pub fn parse_ratio(raw: &str) -> Result<Ratio, String>

pub fn parse_sparse_visited_max(raw: &str) -> Result<usize, String>

impl SearchEngineChoice {
    pub fn token(self) -> &'static str
    pub fn to_engine_kind(self) -> Result<Option<SearchEngineKind>, String>
    pub fn to_engine_kind_with(self, tuning: HnswTuning) -> Result<Option<SearchEngineKind>, String>
}
~~~

## Options / Props

| Token | 対応 `SearchEngineChoice` | Description |
|-------|---------------------------|-------------|
| `default`（未指定含む） | `Default` | ブルートフォース経路（既定動作） |
| `hnsw` | `Hnsw` | HNSW opt-in、索引ノード f32 常駐 |
| `hnsw_f16` | `HnswF16` | HNSW opt-in、索引ノード f16 常駐 |
| `hnsw_i8` | `HnswI8` | HNSW opt-in、索引ノード I8（SQ8）常駐 |

## Notes

- 意味検証（分母 0・`num > den`・`acorn < full_scan_ratio` 等）は engine 側の `ValidatedHnswParams::with_full_scan_ratio` / `with_acorn_max_visible_ratio` に一本化し、本モジュールでは形状（`<num>/<den>` の `u32`/`u32`、`sparse_visited_max` の `usize`）のみを厳密パースする（二重実装しない）。
- `HnswTuning::is_empty()` が偽（1 つ以上指定）なのに `SearchEngineChoice::Default` の場合は fail-closed で拒否する（`--search-engine` 未指定のまま `--hnsw-*` を指定すると黙って無視される事故を防ぐ）。
- テナント存在情報に繋がる `full_scan_ratio` / `acorn_max_visible_ratio` は `EXPLAIN` の `hnsw_params:` 行へ出さない方針（Issue #411）。`sparse_visited_max=` は既に露出済みの静的閾値区分のため現状維持。

## Related

- [main-cli.md](./main-cli.md)
