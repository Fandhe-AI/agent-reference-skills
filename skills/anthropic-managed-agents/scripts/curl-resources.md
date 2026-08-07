<!-- source: https://platform.claude.com/docs/en/api/beta/environments/delete.md, https://platform.claude.com/docs/en/api/beta/environments/archive.md, https://platform.claude.com/docs/en/api/beta/vaults/create.md, https://platform.claude.com/docs/en/api/beta/vaults/archive.md, https://platform.claude.com/docs/en/api/beta/vaults/delete.md, https://platform.claude.com/docs/en/api/beta/memory_stores/create.md, https://platform.claude.com/docs/en/api/beta/memory_stores/archive.md, https://platform.claude.com/docs/en/api/beta/memory_stores/delete.md, https://platform.claude.com/docs/en/api/beta/deployments/create.md, https://platform.claude.com/docs/en/api/beta/deployments/pause.md, https://platform.claude.com/docs/en/api/beta/deployments/unpause.md, https://platform.claude.com/docs/en/api/beta/deployments/run.md, https://platform.claude.com/docs/en/api/beta/deployments/archive.md / last verified: 2026-08-07 -->

# curl-resources

Copy-pasteable `curl` calls for the four supporting resources: environments, vaults (credentials), memory stores, and deployments. All examples assume `ANTHROPIC_API_KEY` is exported. Environments / vaults / deployments require `anthropic-beta: managed-agents-2026-04-01`; memory stores require `anthropic-beta: agent-memory-2026-07-22` instead (the two beta headers cannot be combined on memory-store endpoints).

## Archive an Environment

Blocks new session creation.

```bash
curl https://api.anthropic.com/v1/environments/$ENVIRONMENT_ID/archive \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Delete an Environment

> **警告**: Irreversible.

```bash
curl https://api.anthropic.com/v1/environments/$ENVIRONMENT_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Create a Vault Credential

```bash
curl https://api.anthropic.com/v1/vaults/$VAULT_ID/credentials \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "auth": {"token": "bearer_exampletoken", "mcp_server_url": "https://example-server.modelcontextprotocol.io/sse", "type": "static_bearer"},
        "display_name": "Example credential"
      }'
```

Secret values (tokens, etc.) are write-only and never appear in any subsequent GET/List/Update response.

## Archive a Vault

```bash
curl https://api.anthropic.com/v1/vaults/$VAULT_ID/archive \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Delete a Vault

> **警告**: Irreversible.

```bash
curl https://api.anthropic.com/v1/vaults/$VAULT_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Create a Memory

```bash
curl https://api.anthropic.com/v1/memory_stores/$MEMORY_STORE_ID/memories \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: agent-memory-2026-07-22' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{"content": "User prefers dark mode.", "path": "/preferences/ui.md"}'
```

## Archive a Memory Store

```bash
curl https://api.anthropic.com/v1/memory_stores/$MEMORY_STORE_ID/archive \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: agent-memory-2026-07-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Delete a Memory Store

> **警告**: Irreversible. Deletes the store and all of its memories and version history (version-level redaction is a separate operation via `memory_versions/{id}/redact`).

```bash
curl https://api.anthropic.com/v1/memory_stores/$MEMORY_STORE_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: agent-memory-2026-07-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Create a Deployment (cron schedule)

```bash
curl https://api.anthropic.com/v1/deployments \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "agent": "agent_011CZkYpogX7uDKUyvBTophP",
          "environment_id": "env_011CZkZ9X2dpNyB7HsEFoRfW",
          "name": "Daily order report",
          "initial_events": [
            { "content": [{ "text": "Compile yesterday'"'"'s orders into report.md.", "type": "text" }], "type": "user.message" }
          ],
          "schedule": { "expression": "0 9 * * 1-5", "timezone": "America/Los_Angeles", "type": "cron" }
        }'
```

## Pause a Deployment

```bash
curl https://api.anthropic.com/v1/deployments/$DEPLOYMENT_ID/pause \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Unpause a Deployment

```bash
curl https://api.anthropic.com/v1/deployments/$DEPLOYMENT_ID/unpause \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Run a Deployment Now

```bash
curl https://api.anthropic.com/v1/deployments/$DEPLOYMENT_ID/run \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

The response's `session_id` is set only on success (exactly one of `session_id`/`error` is non-null). Poll the Sessions API for the created session's own lifecycle.

## Archive a Deployment

Once archived, the cron schedule stops firing and `upcoming_runs_at` becomes empty.

```bash
curl https://api.anthropic.com/v1/deployments/$DEPLOYMENT_ID/archive \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```
