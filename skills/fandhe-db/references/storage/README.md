# storage

| Name | Description | Path |
|------|-------------|------|
| arena | コールドスタート・ベクトルアリーナ（TASK-87、対象ビヘイビア: TABLE-8）。`storage.rs` は… | [arena.md](./arena.md) |
| buffer-pool | バッチ経路（`batch_search.rs`・`batch_fallback.rs`）の中間バッファを、サイズクラス別の… | [buffer-pool.md](./buffer-pool.md) |
| bytea | `BYTEA` 列型（TABLE-13・TASK-197。関連: WIRE-13・NOSQL-17）向けのテキスト表現… | [bytea.md](./bytea.md) |
| catalog | スキーマカタログ層（TASK-85、TABLE-1・4・5・6）。`VECTOR(N)` 列型を含むテーブル定義… | [catalog.md](./catalog.md) |
| column-rewrite | 列型の拡大変換（`INTEGER`→`BIGINT`・`REAL`→`DOUBLE PRECISION`）に伴う既存行の一括書き換え… | [column-rewrite.md](./column-rewrite.md) |
| constraint | 行単位の宣言的制約（`PRIMARY KEY`・UNIQUE・`CHECK`）と `FOREIGN KEY` 制約を検査する単一の検査点… | [constraint.md](./constraint.md) |
| datetime | `DATE` / `TIMESTAMP` 列型（TABLE-13・TASK-197、Issue #884）のリテラル解析・内部表現変換… | [datetime.md](./datetime.md) |
| incremental | 増分インデックス反映モジュール（TASK-120、INDEX-1・INDEX-2）。チャンク化 → 埋め込み → 置換書き込み… | [incremental.md](./incremental.md) |
| key-index | 永続キー索引（Issue #1071）。`FOREIGN KEY` 参照整合性検査の全行走査を索引照会へ置き換える… | [key-index.md](./key-index.md) |
| numeric | `NUMERIC(p, s)` 列型（TABLE-13〔検討中〕・TASK-197、Issue #885）の内部表現・パース・整形… | [numeric.md](./numeric.md) |
| recovery | 障害回復系のガード・台帳（TASK-92、RECOVER-1）。commit 境界・operation_id 台帳・fail-fast… | [recovery.md](./recovery.md) |
| row-codec | カタログスキーマ駆動の行エンコーダー（TASK-86、TABLE-7）。`catalog.rs` の `TableSchema` を… | [row-codec.md](./row-codec.md) |
| scalar-float | `REAL` / `DOUBLE PRECISION` 列型（TABLE-13・TASK-196）の値表現・解析・整形・順序規約… | [scalar-float.md](./scalar-float.md) |
| storage | `redb` ベースの永続化層（TASK-140/TASK-141、PERSIST-1〜4）。ベクトル行の永続化 API… | [storage.md](./storage.md) |
| txn | `Storage` が提供するトランザクションハンドル群（TABLE-3・TABLE-10・TABLE-12）… | [txn.md](./txn.md) |
| uuid | `UUID` 列型（TABLE-13〔検討中〕・TASK-197、Issue #887）の内部表現・パース・整形… | [uuid.md](./uuid.md) |
