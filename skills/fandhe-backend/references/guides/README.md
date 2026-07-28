# guides

| Name | Description | Path |
|------|-------------|------|
| tutorial | 最小サーバから `Middleware` 実装、feature 有効化までの段階的チュートリアル | [tutorial.md](./tutorial.md) |
| feature-samples | websocket / graphql / webrtc 系 / tracing / openapi / cors / compression / static / hub-wiring の feature 別サンプル | [feature-samples.md](./feature-samples.md) |
| extension-points | 3 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate`）の契約と自作手順 | [extension-points.md](./extension-points.md) |
| streaming | chunked ストリーミング送信（`handle_streaming` / `StreamingResponse` / `BodyWriter`）の使い方 | [streaming.md](./streaming.md) |
| graceful-shutdown | `BoundServer::run_until` による安全な停止手順と grace 上限設定 | [graceful-shutdown.md](./graceful-shutdown.md) |
