# Server-side Subscriptions

Read Realtime messages in server code, forward them over Server-Sent Events, or react to them in a worker.

## Signature / Usage

`inngest.realtime.subscribe()` returns a readable stream of typed messages:

```ts
import { inngest } from "./inngest/client";
import { jobChannel } from "./inngest/channels";

const stream = await inngest.realtime.subscribe({
  channel: jobChannel({ jobId: "job_123" }),
  topics: ["status", "result"],
});

for await (const message of stream) {
  if (message.kind === "run") continue;
  console.log(message.topic, message.data);
}
```

Callback form with `onMessage` / `onError`; the call returns a subscription handle:

```ts
const subscription = await inngest.realtime.subscribe({
  channel: jobChannel({ jobId: "job_123" }),
  topics: ["status"],
  onMessage: (message) => {
    console.log(message.data);
  },
  onError: (err) => {
    console.error("Realtime subscription failed", err);
  },
});

// Later, when you no longer need updates:
subscription.close();
```

Forward updates as Server-Sent Events with `getEncodedStream()`:

```ts
import { inngest } from "@/inngest/client";
import { helloChannel } from "@/inngest/channels";

export async function POST() {
  const uuid = crypto.randomUUID();
  const channel = helloChannel({ uuid });

  // Subscribe first so the stream includes the function's first update.
  const stream = await inngest.realtime.subscribe({
    channel,
    topics: ["logs"],
  });

  await inngest.send({ name: "hello-world/hello", data: { uuid } });

  return new Response(stream.getEncodedStream(), {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

Go takes a subscription token instead:

```go
func readJobUpdates(ctx context.Context, token string) error {
	stream, err := realtime.Subscribe(ctx, token)
	if err != nil {
		return err
	}

	for item := range stream {
		if item.IsErr() {
			return item.Err()
		}
		if !item.IsMessage() {
			continue
		}
		msg := item.Message()
		if msg.Kind == "run" {
			continue
		}
		fmt.Println(msg.Topic, string(msg.Data))
	}
	return nil
}
```

## Notes

- Server code that has the Inngest client authenticates with its signing key, so no subscription token is needed. In Go, `realtime.Subscribe()` takes a subscription token, which the Go SDK cannot mint (mint with the TypeScript or Python SDK). The Python SDK does not support subscribing yet.
- `subscribe({ app: inngest, channel, topics })` from `inngest/realtime` does the same when the client is passed as an argument.
- Close every subscription when its consumer finishes so the connection does not stay open. In Go, canceling the context closes the connection and the channel.
- Authorize the caller in an SSE route as you would before minting a token: the route reads with the signing key, so it can read any channel.
- The stream also offers `getJsonStream()` for parsed messages and `close()` to end the subscription.
- Source: https://www.inngest.com/docs-markdown/realtime/guides/server-side-subscriptions (fetched 2026-10).

## Related

- [Subscribing](./subscribing.md)
- [Subscription Tokens](./subscription-tokens.md)
- [Realtime Troubleshooting](./troubleshooting.md)
