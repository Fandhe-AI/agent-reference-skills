---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/error_format.rs
---

# error_format

`engine::error_format` は `wire_code` 写像の単一真実源（TASK-152・対象ビヘイビア: ERR-2）。`sql::allowlist::SqlSurfaceError` や `tenant::TenantWriteError` はここへ委譲する。

## Signature / Usage

~~~rust,ignore
/// エラー分類の共通表現。engine・wire-server が現に返す `wire_code` に 1 対 1 で
/// 対応する（ERR-2）。
///
/// `#[non_exhaustive]` は付けない。分類の追加は
/// `define_error_classes` のリストへの 1 行追加としてのみ行い、
/// `wire_code`／`label`／`ALL` は同リストから生成されるため
/// 更新漏れが起こり得ない。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ErrorClass

pub const ALL: [ErrorClass; $count]

pub const fn wire_code(self) -> &'static str

pub const fn label(self) -> &'static str

pub fn from_wire_code(code: &str) -> Option<ErrorClass>

pub const fn has_connected_send_path(self) -> bool

/// engine の各エラー型が共通分類へ写像するための trait。`SqlSurfaceError`
/// （`sql::allowlist`）・`TenantWriteError`（`tenant`）が実装し、既存の
/// `wire_code()`／`client_message()` をこの trait 経由へ委譲する。
pub trait ClassifiedError {
    /// この値が属する `ErrorClass`。
    fn error_class(&self) -> ErrorClass;

    /// クライアント（wire 層 `ErrorResponse`）へそのまま返してよい文言。内部詳細・
    /// 他テナントのデータ・存在情報を含めない契約。
    fn client_message(&self) -> String;

    /// SQLSTATE 風 `wire_code`。既定実装は `error_class().wire_code()` に委譲する。
    fn wire_code(&self) -> &'static str;
}

/// wire 層へ渡す最終形。`ClassifiedError` を実装する engine の各エラー型から
/// `From`／`from_classified` で変換して得る。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WireError

/// 新規構築。`message` は `MAX_MESSAGE_LEN` で切り詰める（DoS・情報漏えい対応）。
/// `class == InternalError` の詳細文言を運びたい場合はこの API を使わず、必ず
/// `WireError::internal` を使うこと。`InternalError` を渡された場合、渡された
/// `message` は使わず `WireError::internal` へ差し替える。
pub fn new(class: ErrorClass, message: impl Into<String>) -> Self

/// 内部エラー用の固定文言。呼び出し元は詳細を渡せない（redb I/O エラー等の
/// 内部ストレージ詳細をクライアントへ運ばないための構造的な防止策）。
pub fn internal() -> Self

/// この値が属する `ErrorClass`。
pub fn class(&self) -> ErrorClass

/// SQLSTATE 風 `wire_code`。
pub fn wire_code(&self) -> &'static str

/// クライアントへ返す文言。
pub fn message(&self) -> &str

impl std::fmt::Display for WireError
impl std::error::Error for WireError
impl<E: ClassifiedError> From<&E> for WireError
~~~

## Notes

- `ErrorClass` は `#[non_exhaustive]` を意図的に付けない設計。ADR `error-enum-non-exhaustive-policy` にこの方針の理由が記録されている（`StorageError` と同じ「網羅 `match` を強制する」既定方針）。
- `WireError::internal()` は呼び出し元が詳細メッセージを渡せない固定文言専用 API。`WireError::new(ErrorClass::InternalError, ...)` を呼んでも渡した `message` は使われず `internal()` の文言へ差し替わる（内部詳細の漏えいを型で防ぐ構造）。
- `MAX_MESSAGE_LEN` は `pub(crate)`（クレート内部限定）で、外部からは直接参照できない。

## Related

- [core](./core.md)
