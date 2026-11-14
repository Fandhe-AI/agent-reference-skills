# plugin-axios: Migrate to v6

`@kubb/plugin-axios` 6 runs on the shared client core from `@kubb/plugin-client`, the same core as `@kubb/plugin-fetch`, with axios as the transport. Code that only calls the generated functions, SDK classes, or hooks needs a regenerate and nothing else. Most other edits land in the file that configures `client`: its interceptors, its axios instance, its media types, and its streams.

## Signature / Usage

### Upgrade steps

1. Upgrade `kubb` and `@kubb/plugin-axios` together. v6 needs Kubb 5.18.4 or later:

   ```bash
   npm install --save-dev kubb@latest @kubb/plugin-axios@6
   ```

2. Regenerate. This rewrites `.kubb/` and the operation files:

   ```bash
   npx kubb generate
   ```

3. Run the type checker. Most breaking changes show up as compile errors in your own code:

   ```bash
   npx tsc --noEmit
   ```

4. Fix each error with its row in [What to change](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#what-to-change). Then read [Behavior changes](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#behavior-changes), which the type checker does not catch.

### What to change

| Your code                                                                                       | What to do                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calls generated functions, SDK methods, or hooks                                                | Regenerate. Then check [Behavior changes](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#behavior-changes).                                |
| Registers handlers on `client.interceptors`                                                     | Move them to `getAxiosInstance()`, or rewrite them. See [Interceptors](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#interceptors).       |
| Passes an axios instance as `transport`, or sets `defaultTransport.defaults`                    | Use `createAxiosTransport` and `getAxiosInstance()`. See [Axios instance](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#axios-instance).  |
| Imports from `@kubb/plugin-axios/templates/axios.ts` or `templates/core.ts`                     | Change the import path. See [Template imports](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#template-imports).                           |
| Uses `AxiosOptions`, `defaultQuerySerializer`, `toEventStream`, or another removed export       | Use the replacement. See [Renamed and removed exports](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#renamed-and-removed-exports).        |
| Sets `codecs`, `serializer.body`, or `responseType`                                             | Use `mediaTypes` and `parseAs`. See [Media types](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#media-types).                             |
| Streams Server-Sent Events, or names `EventStreamResult`                                        | Use `client.stream` and `StreamResult`. See [Streams](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#streams).                             |
| Writes a `transport`                                                                            | Return a web `Response`. See [Transports](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#transports).                                      |
| Registers `client.interceptors.error` handlers                                                  | Narrow the error first. See [Error interceptors](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#error-interceptors).                       |
| Imports a `…Status2XX` type, or writes a `'2XX'` key                                            | Write the range in lower case. See [Status ranges](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#status-ranges).                          |
| Imports generated files by path, and groups by tag or has a schema and an operation of one name | Update the import paths. See [Generated file paths](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#generated-file-paths).                  |
| Uses SDK classes with `group: { type: 'tag' }`, such as `new pet(config)`                       | Use the new names, such as `new PetClient(config)`. See [SDK class names](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#sdk-class-names). |
| Comes from 5.12 or earlier and uses streams                                                     | Check [From 5.12 or earlier](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#from-5-12-or-earlier).                                         |

### Template imports

`templates/axios.ts` is gone, and the package no longer publishes its own `templates/core.ts`, `templates/serializers.ts`, or `templates/standardSchema.ts`. Import the client types from `@kubb/plugin-axios/templates/client.ts`, and the shared runtime from `@kubb/plugin-client/templates/*`:

```typescript
// before
import type { RequestConfig } from '@kubb/plugin-axios/templates/axios.ts'
import type { ResolvedRequest } from '@kubb/plugin-axios/templates/core.ts'

// after
import type { RequestConfig } from '@kubb/plugin-axios/templates/client.ts'
import type { ResolvedRequest } from '@kubb/plugin-client/templates/core.ts'
```

The package exports `templates/client.ts` for its types only. Runtime values such as `client` still come from the generated `.kubb/client.ts`.

### Renamed and removed exports

| Before                                                             | After                                                                                                                               |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `AxiosOptions`                                                     | `NativeOptions`, the same type: `AxiosRequestConfig`.                                                                               |
| `validateStatus`                                                   | Removed. It had no effect, since the client splits success from error by status.                                                    |
| `AxiosTransport`, `InterceptorFn`, `InterceptorChannel`            | Removed. `createClientCore`, `ClientInstance`, and `Interceptors` come from the shared core.                                        |
| `defaultQuerySerializer`                                           | `serializeQuery`, or `serializeStyledQuery` for a styled query parameter or a urlencoded body                                       |
| `defaultPathSerializer`                                            | `serializePath`, plus `serializeStyledPath` for a `label` or `matrix` parameter                                                     |
| `applyHeaderStyles`                                                | `serializeHeaders`                                                                                                                  |
| `toEventStream`, `EventStreamCall`, `EventStreamResult`            | `client.stream` and `StreamResult`. See [Streams](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#streams). |
| `Codec`, `Deserializer`, `ContentBodySerializer`, `BodySerializer` | `MediaType`. See [Media types](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6#media-types).                |
| `defaultBodySerializer`, `isDefaultJsonBody`                       | A `mediaTypes` entry, or `defaultMediaTypes`.                                                                                       |
| `ResponseType`, `ResponseTypeMap`, `resolveResponseType`           | `ParseAs` and `parseAs`.                                                                                                            |
| `CallResult`, `isStreamed`, `getResponseContentType`               | Removed. Read `result.contentType`.                                                                                                 |
| `clientGenerator` from `@kubb/plugin-axios`                        | Removed. Build on `setupClient` and `clientDependencies` from `@kubb/plugin-client`.                                                |

The serializers now live in one file each under `.kubb/serializers/`, and Kubb writes a file only when the document needs it. `.kubb/config.ts` registers them, and `setConfig({ serializer })` merges per key, so setting `serializer.query` keeps the others. A client you build with `createClientCore` gets none, so pass them in its `serializer` config. `serializer.header` and `serializer.cookie` are new keys.

`ServerSentEvent`, `TypedEvent`, and `StreamResult` moved from `.kubb/sse.ts` to `.kubb/client.ts`.

### Media types

`codecs` is now `mediaTypes`, and its methods are renamed:

| Before                                                          | After                                        | Migration                                                                      |
| --------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `codecs`                                                        | `mediaTypes`                                 | Rename the key.                                                                |
| `codecs[type].serialize(body, contentType)`                     | `mediaTypes[type].encode(body, context)`     | Read `context.contentType`.                                                    |
| `codecs[type].deserialize(raw, contentType)` with a parsed body | `mediaTypes[type].decode(response, context)` | Read the body yourself: `await response.text()`.                               |
| `serializer.body`                                               | removed                                      | Move a custom body serializer into a `mediaTypes` entry.                       |
| `responseType` on a call, a string or a map                     | removed                                      | Use `parseAs`, such as `parseAs: 'blob'`, or a media type entry for that call. |

```typescript
// before
client.setConfig({ codecs: { 'application/xml': { deserialize: (raw) => parseXml(raw as string) } } })

// after
client.setConfig({ mediaTypes: { 'application/xml': { decode: async (response) => parseXml(await response.text()) } } })
```

A key can be a pattern, such as `application/*+json` or `text/*`. The form media types are written to `.kubb/mediaTypes/` as `multipartFormData` and `urlencoded`, only when the document has a form body. See [Configure serialization](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/serialization).

### Streams

Send a stream request with `client.stream`. Its result is already the stream:

```typescript
// before
const { stream } = await toEventStream(client({ method: 'GET', url: '/events', responseType: 'stream' }), { shape: 'data' })

// after
const { stream } = await client.stream({ method: 'GET', url: '/events', eventShape: 'data' })
```

`StreamResult` and `UnwrappedStreamResult` take the responses record and the full event type. Wrap a payload in `ServerSentEvent`. A stream typed with `TypedEvent<…>` stays the same:

```typescript
// before
let result: EventStreamResult<PetEvent>

// after
let result: StreamResult<StreamPetsResponses, true, ServerSentEvent<PetEvent>>
```

An operation whose only success content type is JSON Lines, such as `application/jsonl` or `application/x-ndjson`, now returns a `StreamResult` with one parsed item per line. It used to return the whole body as one string:

```typescript
for await (const entry of await streamLogs()) {
  console.info(entry.message) // LogEntry
}
```

A stream response that declares headers returns `StreamResultWithHeaders`, or `UnwrappedStreamResultWithHeaders` with `returnType: 'data'`. See [Stream Server-Sent Events](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/server-sent-events).

### Interceptors

`client.interceptors` handlers now receive the core objects, as on the fetch client: the `ResolvedRequest`, the `DecodedResponse`, and the error a call ends with. The quickest fix moves each handler to `getAxiosInstance().interceptors` and keeps its body. `getAxiosInstance()` is the instance v5 called `defaultTransport`, so the handlers get the same axios objects:

```typescript
// before
client.interceptors.request.use((config) => {
  config.headers.set('X-Request-ID', crypto.randomUUID())
  return config
})

// after: keep the native axios handler
getAxiosInstance().interceptors.request.use((config) => {
  config.headers.set('X-Request-ID', crypto.randomUUID())
  return config
})

// or: rewrite it for the resolved request, to share it with @kubb/plugin-fetch
client.interceptors.request.use((request) => {
  request.headers['X-Request-ID'] = crypto.randomUUID()
  return request
})
```

Native axios response interceptors see the raw bytes, not the decoded body. See [Add interceptors](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/interceptors).

### Axios instance

`transport` takes a transport function. Wrap an axios instance with `createAxiosTransport`, and set defaults on `getAxiosInstance()`:

```diff
- import { client, defaultTransport } from './gen/.kubb/client'
+ import { client, createAxiosTransport, getAxiosInstance } from './gen/.kubb/client'

- defaultTransport.defaults.timeout = 10_000
- client.setConfig({ transport: axios.create({ baseURL }) })
+ getAxiosInstance().defaults.timeout = 10_000
+ client.setConfig({ transport: createAxiosTransport(axios.create({ baseURL })) })
```

`defaultTransport` is now a function that sends through `getAxiosInstance()`. Native interceptors for a custom transport go on the instance you pass to `createAxiosTransport`.

### Transports

A transport function returns a web `Response`, or `{ webResponse, request, response }` to also set the native objects. The core decodes the body, and response interceptors receive a `DecodedResponse`, the shape `TransportResult` had:

```typescript
// before
transport: async () => ({ data: { id: 1 }, status: 200, statusText: 'OK', headers: new Headers(), request, response })

// after
transport: async () => Response.json({ id: 1 })
```

See [Use a custom transport](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/transport).

### Error interceptors

`client.interceptors.error` handlers now also get network errors, aborts, and validation errors. Narrow with `ResponseError.is` before you read `status`. A network error arrives as the native `AxiosError`. Each handler gets the error the previous one returned:

```typescript
client.interceptors.error.use((error) => {
  if (ResponseError.is(error) && error.status === 401) refreshToken()
  return error
})
```

See [Handle errors](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/error-handling).

### Status ranges

A status range is written in lower case in generated names and keys. Rename the imports, and the range keys in a responses record or `validator.error` map you wrote by hand. An upper-case key such as `'2XX'` is no longer read:

```diff
- import type { ListPetsStatus4XX } from './gen/types/ListPets'
+ import type { ListPetsStatus4xx } from './gen/types/ListPets'
```

### Generated file paths

Two changes move generated files. The exported names stay the same:

- With `group: { type: 'tag' }`, a tag whose OpenAPI 3.2 `parent` is `store` writes to `store/payment/` instead of `payment/`. Pass `group.name` to keep one folder per tag: `pluginAxios({ group: { type: 'tag', name: ({ group }) => group } })`.
- An operation file gets an `Operation` suffix when a schema file has the same name, ignoring case. Operation `point` goes to `types/PointOperation.ts`, next to schema `Point`.

```diff
- import { listPayments } from './gen/clients/payment/listPayments'
+ import { listPayments } from './gen/clients/store/payment/listPayments'
```

### SDK class names

With `sdk` and `group: { type: 'tag' }`, tag classes are named like `PetClient` instead of `pet`. The files and the root class's `pet` and `store` fields stay the same:

```diff
- import { pet } from './gen/sdk/pet/pet'
- const api = new pet({ baseURL })
+ import { PetClient } from './gen/sdk/pet/pet'
+ const api = new PetClient({ baseURL })
```

The root class shares one client with every tag. Add interceptors on `api.client`.

### Behavior changes

These compile without errors, so check them by hand.

Client:

- `client.interceptors.request` handlers run in the order you register them. axios ran its request handlers in reverse.
- A child from `createClient()` inherits the `transport` of `client`. It used to get its own `axios.create()`.

Requests:

- A path or operation with its own `servers` sends its calls there instead of to the client's `baseURL`. Pass `baseURL` on the call to override it. See [Set the base URL](https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/base-url).
- An object query parameter without a `style` goes out as `name=odie&age=3`, not `filter[name]=odie`. Set `style: deepObject` in the document to keep the brackets.
- An array or object header without a `style` goes out as `X-Ids: 3,4`, not as JSON.
- A space in a query value goes out as `%20`, not `+`.
- `spaceDelimited` and `pipeDelimited` default `explode` to `false`, so an array goes out as `ids=1%7C2`.
- A `style: cookie` parameter goes out without percent-encoding. A value it cannot send, such as one with `;`, throws a `TypeError`.
- `body: null` goes out as the JSON document `null`.
- A stream call sends `Accept: text/event-stream`, or the JSON Lines media type.
- An auth requirement that needs several schemes sends all of them.

Responses:

- Invalid JSON under a JSON media type throws a `ParseError` instead of becoming a string. Catch it, or register a lenient `application/json` entry.
- An empty body is `undefined` for every media type, text included.
- A failed call without a body reports `{ status, statusText }` as `error`.
- `ResponseError.data` holds the validated body. Set `validator.error` to a map keyed by status, such as `{ 404: getPetStatus404Schema }`, to check an error body against the schema of its status.
- An aborted call or stream rejects with the signal's reason.
- Every result, and a thrown `ResponseError`, has the response's `Headers` as `headers`.

Types:

- A `2xx` response key is a success, and range keys such as `4xx` type `status` as the numbers they cover. An exact code such as `200` wins over a range listed before it.
- An XML, YAML, or CSV response is typed `string`. An operation that returns JSON and XML has `data: Pet | string`, so narrow on `result.contentType`.
- An image, audio, video, PDF, or `application/octet-stream` response is typed `Blob`, even when its schema says `type: string`.
- `result.contentType` is the bare media type, such as `'text/html'`.
- `server.index` no longer counts a server without a `url`. Servers with a `name` are exported as `servers` from `.kubb/client.ts`, for `client.setConfig({ baseURL: servers.staging })`.

### From 5.12 or earlier

These changed in 5.13 and compile without errors:

- A stream call keeps the adapter set on the call or on the instance, such as a mock adapter in tests. Only a browser call with the default adapters switches to the fetch adapter.
- A successful stream call with a body that is not a stream, such as a JSON body, throws a `TypeError` with the body as its `cause`. A successful answer with no body still ends as an empty stream.
- An event the server ends without a blank line is dropped, as browser `EventSource` does, so end every event with one.

### Query plugins

`@kubb/plugin-react-query`, `@kubb/plugin-vue-query`, `@kubb/plugin-swr`, and `@kubb/plugin-mcp` work with v5 and v6, so you can upgrade them separately. They skip hooks for JSON Lines operations, as they do for event streams.

## Notes

- Requires `kubb` 5.18.4 or later (stated in the official upgrade steps).
- Migration (5.x → 6.0): `@kubb/plugin-axios` 6.0.0 runs the fetch and axios clients on one core (`@kubb/plugin-client`) with the same interceptors and client factory; `templates/axios.ts` is gone, `AxiosOptions` is now `NativeOptions`, `client.interceptors` handlers get the core objects (native handlers go on `getAxiosInstance().interceptors`), `defaultTransport` becomes a function and an axios instance is wrapped with `createAxiosTransport`, and `validateStatus`, `AxiosTransport`, `InterceptorFn`, and `InterceptorChannel` are gone (6.0.0 CHANGELOG, Major Changes)
- Migration (5.x → 6.0): `returnType: 'plain'` is no longer accepted or offered on `@kubb/plugin-fetch` and `@kubb/plugin-axios` because it generated code that did not typecheck; it stays available on `@kubb/plugin-client` (6.0.1 CHANGELOG)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/migrate-to-v6 (`@kubb/plugin-axios@6.0.1`, retrieved 2026-11-14)

## Related

- [axios-calling-operations](./axios-calling-operations.md)
- [axios-serialization](./axios-serialization.md)
- [axios-server-sent-events](./axios-server-sent-events.md)
- [axios-transport](./axios-transport.md)
- [axios-interceptors](./axios-interceptors.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
- [client-migrate-to-v6](./client-migrate-to-v6.md)
