---
source: https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation
---

# Elicitation Requests

Form mode and URL mode `elicitation/create` requests and their results.

Form mode request:

```json
{
  "method": "elicitation/create",
  "params": {
    "mode": "form",
    "message": "Please provide your GitHub username",
    "requestedSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "GitHub Username",
          "description": "Your GitHub username"
        }
      },
      "required": ["name"]
    }
  }
}
```

Form mode params with several fields:

```json
{
  "mode": "form",
  "message": "Please provide your contact information",
  "requestedSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Your full name"
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "Your email address"
      },
      "age": {
        "type": "number",
        "minimum": 18,
        "description": "Your age"
      }
    },
    "required": ["name", "email"]
  }
}
```

Result with user input:

```json
{
  "action": "accept",
  "content": {
    "name": "Monalisa Octocat",
    "email": "octocat@github.com",
    "age": 30
  }
}
```

URL mode params (sensitive data, handled out of band):

```json
{
  "mode": "url",
  "url": "https://mcp.example.com/ui/set_api_key",
  "message": "Please provide your API key to continue."
}
```

URL mode result (no `content`):

```json
{
  "action": "accept"
}
```

## Notes

- Reproduced from `schema/2026-07-28/examples/Elicit*` (tag `2026-07-28`).
- Replaced in 2026-07-28: elicitation is delivered to the client inside an MRTR `InputRequiredResult`; `notifications/elicitation/complete` and `elicitationId` are removed.
- Sensitive data (API keys, credentials) belongs in URL mode, not form mode.
