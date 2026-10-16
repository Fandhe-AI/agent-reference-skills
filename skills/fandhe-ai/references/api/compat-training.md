---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/struct.FitConfig.html
---

# compat: compile / fit / evaluate / AMP / train step

Keras 風の学習 API。`compat::Sequential` に `compile`（optimizer / loss の設定）、`fit` 系（学習）、`evaluate`（評価）が生え、設定型 `Loss` / `Optimizer` / `FitConfig` / `FitWeights` / `AmpConfig` / `AmpDType`、戻り値 `History`、カスタム step フック型（`TrainStepFn` / `TrainStepOptimizer` / `TrainStepOutput`）を使う。callbacks は `compat-callbacks.md`、metrics は `compat-metrics.md` を参照。

## Signature / Usage

```rust
use fandhe_ai::compat::{FitConfig, Loss, Optimizer, Sequential};
use fandhe_ai::optim::SgdConfig;

let mut model = Sequential::new().add_linear(2, 1, 7).unwrap();
model.compile(Optimizer::Sgd(SgdConfig::new(0.1)), Loss::Mse).unwrap();
let history = model.fit(&x, &y, FitConfig::new(2, 2).shuffle(true)).unwrap();
let loss = model.evaluate(&x, &y, 2).unwrap();
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Sequential::compile(&mut self, optimizer: Optimizer, loss: Loss) -> Result<(), AutodiffError>` | メソッド | optimizer / loss を設定する（Keras `model.compile`）。ハイパーパラメータ検証（`lr < 0.0` 等）は各 optimizer の `new` へ委譲。再 compile は optimizer 状態（momentum・m / v 等）を破棄して置き換える |
| `compile_with_param_groups(&mut self, optimizer: Optimizer, loss: Loss, param_groups: &[ParamGroup]) -> Result<(), AutodiffError>` | メソッド | 層別の学習率・weight decay（PyTorch `param_groups`）。`ParamGroup` の `params` は `trainable_parameters()` / `named_parameters()` の位置（スロット添字）。groups が空なら `compile` と bit 一致。`Optimizer::Lbfgs` と空でない groups は併用不可。groups が空でないと `Callback::LrSchedule` は `fit` 系で拒否され、`save_model` でも保存できない。範囲外の添字は `fit` 系の入口で拒否 |
| `compile_with_amp(&mut self, optimizer: Optimizer, loss: Loss, amp: AmpConfig) -> Result<(), AutodiffError>` | メソッド | AMP 版 compile。1 step は、`Linear` / `Conv2d` / `MultiheadAttention` の forward を `amp.compute_dtype` で計算（f32 master weight、backward は常に f32）、scale 前の素の loss を `History::loss` へ記録、`scale_loss` → backward → unscale（非有限検出込み）、非有限なら `optimizer.step` / `apply_parameters` を両方スキップ（`step_count` も進めない）、最後に必ず `scaler.update`。`evaluate` / validation / `predict` は f32 のまま。`Optimizer::Lbfgs` と併用不可（`InvalidArgument`） |
| `is_compiled(&self) -> bool` | メソッド | `compile` 済みか |
| `amp_loss_scale(&self) -> Option<f32>` | メソッド | 現在の AMP スケール値。AMP 未使用または未 compile は `None` |
| `fit<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig) -> Result<History, AutodiffError>` | メソッド | `config.epochs` 回学習する（Keras `fit`）。`fit_with_callbacks`（`validation=None`・`callbacks=&mut []`）への薄い委譲。`epochs == 0` / `batch_size == 0` / 未 compile / サンプル数不一致 / `loss` と `T` の不整合は `InvalidArgument`。train モードで実行し、終了時に元のモードへ復元 |
| `fit_with_callbacks<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback]) -> Result<History, AutodiffError>` | メソッド | 検証データと callbacks 付き。1 epoch の順序は、(1) 全 `LrSchedule` の `lr_for_epoch_begin()` を optimizer へ同期して `history.lr` へ記録（複数あれば最後が勝つ）、(2) 通常のバッチループで `history.loss` を記録、(3) `validation` があれば eval モードで評価し `history.val_loss` へ記録、(4) epoch 末 callbacks をスライス順に処理（打ち切り要求があっても当該 epoch の他の callback を処理してから抜ける） |
| `fit_with_metrics<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback], metrics: &[Metrics]) -> Result<History, AutodiffError>` | メソッド | validation 上の metrics 付き。`metrics` が非空で `validation` が `None`、`Monitor::ValMetric(m)` の `m` が `metrics` に無い、`m == Metrics::ConfusionMatrix`、`T = f32`（`Loss::Mse`）で `metrics` が非空、のいずれも `InvalidArgument` |
| `fit_with_prefetch<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig, prefetch: PrefetchConfig, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback], metrics: &[Metrics]) -> Result<History, AutodiffError>` | メソッド | `PrefetchDataLoader`（バックグラウンド worker によるバッチ先読み）で学習バッチを供給。任意の `(num_workers, prefetch_depth)` で `fit_with_metrics` と bit 一致。適用は学習ローダーのみ。`fit_with_train_step` / `fit_with_weights` とは併用不可。性能改善は保証されない |
| `fit_with_train_step<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback], metrics: &[Metrics], train_step: &mut TrainStepFn<'_, T>) -> Result<History, AutodiffError>` | メソッド | 既定のバッチ処理をフック呼び出しに丸ごと差し替える（Keras `Model.train_step()`）。epoch ループ・callbacks・validation・metrics・`History` 集計は `fit_with_metrics` と共通。フック実行中は `is_compiled()` が `false`。AMP・`accumulate_steps > 1`・`Optimizer::Lbfgs`・未 compile は `InvalidArgument`。フックが panic するとモデルは未 compile 状態に落ちる |
| `fit_with_weights<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig, weights: &FitWeights<'_>, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback], metrics: &[Metrics]) -> Result<History, AutodiffError>` | メソッド | クラス別・サンプル別の損失重み付き |
| `evaluate<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, batch_size: usize) -> Result<f32, AutodiffError>` | メソッド | 平均損失を評価（学習は行わない）。`batch_size == x.shape()[0]` のとき `forward` と `T::loss_for` の直接計算と bit 一致、分割時はサンプル数重み付き平均。評価中は eval モードに切り替え、成功・失敗いずれでも元のモードへ復元 |
| `Loss` | `#[non_exhaustive] enum { Mse, CrossEntropy, L1, Bce, BceWithLogits, Nll, KlDiv, Huber, SmoothL1 }` | 全て `Reduction::Mean` 固定。target は `Mse` / `L1` / `Bce` / `BceWithLogits` / `KlDiv` / `Huber` / `SmoothL1` が `Tensor<f32>`（pred と同 shape）、`CrossEntropy` / `Nll` が `Tensor<i32>`（クラス添字 `[N]`）。`CrossEntropy` / `Nll` は `class_dim = 1`（logits / log 確率は `[N, C]`）。`Huber` の delta と `SmoothL1` の beta は 1.0、`KlDiv` は `log_target = false` で可変化は範囲外。dtype の不整合は fit / evaluate 時に `InvalidArgument` |
| `Optimizer` | `#[non_exhaustive] enum { Sgd(SgdConfig), AdamW(AdamWConfig), Adam(AdamConfig), RmsProp(RmsPropConfig), Adagrad(AdagradConfig), Lamb(LambConfig), Lbfgs(LbfgsConfig) }` | `RmsProp` / `Adagrad` / `Lamb` は `set_lr` を持たないため `Callback::LrSchedule` を渡すと `fit_with_callbacks` は `InvalidArgument`。`Lbfgs` は closure 駆動で、AMP・`accumulate_steps > 1`・カスタム train_step フック・空でない param groups と併用不可（`Callback::LrSchedule` は可）。`LbfgsConfig::line_search` に `LbfgsLineSearch::StrongWolfe` を指定できる（既定は固定ステップの `LbfgsLineSearch::None`） |
| `FitConfig` | `pub struct`（`Debug, Clone, Copy, PartialEq, Eq`。フィールドは非公開） | `FitConfig::new(epochs: usize, batch_size: usize) -> Self` で構築。ビルダ: `shuffle(on: bool)`（既定 `false`。Keras の既定 `true` とは異なる。`true` はグローバル RNG を消費）、`drop_last(on: bool)`（既定 `false`）、`accumulate_steps(n: u32)`（既定 `1`。`n` 回の backward ごとに 1 回だけ `optimizer.step`。正規化はしないため大バッチ相当にしたい場合は学習率を `1/N` にする。`n > 1` は AMP・`Optimizer::Lbfgs`・カスタム step フックと併用不可で、累積勾配に NaN / ±inf があると更新前に `InvalidArgument`。`n == 0` は fit 時に `InvalidArgument`）、`validation_split(fraction: f32)`（学習データ末尾の割合を検証に使う。`split_at = floor(N × (1 − fraction))`、シャッフル前に分割。非有限・負値・`1` 以上・分割後が 0 件・明示 `validation` との併用は `InvalidArgument`、`0.0` は分割なし。`Eq` はビット比較）。`epochs` / `batch_size` の検査は fit 呼び出し時 |
| `FitWeights<'a>` | `pub struct`（`Debug, Clone, PartialEq, Default`） | `FitWeights::new()`（= `default()`）、`class_weight(HashMap<u32, f32>)`（キー無しのクラスは `1.0`。キーは logits のクラス数 `C` 未満、値は有限かつ非負）、`sample_weight(&'a [f32])`（`x` と同じ長さ。有限かつ非負。`validation_split` 併用時は分割前の長さ）。サンプル `i` の重みは `sample_weight[i] × class_weight.get(y_i).unwrap_or(1.0)`、バッチ損失は `Σ w_i·l_i / N_batch`。`class_weight` は `Loss::CrossEntropy` のみ、`sample_weight` は `Loss::CrossEntropy` / `Loss::Mse`。それ以外と、非既定の重み × `Optimizer::Lbfgs` は `InvalidArgument`。`History::loss` は重み付き値、`val_loss` / `val_metrics` は重みなし |
| `History` | `#[non_exhaustive] struct { pub loss: Vec<f32>, pub val_loss: Vec<f32>, pub lr: Vec<f32>, pub val_metrics: Vec<MetricsResult> }` | `loss[i]` は epoch `i`（0-indexed、fit 呼び出し内のローカル番号）の学習損失を、各バッチのサンプル数で重み付けした平均（f64 で集計し最後に f32 へ downcast）。`val_loss` は `validation` が `Some` のときのみ、`lr` は常に記録（epoch の全バッチが使った学習率）、`val_metrics` は `metrics` が非空かつ `validation` が `Some` のときのみ |
| `AmpConfig` | `pub struct`（`Debug, Clone, Copy, PartialEq`） | `AmpConfig::new(compute_dtype: AmpDType) -> Self`（`grad_scaler` は `GradScalerConfig::default()`、PyTorch `GradScaler` の既定と同一値）、`grad_scaler(self, config: GradScalerConfig) -> Self` |
| `AmpDType` | `#[non_exhaustive] enum { F16, Bf16 }` | 低精度 forward の dtype（F16: IEEE 754 半精度、Bf16: bfloat16）。`ScalarDType` を `compile_with_amp` が受理する 2 種へ型で狭める facade 専用の写像 |
| `FitTarget` | `pub trait FitTarget: Element + Sealed` | `fit` / `evaluate` の target 要素型。`f32`（`Loss::Mse` 等）と `i32`（`Loss::CrossEntropy` / `Loss::Nll`）のみ実装（sealed） |
| `TrainStepFn<'h, T>` | `pub type TrainStepFn<'h, T> = dyn FnMut(&Sequential, &Tensor<f32>, &Tensor<T>, &mut TrainStepOptimizer<'_>) -> Result<TrainStepOutput, AutodiffError> + 'h` | カスタム学習 step フック。`&Sequential`（`&mut` ではない）で `compile` / `fit` / `set_training` の再入を型で防ぐ。パラメータ更新は `TrainStepOutput::with_updated` で返し、`apply_parameters`（個数・shape 検査付き）で反映される |
| `TrainStepOptimizer<'a>` | `pub struct` | `step(&mut self, params: &[&Tensor<f32>], grads: &[&Tensor<f32>]) -> Result<Vec<Tensor<f32>>, AutodiffError>`（optimizer を 1 step 進め、更新後パラメータを新しい `Vec` で返す。モデルは書き換えない。位置対応で長さ不一致は `InvalidArgument`。呼ぶたびに内部状態が進む）、`lr(&self) -> f32`（epoch 開始時に `LrSchedule` が同期した現在の学習率）。公開コンストラクタ・`set_lr` は無い |
| `TrainStepOutput` | `#[non_exhaustive] pub struct` | `TrainStepOutput::new(loss: f32) -> Self`（損失のみ。更新スキップで、損失は `History.loss` の集計に合流）、`with_updated(self, params: Vec<Tensor<f32>>) -> Self`（更新後パラメータ。`trainable_parameters` と同順） |

## Notes

- `Loss` はここの `compat::Loss`（`compile()` / `fit` 用の 9 種・Mean 固定）であり、`nn::loss` の損失構造体や `Var` の損失メソッドとは別レイヤー（`nn/loss.md` / `var-losses.md`）
- `fit` 系は train / eval モードを fit 開始時に記憶し、終了時（成功・失敗とも）に復元する。optimizer 状態は `fit` 呼び出しをまたいで継続する（`fit(1)+fit(1) == fit(2)`）
- 複数の `fit_with_*` 入口は互いに合成できない（`fit_with_prefetch` と `fit_with_train_step` / `fit_with_weights` 等）
- `RmsProp` / `Adagrad` / `Lamb` の LR スケジューラ非対応は公開面拡張（`set_lr` の追加）が承認事項のためスコープ外

## Related

- [compat-sequential](./compat-sequential.md)
- [compat-callbacks](./compat-callbacks.md)
- [compat-metrics](./compat-metrics.md)
- [compat-model-io](./compat-model-io.md)
- [var-losses](./var-losses.md)
