# internals

CUDA C++ / PTX / CUTLASS は nvidia-cuda、MSL / MPSGraph / MLX は apple-silicon、HIP / ROCm は amd-rocm スキルが担当。本カテゴリは fandhe-ai の Rust バックエンド実装（cudarc / objc2 経由）の構造のみを扱う。

公式が「`fandhe-ai` crate のみが supported public API surface、内部 crate の直接利用は非サポート」と明言しているため、本カテゴリは 1 crate 1 ページ（`tensor-core` のみ 2 ページ）のアーキテクチャ粒度で構成し、per-item の逐一展開はしない。

| Name | Description | Path |
| --- | --- | --- |
| tensor-core | テンソル表現・デバイス抽象・メモリ管理の基盤クレート（buffer/device/dispatch/memory_stats/pool/typed） | [tensor-core.md](./tensor-core.md) |
| tensor-core-fusion | tensor-core 内の kernel fusion グラフ表現（FusionPlan / FusedOpKind / Activation） | [tensor-core-fusion.md](./tensor-core-fusion.md) |
| autodiff | dynamic-tape 方式の自動微分クレート（Tape / Var / Gradients） | [autodiff.md](./autodiff.md) |
| backend-cpu | Rayon 並列化による CPU バックエンド | [backend-cpu.md](./backend-cpu.md) |
| backend-cuda | cudarc 動的ロードによる CUDA バックエンド | [backend-cuda.md](./backend-cuda.md) |
| backend-metal | objc2 直接バインドによる macOS 専用 Metal バックエンド | [backend-metal.md](./backend-metal.md) |
| onnx-interop | ONNX / safetensors 相互運用層（未公開クレート） | [onnx-interop.md](./onnx-interop.md) |
| bench-harness | 性能計測・回帰検出基盤（未公開クレート） | [bench-harness.md](./bench-harness.md) |
