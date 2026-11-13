---
source: https://opencode.ai/docs/api/#tag-event
---

# Event

Server-sent event stream of native events and plugin RPC events across all server locations.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/event` | `event.subscribe` | Subscribe to events |

Excerpt from openapi.json (v2.3.0), `security` through `summary` (contiguous range)

```json
    "security": [],
    "responses": {
      "200": {
        "description": "Success",
        "content": {
          "text/event-stream": {
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "event": {
                  "type": "string"
                },
                "data": {
                  "$ref": "#/components/schemas/V2EventEncoded"
                }
              },
              "required": [
                "event",
                "data"
              ],
              "additionalProperties": false
            },
            "x-effect-stream": {
              "encoding": "sse",
              "causeSchema": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "_tag": {
                          "type": "string",
                          "enum": [
                            "Fail"
                          ]
                        },
                        "error": {
                          "not": {}
                        }
                      },
                      "required": [
                        "_tag",
                        "error"
                      ],
                      "additionalProperties": false
                    },
                    {
                      "type": "object",
                      "properties": {
                        "_tag": {
                          "type": "string",
                          "enum": [
                            "Die"
                          ]
                        },
                        "defect": {}
                      },
                      "required": [
                        "_tag",
                        "defect"
                      ],
                      "additionalProperties": false
                    },
                    {
                      "type": "object",
                      "properties": {
                        "_tag": {
                          "type": "string",
                          "enum": [
                            "Interrupt"
                          ]
                        },
                        "fiberId": {
                          "anyOf": [
                            {
                              "type": "number"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "_tag",
                        "fiberId"
                      ],
                      "additionalProperties": false
                    }
                  ]
                }
              },
              "errorSchema": {
                "not": {}
              },
              "failureEvent": "effect/http-api/stream/failure"
            }
          }
        }
      },
      "400": {
        "description": "InvalidRequestError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InvalidRequestErrorEncoded"
            }
          }
        }
      },
      "401": {
        "description": "UnauthorizedError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UnauthorizedErrorEncoded"
            }
          }
        }
      }
    },
    "description": "Subscribe to native events and plugin RPC events across all server locations. Volatile by contract: a slow consumer overflows and fails the stream, and events during disconnection are missed.",
    "summary": "Subscribe to events"
```

## Options / Props

### event.subscribe

Subscribe to native events and plugin RPC events across all server locations. Volatile by contract: a slow consumer overflows and fails the stream, and events during disconnection are missed.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| types | query | one event type string, one string matching `^rpc\.[\s\S]*?$`, or an array of either | no | Only send events of these types, plus the initial server.connected event. When omitted, all events are sent. |

Accepted `types` enum values (verbatim from the openapi.json `enum`):

```json
"location.shutdown",
"models-dev.refreshed",
"credential.updated",
"credential.switched",
"integration.updated",
"provider.updated",
"model.updated",
"agent.updated",
"session.created",
"session.agent.selected",
"session.model.selected",
"session.moved",
"session.renamed",
"session.metadata.updated",
"session.permissions",
"session.viewed",
"session.archived",
"session.unarchived",
"session.usage.updated",
"session.deleted",
"session.forked",
"session.inbox.delivered",
"session.inbox.enqueued",
"session.inbox.cancelled",
"session.inbox.delivery.changed",
"session.execution.started",
"session.execution.succeeded",
"session.execution.failed",
"session.execution.interrupted",
"session.instructions.updated",
"session.synthetic",
"session.skill.activated",
"session.shell.started",
"session.shell.ended",
"session.step.started",
"session.step.first-token",
"session.step.streamed",
"session.step.ended",
"session.step.failed",
"session.text.started",
"session.text.delta",
"session.text.ended",
"session.reasoning.started",
"session.reasoning.delta",
"session.reasoning.ended",
"session.tool.input.started",
"session.tool.input.delta",
"session.tool.input.ended",
"session.tool.called",
"session.tool.progress",
"session.tool.success",
"session.tool.failed",
"session.retry.scheduled",
"session.compaction.started",
"session.compaction.delta",
"session.compaction.ended",
"session.compaction.failed",
"session.revert.staged",
"session.revert.cleared",
"session.revert.committed",
"filesystem.changed",
"reference.updated",
"permission.asked",
"permission.replied",
"plugin.updated",
"project.updated",
"worktree.updated",
"worktree.resolved",
"command.updated",
"config.updated",
"skill.updated",
"pty.created",
"pty.updated",
"pty.exited",
"pty.deleted",
"persistent-pty.added",
"persistent-pty.removed",
"persistent-pty.updated",
"shell.created",
"shell.exited",
"shell.deleted",
"form.created",
"form.replied",
"form.cancelled",
"websearch.updated",
"artifact.updated",
"session.status",
"session.idle",
"tui.prompt.append",
"tui.command.execute",
"tui.toast.show",
"tui.session.select",
"installation.updated",
"installation.update-available",
"vcs.branch.updated",
"mcp.status.changed",
"mcp.resources.changed",
"experimental.mcp.event"
```

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success (`text/event-stream`) | object `{ id?: string \| null, event: string, data: V2EventEncoded }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

## Notes

- The 200 response carries an `x-effect-stream` extension (`encoding: "sse"`, `failureEvent: "effect/http-api/stream/failure"`). `Effect` here is the `effect` npm package, unrelated to React's `useEffect`.

## Related

- [rpc.md](./rpc.md)
- [overview.md](./overview.md)
