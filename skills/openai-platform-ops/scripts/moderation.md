# moderation

`curl` calls for the free-to-use `/v1/moderations` endpoint (classifies text/image input without generating a model response). Uses a regular `OPENAI_API_KEY`, not an admin key.

## Classify text input

```bash
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "omni-moderation-latest",
    "input": "...text to classify goes here..."
  }'
```

## Classify text and image input

Image files can be up to 20 MB. `image_url.url` also accepts a Base64-encoded data URL (`data:image/jpeg;base64,...`).

```bash
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "omni-moderation-latest",
    "input": [
      { "type": "text", "text": "...text to classify goes here..." },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/image.png"
        }
      }
    ]
  }'
```

## Notes

- `omni-moderation-latest` accepts text and image inputs; it does not classify audio.
- The response includes `flagged`, `categories`, `category_scores`, and `category_applied_input_types` per result. Treat scores as policy signals, not an automatic blocking decision.
- To get moderation scores alongside a generated response instead of a standalone classification, pass a top-level `moderation` object to the Responses API request — see `openai-api-core` for Responses API call syntax.
