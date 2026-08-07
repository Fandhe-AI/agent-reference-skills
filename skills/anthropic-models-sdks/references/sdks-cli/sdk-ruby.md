<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/ruby / last verified: 2026-08-07 -->

# Ruby SDK

Install and configure the Anthropic Ruby SDK with Sorbet types, streaming helpers, and connection pooling.

## Signature / Usage

```bash
bundle add anthropic
```

```ruby
anthropic = Anthropic::Client.new(
  api_key: ENV["ANTHROPIC_API_KEY"]
)

message = anthropic.messages.create(
  max_tokens: 1024,
  messages: [{role: "user", content: "Hello, Claude"}],
  model: :"claude-opus-5"
)

message.content.each do |block|
  puts block.text if block.type == :text
end
```

Streaming:

```ruby
stream = anthropic.messages.stream(
  max_tokens: 1024,
  messages: [{role: :user, content: "Say hello there!"}],
  model: :"claude-opus-5"
)
stream.text.each { |text| print(text) }
```

Tool calling:

```ruby
class Calculator < Anthropic::BaseTool
  input_schema CalculatorInput
  def call(expr)
    expr.lhs.public_send(expr.operator, expr.rhs)
  end
end

anthropic.beta.messages.tool_runner(
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{role: "user", content: "What's 15 * 7?"}],
  tools: [Calculator.new]
).each_message { |message| puts message.content }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_retries` | int | Retry count (default 2) |
| `timeout` | int | Timeout in seconds (default 10 minutes / 600) |
| `request_options` | hash | Per-request overrides (`max_retries`, `timeout`, `extra_query`, `extra_body`, `extra_headers`) |

Error mapping: HTTP 400 `BadRequestError`, 401 `AuthenticationError`, 403 `PermissionDeniedError`, 404 `NotFoundError`, 409 `ConflictError`, 422 `UnprocessableEntityError`, 429 `RateLimitError`, >=500 `InternalServerError`, other `APIStatusError`, timeout `APITimeoutError`, network `APIConnectionError`.

## Notes

- Ruby 3.2.0+ required. Uses `net/http` as HTTP transport with connection pooling via the `connection_pool` gem (default pool size 99 per client).
- No dependency on `sorbet-runtime`; enums are "tagged symbols" rather than `T::Enum`, and enum params accept either the constant or its literal symbol value.
- All parameter/response objects inherit from `Anthropic::Internal::Type::BaseModel` (`obj[:prop]` access, structural equality, `#to_h`, `#to_json`, `#to_yaml`).
- `Anthropic::Client` instances are threadsafe but only fork-safe with no in-flight requests.
- File uploads accept raw contents, `Pathname`, `StringIO`, or `Anthropic::FilePart`.
- Auto-paginating iterators via `#auto_paging_each`, or manual `#next_page?` / `#next_page`.
- Platform integrations: `Anthropic::VertexClient` (requires `googleauth`), `Anthropic::BedrockMantleClient` / `Anthropic::BedrockClient` (legacy), `Anthropic::AWSClient` (beta, part of main gem); Foundry is not currently supported.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [PHP SDK](./sdk-php.md)
- [SDK middleware](./middleware.md)
