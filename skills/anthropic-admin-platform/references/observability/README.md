# observability

| Name | Description | Path |
|------|-------------|------|
| Set up OpenTelemetry with the Claude API | Console（または Admin API）で送信先を追加し、Messages API と Managed Agents の span を OTLP/HTTP エンドポイントへ送る | [opentelemetry-api.md](./opentelemetry-api.md) |
| Set up OpenTelemetry with the Claude SDK | SDK が送信するリクエストと tool runner のツール実行の span を、アプリ側の tracer provider と OTLP exporter で送る | [opentelemetry-sdk.md](./opentelemetry-sdk.md) |
| OpenTelemetry for the Claude API (beta) | Claude API と SDK による Messages API・ツール・Managed Agents のトレース（ベータ、content mode を含む） | [opentelemetry.md](./opentelemetry.md) |
| OpenTelemetry span reference | Claude API と SDK が出力する span 名と属性の一覧（gen_ai.* 規約に準拠、開発中） | [spans.md](./spans.md) |
