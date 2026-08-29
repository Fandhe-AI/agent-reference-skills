---
source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions
---

# Streaming Data from Server Functions

Server functions created with `createServerFn()` can stream data to the client by returning a typed `ReadableStream`, or by being defined as an async generator function.

## Signature / Usage

### Typed readable stream

```ts
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  const messages: Message[] = generateMessages()

  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        controller.enqueue(message)
      }
      controller.close()
    },
  })

  return stream
})
```

```ts
const [message, setMessage] = useState('')

const getTypedReadableStreamResponse = useCallback(async () => {
  const response = await streamingResponseFn()

  if (!response) {
    return
  }

  const reader = response.getReader()
  let done = false
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    if (value) {
      // `value` is typed as `Message | undefined` from the typed `ReadableStream`
      const chunk = value.content
      setMessage((prev) => prev + chunk)
    }
  }
}, [])
```

### Async generators

```ts
const streamingWithAnAsyncGeneratorFn = createServerFn().handler(
  async function* () {
    const messages: Message[] = generateMessages()
    for (const msg of messages) {
      await sleep(500)
      // The streamed chunks are still typed as `Message`
      yield msg
    }
  },
)
```

```ts
const getResponseFromTheAsyncGenerator = useCallback(async () => {
  for await (const msg of await streamingWithAnAsyncGeneratorFn()) {
    const chunk = msg.content
    setMessages((prev) => prev + chunk)
  }
}, [])
```

## Notes

- Returning a `ReadableStream<T>` from a handler keeps chunk typing (`T`) on the client's `reader.read()` result.
- An async-generator handler (`async function*`) is consumed on the client with `for await...of`, yielding the same typed chunks.

## Related

- [Server Functions](./server-functions.md)
- [Server Components](./server-components.md)
