---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/inference/fn.get_phase_metrics.html
---

# predict_batches / PredictBatchInput / 推論フェーズ計測（PhaseMetrics）

`compat::Sequential::predict_batches` が `DataLoader` を全バッチ反復して推論する際の内訳（データロード・tape 構築・forward・デバイス転送の累計時間・呼び出し回数）を、`inference` モジュールの `get_phase_metrics` / `reset_phase_metrics` / `PhaseMetrics` で読む。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::compat::Sequential;
use fandhe_ai::data::{DataLoader, DataLoaderConfig, TensorDataset};
use fandhe_ai::inference::{InferencePhase, get_phase_metrics, reset_phase_metrics};

let model = Sequential::new().add_linear(2, 1, 7).unwrap();
let x = Tensor::<f32>::new(vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0], &[3, 2]).unwrap();
let loader = DataLoader::new(
    TensorDataset::new(x).unwrap(),
    DataLoaderConfig::new(2),
)
.unwrap();

reset_phase_metrics();
let before = get_phase_metrics();
let outputs = model.predict_batches(&loader).unwrap();
let delta = get_phase_metrics().since(&before);

assert_eq!(outputs.len(), 2);
assert_eq!(delta.batches(), 2);
assert_eq!(delta.samples(), 3);
assert_eq!(delta.phase(InferencePhase::Forward).calls(), 2);
assert_eq!(delta.phase(InferencePhase::DeviceTransfer).calls(), 0);
assert_eq!(delta.total().calls(), 1);
```

```rust
// compat::Sequential
pub fn predict_batches<D>(
    &self,
    loader: &DataLoader<D>,
) -> Result<Vec<Tensor<f32>>, AutodiffError>
where
    D: Dataset,
    D::Batch: PredictBatchInput,

// inference
pub fn get_phase_metrics() -> PhaseMetrics
pub fn reset_phase_metrics()
```

## Options / Props

`InferencePhase`（`#[non_exhaustive]`、`Debug, Clone, Copy, PartialEq, Eq`）:

| Variant | Description |
|---------|-------------|
| `DataLoad` | `DataLoader::iter` / `Batches::next` の呼び出し（バッチの切り出し） |
| `TapeBuild` | tape 経路の `crate::tape()`。tape 不要経路では計上されない（`calls == 0`） |
| `Forward` | 層の forward 実行 |
| `DeviceTransfer` | デバイス常駐経路用に予約。CPU 固定の `predict_batches` 経路では常に `calls == 0` |

`PhaseStat`（フィールド非公開。加減算は飽和演算で panic しない）:

| Method | Description |
|--------|-------------|
| `total_micros(&self) -> u128` | 累計時間（マイクロ秒） |
| `calls(&self) -> u64` | 累計呼び出し回数 |
| `total(&self) -> Duration` | 累計時間（`Duration`） |

`PhaseMetrics`（`#[non_exhaustive]`、`Debug, Clone, Copy, Default, PartialEq, Eq`）:

| Method | Description |
|--------|-------------|
| `phase(&self, phase: InferencePhase) -> PhaseStat` | 指定フェーズの集計値 |
| `total(&self) -> PhaseStat` | `predict_batches` 呼び出し全体の集計値（`calls` は呼び出し回数。フェーズ間の計測されない隙間時間を含む） |
| `batches(&self) -> u64` | 反復したバッチ数の累計 |
| `samples(&self) -> u64` | 反復した総サンプル数の累計（入力バッチの先頭軸から数える。rank 0 は 1 件） |
| `since(&self, before: &Self) -> Self` | `before` との飽和差分（before/after スナップショット比較） |

`PredictBatchInput`（封印済みトレイト）:

| Implementor | Description |
|-------------|-------------|
| `Tensor<f32>` | そのまま推論入力 |
| `(Tensor<f32>, B)` | ラベル `B` は無視 |
| `(Tensor<f32>, B, C)` | ラベル `B`, `C` は無視 |

## Notes

- 集計単位はスレッド単位: 累計は thread-local で、呼び出しスレッドが `predict_batches` で計測した累計を意味する（他スレッドの計測は含まない）。`reset_phase_metrics` も呼び出しスレッドのみゼロに戻す。
- `predict_batches` は途中で失敗しても、それまでに計測した分を thread-local へ反映してから返す。
- 単体の `Sequential::predict` は常時計測しない（no-op recorder）。
- `PredictBatchInput` は封印されており、利用者が実装することもメソッドを呼ぶ必要もない。ラベル付きデータセットでは Keras `model.predict(dataset)` と同様に特徴量のみが推論される。
- `PhaseMetrics` / `PhaseStat` / `InferencePhase` / `PredictBatchInput` / `get_phase_metrics` / `reset_phase_metrics` が公開面で、`PhaseRecorder` 等は crate 内専用。
- 時間値は環境依存のため、テストでは回数（`calls` / `batches` / `samples`）で検証する。

## Related

- [compat-sequential.md](../api/compat-sequential.md)
