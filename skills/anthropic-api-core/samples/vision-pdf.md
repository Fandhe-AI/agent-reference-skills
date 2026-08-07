<!-- source: https://platform.claude.com/docs/en/build-with-claude/vision , https://platform.claude.com/docs/en/build-with-claude/pdf-support / last verified: 2026-08-07 -->

# Vision and PDF Input

Send a base64-encoded image and a URL-referenced PDF to Claude as `image` and `document` content blocks alongside a text prompt.

```python
image1_data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC"
image1_media_type = "image/png"

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": image1_media_type,
                        "data": image1_data,
                    },
                },
                {"type": "text", "text": "Describe this image."},
            ],
        }
    ],
)
print(message)
```

```python
client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "document",
                    "source": {
                        "type": "url",
                        "url": "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf",
                    },
                },
                {"type": "text", "text": "What are the key findings in this document?"},
            ],
        }
    ],
)

print(message.content)
```

## Notes

- Image `source.type` accepts `base64`, `url`, or `file` (a `file_id` from the Files API); the same three source types apply to `document` (PDF) blocks. Amazon Bedrock and Google Cloud only support `base64` sources.
- PDFs are processed as a combination of extracted text and a per-page rendered image, so PDF requests are subject to the same per-image token costs and limitations as vision (`⌈width / 28⌉ × ⌈height / 28⌉` visual tokens per page).
- Request limits: up to 100 images per request on 200k-context models (600 on others, max 8000x8000 px each); PDFs are capped at 600 pages per request (100 pages when the context window is under 1M tokens) and a 32 MB total request size.
- For images or PDFs reused across multiple requests, upload once via the Files API and reference the returned `file_id` instead of resending base64 data on every turn — this keeps multi-turn request payloads small.
- Example from the Claude API (platform.claude.com) `build-with-claude/vision` and `build-with-claude/pdf-support` pages.
