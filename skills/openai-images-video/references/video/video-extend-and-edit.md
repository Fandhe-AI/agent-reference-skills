# Extending and Editing Videos

Continue a completed Sora video (extension) or apply a targeted change to an existing video (edit) without regenerating it from scratch.

## Extend completed videos

`POST /v1/videos/extensions` continues an existing completed video using the full source clip as context, preserving motion, camera direction, and scene continuity.

```bash
curl -X POST "https://api.openai.com/v1/videos/extensions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video": { "id": "video_abc123" },
    "prompt": "Continue the scene as the camera rises over the rooftops and reveals the sunrise.",
    "seconds": "8"
  }'
```

Each extension can add up to `20` seconds; a video can be extended up to six times, for a max total length of `120` seconds. Extensions accept only a source video and prompt — no characters or image references.

## Edit existing videos

`POST /v1/videos/edits` applies a single, well-defined change while reusing the original structure, continuity, and composition. Smaller, focused edits preserve more fidelity.

```bash
curl -X POST "https://api.openai.com/v1/videos/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video": { "id": "video_abc123" },
    "prompt": "Shift the color palette to teal, sand, and rust, with a warm backlight."
  }'
```

If uploading a new video instead of editing a generation, use `multipart/form-data` and set `model` explicitly:

```bash
curl -X POST "https://api.openai.com/v1/videos/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "video=@source.mp4;type=video/mp4" \
  -F "model=sora-2-pro" \
  -F "prompt=Shift the color palette to teal, sand, and rust, with a warm backlight."
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `video` | `{id}` \| uploaded file | Source video ID (model inferred) or an uploaded video. |
| `prompt` | string | Describes the extension/edit to apply. |
| `seconds` (extensions) | string | Extension duration, up to `20`. |
| `model` (edits, upload case) | string | Required when uploading a new video instead of referencing a generation. |

## Notes

- The `remix` endpoint for editing video generations is deprecated — use `edits` for new integrations.
- Editing uploaded videos (not model-generated ones) is only available to eligible customers; contact sales.

## Related

- [video-generation.md](./video-generation.md)
- [video-references-and-characters.md](./video-references-and-characters.md)
