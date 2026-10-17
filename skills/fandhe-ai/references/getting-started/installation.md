---
source: https://fandhe-ai.github.io/fandhe-ai/getting-started/
---

# インストール

crates.io に v0.11.0（2026-10-09 公開）として公開済み。Rust の `stable` チャンネルを前提とする（edition 2024、toolchain は `rust-toolchain.toml` の `channel = "stable"`）。

## Signature / Usage

```toml
[dependencies]
fandhe-ai = "0.11.0"
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

- 利用者が直接依存すべきクレートは `fandhe-ai` だけ。`fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-cpu` / `fandhe-ai-backend-cuda` / `fandhe-ai-backend-metal` / `fandhe-ai-onnx-interop` は内部クレートであり、直接の依存・利用はサポート対象外（詳細は [crate-layout.md](./crate-layout.md)）
- リポジトリ内のパスは `crates/facade` だが、公開クレート名は `fandhe-ai`
- 公開ドキュメントは https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/
- 公式サイトの getting-started と README は 0.11.0 時点でも `fandhe-ai = "0.4.0"` と書いたままで古い。版数は crates.io の値（0.11.0）を正とする

## Related

- [overview.md](./overview.md)
- [quick-start.md](./quick-start.md)
- [crate-layout.md](./crate-layout.md)
