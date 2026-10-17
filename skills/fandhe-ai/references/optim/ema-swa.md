---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/optim/struct.ExponentialMovingAverage.html
---

# EMA / SWA（ExponentialMovingAverage / AveragedModel / SwaLr）

重みの指数移動平均 `ExponentialMovingAverage`（EMA）と、等重み平均 `AveragedModel`（SWA）、SWA 用の学習率 `SwaLr` / `SwaAnneal`。EMA と `AveragedModel` は facade 独自の薄いラッパー（内部の `nn::Module` を公開シグネチャへ出さないため）、`SwaLr` / `SwaAnneal` は内部クレートからの素の再エクスポート。`compat::Sequential::fit` へは SWA を結線せず、手動ループで `update_named` を呼ぶ。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::optim::ExponentialMovingAverage;

let w0 = Tensor::new(vec![1.0f32, 2.0], &[2])?;
let mut ema = ExponentialMovingAverage::new(0.5, &[&w0])?;
let w1 = Tensor::new(vec![3.0f32, 4.0], &[2])?;
ema.update(&[&w1])?;
// shadow = 0.5 * w0 + 0.5 * w1
let shadow = ema.shadow_parameters()[0].contiguous();
assert_eq!(shadow.as_slice().unwrap(), &[2.0, 3.0]);
assert_eq!(ema.num_updates(), 1);

// decay は有限かつ [0, 1]。範囲外は型付きエラー。
assert!(ExponentialMovingAverage::new(1.5, &[&w0]).is_err());
```

モデルへの結線（手動ループ）:

```rust
use fandhe_ai::compat::{Loss, Optimizer, Sequential};
use fandhe_ai::optim::{ExponentialMovingAverage, SgdConfig};

let mut model = Sequential::new().add_linear(2, 1, 7)?;
model.compile(Optimizer::Sgd(SgdConfig::new(0.01)), Loss::Mse)?;
let mut ema = ExponentialMovingAverage::from_named(0.9, model.named_parameters())?;
ema.update_named(model.named_parameters())?;
assert_eq!(ema.num_updates(), 1);
model.load_state_dict(ema.shadow_state_dict())?;
```

SWA:

```rust
use fandhe_ai::compat::{Loss, Optimizer, Sequential};
use fandhe_ai::optim::{AveragedModel, LrScheduler, SgdConfig, SwaAnneal, SwaLr};

let mut model = Sequential::new().add_linear(2, 1, 7)?;
model.compile(Optimizer::Sgd(SgdConfig::new(0.01)), Loss::Mse)?;
// 切替時点の lr から SWA 用の固定 lr へ 2 step かけて線形に移す。
let swa_lr = SwaLr::new(0.05, 0.01, 2, SwaAnneal::Linear)?;
assert_eq!(swa_lr.lr_at(2), 0.01);
let mut swa = AveragedModel::from_named(model.named_parameters())?;
swa.update_named(model.named_parameters())?;
assert_eq!(swa.n_averaged(), 1);
// 評価のため平均重みへ差し替え、退避値で元へ戻す。
let backup = model.state_dict();
model.load_state_dict(swa.averaged_state_dict())?;
model.load_state_dict(backup)?;
```

## Options / Props

### ExponentialMovingAverage

| Name | Type | Description |
| --- | --- | --- |
| `new(decay: f32, params: &[&Tensor<f32>])` | `Result<Self, AutodiffError>` | 位置対応（登録名は `"0"`, `"1"`, ...）で構築。`decay` が非有限または `[0, 1]` 外なら `InvalidArgument` |
| `from_named(decay, named: Vec<(String, &Tensor<f32>)>)` | `Result<Self, AutodiffError>` | 名前付きパラメータ列から構築（`Sequential::named_parameters()` の戻り値をそのまま渡せる）。名前重複は `InvalidArgument` |
| `from_module(decay, module: &dyn Module)` | `Result<Self, AutodiffError>` | facade の `Module` の `named_parameters()` から構築 |
| `decay(&self)` | `f32` | 構築時に検証済みの `decay` |
| `num_updates(&self)` | `u64` | これまでの `update` 系の成功回数 |
| `update(&mut self, params: &[&Tensor<f32>])` | `Result<(), AutodiffError>` | 位置対応で shadow を更新。個数不一致は `InvalidArgument`、shape 不一致は `Shape`。いずれも shadow を変更しない |
| `update_named(&mut self, named)` | `Result<(), AutodiffError>` | 名前付きで更新。名前集合の不一致は `InvalidArgument` |
| `update_from_module(&mut self, module: &dyn Module)` | `Result<(), AutodiffError>` | `Module` の `named_parameters()` で更新 |
| `shadow(&self, name: &str)` | `Option<&Tensor<f32>>` | 登録名の shadow |
| `shadow_parameters(&self)` | `Vec<&Tensor<f32>>` | 登録順の shadow 参照列 |
| `shadow_state_dict(&self)` | `HashMap<String, Tensor<f32>>` | キー付きコピー（`Module::load_state_dict` へ渡せる） |
| `apply(&self, model: &mut dyn Module)` | `Result<HashMap<String, Tensor<f32>>, AutodiffError>` | モデルの重みを shadow へ一時差し替えし、差し替え前の `state_dict()` を返す |
| `restore(model: &mut dyn Module, backup)` | `Result<(), AutodiffError>` | `apply` が返した退避値で元の重みへ戻す（関連関数） |

### AveragedModel

| Name | Type | Description |
| --- | --- | --- |
| `new(params: &[&Tensor<f32>])` | `Result<Self, AutodiffError>` | 位置対応で構築 |
| `from_named(named)` / `from_module(module)` | `Result<Self, AutodiffError>` | 名前付き / `Module` から構築。名前重複は `InvalidArgument` |
| `n_averaged(&self)` | `u64` | これまでの `update` 系の成功回数 |
| `update(&mut self, params)` / `update_named(&mut self, named)` / `update_from_module(&mut self, module)` | `Result<(), AutodiffError>` | 平均を更新。失敗時は状態を変更しない |
| `averaged(&self, name: &str)` | `Option<&Tensor<f32>>` | 登録名の平均パラメータ |
| `averaged_parameters(&self)` | `Vec<&Tensor<f32>>` | 登録順の平均パラメータ参照列 |
| `averaged_state_dict(&self)` | `HashMap<String, Tensor<f32>>` | キー付きコピー |
| `apply(&self, model)` / `restore(model, backup)` | `Result<...>` | EMA と同型の一時差し替え・復元 |

### SwaLr / SwaAnneal

```rust
pub fn SwaLr::new(base_lr: f32, swa_lr: f32, anneal_epochs: usize, anneal: SwaAnneal)
    -> Result<SwaLr, AutodiffError>
```

| Name | Description |
| --- | --- |
| `base_lr` | アニーリング開始時の学習率。有限かつ正 |
| `swa_lr` | 到達先の固定学習率。有限かつ正（`swa_lr > base_lr` も許す） |
| `anneal_epochs` | アニーリングに充てる step 数。`0` を含め全値を受理（`0` は全 step が `swa_lr`） |
| `anneal` | `SwaAnneal::Cos`（PyTorch 既定。`alpha = sin^2(pi*t/2)`）/ `SwaAnneal::Linear`（`alpha = t`）。`t = step / anneal_epochs` |

`lr = swa_lr * alpha + base_lr * (1 - alpha)`。`step >= anneal_epochs` 以降は `swa_lr` に固定。`SwaLr` は `LrScheduler` を実装する。

## Notes

- EMA の更新式は `shadow = f32::mul_add(decay, shadow, (1 - decay) * param)`。PyTorch `AveragedModel` の `lerp` 形とは丸めが異なり bit 一致は主張しない。非有限値は伝播する
- `AveragedModel` は `n_averaged == 0` の最初の `update` で構築時の重みとは平均せず更新値を複製し、以降は `f32::mul_add` の lerp 形。PyTorch との bit 一致は主張しない
- 対象は学習可能パラメータのみ（`BatchNorm` の running buffer は対象外）。ホスト `Tensor<f32>` のみを扱い、GPU 固有の数値経路は持たない
- EMA はデバイス常駐経路（`DeviceParamStore`）の重みに追従しない（併用すると shadow が stale 化する）
- `compat::Sequential::fit_with_callbacks` への結線は `compat::Callback::Ema`（`compat::EmaCallback`）が担う。手動ループでは `named_parameters()` から構築し step ごとに `update_named` を呼ぶ
- `FitConfig` に SWA 項目は無く、SWA の `fit` への結線は存在しない
- `SwaLr` は PyTorch `SWALR` の再帰形ではなく固定 `base_lr` に対する閉形式。`swa_lr <= 0` を拒否する（PyTorch は検査しない）。param group ごとの `swa_lr` リストは対象外
- 主スケジューラとの連結は `SequentialLr::new` で行い、SWA 段の `base_lr` には主スケジューラの切替時点の値（`main.lr_at(切替 step)`）を渡す
- `SwaAnneal` は `OneCycleAnneal` とは別型（OneCycle は上昇・下降各フェーズの補間、SWA は固定 `swa_lr` への単一アニーリング）

## Related

- [LR schedulers](./lr-schedulers.md)
- [Optimizers](./optimizers.md)
