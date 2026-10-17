# scripts

| Name | Description | Path |
| --- | --- | --- |
| install | fandhe-db の開発環境を構築するコマンド。リポジトリを clone し `make setup` で submodule → rustup → lefthook を一括構築する。 | [install.md](./install.md) |
| make-targets | 開発ワークフローで使う Makefile ターゲット（CI 相当のローカル実行・Rust 品質チェック・クラッシュ耐性ガード・ドキュメント lint・E2E・Docker）。 | [make-targets.md](./make-targets.md) |
| run-wire-server | `fandhe-db-wire-server`（PostgreSQL wire protocol v3 互換サーバー）を起動するコマンド（TASK-73）。 | [run-wire-server.md](./run-wire-server.md) |
