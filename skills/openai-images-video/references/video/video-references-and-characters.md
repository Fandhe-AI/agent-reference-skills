# Video Image References and Characters

Guide a Sora video generation with a starting-frame image, or reuse a consistent non-human subject (character) across multiple generations.

## Image references (`input_reference`)

Acts as the first frame of the video. Use `input_reference` with an uploaded image in `multipart/form-data` requests, or as a JSON object (`file_id` or `image_url`) in `application/json`/Batch requests. The image must match the target video's `size`. Supported formats: `image/jpeg`, `image/png`, `image/webp`.

```bash
curl -X POST "https://api.openai.com/v1/videos" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F prompt="She turns around and smiles, then slowly walks out of the frame." \
  -F model="sora-2-pro" \
  -F size="1280x720" \
  -F seconds="8" \
  -F input_reference="@sample_720p.jpeg;type=image/jpeg"
```

## Characters

Upload a reusable non-human subject (animal, mascot, object) to keep consistent appearance/styling across shots. Best for short 2-4 second clips in `16:9`/`9:16`, 720p-1080p, matching the source aspect ratio. Up to two characters per video.

```bash
curl -X POST "https://api.openai.com/v1/videos/characters" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "video=@character.mp4;type=video/mp4" \
  -F "name=Mossy"
```

Include the returned character ID in the `characters` array when creating a video, and mention the character name verbatim in the prompt (the ID alone is not enough):

```bash
curl -X POST "https://api.openai.com/v1/videos" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-2",
    "prompt": "A cinematic tracking shot of Mossy, a moss-covered teapot mascot...",
    "size": "1280x720",
    "seconds": "8",
    "characters": [{ "id": "char_123" }]
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input_reference` | file \| `{file_id}` \| `{image_url}` | First-frame image guide for a single generation. |
| `characters` | array of `{id}` | Reusable character IDs; combinable with `input_reference`. |

## Notes

- Character uploads depicting human likeness are blocked by default; contact sales for eligibility.
- Characters and `input_reference` can be combined, but video **extensions** don't support characters.
- Distinct from image inputs used for vision/analysis (`vision/image-input.md`) — this is a generation-time first-frame or asset reference for Sora, not a model-understanding input.

## Related

- [video-generation.md](./video-generation.md)
- [video-extend-and-edit.md](./video-extend-and-edit.md)
