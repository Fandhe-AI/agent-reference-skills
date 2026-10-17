---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/trait.Scalar.html
---

# dtype 抽象（Scalar / CastDType / TypedOps / TapeF64）

f32 以外の dtype を扱うための 3 系統: ① dtype タグと封印 trait（`Scalar` / `ScalarDType` / `CastElement` / `CastDType`）、② `Var` を経由しない dtype 別演算集合 `TypedOps<T>`（`Tape::typed_ops_*`）、③ f64 専用の独立した自動微分グラフ（`TapeF64` / `VarF64` / `GradientsF64`）。`Var` 自体は常に f32 で、dtype 変換は `Var::cast` / `Tape::var_from` を使う。

## Signature / Usage

```rust
use fandhe_ai::{TapeF64, Tensor};

let tape = fandhe_ai::tape();
let g = TapeF64::new(&tape);
let x = g.var(&Tensor::<f64>::new(vec![3.0], &[1]).unwrap());
let y = x.mul(&x).unwrap(); // y = x^2
let grads = g.backward(&y.sum(None).unwrap()).unwrap();
assert_eq!(grads.get(&x).unwrap().unwrap().as_slice().unwrap(), &[6.0]);
```

## Options / Props

dtype タグ・封印 trait:

| Name | Type | Description |
| --- | --- | --- |
| `Scalar` | `pub trait Scalar: Element + Sealed { const DTYPE: ScalarDType; }` | 演算対象になりうる dtype の capability 境界。実装は `f32` / `f64` / `half::f16` / `half::bf16` の 4 型に封印されており、外部クレートが新しい dtype に実装することはできない |
| `ScalarDType` | `#[non_exhaustive] enum { F32, F64, F16, Bf16 }` | 演算対象 dtype のタグ（`F16` は `half::f16`、`Bf16` は `half::bf16`）。`Var::*_low_precision` の `dtype` 引数にも使う。`dispatch_dtype(self) -> Option<DType>` は `F32` / `F16` のみ `Some`（GEMM 経路選択規則の対象） |
| `CastElement` | `pub trait CastElement: Element + Sealed` | cast 対象 dtype の capability 境界。実装は `f32` / `f64` / `i32` / `i64` / `bool` の 5 型に封印。`const CAST_DTYPE: CastDType`、`fn from_f32(v: f32) -> Self`、`fn into_f32(self) -> f32` を持つ |
| `CastDType` | `#[non_exhaustive] enum { F32, F64, I32, I64, Bool }` | cast 対象 dtype のタグ。`ScalarDType` とは別 enum（`I32` / `I64` / `Bool` が `Scalar` の意味論を汚染しないため） |

dtype 変換（`Var` のメソッド / `Tape` のメソッド）:

| Name | Type | Description |
| --- | --- | --- |
| `Var::cast<T: CastElement>(&self) -> Result<Tensor<T>, AutodiffError>` | メソッド | `self` を `Tensor<T>` へ変換。非微分で detached。`T = f32` でも detached なコピーを返し勾配は伝播しない |
| `Var::to_f32(&self) -> Var<'t>` | メソッド | f32 系の恒等射。`self` をそのまま返し、勾配は通常どおり伝播する |
| `Tape::var_from<T: CastElement>(&self, tensor: &Tensor<T>) -> Result<Var<'_>, AutodiffError>` | メソッド | 非 f32 のテンソルを f32 へ変換して葉ノード `Var` として登録（`Tape::var` の dtype 変換版） |
| `Var::host_view(&self) -> VarHostView` | メソッド | 現在値の借用ビューを返す |
| `VarHostView` | `pub struct`（`Deref<Target = [f32]>`、`Debug`） | `contiguous` 済みの `Tensor<f32>` を保持する。ライフタイムパラメータを持たず `Tape` / `RefCell` の借用を保持しないため、生存中に同じ `Var` / `Tape` へノード追加演算を呼んでも panic しない（`Var::value` の借用注意とは異なる） |

dtype 別演算集合（`Var` / autograd を経由しない。tape に記録されず勾配は付かない）:

| Name | Type | Description |
| --- | --- | --- |
| `Tape::typed_ops_f64(&self) -> Option<&dyn TypedOps<f64>>` | メソッド | f64 演算本体への capability accessor。バックエンドが対応しなければ `None`（fail-closed。例: Metal は f64 型自体が既定非対応） |
| `Tape::typed_ops_f16(&self) -> Option<&dyn TypedOps<f16>>` | メソッド | `half::f16` 版。`half::f16` を名指しするには利用者が `half` クレート（本 workspace と同一バージョン）へ直接依存する（facade は `half` を再エクスポートしない） |
| `Tape::typed_ops_bf16(&self) -> Option<&dyn TypedOps<bf16>>` | メソッド | `half::bf16` 版 |
| `TypedOps<T: Scalar>` | `pub trait` | 8 演算限定: `gemm(&self, a: &Tensor<T>, b: &Tensor<T>)`、`add(&self, a, b)`、`mul(&self, a, b)`（以上 `-> Result<Tensor<T>, BackendError>`）、`relu(&self, a)`、`exp(&self, a)`、`tanh(&self, a)`（`-> Result<Tensor<T>, BackendError>`）、`sum(&self, a: &Tensor<T>, dim: Option<usize>)`、`max(&self, a: &Tensor<T>, dim: Option<usize>)`（`-> Result<Tensor<T>, BackendError>`） |

f64 専用の独立自動微分グラフ:

| Name | Type | Description |
| --- | --- | --- |
| `TapeF64::new(tape: &'t Tape) -> Self` | 関数 | facade の `Tape` に結線した f64 グラフを作る（バックエンドは `tape` のもの） |
| `var(&self, value: &Tensor<f64>) -> VarF64<'_, 't>` | メソッド | 勾配追跡ありの f64 葉ノードを登録 |
| `var_no_grad(&self, value: &Tensor<f64>) -> VarF64<'_, 't>` | メソッド | 勾配追跡なしの f64 葉ノード（`GradientsF64::get` は `GradientTrackingDisabled`） |
| `backward(&self, loss: &VarF64<'_, 't>) -> Result<GradientsF64, AutodiffError>` | メソッド | 別テープの変数は `TapeMismatch`、勾配追跡対象を持たない loss は `Backward`。非スカラー loss は全要素 1 のシードで逆伝播 |
| `VarF64<'g, 't>` | `#[derive(Clone, Copy)] pub struct` | `value(&self) -> Tensor<f64>`、`shape(&self) -> Vec<usize>`、`add` / `mul`（ブロードキャストあり）、`div` / `pow`（常にホスト計算）、`matmul`（rank 2 限定）、`sum(dim: Option<usize>)` / `mean(dim: Option<usize>)` / `max(dim: Option<usize>)`（`keepdim` なし）。演算は `(&self, other: &Self) -> Result<Self, AutodiffError>` |
| `GradientsF64` | `pub struct` | `get(&self, var: &VarF64<'_, '_>) -> Result<Option<&Tensor<f64>>, AutodiffError>`。loss から未到達なら `Ok(None)`、別テープは `TapeMismatch`、`var_no_grad` の葉は `GradientTrackingDisabled` |

## Notes

- `TapeF64` は f32 グラフとは独立で、f32 の `Var` から勾配は流れない。f32 側の値は `Var::cast::<f64>()` が返す勾配の切れた `Tensor<f64>` を `TapeF64::var` へ渡す経路のみで取り込む
- f64 グラフの制約: `matmul` は rank 2 限定、縮約は `dim: Option<usize>` のみ。全軸 `sum` の CPU ネイティブとホストの bit 一致は 4096 要素以下。Metal は常にホスト計算、`div` / `pow` は常にホスト計算。CUDA / Metal 実機 parity は未実測
- `typed_ops_*` が `Some` を返しても、個々の演算が `BackendError::Unsupported` を返す場合がある（例: CUDA の `TypedOps<f64>` は 8 演算すべて `Unsupported`）。`Some` / `None` は型としての対応可否のみを表す
- `Var` の低精度 forward（`add_low_precision` 等）は `var-elementwise.md` を参照

## Related

- [var](./var.md)
- [tape](./tape.md)
- [tensor](./tensor.md)
- [var-elementwise](./var-elementwise.md)
