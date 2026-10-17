---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/loss/index.html
---

# nn::loss（損失構造体 14 種 + Reduction / オプション型）

PyTorch `nn.MSELoss` / `nn.CrossEntropyLoss` 等に相当する損失構造体 14 種と引数型 10 種（`Reduction` + オプション型 9 種）の純再エクスポートモジュール（`fandhe_ai_autodiff::nn::loss` から）。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::nn::loss::{CrossEntropyLoss, MseLoss, Reduction};

let tape = fandhe_ai::tape();
let pred = tape.var(&Tensor::new(vec![1.0f32, 2.0], &[2]).unwrap());
let target = tape.var(&Tensor::new(vec![0.0f32, 0.0], &[2]).unwrap());
let loss = MseLoss::new(Reduction::Sum).forward(&pred, &target).unwrap();
assert_eq!(loss.to_tensor().host_slice().into_owned(), [5.0f32]);

let _ce = CrossEntropyLoss { class_dim: 1, reduction: Reduction::Mean };
```

## Options / Props

損失構造体（`forward` はいずれも `Result<Var<'t>, AutodiffError>` を返す。検査は委譲先が行う）:

| Name | Constructor | forward 引数 | Default |
| --- | --- | --- | --- |
| `MseLoss` | `new(reduction: Reduction)` | `pred: &Var, target: &Var` | `Reduction::Mean` |
| `L1Loss` | `new(reduction: Reduction)` | `pred: &Var, target: &Var` | `Reduction::Mean` |
| `HuberLoss` | `new(delta: f32, reduction: Reduction)` | `pred: &Var, target: &Var` | `delta = 1.0`, `Mean` |
| `SmoothL1Loss` | `new(beta: f32, reduction: Reduction)` | `pred: &Var, target: &Var` | `beta = 1.0`, `Mean` |
| `BceLoss` | `new(reduction: Reduction)` | `input: &Var`（確率 `[0, 1]`）, `target: &Var` | `Mean` |
| `BceWithLogitsLoss` | `new(reduction: Reduction)` | `input: &Var`（logits）, `target: &Var` | `Mean` |
| `CrossEntropyLoss` | pub フィールド `class_dim: usize`, `reduction: Reduction`（`new` / `Default` なし、構造体リテラルで構築） | `forward(logits: &Var, targets: &Tensor<i32>)` / `forward_with(logits, targets, options: &CrossEntropyOptions)` | — |
| `NllLoss` | `new(class_dim: usize, reduction: Reduction)` | `input: &Var`（log 確率）, `targets: &Tensor<i32>` | `class_dim = 1`, `Mean` |
| `KlDivLoss` | `new(reduction)` / `new_with_log_target(reduction, log_target: bool)` | `input: &Var`（log 確率）, `target: &Var` | `Mean`, `log_target = false` |
| `CosineEmbeddingLoss` | `new(margin: f32, reduction: Reduction)` | `x1: &Var, x2: &Var, y: &Tensor<f32>`（`+1` / `-1`） | `margin = 0.0`, `Mean` |
| `MarginRankingLoss` | `new(margin: f32, reduction: Reduction)` | `x1: &Var, x2: &Var, y: &Tensor<f32>`（`+1` / `-1`） | `margin = 0.0`, `Mean` |
| `TripletMarginLoss` | `new(options: TripletMarginOptions, reduction: Reduction)` | `anchor, positive, negative: &Var` | 既定オプション, `Mean` |
| `PoissonNllLoss` | `new(options: PoissonNllOptions, reduction: Reduction)` | `input: &Var, target: &Var` | 既定オプション, `Mean` |
| `CtcLoss` | `new(options: CtcLossOptions, reduction: Reduction)` | `log_probs: &Var`（`[T, N, C]`）, `targets: &Tensor<i32>`, `input_lengths: &[usize]`, `target_lengths: &[usize]` | 既定オプション, `Mean` |

引数型:

| Name | Description |
| --- | --- |
| `Reduction` | `#[non_exhaustive] enum { Mean, Sum }`（`reduction='none'` 相当は無い） |
| `CrossEntropyOptions` | ビルダー: `label_smoothing(eps: f32)` / `ignore_index(index: i32)` / `class_weight(weight: Tensor<f32>)`。既定値のとき `forward` と bit 完全一致 |
| `TripletMarginOptions` | ビルダー: `margin(f32)` / `p(f32)` / `eps(f32)` / `swap(bool)`。既定 `margin=1.0`・`p=2.0`・`eps=1e-6`・`swap=false` |
| `PoissonNllOptions` | ビルダー: `log_input(bool)` / `full(bool)` / `eps(f32)`。既定 `log_input=true`・`full=false`・`eps=1e-8` |
| `CtcLossOptions` | ビルダー: `blank(usize)` / `zero_infinity(bool)`。既定 `blank=0`・`zero_infinity=false` |
| `BceWithLogitsOptions` | ビルダー: `pos_weight(Tensor<f32>)`。`Var::bce_with_logits_loss_with(target, reduction, options)` が取る（引数順は `(target, reduction, options)`） |
| `GaussianNllOptions` | ビルダー: `full(bool)` / `eps(f32)`。`Var::gaussian_nll_loss` が取る |
| `MultiMarginOptions` | ビルダー: `p(u8)` / `margin(f32)` / `weight(Tensor<f32>)`。`Var::multi_margin_loss` が取る |
| `MultiLabelSoftMarginOptions` | ビルダー: `weight(Tensor<f32>)`。`Var::multilabel_soft_margin_loss` が取る |
| `SigmoidFocalLossOptions` | ビルダー: `alpha(Option<f32>)` / `gamma(f32)`。`Var::sigmoid_focal_loss` が取る |

`Var` の損失メソッドが取る引数型（`Reduction` を本モジュールで名指しする）:

```rust
use fandhe_ai::nn::loss::{BceWithLogitsOptions, Reduction};

let x = tape.var(&Tensor::new(vec![0.5f32, -0.5, 1.0, 0.2], &[2, 2]).unwrap());
let t = tape.var(&Tensor::new(vec![1.0f32, 0.0, 1.0, 0.0], &[2, 2]).unwrap());
let pw = Tensor::new(vec![2.0f32, 1.0], &[2]).unwrap();
let opts = BceWithLogitsOptions::default().pos_weight(pw);
let _ = x.bce_with_logits_loss_with(&t, Reduction::Mean, &opts);
let y = Tensor::new(vec![1.0f32, -1.0, 1.0, -1.0], &[2, 2]).unwrap();
let _ = x.hinge_embedding_loss(&y, 1.0, Reduction::Sum);
```

`Var::hinge_embedding_loss` / `Var::soft_margin_loss` / `Var::multilabel_margin_loss` の `Reduction` 引数も本モジュールの型を使う。

## Notes

- `Reduction` とオプション型 9 種は本モジュール経由のみで公開され、crate ルートや `nn` 直下には出ない
- オプション型は `XOptions::default()` にビルダーを連鎖して構築し、値の妥当性検査は呼び出し時に型付きエラーで行う
- 各構造体は `Var` の対応メソッド（または損失自由関数）を呼ぶ薄いラッパー。入力の形状・値域の検査は委譲先（autodiff）が担う
- `CrossEntropyLoss` は pub フィールドの構造体で `Copy`。公開後は pub フィールドと `Copy` 実装が契約として固定される
- `compat::Loss`（`compile()` / `fit` 用）とは別レイヤー。`compat` 側は `api/` を参照

## Related

- [module.md](./module.md)
- [var.md](../api/var.md)
