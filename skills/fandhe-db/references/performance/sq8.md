---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sq8.rs
---

# sq8

次元ごとの対称スカラー量子化（SQ8、`i8`）とその内積計算を扱うモジュール（Issue #521・#522）。全アイテムが `pub(crate)`（crate 内部専用）。

## Signature / Usage

```rust
/// 対称量子化のコード上限（`i8` の `-128` は使わない。qdrant
/// `encoded_vectors_u8` と同じ `[-127, 127]` の対称範囲）。
const CODE_MAX: f64 = 127.0;

/// 次元ごとの量子化スケール（Issue #521）。次元 `d` の格納コード `q_d` から
/// 元の値への復号は `dequantize(q_d, scale(d)) == q_d as f32 * scale(d)`。
/// 対称量子化のため次元ごとの平行移動（オフセット）は持たない。
#[derive(Debug, Clone, PartialEq)]
pub(crate) struct Sq8DimParams {
    scales: Vec<f32>,
}

impl Sq8DimParams {
    /// 次元数。
    pub(crate) fn dim(&self) -> usize;
    /// 次元ごとのスケール列（`hnsw.rs::NodeVectors::I8` の候補生成スコア計算・
    /// `node_matches` の範囲検査が使う）。
    pub(crate) fn scales(&self) -> &[f32];
    /// `hnsw.rs::NodeVectors::approx_bytes` が使う概算ヒープバイト量。
    pub(crate) fn approx_heap_bytes(&self) -> usize;
}

/// [`fit_dim_params`]・[`encode_rows`] の失敗要因。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Sq8Error {
    /// `index` 番目の成分（`rows` を row-major で平坦化した添字）が非有限。
    NonFinite { index: usize },
    /// `dim == 0`、または `rows.len()` が `dim` の整数倍でない。
    InvalidShape,
    /// 出力バッファの確保に失敗した（`try_reserve_exact` が `Err`）。
    AllocationFailed,
    /// `index` 次元目のスケールが境界を保持できなかった（非零値がスケール
    /// アンダーフローで消失、または復号時に `f32::MAX` を超え `Infinity` に
    /// なり得る）。
    ScaleOutOfRange { index: usize },
    /// [`prepare_query`] 専用: `dim` が [`I8_DOT_MAX_DIM`] を超えるクエリを
    /// 二重量子化しようとした。
    QueryDimTooLarge { dim: usize },
    /// [`prepare_query`] 専用: クエリ側の単一スケール `s_q` を復号したとき
    /// （`s_q * 127 * 127 * dim`）が非有限になり得る。
    QueryScaleOutOfRange,
}

/// `value / scale` を round-half-away-from-zero で丸め、`[-127, 127]` へ
/// クランプして `i8` へ変換する。`scale == 0.0` は除算せず `0` を返す。
pub(crate) fn quantize_scalar_f64(value: f64, scale: f64) -> i8;

/// `rows`（row-major・`dim` 列）から次元ごとの対称量子化スケールを求める
/// （凍結時に 1 回だけ呼ぶ）。
pub(crate) fn fit_dim_params(dim: usize, rows: &[f32]) -> Result<Sq8DimParams, Sq8Error>;

/// [`fit_dim_params`] が返した `params` で `rows`（row-major・`dim` 列）を
/// エンコードし `out` へ追記する。
pub(crate) fn encode_rows(
    dim: usize,
    rows: &[f32],
    params: &Sq8DimParams,
    out: &mut Vec<i8>,
) -> Result<(), Sq8Error>;

/// 格納コード `code`（次元 `d` のスケール `scale`）を元の近似値へ復号する。
pub(crate) fn dequantize(code: i8, scale: f32) -> f32;

/// `codes`（索引ノードの格納コード・`dim` 要素）を `scales`（同じ `dim`）で
/// 復号しながら `query`（f32・`dim` 要素）と内積する。
pub(crate) fn dot_i8_f32(codes: &[i8], scales: &[f32], query: &[f32]) -> f32;

/// [`prepare_query`] の二重量子化が扱える最大次元数。
pub(crate) const I8_DOT_MAX_DIM: usize = 65_536;

/// [`crate::hnsw::NodeVectors::I8`] の各ノード行について `Σ_d code_d` を求める。
pub(crate) fn row_sums(dim: usize, codes: &[i8]) -> Result<Vec<i32>, Sq8Error>;

/// [`prepare_query`] が返す、クエリ側の二重量子化済みコード。
#[derive(Debug, Clone)]
pub(crate) struct Sq8QueryCodes {
    pub(crate) signed: Vec<i8>,
    pub(crate) shifted: Vec<u8>,
    pub(crate) scale_q: f64,
}

/// `query`（f32・`params.dim()` 要素）を `params`（ノード側の次元ごとスケール）
/// と同じ code 空間へ写像したうえで、単一スケール `s_q` により対称量子化する。
pub(crate) fn prepare_query(
    params: &Sq8DimParams,
    query: &[f32],
) -> Result<Sq8QueryCodes, Sq8Error>;

/// 整数内積 `int_dot` を `scale_q` で復号し、`f64` の乗算結果を 1 回だけ
/// `f32` へ丸める。
pub(crate) fn score_from_int_dot(int_dot: i32, scale_q: f64) -> f32;
```

## Notes

- 本モジュール（`sq8.rs`）自体の全アイテムは `pub(crate)`（crate 外には非公開）。crate 外から呼べる i8 関連 API は、本モジュールとは別モジュールが公開するものに限られ、経路が 2 つある: (1) CPU 内積経路 — `isa.rs` の `I8Kernel` / `dot_i8`（本モジュールの `Sq8DimParams` が算出したスケールを使う次元ごと量子化）。(2) GPU パック経路 — `gpu_batch::packed_i8`（[gpu-batch](./gpu-batch.md)）の `pub fn encode_rows` / `quantize_query` / `dot_i8_packed_ref`。後者は本モジュールを呼び出すラッパーではなく、**行単位**対称量子化・4 要素/u32 パックを行う独立した実装（`gpu_batch/packed_i8.rs` のモジュール冒頭コメントに明記: 共有 SQ8 モジュール化を狙った Issue #521 が実装当時 OPEN だったため、`gpu_batch::packed_i8` は自前のエンコーダを持つ。#521 が本モジュールへ統合された場合はそちらへ委譲する計画）。次元ごとスケール（本モジュール）と行単位スケール（`gpu_batch::packed_i8`）は量子化の粒度が異なる点に注意。
- 量子化は対称（`[-127, 127]`、`i8` の `-128` は不使用）で、qdrant `encoded_vectors_u8` と同じ範囲設計に揃えている（本ソースのコメントに明記された引用）。
- `prepare_query` はクエリ側を「ノード側の次元ごとスケール空間へ写像 → 単一スケール `s_q` で対称量子化」という二重量子化を行う（`Sq8QueryCodes`）。二重量子化が扱える次元数上限は `I8_DOT_MAX_DIM = 65_536`。
- `hnsw-sq8-resident`（ADR）は HNSW 索引での SQ8 常駐化ゲート条件を扱う。本ページはビットレベルの量子化・復号のみを収録し、HNSW 側の常駐化判断ロジックは `search/hnsw.md`（search カテゴリ、担当外）を参照。
- This crate's SQ8 quantization is a plain Rust scalar quantization scheme (not a GPU tensor-core int8 path), unrelated to CUDA/CUTLASS int8 GEMM (`nvidia-cuda`), Apple `MPSGraph` int8 (`apple-silicon`), or ROCm int8 kernels (`amd-rocm`). No API overlap with `fandhe-ai` (same org, separate Rust AI/ML library).

## Related

- [isa](./isa.md)
- [f16](./f16.md)
- [gpu-batch](./gpu-batch.md)
