---
source: https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation
---

# Elicitation

Servers request additional information from users through the client during interactions. The client keeps control over user interaction and data sharing. Two modes exist: form mode (structured data, optional JSON schema validation, exposed to the client) and URL mode (out-of-band navigation for sensitive interactions that must not pass through the MCP client).

## Signature / Usage

Clients that support elicitation **MUST** declare the `elicitation` capability in `_meta.io.modelcontextprotocol/clientCapabilities` on each request:

```json
{
  "_meta": {
    "io.modelcontextprotocol/clientCapabilities": {
      "elicitation": {
        "form": {},
        "url": {}
      }
    }
  }
}
```

For backwards compatibility, an empty capabilities object is equivalent to declaring support for `form` mode only:

```jsonc
{
  "_meta": {
    "io.modelcontextprotocol/clientCapabilities": {
      "elicitation": {}, // Equivalent to { "form": {} }
    },
  },
}
```

Servers **MAY** request information during the processing of a client request by sending an `InputRequiredResult` containing an `elicitation/create` request. Clients declaring `elicitation` **MUST** support at least one mode; servers **MUST NOT** send requests with modes the client does not support.

Response actions (apply to both modes):

```json
{
  "action": "accept", // or "decline" or "cancel"
  "content": {
    "propertyName": "value",
    "anotherProperty": 42
  }
}
```

## Options / Props

All elicitation requests **MUST** include:

| Name | Type | Options | Description |
|------|------|---------|-------------|
| `mode` | string | `form`, `url` | Mode of the elicitation. Optional for form mode (defaults to `"form"` if omitted) |
| `message` | string | | Human-readable message explaining why the interaction is needed |

Response actions:

| Action | Meaning | `content` |
|--------|---------|-----------|
| `accept` | User explicitly approved and submitted | Form mode: submitted data matching the requested schema. URL mode: omitted |
| `decline` | User explicitly declined (e.g. clicked "Reject", "No") | Typically omitted |
| `cancel` | User dismissed without an explicit choice (e.g. closed the dialog, pressed Escape, browser failed to load) | Typically omitted |

Servers handle each: accept - process the data; decline - handle explicit decline (e.g. offer alternatives); cancel - handle dismissal (e.g. prompt again later).

## Notes

- Servers **MUST NOT** use form mode to request sensitive information such as passwords, API keys, access tokens, or payment credentials; they **MUST** use URL mode for such interactions. General contact or profile information (name, email, username) is not categorically prohibited.
- Clients **MUST**: provide UI that makes clear which server is requesting information; respect user privacy and provide clear decline and cancel options; for form mode, allow users to review and modify responses before sending; for URL mode, clearly display the target domain/host and gather user consent before navigation.
- For backwards compatibility, servers **MAY** omit `mode` for form mode requests; clients **MUST** treat requests without `mode` as form mode.
- Replaced in 2026-07-28: server-initiated `elicitation/create` is delivered via the Multi Round-Trip pattern (`InputRequiredResult.inputRequests` / `inputResponses`).
- Removed in 2026-07-28: `notifications/elicitation/complete` and `elicitationId` (per the 2026-07-28 changelog summary). For URL mode the server determines completion from the echoed `requestState` (or its own stored state) on the retried request.
- Statefulness: with the multi round-trip mechanism, elicitation does not require the server to maintain state about users. If state is stored, servers **MUST** securely associate it with individual users; storage **MUST** be protected against unauthorized access; for remote servers, user identification **MUST** be derived from credentials acquired via MCP authorization when possible (e.g. `sub` claim).
- Error handling: servers **SHOULD NOT** assume requests always succeed and **MUST** handle the user declining or cancelling, or the client failing to process the request.
- Security: servers **MUST** bind elicitation requests to the client and user identity; clients **MUST** clearly indicate which server is requesting information, **SHOULD** implement user approval controls, **SHOULD** allow declining at any time, and **SHOULD** make clear what information is requested and why. Servers **MUST NOT** rely on client-provided user identification without verification (e.g. do not treat "I am joe@example.com" as authoritative; rely on authorization).
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/client/elicitation.mdx`, sections User Interaction Model, Capabilities, Response Actions, Implementation Considerations, Error Handling).

## Related

- [Form Mode Elicitation](./elicitation-form-mode.md)
- [URL Mode Elicitation](./elicitation-url-mode.md)
- [Multi Round-Trip Requests (MRTR)](../patterns/mrtr.md)
- [Sampling (Deprecated)](./sampling.md)
