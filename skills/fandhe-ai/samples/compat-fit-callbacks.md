---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/compat/callbacks.rs
---

# Fit with Callbacks

`Sequential::compile` → `fit_with_callbacks` で `CsvLogger` を使い、epoch ごとの履歴を CSV に書く。0.14.0 の `Callback::Ema`（減衰率ウォームアップ）と `Callback::Swa`（確率的重み平均）の例も併記する。

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

`Callback::Ema` で減衰率ウォームアップを有効にする例（既定は OFF）:

```rust
use fandhe_ai::compat::{Callback, EmaCallback, FitConfig, Loss, Optimizer, Sequential};
use fandhe_ai::optim::SgdConfig;
use fandhe_ai::Tensor;

fn main() {
    let mut model = Sequential::new().add_linear(2, 1, 7).unwrap();
    model
        .compile(Optimizer::Sgd(SgdConfig::new(0.1)), Loss::Mse)
        .unwrap();
    let x = Tensor::new(vec![0.0f32, 1.0, 1.0, 0.0], &[2, 2]).unwrap();
    let y = Tensor::new(vec![1.0f32, 1.0], &[2, 1]).unwrap();
    let mut cbs = [Callback::Ema(EmaCallback::new(0.999).unwrap().with_warmup(true))];
    model
        .fit_with_callbacks(&x, &y, FitConfig::new(3, 2), None, &mut cbs)
        .unwrap();
    let Callback::Ema(ema) = &cbs[0] else { unreachable!() };
    assert!(ema.warmup());
    assert_eq!(ema.num_updates(), 3);
}
```

`Callback::Swa` で epoch 末に重みの等重み平均を取り、fit 終了時に平均化重みへ上書きする例:

```rust
use fandhe_ai::compat::{Callback, FitConfig, Loss, Optimizer, Sequential, SwaCallback};
use fandhe_ai::optim::{SgdConfig, SwaAnneal};
use fandhe_ai::Tensor;

fn main() {
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
}
```

## Notes

- 1 つ目のコードは `src/compat/callbacks.rs`（0.14.0。0.11.0 から変わらない）の `CsvLogger` doc 例、2 つ目は `EmaCallback` の doc 例、3 つ目は `SwaCallback` の doc 例（いずれも上流では doctest。2・3 つ目は `fn main` で包んだ）。`FitConfig::new(epochs, batch_size)` の順
- 上の例は手動 SGD の `training-loop.md` と違い、`compile` で optimizer と損失を登録して `fit_*` 系に任せる経路。`fit_with_prefetch` は `PrefetchConfig` を追加で受け取る（`dataloader.md` 参照）
- `CsvLogger` は末尾が改行で終わっていないファイルに追記する際、改行を補ってから書く。I/O 失敗は `AutodiffError::InvalidArgument` として fit を打ち切る
- `EmaCallback::with_warmup(true)` は実効 decay を `min(decay, (1 + n) / (10 + n))`（n はそれまでに適用した step 数）にする。AMP（`compile_with_amp`）併用時は skip した step で shadow と `num_updates` を更新しない
- `Callback::Swa` は epoch 末（validation・epoch 末 callbacks より前）に `epochs_seen >= swa_start` の epoch の生の重みで平均を更新し、`SwaLr` の学習率を書く。`Callback::Ema` の併用・`compile_with_amp`・`Optimizer::Lbfgs`・param groups 設定時・`EarlyStopping::restore_best_weights(true)` などとの併用は fit 開始前に `InvalidArgument` で拒否される
- Source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/compat/callbacks.rs（0.14.0, 取得日 2026-11-14）
