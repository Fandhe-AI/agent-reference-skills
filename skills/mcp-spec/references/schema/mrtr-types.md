---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#multi-round-trip
---

# Multi Round-Trip types

Schema types for Multi Round-Trip Requests (MRTR): `InputRequiredResult`, `InputRequests`, `InputResponses`, and `InputResponseRequestParams`. A server answers a client request with `resultType: "input_required"` instead of issuing its own request; the client retries with `inputResponses` and `requestState`.

## Signature / Usage

```ts
/** @internal */
export type InputRequest =
  CreateMessageRequest | ListRootsRequest | ElicitRequest;

/** @internal */
export type InputResponse =
  CreateMessageResult | ListRootsResult | ElicitResult;

/**
 * A map of server-initiated requests that the client must fulfill.
 * Keys are server-assigned identifiers; values are the request objects.
 *
 * @category Multi Round-Trip
 */
export interface InputRequests {
  [key: string]: InputRequest;
}

/**
 * A map of client responses to server-initiated requests.
 * Keys correspond to the keys in the {@link InputRequests} map;
 * values are the client's result for each request.
 *
 * @category Multi Round-Trip
 */
export interface InputResponses {
  [key: string]: InputResponse;
}

/**
 * An InputRequiredResult sent by the server to indicate that additional input is needed
 * before the request can be completed.
 *
 * At least one of `inputRequests` or `requestState` MUST be present.
 *
 * @category Multi Round-Trip
 */
export interface InputRequiredResult extends Result {
  /* Requests issued by the server that must be complete before the
   * client can retry the original request.
   */
  inputRequests?: InputRequests;
  /* Request state to be passed back to the server when the client
   * retries the original request.
   * Note: The client must treat this as an opaque blob; it must not
   * interpret it in any way.
   */
  requestState?: string;
}

/* Request parameter type that includes input responses and request state.
 * These parameters may be included in any client-initiated request.
 */
export interface InputResponseRequestParams extends RequestParams {
  /* New field to carry the responses for the server's requests from the
   * InputRequiredResult message.  For each key in the response's inputRequests
   * field, the same key must appear here with the associated response.
   */
  inputResponses?: InputResponses;
  /* Request state passed back to the server from the client.
   */
  requestState?: string;
}
```

Result with request state only (`examples/InputRequiredResult/input-required-result-with-request-state-only.json`, load shedding):

```json
{
  "resultType": "input_required",
  "requestState": "eyJwcm9ncmVzcyI6IjUwJSIsInN0YXRlIjoicHJvY2Vzc2luZyJ9"
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `resultType` | `"input_required"` | yes | Discriminator inherited from `Result` |
| `inputRequests` | `InputRequests` | at least one of `inputRequests` / `requestState` | Map of server-assigned keys to `sampling/createMessage`, `roots/list`, or `elicitation/create` requests |
| `requestState` | `string` | at least one of the two | Opaque blob; the client MUST NOT interpret it |
| `inputResponses` | `InputResponses` | no | On retry; each key from `inputRequests` must appear with its response |

## Notes

- Replaced in 2026-07-28: MRTR (SEP-2322) replaces server-initiated requests sent over the connection; the types `CreateMessageRequest`, `ListRootsRequest`, and `ElicitRequest` now appear only as `InputRequest` values.
- `InputRequiredResult` is a possible result only where the schema says so: `tools/call`, `prompts/get`, and `resources/read` response types (`CallToolResultResponse`, `GetPromptResultResponse`, `ReadResourceResultResponse`).
- `inputRequests` may be absent when `requestState` alone is sent.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [tools/* types](./tools-types.md)
- [sampling/createMessage types](./sampling-types.md)
- [elicitation/create types](./elicitation-types.md)
- [roots/list types](./roots-types.md)
