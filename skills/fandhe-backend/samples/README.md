# samples

| Name | Description | Path |
|------|-------------|------|
| gzip compression | `compression` feature の `CompressionConfig` + `Server::compression` で、条件を満たすレスポンスを gzip 圧縮するレスポンス後処理型プラグインの配線例。 | [compression.md](./compression.md) |
| CORS wiring | `cors` feature の 2 層配線（`Router::options_fallback` によるプリフライト委譲 + `Server::cors` による実リクエストへのヘッダ付与）だけを見せる最小 ToDo API サンプル。 | [cors.md](./cors.md) |
| CRUD routing with shared state | `route_async` / `route_param_async` とパスパラメータ、`Arc<RwLock<...>>` 共有状態、404 fallback を組み合わせた ToDo API。 | [crud-routing.md](./crud-routing.md) |
| CsrfGate | `fandhe-backend-plugin-csrf` の `CsrfGate` を builder で構築し、Cookie 認証の画面では CSRF ゲートを認証ゲートより先に登録する例。 | [csrf-gate.md](./csrf-gate.md) |
| custom Middleware extension point | `Middleware` 拡張点（`on_request` / `on_response`）を自作し、`Server::middleware` で登録する最小例。 | [custom-middleware.md](./custom-middleware.md) |
| full-featured app template | `cors` / `compression` / `static` / `openapi` の 4 feature を 1 プロジェクトへ組み合わせて配線する実運用形テンプレート。 | [full-featured-app.md](./full-featured-app.md) |
| graceful shutdown | `BoundServer::run_until(shutdown)` と `Server::shutdown_grace_period` で、Ctrl-C 受信後に in-flight リクエストの完了を待ってから終了する例。 | [graceful-shutdown.md](./graceful-shutdown.md) |
| GraphQL schema wiring | `graphql` feature の配線（`async_graphql::dynamic` による実行時スキーマ構築 + `Server::graphql` への登録 + `POST /graphql` の最小クエリ実行）。 | [graphql-schema.md](./graphql-schema.md) |
| Interceptor extension point | `Interceptor` 拡張点（`intercept` によるリダイレクト返却 + `map_response` によるレスポンス改変）を自作し、`Server::interceptor` で登録する最小例。 | [interceptor.md](./interceptor.md) |
| JwtGate | `fandhe-backend-plugin-jwt` の `JwtPolicy` で検証ポリシーを定義し、`JwtAuthenticator` から `JwtGate` を作る例。 | [jwt-gate.md](./jwt-gate.md) |
| minimal server | `Server` + `Router` を組み合わせた最小構成の HTTP サーバ。 | [minimal-server.md](./minimal-server.md) |
| RequestGate for authorization | `RequestGate` 拡張点で `X-Api-Key` ヘッダの有無だけを見るフェイルクローズな認可ゲートを自作し、`Server::gate` で登録する例。 | [request-gate-auth.md](./request-gate-auth.md) |
| Session cookie and 303 See Other | `SetCookie::session` で安全な既定値のセッション Cookie を作り、`Response::see_other` で POST 後の 303 リダイレクトを組み立てる例。 | [session-cookie-see-other.md](./session-cookie-see-other.md) |
| static file serving | `static` feature の `StaticFilesConfig` + `Server::static_files` で、二層防御のパストラバーサル対策付き静的配信を行う配線例。 | [static-file-serving.md](./static-file-serving.md) |
| streaming response | `Handler::handle_streaming` + `StreamingResponse` / `BodyWriter` で chunked ストリーミング応答を返す最小例。 | [streaming-response.md](./streaming-response.md) |
| WebSocket message handler | `websocket` feature の `WebSocketConfig` による配線例。 | [websocket-handler.md](./websocket-handler.md) |
