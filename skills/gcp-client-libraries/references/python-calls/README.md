# python-calls

| Name | Description | Path |
| --- | --- | --- |
| Retry | `Retry` for unary sync RPCs: predicate, backoff, timeout, deprecated `deadline` | [retry.md](./retry.md) |
| AsyncRetry | `AsyncRetry` for coroutines | [async-retry.md](./async-retry.md) |
| Streaming retry | `StreamingRetry` / `AsyncStreamingRetry` and duplicate-value caveat | [streaming-retry.md](./streaming-retry.md) |
| Timeout classes | `TimeToDeadlineTimeout`, `ConstantTimeout`, `ExponentialTimeout` | [timeout.md](./timeout.md) |
| gapic_v1.method | `DEFAULT` sentinel and per-call `retry=` / `timeout=` | [gapic-method.md](./gapic-method.md) |
| Operation (LRO) | `Operation` / `AsyncOperation`: `result`, `done`, `cancel`, metadata | [operation-lro.md](./operation-lro.md) |
| Polling | `PollingFuture`: `timeout` / `retry` / `polling` roles | [polling.md](./polling.md) |
| page_iterator | `Iterator`, `Page`, HTTP / gRPC / async iterators | [page-iterator.md](./page-iterator.md) |
| exceptions | `GoogleAPICallError` hierarchy, HTTP / gRPC mapping, helpers | [exceptions.md](./exceptions.md) |
