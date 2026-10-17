# data

| Name | Description | Path |
|------|-------------|------|
| DataLoader / DataLoaderConfig / HookedDataLoader | `Dataset` を `DataLoaderConfig`（batch_size / shuffle / drop_last）に従ってミニバッチへ分割する `DataLoader` と、フック付きの `HookedDataLoader`。 | [dataloader.md](./dataloader.md) |
| Dataset / TensorDataset / Subset / ConcatDataset / random_split / collate | map-style データセットの trait `Dataset` と実装 `TensorDataset`、合成型 `Subset` / `ConcatDataset`、分割関数 `random_split`、collate 系関数。 | [dataset.md](./dataset.md) |
| IterableDataset / IterableDataLoader / PrefetchDataLoader | 添字アクセス不可のストリーム向け `IterableDataset` と、そのバッチ化 `IterableDataLoader`、worker で先読みする `PrefetchDataLoader`。 | [iterable-prefetch.md](./iterable-prefetch.md) |
| Sampler / SequentialSampler / RandomSampler / WeightedRandomSampler / BatchSampler / SamplerDataLoader | バッチ添字を供給する拡張点 `Sampler` trait と組み込み 4 実装、添字列を `Dataset::batch` へ渡す `SamplerDataLoader`。 | [samplers.md](./samplers.md) |
| text::TextVectorization（Keras TextVectorization 相当） | 文字列バッチを標準化・分割（任意で n-gram）し、語彙で整数 id に引いて `[B, L]` の `Tensor<i32>` にするテキスト変換。 | [text-vectorization.md](./text-vectorization.md) |
