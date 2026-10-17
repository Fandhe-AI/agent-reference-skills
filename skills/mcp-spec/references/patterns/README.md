# patterns

| Name | Description | Path |
|------|-------------|------|
| Cancellation | Optional cancellation of in-progress requests through notification messages. A client **SHOULD** send a cancellation notification to indicate that a request it previously issued should be terminated. | [cancellation.md](./cancellation.md) |
| Multi Round-Trip Requests (MRTR) | A standardized way for a server to request additional information (`roots/list`, `sampling/createMessage`, `elicitation/create`) while processing a client request, without a shared storage layer across server instances or stateful load balancing. | [mrtr.md](./mrtr.md) |
| Message Patterns Overview | The message patterns of the core protocol: the ways a client and server compose JSON-RPC requests, responses, and notifications into interactions. Every transport carries all of these patterns; transports differ only in how messages are framed and delivered. | [patterns-overview.md](./patterns-overview.md) |
| Progress | Optional progress tracking for long-running operations through notification messages. The server **MAY** send progress notifications to report the status of requests the client has issued. | [progress.md](./progress.md) |
| Subscriptions (subscriptions/listen) | `subscriptions/listen` opens a long-lived notification stream from the server to the client. The stream stays open and delivers notifications until the client cancels it. | [subscriptions.md](./subscriptions.md) |
