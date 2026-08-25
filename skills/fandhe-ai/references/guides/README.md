# guides

| Name | Description | Path |
| --- | --- | --- |
| バックエンド構成 | cfg ベースのバックエンド切替、fail-fast 設計、API 入口 `tape()` / `tape_for(Device)` | [backends.md](./backends.md) |
| 数値一致契約 | バックエンド間の相対誤差/絶対誤差の複合判定、FMA 契約の統一、許容誤差の運用方針 | [numerical-parity.md](./numerical-parity.md) |
| 性能の考え方 | REQ-8 段階的下限、カーネル境界検査、計測規約（5 回計測の中央値 / criterion） | [performance.md](./performance.md) |
| ONNX・safetensors 相互運用 | 相互運用層の設計と現在のサポート境界（safetensors F32 限定、ONNX prost 手書き derive） | [interop.md](./interop.md) |
