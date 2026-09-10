---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/txn.rs
---

# txn

`Storage` が提供するトランザクションハンドル群（TABLE-3・TABLE-10・TABLE-12）。読み取りスナップショット（`ReadSnapshot`）、素の複数行コミット用（`WriteTxn`）、バッチ台帳付きコミット用（`BatchWriteTxn`）の 3 種類を型で分離する。`redb::Database::begin_write` の排他ロックにより単一ライタ・直列化を実現する。

## Signature / Usage

```rust,ignore
impl Storage {
    /// 宣言済みの分離レベルを返す（TABLE-3「分離レベルを確認する」操作）。
    /// `redb` の契約（begin_write の排他ロックによる直列化・begin_read の
    /// スナップショット分離）をそのまま宣言する固定値であり、本メソッド自体は
    /// 何も検証しない。
    pub fn isolation_level(&self) -> IsolationLevel { /* ... */ }

    pub fn begin_read(&self) -> crate::storage::Result<ReadSnapshot> { /* ... */ }
    pub fn begin_write(&self) -> crate::storage::Result<WriteTxn> { /* ... */ }
    pub fn begin_batch_write(&self) -> crate::storage::Result<BatchWriteTxn> { /* ... */ }
}

/// engine が宣言する分離レベル（対象ビヘイビア: TABLE-3）。
/// 現時点でバリアントは 1 つのみ。値の追加は redb の契約から外れる分離レベルへの
/// 拡張を意味するため、破壊的変更として扱う。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum IsolationLevel {
    /// 単一ライタ（書き込みは直列化）・スナップショット読み取り
    /// （読み取りは開始時点でコミット済みの状態のみを見る）。
    SingleWriterSnapshotRead,
}
```

### ReadSnapshot

```rust,ignore
/// Storage::begin_read が返すスナップショット読み取りハンドル（TABLE-3）。
/// 開始時点でコミット済みの状態のみを見る。
pub struct ReadSnapshot {
    txn: redb::ReadTransaction,
}

impl ReadSnapshot {
    /// テナント ID・行 ID を指定して 1 行取得する（Storage::get と同じデコード契約・
    /// 物理キー契約。対象ビヘイビア: TABLE-12）。このスナップショットの開始後に
    /// コミットされた変更（他ライタによる書き込みを含む）は反映されない。
    pub fn get(&self, tenant_id: &str, id: u64) -> crate::storage::Result<Row> { /* ... */ }
}
```

### WriteTxn

素の複数行コミット専用。バッチ台帳（`BATCH_LOG_TABLE`）を操作する API は持たない。TABLE-10 の 2 テーブル横断コミットが必要な場合は `BatchWriteTxn` を使う（`docs/design/batch-ledger-scope.md` 参照、Issue #133）。

```rust,ignore
pub struct WriteTxn {
    txn: redb::WriteTransaction,
    has_writes: bool,
}

impl WriteTxn {
    /// 単一行を書き込む（commit するまで確定しない。Storage::put と同じ upsert
    /// セマンティクス・エンコーディング契約）。新規挿入・既存 ID への上書きの
    /// どちらも has_writes を立てる対象とする。
    pub fn put(&mut self, id: u64, row: &RowInput<'_>) -> crate::storage::Result<()> { /* ... */ }

    /// トランザクションをコミットし、書き込みを確定する（commit_write_txn_guarded
    /// 経由。TASK-133 P1・Issue #175、TASK-96・RECOVER-5 の commit 成功境界対応）。
    /// put を 1 度も呼ばずに commit した場合は世代カウンタを進めない。
    pub fn commit(self) -> crate::storage::Result<()> { /* ... */ }

    /// トランザクションを明示的に中断し、書き込みを破棄する。
    pub fn abort(self) -> crate::storage::Result<()> { /* ... */ }
}
```

commit・abort のどちらも呼ばずに drop した場合、内部の `redb::WriteTransaction` の `Drop` 実装により自動的に abort される（redb 4.2.0 の契約）。

### BatchWriteTxn

`ROWS_TABLE` + `BATCH_LOG_TABLE` を同一トランザクションで扱う（TASK-90、対象ビヘイビア: TABLE-10）。「台帳の row_count 合計 == 行総数」という不変条件は、あるテーブルへの書き込みを `BatchWriteTxn` だけで行った場合に限り保証される（`WriteTxn` 等の他経路と混在させないことは呼び出し元の責務。`docs/design/batch-ledger-scope.md` 参照）。当初は `WriteTxn` 1 型に `log_batch` を持たせていたが、トランザクションをまたいだ操作の組み合わせで不変条件を破れる問題（PR #129 codex レビュー指摘）を受けて型分離した。

```rust,ignore
pub struct BatchWriteTxn {
    txn: redb::WriteTransaction,
    pending_row_count: u64,
    has_writes: bool,
}

impl BatchWriteTxn {
    /// 単一行を書き込む。新規挿入のときのみ pending_row_count を増やす（同一 ID への
    /// 2 回目以降の put=上書きはカウントしない）。物理キーは (row.tenant_id, id)。
    pub fn put(&mut self, id: u64, row: &RowInput<'_>) -> crate::storage::Result<()> { /* ... */ }

    /// バッチ台帳へ、直近の log_batch 以降に新規挿入した行数を 1 エントリとして
    /// 書き込む（TASK-90・TABLE-10）。row_count を呼び出し元から受け取らない設計
    /// （任意値を渡せると台帳の契約を保証できないため）。呼び出し成功後カウンタを
    /// 0 にリセット。pending_row_count == 0 で呼ぶと StorageError::EmptyBatch。
    /// 既存の batch_seq を渡すと StorageError::DuplicateBatchSeq。
    pub fn log_batch(&mut self, batch_seq: u64) -> crate::storage::Result<()> { /* ... */ }

    /// コミット時、直近の log_batch 以降に新規挿入したのに台帳へ記録していない行が
    /// あれば StorageError::UnloggedRows で fail-closed に拒否する。世代カウンタの
    /// 制御は has_writes（put・log_batch のいずれかを 1 回でも呼んだか）で判断する
    /// （pending_row_count == 0 を「未書き込み」判定に使わない ―― fail-open 防止）。
    pub fn commit(self) -> crate::storage::Result<()> { /* ... */ }

    /// トランザクションを明示的に中断し、書き込みを破棄する。
    pub fn abort(self) -> crate::storage::Result<()> { /* ... */ }
}
```

## Notes

- `WriteTxn`・`BatchWriteTxn` は commit 成功を choke point とする世代管理・応答一意性保証（TASK-96・RECOVER-5）と統合されている（`commit_write_txn_guarded` 経由）。詳細は本カテゴリ `recovery.md` の `commit_boundary` を参照。
- `BatchWriteTxn` の row_count 契約は 5 件の codex レビュー指摘（PR #129）を経て確定した設計であり、`put`/`log_batch`/`commit` いずれも公開 API だけでは不変条件を破れないよう構成されている。
- 型分離の経緯・適用範囲の検討は `docs/design/batch-ledger-scope.md`（`https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/batch-ledger-scope.md`）を出典とする。
- Distinct from `mssql` / `drizzle` / `upstash` / `stripe` transactions — this is redb's single-writer, in-process embedded transaction inside the engine crate, not a client-server SQL transaction or a payment/API transaction.

## Related

- [storage](./storage.md)
- [recovery](./recovery.md)
- [catalog](./catalog.md)
