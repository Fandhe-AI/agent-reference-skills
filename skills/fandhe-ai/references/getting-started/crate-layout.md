---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.11.0/README.md
---

# クレート構成

`fandhe-ai` は複数の内部クレートに分かれた構成の facade（composition root）で、リポジトリ内のパスは `crates/facade` だが公開クレート名は `fandhe-ai`。リポジトリの `crates/*/Cargo.toml` は 11 件（`docs-site` を含む）。公式ドキュメントは「`fandhe-ai` クレートのみがサポートされる公開 API 面であり、他クレートへの直接依存・直接利用はサポート対象外」と明言している。

## Signature / Usage

依存すべきは `fandhe-ai` クレートのみで、他クレート（`fandhe-ai-tensor-core` 等）への直接依存は不要。

```toml
[dependencies]
fandhe-ai = "0.11.0"
```

```rust
// 確定入口は 4 系統（内部クレートへの直接 import は不要）
use fandhe_ai::{tape, tape_for, compat::{array, Sequential}};
use fandhe_ai::optim::{Sgd, AdamW};
use fandhe_ai::DeviceParamStore;
```

## 公開クレート（7、docs.rs で公開、いずれも v0.11.0）

| クレート | 役割 |
|---------|------|
| `fandhe-ai` | 唯一のサポートされる公開 API 面。composition root（`Device` → バックエンドの結線）・compat 公開面（`compat::array` / `compat::Sequential`）・`optim`・デバイス常駐更新経路を提供する |
| `fandhe-ai-tensor-core` | テンソルのバッファ・デバイス・ディスパッチ・メモリ管理を担う内部コア（直接利用は非サポート） |
| `fandhe-ai-autodiff` | dynamic-tape 方式の自動微分を担う内部クレート（直接利用は非サポート） |
| `fandhe-ai-backend-cpu` | CPU バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-cuda` | CUDA バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-metal` | Metal バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-onnx-interop` | ONNX・safetensors との相互運用を担う内部クレート。`fandhe-ai` から `interop::onnx` / `interop::safetensors` として再エクスポートされる（直接利用は非サポート） |

## 未公開クレート（4、crates.io/docs.rs 未公開）

| クレート | 役割 |
|---------|------|
| `guardrail` | ガードレール検証（本ライブラリ固有の概念。LLM ガードレールとは無関係） |
| `self-repair` | 自己修復ループを担う内部クレート |
| `bench-harness` | ベンチマーク計測を担う内部クレート |
| `docs-site` | ドキュメントサイト生成を担う非公開の内部クレート |

## Notes

- `fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-*` は Rust の可視性としては `pub` な箇所があるが、サポート境界上は内部 API。公式が確定入口とするのは `fandhe_ai::tape()` / `fandhe_ai::tape_for(Device)`、`fandhe_ai::compat::{array, Sequential}`、`fandhe_ai::optim`、`fandhe_ai::DeviceParamStore` / `Tape::step_device_param_store` の 4 つ
- fandhe-ai は fandhe-frontend（Rust 製フロントエンドフレームワーク）・fandhe-backend（Rust 製バックエンド HTTP サーバーフレームワーク）とは別の Fandhe-AI org ライブラリであり、API・対象領域とも無関係
- 0.11.0 で `fandhe-ai-onnx-interop` が crates.io の 7 クレート目として公開済み。v0.11.0 の README は「次回リリースサイクルから 7 クレート目として公開対象に加わる」と書いたままだが、公開済みの事実を正とする。docs.rs の出典は `docs.rs/fandhe-ai-onnx-interop/0.11.0/`
- README は「safetensors の再エクスポートは未提供」と読める記述を残すが、`src/interop/safetensors.rs` で `load_safetensors_f32` / `load_safetensors_f32_from_bytes` / `save_safetensors_f32` / `save_safetensors_f32_to_bytes` / `require_keys` / `LoadError` / `SaveError` が再エクスポート済み。ソースを正とする
- 未公開クレートが将来 crates.io に公開された場合、出典を docs.rs へ切り替える運用（`/update-skill fandhe-ai` で追従）

## Related

- [overview.md](./overview.md)
- [installation.md](./installation.md)
