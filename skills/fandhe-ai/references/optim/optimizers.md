---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/optim/index.html
---

# Optimizers（Sgd / Adam / AdamW / RmsProp / Adagrad / Lamb / Adadelta / Adamax / NAdam / RAdam / Adafactor / Lion / Rprop / Asgd / Lbfgs）

`fandhe_ai::optim` は optimizer 15 種を単一の入口で公開する。いずれも `Tape` / `Var` / `BackendOps` に依存しない値型で、`step()` はパラメータと勾配の `Tensor<f32>` 参照を受け取り、更新後の `Tensor<f32>` の列を返す関数型 API。`Sgd` は `fandhe_ai_autodiff::optim`、他は `fandhe_ai_autodiff::nn::optim` からの素の再エクスポート。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::optim::{Lion, LionConfig, LrScheduler, PolynomialLr, Rprop, RpropConfig};

let p = Tensor::new(vec![1.0f32, 2.0], &[2])?;
let g = Tensor::new(vec![0.5f32, -0.5], &[2])?;
let mut rprop = Rprop::new(RpropConfig::default())?;
assert_eq!(rprop.step(&[(&p, &g)])?.len(), 1);
let mut lion = Lion::new(LionConfig::default())?;
assert_eq!(lion.step(&[(&p, &g)])?.len(), 1);
```

```rust
// Sgd のみ params / grads を別スライスで受け取る（他は (param, grad) の tuple 列）
pub fn Sgd::new(config: SgdConfig) -> Result<Sgd, AutodiffError>
pub fn Sgd::step(&mut self, params: &[&Tensor<f32>], grads: &[&Tensor<f32>])
    -> Result<Vec<Tensor<f32>>, AutodiffError>

// AdamW / Adam / Lamb / Adadelta / Adamax / NAdam / RAdam ほか
pub fn AdamW::new(config: AdamWConfig) -> Result<AdamW, AutodiffError>
pub fn AdamW::step(&mut self, params_and_grads: &[(&Tensor<f32>, &Tensor<f32>)])
    -> Result<Vec<Tensor<f32>>, AutodiffError>
```

`SgdConfig` はビルダーを持つ: `SgdConfig::new(lr)` → `with_momentum` / `with_dampening` / `with_weight_decay` / `with_nesterov`。

## Options / Props

### Optimizer 一覧

| Name | Config | Description |
| --- | --- | --- |
| `Sgd` | `SgdConfig` | SGD（momentum・dampening・weight decay・nesterov）。`torch.optim.SGD` と同じ更新則 |
| `Adam` | `AdamConfig` | coupled L2 weight decay（勾配へ `weight_decay * param` を加算）。`weight_decay == 0` で `AdamW` と bit 一致 |
| `AdamW` | `AdamWConfig` | decoupled weight decay（パラメータへ直接乗算）。Loshchilov & Hutter, 2019 |
| `RmsProp` | `RmsPropConfig` | RMSprop。`centered` / `momentum` 対応。`eps` は `sqrt` の後に加算 |
| `Adagrad` | `AdagradConfig` | Adagrad。`lr_decay` / `initial_accumulator_value` 対応 |
| `Lamb` | `LambConfig` | layer-wise trust ratio。weight decay は更新方向へ coupled に織り込む |
| `Adadelta` | `AdadeltaConfig` | Adadelta。`eps` は `sqrt` の内側に加算 |
| `Adamax` | `AdamaxConfig` | 無限 norm 版 Adam |
| `NAdam` | `NAdamConfig` | Nesterov momentum 付き Adam。`decoupled_weight_decay` 切替 |
| `RAdam` | `RAdamConfig` | Rectified Adam。`decoupled_weight_decay` 切替 |
| `Adafactor` | `AdafactorConfig` | 因子分解した第 2 モーメント（rank >= 2 は末尾 2 次元で因子分解） |
| `Lion` | `LionConfig` | 符号ベース更新。decoupled weight decay |
| `Rprop` | `RpropConfig` | 勾配符号に基づく step size 適応 |
| `Asgd` | `AsgdConfig` | Averaged SGD |
| `Lbfgs` | `LbfgsConfig` | closure 駆動の L-BFGS。`LbfgsLineSearch` で line search 方式を選ぶ |

### Config の既定値

| Config | 既定値 |
| --- | --- |
| `SgdConfig` | `SgdConfig::new(lr)`: momentum `0.0` / dampening `0.0` / weight_decay `0.0` / nesterov `false`（`lr` は既定なし） |
| `AdamConfig` | lr `1e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-8` / weight_decay `0.0` |
| `AdamWConfig` | lr `1e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-8` / weight_decay `0.01` |
| `RmsPropConfig` | lr `1e-2` / alpha `0.99` / eps `1e-8` / weight_decay `0.0` / momentum `0.0` / centered `false` |
| `AdagradConfig` | lr `1e-2` / lr_decay `0.0` / weight_decay `0.0` / initial_accumulator_value `0.0` / eps `1e-10` |
| `LambConfig` | lr `1e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-6` / weight_decay `0.0` |
| `AdadeltaConfig` | lr `1.0` / rho `0.9` / eps `1e-6` / weight_decay `0.0` |
| `AdamaxConfig` | lr `2e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-8` / weight_decay `0.0` |
| `NAdamConfig` | lr `2e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-8` / weight_decay `0.0` / momentum_decay `4e-3` / decoupled_weight_decay `false` |
| `RAdamConfig` | lr `1e-3` / beta1 `0.9` / beta2 `0.999` / eps `1e-8` / weight_decay `0.0` / decoupled_weight_decay `false` |
| `AdafactorConfig` | lr `1e-2` / beta2_decay `-0.8` / eps1 `f32::EPSILON` / eps2 `1e-3` / d `1.0` / weight_decay `0.0` |
| `LionConfig` | lr `1e-4` / beta1 `0.9` / beta2 `0.99` / weight_decay `0.0` |
| `RpropConfig` | lr `1e-2` / eta_minus `0.5` / eta_plus `1.2` / step_size_min `1e-6` / step_size_max `50.0` |
| `AsgdConfig` | lr `1e-2` / lambd `1e-4` / alpha `0.75` / t0 `1e6` / weight_decay `0.0` |
| `LbfgsConfig` | lr `1.0` / max_iter `20` / max_eval `None`（`max_iter * 5 / 4` に解決）/ tolerance_grad `1e-7` / tolerance_change `1e-9` / history_size `100` / line_search `LbfgsLineSearch::None` / line_search_steps `25` |

### Config のフィールド（既定値以外の補足）

| Config | Field | Description |
| --- | --- | --- |
| `SgdConfig` | `lr` / `momentum` / `dampening` / `weight_decay` / `nesterov` | `weight_decay` は L2（decoupled ではない） |
| `AdamConfig` | `lr` / `beta1` / `beta2` / `eps` / `weight_decay` | beta は `[0.0, 1.0)`。eps は有限かつ `> 0.0`。`weight_decay` は coupled L2 |
| `AdamWConfig` | `lr` / `beta1` / `beta2` / `eps` / `weight_decay` | フィールド構成は `LambConfig` と同一 |
| `RmsPropConfig` | `alpha` | 二乗移動平均の減衰率。`[0.0, 1.0)` |
| `RmsPropConfig` | `momentum` | `> 0.0` で `buf = momentum*buf + g/avg` 経由の更新 |
| `RmsPropConfig` | `centered` | `true` で `avg = sqrt(square_avg - grad_avg^2)` |
| `AdagradConfig` | `initial_accumulator_value` | `state_sum` の初期値（0 スタートではない） |
| `AdadeltaConfig` | `rho` | `[0.0, 1.0)` |
| `NAdamConfig` | `momentum_decay` | momentum cache `mu` の減衰係数（`0.96^(step*momentum_decay)`） |
| `NAdamConfig` / `RAdamConfig` | `decoupled_weight_decay` | `true` で decoupled、`false` で coupled |
| `AdafactorConfig` | `beta2_decay` | 有限かつ `<= 0.0` |
| `AdafactorConfig` | `eps1` / `eps2` / `d` | eps1 は分母の下限、eps2 はパラメータ RMS の下限、d は更新クリップ閾値（`>= 1.0`） |
| `LionConfig` | `beta1` / `beta2` | 更新方向の補間係数 / 移動平均の減衰係数。いずれも `[0, 1)` |
| `RpropConfig` | `eta_minus` / `eta_plus` | `0 < eta_minus < 1 < eta_plus` |
| `RpropConfig` | `step_size_min` / `step_size_max` | `0 <= step_size_min <= step_size_max` |
| `AsgdConfig` | `lambd` / `alpha` / `t0` | 減衰項係数 / `eta` 更新のべき指数 / 平均化を開始する step |
| `LbfgsConfig` | `line_search_steps` | strong Wolfe 1 回あたりの試行上限の追加キャップ。実効値は `min(line_search_steps, max_eval - current_evals)` |

### LbfgsLineSearch

| Variant | Description |
| --- | --- |
| `None` | 固定ステップ（`torch.optim.LBFGS(line_search_fn=None)` 相当） |
| `StrongWolfe` | strong Wolfe 条件による line search |

`LbfgsLineSearch` は `#[non_exhaustive]`。

### Lbfgs（closure 駆動）

```rust
pub fn Lbfgs::new(config: LbfgsConfig) -> Result<Lbfgs, AutodiffError>
pub fn Lbfgs::step_closure<F>(&mut self, params: &[Tensor<f32>], closure: F)
    -> Result<Vec<Tensor<f32>>, AutodiffError>
where F: FnMut(&[Tensor<f32>]) -> (f32, Vec<Tensor<f32>>)
pub fn Lbfgs::try_step_closure<F>(&mut self, params: &[Tensor<f32>], closure: F)
    -> Result<Vec<Tensor<f32>>, AutodiffError>
where F: FnMut(&[Tensor<f32>]) -> Result<(f32, Vec<Tensor<f32>>), AutodiffError>
```

```rust
use fandhe_ai::Tensor;
use fandhe_ai::optim::{Lbfgs, LbfgsConfig, LbfgsLineSearch};

let cfg = LbfgsConfig {
    line_search: LbfgsLineSearch::StrongWolfe,
    ..LbfgsConfig::default()
};
let mut opt = Lbfgs::new(cfg).unwrap();
let params = vec![Tensor::new(vec![0.0_f32; 2], &[2]).unwrap()];
// f(x) = Σ (x - 1)^2 を最小化する。
let updated = opt
    .step_closure(&params, |p| {
        let x = p[0].contiguous();
        let x = x.as_slice().unwrap();
        let loss = x.iter().map(|v| (v - 1.0) * (v - 1.0)).sum::<f32>();
        let g = x.iter().map(|v| 2.0 * (v - 1.0)).collect::<Vec<f32>>();
        (loss, vec![Tensor::new(g, &[2]).unwrap()])
    })
    .unwrap();
```

## Notes

- 呼び出し文脈: `step` に渡す `params` / `grads` の順序は `compat::Sequential::trainable_parameters` と `SequentialVars::trainable_grads` が返す列の位置に対応させる契約
- `Sgd::step` は `&[&Tensor<f32>]` 2 本、`AdamW` / `Adam` / `Lamb` ほかは `&[(&Tensor<f32>, &Tensor<f32>)]`。この形の相違は統一されておらず、将来統一する場合は破壊的変更になる
- 1 学習ステップの順序は `backward -> clip -> optimizer step`。AMP 使用時の順序は `grad-scaling-clipping.md` を参照
- `Adam` と `AdamW` は `weight_decay > 0` のとき異なる更新値を生む。既定の `weight_decay` も異なる（Adam `0.0`、AdamW `0.01`）
- `Lamb` の既定 `eps` は `1e-6`（`Adam` / `AdamW` の `1e-8` と異なる）
- `Rprop` / `Asgd` / `Adafactor` / `Lion` は `compat::Optimizer` enum に結線されておらず、手動ループで `step` を呼ぶ。`Adadelta` / `Adamax` / `NAdam` / `RAdam` も `compat::Optimizer`（`compile()`）に未統合
- `Rprop` / `Asgd` / `Adafactor` / `Lion` は `ParamGroupStep` を持たない（グループ別学習率は対象外）。`Lbfgs` も `ParamGroupStep` の対象外
- `DeviceParamStore` 結線（`Tape::step_device_param_store*`）は `Sgd` / `Adam` / `AdamW` / `RmsProp` / `Adagrad` / `Lamb`。CPU 実装のみで CUDA / Metal は `Unsupported` のまま。`Adadelta` / `Adamax` / `NAdam` / `RAdam` は非対応
- `fandhe_ai::optim` の再エクスポートはホスト `Tensor<f32>` を介した step であり、ステップごとのホスト・デバイス往復コストは解消しない
- `Lbfgs` は `compat::Optimizer::Lbfgs` に `LbfgsConfig` を渡すと `Sequential::compile` / `fit` が内部で `try_step_closure` を駆動する。`OptimizerStateDict` は実装せず、inherent の `state_dict` / `load_state_dict` / `history_len` を使う
- `Lion` は `torch.optim` に存在しないため、参照値は google/automl の更新則を PyTorch のテンソル演算で実行した値。torch の `sign` と同様 `±0.0` と NaN は 0 として扱う
- 状態の保存・復元と param groups は `param-groups-state.md` を参照
- 本ページの既定値は `fandhe-ai` 0.11.0 同梱の `fandhe-ai-autodiff` 0.11.0 のソースによる

## Related

- [Param groups and state](./param-groups-state.md)
- [LR schedulers](./lr-schedulers.md)
- [Grad scaling and clipping](./grad-scaling-clipping.md)
- [EMA / SWA](./ema-swa.md)
