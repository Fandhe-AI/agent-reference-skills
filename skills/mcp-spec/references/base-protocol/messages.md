---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#messages
---

# Messages

All messages between MCP clients and servers **MUST** follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines requests, responses (result and error), and notifications.

## Signature / Usage

Request (sent from the client to the server, to initiate an operation):

```typescript
{
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notification (sent from the client to the server or vice versa, as a one-way message):

```typescript
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

## Notes

- Requests **MUST** include a string or integer ID.
- Unlike base JSON-RPC, the ID **MUST NOT** be `null`.
- The request ID **MUST NOT** match the ID of any other request the sender has issued and not yet received a response for.
- The receiver of a notification **MUST NOT** send a response. Notifications **MUST NOT** include an ID.
- All implementations **MUST** support the base protocol, versioning, and the message patterns. Other components (authorization, server features, client features, utilities) **MAY** be implemented based on the specific needs of the application.
- Message patterns: Request and Response; Multi Round-Trip Requests (MRTR), where a server requires additional client input (sampling, elicitation, or roots) to complete a request; Subscribe and Notify, where a client subscribes to a stream of notifications from the server.
- Auth: implementations using an HTTP-based transport **SHOULD** conform to the Authorization framework; implementations using STDIO transport **SHOULD NOT** follow it and instead retrieve credentials from the environment. Clients and servers **MAY** negotiate their own custom authentication and authorization strategies.
- Schema: the TypeScript schema is the source of truth for all protocol messages and structures; the JSON Schema is automatically generated from it for use with automated tooling.

## Related

- [Responses and Error Codes](./responses-and-errors.md)
- [Statelessness](./statelessness.md)
- [_meta](./meta-field.md)
