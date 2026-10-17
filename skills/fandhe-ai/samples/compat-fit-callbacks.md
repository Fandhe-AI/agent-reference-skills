---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/compat/callbacks.rs
---

# Fit with Callbacks

`Sequential::compile` → `fit_with_callbacks` で `CsvLogger` を使い、epoch ごとの履歴を CSV に書く。

```rust
use fandhe_ai::compat::{Callback, CsvLogger, FitConfig, Loss, Optimizer, Sequential};
use fandhe_ai::optim::SgdConfig;
use fandhe_ai::Tensor;

fn main() {
    let dir = std::env::temp_dir().join(format!(
        "fandhe-csv-doc-{}-{}",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0)
    ));
    let path = dir.join("log.csv");

    let mut model = Sequential::new().add_linear(2, 1, 7).unwrap();
    model
        .compile(Optimizer::Sgd(SgdConfig::new(0.1)), Loss::Mse)
        .unwrap();
    let x = Tensor::new(vec![0.0f32, 1.0, 1.0, 0.0], &[2, 2]).unwrap();
    let y = Tensor::new(vec![1.0f32, 1.0], &[2, 1]).unwrap();
    let mut cbs = [Callback::CsvLogger(CsvLogger::new(&path))];
    model
        .fit_with_callbacks(&x, &y, FitConfig::new(2, 2), None, &mut cbs)
        .unwrap();

    let text = std::fs::read_to_string(&path).unwrap();
    let lines: Vec<&str> = text.lines().collect();
    assert_eq!(lines[0], "epoch,loss,lr");
    assert_eq!(lines.len(), 3);
    let _ = std::fs::remove_dir_all(&dir);
}
```

## Notes

- コードは `src/compat/callbacks.rs`（0.11.0）の `CsvLogger` doc 例（上流では doctest）。`FitConfig::new(epochs, batch_size)` の順
- 上の例は手動 SGD の `training-loop.md` と違い、`compile` で optimizer と損失を登録して `fit_*` 系に任せる経路。`fit_with_prefetch` は `PrefetchConfig` を追加で受け取る（`dataloader.md` 参照）
- `CsvLogger` は末尾が改行で終わっていないファイルに追記する際、改行を補ってから書く。I/O 失敗は `AutodiffError::InvalidArgument` として fit を打ち切る
- この環境では `cargo check` を実行できなかったため、本ページのコンパイル検証は未実施（上流 doctest に依拠）
