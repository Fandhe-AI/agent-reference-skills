---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#progressnotification
---

# Request-scoped notification types

Schema types for `notifications/cancelled`, `notifications/progress`, and `notifications/message` (logging, Deprecated), plus the aggregate `ClientNotification` / `ServerNotification` unions.

## Signature / Usage

```ts
export interface CancelledNotificationParams extends NotificationParams {
  /**
   * The ID of the request to cancel.
   *
   * This MUST correspond to the ID of a request the client previously issued.
   */
  requestId: RequestId;

  /** An optional string describing the reason for the cancellation. This MAY be logged or presented to the user. */
  reason?: string;
}

/**
 * This notification is sent by the client to indicate that it is cancelling a request it previously issued.
 *
 * On stdio, the server also sends this notification, solely to terminate a {@link SubscriptionsListenRequest | subscriptions/listen} stream: it references the ID of the `subscriptions/listen` request that opened the stream. Servers MUST NOT use this notification to cancel any other request.
 *
 * The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
 *
 * This notification indicates that the result will be unused, so any associated processing SHOULD cease.
 */
export interface CancelledNotification extends JSONRPCNotification {
  method: "notifications/cancelled";
  params: CancelledNotificationParams;
}

export interface ProgressNotificationParams extends NotificationParams {
  /** The progress token which was given in the initial request, used to associate this notification with the request that is proceeding. */
  progressToken: ProgressToken;
  /** The progress thus far. This should increase every time progress is made, even if the total is unknown. */
  progress: number;
  /** Total number of items to process (or total progress required), if known. */
  total?: number;
  /** An optional message describing the current progress. */
  message?: string;
}

/** An out-of-band notification used to inform the receiver of a progress update for a long-running request. */
export interface ProgressNotification extends JSONRPCNotification {
  method: "notifications/progress";
  params: ProgressNotificationParams;
}

/**
 * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
 */
export interface LoggingMessageNotificationParams extends NotificationParams {
  /** The severity of this log message. */
  level: LoggingLevel;
  /** An optional name of the logger issuing this message. */
  logger?: string;
  /** The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here. */
  data: unknown;
}

/**
 * JSONRPCNotification of a log message passed from server to client. The client opts in by setting `"io.modelcontextprotocol/logLevel"` in a request's `_meta`.
 *
 * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
 */
export interface LoggingMessageNotification extends JSONRPCNotification {
  method: "notifications/message";
  params: LoggingMessageNotificationParams;
}

/**
 * The severity of a log message.
 *
 * These map to syslog message severities, as specified in RFC-5424:
 * https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1
 *
 * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
 */
export type LoggingLevel =
  | "debug"
  | "info"
  | "notice"
  | "warning"
  | "error"
  | "critical"
  | "alert"
  | "emergency";

/** @internal */
export type ClientNotification = CancelledNotification;

/** @internal */
export type ServerNotification =
  | CancelledNotification
  | ProgressNotification
  | LoggingMessageNotification
  | ResourceUpdatedNotification
  | ResourceListChangedNotification
  | ToolListChangedNotification
  | PromptListChangedNotification
  | SubscriptionsAcknowledgedNotification;
```

Progress (`examples/ProgressNotification/progress-message.json`):

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": {
    "progressToken": "oivaizmir",
    "progress": 50,
    "total": 100,
    "message": "Reticulating splines..."
  }
}
```

Cancellation (`examples/CancelledNotification/user-requested-cancellation.json`):

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/cancelled",
  "params": {
    "requestId": "123",
    "reason": "User requested cancellation"
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requestId` | `RequestId` | yes (cancelled) | Request to cancel |
| `reason` | `string` | no (cancelled) | Optional reason |
| `progressToken` | `ProgressToken` | yes (progress) | Token from request `_meta.progressToken` |
| `progress` | `number` | yes (progress) | Should increase on every update |
| `total` | `number` | no (progress) | Total, if known |
| `level` | `LoggingLevel` | yes (message) | Log severity |
| `data` | `unknown` | yes (message) | Log payload |

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Logging, `notifications/message`, `LoggingLevel`, and the `io.modelcontextprotocol/logLevel` `_meta` key (SEP-2577).
- Removed in 2026-07-28: `logging/setLevel`, replaced by the `_meta` log-level key; `ping` and `notifications/initialized` are also removed.
- Progress notifications require a `progressToken` in the originating request's `_meta`; the receiver is not obligated to send them.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives and `@TJS-type` tags omitted.

## Related

- [Common Types](./common-types.md)
- [subscriptions/listen types](./subscriptions-types.md)
- [JSON-RPC types](./json-rpc.md)
