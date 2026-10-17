---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Var.html
---

# Var: reduction / statistics / sort

`Var` の縮約（sum / mean / max / min / prod / logsumexp / norm）、統計（std / var / median / quantile）、累積演算、ソート・top-k・unique、ビニングのメソッド一覧と、関連オプション型（`TopkOptions` / `UniqueOptions` / `UniqueOutput` / `QuantileInterpolation`）。`dim: Option<usize>` は `None` で全軸縮約（スカラー）。

## Signature / Usage

```rust
use fandhe_ai::TopkOptions;

let tape = fandhe_ai::tape();
let x = tape.var(&input_tensor);
let total = x.sum(None)?;                       // 全軸
let m = x.mean_dims(&[0, 1], true)?;            // 複数軸・keepdim
let (values, indices) = x.topk_with_options(3, TopkOptions::default().with_dim(-1))?;
```

## Options / Props

基本縮約（`Result<Var<'t>, AutodiffError>`。実体化済みで返る）:

| Name | Type | Description |
| --- | --- | --- |
| `sum(&self, dim: Option<usize>)` | メソッド | 総和。`BackendOps::sum` が `Unsupported` を返してもホスト参照実装へはフォールバックせず `AutodiffError::Backend` で伝播する |
| `mean(&self, dim: Option<usize>)` | メソッド | 平均。縮約対象の要素数 0 は `AutodiffError::InvalidArgument`（PyTorch は `NaN`） |
| `max(&self, dim: Option<usize>)` | メソッド | 最大値。同値タイの勾配は先勝ち |
| `min(&self, dim: Option<usize>)` | メソッド | 最小値。空縮約は `InvalidArgument`。`keepdim` / 多軸縮約は非対応 |
| `sum_dims(&self, dims: &[usize], keepdim: bool)` | メソッド | 複数軸の総和。`dims` の空・範囲外・重複は拒否。単一軸なら `sum(Some(d))` と bit 同一 |
| `max_dims(&self, dims: &[usize], keepdim: bool)` | メソッド | 複数軸の最大値（先勝ち勾配） |
| `mean_dims(&self, dims: &[usize], keepdim: bool)` | メソッド | 複数軸の平均 |
| `prod(&self, dim: Option<usize>)` | メソッド | 積（`torch.prod`） |
| `logsumexp(&self, dim: Option<usize>)` | メソッド | 数値安定な log-sum-exp。空縮約は `InvalidArgument` |
| `any(&self, dim: Option<usize>)` / `all(&self, dim: Option<usize>)` | メソッド | f32 の `0.0` / `1.0` マスクで返す。勾配はゼロ |
| `norm_p(&self, p: f32, dim: Option<usize>)` | メソッド | `p` ノルム。`p` は有限かつ正のみ |
| `norm_l1(&self, dim: Option<usize>)` / `norm_l2(&self, dim: Option<usize>)` | メソッド | L1（絶対値の総和）/ L2（`√Σx_i²`）ノルム |
| `amax(&self, dim: Option<usize>)` / `amin(&self, dim: Option<usize>)` | メソッド | 同値タイに勾配を `g/k` で均等分配（`max` / `min` は先勝ち） |

統計:

| Name | Type | Description |
| --- | --- | --- |
| `var(&self, dim: Option<usize>, correction: usize) -> Result<Var<'t>, AutodiffError>` | メソッド | 分散。`correction = 1` が不偏、`0` が母分散。要素数 `n` が `0` または `n <= correction` は `InvalidArgument` |
| `std(&self, dim: Option<usize>, correction: usize) -> Result<Var<'t>, AutodiffError>` | メソッド | 標準偏差。f64 の分散から 1 回だけ `sqrt`。定数列（`std == 0`）の勾配はゼロにマスク |
| `median(&self, dim: Option<usize>) -> Result<Var<'t>, AutodiffError>` | メソッド | 中央値（偶数個は下側） |
| `median_with_indices(&self, dim: usize) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 指定軸の中央値と索引 |
| `kthvalue(&self, k: usize, dim: usize) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | k 番目に小さい値と索引 |
| `quantile(&self, q: f32, dim: Option<usize>, interpolation: QuantileInterpolation) -> Result<Var<'t>, AutodiffError>` | メソッド | 分位数 |
| `nanmean(&self, dim: Option<usize>)` / `nansum(&self, dim: Option<usize>)` | メソッド | NaN を無視した平均・総和（`Result<Var<'t>, AutodiffError>`） |

累積:

| Name | Type | Description |
| --- | --- | --- |
| `cumsum(&self, dim: usize) -> Result<Var<'t>, AutodiffError>` | メソッド | 累積和。出力 shape は入力と同一。`BackendOps::cumsum` が `Unsupported` のときのみホスト実装にフォールバック |
| `cumprod(&self, dim: usize) -> Result<Var<'t>, AutodiffError>` | メソッド | 累積積。`cumsum` と同じフォールバック規律 |
| `cummax(&self, dim: usize)` / `cummin(&self, dim: usize)` | `Result<(Var<'t>, Tensor<i32>), AutodiffError>` | 累積最大・最小値と索引 |
| `logcumsumexp(&self, dim: usize) -> Result<Var<'t>, AutodiffError>` | メソッド | 累積 log-sum-exp |

ソート・選択・unique・ビニング:

| Name | Type | Description |
| --- | --- | --- |
| `argmax(&self, dim: Option<usize>) -> Result<Tensor<i32>, AutodiffError>` | メソッド | 最大値の添字。非微分（tape 非記録）。タイは最初の添字、NaN は無視、空縮約はエラー |
| `argmin(&self, dim: Option<usize>) -> Result<Tensor<i32>, AutodiffError>` | メソッド | 最小値の添字。契約は `argmax` と同一 |
| `sort(&self, dim: usize, descending: bool) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | `(values, index)`。`values` は追跡対象、`index` は非追跡 |
| `argsort(&self, dim: usize, descending: bool) -> Result<Tensor<i32>, AutodiffError>` | メソッド | 元添字のみ。tape にノードを追加しない |
| `topk(&self, k: usize, dim: usize, largest: bool) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | `sorted=True` 固定。`k > dim_size` は `ShapeError::NarrowOutOfBounds` |
| `topk_with_options(&self, k: usize, opts: TopkOptions) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 負 `dim`・`sorted=false` に対応。0-d 入力は拒否 |
| `unique(&self) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 一意値のみ（`sorted=True`）。非微分で detached な `Tensor<f32>` を返す |
| `unique_with_options(&self, opts: UniqueOptions) -> Result<UniqueOutput, AutodiffError>` | メソッド | `return_inverse` / `return_counts` / `dim` 対応。非微分・detached |
| `unique_consecutive(&self, opts: UniqueOptions) -> Result<UniqueOutput, AutodiffError>` | メソッド | 連続する重複のみ畳む。非微分・detached |
| `histc(&self, bins: usize, min: f32, max: f32) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 等幅ヒストグラム。勾配を持たない |
| `searchsorted(&self, values: &Var<'t>, right: bool) -> Result<Tensor<i32>, AutodiffError>` | メソッド | `self` を昇順列として `values` の挿入位置を求める |
| `bucketize(&self, boundaries: &Var<'t>, right: bool) -> Result<Tensor<i32>, AutodiffError>` | メソッド | 各要素の所属バケット索引 |

オプション型:

| Name | Type | Description |
| --- | --- | --- |
| `TopkOptions` | `#[non_exhaustive] struct { dim: isize, largest: bool, sorted: bool }` | `Default` は `dim = -1` / `largest = true` / `sorted = true`。ビルダ: `with_dim(isize)` / `with_largest(bool)` / `with_sorted(bool)`。`dim` は負値で末尾からの相対指定 |
| `UniqueOptions` | `#[non_exhaustive] struct { dim: Option<isize>, return_inverse: bool, return_counts: bool }` | `Default` は `dim = None`（入力全体を平坦化）・追加出力なし。ビルダ: `with_dim(isize)` / `with_return_inverse(bool)` / `with_return_counts(bool)` |
| `UniqueOutput` | `struct { values: Tensor<f32>, inverse: Option<Tensor<i32>>, counts: Option<Tensor<i32>> }` | 要求されなかった出力は `None`。非微分・detached |
| `QuantileInterpolation` | `enum { Linear, Lower, Higher, Midpoint, Nearest }` | `Linear`（下側と上側の線形補間、PyTorch 既定・`Default`）/ `Lower`（下側）/ `Higher`（上側）/ `Midpoint`（中点）/ `Nearest`（最近傍、`.5` は偶数丸め） |

## Notes

- `argmax` / `argmin` / `argsort` / `unique*` / `histc` / `searchsorted` / `bucketize` は非微分で、`Tensor<i32>` / `Tensor<f32>`（detached）を返し `Var` ではない
- `max` / `max_dims` の同値タイ勾配は先勝ちの決定的規約。`torch.amax` 相当の均等分配は `amax` / `amin`（単一軸限定）
- `std` は `var(..).sqrt()` の合成とは異なり、定数列の勾配が `NaN` でなくゼロ（PyTorch `std_backward` と同じ規約）
- `sorted=false` の `topk_with_options` は元添字昇順の決定的な順序契約

## Related

- [var](./var.md)
- [var-elementwise](./var-elementwise.md)
- [var-shape-indexing](./var-shape-indexing.md)
