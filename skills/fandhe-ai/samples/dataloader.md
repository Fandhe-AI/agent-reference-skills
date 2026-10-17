---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/data.rs
---

# Dataset and DataLoader

`TensorDataset` と `DataLoader` でミニバッチを供給し、Sampler / フック / prefetch / `random_split` で拡張する。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::data::{
    DataLoader, DataLoaderConfig, Dataset, HookedDataLoader, PrefetchConfig, PrefetchDataLoader,
    SequentialSampler, TensorDataset, random_split,
};

fn main() {
    // 基本: (特徴量, ラベル) のタプル Dataset をバッチ 2 で巡回
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

    // Sampler + 変換フック
    let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
    let dataset = TensorDataset::new(features).unwrap();
    let sampler = SequentialSampler::new(4, 2, false).unwrap();
    let mut loader = HookedDataLoader::new(dataset, sampler)
        .unwrap()
        .with_transform(|t| {
            let scaled: Vec<f32> = t.host_slice().iter().map(|&v| v * 10.0).collect();
            Tensor::new(scaled, t.shape()).unwrap()
        });
    let mut seen = Vec::new();
    for batch in loader.iter() {
        let b = batch.unwrap();
        assert_eq!(b.shape(), &[2, 1]);
        seen.extend(b.host_slice().iter().copied());
    }
    assert_eq!(seen, vec![0.0, 10.0, 20.0, 30.0]);

    // マルチワーカー prefetch
    let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
    let dataset = TensorDataset::new(features).unwrap();
    let sampler = SequentialSampler::new(4, 2, false).unwrap();
    let cfg = PrefetchConfig::new(2, 2).unwrap();
    let mut loader = PrefetchDataLoader::new(dataset, sampler, cfg).unwrap();
    let mut batches = 0;
    for batch in loader.iter() {
        let _ = batch.unwrap();
        batches += 1;
    }
    assert_eq!(batches, 2);

    // Dataset 分割
    let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
    let dataset = TensorDataset::new(features).unwrap();
    let parts = random_split(dataset, &[3, 1]).unwrap();
    assert_eq!((parts[0].len(), parts[1].len()), (3, 1));
}
```

## Notes

- コードは `src/data.rs`（0.11.0）モジュール doc の 4 つの例を 1 つの `main` にまとめたもの（上流では doctest）。`fandhe_ai::data` は `fandhe_ai_tensor_core::data` の純再エクスポート
- prefetch は `std::thread` / `mpsc` ベースで `Sequential::fit` へは結線されない。`Sequential::fit_with_prefetch` を使うと `fit_with_metrics` と bit 一致する結果になるが、性能改善は保証されない（上流 doc の記述）
- この環境では `cargo check` を実行できなかったため、本ページのコンパイル検証は未実施（上流 doctest に依拠）
