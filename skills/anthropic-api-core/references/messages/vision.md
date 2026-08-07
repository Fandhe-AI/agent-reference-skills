<!-- source: https://platform.claude.com/docs/en/build-with-claude/vision / last verified: 2026-08-07 -->

# Vision

Claude can understand and analyze images sent as `image` content blocks via base64, URL, or Files API `file_id`.

## Signature / Usage

```json
{
  "role": "user",
  "content": [
    {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": "<BASE64_DATA>"}},
    {"type": "text", "text": "Describe this image."}
  ]
}
```

```json
{"type": "image", "source": {"type": "url", "url": "https://example.com/image.jpg"}}
```

```json
{"type": "image", "source": {"type": "file", "file_id": "file_abc123"}}
```

Prefer placing images before text in the prompt. On Amazon Bedrock and Google Cloud, only `base64` sources are supported. For repeatedly-used images, upload once via the Files API and reference by `file_id` to keep multi-turn payloads small. For multiple images in one message, label each with a short text marker (`Image 1:`, `Image 2:`) so later turns can refer to them by name; earlier-turn images remain accessible in later turns without resending.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `source.type` | `"base64"` \| `"url"` \| `"file"` | Image source; `file` references a Files API upload |
| `source.media_type` | string | Required for `base64`: `image/jpeg`, `image/png`, `image/gif`, `image/webp` |
| `source.data` | string | Base64-encoded image bytes (for `base64`) |
| `source.url` | string | Image URL (for `url`) |
| `source.file_id` | string | Files API file ID (for `file`) |

## Notes

- Limits: 20 images/message on claude.ai; 100/request on API for 200k-context models, 600/request for others; stricter per-image pixel limit applies above 20 images/request (resize to ≤2000px per side or keep ≤20 blocks to avoid it). Max dimensions 8000×8000px. Max size: 10MB base64 (API/claude.ai), 5MB (Bedrock/Google Cloud). Overall request size limits (32MB standard) can be hit before the 600-image cap.
- Formats: JPEG, PNG, GIF, WebP; animations unsupported (first frame only).
- Token cost: `⌈width/28⌉ × ⌈height/28⌉` visual tokens (28×28px patches). Resolution tiers: Claude 4.7+ models get high-resolution tier (max long edge 2576px, max 4784 visual tokens, automatic, no opt-in); all other models get standard tier (1568px, 1568 tokens). Oversized images are downscaled preserving aspect ratio to fit the tier limit.
- Limitations: cannot identify/name people in images (policy refusal); may hallucinate on low-quality/rotated/very small (<200px) images; coordinate/localization output is approximate; approximate object counting; cannot detect AI-generated images; does not process content violating the Acceptable Use Policy; not designed for diagnostic medical imaging (CT/MRI).
- No image metadata is read; uploaded images are ephemeral (not stored beyond request processing) and not used for model training.
- Claude is image-understanding only — cannot generate, edit, or manipulate images.

## Related

- [Vision coordinates](./vision-coordinates.md)
- [PDF support](./pdf-support.md)
- [Files](./files.md)
- [Working with messages](./working-with-messages.md)
