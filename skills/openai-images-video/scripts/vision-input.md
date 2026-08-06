# vision-input

curl collection for passing images to the Responses API (`/v1/responses`) for vision analysis. See openai-api-core's `scripts/install.md` / `scripts/auth.md` for SDK installation and authentication setup.

## Analyze an image from a URL

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.6",
    "input": [
      {
        "role": "user",
        "content": [
          {"type": "input_text", "text": "what is in this image?"},
          {
            "type": "input_image",
            "image_url": "https://api.nga.gov/iiif/a2e6da57-3cd1-4235-b20e-95dcaefed6c8/full/!800,800/0/default.jpg"
          }
        ]
      }
    ]
  }'
```

Mixing `input_text` and `input_image` in the `content` array lets you pass text and images in the same message. `image_url` accepts either a public URL or a base64 data URI.
