---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md
---

# クレート構成

`fandhe-ai` は複数の内部クレートに分かれた構成の facade（composition root）で、リポジトリ内のパスは `crates/facade` だが公開クレート名は `fandhe-ai`。リポジトリの `crates/*/Cargo.toml` は 13 件（`docs-site` を含む）。公式ドキュメントは「`fandhe-ai` クレートのみがサポートされる公開 API 面であり、他クレートへの直接依存・直接利用はサポート対象外」と明言している。

## Signature / Usage

依存すべきは `fandhe-ai` クレートのみで、他クレート（`fandhe-ai-tensor-core` 等）への直接依存は不要。

```toml
[dependencies]
fandhe-ai = "0.14.0"
```

```rust
// 確定入口は 4 系統（内部クレートへの直接 import は不要）
use fandhe_ai::{tape, tape_for, compat::{array, Sequential}};
use fandhe_ai::optim::{Sgd, AdamW};
use fandhe_ai::DeviceParamStore;
```

### 公開クレート（9、docs.rs で公開、いずれも v0.14.0）

| クレート | 役割 |
|---------|------|
| `fandhe-ai` | 唯一のサポートされる公開 API 面。composition root（`Device` → バックエンドの結線）・compat 公開面（`compat::array` / `compat::Sequential`）・`optim`・デバイス常駐更新経路を提供する |
| `fandhe-ai-tensor-core` | テンソルのバッファ・デバイス・ディスパッチ・メモリ管理を担う内部コア（直接利用は非サポート） |
| `fandhe-ai-autodiff` | dynamic-tape 方式の自動微分を担う内部クレート（直接利用は非サポート） |
| `fandhe-ai-backend-cpu` | CPU バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-cuda` | CUDA バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-metal` | Metal バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-rocm` | ROCm（AMD GPU）バックエンド雛形。HIP / HIPRTC を `libloading` で実行時ロードする条件付き・実験的な実装。0.14.0 で公開。facade の通常依存（直接利用は非サポート） |
| `fandhe-ai-onnx-interop` | ONNX・safetensors との相互運用を担う内部クレート。`fandhe-ai` から `interop::onnx` / `interop::safetensors` として再エクスポートされる（直接利用は非サポート） |
| `fandhe-ai-hf-hub` | Hugging Face Hub 連携の補助クレート（repo_id・revision の検証、revision 解決、ファイル一覧）。0.14.0 で公開。`fandhe-ai` の公開 API だけに依存し、facade は本クレートに依存しない。公開面に限りサポート対象だが facade の安定性保証の外 |

### 未公開クレート（4、crates.io/docs.rs 未公開）

| クレート | 役割 |
|---------|------|
| `guardrail` | ガードレール検証（本ライブラリ固有の概念。LLM ガードレールとは無関係） |
| `self-repair` | 自己修復ループを担う内部クレート |
| `bench-harness` | ベンチマーク計測を担う内部クレート |
| `docs-site` | ドキュメントサイト生成を担う非公開の内部クレート |

## Notes

- `fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-*` は Rust の可視性としては `pub` な箇所があるが、サポート境界上は内部 API。公式が確定入口とするのは `fandhe_ai::tape()` / `fandhe_ai::tape_for(Device)`、`fandhe_ai::compat::{array, Sequential}`、`fandhe_ai::optim`、`fandhe_ai::DeviceParamStore` / `Tape::step_device_param_store` の 4 つ
- fandhe-ai は fandhe-frontend（Rust 製フロントエンドフレームワーク）・fandhe-backend（Rust 製バックエンド HTTP サーバーフレームワーク）とは別の Fandhe-AI org ライブラリであり、API・対象領域とも無関係
- `fandhe-ai-onnx-interop` は v0.10.0（2026-10-03）から crates.io の 7 クレート目として公開されている（v0.14.0 の README の記述）。v0.11.0 の README は「次回リリースサイクルから 7 クレート目として公開対象に加わる」と書いたままだった。docs.rs の出典は `docs.rs/fandhe-ai-onnx-interop/0.14.0/`
- v0.14.0 タグの README とワークスペース `Cargo.toml` は `fandhe-ai-hf-hub`・`fandhe-ai-backend-rocm` を「公開準備済みで crates.io 未公開・0.14.0 で公開予定」と書いたままだが、crates.io に両クレートの 0.14.0 が存在し facade 0.14.0 が `fandhe-ai-backend-rocm` を通常依存に持つため、公開済みを正とする。docs.rs の出典は `docs.rs/fandhe-ai-backend-rocm/0.14.0/`・`docs.rs/fandhe-ai-hf-hub/0.14.0/`
- 外部依存は許容 12 区分（`=x.y.z` 完全固定。README の「開発者向け」節）で、第 9 区分（`matrixmultiply` / `gemm`。OSS GEMM ベンチ比較対象）は `scripts/bench/oss-gemm-compare/` 限定のため、本体 workspace の直接依存は第 1〜8・第 10〜12 区分の 11 区分。0.11.0 から加わったのは第 11 区分の `ureq`（`native-tls` + `vendored`・`cfg(unix)` 限定・HTTPS 取得用途限定。facade と `fandhe-ai-hf-hub` が使う）と第 12 区分の `libloading`（HIP / HIPRTC の動的ロード用途限定・`backend-rocm` のみ・無条件依存）。第 10 区分の `libc`（`cfg(unix)` 限定）は用途が facade のキャッシュ書き込みへも拡張された
- README は「safetensors の再エクスポートは未提供」と読める記述を残すが、`src/interop/safetensors.rs` で `load_safetensors_f32` / `load_safetensors_f32_from_bytes` / `save_safetensors_f32` / `save_safetensors_f32_to_bytes` / `require_keys` / `LoadError` / `SaveError` が再エクスポート済み。ソースを正とする
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md（v0.14.0, 取得日 2026-11-14）
- 未公開クレートが将来 crates.io に公開された場合、出典を docs.rs へ切り替える運用（`/update-skill fandhe-ai` で追従）

## Related

- [overview.md](./overview.md)
- [installation.md](./installation.md)
