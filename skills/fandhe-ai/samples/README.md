# samples

| Name | Description | Path |
| --- | --- | --- |
| Getting Started | `compat::array` と `compat::Sequential` だけで最小のニューラルネットワーク推論を行う | [getting-started.md](./getting-started.md) |
| Array Shapes | `compat::array` に 1 次元・2 次元の `Vec` を渡し、それぞれの shape を確認する | [array-shapes.md](./array-shapes.md) |
| Backend Switching | `tape_for(Device)` でバックエンドを明示指定し、失敗時は CPU にフォールバックする | [backend-switching.md](./backend-switching.md) |
| Training Loop | `compat::Sequential` と手動 SGD で最小の学習ループを回し、loss が減少することを確認する | [training-loop.md](./training-loop.md) |
| Inference | `compat::Sequential` の推論 2 経路（`predict()` と、明示 `Tape` + `forward()`）が同一結果を返すことを確認する | [inference.md](./inference.md) |
| GEMM Bench | `Var::matmul`（GEMM）の実行時間を簡易計測し、GFLOP/s を算出する | [gemm-bench.md](./gemm-bench.md) |
