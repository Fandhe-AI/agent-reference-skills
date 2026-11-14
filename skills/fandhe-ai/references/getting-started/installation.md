---
source: https://fandhe-ai.github.io/fandhe-ai/getting-started/
---

# インストール

crates.io に v0.14.0（2026-11-05 公開）として公開済み。Rust の `stable` チャンネルを前提とする（edition 2024、toolchain は `rust-toolchain.toml` の `channel = "stable"`）。

## Signature / Usage

```toml
[dependencies]
fandhe-ai = "0.14.0"
```

開発版（main ブランチ）を試す場合は Git 依存で参照できる。

```toml
[dependencies]
fandhe-ai = { git = "https://github.com/Fandhe-AI/fandhe-ai" }
```

リポジトリを clone してワークスペース内から利用する場合は path 依存でも参照できる。

```toml
[dependencies]
fandhe-ai = { path = "../fandhe-ai/crates/facade" }
```

## Notes

- 利用者が直接依存すべきクレートは `fandhe-ai` だけ。`fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-cpu` / `fandhe-ai-backend-cuda` / `fandhe-ai-backend-metal` / `fandhe-ai-backend-rocm` / `fandhe-ai-onnx-interop` は内部クレートであり、直接の依存・利用はサポート対象外（詳細は [crate-layout.md](./crate-layout.md)）
- リポジトリ内のパスは `crates/facade` だが、公開クレート名は `fandhe-ai`
- 公開ドキュメントは https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/
- Linux では、HTTPS によるモデル取得に使う TLS 依存（`ureq`。`cfg(unix)` 限定・OpenSSL を静的に同梱）のため `perl`・`make`・C ツールチェーンが必要（`libssl-dev` は不要）。macOS は `security-framework` 経路でこの要件はなく、Windows の依存ツリーには入らない（README の「ビルド要件」）
- ROCm（AMD GPU）バックエンドは HIP を実行時に動的ロードするため、ROCm 非搭載環境でもビルドできる（`Device::Rocm(0)` の利用は条件付き・実験的。詳細は guides の backends）
- HF Hub 連携の補助が必要な場合は、別クレート `fandhe-ai-hf-hub`（0.14.0）を追加で依存に加える（`crate-layout.md`）
- 公式サイトの getting-started と facade クレートの README は 0.14.0 時点でも `fandhe-ai = "0.4.0"` と書いたままで古い（リポジトリ直下の README は `"0.13.0"`）。版数は crates.io の値（0.14.0）を正とする
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md（v0.14.0, 取得日 2026-11-14）

## Related

- [overview.md](./overview.md)
- [quick-start.md](./quick-start.md)
- [crate-layout.md](./crate-layout.md)
