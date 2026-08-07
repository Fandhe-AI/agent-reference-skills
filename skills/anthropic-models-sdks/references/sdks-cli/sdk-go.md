<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/go / last verified: 2026-08-07 -->

# Go SDK

Install and configure the Anthropic Go SDK with context-based cancellation and functional options.

## Signature / Usage

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
	for _, block := range message.Content {
		if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
			fmt.Println(textBlock.Text)
		}
	}
}
```

Streaming:

```go
stream := client.Messages.NewStreaming(context.TODO(), anthropic.MessageNewParams{...})
message := anthropic.Message{}
for stream.Next() {
	event := stream.Current()
	_ = message.Accumulate(event)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `option.WithAPIKey` | RequestOption | Set the API key (defaults to `ANTHROPIC_API_KEY`) |
| `option.WithMaxRetries` | RequestOption | Retry count (default 2) |
| `option.WithRequestTimeout` | RequestOption | Per-retry timeout |
| `option.WithMiddleware` | RequestOption | Register request/response middleware |
| `option.WithResponseInto` | RequestOption | Capture the raw `*http.Response` |
| `option.WithHeader` | RequestOption | Add/override an HTTP header |

## Notes

- Go 1.23+ required (Go 1.24+ `omitzero` JSON semantics used for request fields). Required primitive fields serialize even as zero values; optional fields use `param.Opt[T]` (constructors like `anthropic.String(...)`, `anthropic.Int(...)`).
- Request unions use `Of`-prefixed struct fields (only one non-zero); response unions are flattened structs with `.AsAny()` / `.AsFooVariant()` to switch on the concrete type.
- Response structs carry a `.JSON` metadata field; use `.Valid()` to distinguish present vs. absent/null values, and `.JSON.ExtraFields` for undocumented properties.
- Errors surface as `*anthropic.Error` (has `StatusCode`, `RequestID`, `DumpRequest`/`DumpResponse`); use `errors.As` to unwrap.
- Non-streaming Messages requests time out after 10 minutes by default via context; other requests have no default timeout. Context timeout does not restart on retry — use `option.WithRequestTimeout()` for per-retry limits.
- Pagination via `.ListAutoPaging()` iterators or manual `.List()` + `.GetNextPage()`.
- File uploads use `io.Reader`, typically wrapped with `anthropic.File(reader, filename, contentType)`.
- Platform integrations: `vertex` (Google Cloud), `bedrock` (Mantle vs `bedrock-runtime`), `aws` (imported as `anthropicaws` to avoid collision, beta); Foundry is not currently supported.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Java SDK](./sdk-java.md)
- [SDK middleware](./middleware.md)
