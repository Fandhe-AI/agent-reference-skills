# samples

| Name | Description | Path |
|------|-------------|------|
| gzip compression | `compression` feature の `CompressionConfig` + `Server::compression` で、条件を満たすレスポンスを gzip 圧縮する配線例。 | [compression.md](./compression.md) |
| CORS wiring | `cors` feature の 2 層配線（`Router::options_fallback` + `Server::cors`）だけを見せる最小 ToDo API サンプル。 | [cors.md](./cors.md) |
| CRUD routing with shared state | `route_async` / `route_param_async`、`Arc<RwLock<...>>` 共有状態、404 fallback を組み合わせた ToDo API。 | [crud-routing.md](./crud-routing.md) |
| CsrfGate | `CsrfGate` を builder で構築し、Cookie 認証の画面では認証ゲートより先に登録する例。 | [csrf-gate.md](./csrf-gate.md) |
| custom Middleware extension point | `Middleware` 拡張点（`on_request` / `on_response`）を自作し、`Server::middleware` で登録する最小例。 | [custom-middleware.md](./custom-middleware.md) |
| full-featured app template | `cors` / `compression` / `static` / `openapi` の 4 feature を組み合わせた実運用形テンプレート。 | [full-featured-app.md](./full-featured-app.md) |
| graceful shutdown | `BoundServer::run_until` と `Server::shutdown_grace_period` で、Ctrl-C 後に in-flight リクエストの完了を待って終了する例。 | [graceful-shutdown.md](./graceful-shutdown.md) |
| GraphQL schema wiring | `graphql` feature で `async_graphql::dynamic` の実行時スキーマを構築し、`POST /graphql` へ登録する配線例。 | [graphql-schema.md](./graphql-schema.md) |
| Interceptor extension point | `Interceptor` 拡張点（`intercept` / `map_response`）を自作し、`Server::interceptor` で登録する最小例。 | [interceptor.md](./interceptor.md) |
| JwtGate | `JwtPolicy` で検証ポリシーを定義し、`JwtAuthenticator` から `JwtGate` を作る例。 | [jwt-gate.md](./jwt-gate.md) |
| minimal server | `Server` + `Router` を組み合わせた最小構成の HTTP サーバ。 | [minimal-server.md](./minimal-server.md) |
| RequestGate for authorization | `X-Api-Key` ヘッダの有無だけを見るフェイルクローズな認可ゲートを `RequestGate` で自作し、`Server::gate` で登録する例。 | [request-gate-auth.md](./request-gate-auth.md) |
| Session cookie and 303 See Other | `SetCookie::session` でセッション Cookie を作り、`Response::see_other` で POST 後の 303 リダイレクトを組み立てる例。 | [session-cookie-see-other.md](./session-cookie-see-other.md) |
| static file serving | `StaticFilesConfig` + `Server::static_files` で、二層防御のパストラバーサル対策付き静的配信を行う配線例。 | [static-file-serving.md](./static-file-serving.md) |
| streaming response | `Handler::handle_streaming` + `StreamingResponse` / `BodyWriter` で chunked ストリーミング応答を返す最小例。 | [streaming-response.md](./streaming-response.md) |
| WebSocket message handler | `WebSocketConfig` の配線例。メッセージハンドラ・パスパターン・Origin 検査・Ping keepalive・サーバー起点 push を組み合わせる。 | [websocket-handler.md](./websocket-handler.md) |
