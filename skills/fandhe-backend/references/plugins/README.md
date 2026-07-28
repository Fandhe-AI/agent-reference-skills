# plugins

| Name | Description | Path |
|------|-------------|------|
| cors | CORS プリフライト・実リクエストヘッダ付与（レスポンス後処理型） | [cors.md](./cors.md) |
| compression | レスポンス gzip 圧縮（レスポンス後処理型、CORS の後に適用） | [compression.md](./compression.md) |
| static | 静的ファイル配信（パスインターセプト型、spawn_blocking I/O） | [static.md](./static.md) |
| tracing | サンプリング付き可観測性トレーシング（Middleware 型） | [tracing.md](./tracing.md) |
| websocket | WebSocket アップグレード・フレーミング（UpgradeHandler 型） | [websocket.md](./websocket.md) |
| graphql | GraphQL クエリ実行（パスインターセプト型、async-graphql） | [graphql.md](./graphql.md) |
| openapi | OpenAPI ドキュメント生成・配信（拡張点非該当、ビルド時生成） | [openapi.md](./openapi.md) |
| webrtc | in-process WebRTC（パスインターセプト型、webrtc-rs） | [webrtc.md](./webrtc.md) |
| webrtc-proxy | WebRTC シグナリングプロキシ（パスインターセプト型、別プロセス切り出し） | [webrtc-proxy.md](./webrtc-proxy.md) |
| hub-wiring | hub 共通配線（RequestGate 型、依存逆転、RS256 + JWKS） | [hub-wiring.md](./hub-wiring.md) |
