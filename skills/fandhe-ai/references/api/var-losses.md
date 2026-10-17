---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Var.html
---

# Var: loss methods

`Var` に生えた損失関数メソッド 25 種。`self` が予測値（logits / input）。縮約種別は `Reduction`、オプション型は `fandhe_ai::nn::loss` 経由で名指しする。構造体ラッパー（`MseLoss` / `CrossEntropyLoss` 等）と `Reduction` / オプション型の定義は `nn/loss.md` を参照。

## Signature / Usage

```rust
use fandhe_ai::nn::loss::Reduction;

let tape = fandhe_ai::tape();
let pred = tape.var(&pred_tensor);
let target = tape.var(&target_tensor);
let loss = pred.mse_loss_with(&target, Reduction::Sum)?;
let ce = logits.cross_entropy_loss(&class_ids, 1, Reduction::Mean)?; // class_ids: &Tensor<i32>
```

## Options / Props

回帰・確率系（戻り値は全て `Result<Var<'t>, AutodiffError>`）:

| Name | Type | Description |
| --- | --- | --- |
| `mse_loss(&self, target: &Var<'t>)` | メソッド | 平均二乗誤差。`mse_loss_with(target, Reduction::Mean)` への委譲 |
| `mse_loss_with(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | `reduction` で mean / sum を選択 |
| `l1_loss(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | L1 損失。テープ不一致・shape 不一致は型付きエラー |
| `huber_loss(&self, target: &Var<'t>, delta: f32, reduction: Reduction)` | メソッド | `abs(d) < delta` で `0.5·d²`、それ以外は `delta·(abs(d) − 0.5·delta)`。`delta` は有限かつ `> 0` |
| `smooth_l1_loss(&self, target: &Var<'t>, beta: f32, reduction: Reduction)` | メソッド | 二次分岐が `0.5·d²/beta`。`beta` は有限かつ `> 0`（`beta = 0` は `InvalidArgument`。`beta = 1.0` で `huber_loss` と一致） |
| `bce_loss(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | `self` は予測確率 `[0, 1]`（範囲検査あり） |
| `bce_with_logits_loss(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | `self` は未正規化 logits（範囲検査なし）。sigmoid を内包した数値安定な式 |
| `bce_with_logits_loss_with(&self, target: &Var<'t>, reduction: Reduction, options: &BceWithLogitsOptions)` | メソッド | `pos_weight` 等のオプション付き。引数順は `(target, reduction, options)` で他のオプション付き損失と異なる |
| `kl_div_loss(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | `self` は log 確率、`target` は確率（`log_target=False`） |
| `kl_div_loss_with_log_target(&self, target: &Var<'t>, reduction: Reduction)` | メソッド | `target` も対数確率（`log_target=True`） |
| `gaussian_nll_loss(&self, target: &Var<'t>, var: &Var<'t>, options: &GaussianNllOptions, reduction: Reduction)` | メソッド | ガウス負の対数尤度。`target` / `var` は追跡対象 |
| `poisson_nll_loss(&self, target: &Var<'t>, options: &PoissonNllOptions, reduction: Reduction)` | メソッド | Poisson 負の対数尤度。`eps` 不正は型付きエラー |

分類・ラベル系:

| Name | Type | Description |
| --- | --- | --- |
| `cross_entropy_loss(&self, targets: &Tensor<i32>, class_dim: usize, reduction: Reduction)` | メソッド | `self` が logits。`targets` は非追跡のクラス添字で `0 <= t < C`（違反は `InvalidArgument`）。`class_dim >= rank` は `AxisOutOfRange`。log-sum-exp で安定化 |
| `cross_entropy_loss_with(&self, targets: &Tensor<i32>, class_dim: usize, reduction: Reduction, options: &CrossEntropyOptions)` | メソッド | `label_smoothing` / `ignore_index` / `class_weight` 付き。オプションが既定値なら `cross_entropy_loss` へ丸ごと委譲 |
| `nll_loss(&self, targets: &Tensor<i32>, class_dim: usize, reduction: Reduction)` | メソッド | `self` が log 確率。検査は `cross_entropy_loss` と同じ |
| `multi_margin_loss(&self, target: &Tensor<i32>, options: &MultiMarginOptions, reduction: Reduction)` | メソッド | `target` はクラス添字 |
| `multilabel_margin_loss(&self, target: &Tensor<i32>, reduction: Reduction)` | メソッド | `target` は `self` と同 shape のクラス添字で、行ごとに最初の負値の手前までが target 列 |
| `multilabel_soft_margin_loss(&self, target: &Tensor<f32>, options: &MultiLabelSoftMarginOptions, reduction: Reduction)` | メソッド | `target` は同 shape の 0 / 1 |
| `sigmoid_focal_loss(&self, target: &Tensor<f32>, options: &SigmoidFocalLossOptions, reduction: Reduction)` | メソッド | `torchvision.ops.sigmoid_focal_loss` 相当。`target` は同 shape の 0 / 1 |
| `ctc_loss(&self, targets: &Tensor<i32>, input_lengths: &[usize], target_lengths: &[usize], options: &CtcLossOptions, reduction: Reduction)` | メソッド | `self` が `log_probs`（`[T, N, C]`）。rank / 長さ不一致・`blank >= C`・target 値域外・確保前上限超過は型付きエラー |

距離・マージン系:

| Name | Type | Description |
| --- | --- | --- |
| `cosine_embedding_loss(&self, x2: &Var<'t>, y: &Tensor<f32>, margin: f32, reduction: Reduction)` | メソッド | `self` が x1。`y` は `+1` / `-1`（それ以外は拒否）、`margin` は有限 |
| `margin_ranking_loss(&self, x2: &Var<'t>, y: &Tensor<f32>, margin: f32, reduction: Reduction)` | メソッド | `self` が x1。`y` は `+1` / `-1`、`margin` は有限 |
| `triplet_margin_loss(&self, positive: &Var<'t>, negative: &Var<'t>, options: &TripletMarginOptions, reduction: Reduction)` | メソッド | `self` が anchor。`p < 1`・`eps` 負などは型付きエラー |
| `hinge_embedding_loss(&self, y: &Tensor<f32>, margin: f32, reduction: Reduction)` | メソッド | `y` は非追跡で同 shape・厳密に `±1` |
| `soft_margin_loss(&self, y: &Tensor<f32>, reduction: Reduction)` | メソッド | `y` は非追跡で同 shape・厳密に `±1` |

縮約種別:

| Name | Type | Description |
| --- | --- | --- |
| `Reduction` | `#[non_exhaustive] enum { Mean, Sum }` | `Mean`: 全要素平均（`Var::mse_loss` の既定）、`Sum`: 全要素総和。`reduction='none'` 相当は無い。`Var::mse_loss_with` の縮約種別として定義され、損失メソッド全般が受け取る |

## Notes

- 損失メソッドの検査（テープ一致・shape・確保前バイト数上限・`label_smoothing` / `class_weight` / target 添字の範囲）は入口で行われ、失敗時は型付きエラーを返す
- PyTorch との差異: `ignore_index` の既定は `None`、ゼロ分母は `0.0`、負の重みは拒否
- オプション型（`CrossEntropyOptions` / `TripletMarginOptions` / `PoissonNllOptions` / `CtcLossOptions` / `BceWithLogitsOptions` / `GaussianNllOptions` / `MultiMarginOptions` / `MultiLabelSoftMarginOptions` / `SigmoidFocalLossOptions`）は `fandhe_ai::nn::loss` 経由のみで公開される
- 構造体ラッパー版（`MseLoss` 等）と `compat::Loss`（`compile()` / `fit` 用）は別レイヤー

## Related

- [var](./var.md)
- [var-reduction](./var-reduction.md)
- [nn/loss](../nn/loss.md)
- [compat-training](./compat-training.md)
