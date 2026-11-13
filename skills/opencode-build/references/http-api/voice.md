---
source: https://opencode.ai/docs/api/#tag-voice
---

# Voice

Experimental voice endpoints: list voice models and create a server-brokered voice session.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/experimental/voice/models` | `experimental.voice.models` | List voice models |
| POST | `/api/experimental/voice/session` | `experimental.voice.session` | Create voice session |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/experimental/voice/session",
  "tags": [
    "voice"
  ],
  "operationId": "experimental.voice.session",
  "parameters": [],
  "security": [],
  "responses": {
    "200": {
      "description": "VoiceSessionResponse",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/VoiceSessionResponse"
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
    },
    "404": {
      "description": "LocationNotFoundError",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/LocationNotFoundErrorEncoded"
          }
        }
      }
    },
    "503": {
      "description": "ServiceUnavailableError",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/ServiceUnavailableErrorEncoded"
          }
        }
      }
    }
  },
  "description": "Create a server-brokered voice session using the server's configured provider credentials and return the WebRTC SDP answer or WebSocket ephemeral token.",
  "summary": "Create voice session",
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "properties": {
            "model": {
              "type": "string"
            },
            "session": {
              "anyOf": [
                {
                  "type": "object"
                },
                {
                  "type": "null"
                }
              ]
            },
            "transport": {
              "$ref": "#/components/schemas/VoiceTransportInput"
            }
          },
          "required": [
            "model",
            "transport"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": true
  }
}
```

Both operations take no parameters and return 400 `InvalidRequestErrorEncoded`, 401 `UnauthorizedErrorEncoded`, 404 `LocationNotFoundErrorEncoded`, 503 `ServiceUnavailableErrorEncoded` in addition to the 200 response below.

## Options / Props

### experimental.voice.models

List supported voice models, their transports, and whether the server has a usable API key for each provider.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | VoiceModelsResponse | `VoiceModelsResponse` |

### experimental.voice.session

Create a server-brokered voice session using the server's configured provider credentials and return the WebRTC SDP answer or WebSocket ephemeral token.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| model | string | yes | — |
| session | object \| null | no | — |
| transport | `VoiceTransportInput` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | VoiceSessionResponse | `VoiceSessionResponse` |

## Related

- [model.md](./model.md)
- [overview.md](./overview.md)
