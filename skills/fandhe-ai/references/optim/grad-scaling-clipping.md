---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/optim/struct.GradScaler.html
---

# GradScaler（AMP 損失スケーリング）と gradient clipping

f16 forward での勾配 underflow を防ぐ損失スケーリング（`GradScaler` ほか）と、global L2 norm 方式・要素値方式の gradient clipping。いずれも `fandhe_ai_autodiff::nn::optim` からの素の再エクスポートで、勾配は `Tensor<f32>` へ実体化済みのものを扱う純関数・値型。

## Signature / Usage

```rust
pub fn scale_loss<'t>(loss: &Var<'t>, scale: f32) -> Result<Var<'t>, AutodiffError>
pub fn scale_grads(tensors: &[&Tensor<f32>], scale: f32) -> Result<Vec<Tensor<f32>>, AutodiffError>
pub fn unscale_grads(grads: &[&Tensor<f32>], scale: f32) -> Result<UnscaleResult, AutodiffError>
pub fn has_non_finite(tensors: &[&Tensor<f32>]) -> bool

pub fn global_grad_norm(grads: &[&Tensor<f32>]) -> Result<f32, AutodiffError>
pub fn clip_grad_norm(grads: &[&Tensor<f32>], max_norm: f32) -> Result<ClipGradResult, AutodiffError>
pub fn clip_grad_value(grads: &[&Tensor<f32>], clip_value: f32) -> Result<Vec<Tensor<f32>>, AutodiffError>

impl GradScaler {
    pub fn new(config: GradScalerConfig) -> Result<GradScaler, AutodiffError>
    pub fn scale(&self) -> f32
    pub fn growth_tracker(&self) -> u64
    pub fn scale_loss<'t>(&self, loss: &Var<'t>) -> Result<Var<'t>, AutodiffError>
    pub fn unscale(&self, grads: &[&Tensor<f32>]) -> Result<UnscaleResult, AutodiffError>
    pub fn update(&mut self, found_non_finite: bool) -> Result<(), AutodiffError>
}
```

1 step の使い方（AMP）:

```rust
// 1. scaler.scale_loss(&loss)        損失をスケール
// 2. Tape::backward                  スケール済み loss を逆伝播
// 3. scaler.unscale(&grads)          UnscaleResult を得る
// 4. result.should_skip_step() が true なら clip・optimizer step の両方をスキップ
// 5. false なら clip_grad_norm -> optimizer step
// 6. 最後に必ず scaler.update(found_non_finite)
```

## Options / Props

### GradScalerConfig

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `init_scale` | `f32` | `65536.0` | 初期スケール。有限・正・非正規化数でない |
| `growth_factor` | `f32` | `2.0` | 成長係数。有限かつ `> 1.0` |
| `backoff_factor` | `f32` | `0.5` | backoff 係数。`(0.0, 1.0)` |
| `growth_interval` | `u64` | `2000` | 連続 clean step がこの回数に達すると growth。`>= 1` |

### UnscaleResult

| Name | Type | Description |
| --- | --- | --- |
| `grads` | `Vec<Tensor<f32>>` | unscale 後の勾配（入力と同じ順序・shape） |
| `found_non_finite` | `bool` | unscale 後の勾配に NaN / Inf が含まれたか |
| `should_skip_step()` | メソッド -> `bool` | `found_non_finite` の別名アクセサ |

### ClipGradResult

| Name | Type | Description |
| --- | --- | --- |
| `grads` | `Vec<Tensor<f32>>` | clip 後の勾配（入力と同じ順序・shape。`scaled == false` でも複製して返す） |
| `total_norm` | `f32` | clip 前の global L2 ノルム |
| `scaled` | `bool` | スケール係数を実際に適用したか（`total_norm <= max_norm` なら `false`） |

### 関数の挙動

| Name | Description |
| --- | --- |
| `scale_loss` | `loss.mul(&scale_var)`（既存 `Var::mul` の合成のみ）。呼び出しごとにスカラー葉を 1 個 tape へ登録する。`scale` が非有限または 0 以下なら `InvalidArgument` |
| `scale_grads` | 勾配の各要素を `scale` 倍する。`unscale_grads` の逆写像 |
| `unscale_grads` | `v / scale` に固定し、1 パスで非有限値の有無を検出する。非有限を含んでも `Err` にしない |
| `has_non_finite` | 複数テンソルを横断して NaN / Inf の有無を返す。空スライスは `false` |
| `global_grad_norm` | `sqrt(sum_i sum_j grad_i[j]^2)`。空スライスは `0.0`。非有限なら `InvalidArgument` |
| `clip_grad_norm` | `clip_coef = max_norm / (total_norm + 1e-6)`。`clip_coef >= 1.0` のときは勾配を無変更で返す。`max_norm` は有限かつ正 |
| `clip_grad_value` | 各要素を独立に `[-clip_value, clip_value]` へクランプする。`clip_value` は有限かつ正。非有限の勾配要素が含まれると `InvalidArgument` |
| `GradScaler::update` | `found_non_finite == true` で `scale *= backoff_factor`・`growth_tracker = 0`（backoff 後の scale が 0・非正規化数・非有限なら `Err`）。`false` で `growth_tracker += 1` し `growth_interval` 到達時に `scale *= growth_factor`（成長後が非有限なら据え置き） |

## Notes

- 適用順序契約: AMP なしは `backward -> clip -> optimizer step`。AMP ありは `scale_loss -> backward -> unscale -> should_skip_step なら clip と optimizer step の両方をスキップ -> clip_grad_norm -> optimizer step -> update`。スキップした step でも `update` は必ず呼ぶ（backoff のため）
- `clip_grad_norm` は非有限勾配で `Err` を返す fail-closed 契約のため、非有限検出（`unscale`）より前に clip を呼ぶと学習ループ全体が失敗する。clip は unscale 後の生勾配に対してのみ適用する
- `unscale_grads` は `scale` が 2 のべき乗のとき `scale_grads` の厳密な逆写像になる。2 のべき乗以外では丸め差が生じうる。`GradScalerConfig` の既定値はいずれも 2 のべき乗
- 真の混合精度（f16 forward・f32 master weight）は対象外。提供するのはホスト `Tensor<f32>` へ実体化済みの勾配に対するスケーリング・unscale・非有限検出のみ
- デバイス常駐更新経路への結線は `Tape::step_device_param_store_amp` / `step_device_param_store_adam_amp` / `step_device_param_store_adamw_amp`（SGD / Adam / AdamW の 3 optimizer 限定。RmsProp / Adagrad / Lamb は未結線）。スケール済み勾配をホストへ実体化してから unscale・非有限検出するホスト計算フォールバックで、CUDA / Metal 専用の unscale カーネルは持たない
- `fandhe_ai::compat::Sequential::compile_with_amp` が低精度 forward の dtype 指定と `GradScalerConfig` を束ねる facade 統合入口（`compat::AmpConfig` 経由）
- `scale_loss` のスカラー葉は `Tape::reset` をまたいで蓄積しない
- `GradScaler` は `GradScalerConfig` を `new` で検証する。復元用の `grad_scaler_from_state` は内部 API で `fandhe_ai::optim` には公開されない

## Related

- [Optimizers](./optimizers.md)
- [LR schedulers](./lr-schedulers.md)
