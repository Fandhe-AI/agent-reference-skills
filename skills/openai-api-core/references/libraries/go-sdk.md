# Go SDK

OpenAI API helper for Go, currently in beta. Import path `github.com/openai/openai-go/v3`.

## Signature / Usage

```go
import (
	"github.com/openai/openai-go/v3" // imported as openai
)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()

	resp, err := client.Responses.New(context.TODO(), responses.ResponseNewParams{
		Model: "gpt-5.6",
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Say this is a test")},
	})
	if err != nil {
		panic(err.Error())
	}

	fmt.Println(resp.OutputText())
}
```

## Notes

- `openai.NewClient()` reads `OPENAI_API_KEY` from the environment by default.
- Request bodies use typed param unions (e.g. `ResponseNewParamsInputUnion`) rather than plain strings/maps.
- Source: [github.com/openai/openai-go](https://github.com/openai/openai-go).

## Related

- [Java SDK](./java-sdk.md)
- [Ruby SDK](./ruby-sdk.md)
