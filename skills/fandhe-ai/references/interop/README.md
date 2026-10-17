# interop

| Name | Description | Path |
| --- | --- | --- |
| model::ModelRegistry（ローカル限定モデルレジストリ） | ホームディレクトリ配下に利用者が手動配置した重みを、名前・バージョンで管理して同期ロードする読み取り専用のローカル限定レジストリ。 | [model-registry.md](./model-registry.md) |
| interop::npy（.npy / .npz 読み書き） | NumPy 互換 `.npy` / `.npz` の `Tensor<f32>` 向けパス版読み書き。 | [npy.md](./npy.md) |
| interop::onnx（OnnxModel / OnnxValue / OnnxExportOptions / OnnxExternalDataLimits / OnnxError） | ONNX モデルの import（読み込み）・推論実行・export（書き出し）を行う薄いラッパー `OnnxModel`。推論専用で autograd には接続されない。 | [onnx.md](./onnx.md) |
| interop::safetensors（load / save safetensors F32） | safetensors ワイヤフォーマットの F32 読み書き。`st_load` / `st_save` を複製せず再エクスポートした公開面。 | [safetensors.md](./safetensors.md) |
