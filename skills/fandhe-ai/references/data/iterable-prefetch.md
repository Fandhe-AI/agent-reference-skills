---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/data/trait.IterableDataset.html
---

# IterableDataset / IterableDataLoader / PrefetchDataLoader

添字アクセス不可・長さ未知のストリーム向け `IterableDataset` とそのバッチ化 `IterableDataLoader`、および `Sampler` を使い worker スレッドでバッチ組み立てを先読みする `PrefetchDataLoader`（PyTorch の `IterableDataset` / `num_workers` 付き `DataLoader` 相当）。

## Signature / Usage

```rust
pub trait IterableDataset {
    type Sample;
    fn iter_samples(&self) -> Box<dyn Iterator<Item = Result<Self::Sample, DataError>> + '_>;
}

pub trait StackSamples: Sized {
    type Batch;
    fn stack_samples(samples: Vec<Self>) -> Result<Self::Batch, DataError>;
}

IterableDataLoader::new(dataset: D, batch_size: usize, drop_last: bool) -> Result<Self, DataError>

PrefetchConfig::new(num_workers: usize, prefetch_depth: usize) -> Result<Self, DataError>
PrefetchDataLoader::new(dataset: D, sampler: impl Sampler + 'static, config: PrefetchConfig)
    -> Result<Self, DataError>
```

```rust
use fandhe_ai_tensor_core::Tensor;
use fandhe_ai_tensor_core::data::{DataError, IterableDataLoader, IterableDataset};

struct Counter(usize);

impl IterableDataset for Counter {
    type Sample = Tensor<f32>;
    fn iter_samples(&self) -> Box<dyn Iterator<Item = Result<Tensor<f32>, DataError>> + '_> {
        Box::new((0..self.0).map(|i| Ok(Tensor::new(vec![i as f32], &[1])?)))
    }
}

let loader = IterableDataLoader::new(Counter(5), 2, false).unwrap();
let sizes: Vec<usize> = loader.iter().map(|b| b.unwrap().shape()[0]).collect();
assert_eq!(sizes, vec![2, 2, 1]);
```

マルチワーカー prefetch:

```rust
use fandhe_ai::Tensor;
use fandhe_ai::data::{PrefetchConfig, PrefetchDataLoader, SequentialSampler, TensorDataset};

let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
let dataset = TensorDataset::new(features).unwrap();
let sampler = SequentialSampler::new(4, 2, false).unwrap();
let cfg = PrefetchConfig::new(2, 2).unwrap();
let mut loader = PrefetchDataLoader::new(dataset, sampler, cfg).unwrap();
let mut batches = 0;
for batch in loader.iter() {
    let _b = batch.unwrap();
    batches += 1;
}
assert_eq!(batches, 2);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `IterableDataset::iter_samples` | method | 呼ぶたびに新しいストリームを返す（epoch ごとに 1 回）。要素を `Result` にして供給元の失敗を型付きで伝える（`DataError::IterableStream`） |
| `StackSamples` | trait | サンプル列を 1 バッチへ積む。実装は `Tensor<T>`（`default_collate` へ委譲）と 2 / 3 要素タプル |
| `IterableDataLoader` | struct | `dataset()` / `into_dataset()` / `batch_size()` / `drop_last()` / `iter() -> IterableBatches<'_, D>` |
| `IterableBatches` | iterator | `D::Sample: StackSamples` の下で `Item = Result<<D::Sample as StackSamples>::Batch, DataError>`。`size_hint` は `(0, None)`（終了後 `(0, Some(0))`） |
| `PrefetchConfig::num_workers()` | `usize` | worker スレッド数。`0` はスレッドを起動せず呼び出しスレッドで逐次処理（PyTorch `num_workers=0` 相当） |
| `PrefetchConfig::prefetch_depth()` | `usize` | in-flight バッチ数の上限（メモリ使用量の目安）。0 は不可 |
| `PREFETCH_MAX_WORKERS` / `PREFETCH_MAX_DEPTH` | `usize` const | いずれも 64。超過・`prefetch_depth == 0` は `DataError::InvalidPrefetchConfig` |
| `PrefetchDataLoader` | struct | `D: Dataset + Send + Sync + 'static`、`D::Batch: Send + 'static`。`dataset()` / `config()` / `num_batches()` / `iter(&mut self) -> PrefetchBatches<'_, D>` |

## Notes

- `IterableDataLoader` はグローバル RNG を消費しない。シャッフル・`Sampler` との併用は型の上で存在しない（PyTorch は実行時 `ValueError`）
- バッファは `batch_size` で事前確保しない（`usize::MAX` でも過大確保しない）。保持は高々 1 バッチ分。ストリームが停止しない場合の待ちは利用者側の責務
- ストリーム途中の `Err`・collate 失敗では、溜めた部分バッチを捨てて `Err` を 1 回だけ yield し以降は `None`（fail-closed）。`batch_size == 0` は `ZeroBatchSize`
- `PrefetchDataLoader` は `std::thread` / `mpsc` ベースで rayon は使わない（`backend-cpu` の GEMM が rayon グローバル pool を使うため競合を避ける）。`Sequential::fit` へは結線しない（fit 本体は結線しない。先読み付き学習は別の入口 `Sequential::fit_with_prefetch`（api/compat-training.md）を使う）
- 決定性: `start_epoch` と `next_batch` は呼び出しスレッドのみ。worker は `dataset.batch(&idx)` のみ実行し、結果は reorder buffer で呼び出し順 `k` に並べ直す。任意の `(num_workers, prefetch_depth)` で出力列（`Err` の位置を含む）は同じ `Sampler` の `SamplerDataLoader` と bit 一致する。前提は `Dataset::batch` が添字だけで決まる純関数であること
- 添字は epoch 全体を事前確定せず `prefetch_depth` の投入窓分だけ生成する。`next_batch` 側で RNG を消費するカスタム `Sampler` は決定性契約の対象外
- worker 内の `dataset.batch` の panic は `catch_unwind` で `DataError::WorkerFailed { batch_index }` に変換される。イテレータは `Drop` でタスク送信側を閉じ worker を join する（途中 `break` でもデッドロックしない）
- `iter()` は `sampler` を可変借用するため、次の epoch は前のイテレータを drop してから呼ぶ
- transform / collate フック（`HookedDataLoader`）の並列化は対象外
- 0.11.0 で `IterableDataset` / `IterableDataLoader` / `IterableBatches` / `StackSamples` は facade（`fandhe_ai::data`）から再エクスポートされている（上の最初の例は内部クレート名で書かれた原文 doc。facade では `fandhe_ai::data::...` を使う）

## Related

- [dataset.md](./dataset.md)
- [dataloader.md](./dataloader.md)
- [samplers.md](./samplers.md)
- [compat-training.md](../api/compat-training.md)
