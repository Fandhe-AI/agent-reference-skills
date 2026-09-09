---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/README.md
---

# install

fandhe-vector-db の開発環境を構築するコマンド。リポジトリを clone し `make setup` で submodule → rustup → lefthook を一括構築する。

## Usage

```bash
git clone git@github.com:Fandhe-AI/vector-db.git
cd vector-db
make setup   # サブモジュール → rustup → lefthook（git hooks）を一括構築
```

`make setup` は内部で以下を順に実行する。

```makefile
$(MAKE) submodule
$(MAKE) rustup
$(MAKE) hooks
```

- `rustup` ターゲット: `rustup` 未導入時のみ `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable` を実行する
- `hooks` ターゲット: `lefthook` を `brew install lefthook && lefthook install`、または `npx --yes lefthook@<pinned-version> install` で導入する（`brew` / `npx` いずれも無い場合はエラー終了）

トゥールチェインは `rust-toolchain.toml` が single source of truth になっている。

```toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy"]
```

`rustup show` 実行時にこのファイルが検出されると、指定チャンネル（`stable`）と `rustfmt` / `clippy` コンポーネントが未導入の場合は自動導入される。

## Notes

> **警告**: `rustup` ターゲットはネットワーク越しに `https://sh.rustup.rs` のインストールスクリプトを取得し、そのままシェルへパイプして実行する（`curl ... | sh`）。実行環境のツールチェイン・PATH を変更する操作のため、信頼できるネットワーク環境でのみ実行すること。`hooks` ターゲットも同様に `brew` / `npx` 経由で `lefthook` を導入し git hooks をインストールする（コミット時の挙動が変わる）

- `docs/spec` は private リポジトリ `Fandhe-AI/vector-db-spec` の submodule。アクセス権がない環境では `submodule` ターゲットの `git submodule update --init` が警告付きで失敗するが、`make setup` 自体は継続する。実装コードのビルド・テストは spec 抜きで成立する
- 公開クレート `fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` は crates.io 0.1.0 で公開済みだが、README には `cargo install` によるインストール手順の記載がない。バイナリを実行する用途では README 記載の `cargo run -p fandhe-vector-db-wire-server -- ...`（`./run-wire-server.md` 参照）が想定手順であり、`cargo install fandhe-vector-db-wire-server` は README 未記載・動作未検証のため本ファイルには収録しない

## Related

- `./make-targets.md`
- `./run-wire-server.md`
