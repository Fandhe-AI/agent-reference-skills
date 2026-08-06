# Video Generation with Sora (Videos API)

Sora is OpenAI's video generation model; the Videos API exposes programmatic creation, extension, editing, and management of generated videos.

## Models

| Model | Best for |
|---|---|
| `sora-2` | Speed and flexibility; quick iteration, concepting, social content. |
| `sora-2-pro` | Production-quality output; 1080p exports (`1920x1080` / `1080x1920`); slower, more expensive. |

Both support `16`- and `20`-second generations.

## Signature / Usage

Video generation is asynchronous: `POST /videos` returns a job with `id` and `status`; poll `GET /videos/{video_id}` or use webhooks until `status` is `completed`; then fetch the file with `GET /videos/{video_id}/content`.

```javascript
const video = await openai.videos.create({
  model: "sora-2",
  prompt: "A video of the words 'Thank you' in sparkling letters",
});
```

```python
video = client.videos.create_and_poll(model="sora-2", prompt="A video of a cat on a motorcycle")
```

```bash
curl -X POST "https://api.openai.com/v1/videos" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F prompt="Wide tracking shot..." \
  -F model="sora-2-pro" \
  -F size="1280x720" \
  -F seconds="8"
```

Response job states: `queued`, `in_progress`, `completed`, `failed`. `video.progress` reports a percentage.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | `sora-2` \| `sora-2-pro` | Video model to use. |
| `prompt` | string | Shot type, subject, action, setting, lighting. |
| `size` | string | Resolution, e.g. `1280x720`, `1920x1080`, `1080x1920`. |
| `seconds` | string | Clip duration, up to `20`. |
| `input_reference` | file or object (`file_id`/`image_url`) | First-frame image guide; must match target `size`; JPEG/PNG/WebP. |
| `characters` | array of `{id}` | Reusable character asset IDs (see `video-references-and-characters.md`). |

## Poll the status endpoint

```javascript
while (video.status === "queued" || video.status === "in_progress") {
  await sleep(2000);
  video = await openai.videos.retrieve(video.id);
}
```

## Webhooks

Register a webhook to be notified instead of polling. Event types: `video.completed`, `video.failed`, each carrying the job `id`.

## Retrieve results

`GET /videos/{video_id}/content` streams the MP4 (default `variant=video`). Also available: `variant=thumbnail` (webp) and `variant=spritesheet` (jpg). Download URLs are valid for up to 1 hour after generation — copy to your own storage promptly.

## Guardrails and restrictions

- Only content suitable for audiences under 18.
- Copyrighted characters/music are rejected.
- Real people, including public figures, cannot be generated.
- Character uploads depicting human likeness are blocked by default.
- Input images containing human faces are currently rejected.

## Notes

- The base request/response conventions of the OpenAI SDKs/Responses API are covered by `openai-api-core`; this page and category are specific to the Videos/Sora endpoints.

## Related

- [video-references-and-characters.md](./video-references-and-characters.md)
- [video-extend-and-edit.md](./video-extend-and-edit.md)
- [video-batch-and-library.md](./video-batch-and-library.md)
