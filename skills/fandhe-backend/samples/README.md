# samples

| Name | Description | Path |
|------|-------------|------|
| compression | `compression` feature の `CompressionConfig` + `Server::compression` によるレスポンス圧縮 | [compression.md](./compression.md) |
| CORS wiring | `cors` feature の 2 層配線（プリフライト + 実リクエストヘッダ付与） | [cors.md](./cors.md) |
| CRUD routing with shared state | `route_async` / `route_param_async` とパスパラメータ、共有状態、404 fallback を組み合わせた ToDo API | [crud-routing.md](./crud-routing.md) |
| custom Middleware extension point | `Middleware` 拡張点を自作し `Server::middleware` で登録する最小例 | [custom-middleware.md](./custom-middleware.md) |
| full-featured app template | cors / compression / static / openapi を組み合わせた実運用形テンプレートの配線順序 | [full-featured-app.md](./full-featured-app.md) |
| graceful shutdown | `BoundServer::run_until` + `Server::shutdown_grace_period` による in-flight 完了待ち終了 | [graceful-shutdown.md](./graceful-shutdown.md) |
| GraphQL schema wiring | `graphql` feature の動的スキーマ構築 + `Server::graphql` 登録 + クエリ実行 | [graphql-schema.md](./graphql-schema.md) |
| Interceptor extension point | `Interceptor` 拡張点を自作し `Server::interceptor` で登録する最小例 | [interceptor.md](./interceptor.md) |
| minimal server | `Server` + `Router` を組み合わせた最小構成の HTTP サーバ | [minimal-server.md](./minimal-server.md) |
| RequestGate for authorization | `RequestGate` 拡張点でフェイルクローズな認可ゲートを自作し `Server::gate` で登録する例 | [request-gate-auth.md](./request-gate-auth.md) |
| static file serving | `static` feature の `StaticFilesConfig` + `Server::static_files` による静的配信 | [static-file-serving.md](./static-file-serving.md) |
| streaming response | `Handler::handle_streaming` + `StreamingResponse` / `BodyWriter` による chunked ストリーミング応答 | [streaming-response.md](./streaming-response.md) |
| WebSocket message handler | `websocket` feature の `WebSocketConfig::with_handler` によるユーザー定義メッセージハンドラ配線 | [websocket-handler.md](./websocket-handler.md) |
