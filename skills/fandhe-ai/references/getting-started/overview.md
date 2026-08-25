# fandhe-ai 概要

Rust 製 AI/ML ライブラリ。Burn 等の既存フレームワークに依存せず、テンソル・autodiff・演算グラフ／カーネル融合機構・計算カーネル・バックエンド抽象層を完全自作コアとして実装している。

## このライブラリの構成

内部は 10 個のクレートに分かれているが、利用者が直接触れるのは `fandhe-ai` クレートだけ。

- `fandhe-ai`: 唯一のサポートされる公開 API 面。composition root（`Device` → バックエンドの結線）と compat 公開面（`compat::array` / `compat::Sequential`）を提供する
- `fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-cpu` / `fandhe-ai-backend-cuda` / `fandhe-ai-backend-metal`: 内部クレート。直接利用はサポート対象外
- `onnx-interop` / `guardrail` / `self-repair` / `bench-harness`: 相互運用・自己修復ループ・ベンチ計測を担う内部クレート（未公開）

`fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-*` の型・関数は Rust の可視性としては `pub` な箇所があるが、サポート境界上は内部 API。利用者が使うことを想定する入口は `fandhe_ai::tape()` / `fandhe_ai::tape_for(Device)` と `fandhe_ai::compat::{array, Sequential}` のみ。

詳細なクレート一覧・役割は [crate-layout.md](./crate-layout.md) を参照。

## バックエンド

バックエンド切替は feature フラグを使わない cfg ベース。CPU は常に利用可能な既定バックエンドで、CUDA・Metal は実行時にデバイスの存在を検証し、利用できない場合はエラーを返す（自動フォールバックはしない）。

## ドキュメントサイトの構成

- Getting Started: インストール・最小コード例・バックエンド切替
- Guides: バックエンド構成・数値一致契約・性能の考え方・ONNX/safetensors 相互運用の解説
- Examples: 学習ループ・推論・GEMM ベンチの実行例
- API Reference: `compat` API・guardrail / self-repair CLI の要点

## Related

- [installation.md](./installation.md)
- [quick-start.md](./quick-start.md)
- [crate-layout.md](./crate-layout.md)
