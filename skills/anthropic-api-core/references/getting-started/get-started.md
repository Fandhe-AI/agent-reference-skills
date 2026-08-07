<!-- source: https://platform.claude.com/docs/en/get-started / last verified: 2026-08-07 -->

# Get started with Claude

Make your first API call to Claude and build a simple web search assistant.

## Signature / Usage

```bash
export ANTHROPIC_API_KEY="your-api-key-here"

curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1000,
    "messages": [
      {"role": "user", "content": "What should I search for to find the latest developments in renewable energy?"}
    ]
  }'
```

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY automatically

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1000,
    messages=[{"role": "user", "content": "What should I search for to find the latest developments in renewable energy?"}],
)

for block in message.content:
    if block.type == "text":
        print(block.text)
```

## Options / Props

| SDK / tool | Install | Notes |
|---|---|---|
| cURL | n/a | reads key from `$ANTHROPIC_API_KEY` |
| CLI (`ant`) | `brew install anthropics/tap/ant` | `ant auth login` for OAuth, or set `ANTHROPIC_API_KEY` (takes precedence) |
| Python | `pip install anthropic` | `anthropic.Anthropic()` |
| TypeScript | `npm install @anthropic-ai/sdk` | `new Anthropic()` |
| C# | `dotnet add package Anthropic` | `new AnthropicClient()` |
| Go | `go get github.com/anthropics/anthropic-sdk-go` | `anthropic.NewClient()` |
| Java | Gradle/Maven `com.anthropic:anthropic-java` | JDK 25+ required, `AnthropicOkHttpClient.fromEnv()` |
| PHP | `composer require anthropic-ai/sdk guzzlehttp/guzzle:^7` | `new Client()` |
| Ruby | `bundle add anthropic` | `Anthropic::Client.new` |

## Notes

- Prerequisites: a Claude Console account and an API key.
- For non-interactive CLI auth (CI), see CLI authentication options; on a remote host without a browser, pass `--no-browser`.

## Related

- [intro](./intro.md)
- [get-api-key](./get-api-key.md)
