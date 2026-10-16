# Profile Tool

Declare a read-only `get_profile` tool marked with `_meta["openai/profile"]: true` and a profile `outputSchema`, returning the profile for the current credentials.

```json
{
  "name": "get_profile",
  "description": "Return the profile represented by this request's authenticated credentials. The opaque id is unique within this app and remains unchanged across token refresh, reconnection, and display-metadata changes.",
  "inputSchema": {
    "type": "object",
    "properties": {},
    "additionalProperties": false
  },
  "outputSchema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "minLength": 1,
        "pattern": "\\S",
        "description": "Opaque profile identifier, unique within this app and unchanged across token refresh, reconnection, and display-metadata changes. Never reassigned to another profile."
      },
      "name": {
        "type": "string",
        "description": "Display name for the authenticated profile."
      },
      "email": {
        "type": "string",
        "description": "Email address for display; not used as the profile identity."
      },
      "nickname": {
        "type": "string",
        "description": "A useful label that helps users distinguish connected profiles."
      }
    },
    "required": ["id"],
    "additionalProperties": false
  },
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "openWorldHint": false
  },
  "securitySchemes": [
    {
      "type": "oauth2",
      "scopes": []
    }
  ],
  "_meta": {
    "openai/profile": true
  }
}
```

Tool result:

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"prf_8d7e4b19\",\"name\":\"Alex Chen\",\"email\":\"alex@example.com\",\"nickname\":\"Alex — Moonwaffle work\"}"
    }
  ],
  "structuredContent": {
    "id": "prf_8d7e4b19",
    "name": "Alex Chen",
    "email": "alex@example.com",
    "nickname": "Alex — Moonwaffle work"
  },
  "isError": false
}
```

## Notes

- `id` must be a non-empty, non-whitespace opaque string, unique within the app and unchanged across token refresh, reconnection, and display-metadata changes. Do not use an email as the ID.
- Resolve the profile from the request's validated credentials; accept no user ID, email, or account selector, and return an auth error on failure instead of a placeholder profile.
- The marker does not enable the feature or grant eligibility. Use the integration's actual OAuth scopes in `securitySchemes` if profile access requires them.

Source: https://developers.openai.com/plugins/build/auth
