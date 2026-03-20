# Diagnostics

Pino provides Node.js [tracing channel](https://nodejs.org/docs/latest/api/diagnostics_channel.html#tracingchannel-channels) events that allow insight into the internal workings of the library during log serialization.

## Tracing Channel Events

### `tracing:pino_asJson:start`

Emitted when the final serialization process of logs is started.

**Payload fields:**

| Field | Description |
|-------|-------------|
| `instance` | The Pino instance associated with the function |
| `arguments` | The arguments passed to the function |

### `tracing:pino_asJson:end`

Emitted at the end of the final serialization process.

**Payload fields:**

| Field | Description |
|-------|-------------|
| `instance` | The Pino instance associated with the function |
| `arguments` | The arguments passed to the function |
| `result` | The finalized, newline-delimited log line as a string |

## Notes

- These events use the Node.js `diagnostics_channel` TracingChannel API.
- The `start` event fires before serialization and the `end` event fires after, providing timing and inspection capabilities.
- The `result` field in the `end` event contains the complete, ready-to-write log line.

## Related

- [Transports](./transports.md)
- [API options](../api/options.md)
