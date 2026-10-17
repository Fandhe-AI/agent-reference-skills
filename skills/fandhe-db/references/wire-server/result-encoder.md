---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/result_encoder.rs
---

# result_encoder

簡易クエリプロトコル（0.2.0 では拡張クエリ・COPY も `ReadyForQuery` に利用）の応答メッセージ（`RowDescription`/`DataRow`/`CommandComplete`/`EmptyQueryResponse`）のバイト列生成を担う。純関数のみで構成され I/O は一切行わない（`Vec<u8>` を返すのみ）。呼び出し元の [simple-query.md](./simple-query.md) が `TcpStream` への書き込みを担当する。`engine::sql::exec::{ColumnMeta, Cell, ResultRow}` から wire v3 の text フォーマットへの写像がここに閉じる（TASK-73・WIRE-1）。

型写像（すべて format code 0 = text）:
- `ColumnMeta::Id` → `numeric`（OID 1700, typlen -1）。engine の行 ID は `u64` 全域（`u64::MAX` を含む）を有効値とするため、符号付き 64bit の `int8`（OID 20）では表現できず `numeric` として公告する
- `ColumnMeta::Scalar{ty: Text}` → `text`（OID 25, typlen -1）
- `ColumnMeta::Scalar{ty: Vector(_)}` → `text`（OID 25。値は `[v1,v2,...]` 形式）
- `ColumnMeta::Computed{..}` → `text`（OID 25。実行時型のため text 固定）

## Signature / Usage

~~~rust,ignore
#[derive(Debug)]
pub struct EncodeError;

pub(crate) fn frame_len(body_len: usize) -> Result<i32, EncodeError>

pub fn encode_row_description(columns: &[ColumnMeta]) -> Result<Vec<u8>, EncodeError>

/// `DataRow`（'D'）を `out` の末尾へ追記する（Issue #481）。失敗時は `out` を
/// 呼び出し前の長さへ必ず `truncate` してから返す（部分フレームを絶対に残さない）。
pub fn encode_data_row_into(row: &ResultRow, out: &mut Vec<u8>) -> Result<(), EncodeError>

/// `DataRow`（'D'）を 1 行ぶん新規 `Vec<u8>` として組み立てる薄いラッパー。
pub fn encode_data_row(row: &ResultRow) -> Result<Vec<u8>, EncodeError>

pub fn encode_command_complete(tag: &str) -> Result<Vec<u8>, EncodeError>

/// `ReadyForQuery`（'Z'）。固定長 6 バイト（タグ 1 + 長さ 4 + トランザクション
/// 状態 1）。`crate::handshake::write_ready_for_query` から使う唯一のレイアウト
/// 実体（Issue #481。以前は同モジュール内にバイト列組み立てが個別に存在し、
/// `crate::response_buffer::ResponseBuffer` へ他フレームと同じ形で積める
/// フレームが無かった）。状態バイトは `status`（[`engine::sql::transaction::
/// SessionTransaction::status`] が返す接続単位の明示トランザクション状態。
/// SQL-31・TASK-221・WIRE-19）をそのまま `'I'`（idle）／`'T'`（in transaction）／
/// `'E'`（failed transaction）へ写像する。呼び出し元が明示トランザクションを
/// 持たない箇所（ハンドシェイク直後・COPY サブプロトコル。COPY は明示
/// トランザクション中には到達しない）は `TransactionStatus::Idle` を渡す。
pub fn encode_ready_for_query(status: engine::sql::transaction::TransactionStatus) -> [u8; 6]

pub fn encode_empty_query_response() -> Vec<u8>

pub(crate) fn push_s_c_m_fields(body: &mut Vec<u8>, severity: &str, sqlstate: &str, message: &str)

/// **本 crate の通常・緊急いずれの送出経路もこの関数は経由しない**（TASK-153・ERR-1）。
/// `crate::error_response::encode` を使うこと。
pub fn encode_error_response(sqlstate: &str, message: &str) -> Result<Vec<u8>, EncodeError>
~~~

## Notes

- `encode_ready_for_query` は簡易クエリ（`simple_query`）・COPY・拡張クエリ（`extended_query`）の各経路から呼ばれる（`txn.status()` を渡す）。
- doc コメント中の「COPY サブプロトコル。COPY は明示トランザクション中には到達しない……`TransactionStatus::Idle` を渡す」は原文のまま残した古い記述。0.2.0 の `copy.rs` は明示トランザクション中の COPY も受理し、ReadyForQuery には `txn.status()` を渡す（失敗時は Failed = `'E'`。[copy.md](./copy.md) 参照）。`Idle` 固定で渡すのはハンドシェイク直後だけ。
- バージョン差異: 0.1.0 では引数なしで常に `'I'` を返していた。0.2.0 で `TransactionStatus`（Idle → `'I'` / InTransaction → `'T'` / Failed → `'E'`）を受け取る形に変わった。
- サイズ安全: モジュール doc は「フレーム長は `i32::try_from`/`checked_add` で算出し、超過は `Err(EncodeError::FrameTooLarge)` とする」と記す（原文どおり引用）。ただし実際の `EncodeError` は `pub struct EncodeError;`（フィールドなしの unit struct）であり `FrameTooLarge` という variant は存在しない。超過時は単に `Err(EncodeError)` が返る（doc コメントの表現が実装と乖離した古い記述と見られる）。
- `push_s_c_m_fields` は本モジュールと [error-response.md](./error-response.md) が共有する唯一のレイアウト実体（S/C/M フィールド書き込み、PR #101）。
- `encode_error_response` は severity を常に `ERROR` 固定にする薄い公開 API で、`ErrorClass::ConnectionLimitExceeded` の `FATAL` 契約は表現できない。通常・緊急送出経路はいずれも `error_response::encode` を経由する。

## Related

- [error-response.md](./error-response.md)
- [response-buffer.md](./response-buffer.md)
- [simple-query.md](./simple-query.md)
