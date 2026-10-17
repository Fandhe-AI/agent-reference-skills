---
source: https://ai.google.dev/gemini-api/docs/text-generation
---

# REST with curl

curl calls against `generativelanguage.googleapis.com` using the `x-goog-api-key` header. Requires `GEMINI_API_KEY` (see `api-key-env.md`).

## Generate text (Interactions API)

```sh
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "How does AI work?"
  }'
```

Source: `docs/text-generation` REST tab.

## Stream a response

```sh
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  --no-buffer \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works",
    "stream": true
  }'
```

Server-sent events via `?alt=sse` and `"stream": true`.

## Multi-turn with previous_interaction_id

```sh
RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "I have 2 dogs in my house."
  }')

INTERACTION_ID=$(printf '%s' "${RESPONSE1}" | jq -r '.id // empty')
: "${INTERACTION_ID:?first request failed}"

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "I have two dogs in my house. How many paws are in my house?",
    "previous_interaction_id": "'"${INTERACTION_ID}"'"
  }'
```

Requires `jq`.

## List uploaded files

```sh
curl "https://generativelanguage.googleapis.com/v1beta/files" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}"
```

Source: `docs/files` REST tab.

## Delete an uploaded file

> **Warning**: Deletion is irreversible. Run only against a disposable test file; `name` is the file resource name (for example `files/<id>`).

```sh
name="files/<id>"  # replace with the file resource name
curl --request "DELETE" "https://generativelanguage.googleapis.com/v1beta/${name:?set name to files/<id>}" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}"
```

## Notes

- `// empty` and the `:?` guard are added here (not in the official sample) so a failed first request stops the chain instead of sending `"null"`.
- All examples target `v1beta` (the SDK default). For `v1`, see `api-version.md`.
- Model ID `gemini-3.8-flash` is copied as written in the official pages.
- Upload (`upload/v1beta/files`), batch, and background-execution curl sequences are multi-step; see `references/multimodal-input/files-api.md`, `references/platform-ops/batch-api.md`, and `references/interactions-core/background-execution.md`.
- The delete example defines `name` and quotes the URL (`"${name}"`), aborting if it is unset; the original expands an undefined `$name` unquoted.
- Shell variables are expanded as quoted `"${var}"`, unlike the original snippet (which also writes `$GEMINI_API_KEY` and an unquoted `'$INTERACTION_ID'`).
- Keep the key in the environment variable; do not paste a real key into the command or shell history.
