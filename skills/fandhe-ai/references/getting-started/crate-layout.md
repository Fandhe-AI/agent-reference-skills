---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/README.md
---

# クレート構成

`fandhe-ai` は 10 個の内部クレートに分かれた構成の facade（composition root）で、リポジトリ内のパスは `crates/facade` だが公開クレート名は `fandhe-ai`。公式ドキュメントは「`fandhe-ai` クレートのみがサポートされる公開 API 面であり、他クレートへの直接依存・直接利用はサポート対象外」と明言している。

## Signature / Usage

依存すべきは `fandhe-ai` クレートのみで、他クレート（`fandhe-ai-tensor-core` 等）への直接依存は不要。

```toml
[dependencies]
fandhe-ai = "0.3.0"
```

```rust
// サポートされる入口はこの3系統のみ（内部クレートへの直接 import は不要）
use fandhe_ai::{tape, tape_for, compat::{array, Sequential}};
```

## 公開クレート（6、docs.rs で公開、いずれも v0.3.0）

| クレート | 役割 |
|---------|------|
| `fandhe-ai` | 唯一のサポートされる公開 API 面。composition root（`Device` → バックエンドの結線）と compat 公開面（`compat::array` / `compat::Sequential`）を提供する |
| `fandhe-ai-tensor-core` | テンソルのバッファ・デバイス・ディスパッチ・メモリ管理を担う内部コア（直接利用は非サポート） |
| `fandhe-ai-autodiff` | dynamic-tape 方式の自動微分を担う内部クレート（直接利用は非サポート） |
| `fandhe-ai-backend-cpu` | CPU バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-cuda` | CUDA バックエンド実装（直接利用は非サポート） |
| `fandhe-ai-backend-metal` | Metal バックエンド実装（直接利用は非サポート） |

## 未公開クレート（4、crates.io/docs.rs 未公開）

| クレート | 役割 |
|---------|------|
| `onnx-interop` | ONNX・safetensors との相互運用を担う内部クレート |
| `guardrail` | ガードレール検証（本ライブラリ固有の概念。LLM ガードレールとは無関係） |
| `self-repair` | 自己修復ループを担う内部クレート |
| `bench-harness` | ベンチマーク計測を担う内部クレート |

## Notes

- `fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-*` は Rust の可視性としては `pub` な箇所があるが、サポート境界上は内部 API。利用者が使うことを想定する入口は `fandhe_ai::tape()` / `fandhe_ai::tape_for(Device)` と `fandhe_ai::compat::{array, Sequential}` のみ
- fandhe-ai は fandhe-frontend（Rust 製フロントエンドフレームワーク）・fandhe-backend（Rust 製バックエンド HTTP サーバーフレームワーク）とは別の Fandhe-AI org ライブラリであり、API・対象領域とも無関係
- 未公開クレートが将来 crates.io に公開された場合、出典を docs.rs へ切り替える運用（`/update-skill fandhe-ai` で追従）

## Related

- [overview.md](./overview.md)
- [installation.md](./installation.md)
