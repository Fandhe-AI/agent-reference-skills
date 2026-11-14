---
source: https://docs.rs/fandhe-ai-onnx-interop/0.14.0/fandhe_ai_onnx_interop/index.html
---

# onnx-interop

ONNX / safetensors 相互運用層。crates.io に公開済み（0.14.0 を確認。公開名 `fandhe-ai-onnx-interop`。0.3.0 時点では未公開クレートだった）。

- crate 名: `fandhe-ai-onnx-interop`（リポジトリ内のパスは `crates/onnx-interop`）。facade `fandhe-ai` からは `interop::onnx` / `interop::safetensors` として再エクスポートされる
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
| `st_load` | safetensors パース → `tensor-core::Tensor<f32>` へのマッピング。キー不足は `st_load::LoadError::MissingKeys`。0.11.0 → 0.14.0 で dtype 混在の読込（`load_safetensors_typed` / `load_safetensors_typed_from_bytes` / `require_keys_typed`、`SafetensorsTensor` / `SafetensorsDtype`）とレイアウト検証 `validate_safetensors_layout_from_bytes` が追加された |
| `st_save` | `tensor-core::Tensor<f32>` → safetensors ワイヤフォーマットへの書き出し。`st_load` と対称の契約（暗黙アダプタなし）。既存の `*_f32` は F32 専用のまま。0.11.0 → 0.14.0 で `SafetensorsTensor` マップを bit 単位で書く `save_safetensors_typed` / `save_safetensors_typed_to_bytes` が追加された |
| `onnx` | ONNX 取り込みの実体（protobuf デコード・内部グラフ構築・グラフ実行インタープリタ）。`onnx::autograd` の `BoundGraph` が ONNX グラフを `Tape` へ束縛して学習可能にする（facade の `OnnxModel::bind_autograd`。勾配経路の op は 11 種で、`Conv` / `MaxPool` / `AveragePool` / `BatchNormalization` / `GlobalAveragePool` / `Flatten` は 0.11.0 → 0.14.0 で明示の fail-closed 腕に揃えられた）。`onnx::export_nn` は `Sequential` 由来の層から ONNX グラフを作り、0.11.0 → 0.14.0 で対応層に `Sigmoid` が加わり 7 種になった（再パラメータ化済み `Linear` は fail-closed で拒否）。`onnx::interp::run` が `onnx::graph::build_graph` の結果を `op_type` 名で `ops` へディスパッチ |
| `ops` | ONNX オペを `Tensor<f32>` 上の純粋関数として提供。`gemm` / `concat` / `slice` / `gather` / `cast` / `matmul` / `softmax` / `layer_norm` / `constant` / `arith` / `activation` / `shape_ops` / `shape_transform` に加え、0.11.0 以降は `conv` / `pool` / `batch_norm` / `global_average_pool` のサブモジュールがある（0.3.0 のページが挙げていた 8 オペ・算術系・形状操作系・Attention 系・`LayerNormalization` から増えた）。エラー型は `ops::error` |
| `require_keys`（非公開） | safetensors ロード結果のキーマップに対する期待キー集合の充足検査。型・関数のみクレートルートへ `pub use` で再エクスポート |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- crates.io に公開済み（初出は 0.10.0、2026-10-03。0.11.0・0.14.0 でも公開）。公開は依存解決のためで、内部クレートの直接利用は引き続き非サポート。出典は docs.rs の 0.14.0
- Source: https://docs.rs/fandhe-ai-onnx-interop/0.14.0/fandhe_ai_onnx_interop/index.html（0.14.0, 取得日 2026-11-14）
- facade からの再エクスポート（`fandhe_ai::interop::onnx` の `OnnxModel` / `OnnxValue` / `OnnxError` / `OnnxExportOptions` / `OnnxExternalDataLimits`、`fandhe_ai::interop::safetensors` の `load_safetensors_f32` 等）の公開面は `guides/interop.md` を参照
- 外部フォーマットのパースは長さ・形状の検証を先に行い不正入力を弾く方針（OWASP A03 準拠）
- `require_keys::LoadError` と `st_load::LoadError` は独立実装として並存し、統合整理はスコープ外事項として追跡中
- facade 経由の import 対応は 36 op、export allowlist は 26 op（`guides/interop.md`）。0.3.0 のページにあった「算術/形状操作/Attention 系 14 オペのディスパッチ結線は別イシューで進行中」は 0.11.0 以降では古い記述

## Related

- [bench-harness](./bench-harness.md)
