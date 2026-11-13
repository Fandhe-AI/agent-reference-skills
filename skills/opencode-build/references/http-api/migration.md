---
source: https://opencode.ai/docs/api/#tag-migration
---

# Migration

Progress of the V1 to V2 session history migration.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/experimental/migration/v1` | `experimental.migration.v1.status` | Get V1 migration status |

Excerpt from openapi.json (v2.3.0), `security` through the 200 response (contiguous range)

```json
    "security": [],
    "responses": {
      "200": {
        "description": "Success",
        "content": {
          "application/json": {
            "schema": {
              "anyOf": [
                {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "required",
                        "completed"
                      ]
                    }
                  },
                  "required": [
                    "status"
                  ],
                  "additionalProperties": false
                },
                {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "running"
                      ]
                    },
                    "progress": {
                      "type": "object",
                      "properties": {
                        "label": {
                          "type": "string"
                        },
                        "numerator": {
                          "anyOf": [
                            {
                              "type": "integer",
                              "minimum": 0,
                              "maximum": 9007199254740991
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "denominator": {
                          "anyOf": [
                            {
                              "type": "integer",
                              "minimum": 0,
                              "maximum": 9007199254740991
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "label"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "required": [
                    "status",
                    "progress"
                  ],
                  "additionalProperties": false
                },
                {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "error"
                      ]
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "status",
                    "error"
                  ],
                  "additionalProperties": false
                }
              ]
            }
          }
        }
      },
```

## Options / Props

### experimental.migration.v1.status

Return the progress of the V1 to V2 session history migration.

Parameters: none.

200 response is one of:

| status | Additional fields |
|--------|-------------------|
| `required` or `completed` | — |
| `running` | `progress`: `{ label: string, numerator?: integer \| null, denominator?: integer \| null }` |
| `error` | `error`: string |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | anyOf (above) |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

## Related

- [overview.md](./overview.md)
