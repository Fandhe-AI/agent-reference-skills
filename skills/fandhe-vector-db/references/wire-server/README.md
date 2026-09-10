# wire-server

| Name | Description | Path |
|------|-------------|------|
| main-cli | `wire-server` バイナリの CLI フラグと起動処理 | [main-cli.md](./main-cli.md) |
| server | 接続受け付けループ・同時接続数制御 | [server.md](./server.md) |
| handshake | StartupMessage・認証フロー・簡易クエリ最小応答 | [handshake.md](./handshake.md) |
| auth | ユーザーストア・Argon2id 照合・PolicyContext 導出 | [auth.md](./auth.md) |
| bind-guard | bind アドレスの通信路保護要件検証 | [bind-guard.md](./bind-guard.md) |
| framing | メッセージフレーミングの長さ検証・エラー分類 | [framing.md](./framing.md) |
| protocol-dispatch | 認証後メッセージの型バイト分類・未対応メッセージ拒否 | [protocol-dispatch.md](./protocol-dispatch.md) |
| simple-query | 簡易クエリ（'Q'）1 文の実行・応答委譲 | [simple-query.md](./simple-query.md) |
| result-encoder | RowDescription/DataRow/CommandComplete バイト列生成 | [result-encoder.md](./result-encoder.md) |
| response-buffer | 簡易クエリ応答の上限付きバッファ組み立て器 | [response-buffer.md](./response-buffer.md) |
| error-response | ErrorClass → ErrorResponse ('E') の横断写像 | [error-response.md](./error-response.md) |
| limits | 読み取りタイムアウト・同時接続数リミッター | [limits.md](./limits.md) |
| search-engine-opt | `--search-engine` / `--hnsw-*` CLI 引数パーサ | [search-engine-opt.md](./search-engine-opt.md) |
| lib | wire-server crate のモジュール構成 | [lib.md](./lib.md) |
