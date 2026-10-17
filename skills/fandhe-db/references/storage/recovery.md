---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/recovery.rs
---

# recovery

TASK-92（対象ビヘイビア: RECOVER-1）の入口モジュール。障害回復系のガード・台帳の実装を集約する。`required_op_id` が `operation_id` 必須化ガード（RECOVER-1）、`ledger` がテーブル単位 `operation_id` 台帳（TASK-93、RECOVER-2）、`content_hash`（`pub(crate)`、非公開）が台帳エントリの内容照合ハッシュ（TASK-101、RECOVER-10）、`commit_boundary` が commit 成功境界と応答一意性の保証（TASK-96、RECOVER-5）、`panic_hook` が commit 成功境界の観測可能性側（TASK-97、RECOVER-6・ERR-1）、`fail_fast` が内部エラーの 2 系統統一（TASK-99、RECOVER-8）を提供する。

## Signature / Usage

```rust,ignore
pub mod commit_boundary;
pub(crate) mod content_hash;
pub mod fail_fast;
pub mod ledger;
pub mod panic_hook;
pub mod required_op_id;
pub mod stderr_log;
// 0.2.0 で追加。#[allow(dead_code)] 付きの crate 内部モジュール（分割実行 DML のジョブ状態の永続化層）
pub(crate) mod partitioned_job;
```

### recovery/commit_boundary

commit 成功を「もう後戻りできない地点」（point of no return）と定め、書き込み実行中の失敗タイミングを問わず 1 回の呼び出しに対する応答が常に一意（二重応答なし）であることを構造的に保証する choke point。呼び出し元は `crate::tenant`（各 `*_unchecked` 関数）・`crate::txn`（`WriteTxn`/`BatchWriteTxn` の commit 一本化点）・`crate::storage`（`Storage::put`/`put_batch`）・`crate::catalog`（テーブル DDL・DML）。

```rust,ignore
/// commit 成功から wire 層の応答確定までの区間全体を覆う RAII ガード（RECOVER-5）。
/// `wire-server::simple_query::execute_and_respond` が 1 クエリの処理開始時に
/// 生成し、応答をすべて書き終えるまで所有する契約。
#[must_use]
pub struct ResponseBoundaryGuard {
    owned_generation: Option<u64>,
}

impl ResponseBoundaryGuard {
    /// クエリ処理の入口で呼ぶ。応答をすべて書き終えるまでこの戻り値を
    /// 名前付き変数へ束縛して生存させること。
    pub fn new() -> Self { /* ... */ }
}
```

### recovery/fail_fast

TASK-99（RECOVER-8）。プロセス内エラーを 2 系統に統一する: `Result::Err` は `error_format`（TASK-152・ERR-2）が `wire_code` 契約のエラー応答へ写像し処理継続、panic は経路・スレッドを問わずプロセスを即座に終了する（fail-fast）。呼び出し元は `wire-server::main::run_server` のみ想定。

```rust,ignore
/// panic フックの冪等な導入（TASK-99・RECOVER-8）。`panic_hook::install_panic_hook()`
/// の直後に呼ぶ契約。
pub fn install() { /* ... */ }
```

### recovery/ledger

TASK-93（RECOVER-2）テーブル単位 `operation_id` 台帳、TASK-98（RECOVER-7）二層台帳照会。

```rust,ignore
/// `crate::core::EngineCore::operation_recorded` の照会結果（TASK-93・RECOVER-2）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LedgerLookup {
    Recorded,
    NotRecorded,
    /// 台帳を持たない構成（`LedgerWrite::Disabled`）のため照会できない。
    NoLedger,
}

/// `crate::core::EngineCore::last_operation_id` の照会結果（TASK-98・RECOVER-7）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum LastOperationLookup {
    Committed(OperationId),
    NotFound,
    NoLedger,
    /// 正確な最終 operation_id を復元できないため NotFound へ丸めず区別する
    /// （codex-review P1 指摘対応）。
    Unavailable,
}
```

### recovery/panic_hook

TASK-97（RECOVER-6・ERR-1）。`commit_boundary` の abort（安全性側）を無効化せず、その前段で緊急応答の送出を試みる観測可能性側。

```rust,ignore
#[must_use]
pub struct EmergencyResponseRegistration {
    _private: (),
}

impl EmergencyResponseRegistration {
    /// `response_bytes`（事前エンコード済み ErrorResponse 全体）・`stream`・
    /// `write_timeout` を登録する。呼び出し元は `execute_and_respond` の
    /// outcome 決定区間のみを本ガードで包む契約。
    pub fn register(response_bytes: Vec<u8>, stream: TcpStream, write_timeout: Duration) -> Self { /* ... */ }
}

/// panic フックの冪等な導入（TASK-97・RECOVER-6）。呼び出し元は
/// `wire-server::main`（`run_server` 起動時）のみを想定する。
pub fn install_panic_hook() { /* ... */ }
```

### recovery/stderr_log

`fail_fast`（RECOVER-8）の例外として、診断用 stderr 出力の書き込み失敗（読み手が閉じた後の `EPIPE` 等）を無視するヘルパ（Issue #1081、判断の記録: `docs/design/stderr-log-write-failure.md`）。`eprintln!` は書き込み失敗で panic し、その panic が `panic_hook`・`fail_fast` のフックを経て `std::process::abort()` まで進むため、ログの受け手が閉じただけでプロセス全体が落ちる。本モジュールの範囲は診断ログの書き込みそのものに限り、`fail_fast` 本体の abort 契約と `commit_boundary` の abort 条件（RECOVER-5）は変えない。panic は一切捕捉しない。

```rust,ignore
/// 診断用 stderr への 1 行書き込み。書き込みが失敗しても（EPIPE に限らず
/// io::ErrorKind を問わず）プロセスを継続し、エラーは握りつぶす。
pub fn write_line(args: std::fmt::Arguments<'_>) {
    let mut err = std::io::stderr().lock();
    let _ = writeln!(err, "{args}");
}

/// eprintln! と同じ書式引数を受け付ける、書き込み失敗を無視する診断ログマクロ。
/// #[macro_export] により crate root に置かれ、wire-server からは
/// engine::log_stderr!(...) として呼ぶ。
#[macro_export]
macro_rules! log_stderr {
    ($($arg:tt)*) => {
        $crate::recovery::stderr_log::write_line(::core::format_args!($($arg)*))
    };
}
```

### recovery/partitioned_job（crate 内部）

分割実行 DML（チャンクごとに commit する非原子の述語形 `UPDATE`／`DELETE`）のジョブ状態・再開位置の永続化と、プロセス内の実行中ジョブ登録簿（Issue #1127。ADR `docs/design/partitioned-dml.md`・RECOVER-11）。`pub(crate)` のためクレート外非公開。永続化する状態は `JobRecord` の 3 状態（`Running`・`Cancelled`・`Completed`）のみで、照会時の見かけの状態（実行中／中断）は `derive_status` が「`Running` 記録かつ `JobRegistry` に登録あり＝実行中、登録なし＝中断」と導出する。再起動後は中断とみなし自動再開しない（ADR §9.2）。公開側の SQL・NoSQL 表層は `sql-execution/partitioned` と `nosql-surface/partitioned-dml` を参照。

### recovery/required_op_id

TASK-92（RECOVER-1・ERR-2・SQL-10）。`operation_id` 必須化ガード。呼び出し元は `sql::allowlist::validate_insert`・`EngineCore::insert_row`/`update_row`/`delete_row`。台帳への永続化・重複拒否・内容不一致は本モジュールの管轄外。

```rust,ignore
/// sql::using_operation_id が定義する値型をそのまま再エクスポート。
pub use crate::sql::using_operation_id::OperationId;

/// operation_id 保護の適用可否を決めるサーバー側構成（RECOVER-1）。
/// クエリ・セッション変数からは差し替えられない。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum LedgerMode {
    /// 台帳あり構成（既定・fail-closed）。
    #[default]
    Ledgered,
    /// 台帳を持たない限定用途の構成（本番運用では使わない）。
    CompareOnlyWithoutLedger,
}

/// operation_id が省略されたことを表すエラー。Display/Debug に
/// テーブル名・テナント・行内容を一切含めない（security.md P0 対応）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MissingOperationId;

impl LedgerMode {
    /// op_id が operation_id 必須化の要件を満たすかを判定する（RECOVER-1）。
    /// 副作用なしの純関数。
    pub fn require(
        self,
        op_id: Option<&OperationId>,
    ) -> Result<Option<&OperationId>, MissingOperationId> { /* ... */ }
}
```

## Notes

- `content_hash` は `pub(crate)` のためクレート外公開 API ではない（recovery.rs 内で非公開宣言を実測）。
- `MissingOperationId` の `Display`/`Debug` は固定文言のみを返す設計（テナント間の情報漏洩防止、`.claude/rules/security.md` P0 相当の方針が rustdoc に明記されている）。
- `ledger.rs` の `record_in_txn`・`delete_table_in_txn`・`contains_in_read_txn`・`last_operation_in_read_txn` および `LedgerWrite`・`RecordOutcome`・`LedgerRecordError`・`LastOperationRaw` は `pub(crate)` のため未掲載（クレート外非公開）。
- `commit_boundary.rs` の `PostCommitResult`・`PostCommitPanicGuard`・関連関数群は `pub(crate)` のため未掲載。
- 出典 ADR: `ingest-write-path`（`https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/ingest-write-path.md`）・`crash-tolerance-reverification`（同 `crash-tolerance-reverification.md`）が recovery 系の設計文脈を扱うが、本ページの記述はいずれも公開ソースの rustdoc から直接確認できる範囲のみで、ADR固有の追加事実は引用していない。
- 0.2.0 の追加: `stderr_log`（`write_line` と `log_stderr!` マクロ。ADR `stderr-log-write-failure.md`）、crate 内部の `partitioned_job`（ADR `partitioned-dml.md`）。`commit_boundary` / `fail_fast` / `ledger` / `panic_hook` / `required_op_id` の pub 項目（`ResponseBoundaryGuard::new` / `install` / `LedgerLookup` / `LastOperationLookup` / `EmergencyResponseRegistration::register` / `install_panic_hook` / `LedgerMode` / `MissingOperationId`）は 0.2.0 のソースでもシグネチャが同一であることを確認した。
- private spec（`docs/spec/05-tasks.md` TASK-92〜101、`docs/spec/04-behavior/recovery.md` RECOVER-1〜10）への参照 ID が rustdoc 中に多数出現するが、spec 本体は非公開のため個々の behavior ID の定義内容は未記載（ID の存在のみ rustdoc から転記）。

## Related

- [storage](./storage.md)
- [txn](./txn.md)
