# core

| Name | Description | Path |
|------|-------------|------|
| BoundServer | `Server::bind` が返す accept ループ本体 | [bound-server.md](./bound-server.md) |
| Extension Points | 4 拡張点・plugin シームの全体フロー | [extension-points.md](./extension-points.md) |
| Handler | 最終応答を生成する既定ハンドラ拡張点 | [handler.md](./handler.md) |
| Interceptor | リクエスト差し替え・レスポンス書き換えフック（v0.2.0） | [interceptor.md](./interceptor.md) |
| Middleware | リクエスト/レスポンス観測専用フック | [middleware.md](./middleware.md) |
| RequestGate | 早期拒否可能な拡張点（フェイルクローズ） | [request-gate.md](./request-gate.md) |
| Server | 4 拡張点・既定ハンドラを登録するビルダー | [server.md](./server.md) |
| StreamingResponse / BodyWriter | chunked ストリーミング送信の opt-in API | [streaming-response.md](./streaming-response.md) |
| UpgradeHandler | 長時間接続への委譲判定拡張点 | [upgrade-handler.md](./upgrade-handler.md) |
