<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/php / last verified: 2026-08-07 -->

# PHP SDK

Install and configure the Anthropic PHP SDK with value objects and builder patterns.

## Signature / Usage

```bash
composer require "anthropic-ai/sdk" "guzzlehttp/guzzle:^7"
```

```php
$client = new Client();

$message = $client->messages->create(
  maxTokens: 1024,
  messages: [['role' => 'user', 'content' => 'Hello, Claude']],
  model: 'claude-opus-5',
);

$textBlock = array_find($message->content, static fn ($block): bool => $block->type === 'text');
echo $textBlock->text;
```

Streaming:

```php
$stream = $client->messages->createStream(
  maxTokens: 1024,
  messages: [['role' => 'user', 'content' => 'Hello, Claude']],
  model: 'claude-opus-5',
);

foreach ($stream as $event) {
  echo $event->type . PHP_EOL;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxRetries` | int (via `RequestOptions::with`) | Retry count (default 2) |
| `streamingTransporter` | PSR-18 client (via `RequestOptions::with`) | Streaming-capable HTTP client override |
| `extraQueryParams` / `extraBodyParams` / `extraHeaders` | array (via `RequestOptions::with`) | Undocumented request additions |

Error mapping: HTTP 400 `BadRequestException`, 401 `AuthenticationException`, 403 `PermissionDeniedException`, 404 `NotFoundException`, 409 `ConflictException`, 422 `UnprocessableEntityException`, 429 `RateLimitException`, >=500 `InternalServerException`, other `APIStatusException`, timeout `APITimeoutException`, network `APIConnectionException`.

## Notes

- Currently in beta; APIs might change between versions. Requires PHP 8.1.0+.
- Uses PSR-18 for HTTP and auto-discovers any installed PSR-18 client; Guzzle is recommended because the SDK configures it for streaming with no additional setup. Without a streaming-capable client, `createStream()` yields all events at once instead of incrementally.
- Uses named parameters for optional arguments; value objects are constructed via static `with()` (recommended) or `with...` builder methods.
- Pagination: `$page->getItems()` for the current page, `$page->pagingEachItem()` to auto-fetch subsequent pages.
- Platform integrations: `Anthropic\Vertex\Client`, `Anthropic\Bedrock\MantleClient` (new projects) / `Anthropic\Bedrock\Client` (legacy), `Anthropic\Aws\Client` (beta, needs `aws/aws-sdk-php`), `Anthropic\Foundry\Client`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Ruby SDK](./sdk-ruby.md)
- [SDK middleware](./middleware.md)
