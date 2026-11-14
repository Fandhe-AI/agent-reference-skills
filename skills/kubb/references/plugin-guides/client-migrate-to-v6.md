# plugin-client: Migrate to v6

`@kubb/plugin-client` 6 calls your client with type arguments and streams through `client.stream`. Update the `client` export of your module, then regenerate. Find your code in the table, then follow its section.

## Signature / Usage

### What to change

| Your code                                                                       | What to do                                                                                                                                                                   |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exports a `client` that takes no type arguments                                 | Make it generic. See [A generic client call](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#a-generic-client-call).                                |
| Exports `toEventStream` or `EventStreamResult`                                  | Add a `stream` method to `client`. See [A stream method](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#a-stream-method-instead-of-toeventstream). |
| Declares `responseType` on `RequestConfig`, or lacks `contentType` or `cookies` | Add the new fields. See [New fields on the request config](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#new-fields-on-the-request-config).       |
| Reads `security` entries as single schemes                                      | Handle arrays and the new fields. See [Security requirements](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#security-requirements).               |
| Imports a `…Status2XX` type, or writes a `'2XX'` key                            | Write the range in lower case. See [Status ranges](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#status-ranges).                                  |
| Groups by tag in an OpenAPI 3.2 document whose tags set `parent`                | Update the import paths. See [Tag folders](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#tag-folders).                                            |
| Has `servers` on a path or operation, or reads XML, YAML, CSV, or binary bodies | Check [Behavior changes](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#behavior-changes). It compiles.                                            |
| Wants `.unwrap()` or a call that resolves to the body                           | Set `returnType`. See [Return type](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#return-type). This is optional.                                 |

### Upgrade steps

1. Upgrade `kubb` and `@kubb/plugin-client` together. v6 needs Kubb 5.18.4 or later:

   ```bash
   npm install --save-dev kubb@latest @kubb/plugin-client@6
   ```

2. Update your client module with the sections below.

3. Regenerate the operation files:

   ```bash
   npx kubb generate
   ```

4. Run the type checker. A missing export or field in your client module shows up as a compile error in the generated files:

   ```bash
   npx tsc --noEmit
   ```

### A generic client call

A generated function now calls `client<TResponses, ThrowOnError>(config)`. Make `client` generic:

```typescript
export const client = <TResponses, ThrowOnError extends boolean = true>(config: RequestConfig) =>
  send(config) as Promise<RequestResult<TResponses, ThrowOnError>>
```

### A stream method instead of toEventStream

A Server-Sent Events or JSON Lines operation calls `client.stream<TResponses, ThrowOnError, TItem>(config)`. Remove `toEventStream` and `EventStreamResult`, add `stream` to `client`, and export `StreamResult`, `SuccessOf`, `TypedEvent`, and `ServerSentEvent`:

```typescript
export type StreamResult<TResponses, ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>> = {
  stream: AsyncGenerator<TEvent>
  response: Response
}

export function client<TResponses, ThrowOnError extends boolean = true>(config: RequestConfig) {
  return send<TResponses, ThrowOnError>(config)
}

client.stream = async <TResponses, ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>>(
  config: RequestConfig,
): Promise<StreamResult<TResponses, ThrowOnError, TEvent>> => {
  // send the request and parse the body into TEvent values
}
```

A Server-Sent Events call also passes `eventShape: 'event'` or `'data'`. A JSON Lines call, such as `application/jsonl` or `application/x-ndjson`, passes the media type in `contentType.response` and expects one parsed item per line. See [Write your client](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/write-your-client).

### New fields on the request config

Add these fields to your `RequestConfig`, or the generated functions fail to compile:

```typescript
export type RequestConfig = {
  // ...
  contentType?: string | { request?: string; response?: string }
  // Replaces `responseType`. Binary downloads pass 'blob'.
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream'
  eventShape?: 'event' | 'data'
  // Name and value pairs for `in: cookie` parameters. Join them into a `Cookie` header on the server. Browsers ignore a `Cookie` header set by script and send their own cookies.
  cookies?: object
  // `style`, `explode`, `allowReserved`, and `contentType` per parameter, grouped by location.
  styles?: object
}
```

A cookie parameter with the OpenAPI 3.2 `cookie` style passes `style: 'cookie'` in `styles`. Send its values without percent-encoding. See [Serialize parameters](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/write-your-client#serialize-parameters).

### Security requirements

A `security` entry is an array when one requirement needs several schemes together, such as an API key and a session cookie. Send all of them, or skip the entry.

An `oauth2` scheme now also passes `flows` and `metadataUrl`, and an `openIdConnect` scheme passes `url`. Accept them on your auth type:

```typescript
export type Auth = {
  type: string
  scheme?: string
  name?: string
  in?: string
  scopes?: Array<string>
  flows?: Record<string, Record<string, string>>
  metadataUrl?: string
  url?: string
}
```

### Status ranges

A status range is written in lower case in generated names and keys. Rename the imports, and the range keys in a responses record or `validator.error` map you wrote by hand. An upper-case key such as `'2XX'` is no longer read:

```diff
- import type { ListPetsStatus4XX } from './gen/types/ListPets'
+ import type { ListPetsStatus4xx } from './gen/types/ListPets'
```

### Tag folders

With `group: { type: 'tag' }`, a tag whose OpenAPI 3.2 `parent` is `store` now writes to `store/payment/` instead of `payment/`. `importPath` is written into every file as given, so one relative path cannot serve files at two depths, such as `store/` and `store/payment/`. Pass `group.name` to keep one folder per tag, or set `importPath` to a package name or alias that resolves from every folder:

```typescript
pluginClient({ importPath: '../../../client', group: { type: 'tag', name: ({ group }) => group } })
```

### Behavior changes

These compile without errors, so check them by hand:

- A path or operation with its own `servers` passes that server as `baseURL` on the call. Your client must use `config.baseURL` when it is set.
- A `2xx` response key is a success, and an exact code such as `200` wins over a range listed before it.
- An XML, YAML, or CSV response is typed `string`. An image, audio, video, PDF, or `application/octet-stream` response is typed `Blob`. When every success content type is binary, the call passes `parseAs: 'blob'`.
- An operation whose only success content type is JSON Lines returns a `StreamResult`, not the whole body as one string.

### Return type

`returnType` is new and defaults to `'plain'`, so existing code keeps working. With `'full'`, generated calls wrap the result in `withUnwrap`, so your module must also export `withUnwrap`, `resolveThrowOnError`, and the `Unwrappable` type. With `'data'`, calls resolve to the body when `throwOnError` is `true`, and to the full result when it is `false`. Your module must then export `unwrapResult`, `resolveThrowOnError`, and the `UnwrappedResult` type. A stream operation also imports `StreamOptions` with `StreamResult` for `'full'`, or with `UnwrappedStreamResult` for `'data'`. Both modes need a `StreamResult` with `data` and `error`, as the one in `@kubb/plugin-client/templates/core.ts` has, so the minimal type above is not enough. `@kubb/plugin-client/templates/core.ts` exports all of these. See [returnType](https://kubb.dev/extensions/kubb-labs/plugin-client/options#returntype).

## Notes

- Requires `kubb` 5.18.4 or later (stated in the official upgrade steps).
- Migration (5.x → 6.0): a generated function now calls `client<TResponses, ThrowOnError>(config)` (make `client` generic) and streams through `client.stream`; `toEventStream` and `EventStreamResult` are removed; `RequestConfig` gains `contentType`, `parseAs` (replacing `responseType`), `eventShape`, `cookies`, and `styles`; a `security` entry may be an array of schemes and `oauth2` / `openIdConnect` entries carry `flows` / `metadataUrl` / `url`; status ranges are written in lower case (`ListPetsStatus4xx`); with `group: { type: 'tag' }` a tag whose `parent` is `store` writes to `store/payment/`; `returnType` is new and defaults to `'plain'` (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6 (`@kubb/plugin-client@6.0.1`, retrieved 2026-11-14)

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
