# api

`Tensor` / autodiff / tape は fandhe-ai 独自の Rust API。apple-ml の MLMultiArray、apple-silicon の MLX `mx.array`、nvidia-cuda / amd-rocm の GPU API とは別物。

| Name | Description | Path |
| --- | --- | --- |
| Tape / tape() / tape_for() | autodiff 計算グラフを構築する composition root | [tape.md](./tape.md) |
| Var | Tape 上の追跡ノード。elementwise / reduction / loss 演算を持つ | [var.md](./var.md) |
| Tensor | ゼロコピー view を持つ中核の多次元配列型 | [tensor.md](./tensor.md) |
| Gradients | `Tape::backward` が返す Var ごとの勾配コンテナ | [gradients.md](./gradients.md) |
| LinearVars | 線形層の順伝播に束縛された weight/bias パラメータ | [linear-vars.md](./linear-vars.md) |
| Device | 実行先デバイス enum（Cpu / Cuda(ordinal) / Metal） | [device.md](./device.md) |
| AutodiffError / BackendError | autodiff とバックエンド抽象層の公開エラー型 | [errors.md](./errors.md) |
| compat::Sequential / SequentialVars | Keras 風のレイヤー積み上げビルダーと訓練用ハンドル | [compat-sequential.md](./compat-sequential.md) |
| compat::array | numpy `np.array` 風のテンソルコンストラクタ | [compat-array.md](./compat-array.md) |
