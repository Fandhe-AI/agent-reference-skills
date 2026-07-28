# core

| Name | Description | Path |
|------|-------------|------|
| Server | 3 拡張点・既定ハンドラを登録するビルダー | [server.md](./server.md) |
| BoundServer | `Server::bind` が返す accept ループ本体 | [bound-server.md](./bound-server.md) |
| Handler | 最終応答を生成する既定ハンドラ拡張点 | [handler.md](./handler.md) |
| Middleware | リクエスト/レスポンス観測専用フック | [middleware.md](./middleware.md) |
| RequestGate | 早期拒否可能な拡張点（フェイルクローズ） | [request-gate.md](./request-gate.md) |
| UpgradeHandler | 長時間接続への委譲判定拡張点 | [upgrade-handler.md](./upgrade-handler.md) |
| StreamingResponse / BodyWriter | chunked ストリーミング送信の opt-in API | [streaming-response.md](./streaming-response.md) |
| Extension Points | 3 拡張点・plugin シームの全体フロー | [extension-points.md](./extension-points.md) |
