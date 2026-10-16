# plugins

| Name | Description | Path |
|------|-------------|------|
| compression | レスポンス圧縮プラグイン。gzip による帯域削減を提供する（イシュー #321）。 | [compression.md](./compression.md) |
| cors | CORS（Cross-Origin Resource Sharing）プラグイン。プリフライト応答の組み立てと… | [cors.md](./cors.md) |
| csrf | CSRF 検査ゲートプラグイン（REQ-17、イシュー #825）。Cookie 認証の画面を守るため… | [csrf.md](./csrf.md) |
| graphql | GraphQL プラグイン実装（TASK-5.1）。パスインターセプト型のプラグイン境界パターンを… | [graphql.md](./graphql.md) |
| hub-wiring | hub 共通配線プラグイン（TASK-9.1 / TASK-9.2）。コアの `RequestGate` 拡張点上に… | [hub-wiring.md](./hub-wiring.md) |
| jwt | 汎用 JWT 検証プラグイン（REQ-16、イシュー #812 系）。`Authorization: Bearer` の JWT を… | [jwt.md](./jwt.md) |
| openapi | OpenAPI ドキュメント生成プラグイン（TASK-3.1、REQ-3【Must】）。実装本体から独立した… | [openapi.md](./openapi.md) |
| static | 静的ファイル配信プラグイン。パストラバーサル対策・`spawn_blocking` I/O を備えた… | [static.md](./static.md) |
| tracing | 可観測性（サンプリング付きトレーシング）プラグイン（TASK-10.1）。REQ-10 の PoC-10 実測を… | [tracing.md](./tracing.md) |
| webrtc-proxy | WebRTC シグナリングプロキシプラグイン（TASK-8.2-2）。別プロセスに切り出した WebRTC… | [webrtc-proxy.md](./webrtc-proxy.md) |
| webrtc | in-process WebRTC プラグイン（TASK-8.1）。SDP Offer/Answer・データチャネル確立を… | [webrtc.md](./webrtc.md) |
| websocket | WebSocket プラグイン（TASK-4.1）。コアの `UpgradeHandler` 拡張点から委譲された接続に… | [websocket.md](./websocket.md) |
