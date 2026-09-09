---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/storage.rs
---

# storage

`redb` ベースの永続化層（TASK-140/TASK-141、対象ビヘイビア: PERSIST-1・PERSIST-2・PERSIST-3・PERSIST-4）。ベクトル行（id・テナント ID・可視性ラベル・埋め込み・メタデータ）の永続化 API を提供する。`tenant_id`・`visibility` をスキーマとして同居保持するが、ポリシー評価（可視性判定・RLS 事前フィルタ）そのものは行わない（評価は呼び出し元の責務）。行ストア（`ROWS_TABLE`）の物理キーは `(tenant_id, id)` の複合キー（対象ビヘイビア: TABLE-12）。旧フォーマット（`id` 単独キー）の DB は `StorageError::IncompatibleRowKeyFormat` で fail-closed に拒否し、マイグレーションは提供しない（Issue #206）。

分離レベル（PERSIST-4）は `redb` の契約をそのまま宣言する: 書き込みトランザクションは `redb::Database::begin_write` の排他ロックで直列化され、読み取りトランザクション（`begin_read`）は開始時点のスナップショットを見る。本モジュールは独自のロック層を追加しない。

## Signature / Usage

```rust,ignore
/// Storage::scan_page のページングカーソル（行ストアの物理キーと同形の
/// (tenant_id, id)。TABLE-12。id 単独では再開位置を表現できない）。
/// catalog.rs::RowCursor は本型の re-export。
pub type RowCursor = (String, u64);

/// 永続化層の公開エラー型。redb の複数のエラー型はすべて redb::Error へ変換
/// 可能なため、それを内部に保持して一本化する。panic せず、すべての失敗を
/// Result で返す。
#[derive(Debug)]
pub enum StorageError {
    Backend(redb::Error),
    /// 行データのエンコード/デコードで検出した不正値（fail-closed）。
    Codec(String),
    /// 指定した行 ID が存在しない。
    NotFound(u64),
    /// Storage::scan の対象行数・バイト量が上限を超過、または
    /// Storage::scan_batch_log のエントリ数が上限を超過した（PERSIST-4・TABLE-10）。
    /// Display 文字列 "scan limit exceeded: use scan_page" は既存利用者が参照
    /// しうる観測可能な契約であり、告知なく変更しない（PR #193 codex レビュー対応）。
    ScanLimitExceeded,
    /// BatchWriteTxn::log_batch に既存の batch_seq を渡した。
    DuplicateBatchSeq(u64),
    /// BatchWriteTxn の内部カウンタ（直近の log_batch 以降に put した行数）が
    /// u64 を溢れた。
    PendingRowCountOverflow,
    /// BatchWriteTxn で新規挿入した行を、直近の log_batch 以降まだ台帳へ記録
    /// しないまま commit しようとした。
    UnloggedRows(u64),
    /// BatchWriteTxn::log_batch を、直近の呼び出し以降 1 件も put していない
    /// 状態で呼んだ。
    EmptyBatch,
    /// GENERATION_TABLE のカウンタが u64 を溢れた（到達し得ない防御的分岐）。
    GenerationCounterOverflow,
    /// ROWS_TABLE を旧フォーマット（物理キーが id 単独）の DB に対して開こうと
    /// した（TABLE-12）。Display にテナント ID・テーブル名を含めない
    /// （CatalogError::IncompatibleRowKeyFormat と同一文言）。
    IncompatibleRowKeyFormat,
}

pub type Result<T> = std::result::Result<T, StorageError>;

/// RLS 相当の可視性ラベル。永続化表現は 1 バイトの固定コードで、デコード時に
/// 未知のバイト値を検出した場合は既知の値へ黙殺フォールバックせず
/// StorageError::Codec で拒否する（fail-closed。「未知値 → Public 扱い」は
/// 情報漏えいに直結するため行わない）。値の追加・変更は ROW_FORMAT_VERSION
/// 更新を伴う破壊的変更として扱う。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Visibility {
    /// テナント内で広く共有される可視性ラベル。
    Public,
    /// テナント内でも限定共有される可視性ラベル。
    Private,
}

/// 永続化予定の行データ（呼び出し側が構築する入力形）。
#[derive(Clone, Copy)]
pub struct RowInput<'a> {
    /// RLS 相当のテナント境界判定に使う不透明な識別子（PERSIST-3）。空文字列は
    /// エンコード時に拒否する（fail-closed）。
    pub tenant_id: &'a str,
    pub visibility: Visibility,
    pub embedding: &'a [f32],
    /// 呼び出し元が定義する不透明なメタデータバイト列（本モジュールは中身を解釈しない）。
    pub metadata: &'a [u8],
}

/// 読み出した行データ（呼び出し側へ返す出力形）。
#[derive(Debug, Clone, PartialEq)]
pub struct Row {
    pub id: u64,
    pub tenant_id: String,
    pub visibility: Visibility,
    pub embedding: Vec<f32>,
    pub metadata: Vec<u8>,
}

/// redb::Database を保持する永続化層のハンドル。呼び出し元は Storage を
/// 通じてのみ永続化状態を触る想定。
pub struct Storage {
    db: redb::Database,
}
```

### `impl Storage`

```rust,ignore
impl Storage {
    /// 指定パスの redb データベースを開く。ファイルが存在しなければ新規作成
    /// する（redb::Database::create の契約）。
    pub fn open(path: impl AsRef<Path>) -> Result<Self> { /* ... */ }

    /// 単一行を書き込み、コミットする（PERSIST-1・TABLE-12）。物理キーは
    /// (row.tenant_id, id)。バッチ台帳（BATCH_LOG_TABLE）を経由しない経路
    /// （恒久契約）。TABLE-10 の不変条件が必要な場合は begin_batch_write が
    /// 返す BatchWriteTxn を使うこと。commit 成功境界（commit_boundary）の
    /// choke point 経由でコミットする。
    pub fn put(&self, id: u64, row: &RowInput<'_>) -> Result<()> { /* ... */ }

    /// 複数行を単一トランザクションで書き込む（PERSIST-2・TABLE-12）。空
    /// スライスの場合はトランザクションを開かず即座に成功を返す。put と
    /// 同様バッチ台帳を経由しない。
    pub fn put_batch(&self, rows: &[(u64, RowInput<'_>)]) -> Result<()> { /* ... */ }

    /// テナント ID・行 ID を指定して 1 行取得する（スナップショット読み取り。
    /// TABLE-12）。物理キーが複合キーのため id 単独では行を一意に指せない。
    pub fn get(&self, tenant_id: &str, id: u64) -> Result<Row> { /* ... */ }

    /// 全行をスナップショット読み取りで走査する（PERSIST-4・TABLE-12）。列挙順は
    /// 物理キー順（tenant_id 昇順 → id 昇順）。総行数が MAX_SCAN_TOTAL_ROWS、
    /// 総バイト量が MAX_SCAN_TOTAL_BYTES のいずれかを超える場合は部分的な結果を
    /// 黙って切り詰めず StorageError::ScanLimitExceeded で fail-closed に拒否する。
    /// 大規模 DB は scan_page を使うこと。
    pub fn scan(&self) -> Result<Vec<Row>> { /* ... */ }

    /// 物理キー昇順で最大 limit 件を走査する上限付きページング API（scan の
    /// 無制限確保を避ける代替。PERSIST-4）。after に前回のカーソルを渡すと
    /// 直後から再開。limit は MAX_SCAN_PAGE_LIMIT で切り詰める。ページ内の
    /// デコード対象バイト量が MAX_SCAN_PAGE_BYTES を超える場合はその時点で
    /// ページを打ち切る（1 行のみで超過する場合はその 1 行を含めて返す）。
    pub fn scan_page(
        &self,
        after: Option<(&str, u64)>,
        limit: u32,
    ) -> Result<(Vec<Row>, Option<RowCursor>)> { /* ... */ }

    /// BATCH_LOG_TABLE の全エントリを batch_seq 昇順で読み出す（TABLE-10）。
    /// 再起動後の検証専用読み取り。エントリ数が MAX_BATCH_LOG_ROWS を超える
    /// 場合は ScanLimitExceeded で fail-closed に拒否する。台帳にはページング
    /// API が無いため、このエラーをそのまま利用者へ露出しないこと（Issue #131）。
    pub fn scan_batch_log(&self) -> Result<Vec<(u64, u64)>> { /* ... */ }

    /// BATCH_LOG_TABLE の最大 batch_seq を返す（TABLE-10）。台帳テーブル未作成・
    /// 空の場合は Ok(None)。全エントリを Vec へ確保せず redb の B-tree の最終
    /// キー取得（O(log n)・アロケーションなし）を使うため MAX_BATCH_LOG_ROWS に
    /// 依存しない（採番再開経路向け、Issue #132）。
    pub fn batch_log_max_seq(&self) -> Result<Option<u64>> { /* ... */ }
}
```

### storage/power_loss_model（`#[cfg(test)]` 限定、公開 API なし）

電源断シミュレーション用 `redb::StorageBackend` の共通モデル（TASK-145、対象ビヘイビア: PERSIST-1・PERSIST-3）。`crates/engine/src/storage.rs` の `#[cfg(test)]` ユニットテストと `crates/engine/tests/power_loss.rs` 統合テストが同じ commit/sync 契約モデルを検証するため基本実装を分離したもので、通常ビルドには含まれない。定義される `BackendState`・`PowerLossBackend` 等はすべて `pub(crate)`。

## Notes

- `RowStoreTableDef`・`ROWS_TABLE`・`BATCH_LOG_TABLE`・`GENERATION_TABLE`・`MAX_TENANT_ID_LEN`・`MAX_EMBEDDING_DIM`・`MAX_SCAN_PAGE_LIMIT`・`MAX_SCAN_PAGE_BYTES`・`db()`・`current_generation()` はすべて `pub(crate)` のためクレート外非公開（`txn.rs`・`catalog.rs`・`arena.rs`・`rls.rs` が同一クレート内から参照する）。
- バッチ台帳（`BATCH_LOG_TABLE`）の「台帳の row_count 合計 == 行総数」という不変条件は、`crate::txn::BatchWriteTxn` だけを使って `ROWS_TABLE` へ書き込んだ場合にのみ保証される。`Storage::put`/`put_batch`/`WriteTxn::put` はバッチ台帳を一切更新せず直接書き込めるため、これらと `BatchWriteTxn` を同一 DB・同一テーブルに対して混在させると不変条件は成立しなくなる（型システムでは検出できない呼び出し元の責務、PR #129 codex レビュー対応）。適用範囲の検討経緯は ADR `batch-ledger-scope`（`https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/batch-ledger-scope.md`）を参照。
- `StorageError::ScanLimitExceeded` の `Display` 文字列 `"scan limit exceeded: use scan_page"` は経路（`scan`／`scan_batch_log`）によらず固定される互換性契約であり、`scan_batch_log` には `scan_page` 相当の代替 API が存在しない。
- ROP のトランザクション詳細・世代管理（`prepare_generation_bump`・`commit_write_txn`・`bump_generation_and_commit`）は `pub(crate)` のため未掲載。詳細は本カテゴリ `txn.md`・`recovery.md` を参照。
- ADR `ingest-write-path`・`redb-insert-reserve-zero-copy`・`concurrent-write-verification`・`crash-tolerance-reverification`・`multi-dim-table-coexistence`（`https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/<name>.md`）は書き込みパス・並行性・クラッシュ耐性の設計文脈を扱うが、本ページの記述はいずれも公開ソースの rustdoc から直接確認できる範囲のみで、ADR 固有の追加事実は引用していない。
- private spec（`docs/spec/05-tasks.md` TASK-140・TASK-141 等、`docs/spec/04-behavior/persistence.md` PERSIST-1〜4）への参照 ID が rustdoc 中に多数出現するが、spec 本体は非公開のため個々の behavior ID の定義内容は未記載（ID の存在のみ rustdoc から転記）。
- 本ページの記述は公開ソース（scratchpad の pin SHA verbatim ソースと突合済み）から検証済み。

## Related

- [row-codec](./row-codec.md)
- [catalog](./catalog.md)
- [txn](./txn.md)
- [recovery](./recovery.md)
