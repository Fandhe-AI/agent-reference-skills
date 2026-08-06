# Image Moderation and Error Handling

Content moderation controls and error-handling patterns for image generation and editing requests.

## Content Moderation

All prompts and generated images are filtered per OpenAI's [content policy](https://openai.com/policies/usage-policies/). For GPT Image models, the `moderation` parameter controls strictness:

| Value | Description |
|-------|-------------|
| `auto` (default) | Standard filtering; limits certain categories of potentially age-inappropriate content. |
| `low` | Less restrictive filtering. |

## Handling blocked requests and other errors

Handle image generation failures like other API errors: check the HTTP status/SDK exception type, log the request ID, and consult the error-codes guide for auth/quota/rate-limit/server failures. Retry transient `429`/`5xx` errors; do not blindly retry user errors that require changing the request.

User-correctable failures return `error.type = "image_generation_user_error"`. Use `error.code` as the stable discriminator, e.g. `moderation_blocked`.

## Signature / Usage

```json
{
  "error": {
    "type": "image_generation_user_error",
    "code": "moderation_blocked",
    "moderation_details": {
      "moderation_stage": "input",
      "categories": ["harassment"]
    }
  }
}
```

```python
try:
    client.images.generate(model="gpt-image-2", prompt="...")
except openai.BadRequestError as error:
    if error.code != "moderation_blocked":
        raise
    details = (error.body or {}).get("moderation_details") or {}
    categories = details.get("categories") or []
    stage = details.get("moderation_stage")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `error.moderation_details.moderation_stage` | `input` \| `output` \| `unknown` | Whether the block came from the prompt/inputs, a generated result, or is undetermined. |
| `error.moderation_details.categories` | string[] | Coarse public labels, e.g. `harassment`, `self-harm`, `sexual`, `violence`. |

## Notes

- The same error-handling pattern applies to `images.generate`, `images.edit`, and Responses API `image_generation` tool calls.
- Keep the primary end-user message generic; use `moderation_details` for logs, support workflows, and light remediation hints (e.g. suggest removing abusive language for `harassment`).
- This page covers image-generation-specific moderation errors only; general API error codes are covered by `openai-api-core`.

## Related

- [image-generation.md](./image-generation.md)
- [image-generation-tool.md](./image-generation-tool.md)
