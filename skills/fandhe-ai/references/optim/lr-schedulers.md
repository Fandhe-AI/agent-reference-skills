---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/optim/trait.LrScheduler.html
---

# LR スケジューラ（LrScheduler trait と各実装）

`LrScheduler::lr_at(step)` は step 番号から学習率を返す stateless な純関数。呼び出し側が `let lr = scheduler.lr_at(step);` のように取り出して使う。唯一の例外が状態保持型の `ReduceLrOnPlateau`。

## Signature / Usage

```rust
pub trait LrScheduler {
    /// `step`（0 始まりの epoch またはイテレーション番号）に対応する学習率を返す。
    fn lr_at(&self, step: usize) -> f32;
}
```

```rust
use fandhe_ai::optim::{LrScheduler, MultiStepLr, SequentialLr, StepLr};

let ms = MultiStepLr::new(0.1, &[2, 4], 0.5)?;
assert_eq!(ms.lr_at(0), 0.1);
assert_eq!(ms.lr_at(2), 0.05);
assert_eq!(ms.lr_at(4), 0.025);

let seq = SequentialLr::new(
    vec![
        Box::new(StepLr::new(0.1, 1, 0.5)?) as Box<dyn LrScheduler>,
        Box::new(MultiStepLr::new(0.1, &[2], 0.5)?) as Box<dyn LrScheduler>,
    ],
    vec![2],
)?;
assert!(seq.lr_at(0).is_finite());
```

## Options / Props

### スケジューラ一覧（コンストラクタと式）

| Name | Constructor | Description |
| --- | --- | --- |
| `ConstantLr` | `new(base_lr)` | 常に `base_lr` |
| `StepLr` | `new(base_lr, step_size, gamma)` | `base_lr * gamma^(step / step_size)`（整数除算）。`step_size >= 1` |
| `MultiStepLr` | `new(base_lr, milestones: &[usize], gamma)` | `base_lr * gamma^n`（`n` は `step` 以下の milestone の個数。重複は多重に数える。空でもよい） |
| `ExponentialLr` | `new(base_lr, gamma)` | `base_lr * gamma^step` |
| `LinearWarmupLr` | `new(base_lr, warmup_steps, start_factor)` | `base_lr * (start_factor + (1 - start_factor) * min(step, warmup_steps) / warmup_steps)`。以降は `base_lr`。`warmup_steps >= 1`、`0 < start_factor <= 1` |
| `CosineAnnealingLr` | `new(base_lr, t_max, eta_min)` | `eta_min + (base_lr - eta_min) * (1 + cos(pi * step / t_max)) / 2`。`t_max >= 1`、`0 <= eta_min <= base_lr` |
| `CosineAnnealingWarmRestarts` | `new(base_lr, t_0, t_mult, eta_min)` | 周期リスタート付きコサイン。`t_0 >= 1`、`t_mult >= 1`、`0 <= eta_min <= base_lr` |
| `CyclicLr` | `new(base_lr, max_lr, step_size_up, step_size_down: Option<usize>)` | 三角波（`mode='triangular'` 固定）。`max_lr >= base_lr`、`step_size_up >= 1`。`None` の `step_size_down` は `step_size_up` と同値、`Some(0)` は拒否 |
| `LambdaLr<F>` | `new(base_lr, lr_lambda: F)` where `F: Fn(usize) -> f64` | `base_lr * lr_lambda(step)` |
| `OneCycleLr` | `new(config: OneCycleLrConfig)` | 1 サイクル（Smith, 2018） |
| `PolynomialLr` | `new(base_lr, total_iters, power)` | `base_lr * (1 - min(step, total_iters) / total_iters)^power`。`total_iters >= 1`、`power >= 0` |
| `ChainedScheduler` | `new(base_lr, schedulers: Vec<Box<dyn LrScheduler>>)` | 複数スケジューラの係数の積。`schedulers` は 1 個以上 |
| `SequentialLr` | `new(schedulers: Vec<Box<dyn LrScheduler>>, milestones: Vec<usize>)` | milestone 区切りの段階連結。各段は局所 epoch（区間先頭で 0 から再開）で駆動 |
| `ReduceLrOnPlateau` | `new(base_lr, config: ReduceLrOnPlateauConfig)` | 検証指標の停滞で学習率を下げる状態保持型 |

`ConstantLr` / `StepLr` / `ExponentialLr` / `LinearWarmupLr` / `CosineAnnealingLr` / `PolynomialLr` / `ChainedScheduler` / `LambdaLr` ほか `base_lr` は有限かつ正でなければならない。いずれのコンストラクタも条件違反は `AutodiffError::InvalidArgument`（fail-closed）。`SwaLr` は `ema-swa.md` を参照。

### OneCycleLrConfig

`Default` は無い。`OneCycleLrConfig::new(max_lr, total_steps)` が残りを PyTorch の既定値で埋める。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `max_lr` | `f32` | — | サイクルのピーク学習率。有限かつ正 |
| `total_steps` | `usize` | — | サイクル全体のステップ数。`>= 1` |
| `pct_start` | `f32` | `0.3` | 上昇フェーズに充てる割合。`0 < pct_start < 1` |
| `anneal_strategy` | `OneCycleAnneal` | `Cos` | アニーリング方式 |
| `div_factor` | `f32` | `25.0` | `initial_lr = max_lr / div_factor` |
| `final_div_factor` | `f32` | `1e4` | `min_lr = initial_lr / final_div_factor` |
| `three_phase` | `bool` | `false` | 3 フェーズ形式（上昇 -> `initial_lr` へ下降 -> `min_lr` へ下降） |

`OneCycleAnneal`: `Cos`（コサイン、既定）/ `Linear`（線形）。

### ReduceLrOnPlateauConfig

`Default` は PyTorch `ReduceLROnPlateau` の既定値と一致する。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `PlateauMode` | `Min` | 監視指標の改善方向。`Min`（小さいほど良い）/ `Max`（大きいほど良い） |
| `factor` | `f32` | `0.1` | 発火時に学習率へ乗じる係数。`0 < factor < 1` |
| `patience` | `usize` | `10` | 改善なしを許容する連続観測回数。`0` は 1 回の悪化で即発火 |
| `threshold` | `f32` | `1e-4` | 改善判定のしきい値（非負） |
| `threshold_mode` | `ThresholdMode` | `Rel` | `Rel`（`best` に対する相対値）/ `Abs`（絶対値） |
| `cooldown` | `usize` | `0` | 発火直後に `num_bad_epochs` のカウントを再開しない観測回数 |
| `min_lr` | `f32` | `0.0` | 学習率の下限（非負）。`base_lr` を超えてはならない |
| `eps` | `f32` | `1e-8` | 学習率の変化がこの値以下なら適用しない微小変化ガード |

### ReduceLrOnPlateau のメソッド

| Name | Type | Description |
| --- | --- | --- |
| `step(&mut self, metric: f32)` | `Result<f32, AutodiffError>` | 検証指標を 1 回観測して状態を進め、更新後の学習率を返す。`metric` が非有限なら `InvalidArgument`（状態は不変） |
| `current_lr(&self)` | `f32` | 現在の学習率（状態は進めない） |
| `best(&self)` | `f32` | 診断用: 現時点の best 指標値 |
| `num_bad_epochs(&self)` | `usize` | 診断用: 連続悪化観測回数 |
| `cooldown_counter(&self)` | `usize` | 診断用: 残り cooldown 観測回数 |

## Notes

- 計算は `f64` で中間計算し最後に 1 回だけ `f32` へ落とす。PyTorch との bit 同一は主張しない
- `ReduceLrOnPlateau` は `LrScheduler` を実装するが `lr_at(_step)` は引数を無視して現在値を返すだけ。状態を進める入口は `step(metric)` のみ（`&dyn LrScheduler` 経由で `lr_at` だけを呼んでも状態は変化しない）
- `ReduceLrOnPlateau::step` の順序: `is_better` なら `best` 更新・`num_bad_epochs = 0`、でなければ `+= 1` -> `cooldown_counter > 0` なら減算して `num_bad_epochs = 0` -> `num_bad_epochs > patience`（厳密に大なり。`patience + 1` 回目の連続悪化で発火）なら `new_lr = max(lr * factor, min_lr)`。`lr - new_lr > eps` のときだけ適用し、eps ガードで据え置いた場合も `cooldown_counter = cooldown`・`num_bad_epochs = 0` にリセットする
- PyTorch は `metric` が NaN でも黙って「悪化」として扱うが、本実装は非有限の `metric` を `InvalidArgument` で拒否する
- `ReduceLrOnPlateau` は `SequentialLr` に入れても `step(metric)` を呼べなくなるため実質非対応（`lr_at` は現在値を返すだけの段になる）。`DeviceParamStore` には未結線
- `CosineAnnealingLr` は `step > t_max` でも clamp せず周期的（PyTorch の閉形式準拠）。clamp が必要なら呼び出し側で `lr_at(step.min(t_max))`
- `CosineAnnealingWarmRestarts` は周期位置を整数演算で求めるため、PyTorch の `step(epoch)` 経路で起きる浮動小数の周期誤判定を再現しない
- `CyclicLr` は `triangular` のみ。`triangular2` / `exp_range` / `scale_fn` / `cycle_momentum` は対象外
- `OneCycleLr` は momentum cycling（`cycle_momentum` 等）対象外。`step >= total_steps` は `total_steps - 1` に clamp して `min_lr` を返し続ける（PyTorch は `ValueError`）
- `LambdaLr` の `lr_lambda` が NaN / Inf を返すとそのまま `lr_at` の戻り値へ伝播する。param group ごとの lambda リストは対象外
- `SequentialLr` の各段は自分の `base_lr` を独立に持つ。PyTorch と同じ系列を再現するには各段へ同じ `base_lr` を渡す。`milestones` は狭義単調増加で先頭が 1 以上、`milestones.len() + 1 == schedulers.len()`
- `PolynomialLr` は `step >= total_iters` かつ `power > 0` で厳密に `0.0` を返す。`total_iters == 0` と `power < 0` は構築時に拒否する（PyTorch との意図的な差分）
- `ChainedScheduler` は呼び出し側が全メンバーとチェーンへ同じ `base_lr` を渡す規約。PyTorch と一致するメンバーは `StepLr` / `MultiStepLr` / `ExponentialLr` / `LinearWarmupLr` / `PolynomialLr` / `ConstantLr`。`CosineAnnealingLr` / `CosineAnnealingWarmRestarts` / `CyclicLr` / `OneCycleLr` / `LambdaLr` / `SwaLr` / `SequentialLr` / `ReduceLrOnPlateau` は一致しないためチェーンの外で使う（型では弾けない）
- optimizer への反映は `Sgd::set_lr` / `Lbfgs::set_lr` など各 optimizer の `set_lr` を呼び出し側が行う。`set_lr` は既定グループの `lr` のみ書き換える

## Related

- [Optimizers](./optimizers.md)
- [Param groups and state](./param-groups-state.md)
- [EMA / SWA](./ema-swa.md)
