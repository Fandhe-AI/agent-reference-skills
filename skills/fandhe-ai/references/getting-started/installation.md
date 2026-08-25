# インストール

crates.io に v0.3.0（2026-08-23 公開）として公開済み。Rust の `stable` チャンネルを前提とする。

## Signature / Usage

```toml
[dependencies]
fandhe-ai = "0.3.0"
```

開発版（main ブランチ）を試す場合は Git 依存で参照できる。

```toml
[dependencies]
fandhe-ai = { git = "https://github.com/Fandhe-AI/rust-ai-library" }
```

リポジトリを clone してワークスペース内から利用する場合は path 依存でも参照できる。

```toml
[dependencies]
fandhe-ai = { path = "../rust-ai-library/crates/facade" }
```

## Notes

- 利用者が直接依存すべきクレートは `fandhe-ai` だけ。`fandhe-ai-tensor-core` / `fandhe-ai-autodiff` / `fandhe-ai-backend-cpu` / `fandhe-ai-backend-cuda` / `fandhe-ai-backend-metal` は内部クレートであり、直接の依存・利用はサポート対象外（詳細は [crate-layout.md](./crate-layout.md)）
- リポジトリ内のパスは `crates/facade` だが、公開クレート名は `fandhe-ai`
- 公開ドキュメントは https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/

## Related

- [overview.md](./overview.md)
- [quick-start.md](./quick-start.md)
- [crate-layout.md](./crate-layout.md)
