---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#error-handling
---

# Authorization Error Handling and Scope Challenge

HTTP status codes for authorization errors, `insufficient_scope` challenges at runtime, and the client step-up authorization flow.

## Signature / Usage

```http
HTTP/1.1 403 Forbidden
WWW-Authenticate: Bearer error="insufficient_scope",
                         scope="files:write",
                         resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource",
                         error_description="File write permission required for this operation"
```

Servers **MUST** return appropriate HTTP status codes for authorization errors.

## Options / Props

| Status Code | Description | Usage |
| --- | --- | --- |
| 401 | Unauthorized | Authorization required or token invalid |
| 403 | Forbidden | Invalid scopes or insufficient permissions |
| 400 | Bad Request | Malformed authorization request |

Runtime insufficient scope response (server **SHOULD** respond with HTTP 403 and a `Bearer` `WWW-Authenticate` header):

| Parameter | Description |
| --- | --- |
| `error="insufficient_scope"` | Indicates the specific type of authorization failure |
| `scope="required_scope1 required_scope2"` | The minimum scopes needed for the operation |
| `resource_metadata` | URI of the Protected Resource Metadata document (for consistency with 401 responses) |
| `error_description` | Optional human-readable description |

## Notes

- Server scope management: servers **SHOULD** include the scopes needed to satisfy the current operation in `scope` (RFC 6750 Section 3.1). They are not required to include the client's previously granted scopes.
- Servers **SHOULD** include all scopes required for the current operation in a single challenge; challenging incrementally forces multiple authorization round-trips. Servers **SHOULD** be consistent in their scope inclusion strategy and consider user experience impact.
- Scope accumulation across operations is a client-side responsibility.
- Step-up authorization flow: clients **SHOULD** respond to scope-related errors by requesting a new access token with an increased scope set, or handle the errors in other appropriate ways. Clients acting on behalf of a user **SHOULD** attempt step-up; clients acting on their own behalf (`client_credentials` clients) **MAY** attempt it or abort immediately.
  1. Parse error information from the authorization server response or `WWW-Authenticate` header.
  2. Determine required scopes as the union of the client's previously requested scope set and the scopes from the current challenge.
  3. Initiate (re-)authorization with the determined scope set.
  4. Retry the original request with the new authorization no more than a few times, and treat repeated failure as a permanent authorization failure.
- Clients **SHOULD** implement retry limits and track scope upgrade attempts per resource and operation combination.
- Servers **MUST** account for scope hierarchies, where a broader scope implies narrower ones, when deciding whether a token is sufficient.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/index.mdx` section "Error Handling".

## Related

- [Scope Selection Strategy](./scope-selection.md)
- [Access Token Usage and Refresh Tokens](./access-token-usage.md)
- [Authorization Flow Steps](./authorization-flow.md)
