---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/enum.Metrics.html
---

# compat: Metrics / MetricsResult

`Sequential::fit_with_metrics` の分類 metrics（accuracy / precision / recall / F1 / 混同行列）。validation バッチごとの予測クラス（`Var::argmax`。非微分・非追跡）と正解クラス添字（`Tensor<i32>`）を混同行列へ集計し、epoch 末に `MetricsResult` へ確定して `History::val_metrics` に積む。単体でも `MetricsResult::compute` で計算できる。

## Signature / Usage

```rust
use fandhe_ai::compat::{Metrics, MetricsResult};

// logits: [N, C]（Tensor<f32>）、target: [N]（Tensor<i32>、クラス添字）
let r = MetricsResult::compute(&[Metrics::Accuracy, Metrics::F1], &logits, &target)?;
let acc = r.accuracy;   // Some(..)（要求した指標のみ Some）
let f1 = r.f1;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Metrics` | `#[non_exhaustive] enum { Accuracy, Precision, Recall, F1, ConfusionMatrix }`（`Debug, Clone, Copy, PartialEq, Eq, Hash`） | `fit_with_metrics` / `MetricsResult::compute` が計算する指標の種別（Keras `fit(metrics=[...])` 相当）。`Accuracy`: `trace(confusion) / total`、`Precision` / `Recall`: macro 平均、`F1`: macro F1、`ConfusionMatrix`: 行優先 `[num_classes * num_classes]`（行 = 正解クラス、列 = 予測クラス）。`ConfusionMatrix` は非スカラーのため `Monitor::ValMetric` で監視すると `fit_with_metrics` が `InvalidArgument` で拒否する |
| `MetricsResult` | `#[non_exhaustive] struct { pub num_classes: usize, pub accuracy: Option<f32>, pub precision: Option<f32>, pub recall: Option<f32>, pub f1: Option<f32>, pub confusion_matrix: Option<Vec<u64>> }`（`Debug, Clone, PartialEq`） | 1 epoch 分の集計結果。要求した `Metrics` のみ対応フィールドが `Some`（要求していない指標は `None`）。`num_classes` は logits のクラス数 `C`（混同行列の行・列サイズ） |
| `MetricsResult::compute(metrics: &[Metrics], logits: &Tensor<f32>, target: &Tensor<i32>) -> Result<MetricsResult, AutodiffError>` | 関数 | `logits`（`[N, C]`）と `target`（`[N]`）から `metrics` が要求する指標を計算する単体入口。予測クラスは `tape().var_no_grad(logits).argmax(Some(1))`（タイは先頭添字、NaN 無視）。`logits` が rank 2 でない、`target` の shape が `[N]` でない、`target` の添字が `[0, C)` の範囲外、`N == 0` はいずれも `AutodiffError::InvalidArgument` |

## Notes

- 平均方式は macro 平均のみ（マイクロ / 重み付き平均は対象外）。`precision` / `recall` はクラスごとの `tp/(tp+fp)` / `tp/(tp+fn)`（分母 0 は sklearn `zero_division=0` と同じく 0 として寄与）の算術平均
- macro F1 はクラスごとの F1（`2·Pc·Rc/(Pc+Rc)`、分母 0 は 0）の算術平均で、macro precision / recall の調和平均ではない（一般に異なる値になる）
- 算術はホスト側の整数カウントと f64（最後に 1 回だけ f32 へ downcast）のみ。backend 依存は forward 出力（logits）に閉じ、metrics 算術自体は CPU / CUDA / Metal で bit 同一
- `fit_with_metrics` で metrics を渡せるのは分類 target（`Tensor<i32>`、`Loss::CrossEntropy` / `Loss::Nll`）のみ。`T = f32`（`Loss::Mse` 等）、または `validation = None` で `metrics` が非空だと `InvalidArgument`
- 混同行列の確保に失敗した場合（巨大なクラス数）は `AutodiffError::Shape(ShapeError::ElementCountOverflow)`、クラス数が 0、または `num_classes * num_classes` が `usize` で表現できない場合は `InvalidArgument`
- `Monitor::ValMetric(Metrics)` で `EarlyStopping` / `ModelCheckpoint` / `LrSchedule` が metrics を監視できる。`MonitorMode` の既定は `Min` のため、accuracy 等は `.mode(MonitorMode::Max)` を明示する

## Related

- [compat-training](./compat-training.md)
- [compat-callbacks](./compat-callbacks.md)
