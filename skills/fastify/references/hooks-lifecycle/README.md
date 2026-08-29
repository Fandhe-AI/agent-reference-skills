# hooks-lifecycle

対象 Fastify v5.12.1。

ここの hooks は Fastify のリクエスト／アプリケーションライフサイクルフック。`lefthook`（git hooks）・`react-hook-form`（React hooks）・`anthropic-claude-code-extend`（Claude Code hooks）とは別物。

| Name | Description | Path |
|------|-------------|------|
| Lifecycle / Reply Lifecycle / Shutdown Lifecycle | 内部リクエスト処理フローの全体図とリプライ／シャットダウンの流れ | [lifecycle.md](./lifecycle.md) |
| Request/Reply Hooks | onRequest, preParsing, preValidation, preHandler, preSerialization, onError, onSend, onResponse, onTimeout, onRequestAbort の10フック | [request-hooks.md](./request-hooks.md) |
| Application Hooks | onReady, onListen, onClose, preClose, onRoute, onRegister | [application-hooks.md](./application-hooks.md) |
| Scope | フックのカプセル化スコープ（`this` バインディング） | [hook-scope.md](./hook-scope.md) |
| Route Level Hooks | `fastify.route()` 内で宣言するルート単位フック、カスタムプロパティ注入 | [route-level-hooks.md](./route-level-hooks.md) |
| Diagnostics Channel Hooks | `node:diagnostics_channel` による初期化・トレーシングイベント | [diagnostics-channel-hooks.md](./diagnostics-channel-hooks.md) |
