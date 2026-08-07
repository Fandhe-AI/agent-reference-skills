<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/java / last verified: 2026-08-07 -->

# Java SDK

Install and configure the Anthropic Java SDK with builder patterns and async support.

## Signature / Usage

```kotlin
// Gradle
implementation("com.anthropic:anthropic-java:2.52.0")
```

```java
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.messages.Message;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.Model;

AnthropicClient client = AnthropicOkHttpClient.fromEnv();

MessageCreateParams params = MessageCreateParams.builder()
  .maxTokens(1024L)
  .addUserMessage("Hello, Claude")
  .model(Model.CLAUDE_OPUS_5)
  .build();

Message message = client.messages().create(params);
```

Async client and streaming:

```java
CompletableFuture<Message> message = client.async().messages().create(params);

try (StreamResponse<RawMessageStreamEvent> streamResponse = client.messages().createStreaming(params)) {
    streamResponse.stream().forEach(chunk -> IO.println(chunk));
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `apiKey` / `ANTHROPIC_API_KEY` | string | API key (setter / env var / `anthropic.apiKey` system property) |
| `authToken` / `ANTHROPIC_AUTH_TOKEN` | string | Auth token alternative to API key |
| `baseUrl` / `ANTHROPIC_BASE_URL` | string | Required, defaults to `https://api.anthropic.com` |
| `maxRetries` | int | Retry count (default 2) |
| `timeout` | `Duration` | Request timeout; dynamic scaling with `maxTokens` for streaming |
| `streamHandlerExecutor` | `Executor` | Thread pool for async streaming callbacks |
| `responseValidation` | boolean | Validate response shape upfront via `.validate()` or client-level config |

Status code mapping: 400 `BadRequestException`, 401 `UnauthorizedException`, 403 `PermissionDeniedException`, 404 `NotFoundException`, 422 `UnprocessableEntityException`, 429 `RateLimitException`, 5xx `InternalServerException`, others `UnexpectedStatusCodeException`.

## Notes

- Java 8+ required; code examples in the docs use JDK 25 compact source files (`void main()`, `IO.println()`).
- Don't create more than one client per application — each has its own connection and thread pools; use `withOptions()` for temporary per-call overrides.
- Tool classes can be derived automatically from a Java class via `@JsonClassDescription` / `@JsonPropertyDescription`; tool names are camelCase-to-snake_case converted (`MyJSONParser` → `my_json_parser`).
- `MessageAccumulator` / `BetaMessageAccumulator` reconstruct a full `Message` from a stream of events via `Stream.peek()`.
- Message Batches under `client.messages().batches()`; auto-pagination via `.autoPager()`.
- The SDK ships three artifacts: `anthropic-java-core` (no OkHttp dependency), `anthropic-java-client-okhttp`, and `anthropic-java` (both combined), allowing HTTP client replacement.
- Platform integrations are separate Maven artifacts: `anthropic-java-vertex`, `anthropic-java-bedrock` (`BedrockMantleBackend` for new projects, `BedrockBackend` legacy), `anthropic-java-aws` (beta), `anthropic-java-foundry`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Go SDK](./sdk-go.md)
- [SDK middleware](./middleware.md)
