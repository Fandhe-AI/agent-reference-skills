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

Handler logic (TypeScript; `loadAuthenticatedProfile` is your application's integration code that validates the request credentials, enforces permissions, and retrieves the persisted profile ID and display metadata; `requestContext` comes from your server's request handling, not from a model-supplied argument):

```typescript
async function getProfile(requestContext: { token: string }) {
  // Your auth/provider integration validates credentials and loads
  // the existing profile. Auth failures use normal MCP auth handling.
  const account = await loadAuthenticatedProfile(requestContext);
  const id = account.profileId;

  if (typeof id !== "string" || id.trim().length === 0) {
    return {
      isError: true,
      content: [{ type: "text", text: "Profile identity unavailable." }],
    };
  }

  // Return the persisted ID unchanged; do not generate an ID per call.
  const profile = {
    id,
    ...(typeof account.name === "string" ? { name: account.name } : {}),
    ...(typeof account.email === "string" ? { email: account.email } : {}),
    ...(typeof account.nickname === "string"
      ? { nickname: account.nickname }
      : {}),
  };

  return {
    isError: false,
    structuredContent: profile,
    content: [{ type: "text", text: JSON.stringify(profile) }],
  };
}
```

## Notes

- `id` must be a non-empty, non-whitespace opaque string, unique within the app and unchanged across token refresh, reconnection, and display-metadata changes. Do not use an email as the ID.
- Resolve the profile from the request's validated credentials; accept no user ID, email, or account selector, and return an auth error on failure instead of a placeholder profile.
- The marker does not enable the feature or grant eligibility. Use the integration's actual OAuth scopes in `securitySchemes` if profile access requires them.
- `loadAuthenticatedProfile` must resolve the same stored profile for equivalent credentials and after reconnection, and must not create a fresh ID per OAuth grant or session; all other tools must use the request's credentials to enforce that profile's permissions.
- Identity checks: the same profile returns the same ID across repeated calls, token refresh, reconnect, scope upgrade, and email / display-label changes; a distinct profile returns a distinct ID; a missing or blank persisted ID returns an error result with no invented identity and no fallback to another profile.
- Already have a profile tool: keep its name, add the metadata declaration, and return the standard response (adapt on your server or add a small wrapper tool).

Source: https://developers.openai.com/plugins/build/auth (local .md twin copy, fetched 2026-11-14)
