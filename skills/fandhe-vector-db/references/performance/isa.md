---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/isa.rs
---

# isa

CPU 命令セットの実行時検出（TASK-156・対象ビヘイビア: CORE-14）。コンパイル時 `cfg(target_arch)` 分岐ではなく、sealed トークン（`try_new` が private かつ検出成功時のみ構築される値）ベースの SIMD カーネルディスパッチに置き換える。`isa/x86_block4.rs` `isa/neon_block4.rs`（行ブロック内積の intrinsics 実装）と `isa/x86_i8.rs` `isa/neon_i8.rs`（i8 内積の intrinsics 実装）を子モジュールとして持つ。

## Signature / Usage

```rust
pub enum DetectedIsa {
    Scalar,
    Neon,
    Avx2Fma,
    Avx512,
}

#[cfg(target_arch = "aarch64")]
#[derive(Debug, Clone, Copy)]
pub struct NeonToken(());
#[cfg(target_arch = "aarch64")]
impl NeonToken { pub(crate) fn try_new() -> Option<Self>; }

#[cfg(target_arch = "x86_64")]
#[derive(Debug, Clone, Copy)]
pub struct Avx2FmaToken(());
#[cfg(target_arch = "x86_64")]
impl Avx2FmaToken { pub(crate) fn try_new() -> Option<Self>; }

#[cfg(target_arch = "x86_64")]
#[derive(Debug, Clone, Copy)]
pub struct Avx512Token(());
#[cfg(target_arch = "x86_64")]
impl Avx512Token { pub(crate) fn try_new() -> Option<Self>; }

#[derive(Debug, Clone, Copy)]
pub enum SimdKernel {
    Scalar,
    #[cfg(target_arch = "aarch64")]
    Neon(NeonToken),
    #[cfg(target_arch = "x86_64")]
    Avx2Fma(Avx2FmaToken),
    #[cfg(target_arch = "x86_64")]
    Avx512(Avx512Token),
}

impl SimdKernel {
    pub fn isa(self) -> DetectedIsa;
    /// 内積計算。トークン所持を根拠に ISA 別カーネルへ分岐する。
    pub fn dot(self, a: &[f32], b: &[f32]) -> f32;
    pub fn dot_with_scalar_tail(self, a: &[f32], b: &[f32]) -> f32;
    pub fn dot_with_padded_tail(self, a: &[f32], b: &[f32]) -> f32;
    pub fn dot_block4(self, rows: [&[f32]; 4], query: &[f32]) -> [f32; 4];
}

pub const DOT_MULTI_ACC_MIN_DIM: usize = 768;

pub fn detect() -> SimdKernel;
/// プロセス内で 1 回だけ detect() を実行し、以後は同じ値を返す。
pub fn current() -> SimdKernel;
pub fn dot_scalar(a: &[f32], b: &[f32]) -> f32;

// --- f16 内積カーネル（f16 常駐ベクトルとの内積） ---
#[cfg(target_arch = "x86_64")]
pub struct F16cToken(());
#[cfg(target_arch = "aarch64")]
pub struct NeonFp16Token(());
#[cfg(target_arch = "aarch64")]
pub struct NeonDotprodToken(());

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DetectedF16Isa { Scalar, F16c, NeonFp16 }

#[derive(Debug, Clone, Copy)]
pub enum F16Kernel {
    Scalar,
    #[cfg(target_arch = "x86_64")]
    F16c(F16cToken),
    #[cfg(target_arch = "aarch64")]
    NeonFp16(NeonFp16Token),
}
impl F16Kernel {
    pub fn isa(self) -> DetectedF16Isa;
    pub fn dot_f16(self, a_bits: &[u16], b: &[f32]) -> f32;
}
pub fn detect_f16() -> F16Kernel;
pub fn current_f16() -> F16Kernel;
pub fn dot_f16_scalar(a_bits: &[u16], b: &[f32]) -> f32;

// --- i8 内積カーネル（SQ8 量子化ベクトルとの内積） ---
#[derive(Debug, Clone, Copy)]
pub struct I8QueryOperands<'a> {
    pub signed: &'a [i8],
    pub shifted: &'a [u8],
}

#[cfg(target_arch = "x86_64")]
pub struct AvxVnniToken(());
#[cfg(target_arch = "x86_64")]
pub struct Avx512VnniToken(());

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DetectedI8Isa { Scalar, Avx2Widen, AvxVnni, Avx512Vnni, NeonDotprod }

#[derive(Debug, Clone, Copy)]
pub enum I8Kernel {
    Scalar,
    #[cfg(target_arch = "x86_64")]
    Avx2Widen(Avx2FmaToken),
    #[cfg(target_arch = "x86_64")]
    AvxVnni(AvxVnniToken),
    #[cfg(target_arch = "x86_64")]
    Avx512Vnni(Avx512VnniToken),
    #[cfg(target_arch = "aarch64")]
    NeonDotprod(NeonDotprodToken),
}
impl I8Kernel {
    pub fn isa(self) -> DetectedI8Isa;
    pub fn dot_i8(self, codes: &[i8], row_sum: i32, query: I8QueryOperands<'_>) -> i32;
}
pub fn detect_i8() -> I8Kernel;
pub fn current_i8() -> I8Kernel;
pub fn available_i8_kernels() -> Vec<I8Kernel>;
#[inline(never)]
pub fn dot_i8_scalar(a: &[i8], b: &[i8]) -> i32;

// --- isa/x86_block4.rs / isa/neon_block4.rs（dot_block4 の intrinsics 実装） ---
#[target_feature(enable = "avx2,fma")]
pub(super) fn dot_block4_avx2_fma<const PADDED_TAIL: bool>(
    rows: [&[f32]; 4], query: &[f32],
    out0: &mut f32, out1: &mut f32, out2: &mut f32, out3: &mut f32,
);
#[target_feature(enable = "avx512f")]
pub(super) fn dot_block4_avx512<const PADDED_TAIL: bool>(
    rows: [&[f32]; 4], query: &[f32],
    out0: &mut f32, out1: &mut f32, out2: &mut f32, out3: &mut f32,
);
#[target_feature(enable = "neon")]
#[inline(never)]
pub(super) fn dot_block4_neon<const PADDED_TAIL: bool>(
    rows: [&[f32]; 4], query: &[f32],
    out0: &mut f32, out1: &mut f32, out2: &mut f32, out3: &mut f32,
);

// --- isa/x86_i8.rs / isa/neon_i8.rs（dot_i8 の intrinsics 実装） ---
#[target_feature(enable = "avx512f,avx512bw,avx512vnni")]
pub(super) fn dot_i8_avx512_vnni(codes: &[i8], shifted: &[u8]) -> i32;
#[target_feature(enable = "avx2,avxvnni")]
pub(super) fn dot_i8_avx_vnni(codes: &[i8], shifted: &[u8]) -> i32;
#[target_feature(enable = "avx2")]
pub(super) fn dot_i8_avx2_widen(codes: &[i8], signed: &[i8]) -> i32;
#[target_feature(enable = "neon,dotprod")]
#[inline(never)]
pub(super) fn dot_i8_neon_dotprod(codes: &[i8], signed: &[i8]) -> i32;
```

## Notes

- `chip-kernel-guidelines`（ADR）: Rust stable で実現可能なチップ別（Intel/AMD/Apple Silicon/ARM/GPU）カーネル設計指針。`#[target_feature]` 付き fn 内の intrinsics はポインタ load/store 以外が safe という前提を機械検証したうえで、f16 昇格・i8 VNNI・prefetch 等の最適化施策を優先度付けする判定基盤。
- `simd-intrinsics-adoption`（ADR）: SIMD intrinsics 導入の統一基準（ポインタ load 禁止・固定長配列からの `set` 構築への統一、生成コード検査ガード必須化、sealed トークンベースディスパッチ、stable toolchain 対応、ANN 索引への低精度常駐限定）を確定し、f16・i8・NEON dotprod 等の候補導入を個別再発明させない。
- `simd-codegen-guard`（ADR）は生成アセンブリの検査ガード運用を扱う（本ページはシグネチャのみで詳細検証手順は spec 側）。
- `dot-kernel-branchless-tail` / `dot-kernel-multi-accumulator` / `dot-kernel-row-block`（ADR）は `dot` / `dot_with_scalar_tail` / `dot_with_padded_tail` / `dot_block4` の分岐削減・複数アキュムレータ・行ブロック化という内積カーネル最適化の設計判断を記録する（本ページは公開シグネチャのみ引用し、詳細な数値・ベンチ結果は転記しない）。
- トークン型（`NeonToken` 等）のコンストラクタ `try_new` はすべて `pub(crate)`。crate 外からは `detect()` / `current()` 経由でのみ ISA 判定結果を得る。
- This crate's SIMD dispatch is Rust `std::arch` intrinsics behind `#[target_feature]`, entirely distinct from CUDA C++/PTX/CUTLASS (`nvidia-cuda`), Metal Shading Language/MPS/MLX (`apple-silicon`), or HIP (`amd-rocm`). No API overlap with `fandhe-ai` (same org, separate Rust AI/ML library).

## Related

- [kernel](./kernel.md)
- [dispatch](./dispatch.md)
- [f16](./f16.md)
- [sq8](./sq8.md)
