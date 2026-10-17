<!-- source: https://platform.claude.com/docs/en/manage-claude/opentelemetry/sdk / last verified: 2026-10-17 -->

# Set up OpenTelemetry with the Claude SDK

The Claude SDK emits a span for each request it sends and each tool the tool runner runs. Your application's tracer provider and OTLP exporter send them to your observability platform, nested in your own traces.

## Signature / Usage

Install, register a tracer provider before the first traced call, then call the SDK (Python, console exporter):

```python
from anthropic import Anthropic
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

# Register a tracer provider that prints each span to the console.
provider = TracerProvider()
provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)

client = Anthropic()

message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(message.content)
```

Install commands: Python `pip install --upgrade anthropic` (+ `pip install opentelemetry-sdk`), TypeScript `npm install @anthropic-ai/sdk@latest` (+ `@opentelemetry/sdk-trace-node`), C# `dotnet add package Anthropic` (+ `OpenTelemetry.Exporter.Console`), Go `go get github.com/anthropics/anthropic-sdk-go@latest`, Java `com.anthropic:anthropic-java:2.73.0` or later, PHP `composer require "anthropic-ai/sdk" "guzzlehttp/guzzle:^7"`, Ruby `bundle add anthropic`.

## Options / Props

Option names are shown for Python; typescript / java / php use camelCase (`traces.contentMode`), csharp PascalCase (`Traces.ContentMode`), go uses `option.With...()`.

| Name | Type | Description |
|------|------|-------------|
| `traces.content_mode` (env `ANTHROPIC_OPEN_TELEMETRY_TRACES_CONTENT_MODE=content`) | string | Include prompts and responses in spans. Default `metadata_only` |
| `traces.max_content_bytes` (env `ANTHROPIC_OPEN_TELEMETRY_TRACES_MAX_CONTENT_BYTES`) | int | Content limit of each span. Default 0.75 MB |
| `conversation_id` | string | Link several calls into one conversation; written to `gen_ai.conversation.id`. Exported in both content modes, so no personal data or secrets. Default none |
| `tracer_provider` (csharp: `AddSource("com.anthropic.sdk.csharp")`; go: `option.WithTracerProvider()`) | object | Tracer provider that receives the SDK's spans. Default: the one you registered |
| `propagation` (env `ANTHROPIC_OPEN_TELEMETRY_PROPAGATION=false`; go: `option.WithOpenTelemetryPropagation()`) | bool | Stop sending trace context and baggage headers. Spans are still emitted. Python, TypeScript, Go, Java, Ruby, PHP only. Default on |
| `open_telemetry` (env `ANTHROPIC_OPEN_TELEMETRY=false`; go: `option.WithoutOpenTelemetry()`) | bool / object | Turn spans off for one client. Default on |

```python
# Turn spans off for one client.
quiet_client = Anthropic(open_telemetry=False)

# Set a conversation ID with with_options(), which returns a copy of the client.
message = client.with_options(
    open_telemetry={**client.open_telemetry, "conversation_id": "conv_42"}
).messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
```

## Notes

- Beta: SDK options and the span schema can change in breaking ways (a new SDK version can rename a span, attribute, option, or environment variable). Pin the SDK version.
- Passing `open_telemetry` to the client overrides that option's environment variables as a whole, including nested keys; omitted nested keys use their defaults even if the environment variable is set.
- Go, Java, and PHP do not register a propagator when the OpenTelemetry SDK is built in code; register the W3C trace context propagator. The SDK writes `traceparent` with your application's propagator; without it requests carry no `traceparent`. To send trace context without baggage, register only the W3C trace context propagator.
- C#: the SDK emits from source `com.anthropic.sdk.csharp`; use `com.anthropic.sdk.csharp*` to include cloud platform clients. Java: system properties `anthropic.openTelemetry`, `anthropic.openTelemetryTracesContentMode`, `anthropic.openTelemetryTracesMaxContentBytes` take precedence over environment variables, and a client reads environment variables only when built with `fromEnv()`.
- Replace the console exporter with an OTLP exporter for your platform (see the OpenTelemetry docs for each language's exporters).
- Streams: a stream's `anthropic.messages.create` span ends when the code has read the whole stream or closed it, so close a stream you stop reading early. In content mode the span has the response only when you read via `messages.stream()` (go `Messages.NewStreaming()`, java `messages().createStreaming()`, csharp `Messages.CreateStreaming()`, php `messages->createStream()`). Spans started while reading a stream are siblings of the SDK span; start your own span around the call and read loop to group them.
- Managed Agents self-hosted sandbox: the environment worker in the Python, TypeScript, and Go SDKs emits a span per tool and per request, grouped under one `anthropic.environment.work` span per work item. Set up SDK tracing in the worker process and allow network traffic from the sandbox to your platform or Collector.
- TypeScript with `@opentelemetry/instrumentation-undici` (included in `@opentelemetry/auto-instrumentations-node`): set `propagation: false`, otherwise a bug in that package adds a second `traceparent` header and invalidates the trace context.
- MCP tools: the SDK's tool span is current during an MCP tool call. Python `mcp` 2.0+ and C# `ModelContextProtocol` forward trace context in `_meta`; TypeScript, Go, Java, Ruby, and PHP MCP SDKs do not on their own.
- Troubleshooting: Java needs `opentelemetry-api` 1.57.0 or later; each request can appear twice because the SDK span (CLIENT) and API span (SERVER) share a name, so use span kind or `service.name`; if another library also traces the SDK, turn off one of the two.

## Related

- [opentelemetry.md](./opentelemetry.md)
- [opentelemetry-api.md](./opentelemetry-api.md)
- [spans.md](./spans.md)
