---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/optim.rs
---

# Optimizer and LR Scheduler

`fandhe_ai::optim` の LR スケジューラ・EMA・Rprop / Lion を手動ループ向けに使う。

```rust
use fandhe_ai::compat::{Loss, Optimizer, Sequential};
use fandhe_ai::optim::{
    ExponentialMovingAverage, Lion, LionConfig, LrScheduler, MultiStepLr, PolynomialLr, Rprop,
    RpropConfig, SequentialLr, SgdConfig, StepLr,
};
use fandhe_ai::Tensor;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // LR スケジューラ（stateless。lr_at(step) のみ）
    let ms = MultiStepLr::new(0.1, &[2, 4], 0.5)?;
    assert_eq!(ms.lr_at(0), 0.1);
    assert_eq!(ms.lr_at(2), 0.05);
    assert_eq!(ms.lr_at(4), 0.025);

    let seq = SequentialLr::new(
        vec![
            Box::new(StepLr::new(0.1, 1, 0.5)?) as Box<dyn LrScheduler>,
            Box::new(MultiStepLr::new(0.1, &[2], 0.5)?) as Box<dyn LrScheduler>,
        ],
        vec![2],
    )?;
    assert!(seq.lr_at(0).is_finite());

    // EMA（重みの指数移動平均）
    let mut model = Sequential::new().add_linear(2, 1, 7)?;
    model.compile(Optimizer::Sgd(SgdConfig::new(0.01)), Loss::Mse)?;
    let mut ema = ExponentialMovingAverage::from_named(0.9, model.named_parameters())?;
    ema.update_named(model.named_parameters())?;
    assert_eq!(ema.num_updates(), 1);
    model.load_state_dict(ema.shadow_state_dict())?;

    // Rprop / Lion / PolynomialLr（手動ループで step を呼ぶ）
    let p = Tensor::new(vec![1.0f32, 2.0], &[2])?;
    let g = Tensor::new(vec![0.5f32, -0.5], &[2])?;
    let mut rprop = Rprop::new(RpropConfig::default())?;
    assert_eq!(rprop.step(&[(&p, &g)])?.len(), 1);
    let mut lion = Lion::new(LionConfig::default())?;
    assert_eq!(lion.step(&[(&p, &g)])?.len(), 1);
    // 多項式減衰: total_iters 以降は 0。
    let poly = PolynomialLr::new(0.1, 4, 1.0)?;
    assert_eq!(poly.lr_at(4), 0.0);
    Ok(())
}
```

## Notes

- コードは `src/optim.rs`（0.14.0。0.11.0 から doc-comment 例は変わらない）の doc-comment 例 3 件を 1 つの `main` にまとめたもの（上流では doctest としてコンパイル検査される）。手動 SGD のループは `training-loop.md` を参照
- `Rprop` / `Asgd` / `Adafactor` / `Lion` は `compat::Optimizer` enum には結線されておらず、手動ループで `step` を呼ぶ。`ParamGroupStep` を持たない。0.14.0 の `Optimizer` enum は `Sgd` / `AdamW` / `Adam` / `RmsProp` / `Adagrad` / `Lamb` / `Lbfgs` に加えて `Adadelta` / `Adamax` / `NAdam` / `RAdam` を持つ（後者 4 種は `fandhe_ai::optim` の同名型・`*Config` と対応し、`compile()` に渡せる）
- `ExponentialMovingAverage` の `fit_with_callbacks` への結線は `Callback::Ema`（`EmaCallback::with_warmup` で減衰率ウォームアップを opt-in できる。`compat-fit-callbacks.md` 参照）。SWA は `Callback::Swa`（`SwaCallback`）で `fit_with_callbacks` に結線される（0.11.0 の `callbacks.rs` には無く、0.14.0 にある）。`AveragedModel` / `SwaLr` を直接使う場合は手動ループで `update_named` を呼ぶ
- Source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/optim.rs（0.14.0, 取得日 2026-11-14）
