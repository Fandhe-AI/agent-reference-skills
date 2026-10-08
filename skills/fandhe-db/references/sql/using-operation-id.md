---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/using_operation_id.rs
---

# sql::using_operation_id

`USING OPERATION_ID '<id>'` 文末句の値型・検証（TASK-80、SQL-10。RECOVER-1 と関連）。書き込み系 SQL 文の文末専用句として `operation_id` を搬送する、本タスクで唯一の規範経路（セッション変数・コメント埋め込み等の別経路は設けない。スコープは statement 単位に閉じる）。句の構文パース（`USING` / `OPERATION_ID` キーワード・文字列リテラルの並び）は `sql::allowlist::Parser::parse_operation_id_clause` が行い、本モジュールはパース済み文字列値の意味論的検証（`OperationId::parse`）のみを担う。

## Signature / Usage

~~~rust,ignore
pub const MAX_OPERATION_ID_LEN: usize = 256;

/// 検証済みの operation_id 値。空文字・長さ超過・制御文字混入を排除済み。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct OperationId(String);

/// raw を検証して OperationId を構築する。
///
/// - 空文字は「句の省略と同等」とみなし SqlSurfaceError::MissingOperationId
///   （23502）で拒否する（advisor 方針: 23502 は not-null 制約違反相当のため、
///   明示的に空値を渡す行為も「値が実質的に欠落している」として同じ扱いにする）。
/// - MAX_OPERATION_ID_LEN バイト超過・制御文字（char::is_control）混入は
///   SqlSurfaceError::invalid_input（22000）。
pub fn parse(raw: &str) -> Result<Self, SqlSurfaceError>

pub fn as_str(&self) -> &str
~~~

## Notes

- 台帳への永続化（TASK-93）・重複拒否（23505、TASK-94）・内容不一致（22023、TASK-101）は本モジュールの管轄外（storage/recovery scope）で、いずれも本モジュールが提供する検証済み `OperationId` を土台にする。
- ADR `docs/design/operation-id-ledger.md`（pin SHA `7022d112e79760dca916480599553fcac256b5fb`）: operation_id 台帳は「テナント内・テーブル単位の永続台帳として、当該書き込みと同一トランザクション内で原子的に記録する基盤」で、書き込み操作ごとの重複排除と追跡可能性を実現する。既存エントリの非置換（keep-first）ポリシー。SQL 表層（`USING OPERATION_ID` 句）との直接接続の詳細は private spec（`docs/spec/04-behavior/sql-surface.md` SQL-10）が管理し、公開 ADR には明記がない。
- ADR `docs/design/operation-id-required-guard.md`（同 pin SHA）: 書き込み系操作（INSERT・UPDATE・DELETE）に対する operation_id 必須化ガード。適用範囲は SQL 表層・`EngineCore` の行書き込み API（`insert_row`・`update_row`・`delete_row`）を含むと示唆されるが、`LedgerMode` によりいつ必須／任意かの詳細判断根拠は private spec（`docs/spec/04-behavior/recovery.md` RECOVER-1）側が管理しており、本 ADR には記載がない。spec 非公開のため `LedgerMode` の variant ごとの必須/任意条件は未記載。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `USING OPERATION_ID` is an idempotency-key clause specific to this engine's write path, unrelated to those clients' transaction APIs.

## Related

- [allowlist](./allowlist.md)
- [parser](./parser.md)
