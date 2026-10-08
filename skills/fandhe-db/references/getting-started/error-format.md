---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/error_format.rs
---

# error_format

`engine::error_format` は `wire_code` 写像の単一真実源（TASK-152・対象ビヘイビア: ERR-2）。`sql::allowlist::SqlSurfaceError` や `tenant::TenantWriteError` はここへ委譲する。

## Signature / Usage

`ErrorClass` は `define_error_classes!` マクロの単一リストから 16 種の variant として生成される:

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
    MissingOperationId,
    PayloadTooLarge,
    ConnectionLimitExceeded,
    FeatureNotSupported,
    UnsupportedSqlSyntax,
    ProtocolViolation,
    InternalError,
    NumericOutOfRange,
    OperationIdContentMismatch,
}

impl ErrorClass {
    /// 全分類。テストでの網羅・一意性検証、
    /// [`ErrorClass::from_wire_code`] の逆引きに使う。
    pub const ALL: [ErrorClass; 16] = [ /* 上記 16 variant */ ];

    /// SQLSTATE 風の 5 文字コード。ERR-2 が確定として保証する契約そのもの。
    /// 外部状態・時刻・乱数を参照しない純粋な `match`（決定的分類の保証）。
    pub const fn wire_code(self) -> &'static str

    /// 非規範の人間可読ラベル（`SCREAMING_SNAKE_CASE`）。診断・ログ用途に限り、
    /// wire プロトコル応答の契約には含めない（確定契約は `wire_code` のみ）。
    pub const fn label(self) -> &'static str
}

impl ErrorClass {
    /// `wire_code` からの逆引き。未知のコードは `None`（fail-closed。呼び出し元が
    /// 未知コードを既定分類へ丸めて誤った意味論を持たせることを防ぐ）。
    pub fn from_wire_code(code: &str) -> Option<ErrorClass> {
        ErrorClass::ALL.into_iter().find(|c| c.wire_code() == code)
    }

    /// この分類が engine・wire-server のいずれかから現に送出されているか
    /// （モジュール冒頭の「収録範囲は現に返している `wire_code` に限る」という
    /// 不変条件の唯一の例外を、prose だけでなくコード側でも明示・網羅テスト可能に
    /// するための判定。`false` を返すのは [`ErrorClass::AuthRequired`] のみ）。
    pub const fn has_connected_send_path(self) -> bool {
        !matches!(self, ErrorClass::AuthRequired)
    }
}

/// エラーメッセージへ含める文言の長さ上限。untrusted 断片（テーブル名・SQL 片等）を
/// そのまま無加工で長大に埋め込まない。engine 全体の切り詰め上限の単一真実源であり、
/// `sql::allowlist` は構築時点（コンストラクタ）の切り詰めにこの値を参照する
/// （`WireError::new` 側は最終防波堤として同じ規約を適用する）。
pub(crate) const MAX_MESSAGE_LEN: usize = 200;

/// engine の各エラー型が共通分類へ写像するための trait。`SqlSurfaceError`
/// （`sql::allowlist`）・`TenantWriteError`（`tenant`）が実装し、既存の
/// `wire_code()`／`client_message()` をこの trait 経由へ委譲する。
pub trait ClassifiedError {
    /// この値が属する [`ErrorClass`]。
    fn error_class(&self) -> ErrorClass;

    /// クライアント（wire 層 `ErrorResponse`）へそのまま返してよい文言。内部詳細・
    /// 他テナントのデータ・存在情報を含めない契約（`.claude/rules/security.md` P0）。
    fn client_message(&self) -> String;

    /// SQLSTATE 風 `wire_code`。既定実装は `error_class().wire_code()` に委譲する
    /// （実装型ごとに再定義しない。乖離を構造的に防ぐ）。
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
    /// `class == InternalError` の詳細文言を運びたい場合はこの API を使わず、必ず
    /// [`WireError::internal`] を使うこと（内部ストレージ詳細等の漏えい経路を型で塞ぐ）。
    /// `InternalError` を渡された場合、渡された `message` は使わず
    /// [`WireError::internal`] へ差し替える（コメントの主張を実装でも強制し、
    /// 呼び出し側の実装漏れによる詳細漏えいを構造的に防ぐ）。
    pub fn new(class: ErrorClass, message: impl Into<String>) -> Self

    /// 内部エラー用の固定文言。呼び出し元は詳細を渡せない（redb I/O エラー等の
    /// 内部ストレージ詳細をクライアントへ運ばないための構造的な防止策。
    /// `.claude/rules/security.md`「不安全な設計」対応）。
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

`ErrorClass` の 16 variant と対応する `wire_code`（SQLSTATE 風 5 文字コード）:

| Variant | wire_code | label |
|------|------|------|
| `InvalidInput` | `22000` | `INVALID_INPUT` |
| `AuthInvalid` | `28P01` | `AUTH_INVALID` |
| `AuthRequired` | `28000` | `AUTH_REQUIRED` |
| `ForbiddenTenantMismatch` | `42501` | `FORBIDDEN_TENANT_MISMATCH` |
| `TableNotFound` | `42P01` | `TABLE_NOT_FOUND` |
| `RowNotFound` | `P0002` | `ROW_NOT_FOUND` |
| `UniqueViolation` | `23505` | `UNIQUE_VIOLATION` |
| `MissingOperationId` | `23502` | `MISSING_OPERATION_ID` |
| `PayloadTooLarge` | `54000` | `PAYLOAD_TOO_LARGE` |
| `ConnectionLimitExceeded` | `53300` | `CONNECTION_LIMIT_EXCEEDED` |
| `FeatureNotSupported` | `0A000` | `FEATURE_NOT_SUPPORTED` |
| `UnsupportedSqlSyntax` | `42601` | `UNSUPPORTED_SQL_SYNTAX` |
| `ProtocolViolation` | `08P01` | `PROTOCOL_VIOLATION` |
| `InternalError` | `XX000` | `INTERNAL_ERROR` |
| `NumericOutOfRange` | `22003` | `NUMERIC_OUT_OF_RANGE` |
| `OperationIdContentMismatch` | `22023` | `OPERATION_ID_CONTENT_MISMATCH` |

## Notes

- `ErrorClass` は `#[non_exhaustive]` を意図的に付けない設計。ADR `error-enum-non-exhaustive-policy` にこの方針の理由が記録されている（`StorageError` と同じ「網羅 `match` を強制する」既定方針。既公開の error enum へ遡及的に `#[non_exhaustive]` を付けないことも同 ADR の決定事項）。
- `AuthRequired`（`28000`）は 16 variant のうち唯一 `has_connected_send_path() == false`（送出経路が未接続）。TASK-153（ERR-1）が wire-server 側の横断写像の網羅対象として追加したのみで、engine・wire-server とも現時点で実際に送出する経路は無い。この「未接続分類は `AuthRequired` のみ」という不変条件は `tests/error_format.rs` 側で機械検証される。
- `UniqueViolation`（`23505`）は行キー `(tenant_id, id)` の衝突と `operation_id` 重複（TASK-93 の台帳）の両方が属する共通分類。`OperationIdContentMismatch`（`22023`、TASK-101・RECOVER-10）はハッシュ不一致の再送を表し、`23505` を含む他のいかなる分類にも写像しないことを対象ビヘイビア ERR-3（TASK-154）が確定契約とし `tests/error_format_err3.rs` で検証する。
- `WireError::internal()` は呼び出し元が詳細メッセージを渡せない固定文言専用 API。`WireError::new(ErrorClass::InternalError, ...)` を呼んでも渡した `message` は使われず `internal()` の文言（`"internal error"`）へ差し替わる（内部詳細の漏えいを型で防ぐ構造）。
- `MAX_MESSAGE_LEN`（`pub(crate)`、値は 200）はクレート内部限定で、外部からは直接参照できない。`truncate_message` はマルチバイト文字境界を尊重して安全に切り詰める非公開関数。
- `WireError` のフィールド（`class` / `message`）は非公開。アクセスは `class()` / `wire_code()` / `message()` メソッド経由のみ。

## Related

- [core](./core.md)
