# guides

| Name | Description | Path |
|------|-------------|------|
| DPoP 結合トークンの検証（dpop） | RFC 9449 DPoP で結合されたアクセストークンの検証。`dpop` feature（opt-in）の設定と配線 | [dpop.md](./dpop.md) |
| 拡張点自作ガイド | 4 拡張点（`Middleware` / `UpgradeHandler` / `RequestGate` / `Interceptor`）の契約と自作手順 | [extension-points.md](./extension-points.md) |
| feature 構成別サンプルガイド | websocket / graphql / webrtc 系 / tracing / openapi / cors / compression / static / hub-wiring の feature 別サンプル | [feature-samples.md](./feature-samples.md) |
| graceful shutdown | `BoundServer::run_until` による安全な停止。grace 上限・listener rebind（v0.3.0） | [graceful-shutdown.md](./graceful-shutdown.md) |
| JWKS の取り直し（jwks-refresh） | `SharedKeySet` を定期取得・未知 `kid` で更新する非同期タスク。`jwks-refresh` feature（opt-in） | [jwks-refresh.md](./jwks-refresh.md) |
| ガイドの読み方 | 対象読者別ガイド構成。Getting Started から読み始める推奨パス | [reading.md](./reading.md) |
| レスポンスストリーミング | chunked ストリーミング送信（`handle_streaming` / `StreamingResponse` / `BodyWriter`）の使い方 | [streaming.md](./streaming.md) |
| チュートリアル | 最小サーバから `Middleware` 実装、feature 有効化までの段階的チュートリアル | [tutorial.md](./tutorial.md) |
| ゲートの検証結果を WebSocket で使う | ゲートの検証結果（`extensions`）を WebSocket の upgrade・ハンドラから読む方法 | [ws-gate-extensions.md](./ws-gate-extensions.md) |
