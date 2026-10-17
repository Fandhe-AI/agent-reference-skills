# wire-server

| Name | Description | Path |
|------|-------------|------|
| auth_method_opt | `--auth-method` CLI 引数の閉じた語彙パーサ… | [auth-method-opt.md](./auth-method-opt.md) |
| auth | ユーザーストア・Argon2id 照合・テナント導出… | [auth.md](./auth.md) |
| binary_param | Bind のバイナリ形式パラメータをテキストへ復号… | [binary-param.md](./binary-param.md) |
| bind_guard | bind アドレスの通信路保護要件を起動時に検証… | [bind-guard.md](./bind-guard.md) |
| copy | COPY プロトコル（FROM STDIN / TO STDOUT）のメッセージ層… | [copy.md](./copy.md) |
| ddl_permission_opt | `--ddl-allowed-users` CLI 引数の閉じた検証パーサ… | [ddl-permission-opt.md](./ddl-permission-opt.md) |
| dml_limits_opt | DML 行数上限・バッチ・分割実行 DML の CLI フラグ… | [dml-limits-opt.md](./dml-limits-opt.md) |
| durability_opt | `--durability` CLI 引数の閉じた語彙パーサ… | [durability-opt.md](./durability-opt.md) |
| error_response | ErrorClass → ErrorResponse ('E') の横断写像… | [error-response.md](./error-response.md) |
| extended_query | 拡張クエリ（Parse/Describe/Bind/Execute 等）の受理… | [extended-query.md](./extended-query.md) |
| framing | wire プロトコル入力のフレーミング検証（長さ上限・最小長）… | [framing.md](./framing.md) |
| handshake | PostgreSQL wire v3 のハンドシェイク・簡易クエリ最小応答… | [handshake.md](./handshake.md) |
| hnsw_scope_opt | `--hnsw-scope` CLI 引数の閉じた語彙パーサ… | [hnsw-scope-opt.md](./hnsw-scope-opt.md) |
| lib | wire-server crate のライブラリ層（wire_server）… | [lib.md](./lib.md) |
| limits | 読み取りタイムアウト・同時接続数リミッター… | [limits.md](./limits.md) |
| main (CLI) | wire-server バイナリのエントリポイント・CLI 引数処理… | [main-cli.md](./main-cli.md) |
| protocol_dispatch | 認証後メッセージの型バイト分類・未対応メッセージ拒否… | [protocol-dispatch.md](./protocol-dispatch.md) |
| response_buffer | 簡易クエリ応答の上限付きバッファ組み立て器… | [response-buffer.md](./response-buffer.md) |
| result_encoder | RowDescription/DataRow/CommandComplete のバイト列生成… | [result-encoder.md](./result-encoder.md) |
| search_engine_opt | `--search-engine` / `--hnsw-*` CLI 引数パーサ… | [search-engine-opt.md](./search-engine-opt.md) |
| server | 接続受け付けループ本体・1 接続 1 スレッドの有界化… | [server.md](./server.md) |
| simple_query | 簡易クエリ（'Q'）本文の実行と応答整形… | [simple-query.md](./simple-query.md) |
| surface | `--surface`（sql / nosql）CLI 引数の閉じた語彙パーサ… | [surface.md](./surface.md) |
| tls_opt | TLS opt-in CLI 引数の語彙パーサと証明書・鍵の読み込み… | [tls-opt.md](./tls-opt.md) |
| tls | TLS 1.3 サーバー側の自作実装の入口… | [tls.md](./tls.md) |
| wire_stream | 認証後 pg wire ハンドラが読み書きするストリーム抽象… | [wire-stream.md](./wire-stream.md) |
