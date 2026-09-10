# storage

| Name | Description | Path |
|------|-------------|------|
| storage | redb ベース永続化層本体（Storage・RowInput・Row・Visibility・StorageError） | [storage.md](./storage.md) |
| row_codec | カタログスキーマ駆動の行エンコーダー（v1、encode_row/decode_row 等） | [row-codec.md](./row-codec.md) |
| catalog | スキーマカタログ層（DDL・CATALOG_TABLE、TableSchema・ColumnDef） | [catalog.md](./catalog.md) |
| txn | トランザクションハンドル（ReadSnapshot・WriteTxn・BatchWriteTxn） | [txn.md](./txn.md) |
| recovery | 障害回復系ガード・台帳（commit_boundary・ledger・panic_hook・fail_fast・required_op_id） | [recovery.md](./recovery.md) |
| incremental | 増分インデックス反映（チャンク化 → 埋め込み → 置換書き込み） | [incremental.md](./incremental.md) |
| arena | コールドスタート・ベクトルアリーナ（VectorArena） | [arena.md](./arena.md) |
| buffer_pool | バッチ経路の中間バッファプール（BufferPoolError） | [buffer-pool.md](./buffer-pool.md) |
