# inference

| Name | Description | Path |
|------|-------------|------|
| inference::BatchScheduler / SchedulerLimits / RequestId | 連続バッチングのスケジューラ。生成要求を待ち行列に積み、`step` / `step_batched` / `step_stateful` ごとに進行中の各要求を 1 トークンずつ進める。 | [batch-scheduler.md](./batch-scheduler.md) |
| inference::generate（自己回帰生成ループ） | `AutoregressiveModel` を実装したモデルに対し、token id 列を `max_length` まで自己回帰的に生成する生成ループ。 | [generate.md](./generate.md) |
| predict_batches / PredictBatchInput / 推論フェーズ計測（PhaseMetrics） | `compat::Sequential::predict_batches` の推論内訳（データロード・forward 等の時間）を `PhaseMetrics` で読む計測 API。 | [predict-batches-phase-metrics.md](./predict-batches-phase-metrics.md) |
| inference::generate_speculative / SpeculativeConfig | target と draft の 2 モデルによる speculative decoding（Greedy / TopK / Temperature）。`SpeculativeConfig` と `generate_speculative` を再エクスポート。 | [speculative.md](./speculative.md) |
| inference::StatefulAutoregressiveModel / generate_speculative_stateful | 内部状態（RNN・SSM の隠れ状態）を持つ自己回帰モデルの trait と speculative decoding 入口。`BatchScheduler::step_stateful` と併用する。 | [stateful.md](./stateful.md) |
