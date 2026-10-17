---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/data/trait.Sampler.html
---

# Sampler / SequentialSampler / RandomSampler / WeightedRandomSampler / BatchSampler / SamplerDataLoader

バッチ添字を供給する拡張点 `Sampler` trait と組み込み 4 実装、および `Sampler` の添字列を `Dataset::batch` へ渡す `SamplerDataLoader`（PyTorch の `Sampler` + `BatchSampler` を合わせた「バッチ sampler」相当）。

## Signature / Usage

```rust
pub trait Sampler: Send {
    fn start_epoch(&mut self) -> Result<(), DataError>;   // epoch 開始時に 1 回
    fn next_batch(&mut self) -> Vec<usize>;               // 空 Vec は epoch 終了の番兵
    fn num_batches(&self) -> Option<usize> { None }
}

SequentialSampler::new(len: usize, batch_size: usize, drop_last: bool) -> Result<Self, DataError>
RandomSampler::new(len: usize, batch_size: usize, drop_last: bool) -> Result<Self, DataError>
WeightedRandomSampler::new(weights: Vec<f32>, num_samples: usize, replacement: bool,
                           batch_size: usize, drop_last: bool) -> Result<Self, DataError>
BatchSampler::new(order: Vec<usize>, batch_size: usize, drop_last: bool) -> Result<Self, DataError>

SamplerDataLoader::new(dataset: D, sampler: impl Sampler + 'static) -> Result<Self, DataError>
```

```rust
use fandhe_ai::Tensor;
use fandhe_ai::data::{SamplerDataLoader, SequentialSampler, TensorDataset};

let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
let dataset = TensorDataset::new(features).unwrap();
let sampler = SequentialSampler::new(4, 2, false).unwrap();
let mut loader = SamplerDataLoader::new(dataset, sampler).unwrap();
for batch in loader.iter() {
    let b = batch.unwrap();
    assert_eq!(b.shape(), &[2, 1]);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `SequentialSampler` | struct | 連番順（シャッフルなし）。グローバル RNG を消費しない |
| `RandomSampler` | struct | 順列。同一 `manual_seed` の下で `DataLoader{shuffle=true}` と添字順が bit 一致 |
| `WeightedRandomSampler` | struct | 重み付き復元・非復元抽出。構築時に有限性・非負・総和が正・非復元時の重み不足を検証（RNG 非消費）。`start_epoch` は `rng::multinomial` を呼び、同一シードで `multinomial(&weights, num_samples, replacement)` と抽選列が bit 一致。`num_samples == 0` は抽選を省略 |
| `BatchSampler` | struct | 利用者が与えた添字列を `batch_size` ごとに束ねる。毎 epoch 同じ順、RNG 非消費。重複・空の順列は許容 |
| `SamplerDataLoader<D>` | struct | `dataset()` / `into_dataset()` / `num_batches() -> Option<usize>` / `iter(&mut self) -> SamplerBatches<'_, D>`。`Item = Result<D::Batch, DataError>`。タプルデータセットでも全成分に同じ添字が使われる |

## Notes

- `batch_size == 0` は全コンストラクタで `DataError::ZeroBatchSize`
- `Sampler::num_batches` が `Some` の実装では、その値が `next_batch` が実際に空以外を返す回数と一致する。`SamplerBatches` の `size_hint` は `num_batches()` と自身が yield した数の差分で残数を返す
- `Sampler: Send` 境界はマルチワーカー化（`PrefetchDataLoader`）のため
- `SequentialSampler` / `RandomSampler` の `start_epoch` は `Dataset::len()` 相当の `len` を `checked_numel_for::<usize>` で事前検査してから順列を確定する。`RandomSampler` は `len == 0` でも RNG を消費する（`DataLoader` の既存契約と同じ。事前検査失敗時のみ非消費）
- `BatchSampler` は添字の範囲検査をしない（データセット長を知らないため）。範囲外は `Dataset::batch` が `IndexOutOfRange` で拒否する。`start_epoch` 前の `next_batch` は空を返す
- `start_epoch` が失敗した場合、イテレータは最初の `next()` で `Err` を 1 回だけ返し以降 `None`
- 0.11.0 で `BatchSampler` は facade（`fandhe_ai::data`）から再エクスポートされている

## Related

- [dataset.md](./dataset.md)
- [dataloader.md](./dataloader.md)
- [iterable-prefetch.md](./iterable-prefetch.md)
