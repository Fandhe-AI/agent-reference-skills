---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/error_format.rs
---

# error_format

`engine::error_format` は `wire_code` 写像の単一真実源（TASK-152・対象ビヘイビア: ERR-2）。`sql::allowlist::SqlSurfaceError` や `tenant::TenantWriteError` はここへ委譲する。

## Signature / Usage

`ErrorClass` は `define_error_classes!` マクロの単一リスト（`count = 46`）から 46 種の variant として生成される:

~~~rust,ignore
/// エラー分類の共通表現。engine・wire-server が現に返す `wire_code` に 1 対 1 で
/// 対応する（ERR-2。ポインタ: `docs/spec/04-behavior/error-format.md`）。
///
/// `#[non_exhaustive]` は付けない。分類の追加は
/// [`define_error_classes`] のリストへの 1 行追加としてのみ行い、
/// `wire_code`／`label`／`ALL` は同リストから生成されるため
/// 更新漏れが起こり得ない（`StorageError` と同じ「網羅 `match` を強制する」既定方針）。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ErrorClass {
    InvalidInput,
    AuthInvalid,
    AuthRequired,
    ForbiddenTenantMismatch,
    TableNotFound,
    RowNotFound,
    UniqueViolation,
    DuplicateOperationId,
    MissingOperationId,
    PayloadTooLarge,
    ConnectionLimitExceeded,
    FeatureNotSupported,
    UnsupportedSqlSyntax,
    ProtocolViolation,
    InternalError,
    NumericOutOfRange,
    OperationIdContentMismatch,
    DatetimeFieldOverflow,
    InvalidDatetimeFormat,
    InvalidTextRepresentation,
    InvalidTransactionState,
    ActiveSqlTransaction,
    NoActiveSqlTransaction,
    InFailedSqlTransaction,
    LockNotAvailable,
    DuplicateTable,
    DuplicateColumn,
    InvalidCursorName,
    DependentObjectsStillExist,
    WrongObjectType,
    NotNullViolation,
    UndefinedObject,
    UndefinedColumn,
    CheckViolation,
    ForeignKeyViolation,
    InvalidForeignKey,
    DatatypeMismatch,
    UndefinedFunction,
    DuplicateFunction,
    AmbiguousColumn,
    DivisionByZero,
    DuplicateObject,
    InvalidTableDefinition,
    PartialCompletion,
    PartitionedDmlCancelled,
    CardinalityViolation,
}

impl ErrorClass {
    /// 全分類。テストでの網羅・一意性検証、
    /// [`ErrorClass::from_wire_code`] の逆引きに使う。
    pub const ALL: [ErrorClass; 46] = [ /* 上記 46 variant（宣言順） */ ];

    /// SQLSTATE 風の 5 文字コード。ERR-2 が確定として保証する契約そのもの。
    /// 外部状態・時刻・乱数を参照しない純粋な `match`（決定的分類の保証）。
    pub const fn wire_code(self) -> &'static str

    /// 非規範の人間可読ラベル（`SCREAMING_SNAKE_CASE`）。診断・ログ用途に限り、
    /// wire プロトコル応答の契約には含めない（確定契約は `wire_code` のみ）。
    pub const fn label(self) -> &'static str
}

impl ErrorClass {
    /// `wire_code` からの逆引き。未知のコードは `None`（fail-closed）。
    /// `23502`・`23505` は複数分類が共有するため `ALL` の宣言順で最初に一致した分類を返す。
    pub fn from_wire_code(code: &str) -> Option<ErrorClass> {
        ErrorClass::ALL.into_iter().find(|c| c.wire_code() == code)
    }

    /// この分類が engine・wire-server のいずれかから現に送出されているか。
    /// `AuthRequired` の送出経路が TASK-174／HTTP-8（Issue #753）で接続されたため、
    /// 0.2.0 では常に `true`（メソッド自体は公開 API 後方互換のため残す）。
    pub const fn has_connected_send_path(self) -> bool {
        true
    }
}

/// エラーメッセージへ含める文言の長さ上限（`pub(crate)`）。
pub(crate) const MAX_MESSAGE_LEN: usize = 200;

/// `wire_code` の重複を明示的に許容する集合（ERR-6。`pub(crate)`・`#[cfg(test)]` からのみ参照）。
pub(crate) const SHARED_WIRE_CODES: &[&str] = &["23502", "23505"];

/// engine の各エラー型が共通分類へ写像するための trait。`SqlSurfaceError`
/// （`sql::allowlist`）・`TenantWriteError`（`tenant`）が実装し、既存の
/// `wire_code()`／`client_message()` をこの trait 経由へ委譲する。
pub trait ClassifiedError {
    /// この値が属する [`ErrorClass`]。
    fn error_class(&self) -> ErrorClass;

    /// クライアント（wire 層 `ErrorResponse`）へそのまま返してよい文言。内部詳細・
    /// 他テナントのデータ・存在情報を含めない契約（`.claude/rules/security.md` P0）。
    fn client_message(&self) -> String;

    /// SQLSTATE 風 `wire_code`。既定実装は `error_class().wire_code()` に委譲する。
    fn wire_code(&self) -> &'static str {
        self.error_class().wire_code()
    }
}

/// wire 層（TASK-97・TASK-153）へ渡す最終形。`ClassifiedError` を実装する engine の
/// 各エラー型から `From`／`from_classified` で変換して得る。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WireError {
    class: ErrorClass,
    message: String,
}

impl WireError {
    /// 新規構築。`message` は [`MAX_MESSAGE_LEN`] で切り詰める（DoS・情報漏えい対応）。
    /// `InternalError` を渡された場合、渡された `message` は使わず
    /// [`WireError::internal`] へ差し替える。
    pub fn new(class: ErrorClass, message: impl Into<String>) -> Self

    /// 内部エラー用の固定文言。呼び出し元は詳細を渡せない。
    pub fn internal() -> Self

    /// この値が属する [`ErrorClass`]。
    pub fn class(&self) -> ErrorClass

    /// SQLSTATE 風 `wire_code`。
    pub fn wire_code(&self) -> &'static str

    /// クライアントへ返す文言。
    pub fn message(&self) -> &str
}

impl std::fmt::Display for WireError { /* self.message をそのまま出力 */ }
impl std::error::Error for WireError {}
impl<E: ClassifiedError> From<&E> for WireError { /* InternalError は internal() へ丸める */ }
~~~

## Options / Props

`ErrorClass` の 46 variant と対応する `wire_code`（SQLSTATE 風 5 文字コード）:

| Variant | wire_code | label |
|------|------|------|
| `InvalidInput` | `22000` | `INVALID_INPUT` |
| `AuthInvalid` | `28P01` | `AUTH_INVALID` |
| `AuthRequired` | `28000` | `AUTH_REQUIRED` |
| `ForbiddenTenantMismatch` | `42501` | `FORBIDDEN_TENANT_MISMATCH` |
| `TableNotFound` | `42P01` | `TABLE_NOT_FOUND` |
| `RowNotFound` | `P0002` | `ROW_NOT_FOUND` |
| `UniqueViolation` | `23505` | `UNIQUE_VIOLATION` |
| `DuplicateOperationId` | `23505` | `DUPLICATE_OPERATION_ID` |
| `MissingOperationId` | `23502` | `MISSING_OPERATION_ID` |
| `PayloadTooLarge` | `54000` | `PAYLOAD_TOO_LARGE` |
| `ConnectionLimitExceeded` | `53300` | `CONNECTION_LIMIT_EXCEEDED` |
| `FeatureNotSupported` | `0A000` | `FEATURE_NOT_SUPPORTED` |
| `UnsupportedSqlSyntax` | `42601` | `UNSUPPORTED_SQL_SYNTAX` |
| `ProtocolViolation` | `08P01` | `PROTOCOL_VIOLATION` |
| `InternalError` | `XX000` | `INTERNAL_ERROR` |
| `NumericOutOfRange` | `22003` | `NUMERIC_OUT_OF_RANGE` |
| `OperationIdContentMismatch` | `22023` | `OPERATION_ID_CONTENT_MISMATCH` |
| `DatetimeFieldOverflow` | `22008` | `DATETIME_FIELD_OVERFLOW` |
| `InvalidDatetimeFormat` | `22007` | `INVALID_DATETIME_FORMAT` |
| `InvalidTextRepresentation` | `22P02` | `INVALID_TEXT_REPRESENTATION` |
| `InvalidTransactionState` | `25000` | `INVALID_TRANSACTION_STATE` |
| `ActiveSqlTransaction` | `25001` | `ACTIVE_SQL_TRANSACTION` |
| `NoActiveSqlTransaction` | `25P01` | `NO_ACTIVE_SQL_TRANSACTION` |
| `InFailedSqlTransaction` | `25P02` | `IN_FAILED_SQL_TRANSACTION` |
| `LockNotAvailable` | `55P03` | `LOCK_NOT_AVAILABLE` |
| `DuplicateTable` | `42P07` | `DUPLICATE_TABLE` |
| `DuplicateColumn` | `42701` | `DUPLICATE_COLUMN` |
| `InvalidCursorName` | `34000` | `INVALID_CURSOR_NAME` |
| `DependentObjectsStillExist` | `2BP01` | `DEPENDENT_OBJECTS_STILL_EXIST` |
| `WrongObjectType` | `42809` | `WRONG_OBJECT_TYPE` |
| `NotNullViolation` | `23502` | `NOT_NULL_VIOLATION` |
| `UndefinedObject` | `42704` | `UNDEFINED_OBJECT` |
| `UndefinedColumn` | `42703` | `UNDEFINED_COLUMN` |
| `CheckViolation` | `23514` | `CHECK_VIOLATION` |
| `ForeignKeyViolation` | `23503` | `FOREIGN_KEY_VIOLATION` |
| `InvalidForeignKey` | `42830` | `INVALID_FOREIGN_KEY` |
| `DatatypeMismatch` | `42804` | `DATATYPE_MISMATCH` |
| `UndefinedFunction` | `42883` | `UNDEFINED_FUNCTION` |
| `DuplicateFunction` | `42723` | `DUPLICATE_FUNCTION` |
| `AmbiguousColumn` | `42702` | `AMBIGUOUS_COLUMN` |
| `DivisionByZero` | `22012` | `DIVISION_BY_ZERO` |
| `DuplicateObject` | `42710` | `DUPLICATE_OBJECT` |
| `InvalidTableDefinition` | `42P16` | `INVALID_TABLE_DEFINITION` |
| `PartialCompletion` | `VD001` | `PARTIAL_COMPLETION` |
| `PartitionedDmlCancelled` | `VD002` | `PARTITIONED_DML_CANCELLED` |
| `CardinalityViolation` | `21000` | `CARDINALITY_VIOLATION` |

## Notes

- `ErrorClass` は `#[non_exhaustive]` を意図的に付けない設計。ADR `error-enum-non-exhaustive-policy` にこの方針の理由が記録されている（`StorageError` と同じ「網羅 `match` を強制する」既定方針。既公開の error enum へ遡及的に `#[non_exhaustive]` を付けないことも同 ADR の決定事項）。
- `wire_code` の共有は 2 組のみ（`SHARED_WIRE_CODES` = `["23502", "23505"]`）で、`label` で区別する: `23502` = `MissingOperationId` / `NotNullViolation`、`23505` = `UniqueViolation` / `DuplicateOperationId`（台帳由来の重複を行制約由来と区別。Issue #1180・RECOVER-12・ERR-6）。`from_wire_code` は宣言順で最初に一致した分類（`23502` は `MissingOperationId`、`23505` は `UniqueViolation`）を返し、応答本文の `code` ラベルは各エラー型の `error_class()` から得る。
- `UniqueViolation`（`23505`）は行キー `(tenant_id, id)` の衝突と PRIMARY KEY / UNIQUE 制約の違反。`DuplicateOperationId`（`23505`）は台帳照合で内容一致と判定された `operation_id` の再送で、接続断からの回復（RECOVER-7・RECOVER-12）でクライアントが commit 済みと確定できる根拠はこの分類だけ。`OperationIdContentMismatch`（`22023`、TASK-101・RECOVER-10）は内容不一致の再送で、`23505` を含む他のいかなる分類にも写像しないことを ERR-3（TASK-154）が確定契約とし `tests/error_format_err3.rs` で検証する。
- `LockNotAvailable`（`55P03`）は書き込みトランザクションの取得がロック待ちの上限を超過した場合（`StorageError::WriteLockTimeout` / `CatalogError::WriteLockTimeout` / `SqlSurfaceError::LockNotAvailable` の写像）。`PartialCompletion`（`VD001`）・`PartitionedDmlCancelled`（`VD002`）は分割実行 DML のベンダー拡張コード（`VD` クラス。PostgreSQL 標準 SQLSTATE と衝突しない）。
- `ForbiddenTenantMismatch`（`42501`）は `TenantWriteError::Forbidden` に加え、DDL 実行権限不足（`SqlSurfaceError::InsufficientPrivilege`）と UPSERT `DO UPDATE` の衝突先が不可視の場合（`TenantWriteError::ConflictTargetNotVisible`）も束ねる。`FeatureNotSupported`（`0A000`）の engine 側発生経路は `statement_splitter::MultiStatementError::WriteNotLast`（WIRE-16）のみ。`DuplicateObject`（`42710`）は `ALTER TABLE ... ADD CONSTRAINT` の CHECK・FOREIGN KEY 明示名衝突と `CREATE TYPE` の型名重複。
- `has_connected_send_path` は 0.1.0 では `AuthRequired` のみ `false` を返したが、0.2.0 では送出経路接続済みのため常に `true`（Migration (0.1.0 → 0.2.0): 戻り値が `false` の分類は存在しない）。
- `WireError::internal()` は呼び出し元が詳細メッセージを渡せない固定文言専用 API。`WireError::new(ErrorClass::InternalError, ...)` を呼んでも渡した `message` は使われず `internal()` の文言（`"internal error"`）へ差し替わる（内部詳細の漏えいを型で防ぐ構造）。
- `MAX_MESSAGE_LEN`（`pub(crate)`、値は 200）はクレート内部限定で、外部からは直接参照できない。`truncate_message` はマルチバイト文字境界を尊重して安全に切り詰める非公開関数。
- `WireError` のフィールド（`class` / `message`）は非公開。アクセスは `class()` / `wire_code()` / `message()` メソッド経由のみ。
- 本ページの 0.1.0 版は `ErrorClass` を 16 variant としていた。0.2.0 では 46 variant に拡張されている（0.1.0 の 16 variant はすべて維持。`DuplicateOperationId` が新規に `23505` を共有）。

## Related

- [core](./core.md)
