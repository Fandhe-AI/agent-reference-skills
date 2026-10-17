---
source: https://fandhe-ai.github.io/fandhe-ai/
---

# fandhe-ai 概要

Rust 製 AI/ML ライブラリ。Burn 等の既存フレームワークに依存せず、テンソル・autodiff・演算グラフ／カーネル融合機構・計算カーネル・バックエンド抽象層を完全自作コアとして実装している。

## Signature / Usage

利用者が触れる入口は `fandhe-ai` クレート一つで、`compat::array` / `compat::Sequential` からモデルを組み立てる（学習は `optim` / デバイス常駐更新経路も使う）。

```rust
use fandhe_ai::compat::{array, Sequential};

let input = array(vec![vec![0.1_f32, 0.2, 0.3, 0.4]])?;
let model = Sequential::new().add_linear(4, 2, /* seed = */ 42)?;
let output = model.predict(&input)?;
```

## このライブラリの構成

リポジトリの `crates/*/Cargo.toml` は 11 件（`docs-site` を含む）。利用者が直接触れるのは `fandhe-ai` クレートだけ。

- `fandhe-ai`: 唯一のサポートされる公開 API 面。composition root（`Device` → バックエンドの結線）・compat 公開面（`compat::array` / `compat::Sequential`）・`optim`・デバイス常駐更新経路を提供する
- `fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-cpu` / `fandhe-ai-backend-cuda` / `fandhe-ai-backend-metal`: 内部クレート。直接利用はサポート対象外
- `fandhe-ai-onnx-interop`（リポジトリ内のパスは `crates/onnx-interop`）: 相互運用（ONNX / safetensors）を担う内部クレート。0.11.0 で crates.io に公開済み（公開 7 クレート）。`fandhe-ai` から `interop::onnx` / `interop::safetensors` として再エクスポートされる
- `guardrail` / `self-repair` / `bench-harness` / `docs-site`: 自己修復ループ・ベンチ計測・ドキュメントサイト生成を担う内部クレート（未公開）

`fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-*` の型・関数は Rust の可視性としては `pub` な箇所があるが、サポート境界上は内部 API。公式が確定入口とするのは次の 4 つ。

- `fandhe_ai::tape()` / `fandhe_ai::tape_for(Device)`（composition root）
- `fandhe_ai::compat::{array, Sequential}`（numpy / Keras 慣習の互換 API 層）
- `fandhe_ai::optim`（`Sgd` / `AdamW` / `clip_grad_norm` / `LrScheduler` / `GradScaler` 等）
- `fandhe_ai::DeviceParamStore` / `Tape::step_device_param_store`（デバイス常駐更新経路）

`fandhe-ai` クレートの公開モジュールは `compat` / `optim` / `data` / `nn` / `interop` / `model` / `inference` / `text` の 8 つ（`lib.rs`）。

詳細なクレート一覧・役割は [crate-layout.md](./crate-layout.md) を参照。

## バックエンド

バックエンド切替は feature フラグを使わない cfg ベース。CPU は常に利用可能な既定バックエンドで、CUDA・Metal は実行時にデバイスの存在を検証し、利用できない場合はエラーを返す（自動フォールバックはしない）。

## ドキュメントサイトの構成

- Getting Started: インストール・最小コード例・バックエンド切替
- Guides: バックエンド構成・数値一致契約・性能の考え方・ONNX/safetensors 相互運用の解説
- Examples: 学習ループ・推論・GEMM ベンチの実行例
- API Reference: `compat` API・guardrail / self-repair CLI の要点

## Notes

- 公式サイトの `site/index.md` は ONNX export を「未提供」と書くが、0.11.0 では `OnnxModel::to_bytes` / `to_path` が存在する（`lib.rs` の interop モジュール doc）。ソースを正とする

## Related

- [installation.md](./installation.md)
- [quick-start.md](./quick-start.md)
- [crate-layout.md](./crate-layout.md)
