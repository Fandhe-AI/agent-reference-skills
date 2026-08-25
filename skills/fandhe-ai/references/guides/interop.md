---
source: https://fandhe-ai.github.io/rust-ai-library/guides/interop/
---

# ONNX・safetensors 相互運用

ONNX・safetensors フォーマットとの相互運用層の設計と、現時点でのサポート境界。

## Signature / Usage

`fandhe-ai` からは未公開の内部クレート `crates/onnx-interop` に実装されている safetensors 読み書きのシグネチャ（`fandhe-ai` 経由での利用は現状不可）。

```rust
pub fn load_safetensors_f32(path: &Path) -> Result<HashMap<String, Tensor<f32>>, LoadError>
pub fn save_safetensors_f32(
    path: &Path,
    tensors: &HashMap<String, Tensor<f32>>,
) -> Result<(), SaveError>
```

## Options / Props

| 項目 | 内容 |
| --- | --- |
| safetensors | ワイヤフォーマットの読み書きのみを担当し、テンソルへのマッピングは自作実装。dtype は F32 限定で、他の dtype は実行時エラー `UnsupportedDtype` として明示的に拒否する。キー充足検査は fail-closed。ラウンドトリップはビット一致を保証する |
| ONNX | `protoc` 外部ツール依存を避けるため、prost の手書き derive で処理する |

## Notes

- 相互運用機能（`onnx-interop` クレート）は現時点で `fandhe-ai` から公開されていない
- 外部フォーマットの入力検証は、データ変換より前に行う（セキュリティ指針に準拠）

## Related

- [backends](./backends.md)
