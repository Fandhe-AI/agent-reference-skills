# ONNX・safetensors 相互運用

ONNX・safetensors フォーマットとの相互運用層の設計と、現時点でのサポート境界。

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
