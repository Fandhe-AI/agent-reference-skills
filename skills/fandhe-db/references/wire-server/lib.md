---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/lib.rs
---

# lib

`fandhe-vector-db-wire-server` crate のライブラリ層（`wire_server`）。`src/main.rs`（バイナリ）と `tests/`（結合テスト）の双方から内部モジュールへアクセスできるよう、TASK-66 の stub から lib+bin 構成へ再編された。責務境界はクライアント接続の受け付け・wire プロトコルのパース/応答整形であり、クエリの実処理は `engine` crate（コアロジック層）へ委譲する。

## Signature / Usage

~~~rust,ignore
//! wire-server: PostgreSQL wire プロトコル v3 互換の自作実装ライブラリ層。
//!
//! モジュール構成:
//! - [`auth`]: ユーザーストア・Argon2id 照合・`PolicyContext` へのテナント導出（WIRE-2, WIRE-3）
//! - [`framing`]: メッセージフレーミングの長さ検証・fail-closed エラー分類（WIRE-4, WIRE-10）
//! - [`handshake`]: TCP 接続ごとのメッセージ読み書き・StartupMessage・認証フロー（WIRE-1）
//! - [`bind_guard`]: bind アドレスの通信路保護要件検証（TLS 未構成時は loopback 限定。
//!   TASK-70・WIRE-7）。`main.rs::run_server` の唯一の bind 経路
//! - [`server`]: 接続受け付けループ・同時接続数の有界化・I/O タイムアウト適用
//!   （契約値・実装は [`limits`] に委譲）
//! - [`limits`]: 読み取りタイムアウト・共有接続数リミッター（TASK-69・WIRE-5, WIRE-6）
//! - [`protocol_dispatch`][]: 認証後メッセージの型バイト分類と、拡張クエリ
//!   プロトコル等の未対応メッセージへの fail-closed 拒否応答＋切断（TASK-71・WIRE-8）
//! - [`simple_query`][]: 簡易クエリ（'Q'）1 文の `engine::core::EngineCore` への
//!   委譲・成功/失敗応答の組み立て（TASK-73・WIRE-1）
//! - [`result_encoder`][]: `RowDescription`/`DataRow`/`CommandComplete`/
//!   `EmptyQueryResponse` のバイト列生成（純関数。TASK-73・WIRE-1）
//! - [`error_response`][]: `engine::error_format::ErrorClass` → `ErrorResponse`
//!   （'E'）バイト列への横断写像（TASK-153・ERR-1・`RECOVER-5` (3) ポインタ）
//! - `response_buffer`（crate 内限定）: 簡易クエリ応答の `DataRow` 群を上限付き
//!   バッファへ組み立て、1 回の `write_all` で送出するための組み立て器
//!   （Issue #481）
//! - [`search_engine_opt`]: `--search-engine` opt-in CLI 引数の閉じた語彙
//!   パーサ（Issue #656。`engine::search_engine::SearchEngineKind` へ
//!   untrusted な CLI 文字列から到達する唯一の入口）

pub mod auth;
pub mod bind_guard;
pub mod error_response;
pub mod framing;
pub mod handshake;
pub mod limits;
pub mod protocol_dispatch;
pub(crate) mod response_buffer;
pub mod result_encoder;
pub mod search_engine_opt;
pub mod server;
pub mod simple_query;
~~~

## Notes

- 対応タスク: TASK-67（WIRE-1, WIRE-2, WIRE-3）、TASK-68（WIRE-4, WIRE-10）、TASK-69（WIRE-5, WIRE-6）、TASK-70（WIRE-7）、TASK-71（WIRE-8）、TASK-73（WIRE-1: 簡易クエリを engine SQL 表層へ接続）、TASK-153（ERR-1: ErrorResponse 正式写像）。ポインタは `docs/spec/05-tasks.md`（private）。
- `response_buffer` のみ `pub(crate)`（crate 外非公開）で、他は全て `pub mod`。

## Related

- [server.md](./server.md)
- [handshake.md](./handshake.md)
- [main-cli.md](./main-cli.md)
