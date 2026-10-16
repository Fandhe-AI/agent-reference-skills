---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/enum.Callback.html
---

# compat: Callback / EarlyStopping / ModelCheckpoint / ロガー

`Sequential::fit_with_callbacks` 系へ `&mut [Callback]` として渡す epoch 境界のホスト側制御 callback。閉じた集合の enum `Callback` と、監視指標 `Monitor` / `MonitorMode`、各 callback 型（`EarlyStopping` / `ModelCheckpoint` / `LrSchedule` / `CsvLogger` / `JsonLogger` / `LambdaCallback` / `EmaCallback`）。新規の `Op` / `Var` メソッド / カーネルは追加しない（ホスト側の状態機械のみ）。

## Signature / Usage

```rust
use fandhe_ai::compat::{Callback, EarlyStopping, FitConfig, ModelCheckpoint, Monitor};

let mut cbs = [
    Callback::EarlyStopping(EarlyStopping::new(3).restore_best_weights(true)),
    Callback::ModelCheckpoint(ModelCheckpoint::new().monitor(Monitor::ValLoss).to_file("ckpt/best.safetensors")),
];
let history = model.fit_with_callbacks(&x, &y, FitConfig::new(20, 32), Some((&xv, &yv)), &mut cbs)?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Callback` | `#[non_exhaustive] enum { EarlyStopping(EarlyStopping), ModelCheckpoint(ModelCheckpoint), LrSchedule(LrSchedule), CsvLogger(CsvLogger), JsonLogger(JsonLogger), Lambda(LambdaCallback), Ema(EmaCallback) }` | `Debug` を実装。trait object によるユーザー定義 callback は対象外（`&mut Sequential` を渡すと `fit` 内部の借用構造と衝突するため）。`LrSchedule` が `Send` 境界のない `Box<dyn LrScheduler>` を持つため `Callback` は `!Send` |
| `Monitor` | `#[non_exhaustive] enum { Loss, ValLoss, ValMetric(Metrics) }` | 監視する `History` の列。`Loss`: `History::loss`、`ValLoss`: `History::val_loss`（既定。`validation` が `None` では `InvalidArgument`）、`ValMetric(Metrics)`: `History::val_metrics`（`validation` が `None`、`fit_with_metrics` の `metrics` に含まれない、`Metrics::ConfusionMatrix`（非スカラー）の場合は `InvalidArgument`） |
| `MonitorMode` | `#[non_exhaustive] enum { Min, Max }` | 改善方向。`Min`（既定）: 小さいほど良い、`Max`: 大きいほど良い。accuracy 等を監視する場合は `Max` を明示する（自動推定はしない）。改善判定は `value < best - min_delta`（`Min`）/ `value > best + min_delta`（`Max`）で、NaN は決して改善として扱われない |
| `EarlyStopping::new(patience: usize) -> Self` | 関数 | 監視指標が `patience` epoch 連続で改善しなければ学習を打ち切る（Keras `EarlyStopping`）。既定: `monitor = Monitor::ValLoss`、`mode = MonitorMode::Min`、`min_delta = 0.0`、`restore_best_weights = false` |
| `monitor(self, m: Monitor) -> Self` / `mode(self, m: MonitorMode) -> Self` / `restore_best_weights(self, on: bool) -> Self` | メソッド（ビルダー） | `restore_best_weights(true)` は、早期停止・完走・エラーによる早期終了のいずれでも、`best` が観測済みなら返る直前に `load_state_dict` で best スナップショットへ復元する（Keras 3 と同じ意味論）。複数の `EarlyStopping` が該当する場合は並び順で最後が勝つ |
| `min_delta(self, d: f32) -> Result<Self, AutodiffError>` | メソッド（ビルダー） | 改善判定のしきい値。非有限または負値は `InvalidArgument` |
| `stopped_epoch(&self) -> Option<usize>` / `best_value(&self) -> Option<f32>` / `best_epoch(&self) -> Option<usize>` | メソッド | 打ち切った fit ローカル epoch 番号（完走なら `None`）、best 指標値、best を観測した fit ローカル epoch 番号（0 始まり） |
| `ModelCheckpoint::new() -> Self` | 関数 | 監視指標改善時（既定）または全 epoch 末にモデルの `state_dict()` スナップショットを保持する（Keras `ModelCheckpoint`）。既定: `monitor = Monitor::ValLoss`、`mode = MonitorMode::Min`、`save_best_only = true`、ファイル保存なし |
| `monitor(self, m: Monitor) -> Self` / `mode(self, m: MonitorMode) -> Self` / `save_best_only(self, on: bool) -> Self` | メソッド（ビルダー） | `save_best_only(false)` は全 epoch 末でスナップショットを上書き（最終 epoch のものが残る） |
| `to_file(self, path: impl AsRef<Path>) -> Self` | メソッド（ビルダー） | スナップショット更新時に safetensors ファイルへも書き出す（ビルダー自体は I/O しない。I/O は epoch 末の観測時のみ）。親ディレクトリが無ければ `create_dir_all` し、一時ファイル + `rename` で原子的に上書き。永続化に成功した場合に限り `best` / `best_epoch` / `state` を前進させ、保存失敗は `InvalidArgument` で fit 全体を打ち切る（`restore_best_weights` の復元・モード復元・`compiled` の書き戻しは行われ、次回 fit で再試行できる） |
| `best_state_dict(&self) -> Option<&HashMap<String, Tensor<f32>>>` / `take_best_state_dict(&mut self) -> Option<HashMap<String, Tensor<f32>>>` | メソッド | 保持中のスナップショットへの参照 / 取り出し（`Sequential::load_state_dict` へそのまま渡せる。取り出し後の `best_state_dict` は `None`） |
| `best_value(&self) -> Option<f32>` / `best_epoch(&self) -> Option<usize>` | メソッド | best 指標値と、best を観測した通算 epoch 番号（複数回の fit をまたいだ通算） |
| `LrSchedule::per_epoch(s: impl LrScheduler + 'static) -> Self` | 関数 | `StepLr` 等の stateless な `LrScheduler` を epoch 番号で駆動する |
| `LrSchedule::plateau(s: ReduceLrOnPlateau) -> Self` / `LrSchedule::plateau_with_monitor(s: ReduceLrOnPlateau, monitor: Monitor) -> Self` | 関数 | `ReduceLrOnPlateau` を監視指標で駆動する。`plateau` は `Monitor::ValLoss` |
| `epoch(&self) -> usize` | メソッド | 次に適用する epoch 番号（`fit_with_callbacks` をまたいで継続する通算値） |
| `CsvLogger::new(path: impl AsRef<Path>) -> Self` / `append(self, on: bool) -> Self` | 関数 / メソッド | epoch 末に学習経過を CSV へ書く。既定 `append(false)`。I/O は fit 開始時まで発生しない。ヘッダは `epoch,loss,lr`（検証ありで `val_loss`、metrics 指定で `val_accuracy` / `val_precision` / `val_recall` / `val_f1` が続く固定順）。非有限値は `NaN` / `inf` / `-inf` で書く |
| `JsonLogger::new(path: impl AsRef<Path>) -> Self` / `append(self, on: bool) -> Self` | 関数 / メソッド | epoch 末に JSON 配列の 1 要素（`{"epoch":..,"loss":..,"lr":..}`）を書く。`append(true)` は既存の JSON 配列へ追記。非有限値はクォート付き文字列 `"NaN"` / `"Infinity"` / `"-Infinity"` |
| `LambdaCallback::on_epoch_end(f: impl FnMut(usize, &History) -> Result<(), AutodiffError> + 'static) -> Self` | 関数 | epoch 末に `f(epoch_local, &history)` を呼ぶ。`Err` はそのまま返って fit を打ち切る。`Send` 境界は無い |
| `EmaCallback::new(decay: f32) -> Result<Self, AutodiffError>` | 関数 | 重みの指数移動平均（`ExponentialMovingAverage` を結線）。`decay` は有限かつ `[0, 1]`（違反は `InvalidArgument`） |
| `decay(&self) -> f32` / `num_updates(&self) -> u64` / `shadow_state_dict(&self) -> Option<HashMap<String, Tensor<f32>>>` | メソッド | 構築時に検証済みの `decay`、shadow 更新の成功回数（fit 前は 0、fit をまたいで累積）、shadow のキー付きコピー（未初期化なら `None`） |

## Notes

- 処理順序: epoch 末 callbacks は `callbacks` スライス順に処理され、いずれかが打ち切りを要求しても当該 epoch の他の callback を処理してから抜ける。`LrSchedule` の optimizer への書き込みは epoch 開始時のみ（epoch 末の `advance` は内部状態を進めるだけ）
- fit をまたぐ状態: `EarlyStopping` は `fit_with_callbacks` 呼び出しごとに内部状態をリセット（Keras `on_train_begin` と同じ）。`ModelCheckpoint` / `LrSchedule` は継続。`CsvLogger` / `JsonLogger` / `Lambda` の epoch 番号は常に fit ローカル（0 始まり）で、ロガーのファイルは呼び出しごとに開き直す
- `CsvLogger` / `JsonLogger` のファイル準備（truncate / ヘッダ検証）失敗・書き込み失敗・append 時の既存ファイルの不整合は `InvalidArgument`
- `Callback::Ema` は optimizer 更新を `apply_parameters` した直後（`accumulate_steps > 1` では実際に step したときのみ）に shadow を更新し、epoch 末の validation と callbacks は shadow に差し替えた重みで実行して生の重みへ復帰する。fit 終了時にモデルの重みは自動上書きせず、呼び出し側が `shadow_state_dict` を `load_state_dict` へ渡す。複数指定・`Optimizer::Lbfgs`・`compile_with_amp`・カスタム train_step フックとの併用は `InvalidArgument`
- `Monitor::Loss` を監視する `ModelCheckpoint` / `EarlyStopping` を `Callback::Ema` と併用すると、判定値は生の重みで計算した訓練損失、保存・復元する重みは EMA 重みで両者は対応しない。EMA 重みの評価値で判定したい場合は `Monitor::ValLoss` / `Monitor::ValMetric` を使う
- `RmsProp` / `Adagrad` / `Lamb` を compile した状態の `Callback::LrSchedule`、空でない param groups の `Callback::LrSchedule` は `fit` 系で `InvalidArgument`
- 対象外: ユーザー定義 callback、`TerminateOnNaN` 相当（非有限は `ReduceLrOnPlateau::step` の拒否で fail-closed に停止）、バッチ単位のスケジューリング（epoch 単位のみ）

## Related

- [compat-training](./compat-training.md)
- [compat-metrics](./compat-metrics.md)
- [compat-model-io](./compat-model-io.md)
