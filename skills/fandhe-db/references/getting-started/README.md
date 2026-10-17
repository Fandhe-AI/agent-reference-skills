# getting-started

| Name | Description | Path |
|------|-------------|------|
| core | プロトコル非依存のコア API 層 `engine::core`（`VectorCore` trait・`EngineCore` 具象型）。 | [core.md](./core.md) |
| crate-layout | Cargo workspace の構成。`fandhe-db-engine`（lib）と `fandhe-db-wire-server`（bin）の 2 crate。 | [crate-layout.md](./crate-layout.md) |
| development-setup | 開発環境構築・タスクランナー（Makefile）・wire-server の起動・crates.io への公開手順。 | [development-setup.md](./development-setup.md) |
| error-format | `engine::error_format`。`wire_code` 写像の単一真実源（ERR-2）とエラー分類 `ErrorClass`。 | [error-format.md](./error-format.md) |
| json | `engine::json`（0.2.0 で追加）。依存なしの最小 RFC 8259 JSON パーサと JSON / JSONB 列向けの検証・正規化。 | [json.md](./json.md) |
| lib (engine crate root) | `engine` crate のクレートルート。データロード・検索カーネル・認証・テナント境界・redb 永続化を担う。 | [lib.md](./lib.md) |
| migration-0-2 | 0.1.0 → 0.2.0 の移行。crate 名を `fandhe-vector-db-*` から `fandhe-db-*` へ改め、環境変数名などに破壊的変更。 | [migration-0-2.md](./migration-0-2.md) |
| overview | fandhe-db（Rust 製ローカルファースト・vector 特化クエリ DB）の概要。recall モード既定と precision モードを備える。 | [overview.md](./overview.md) |
