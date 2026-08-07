<!-- source: https://code.claude.com/docs/en/agent-sdk/hosting / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/agent-sdk/observability / last verified: 2026-08-07 -->

# runtime

本番環境でのホスティング設定・テレメトリー有効化・コンテナ実行に関わる環境変数とコマンド。

## OpenTelemetry テレメトリーの有効化（コンテナ / オーケストレーター）

```bash
CLAUDE_CODE_ENABLE_TELEMETRY=1
CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp
OTEL_LOGS_EXPORTER=otlp
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_ENDPOINT=http://collector.example.com:4318
```

`CLAUDE_CODE_ENABLE_TELEMETRY=1` と各シグナルの exporter（`OTEL_TRACES_EXPORTER` 等）を設定するまでテレメトリーは無効。`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` は trace を出力する場合のみ必須。これらをコンテナ・Kubernetes マニフェスト・シェルプロファイルで export すれば、SDK 側の `options.env` 指定なしで全 `query()` 呼び出しに反映される。

## Exporter 認証ヘッダーの追加

```bash
OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
```

## Exporter エラー診断の有効化

```bash
CLAUDE_CODE_OTEL_DIAG_STDERR=1
```

Claude Code v2.1.179 以上が必要。exporter がエンドポイントに到達できない場合でもエージェントは実行を継続し、デフォルトではエラーが表面化しない。この変数と SDK の `stderr` コールバック / オプションを併用して診断する。

## テレメトリーのフラッシュ間隔短縮（短命プロセス向け）

```bash
OTEL_METRIC_EXPORT_INTERVAL=1000
OTEL_LOGS_EXPORT_INTERVAL=1000
OTEL_TRACES_EXPORT_INTERVAL=1000
```

デフォルトでは metrics は60秒毎、traces/logs は5秒毎にバッチ export される。短命プロセスではこの間隔を短くして、プロセス強制終了時のバッファ消失を減らす。

## サービス名・リソース属性のタグ付け

```bash
OTEL_SERVICE_NAME=support-triage-agent
OTEL_RESOURCE_ATTRIBUTES=service.version=1.4.0,deployment.environment=production
```

複数エージェントが同一 collector に送信する場合に、エージェント単位でフィルタするための識別子。

## センシティブデータの opt-in（プロンプト・ツール内容の記録）

> **警告**: 以下はプロンプトやツール入出力の内容を外部にエクスポートする設定。観測パイプラインがその内容を保存してよいと承認済みの場合のみ有効化する。

```bash
OTEL_LOG_USER_PROMPTS=1
OTEL_LOG_TOOL_DETAILS=1
OTEL_LOG_TOOL_CONTENT=1
CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH=60000
OTEL_LOG_RAW_API_BODIES=1
```

`OTEL_LOG_RAW_API_BODIES` は `1`（60KB でトランケートしてインライン出力）または `file:<dir>`（ディスクに非トランケートで出力し `body_ref` パスを付与）を指定する。この変数の有効化は上記3変数が公開する内容すべてへの同意を含む。

## 分散トレースのリンク（トレースコンテキスト伝播）

```bash
TRACEPARENT="00-<trace-id>-<span-id>-01"
TRACESTATE="..."
```

SDK は `query()` 呼び出し元アプリケーションでアクティブな OpenTelemetry span があれば、これらの変数をサブプロセス環境に自動注入する。`options.env` で明示的に設定した場合は自動注入がスキップされる。

## Docker / Kubernetes マニフェストの取得

```bash
git clone https://github.com/anthropics/claude-cookbooks
```

デプロイ可能な Dockerfile と Kubernetes マニフェストは `claude_agent_sdk/hosting` ディレクトリ（`anthropics/claude-cookbooks` リポジトリ）で配布されている。本ページのホスティング解説はセルフホスト向けの一般手順であり、具体的なマニフェスト内容は上記リポジトリを参照する。
