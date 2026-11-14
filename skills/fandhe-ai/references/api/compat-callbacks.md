---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/compat/enum.Callback.html
---

# compat: Callback / EarlyStopping / ModelCheckpoint / ロガー

`Sequential::fit_with_callbacks` 系へ `&mut [Callback]` として渡す epoch 境界のホスト側制御 callback。閉じた集合の enum `Callback` と、監視指標 `Monitor` / `MonitorMode`、各 callback 型（`EarlyStopping` / `ModelCheckpoint` / `LrSchedule` / `CsvLogger` / `JsonLogger` / `LambdaCallback` / `EmaCallback` / `SwaCallback`）。新規の `Op` / `Var` メソッド / カーネルは追加しない（ホスト側の状態機械のみ）。

## Signature / Usage

```rust
use fandhe_ai::compat::{Callback, EarlyStopping, FitConfig, ModelCheckpoint, Monitor};

let mut cbs = [
    Callback::EarlyStopping(EarlyStopping::new(3).restore_best_weights(true)),
    Callback::ModelCheckpoint(ModelCheckpoint::new().monitor(Monitor::ValLoss).to_file("ckpt/best.safetensors")),
];
let history = model.fit_with_callbacks(&x, &y, FitConfig::new(20, 32), Some((&xv, &yv)), &mut cbs)?;
```

`SwaCallback` の例（`SwaCallback` の rustdoc。fandhe-ai 0.14.0 以降）:

```rust
use fandhe_ai::compat::{Callback, FitConfig, Loss, Optimizer, Sequential, SwaCallback};
use fandhe_ai::optim::{SgdConfig, SwaAnneal};
use fandhe_ai::Tensor;

let mut model = Sequential::new().add_linear(2, 1, 7).unwrap();
model
    .compile(Optimizer::Sgd(SgdConfig::new(0.1)), Loss::Mse)
    .unwrap();
let x = Tensor::new(vec![0.0f32, 1.0, 1.0, 0.0], &[2, 2]).unwrap();
let y = Tensor::new(vec![1.0f32, 1.0], &[2, 1]).unwrap();
let mut cbs = [Callback::Swa(SwaCallback::new(1, 0.05, 0, SwaAnneal::Cos).unwrap())];
model
    .fit_with_callbacks(&x, &y, FitConfig::new(3, 2), None, &mut cbs)
    .unwrap();
let Callback::Swa(swa) = &cbs[0] else { unreachable!() };
assert_eq!(swa.n_averaged(), 2);
// fit は Ok 終了時に平均化重みへ上書き済み。生の重みへ戻すときは退避を適用する。
model.load_state_dict(swa.raw_state_dict().unwrap()).unwrap();
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Callback` | `#[non_exhaustive] enum { EarlyStopping(EarlyStopping), ModelCheckpoint(ModelCheckpoint), LrSchedule(LrSchedule), CsvLogger(CsvLogger), JsonLogger(JsonLogger), Lambda(LambdaCallback), Ema(EmaCallback), Swa(SwaCallback) }` | `Debug` を実装。trait object によるユーザー定義 callback は対象外（`&mut Sequential` を渡すと `fit` 内部の借用構造と衝突するため）。`LrSchedule` が `Send` 境界のない `Box<dyn LrScheduler>` を持つため `Callback` は `!Send` |
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
| `with_warmup(self, enabled: bool) -> Self` / `warmup(&self) -> bool` | メソッド | 減衰率ウォームアップ（既定 OFF）。ON のとき実効 decay は `min(decay, ((1 + n) as f64 / (10 + n) as f64) as f32)`（`n` はそれまでに適用した step の数 = 更新前の `num_updates`。fit をまたいで続き、AMP の skip や累積の端数では進まない）。OFF の経路は従来と bit 同一。初期化済みの shadow にも反映する。失敗経路は無い |
| `SwaCallback::new(swa_start: usize, swa_lr: f32, anneal_epochs: usize, anneal: SwaAnneal) -> Result<Self, AutodiffError>` | 関数 | 確率的重み平均（SWA）を `fit_with_callbacks` へ結線する opt-in callback（`Callback::Swa`）。平均開始 epoch（0 始まり）・SWA 学習率・アニール長・アニール形で構築する。`swa_lr` は有限かつ正（違反は `InvalidArgument`）、`anneal_epochs == 0` は受理する |
| `swa_start(&self) -> usize` / `swa_lr(&self) -> f32` / `anneal_epochs(&self) -> usize` / `anneal(&self) -> SwaAnneal` / `n_averaged(&self) -> u64` | メソッド | 構築時の設定値と、平均更新の成功回数（fit 前は 0、fit をまたいで累積） |
| `averaged_state_dict(&self) -> Option<HashMap<String, Tensor<f32>>>` / `raw_state_dict(&self) -> Option<HashMap<String, Tensor<f32>>>` | メソッド | 平均化重みのキー付きコピー（まだ fit が始まっておらず未初期化なら `None`）と、fit 終了時に平均化重みで上書きする直前の生の重み（複製。退避が無ければ `None`）。生の重みへ戻すには `raw_state_dict()` を `Sequential::load_state_dict` へ渡す |
| `decay(&self) -> f32` / `num_updates(&self) -> u64` / `shadow_state_dict(&self) -> Option<HashMap<String, Tensor<f32>>>` | メソッド | 構築時に検証済みの `decay`、shadow 更新の成功回数（fit 前は 0、fit をまたいで累積）、shadow のキー付きコピー（未初期化なら `None`） |

## Notes

- 処理順序: epoch 末 callbacks は `callbacks` スライス順に処理され、いずれかが打ち切りを要求しても当該 epoch の他の callback を処理してから抜ける。`LrSchedule` の optimizer への書き込みは epoch 開始時のみ（epoch 末の `advance` は内部状態を進めるだけ）
- fit をまたぐ状態: `EarlyStopping` は `fit_with_callbacks` 呼び出しごとに内部状態をリセット（Keras `on_train_begin` と同じ）。`ModelCheckpoint` / `LrSchedule` は継続。`CsvLogger` / `JsonLogger` / `Lambda` の epoch 番号は常に fit ローカル（0 始まり）で、ロガーのファイルは呼び出しごとに開き直す
- `CsvLogger` / `JsonLogger` のファイル準備（truncate / ヘッダ検証）失敗・書き込み失敗・append 時の既存ファイルの不整合は `InvalidArgument`
- `Callback::Ema` は optimizer 更新を `apply_parameters` した直後（`accumulate_steps > 1` では実際に step したときのみ）に shadow を更新し、epoch 末の validation と callbacks は shadow に差し替えた重みで実行して生の重みへ復帰する。fit 終了時にモデルの重みは自動上書きせず、呼び出し側が `shadow_state_dict` を `load_state_dict` へ渡す。複数指定・`Optimizer::Lbfgs`・カスタム train_step フックとの併用は `InvalidArgument`。`compile_with_amp` とは併用でき、AMP が非有限勾配で skip した step では shadow と `num_updates` を更新しない（`num_updates` は実際に適用した step の数。validation と epoch 末の差し替えは skip の有無に関係なく実行する）
- `Monitor::Loss` を監視する `ModelCheckpoint` / `EarlyStopping` を `Callback::Ema` と併用すると、判定値は生の重みで計算した訓練損失、保存・復元する重みは EMA 重みで両者は対応しない。EMA 重みの評価値で判定したい場合は `Monitor::ValLoss` / `Monitor::ValMetric` を使う
- `RmsProp` / `Adagrad` / `Lamb` を compile した状態の `Callback::LrSchedule` は `fit` 系で `InvalidArgument`。空でない param groups の `Callback::LrSchedule` は `compile_with_param_groups` では全 group 共通の倍率として受理され、compile 時の optimizer の lr が 0 または非有限のとき、または AMP 入口（`compile_with_amp_and_param_groups`）で compile 済みのときは `InvalidArgument`
- `Callback::Swa` は epoch 末（validation・epoch 末 callbacks より前。それらは生の重みで実行する）に、`epochs_seen >= swa_start`（0 始まり。PyTorch の `epoch > swa_start` とは 1 ずれる。`epochs_seen` は fit をまたいで通算）の epoch の生の重みで等重み平均を更新し、fit が `Ok` で終わったとき（学習打ち切りを含む）モデルの重みを平均化重みで上書きする（`Err` 終了では上書きしない）。`epochs_seen >= swa_start` の epoch は epoch 開始時（`LrSchedule` の同期後）に `SwaLr` の学習率を optimizer へ書き `history.lr` に記録する（基準 lr は区間に入った最初の epoch 開始時の `optimizer.lr()`。`LrSchedule` と併用した場合は SWA 区間で SWA が優先し、`LrSchedule` の内部カウンタは進む。fit 終了後の optimizer の lr は最後にアニールした値のまま）。基準 lr が非有限・0 以下になった場合は fit 中に `InvalidArgument`
- `Callback::Swa` の併用拒否（fit 開始前に `InvalidArgument`。モデル・compile 状態・callback は不変）: `Callback::Swa` の複数指定・`Optimizer::Lbfgs`・カスタム train_step フック・`compile_with_amp`・`Callback::Ema` との併用・`EarlyStopping::restore_best_weights(true)` との併用・`set_lr` 非対応 optimizer（`RmsProp` / `Adagrad` / `Lamb`）・param groups 設定時。`ModelCheckpoint` と restore 無効の `EarlyStopping` は併用できる。`BatchNorm` の running 統計は平均化されない
- 継続 fit: 次の fit の開始時、モデルの重みが前回の平均化重みと bit 一致なら退避から生の重みを書き戻して継続し、利用者が重みを変えていれば退避を破棄して現在の重みから継続する
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/compat/struct.SwaCallback.html（0.14.0, 取得日 2026-11-14）
- 対象外: ユーザー定義 callback、`TerminateOnNaN` 相当（非有限は `ReduceLrOnPlateau::step` の拒否で fail-closed に停止）、バッチ単位のスケジューリング（epoch 単位のみ）

## Related

- [compat-training](./compat-training.md)
- [compat-metrics](./compat-metrics.md)
- [compat-model-io](./compat-model-io.md)
