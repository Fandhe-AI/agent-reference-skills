---
source: https://fandhe-ai.github.io/fandhe-ai/getting-started/, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md, https://docs.rs/crate/fandhe-ai/0.14.0
---

# install

`fandhe-ai` crate を Cargo プロジェクトに導入するコマンド集。

## Signature / Usage

### crates.io からの導入

```toml
[dependencies]
fandhe-ai = "0.14.0"
```

公開 API サーフェスは `fandhe-ai` crate のみが対象。内部 crate（`fandhe-ai-tensor-core` / `fandhe-ai-backend-rocm` 等）を直接依存に加えることは公式に非サポート。

### HF Hub 連携（補助クレート）

```toml
[dependencies]
fandhe-ai = "0.14.0"
fandhe-ai-hf-hub = "0.14.0"
```

`fandhe-ai-hf-hub` は revision 解決・ファイル一覧の補助クレートで、版は `fandhe-ai` と lockstep（第三者の `hf-hub` クレートとは無関係）。

### Linux のビルド要件

Linux では TLS 依存（`ureq`。`native-tls` + `vendored`・`cfg(unix)` 限定）が OpenSSL をソースから静的に同梱するため、`perl`・`make`・C ツールチェーンが必要（`libssl-dev` は不要）。事前に存在を確認する。

Adapted (not in the official docs): 必要コマンドの存在確認用の 1 行。

```sh
command -v perl make cc
```

### Git 依存（開発版を追従）

```toml
[dependencies]
fandhe-ai = { git = "https://github.com/Fandhe-AI/fandhe-ai" }
```

crates.io 版より新しい未リリース変更を試す場合に使う。リポジトリ名は `Fandhe-AI/fandhe-ai`。

### Path 依存（ローカルクローン時）

```toml
[dependencies]
fandhe-ai = { path = "../fandhe-ai/crates/facade" }
```

リポジトリのディレクトリ名は `crates/facade` だが公開 crate 名は `fandhe-ai`。

### workspace 構成の確認

```sh
cargo metadata --no-deps --format-version 1
```

`edition = "2024"` を採用しているため、導入先の Rust toolchain は 2024 edition に対応した stable channel が必要。

### 依存クレート監査

```sh
cargo deny --locked check advisories bans licenses sources
```

CI と同じ依存監査を手元で実行する。`cargo-deny` の別途インストールが必要（`cargo install cargo-deny --locked`）。クローン済みリポジトリでは `make deny` が未導入時に自動導入する。

## Notes

- Linux のビルド要件（`perl`・`make`・C ツールチェーン）は README の「ビルド要件」節。macOS は `security-framework` 経路で不要、Windows の依存ツリーには `ureq` が入らない
- `fandhe-ai-backend-rocm` は HIP を実行時に動的ロードするため、ROCm 非搭載環境でも追加の導入手順なしでビルドできる
- 公式サイトの getting-started と facade クレートの README は `fandhe-ai = "0.4.0"` のまま古い。版数は crates.io の 0.14.0（2026-11-05 公開）を正とする
- Adapted: the `command -v perl make cc` check is not in the official README; it only confirms the build prerequisites the README names
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/README.md（v0.14.0, 取得日 2026-11-14）

## Related

- [dev.md](./dev.md)
- [cli.md](./cli.md)
