---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/optim/struct.ParamGroup.html
---

# ParamGroup / ParamGroupStep / OptimizerStateDict

層別の学習率・weight decay を指定する `ParamGroup` / `ParamGroupStep` と、optimizer 内部状態の保存・復元 trait `OptimizerStateDict`。いずれも `fandhe_ai_autodiff::nn::optim` からの素の再エクスポート。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::optim::{ParamGroup, ParamGroupStep, Sgd, SgdConfig};

let mut opt = Sgd::new(SgdConfig::new(0.1)).unwrap();
let p0 = Tensor::new(vec![1.0f32, 1.0], &[2]).unwrap();
let p1 = Tensor::new(vec![1.0f32, 1.0], &[2]).unwrap();
let g = Tensor::new(vec![1.0f32, 1.0], &[2]).unwrap();
// スロット 1 だけを lr = 0.5 のグループへ入れる（スロット 0 は config の lr = 0.1）。
let groups = [ParamGroup::new(vec![1], 0.5, 0.0)];
let out = opt
    .step_with_groups(&[&p0, &p1], &[&g, &g], &groups)
    .unwrap();
assert!((out[0].as_slice().unwrap()[0] - 0.9).abs() < 1e-6);
assert!((out[1].as_slice().unwrap()[0] - 0.5).abs() < 1e-6);
```

```rust
#[non_exhaustive]
pub struct ParamGroup {
    pub params: Vec<usize>,
    pub lr: f32,
    pub weight_decay: f32,
}
impl ParamGroup {
    pub fn new(params: Vec<usize>, lr: f32, weight_decay: f32) -> ParamGroup
}

pub trait ParamGroupStep {
    fn step_with_groups(
        &mut self,
        params: &[&Tensor<f32>],
        grads: &[&Tensor<f32>],
        groups: &[ParamGroup],
    ) -> Result<Vec<Tensor<f32>>, AutodiffError>;
}

pub trait OptimizerStateDict {
    fn state_dict(&self) -> Result<HashMap<String, Tensor<f32>>, AutodiffError>;
    fn load_state_dict(&mut self, state: HashMap<String, Tensor<f32>>)
        -> Result<(), AutodiffError>;
}
```

状態の保存・復元（safetensors 経由）:

```rust
use fandhe_ai::Tensor;
use fandhe_ai::interop::safetensors::{
    load_safetensors_f32_from_bytes, save_safetensors_f32_to_bytes,
};
use fandhe_ai::optim::{AdamW, AdamWConfig, OptimizerStateDict};

let p = Tensor::new(vec![1.0f32, -2.0], &[2]).unwrap();
let g = Tensor::new(vec![0.5f32, 0.25], &[2]).unwrap();

let mut opt = AdamW::new(AdamWConfig::default()).unwrap();
let p1 = opt.step(&[(&p, &g)]).unwrap();

// 保存: 状態を safetensors のバイト列へ。
let bytes = save_safetensors_f32_to_bytes(&opt.state_dict().unwrap(), None).unwrap();

// 復元: 同じ config で作り直して load する。
let mut resumed = AdamW::new(AdamWConfig::default()).unwrap();
resumed
    .load_state_dict(load_safetensors_f32_from_bytes(&bytes).unwrap())
    .unwrap();
```

## Options / Props

### ParamGroup

| Name | Type | Description |
| --- | --- | --- |
| `params` | `Vec<usize>` | このグループに属するパラメータの**スロット添字**列（`step_with_groups` に渡す `params` の位置） |
| `lr` | `f32` | このグループへ適用する学習率（絶対値）。有限かつ `>= 0.0` |
| `weight_decay` | `f32` | このグループへ適用する weight decay（絶対値）。有限かつ `>= 0.0` |

### 検証規則（fail-closed。optimizer の状態変更前に全件検証し `InvalidArgument`）

| 違反 | 結果 |
| --- | --- |
| グループの `params` が空 | `InvalidArgument` |
| スロット添字が渡した `params` の本数の範囲外 | `InvalidArgument` |
| 同一添字が同一グループ内・グループ間で重複 | `InvalidArgument` |
| `lr` / `weight_decay` が非有限または負値 | `InvalidArgument` |
| `params.len() != grads.len()` | `InvalidArgument` |

### OptimizerStateDict のキー配置（形式バージョン 1）

| Key | Description |
| --- | --- |
| `__optimizer__.<kind>` | 種別マーカー（shape `[1]`・値 `1.0`）。`<kind>` は `adamw` / `adam` / `rmsprop` / `adagrad` / `lamb` / `adadelta` / `adamax` / `nadam` / `radam` / `sgd` |
| `step_count.u64_u16x4` | step 数（`Sgd` を除く 9 種） |
| `beta1_pow_t.f64_u16x4` | `AdamW` / `Adam` / `Lamb` / `RAdam` / `Adamax` |
| `beta2_pow_t.f64_u16x4` | `AdamW` / `Adam` / `Lamb` / `RAdam` / `NAdam` |
| `mu_product` | shape `[1]` の生 f32。`NAdam` のみ |
| `num_slots.u64_u16x4` | スロット数。全 10 種で必須 |
| `state.<i>.<buffer>` | スロットバッファ。`AdamW` / `Adam` / `Lamb` は `m`・`v`、`RmsProp` は `square_avg`・`grad_avg`・`momentum_buffer`、`Adagrad` は `state_sum`、`Adadelta` は `square_avg`・`acc_delta`、`Adamax` は `exp_avg`・`exp_inf`、`NAdam` / `RAdam` は `exp_avg`・`exp_avg_sq`、`Sgd` は `momentum_buffer` |

`u64` / `f64` のスカラーは下位から 16bit ずつ 4 語に切り出し、各語を整数値の `f32`（`0.0..=65535.0`）として shape `[4]` に格納する（NaN の bit パターンを出さないロスレス符号化）。

## Notes

- どのグループにも属さないスロットは optimizer の config（`lr` / `weight_decay`）を使う。`groups = &[]` の `step_with_groups` は既存 `step()` と bit 完全一致する契約
- `set_lr` は既定グループ（グループ外スロット）にだけ効く。グループの `lr` は絶対値で `set_lr` の影響を受けない
- `ParamGroupStep::step_with_groups` を持つのは `Sgd` / `Adam` / `AdamW` / `RmsProp` / `Adagrad` / `Lamb` / `Adadelta` / `Adamax` / `NAdam` / `RAdam` の 10 種。`Lbfgs` / `Rprop` / `Asgd` / `Adafactor` / `Lion` は対象外。メソッドを呼ぶには `ParamGroupStep` の import が必要
- `compat::Sequential::compile_with_param_groups`（`compile()` 経路）で使えるのは `compat::Optimizer` enum にある 6 種。`Lbfgs` は拒否される。それ以外の種は手動ループで `step_with_groups` を呼ぶ
- グループ化の対象は `lr` / `weight_decay` の上書きのみ。optimizer 固有のハイパーパラメータ（beta / eps / momentum / nesterov 等）、optimizer 内部状態のグループ追従、`DeviceParamStore` 常駐経路は対象外。`NAdam` / `RAdam` の `decoupled_weight_decay` もグループでは切り替えず、config が定める意味でグループの `weight_decay` に適用される
- `ParamGroup` は `#[non_exhaustive]` のため、クレート外からは `ParamGroup::new` でのみ構築できる。`new` 自体は失敗せず、検証は `step_with_groups` 呼び出し時
- glob import（`use fandhe_ai::optim::*;`）の利用者が同名の型を自前で定義していると衝突しうる
- `OptimizerStateDict` を実装するのは `AdamW` / `Adam` / `RmsProp` / `Adagrad` / `Lamb` / `Adadelta` / `Adamax` / `NAdam` / `RAdam` / `Sgd` の 10 種。メソッドを呼ぶには `OptimizerStateDict` の import が必要
- `Lbfgs` は `OptimizerStateDict` の対象外で、シグネチャの異なる inherent の `state_dict` / `load_state_dict`（第 2・第 3 引数に `slot_shapes: &[Vec<usize>]` と `expected_history_len: usize`）を使う
- ハイパーパラメータ（config）は保存しない。復元側は保存時と同じ config で `new` してから `load_state_dict` を呼ぶ
- キー集合は完全一致が必要。種別マーカーにより別種の optimizer の状態（例: `Adam` の状態を `AdamW` へ）は fail-closed で拒否される
- `load_state_dict` は全件を検証してから一括で書き込み、`Err` のとき optimizer の状態は変わらない
- `OptimizerStateDict` は sealing されておらず下流クレートも実装できるため、trait へメソッドを追加しない契約（追加は破壊的変更）
- `Sgd` は momentum 無効・未 step のとき `num_slots = 0`
- `compat::Sequential` の optimizer 状態 API（`fit` の再開）と、モデルと optimizer を併せた complete checkpoint は対象外

## Related

- [Optimizers](./optimizers.md)
- [LR schedulers](./lr-schedulers.md)
