---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#access-token-usage
---

# Access Token Usage and Refresh Tokens

Requirements for presenting and validating access tokens on MCP requests, and guidance on refresh tokens.

## Signature / Usage

```http
GET /mcp HTTP/1.1
Host: mcp.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Token requirements (OAuth 2.1 Section 5 "Resource Requests"):

- The MCP client **MUST** use the `Authorization` request header field (OAuth 2.1 Section 5.1.1): `Authorization: Bearer <access-token>`.
- Authorization **MUST** be included in every HTTP request from client to server.
- Access tokens **MUST NOT** be included in the URI query string.

Token handling:

- MCP servers, as OAuth 2.1 resource servers, **MUST** validate access tokens as described in OAuth 2.1 Section 5.2.
- MCP servers **MUST** validate that access tokens were issued specifically for them as the intended audience (RFC 8707 Section 2).
- If validation fails, servers **MUST** respond per OAuth 2.1 Section 5.3. Invalid or expired tokens **MUST** receive an HTTP 401 response.
- MCP clients **MUST NOT** send tokens to the MCP server other than ones issued by the MCP server's authorization server.
- MCP servers **MUST** only accept tokens that are valid for use with their own resources, and **MUST NOT** accept or transit any other tokens.

## Options / Props

Refresh tokens:

| Party | Requirement |
| --- | --- |
| MCP client | **MUST** keep refresh tokens confidential in transit and storage (OAuth 2.1 Section 4.3) |
| MCP client | **SHOULD** include `refresh_token` in its `grant_types` client metadata |
| MCP client | **MAY** add `offline_access` to the `scope` parameter of authorization and token requests when the Authorization Server metadata contains it in `scopes_supported` |
| MCP client | **MUST NOT** assume refresh tokens will be issued; the AS retains discretion |
| MCP server | **SHOULD NOT** include `offline_access` in `WWW-Authenticate` scope or Protected Resource Metadata `scopes_supported`, as refresh tokens are not a resource requirement |

## Notes

- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/index.mdx` sections "Access Token Usage" and "Refresh Tokens".

## Related

- [Resource Parameter Implementation](./resource-parameter.md)
- [Authorization Error Handling and Scope Challenge](./authorization-errors.md)
- [Authorization Security Considerations](./authorization-security.md)
