# inference

| Name | Description | Path |
|------|-------------|------|
| inference::BatchScheduler / SchedulerLimits / RequestId | 連続バッチング第 1 段階のスケジューラ。複数の生成要求を待ち行列に積み、`step` ごとに… | [batch-scheduler.md](./batch-scheduler.md) |
| inference::generate（自己回帰生成ループ） | `AutoregressiveModel` を実装したモデルに対し、token id 列を `max_length` まで自己回帰的… | [generate.md](./generate.md) |
| predict_batches / PredictBatchInput / 推論フェーズ計測（PhaseMetrics） | `compat::Sequential::predict_batches` が `DataLoader` を全バッチ反復して推論する際の… | [predict-batches-phase-metrics.md](./predict-batches-phase-metrics.md) |
| inference::generate_speculative / SpeculativeConfig | target と draft の 2 モデルによる greedy 版 speculative decoding。`fandhe_ai_autodiff::… | [speculative.md](./speculative.md) |
