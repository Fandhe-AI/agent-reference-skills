<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/overview / last verified: 2026-08-07 -->

# SDK install

Claude API 公式クライアント SDK 7 言語のインストールコマンドと最小初期化スニペット。

## Python

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
    model="claude-opus-5",
)
```

## TypeScript

```bash
npm install @anthropic-ai/sdk
```

```typescript
const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
  model: "claude-opus-5"
});
```

## Java

```kotlin
// Gradle
implementation("com.anthropic:anthropic-java:2.52.0")
```

```java
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.Model;

AnthropicClient client = AnthropicOkHttpClient.fromEnv();

MessageCreateParams params = MessageCreateParams.builder()
  .maxTokens(1024L)
  .addUserMessage("Hello, Claude")
  .model(Model.CLAUDE_OPUS_5)
  .build();

client.messages().create(params);
```

## Go

```bash
go get github.com/anthropics/anthropic-sdk-go
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/anthropics/anthropic-sdk-go"
	"github.com/anthropics/anthropic-sdk-go/option"
)

func main() {
	client := anthropic.NewClient(
		option.WithAPIKey("my-anthropic-api-key"),
	)
	message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
		MaxTokens: 1024,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock("What is a quaternion?")),
		},
		Model: anthropic.ModelClaudeOpus5,
	})
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(message.Content)
}
```

## Ruby

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
```

## C#

```bash
dotnet add package Anthropic
```

```csharp
using Anthropic;
using Anthropic.Models.Messages;

AnthropicClient client = new();

MessageCreateParams parameters = new()
{
    MaxTokens = 1024,
    Messages = [ new() { Role = Role.User, Content = "Hello, Claude" } ],
    Model = Model.ClaudeOpus5,
};

var message = await client.Messages.Create(parameters);
```

## PHP

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
```

## Notes

- Java / C#: API key is read from `ANTHROPIC_API_KEY` (or `AuthToken`/`ANTHROPIC_AUTH_TOKEN` as an alternative); Java also accepts the `anthropic.apiKey` system property.
- Go: `option.WithAPIKey` defaults to `ANTHROPIC_API_KEY` when omitted.
- Python / TypeScript / Ruby: the constructor shown above reads `ANTHROPIC_API_KEY` explicitly from the environment (`os.environ`, `process.env`, `ENV`).
- C# and PHP SDKs are currently in beta; APIs may change between versions.
