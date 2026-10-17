---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/data/struct.DataLoader.html
---

# DataLoader / DataLoaderConfig / HookedDataLoader

`Dataset` を `DataLoaderConfig`（batch_size / shuffle / drop_last）に従ってミニバッチへ分割する `DataLoader`（PyTorch `torch.utils.data.DataLoader` 相当）と、`Sampler` + サンプル単位 transform / collate フックを持つ `HookedDataLoader`。

## Signature / Usage

```rust
pub struct DataLoaderConfig { pub batch_size: usize, pub shuffle: bool, pub drop_last: bool }
impl DataLoaderConfig {
    pub fn new(batch_size: usize) -> Self;          // shuffle=false, drop_last=false
    pub fn shuffle(self, on: bool) -> Self;
    pub fn drop_last(self, on: bool) -> Self;
}

impl<D: Dataset> DataLoader<D> {
    pub fn new(dataset: D, config: DataLoaderConfig) -> Result<Self, DataError>;
    pub fn dataset(&self) -> &D;
    pub fn config(&self) -> DataLoaderConfig;
    pub fn len(&self) -> usize;          // 1 epoch のバッチ数
    pub fn is_empty(&self) -> bool;
    pub fn iter(&self) -> Batches<'_, D>;
    pub fn into_dataset(self) -> D;
}
```

```rust
use fandhe_ai::data::{DataLoader, DataLoaderConfig, Dataset, TensorDataset};
use fandhe_ai::Tensor;

let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
let labels = Tensor::new(vec![0i32, 1, 0, 1], &[4]).unwrap();
let dataset = (
    TensorDataset::new(features).unwrap(),
    TensorDataset::new(labels).unwrap(),
);
let loader = DataLoader::new(dataset, DataLoaderConfig::new(2)).unwrap();
assert_eq!(loader.len(), 2);
for batch in &loader {
    let (x, y) = batch.unwrap();
    assert_eq!(x.shape()[0], y.shape()[0]);
}
```

フック付き（`Sampler` と transform）:

```rust
use fandhe_ai::Tensor;
use fandhe_ai::data::{HookedDataLoader, SequentialSampler, TensorDataset};

let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
let dataset = TensorDataset::new(features).unwrap();
let sampler = SequentialSampler::new(4, 2, false).unwrap();
let mut loader = HookedDataLoader::new(dataset, sampler)
    .unwrap()
    .with_transform(|t| {
        let scaled: Vec<f32> = t.host_slice().iter().map(|&v| v * 10.0).collect();
        Tensor::new(scaled, t.shape()).unwrap()
    });
for batch in loader.iter() {
    let b = batch.unwrap();
    assert_eq!(b.shape(), &[2, 1]);
}
```

## Options / Props

### DataLoaderConfig

| Name | Type | Description |
| --- | --- | --- |
| `batch_size` | `usize` | 1 バッチのサンプル数。0 は `DataLoader::new` が `DataError::ZeroBatchSize` で拒否 |
| `shuffle` | `bool` | `true` で `iter()` ごとに順列を引き直す（epoch ごと再シャッフル）。`false` はグローバル RNG を消費しない |
| `drop_last` | `bool` | `true` で `batch_size` 未満の端数バッチを捨てる（バッチ数は floor、`false` は ceil） |

### HookedDataLoader<T: Element>

| Name | Type | Description |
| --- | --- | --- |
| `new(dataset: TensorDataset<T>, sampler: impl Sampler + 'static)` | `Result<Self, DataError>` | `TensorDataset<T>` 限定 |
| `with_transform(f)` | builder | `Fn(Tensor<T>) -> Tensor<T> + Send + Sync + 'static`（サンプル単位、infallible） |
| `with_try_transform(f)` | builder | `Fn(Tensor<T>) -> Result<Tensor<T>, DataError>`（fallible） |
| `with_collate(f)` | builder | `Fn(&[Tensor<T>]) -> Tensor<T>`（infallible） |
| `with_try_collate(f)` | builder | `Fn(&[Tensor<T>]) -> Result<Tensor<T>, DataError>`（fallible） |
| `dataset()` / `into_dataset()` / `num_batches() -> Option<usize>` | method | アクセサ |
| `iter(&mut self)` | `HookedBatches<'_, T>` | 1 epoch 分のイテレータ。`Item = Result<Tensor<T>, DataError>` |

## Notes

- `DataLoader::iter()` は infallible のまま。添字順列の事前検査（`checked_numel_for::<usize>`）に失敗した場合は RNG を消費せず、最初の `next()` で `DataError::Shape` を 1 回だけ yield し以降は `None`
- `Batches` は `ExactSizeIterator`。`&DataLoader` は `IntoIterator`（`for batch in &loader`）
- `DataLoader::new` はタプルデータセットの成分間長さ不一致を `validate()` で構築時に拒否する（A08）
- `DataLoader` / `DataLoaderConfig` は 0.11.0 で既存形のまま不変。`DataLoaderConfig` は `#[non_exhaustive]` ではなく、フィールドを足すと構造体リテラル構築を壊すため、Sampler / フック系は別ローダー型として追加されている
- `HookedBatches` の処理順は「サンプリング → サンプルごとに transform → collate」。transform も collate も未設定なら `Dataset::batch` の fast path を通り、`with_*` を 1 度でも呼ぶと slow path（collate 未設定は `default_collate`）に切り替わる
- Sampler の抽選は epoch 開始時に確定し、transform / collate はその後にバッチごとに走るため、`manual_seed` 下の再現性は sampler の抽選順のみで説明できる
- Dataset / DataLoader には Op / VJP / バックエンド別カーネルが無く、バッチ化したテンソルは `Tape::var` でデバイスへ反映する想定
- マルチワーカーの先読みは `PrefetchDataLoader`（`iterable-prefetch.md`）。HookedDataLoader の transform / collate の並列化は対象外

## Related

- [dataset.md](./dataset.md)
- [samplers.md](./samplers.md)
- [iterable-prefetch.md](./iterable-prefetch.md)
