<!-- source: https://platform.claude.com/docs/en/managed-agents/vaults / last verified: 2026-08-07 -->

# Register a Vault Credential and Use It in a Session

Create a vault, register a static-bearer credential for an MCP server, and attach the vault to a session so the agent authenticates automatically.

```python
client = Anthropic()

vault = client.beta.vaults.create(
    display_name="Alice",
    metadata={"external_user_id": "usr_abc123"},
)

credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="Linear API key",
    auth={
        "type": "static_bearer",
        "mcp_server_url": "https://mcp.linear.app/mcp",
        "token": "lin_api_your_linear_key",
    },
)

session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    vault_ids=[vault.id],
    title="Alice's Slack digest",
)
```

## Notes

- `auth.type` also supports `"mcp_oauth"` (OAuth 2.0 MCP credential, with an optional `refresh` block for automatic token refresh) and `"environment_variable"` (keyed by `secret_name`, stored as an opaque sandbox placeholder and substituted with the real secret only at egress; scoped by `networking.allowed_hosts` and `injection_location`). Max 20 credentials per vault; `mcp_server_url`/`secret_name` must be unique per vault (409 on duplicate); structural fields are immutable after creation.
- MCP credential matching normalizes `mcp_server_url` against the agent's declared `mcp_servers[].url`; no match falls back to an unauthenticated connection, and the first vault with a match wins when multiple `vault_ids` are passed.
- Credentials are re-resolved periodically so rotation/archival/deletion propagates to running sessions without restart; subscribe to `vault.archived`/`vault.deleted`/`vault_credential.*` webhooks for lifecycle notifications.
- `environment_variable` credentials are not yet supported with self-hosted sandboxes; substitution is outbound-only.
- Example from the Claude API (platform.claude.com) `managed-agents/vaults` page.
