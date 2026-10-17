# plugins

| Name | Description | Path |
|------|-------------|------|
| compression | レスポンス圧縮プラグイン。gzip による帯域削減を提供する（イシュー #321）。 | [compression.md](./compression.md) |
| cors | CORS（Cross-Origin Resource Sharing）プラグイン。プリフライト応答の組み立てと実リクエストへのヘッダ付与を提供する（イシュー #305）。 | [cors.md](./cors.md) |
| csrf | CSRF 検査ゲートプラグイン（REQ-17、イシュー #825）。Cookie 認証の画面（素の `<form method="post">` を受けるハンドラ）を守るため、状態を変える要求の送信元をハンドラ到達前に一律検査する `CsrfGate` を提供する。 | [csrf.md](./csrf.md) |
| graphql | GraphQL プラグイン実装（TASK-5.1）。パスインターセプト型のプラグイン境界パターンを維持したまま、`async-graphql` による実クエリ実行を提供する。 | [graphql.md](./graphql.md) |
| hub-wiring | hub 共通配線プラグイン（TASK-9.1 / TASK-9.2）。コアの `RequestGate` 拡張点上に `TenantGate` を実装し、`org_id` 抽出とテナント境界のフェイルクローズ配線を集約する。 | [hub-wiring.md](./hub-wiring.md) |
| jwt | 汎用 JWT 検証プラグイン（REQ-16、イシュー #812 系）。`Authorization: Bearer` の JWT（RFC 9068 のアクセストークン）を RS256 / ES256 で検証する `RequestGate` 実装 `JwtGate` と、その構成要素（検証ポリシー・JWKS 鍵集合・検証関数・認証器・未知 `kid` 通知口）を提供する。 | [jwt.md](./jwt.md) |
| openapi | OpenAPI ドキュメント生成プラグイン（TASK-3.1、REQ-3【Must】）。実装本体（`crates/routes` 等）から独立した「ドキュメント専用の薄い関数」に `#[utoipa::path(...)]` を付与し `ApiDoc` に集約する。 | [openapi.md](./openapi.md) |
| static | 静的ファイル配信プラグイン。パストラバーサル対策・`spawn_blocking` I/O を備えたディレクトリ配信を提供する（イシュー #318）。 | [static.md](./static.md) |
| tracing | 可観測性（サンプリング付きトレーシング）プラグイン（TASK-10.1）。REQ-10 の PoC-10 実測（サンプリングなしで RPS 最大 63.0% 劣化、非同期 I/O 化のみでも RPS 劣化 31.6%・p95 悪化 61.7%）を踏まえ、`Middleware` 拡張点上で一定割合のみ span/event を記録する。 | [tracing.md](./tracing.md) |
| webrtc-proxy | WebRTC シグナリングプロキシプラグイン（TASK-8.2-2）。別プロセスに切り出した WebRTC サービスへ SDP Offer/Answer を中継し、`webrtc-rs` 系の巨大依存をコア・他プラグインの監査対象から隔離する。 | [webrtc-proxy.md](./webrtc-proxy.md) |
| webrtc | in-process WebRTC プラグイン（TASK-8.1）。SDP Offer/Answer・データチャネル確立を `webrtc-rs` でプロセス内完結させる。REQ-8 の MVP 推奨（別プロセス切り出し、`webrtc-proxy`）とは対照的な高攻撃表面の選択肢であり、クレート境界で完全に分離する。 | [webrtc.md](./webrtc.md) |
| websocket | WebSocket プラグイン（TASK-4.1）。コアの `UpgradeHandler` 拡張点から委譲された接続に対し、RFC 6455 ハンドシェイクの検証・101 応答の送出・`tokio-tungstenite` へのフレーミング委譲を行う。 | [websocket.md](./websocket.md) |
