# plugin-axios: Server-sent events

`text/event-stream` を返す operation は `RequestResult` ではなく型付きストリームを返す。

## Signature / Usage

`EventStreamResult.stream` を `for await` で読む:

```typescript
import { streamEvents } from './gen/clients/streamEvents'

const { stream } = await streamEvents({})

for await (const event of stream) {
  console.info(event.data)
}
```

`data` は operation の response schema から型付けされる。各 event は任意の SSE フィールドも持つ:

```typescript
type ServerSentEvent<TData> = {
  data: TData
  event?: string
  id?: string
  retry?: number
}
```

### Stop early

ループを `break` すると読み取りを停止する。iterator の終了時に内部 reader がキャンセルされるため、早期 `break` でストリームが解放される:

```typescript
const { stream } = await streamEvents({})

for await (const event of stream) {
  if (event.event === 'done') break
  render(event.data)
}
```

ループ外から止めるには `AbortSignal` を渡して abort する。リクエストとイテレーションの両方が終わる:

```typescript
const controller = new AbortController()
const { stream } = await streamEvents({ signal: controller.signal })

// elsewhere, for example on component unmount
controller.abort()
```

### Read the response

iterate の前に native `response` から status / headers を読める:

```typescript
const { stream, response } = await streamEvents({})

console.info(response.status) // 200
console.info(response.headers.get('x-stream-id'))
```

### Handle errors

非 2xx は呼び出しとイテレーションを囲んで catch し、接続失敗等の他のエラーは再 throw する:

```typescript
import { ResponseError } from './gen/.kubb/client'

try {
  const { stream } = await streamEvents({})
  for await (const event of stream) {
    handle(event.data)
  }
} catch (error) {
  if (!ResponseError.is(error)) throw error
  console.error('stream rejected', error.status)
}
```

## Notes

- これらの呼び出しでは、`adapter` を自分で設定しない限りクライアントは axios の fetch adapter に切り替わる（既定の XHR adapter はボディ全体をバッファするため）
- runtime は各 event の `data` を、有効な JSON ならパースし、そうでなければ生の文字列のまま保持する
- ストリーム途中で切断されると `for await` ループは終了する。再接続したい場合は最後の event の `id` を記録しておく
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/server-sent-events （`@kubb/plugin-axios@5.6.5`）

## Related

- [axios-serialization](./axios-serialization.md)
- [axios-error-handling](./axios-error-handling.md)
- [fetch-server-sent-events](./fetch-server-sent-events.md)
