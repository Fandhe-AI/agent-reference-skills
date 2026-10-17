---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/lib.rs
---

# lib

`fandhe-db-wire-server` crate のライブラリ層（`wire_server`）。`src/main.rs`（バイナリ）と `tests/`（結合テスト）の双方から内部モジュールへアクセスできるよう、TASK-66 の stub から lib+bin 構成へ再編された。責務境界はクライアント接続の受け付け・wire プロトコルのパース/応答整形であり、クエリの実処理は `engine` crate（コアロジック層）へ委譲する。

## Signature / Usage

~~~rust,ignore
//! wire-server: PostgreSQL wire プロトコル v3 互換の自作実装ライブラリ層。
//!
//! モジュール構成:
//! - [`auth`]: ユーザーストア・Argon2id 照合・`PolicyContext` へのテナント導出（WIRE-2, WIRE-3）
//! - [`framing`]: メッセージフレーミングの長さ検証・fail-closed エラー分類（WIRE-4, WIRE-10）
//! - [`handshake`]: TCP 接続ごとのメッセージ読み書き・StartupMessage・認証フロー（WIRE-1）
//! - [`http`]: NoSQL 表層（HTTP/1.1 最小サブセットの転送路。TASK-173〜175。
//!   wire プロトコルとは独立した経路）の入口。`http::status` / `http::error_body` /
//!   `http::response` / `http::listener` / `http::body` / `http::session` /
//!   `http::query::{schema,filter,response}` 等を持つ（長い原文 doc は省略）
//! - [`bind_guard`]: bind アドレスの通信路保護要件検証（TLS 未構成時は loopback 限定。
//!   TASK-70・WIRE-7）。`main.rs::run_server` の唯一の bind 経路
//! - [`durability_opt`]: `--durability` opt-in CLI 引数の閉じた語彙パーサ
//!   （Issue #850。`engine::storage::WriteDurability` へ untrusted な CLI
//!   文字列から到達する唯一の入口。非既定値選択時の起動ログ警告は
//!   `main.rs::run_server` の責務）
//! - [`hnsw_scope_opt`]: `--hnsw-scope` CLI 引数の閉じた語彙パーサ（Issue #1065。
//!   `engine::search_engine::HnswScope` へ untrusted な CLI 文字列から到達する
//!   唯一の入口。`EngineCore::with_hnsw_scope` への注入は `main.rs::run_server`
//!   の責務）
//! - [`server`]: 接続受け付けループ・同時接続数の有界化・I/O タイムアウト適用
//!   （契約値・実装は [`limits`] に委譲）
//! - [`limits`]: 読み取りタイムアウト・共有接続数リミッター（TASK-69・WIRE-5, WIRE-6）
//! - [`protocol_dispatch`][]: 認証後メッセージの型バイト分類と、拡張クエリ
//!   プロトコル等の未対応メッセージへの fail-closed 拒否応答＋切断（TASK-71・WIRE-8）
//! - [`simple_query`][]: 簡易クエリ（'Q'）1 文の `engine::core::EngineCore` への
//!   委譲・成功/失敗応答の組み立て（TASK-73・WIRE-1）
//! - [`result_encoder`][]: `RowDescription`/`DataRow`/`CommandComplete`/
//!   `EmptyQueryResponse` のバイト列生成（純関数。TASK-73・WIRE-1）。
//!   バイナリ形式（format code 1）の結果エンコーディング（WIRE-14・
//!   TASK-218・Issue #936。`ResultFormats::resolve`・
//!   `validate_binary_formats`・`encode_row_description_with_formats`・
//!   `encode_data_row_into_with_formats`・`encode_data_row_into_with_columns`）も
//!   本モジュールが提供する。Bind の結果 format code は #934 で結線済みで、
//!   数値・真偽値・bytea・uuid 列のバイナリ符号化は Issue #1172 で追加した
//! - [`error_response`][]: `engine::error_format::ErrorClass` → `ErrorResponse`
//!   （'E'）バイト列への横断写像（TASK-153・ERR-1・`RECOVER-5` (3) ポインタ）
//! - `response_buffer`（crate 内限定）: 簡易クエリ応答の `DataRow` 群を上限付き
//!   バッファへ組み立て、1 回の `write_all` で送出するための組み立て器
//!   （Issue #481）
//! - [`search_engine_opt`]: `--search-engine` opt-in CLI 引数の閉じた語彙
//!   パーサ（Issue #656。`engine::search_engine::SearchEngineKind` へ
//!   untrusted な CLI 文字列から到達する唯一の入口）
//! - [`surface`]: `--surface` opt-in CLI 引数の閉じた語彙パーサ（Issue #734・
//!   TASK-171／HTTP-1。SQL／NoSQL の 2 表層排他選択へ untrusted な CLI
//!   文字列から到達する唯一の入口。`main.rs::run_server` がこの選択に応じて
//!   `server::accept_loop_with_engine`／`http::listener::accept_loop_with_limiter`
//!   のいずれか 1 本だけを呼ぶ（Issue #735・#743）
//! - [`tls`]: 自作 TLS 1.3 サーバー側実装の入口（TASK-228・WIRE-9・HTTP-10）。
//!   X25519 鍵交換・`tls::record`・`tls::record_protection`・`tls::ed25519`・
//!   `tls::certificate_verify`・`tls::server_handshake` を持つ（長い原文 doc は省略）
//! - [`wire_stream`][]: 認証後接続ハンドラが読み書きするストリームの抽象
//!   [`wire_stream::WireStream`]。`TcpStream`（平文）・[`tls::stream::TlsStream`]（TLS）の
//!   双方に実装し、`handshake`・`simple_query`・`extended_query`・`copy`・
//!   `protocol_dispatch` のハンドラ本体は本 trait のオブジェクトを介して同一ロジックを共有する
//! - `fault_injection`（feature `fault-injection` 限定・テスト専用。
//!   Issue #705）: `--fault-inject post-commit-panic` opt-in CLI 引数の閉じた
//!   語彙パーサと、`simple_query::execute_and_respond` の登録ブロック内から
//!   呼ばれる commit 後 panic 注入。default features には含まれない

#![cfg_attr(not(test), deny(clippy::print_stderr))]

pub mod auth;
pub mod auth_method_opt;
pub(crate) mod binary_param;
pub mod bind_guard;
pub(crate) mod copy;
pub mod ddl_permission_opt;
pub mod dml_limits_opt;
pub mod durability_opt;
pub mod error_response;
pub mod extended_query;
#[cfg(feature = "fault-injection")]
pub mod fault_injection;
pub mod framing;
pub mod handshake;
pub mod hnsw_scope_opt;
pub mod http;
pub mod limits;
pub mod protocol_dispatch;
pub(crate) mod response_buffer;
pub mod result_encoder;
pub mod search_engine_opt;
pub mod server;
pub mod simple_query;
pub mod surface;
pub mod tls;
pub mod tls_opt;
pub mod wire_stream;
~~~

## Notes

- 対応タスク: TASK-67（WIRE-1, WIRE-2, WIRE-3）、TASK-68（WIRE-4, WIRE-10）、TASK-69（WIRE-5, WIRE-6）、TASK-70（WIRE-7）、TASK-71（WIRE-8）、TASK-73（WIRE-1: 簡易クエリを engine SQL 表層へ接続）、TASK-153（ERR-1: ErrorResponse 正式写像）。ポインタは `docs/spec/05-tasks.md`（private）。
- `response_buffer`・`binary_param`・`copy` が `pub(crate)`（crate 外非公開）で、他は全て `pub mod`。`fault_injection` は feature `fault-injection` 限定（既定ビルドには存在しない）。
- 0.2.0 で追加された `pub mod`: `auth_method_opt` / `ddl_permission_opt` / `dml_limits_opt` / `durability_opt` / `extended_query` / `fault_injection` / `hnsw_scope_opt` / `http` / `surface` / `tls` / `tls_opt` / `wire_stream`。拡張クエリプロトコルは 0.1.0 では未対応メッセージとして拒否されていたが、0.2.0 では `extended_query` モジュールが追加されている（`protocol_dispatch` の説明文自体は原文で 0.1.0 当時のまま）。
- 上記コードブロックは `//!` の長い対応タスク解説（`http` / `tls` の詳細列挙など）を一部省略し、モジュール宣言は 0.2.0 の `lib.rs` から転記している。

## Related

- [server.md](./server.md)
- [handshake.md](./handshake.md)
- [main-cli.md](./main-cli.md)
