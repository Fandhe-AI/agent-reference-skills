---
source: https://opencode.ai/docs/api/#tag-session
---

# Session API: forms

HTTP API operations of the `session` tag for listing, creating, reading, cancelling and answering session forms.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/session/{sessionID}/form` | `session.form.list` | List session forms |
| POST | `/api/session/{sessionID}/form` | `session.form.create` | Create session form |
| GET | `/api/session/{sessionID}/form/{formID}` | `session.form.get` | Get session form |
| DELETE | `/api/session/{sessionID}/form/{formID}` | `session.form.cancel` | Cancel form |
| POST | `/api/session/{sessionID}/form/{formID}/reply` | `session.form.reply` | Reply to form |

Excerpt from openapi.json (v2.3.0), operation `session.form.cancel`:

```json
  {
    "method": "DELETE",
    "path": "/api/session/{sessionID}/form/{formID}",
    "tags": [
      "session"
    ],
    "operationId": "session.form.cancel",
    "parameters": [
      {
        "name": "sessionID",
        "in": "path",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      {
        "name": "formID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Form.ID"
        },
        "required": true
      },
      {
        "name": "message",
        "in": "query",
        "schema": {
          "type": "string"
        },
        "required": false
      }
    ],
    "security": [],
    "responses": {
      "204": {
        "description": "<No Content>"
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
        "description": "SessionNotFoundError | FormNotFoundError | LocationNotFoundError",
        "content": {
          "application/json": {
            "schema": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/SessionNotFoundErrorEncoded"
                },
                {
                  "$ref": "#/components/schemas/FormNotFoundErrorEncoded"
                },
                {
                  "$ref": "#/components/schemas/LocationNotFoundErrorEncoded"
                }
              ]
            }
          }
        }
      },
      "409": {
        "description": "FormAlreadySettledError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/FormAlreadySettledErrorEncoded"
            }
          }
        }
      }
    },
    "description": "Cancel a pending form, optionally telling the asker why it was not answered.",
    "summary": "Cancel form"
  }
```

In these operations `sessionID` is a path parameter of type string (required).

## Options / Props

### session.form.list

`GET /api/session/{sessionID}/form` — Retrieve pending forms for a session.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Form.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### session.form.create

`POST /api/session/{sessionID}/form` — Create a form for a session.

Request body (`application/json`, required): Form.CreatePayload

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Form.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### session.form.get

`GET /api/session/{sessionID}/form/{formID}` — Retrieve a form and its current state for a session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | string | yes | — |
| formID | path | Form.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Form.Detail }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| FormNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| FormNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### session.form.cancel

`DELETE /api/session/{sessionID}/form/{formID}` — Cancel a pending form, optionally telling the asker why it was not answered.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | string | yes | — |
| formID | path | Form.ID | yes | — |
| message | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| FormNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| FormNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | FormAlreadySettledError | FormAlreadySettledErrorEncoded |

### session.form.reply

`POST /api/session/{sessionID}/form/{formID}/reply` — Submit an answer to a pending form.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | string | yes | — |
| formID | path | Form.ID | yes | — |

Request body (`application/json`, required): Form.Reply

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | FormInvalidAnswerError \| InvalidRequestError | FormInvalidAnswerErrorEncoded \| InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| FormNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| FormNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | FormAlreadySettledError | FormAlreadySettledErrorEncoded |

## Notes

- Request body schemas `Form.CreatePayload` and `Form.Reply` are `$ref`s into `components.schemas` of the OpenAPI document and are not expanded here.

## Related

- [session.md](./session.md)
- [session-messages.md](./session-messages.md)
- [session-inbox-revert.md](./session-inbox-revert.md)
