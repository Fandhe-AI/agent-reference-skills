---
source: https://fastify.dev/docs/latest/Reference/Lifecycle/
---

# Lifecycle

Target: Fastify v5.12.1. Internal request-processing flow of Fastify — how a request moves through routing, hooks, parsing, validation, and handler execution before the response is sent.

## Signature / Usage

The diagram below shows the internal lifecycle of Fastify. The right branch of each section shows the next phase of the lifecycle. The left branch shows the corresponding error code generated if the parent throws an error. All errors are automatically handled by Fastify.

```
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
```

When `handlerTimeout` (see server reference) is configured, a timer starts after routing. If the response is not sent within the allowed time, `request.signal` is aborted and a `503 Service Unavailable` error is sent. The timer is cancelled when the response completes or when `reply.hijack()` is called.

Before or during the `User Handler`, `reply.hijack()` can be called to:

- Prevent Fastify from running subsequent hooks and the user handler
- Prevent Fastify from sending the response automatically

If `reply.raw` is used to send a response, `onResponse` hooks will still be executed.

### Reply Lifecycle

When the user handles the request, the result may be:

- In an async handler: it returns a payload or throws an `Error`
- In a sync handler: it sends a payload or an `Error` instance

If the reply is hijacked, all subsequent steps are skipped. Otherwise, the data flows as follows:

```
                        ★ schema validation Error
                                    │
                                    └─▶ schemaErrorFormatter
                                               │
                          reply sent ◀── JSON ─┴─ Error instance
                                                      │
                                                      │         ★ throw an Error
                     ★ send or return                 │                 │
                            │                         │                 │
                            │                         ▼                 │
       reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook ◀───────┘
                                                      │
                                 reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler
                                                                                │
                                                                                └─▶ reply sent
```

`reply sent` means the JSON payload will be serialized by one of the following:

- The reply serializer (`setReplySerializer`) if set
- The serializer compiler (`setSerializerCompiler`) if a JSON schema is set for the HTTP status code
- The default `JSON.stringify` function

### Shutdown Lifecycle

When `fastify.close()` is called, the server goes through a graceful shutdown sequence involving `preClose` hooks, connection draining, and `onClose` hooks. See `application-hooks.md` and the server `close()` method documentation for the full step-by-step lifecycle.

## Notes

- This diagram is not JS-executable code; it documents the v5.12.1 internal request flow as published in the official docs.

## Related

- [request-hooks.md](./request-hooks.md)
- [application-hooks.md](./application-hooks.md)
- [route-level-hooks.md](./route-level-hooks.md)
