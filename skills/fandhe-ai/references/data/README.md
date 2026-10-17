# data

| Name | Description | Path |
|------|-------------|------|
| DataLoader / DataLoaderConfig / HookedDataLoader | `Dataset` を `DataLoaderConfig`（batch_size / shuffle / drop_last）に従ってミニ… | [dataloader.md](./dataloader.md) |
| Dataset / TensorDataset / Subset / ConcatDataset / random_split / collate | map-style データセットの trait `Dataset`（`len()` と添字列 → バッチの `batch()`）と… | [dataset.md](./dataset.md) |
| IterableDataset / IterableDataLoader / PrefetchDataLoader | 添字アクセス不可・長さ未知のストリーム向け `IterableDataset` とそのバッチ化 `Iterable… | [iterable-prefetch.md](./iterable-prefetch.md) |
| Sampler / SequentialSampler / RandomSampler / WeightedRandomSampler / BatchSampler / SamplerDataLoader | バッチ添字を供給する拡張点 `Sampler` trait と組み込み 4 実装、および `Sampler` の添字… | [samplers.md](./samplers.md) |
| text::TextVectorization（Keras TextVectorization 相当） | 文字列バッチを標準化・分割（任意で n-gram）し、語彙で整数 id へ引いて `[B, L]` の `Ten… | [text-vectorization.md](./text-vectorization.md) |
