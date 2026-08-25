---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/onnx-interop/src/lib.rs
---

# onnx-interop

ONNX / safetensors 相互運用層。未公開クレート（crates.io 未リリース）。

- crate 名: `onnx-interop`（`crates/onnx-interop`。GitHub `Fandhe-AI/rust-ai-library` の `main` ブランチソースから直接読む）
- `safetensors` はワイヤフォーマットの読み書きのみに用い、`tensor-core::Tensor<f32>` へのマッピングは自作。ONNX protobuf デコードは `prost` を使うが `prost-build`（`protoc` へのビルド時依存）は使わず手書き derive で取り込む

## Signature / Usage

```rust
// lib.rs の公開モジュール
pub mod onnx;
pub mod ops;
pub mod st_load;
pub mod st_save;

mod require_keys;
pub use require_keys::{LoadError, require_keys};
```

## Options / Props

| Module | Description |
| --- | --- |
| `st_load` | safetensors パース → `tensor-core::Tensor<f32>` へのマッピング。キー不足は `st_load::LoadError::MissingKeys` |
| `st_save` | `tensor-core::Tensor<f32>` → safetensors ワイヤフォーマットへの書き出し。`st_load` と対称の契約（暗黙アダプタなし、dtype は F32 のみ） |
| `onnx` | ONNX 取り込みの実体（protobuf デコード・内部グラフ構築・グラフ実行インタープリタ）。`onnx::interp::run` が `onnx::graph::build_graph` の結果を `op_type` 名で `ops` へディスパッチ |
| `ops` | ONNX オペを `Tensor<f32>` 上の純粋関数として提供。`Gemm`/`Relu`/`Sigmoid`/`Shape`/`Gather`/`Unsqueeze`/`Concat`/`Slice` の 8 オペに加え、算術系（`Add`/`Mul`/`Div`/`Mod`/`Sqrt`/`Constant`）・形状操作系（`Cast`/`Reshape`/`Squeeze`/`Transpose`）・Attention 系（`MatMul`/`Softmax`/`Erf`）・`LayerNormalization` を含む |
| `require_keys`（非公開） | safetensors ロード結果のキーマップに対する期待キー集合の充足検査。型・関数のみクレートルートへ `pub use` で再エクスポート |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- 未公開クレート（crates.io に未リリース）のため、docs.rs ではなく GitHub raw ソース（`crates/onnx-interop/src/lib.rs`）を出典とする
- 外部フォーマットのパースは長さ・形状の検証を先に行い不正入力を弾く方針（OWASP A03 準拠）
- `require_keys::LoadError` と `st_load::LoadError` は独立実装として並存し、統合整理はスコープ外事項として追跡中
- ONNX の 8 オペはグラフ実行から到達可能な状態まで結線済みだが、算術/形状操作/Attention 系 14 オペのディスパッチ結線は別イシューで進行中

## Related

- [bench-harness](./bench-harness.md)
