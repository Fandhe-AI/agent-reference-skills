# plugin-axios: Server-sent events

`text/event-stream` を返す operation は `RequestResult` ではなく型付き event のストリームを返す。event の型は OpenAPI ドキュメントから取られ、`.kubb/sse.ts` の runtime が WHATWG event stream 仕様どおりにストリームをパースする。

## Signature / Usage

wire 上の各 event は最大 4 フィールドを持ち、空行で終わる:

| Field   | Meaning                                                                          |
| ------- | -------------------------------------------------------------------------------- |
| `event` | The event name. `message` when the server sends none.                            |
| `data`  | The payload. Parsed as JSON when it is valid JSON, and kept as text otherwise.   |
| `id`    | The last event ID. It carries over to later events and resumes a dropped stream. |
| `retry` | The reconnect delay in milliseconds.                                             |

### Pick a shape

Kubb はストリームの item schema を 2 つの shape のどちらかで読み、item の properties で決まる:

- `event`: `message_delta` と `ping` のように複数の名前付き event を持つ場合。item が `event` または `data` を宣言し、ストリームは `TypedEvent<Item>` を yield する（Typed events 参照）
- `data`: `PetEvent` の feed のように全 event で 1 つの payload を持つ場合。item がどちらも宣言せず、ストリームは `ServerSentEvent<Item>` を yield する（Payload only 参照）

`examples/advanced` は両方の shape を示す。`streamOrderEvents` は event 型、`streamPetEvents` は payload 型。

### Typed events

OpenAPI 3.2 では、`itemSchema` に event 名ごとの `oneOf` メンバーを置き、`event` に `const` を付ける。`data` は payload schema を `$ref` で指す。`contentMediaType: application/json` と `contentSchema` で記述した `data` string も、その schema として型付け・パースされる:

```yaml
/chat:
  post:
    operationId: streamChat
    responses:
      '200':
        description: One event per oneOf member
        content:
          text/event-stream:
            itemSchema:
              type: object
              required: [event]
              properties:
                data: { type: string }
                event: { type: string }
                id: { type: string }
                retry: { type: integer, minimum: 0 }
              oneOf:
                - type: object
                  required: [event, data]
                  properties:
                    event: { type: string, const: message_delta }
                    data: { $ref: '#/components/schemas/MessageDelta' }
                - type: object
                  required: [event]
                  properties:
                    event: { type: string, const: ping }
                    data: { type: string }
```

OpenAPI 3.0 / 3.1 では、同じ `oneOf` を `schema` に置き、`event` に `discriminator` を付ける。Kubb は `schema` を 1 つの event として読む。

ストリームの例:

```text
event: message_delta
id: 1
data: {"text": "Hel"}

event: ping
data: keep-alive

```

このストリームは 2 つの event を yield する。`id` は 2 つ目に引き継がれる:

```typescript
{ event: 'message_delta', id: '1', data: { text: 'Hel' } }
{ event: 'ping', id: '1', data: 'keep-alive' }
```

Kubb は event 名ごとに union メンバーを 1 つ生成する:

```typescript
export type StreamChatStatus200 =
  | { data: MessageDelta; event: 'message_delta'; id?: string; retry?: number }
  | { data?: string; event: 'ping'; id?: string; retry?: number }
```

`event` の `switch` で各 `case` の `data` が絞り込まれる:

```typescript
import { streamChat } from './gen/clients/streamChat'

const { stream } = await streamChat({ body: { prompt: 'Hi' } })

for await (const event of stream) {
  switch (event.event) {
    case 'message_delta':
      render(event.data.text) // MessageDelta
      break
    case 'ping':
      break
  }
}
```

ストリームはサーバーが送る全 event を yield する。ドキュメントに宣言の無い event 名は `switch` の `default` に届き、`validator: 'zod'` ではドキュメントに合わない他のレスポンスと同様に event schema が拒否する。

### Payload only

`itemSchema` を payload に向ける。OpenAPI 3.0 / 3.1 を読むツールが受け入れるよう、`schema: { type: string }` を並べて置く:

```yaml
/pet/{petId}/events:
  get:
    operationId: streamPetEvents
    responses:
      '200':
        description: Server-Sent Events stream of pet changes
        content:
          text/event-stream:
            schema:
              type: string
            itemSchema:
              $ref: '#/components/schemas/PetEvent'
```

OpenAPI 3.0 / 3.1 では、`event` / `data` プロパティを持たない `schema` が同じ shape になる。

ストリームの例:

```text
data: {"type": "updated", "pet": {"id": 1, "name": "Rex"}}

data: {"type": "deleted", "pet": {"id": 1, "name": "Rex"}}

```

このストリームは 2 つの event を yield する。サーバーが `event` を送らないので、それぞれ `message` と名付けられる:

```typescript
{ event: 'message', data: { type: 'updated', pet: { id: 1, name: 'Rex' } } }
{ event: 'message', data: { type: 'deleted', pet: { id: 1, name: 'Rex' } } }
```

各 event は `ServerSentEvent<PetEvent>`:

```typescript
type ServerSentEvent<TData> = { data: TData; event: string; id?: string; retry?: number }
```

`data` を各 event から直接読む。result は最初の接続の native `response` も持つ:

```typescript
import { streamPetEvents } from './gen/clients/streamPetEvents'

const { stream, response } = await streamPetEvents({ path: { petId: 1 } })
console.info(response.status) // 200

for await (const { data } of stream) {
  console.info(data.type, data.pet.name) // PetEvent
}
```

### JSON Lines

成功 content type が JSON sequence（`application/jsonl` / `application/x-ndjson` / `application/json-seq`）のみの operation は、1 行 1 item でストリームする。各行は JSON としてパースされ、ループは本文全体を待たずに行が届くたび item を受け取る。`application/json-seq` のレコードは 1 行に収まる必要があり、複数行にまたがるレコードはパースに失敗する。

`itemSchema` を 1 行の schema に向ける:

```yaml
/logs:
  get:
    operationId: streamLogs
    responses:
      '200':
        description: One LogEntry per line
        content:
          application/jsonl:
            itemSchema:
              $ref: '#/components/schemas/LogEntry'
```

OpenAPI 3.0 / 3.1 では、これらの media type の `schema` が 1 行を記述する。

ストリームの例:

```text
{"level": "info", "message": "started"}
{"level": "warn", "message": "slow"}
```

呼び出しは宣言された media type を `Accept` に載せる。行末は CRLF / CR / LF のいずれでもよく、空行はスキップされ、改行なしの最終行も数えられる。JSON として不正な行はループから `SyntaxError` を投げる。

各 item は event ラッパーなしの `LogEntry`:

```typescript
import { streamLogs } from './gen/clients/streamLogs'

for await (const entry of await streamLogs()) {
  console.info(entry.level, entry.message) // LogEntry
}
```

`terminator` / `maxEventSize` / `signal` は行単位で動く。`transform` は Server-Sent Events にのみ適用される。`validator: 'zod'` では各行に validator が走る。JSON Lines に event ID は無いので `lastEventId` は空のまま。

### Stream options

リクエストパラメーターと並べて呼び出しに渡す:

| Option         | What it does                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `terminator`   | Ends the stream when `data` equals this value, such as `[DONE]`. Without it, the sentinel reaches your loop, or fails the `validator` when it does not match the event schema. |
| `transform`    | Maps each event before validation, for example to camelCase its keys.                                                                                                          |
| `maxEventSize` | Largest event in characters. A larger one throws a `RangeError`. Defaults to `16 * 1024 * 1024`. Set `Infinity` to turn it off.                                                |
| `signal`       | An `AbortSignal` that ends the request and the loop.                                                                                                                           |
| `eventShape`   | What the validator checks: `data` for the payload, `event` for the whole event. Generated calls set it.                                                                        |

読み取りを止めるにはループを `break` する。runtime は reader をキャンセルして接続を解放する。

### Validate events

plugin オプションの `validator: 'zod'` では、typed events なら event 全体、payload なら `data` に validator が走る。失敗した event は `onValidationError` を呼ぶ。`{ value }` を返せば続行し、返さなければループが `ParseError` を投げる:

```typescript
const { stream } = await streamChat({
  body,
  onValidationError: (error, { value }) => {
    console.warn(error.issues)
    return { value }
  },
})
```

呼び出しまたはクライアントに `validate: false` を設定するとスキップできる。

### Read the response headers

stream result も通常の result と同様にレスポンスの `headers` を持つ。レスポンスが `X-Request-ID` などのヘッダーを宣言している場合、呼び出しは `StreamResultWithHeaders` を返し、絞り込んだ `status` に対して `headers.get` がその名前を補完する:

```typescript
const result = await streamChat({ body: { prompt: 'Hi' } })

console.info(result.headers.get('X-Request-ID'))
```

### Resume after a drop

切断されるとループは transport のエラーで終わる。result の `lastEventId` はサーバーが完了させた最後の event の `id` なので、`Last-Event-ID` ヘッダー付きの新しい呼び出しで停止位置から続けられる。呼び出しが `headers` で受け付けるよう、`Last-Event-ID` を operation のヘッダーパラメーターとして宣言する。チャット補完のように意図的に終わるストリームが多く、再試行ポリシーはアプリ側の責務なので、runtime は自動再接続しない:

```typescript
let lastEventId = ''

for (let attempt = 0; attempt < 3; attempt++) {
  const result = await streamChat({ body, headers: lastEventId ? { 'Last-Event-ID': lastEventId } : {} })
  try {
    for await (const event of result.stream) render(event)
    break
  } catch (error) {
    if (ResponseError.is(error)) throw error
    lastEventId = result.lastEventId || lastEventId
  }
}
```

`lastEventId` はサーバーが `id` を送るまで空で、空の `id:` フィールドはそれをクリアする。NULL 文字を含む `id` は無視される。各 event はサーバーの `retry` ヒントを `retry` として持つ。

### Handle errors

非 2xx レスポンスは呼び出しまたはループから `ResponseError` を投げる:

```typescript
import { ResponseError } from './gen/.kubb/client'

try {
  const { stream } = await streamChat({ body })
  for await (const event of stream) render(event)
} catch (error) {
  if (!ResponseError.is(error)) throw error
  console.error('stream rejected', error.status)
}
```

`throwOnError: false` では、通常の呼び出しと同様に throw せず resolve する。result は `status` と `error` ボディを持ち、`data` は `undefined` で、stream は何も yield しない。`data` を確認して区別する。空のエラーボディは `error` に `{ status, statusText }` を設定する。`status` を確認すると `error` がドキュメントで宣言されたその status のボディに絞られる:

```typescript
const result = await streamChat({ body, throwOnError: false })
if (!result.data) console.error('stream rejected', result.status, result.error)
else for await (const event of result.data) render(event)
```

通常の呼び出しと同様に `.unwrap()` は event へ resolve する。失敗した呼び出しは既定で `ResponseError` で reject し、`throwOnError: false` では `error` ボディで reject する:

```typescript
for await (const event of await streamChat({ body }).unwrap()) render(event)
```

JSON のエラーボディを受けた stream 呼び出しは他の呼び出しと同じようにそれをパースする。event stream でない 2xx 応答（JSON ボディなど）はボディを `cause` に持つ `TypeError` を投げ、空の 2xx 応答は空のストリームで終わる。`text/event-stream` や JSON Lines 型と並んで別の content type を宣言する operation は通常の呼び出しになる（JSON or an event stream 参照）。

ハートビートや `error` event はドキュメントに宣言し、`switch` の各 `case` に対応させる。

### JSON or an event stream

Wikimedia EventStreams のように、同じレスポンスを `application/json` と `text/event-stream` の両方で宣言する API がある。Kubb はそれに対して `RequestResult` を返す通常の呼び出しを生成する。呼び出しは `Accept: text/event-stream` を送るのでサーバーは event をストリームする。JSON を求めるには `contentType: { response: 'application/json' }` を渡す。Wikimedia は JSON に対して終わらない JSON Lines ボディを返すので、`parseAs: 'stream'` も渡し、`result.data` を `.kubb/client` の `parseJsonLines({ stream: result.data })` で読む。そうしないと呼び出しは終わらないボディを待ち続ける。

result の `contentType` を確認する。`text/event-stream` では `data` は生の `ReadableStream<Uint8Array>` で、`.kubb/client` の `parseEventStream` に渡して event を読む:

```typescript
import { parseEventStream } from './gen/.kubb/client'
import { getV2StreamRecentchange } from './gen/clients/getV2StreamRecentchange'

const result = await getV2StreamRecentchange({ signal })

if (result.contentType === 'text/event-stream') {
  for await (const { data } of parseEventStream(result.data)) render(data)
} else {
  render(result.data) // the JSON body
}
```

`lastEventId` 付きの stream result を得るには、同じリクエストを `client.stream` で送る。サーバーが JSON で答えると `TypeError` を投げる:

```typescript
import { client } from './gen/.kubb/client'

const result = await client.stream({ method: 'GET', url: '/v2/stream/recentchange', eventShape: 'data', signal })
for await (const event of result) render(event.data)
```

### Stream with the client

`client.stream(config)` は `client(config)` と同じ interceptor と transport を通る。2xx では本文を item ごとに読み、`validator.response` で各 item を検証する。非 2xx ボディは丸ごとデコードされるので `error` は値のまま。responses record、`ThrowOnError`、item 型（既定は成功ボディを包む `ServerSentEvent`）で型付けする:

```typescript
import { client, type SuccessOf } from './gen/.kubb/client'
import type { StreamLogsResponses } from './gen/types/StreamLogs'

const result = await client.stream<StreamLogsResponses, true, SuccessOf<StreamLogsResponses>>({ method: 'GET', url: '/logs' })
```

別の形式をストリームするには、[Configure serialization](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/serialization#add-a-media-type) のとおり `stream` ハンドラーを登録する。

### Return only the events

plugin オプションの `returnType: 'data'` では、通常の呼び出しがボディのみを返すのと同様に、stream 呼び出しは event を返す:

```typescript
import { pluginAxios } from '@kubb/plugin-axios'

pluginAxios({ returnType: 'data' })
```

どちらのモードも同じ event を読む。1 回の呼び出しの比較:

|                                                | `returnType: 'full'` (default)                                 | `returnType: 'data'`                                           |
| ---------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| The call returns                               | `Unwrappable<StreamResult<…>>`                                 | `Promise<UnwrappedStreamResult<…>>`                            |
| Call it                                        | `const result = await streamPetEvents({ path: { petId: 1 } })` | `const events = await streamPetEvents({ path: { petId: 1 } })` |
| Loop over the events                           | `for await (const event of result.stream)`                     | `for await (const event of events)`                            |
| Other ways to loop                             | `result`, `result.data`, or `.unwrap()`                        | none                                                           |
| `event.data`                                   | `PetEvent`                                                     | `PetEvent`                                                     |
| A failed call, by default                      | throws a `ResponseError`                                       | throws a `ResponseError`                                       |
| With `throwOnError: false`                     | the full result                                                | the full result, as in `'full'`                                |
| `status`, `headers`, `response`, `lastEventId` | available                                                      | only with `throwOnError: false`                                |

呼び出しが resolve する event をループする:

```typescript
import { streamOrderEvents } from './gen/clients/streamOrderEvents'
import { streamPetEvents } from './gen/clients/streamPetEvents'

const events = await streamOrderEvents({ path: { orderId: 7 } })

for await (const event of events) {
  if (event.event === 'order_placed') render(event.data) // Order
}

for await (const { data } of await streamPetEvents({ path: { petId: 1 } })) {
  console.info(data.type) // PetEvent
}
```

失敗した呼び出しは最初の event の前に `ResponseError` を投げ、切断はループから投げられる:

```typescript
import { ResponseError } from './gen/.kubb/client'

try {
  for await (const event of await streamPetEvents({ path: { petId: 1 } })) render(event)
} catch (error) {
  if (!ResponseError.is(error)) throw error
  console.error('stream rejected', error.status)
}
```

`throwOnError: false` では、このモードの通常の呼び出しと同様に呼び出しは full result を返す。event は 2xx での `data` で、`status` を確認すると `error` が絞り込まれる:

```typescript
const result = await streamPetEvents({ path: { petId: 1 }, throwOnError: false })

if (!result.data) console.error('stream rejected', result.status, result.error)
else for await (const event of result.data) render(event)
```

event のみでは `response` も `lastEventId` も持たない。切断したストリームを再開するには既定の `returnType: 'full'` を使うか、`throwOnError: false` で full result を得る。

### The runtime files

`.kubb/sse.ts` は `parseEventStream` / `parseJsonLines` と、`eventStream` / `jsonLines` / `streamMediaTypes` の media type を持つ。`ServerSentEvent` / `TypedEvent` / `EventStreamOptions` / `StreamOptions` / `StreamResult` / `StreamResultWithHeaders` の型は `.kubb/core.ts` にある。stream operation は `StreamOptions` を受け取り `StreamResult`（レスポンスがヘッダーを宣言する場合は `StreamResultWithHeaders`）を返す。これらの型は `Options` / `RequestResult` / `RequestResultWithHeaders` の stream 版。`.kubb/client.ts` が `sse.ts` を再 export するので、すべてクライアントから import する。Kubb は実行のたびにこれらのファイルを再生成するので編集しない:

```typescript
import type { ServerSentEvent } from './gen/.kubb/client'
```

## Notes

- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- JSON Lines（`application/jsonl` / `application/x-ndjson` / `application/json-seq`）は 6.0 で追加。クエリ系プラグインと `@kubb/plugin-mcp` は event stream と同様に JSON Lines operation のフックを生成しない
- Migration (5.x → 6.0): `toEventStream(call, { shape })` is replaced by `client.stream({ ...config, eventShape })`, and `EventStreamResult` / `EventStreamCall` are gone in favor of `StreamResult` named with the responses record and the event type, such as `StreamResult<StreamPetsResponses, true, ServerSentEvent<PetEvent>>` (a stream typed with `TypedEvent<…>` stays the same); `ServerSentEvent`, `TypedEvent`, and `StreamResult` moved from `.kubb/sse.ts` to `.kubb/client.ts` (6.0.0 CHANGELOG and migrate-to-v6)
- Migration (5.x → 6.0): an operation whose only success content type is JSON Lines now returns a `StreamResult` with one parsed item per line (it used to return the whole body as one string); a stream response that declares headers returns `StreamResultWithHeaders`, or `UnwrappedStreamResultWithHeaders` with `returnType: 'data'`; a stream call sends `Accept: text/event-stream` (or the JSON Lines media type); an aborted call or stream rejects with the signal's reason (migrate-to-v6)
- Migration (5.12 → 5.13): a successful stream call with a body that is not a stream, such as a JSON body, throws a `TypeError` with the body as its `cause`, and an event the server ends without a blank line is dropped, as browser `EventSource` does, so end every event with a blank line (migrate-to-v6, "From 5.12 or earlier")
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/server-sent-events （`@kubb/plugin-axios@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-serialization](./axios-serialization.md)
- [fetch-error-handling](./axios-error-handling.md)
- [fetch-server-sent-events](./fetch-server-sent-events.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
