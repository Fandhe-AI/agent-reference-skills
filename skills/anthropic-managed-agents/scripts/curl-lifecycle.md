<!-- source: https://platform.claude.com/docs/en/api/beta/agents/create.md, https://platform.claude.com/docs/en/api/beta/environments/create.md, https://platform.claude.com/docs/en/api/beta/sessions/create.md, https://platform.claude.com/docs/en/api/beta/sessions/events/send.md, https://platform.claude.com/docs/en/api/beta/sessions/events/stream.md, https://platform.claude.com/docs/en/managed-agents/session-operations, https://platform.claude.com/docs/en/api/beta/sessions/archive.md, https://platform.claude.com/docs/en/api/beta/sessions/delete.md, https://platform.claude.com/docs/en/managed-agents/quickstart / last verified: 2026-08-07 -->

# curl-lifecycle

Copy-pasteable `curl` calls covering the full Managed Agents lifecycle: create an agent, create an environment, start a session, send/stream events, then archive or delete the session. All examples assume `ANTHROPIC_API_KEY` is exported and require the `anthropic-beta: managed-agents-2026-04-01` header.

## Create an Agent

```bash
curl https://api.anthropic.com/v1/agents \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d "{
          \"model\": \"claude-sonnet-4-6\",
          \"name\": \"My First Agent\",
          \"description\": \"A general-purpose starter agent.\",
          \"system\": \"You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user's task end to end.\",
          \"tools\": [
            { \"type\": \"agent_toolset_20260401\" }
          ]
        }"
```

`agent_toolset_20260401` enables the full built-in toolset: bash / read / write / edit / glob / grep / web_fetch / web_search.

## Create a Cloud Environment

```bash
curl https://api.anthropic.com/v1/environments \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "name": "python-data-analysis",
        "config": {
          "type": "cloud",
          "networking": {"type": "limited", "allow_package_managers": true, "allowed_hosts": ["api.example.com"]},
          "packages": {"pip": ["pandas", "numpy"]}
        },
        "description": "Python environment with data-analysis packages."
      }'
```

## Start a Session

```bash
curl https://api.anthropic.com/v1/sessions \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "agent": "agent_011CZkYpogX7uDKUyvBTophP",
        "environment_id": "env_011CZkZ9X2dpNyB7HsEFoRfW",
        "title": "Order #1234 inquiry"
      }'
```

`agent` takes an agent ID (pins the latest version). Use the returned `session.id` as `$SESSION_ID` in the following commands.

## Send an Event to a Session (user.message)

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID/events \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "events": [
            {
              "content": [
                {
                  "text": "Where is my order #1234?",
                  "type": "text"
                }
              ],
              "type": "user.message"
            }
          ]
        }'
```

## Stream Session Events (SSE)

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID/events/stream \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

Returns a `text/event-stream` SSE connection. In practice, open this stream before calling send-events (avoids a race condition). Opt into low-latency preview frames with the repeatable `event_deltas` query parameter (`agent.message` / `agent.thinking`).

## Retrieve a Session (polling)

```bash
curl -fsSL "https://api.anthropic.com/v1/sessions/$SESSION_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

Check the `status` field: `idle` / `running` / `rescheduling` / `terminated`.

## Archive a Session

> **警告**: A `running` session cannot be archived — send a `user.interrupt` event first. Archiving blocks new events while preserving history.

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID/archive \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Delete a Session

> **警告**: Irreversible. Permanently removes the session's record, event history, and sandbox. A `running` session cannot be deleted. Files the session produced are deleted with the sandbox (files uploaded via the Files API are unaffected).

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```
