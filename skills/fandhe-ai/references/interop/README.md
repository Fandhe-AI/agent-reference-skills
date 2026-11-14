# interop

| Name | Description | Path |
| --- | --- | --- |
| model::ModelRegistry（ローカルモデルレジストリ） | ホームディレクトリ配下の重みを、名前・バージョンで管理して同期ロードする `load` と、保存 `save`・HTTPS 取得 `download`（SHA-256 pin 対応）を持つローカルレジストリ。 | [model-registry.md](./model-registry.md) |
| interop::npy（.npy / .npz 読み書き） | NumPy 互換 `.npy` / `.npz` の `Tensor<f32>` 向けパス版読み書き。 | [npy.md](./npy.md) |
| interop::onnx（OnnxModel / OnnxValue / OnnxExportOptions / OnnxExternalDataLimits / OnnxError / OnnxAutograd*） | ONNX モデルの import（読み込み）・推論実行・export（書き出し）を行う薄いラッパー `OnnxModel`。`run` は推論専用で、学習は `bind_autograd`（`OnnxAutogradGraph`）。 | [onnx.md](./onnx.md) |
| interop::safetensors（load / save safetensors F32 / typed） | safetensors ワイヤフォーマットの F32 読み書きと、dtype 混在（F16 / BF16 / F64 / I32 / I64 / BOOL）の typed 読み書き。`st_load` / `st_save` を複製せず再エクスポートした公開面。 | [safetensors.md](./safetensors.md) |
