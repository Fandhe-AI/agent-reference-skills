# optim

| Name | Description | Path |
|------|-------------|------|
| EMA / SWA（ExponentialMovingAverage / AveragedModel / SwaLr） | 重みの指数移動平均 `ExponentialMovingAverage`（EMA）と、等重み平均 `AveragedModel`（SWA）、SWA 用の学習率 `SwaLr` / `SwaAnneal`。 | [ema-swa.md](./ema-swa.md) |
| GradScaler（AMP 損失スケーリング）と gradient clipping | AMP 用の損失スケーリング `GradScaler` と、global L2 norm 方式・要素値方式の gradient clipping。 | [grad-scaling-clipping.md](./grad-scaling-clipping.md) |
| LR スケジューラ（LrScheduler trait と各実装） | `LrScheduler::lr_at(step)` は step 番号から学習率を返す stateless な純関数。例外は状態保持型の `ReduceLrOnPlateau`。 | [lr-schedulers.md](./lr-schedulers.md) |
| Optimizers（Sgd / Adam / AdamW / RmsProp / Adagrad / Lamb / Adadelta / Adamax / NAdam / RAdam / Adafactor / Lion / Rprop / Asgd / Lbfgs） | `fandhe_ai::optim` は optimizer 15 種を単一の入口で公開する。値型 API で、`step()` は更新後の `Tensor<f32>` の列を返す。 | [optimizers.md](./optimizers.md) |
| ParamGroup / ParamGroupStep / OptimizerStateDict | 層別の学習率・weight decay を指定する `ParamGroup` / `ParamGroupStep` と、optimizer 内部状態の保存・復元 trait `OptimizerStateDict`。 | [param-groups-state.md](./param-groups-state.md) |
