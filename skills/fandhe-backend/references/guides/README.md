# guides

| Name | Description | Path |
|------|-------------|------|
| extension-points | 4 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）の契約と自作手順 | [extension-points.md](./extension-points.md) |
| feature-samples | websocket / graphql / webrtc 系 / tracing / openapi / cors / compression / static / hub-wiring の feature 別サンプル | [feature-samples.md](./feature-samples.md) |
| graceful-shutdown | `BoundServer::run_until` による安全な停止手順と grace 上限設定 | [graceful-shutdown.md](./graceful-shutdown.md) |
| reading | 対象読者別ガイド構成。Getting Started から読み始める推奨パス | [reading.md](./reading.md) |
| streaming | chunked ストリーミング送信（`handle_streaming` / `StreamingResponse` / `BodyWriter`）の使い方 | [streaming.md](./streaming.md) |
| tutorial | 最小サーバから `Middleware` 実装、feature 有効化までの段階的チュートリアル | [tutorial.md](./tutorial.md) |
