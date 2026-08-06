# guides

| Name | Description | Path |
|------|-------------|------|
| 拡張点自作ガイド | 4 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）の契約と自作手順 | [extension-points.md](./extension-points.md) |
| feature 構成別サンプルガイド | websocket / graphql / webrtc 系 / tracing / openapi / cors / compression / static / hub-wiring の feature 別サンプル | [feature-samples.md](./feature-samples.md) |
| graceful shutdown | `BoundServer::run_until` による安全な停止。grace 上限・listener rebind（v0.3.0） | [graceful-shutdown.md](./graceful-shutdown.md) |
| ガイドの読み方 | 対象読者別ガイド構成。Getting Started から読み始める推奨パス | [reading.md](./reading.md) |
| レスポンスストリーミング | chunked ストリーミング送信（`handle_streaming` / `StreamingResponse` / `BodyWriter`）の使い方 | [streaming.md](./streaming.md) |
| チュートリアル | 最小サーバから `Middleware` 実装、feature 有効化までの段階的チュートリアル | [tutorial.md](./tutorial.md) |
