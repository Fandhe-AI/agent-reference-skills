---
source: https://fandhe-ai.github.io/fandhe-ai/getting-started/, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/main/crates/facade/Cargo.toml
---

# install

`fandhe-ai` crate を Cargo プロジェクトに導入するコマンド集。

## crates.io からの導入

```toml
[dependencies]
fandhe-ai = "0.3.0"
```

公開 API サーフェスは `fandhe-ai` crate のみが対象。内部 crate（`fandhe-ai-tensor-core` 等）を直接依存に加えることは公式に非サポート。

## Git 依存（開発版を追従）

```toml
[dependencies]
fandhe-ai = { git = "https://github.com/Fandhe-AI/fandhe-ai" }
```

crates.io 版より新しい未リリース変更を試す場合に使う。

## Path 依存（ローカルクローン時）

```toml
[dependencies]
fandhe-ai = { path = "../fandhe-ai/crates/facade" }
```

リポジトリのディレクトリ名は `crates/facade` だが公開 crate 名は `fandhe-ai`。

## workspace 構成の確認

```sh
cargo metadata --no-deps --format-version 1
```

`edition = "2024"` を採用しているため、導入先の Rust toolchain は 2024 edition に対応した stable channel が必要。

## 依存クレート監査

```sh
cargo deny --locked check advisories bans licenses sources
```

CI と同じ依存監査を手元で実行する。`cargo-deny` の別途インストールが必要（`cargo install cargo-deny`）。
