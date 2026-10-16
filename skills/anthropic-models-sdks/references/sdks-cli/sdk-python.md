<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/python / last verified: 2026-10-17 -->

# Python SDK

Install and configure the Anthropic Python SDK with sync and async client support.

## Signature / Usage

```bash
pip install anthropic
# Extras: pip install "anthropic[bedrock]" / "[vertex]" / "[aws]" / "[aiohttp]"
```

```python
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

message = client.messages.create(
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
    model="claude-opus-5-5",
)
for block in message.content:
    if block.type == "text":
        print(block.text)
```

Async:

```python
import asyncio
from anthropic import AsyncAnthropic

client = AsyncAnthropic()

async def main() -> None:
    message = await client.messages.create(
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello, Claude"}],
        model="claude-opus-5-5",
    )
    print(message.content)

asyncio.run(main())
```

Streaming with helpers:

```python
async with client.messages.stream(
    max_tokens=1024,
    messages=[{"role": "user", "content": "Say hello there!"}],
    model="claude-opus-5-5",
) as stream:
    async for text in stream.text_stream:
        print(text, end="", flush=True)
    message = await stream.get_final_message()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_retries` | int | Retry count for connection/408/409/429/5xx errors (default 2) |
| `timeout` | float \| `httpx2.Timeout` | Request timeout (default 10 minutes) |
| `http_client` | `DefaultHttpxClient` / `DefaultAsyncHttpxClient` / `DefaultAioHttpClient` | Custom HTTP transport, proxies, TLS (must be an `httpx2` client) |
| `default_headers` | dict | Override default headers, e.g. `anthropic-version` |

Error codes: 400 `BadRequestError`, 401 `AuthenticationError`, 403 `PermissionDeniedError`, 404 `NotFoundError`, 409 `ConflictError`, 422 `UnprocessableEntityError`, 429 `RateLimitError`, >=500 `InternalServerError`, N/A `APIConnectionError`.

## Notes

- Python 3.10 or later is required. If upgrading from a 0.x release, see the v1 migration guide (`MIGRATION.md` in `anthropics/anthropic-sdk-python`) for the list of breaking changes.
- HTTP backend: the SDK sends requests with `httpx2` (an API-compatible fork of `httpx`), not `httpx`. `timeout` accepts a float or an `httpx2.Timeout`. For a custom client, use `DefaultHttpxClient` / `DefaultAsyncHttpxClient` instead of raw `httpx2.Client` / `httpx2.AsyncClient` to preserve default timeouts and connection limits. Passing a client from the separate `httpx` package raises a `TypeError`.
- Tools that patch `httpx` itself (OpenTelemetry `HTTPXClientInstrumentor`, Sentry's `httpx` integration, `respx`, `pytest-httpx`) do not see the SDK's requests by default. Call `httpx2.alias_httpx()` once at startup, before anything imports `httpx`; this makes `import httpx` resolve to `httpx2` for the whole process.
- v1.0 and later remove the `temperature`, `top_p`, and `top_k` parameters; passing them raises a `TypeError` (the API itself returns 400 for non-default values on Claude 4.7 and later models).
- If your API key is a personal or service account key with access to multiple workspaces, set the workspace ID in the `anthropic-workspace-id` request header.
- Requests are TypedDicts, responses are Pydantic models (`.to_json()`, `.to_dict()`).
- Tool helpers: `@beta_tool` decorator generates a tool schema from a function signature/docstring; `client.beta.messages.tool_runner(...)` auto-executes tool calls.
- Message Batches under `client.messages.batches` (`.create()`, `.results()`).
- File uploads accept `PathLike`, `(filename, content, content_type)` tuples, or `BinaryIO`.
- All responses expose a public `_request_id` property (from the `request-id` header).
- Auto-pagination via `for`/`async for` over list methods, or manual `.has_next_page()` / `.get_next_page()`.
- Platform clients in the base package: `AnthropicVertex`, `AnthropicBedrockMantle` (new projects) / `AnthropicBedrock` (legacy `bedrock-runtime`), `AnthropicAWS` (beta, needs `workspace_id`), `AnthropicFoundry`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [TypeScript SDK](./sdk-typescript.md)
- [SDK middleware](./middleware.md)
