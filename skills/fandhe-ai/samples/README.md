# samples

| Name | Description | Path |
| --- | --- | --- |
| Array Shapes | `fandhe_ai::compat::array` に 1 次元・2 次元の `Vec` を渡し、それぞれの shape を確認する。 | [array-shapes.md](./array-shapes.md) |
| Backend Switching | `fandhe_ai::tape_for(Device)` でバックエンドを明示指定し、失敗時は CPU にフォールバックする。 | [backend-switching.md](./backend-switching.md) |
| Fit with Callbacks | `Sequential::compile` → `fit_with_callbacks` で `CsvLogger` を使い、epoch ごとの履歴を CSV に書く。 | [compat-fit-callbacks.md](./compat-fit-callbacks.md) |
| Dataset and DataLoader | `TensorDataset` と `DataLoader` でミニバッチを供給し、Sampler / フック / prefetch / `random_split` で拡張する。 | [dataloader.md](./dataloader.md) |
| GEMM Bench | `Var::matmul`（GEMM）の実行時間を `std::time::Instant` で簡易計測し、GFLOP/s を算出する。 | [gemm-bench.md](./gemm-bench.md) |
| Autoregressive Generate | `AutoregressiveModel` を実装した表引きモデルに対し、`generate` で greedy 生成する。 | [generate-autoregressive.md](./generate-autoregressive.md) |
| Batch Scheduler and Speculative Decoding | `BatchScheduler` で複数要求を step 実行し、`generate_speculative` の fail-closed 契約を確認する。 | [generate-scheduler.md](./generate-scheduler.md) |
| Getting Started | `fandhe_ai::compat` の `array` と `Sequential` だけで最小のニューラルネットワーク推論を行う。 | [getting-started.md](./getting-started.md) |
| HF Safetensors into Sequential | PyTorch / HF レイアウトの safetensors を読み込み、`compat::Sequential`（Embedding → TransformerEncoderLayer）へ復元して元モデルと bit 一致を確認する。 | [hf-safetensors-sequential.md](./hf-safetensors-sequential.md) |
| Inference | `compat::Sequential` の推論 2 経路（`predict()` と、明示 `Tape` + `forward()`）が同一結果を返すことを確認する。 | [inference.md](./inference.md) |
| NumPy npy / npz Roundtrip | `Tensor<f32>` を `.npy` / `.npz` に書き出して読み戻す。 | [npy-npz-roundtrip.md](./npy-npz-roundtrip.md) |
| ONNX Load with External Data Limits | `OnnxModel::from_path_with_limits` で external data の読み込み予算を既定の 64 GiB から 8 GiB へ引き下げて ONNX モデルを読み込む。 | [onnx-external-data-limits.md](./onnx-external-data-limits.md) |
| Optimizer and LR Scheduler | `fandhe_ai::optim` の LR スケジューラ・EMA・Rprop / Lion を手動ループ向けに使う。 | [optimizer-and-scheduler.md](./optimizer-and-scheduler.md) |
| Reference Models Training | 合成 CIFAR-10 相当データで ResNet / Transformer 参照実装を `Adam` で 10 epoch 学習する example の冒頭部分（取り込み・定数・局所 PRNG）。 | [reference-models-training.md](./reference-models-training.md) |
| Reference Models (MLP / LeNet) | 参照モデル `Mlp` を `compat::Sequential` の上で構築し、predict と PyTorch 対応表を表示する example の MLP 部分。 | [reference-models.md](./reference-models.md) |
| Safetensors Save and Load | `Sequential::state_dict` を safetensors バイト列に保存し、別のモデルへ `load_state_dict` で復元する。 | [safetensors-save-load.md](./safetensors-save-load.md) |
| Text Vectorization | `TextVectorization`（Keras `TextVectorization` 相当）で文字列を整数 id にし、`Var::embedding` へ渡す。 | [text-vectorization.md](./text-vectorization.md) |
| Training Loop | `compat::Sequential` と手動 SGD で最小の学習ループを回し、loss が減少することを確認する。 | [training-loop.md](./training-loop.md) |
