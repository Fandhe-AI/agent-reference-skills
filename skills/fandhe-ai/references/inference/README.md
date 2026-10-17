# inference

| Name | Description | Path |
|------|-------------|------|
| inference::BatchScheduler / SchedulerLimits / RequestId | 連続バッチング第 1 段階のスケジューラ。生成要求を待ち行列に積み、`step` ごとに進行中の各要求を 1 トークンずつ進める。 | [batch-scheduler.md](./batch-scheduler.md) |
| inference::generate（自己回帰生成ループ） | `AutoregressiveModel` を実装したモデルに対し、token id 列を `max_length` まで自己回帰的に生成する生成ループ。 | [generate.md](./generate.md) |
| predict_batches / PredictBatchInput / 推論フェーズ計測（PhaseMetrics） | `compat::Sequential::predict_batches` の推論内訳（データロード・forward 等の時間）を `PhaseMetrics` で読む計測 API。 | [predict-batches-phase-metrics.md](./predict-batches-phase-metrics.md) |
| inference::generate_speculative / SpeculativeConfig | target と draft の 2 モデルによる greedy 版 speculative decoding。`SpeculativeConfig` と `generate_speculative` を再エクスポート。 | [speculative.md](./speculative.md) |
