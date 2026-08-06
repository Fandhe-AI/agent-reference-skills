# Video Batch Rendering and Library Management

Queue video renders through the Batch API for offline processing, and manage your generated video library (list, delete).

## Run video jobs through the Batch API

Each line of the batch input file uses the same JSON body as `POST /v1/videos`.

```jsonl
{"custom_id":"shot-001","method":"POST","url":"/v1/videos","body":{"model":"sora-2-pro","prompt":"Slow dolly shot through a miniature paper city...","size":"1920x1080","seconds":"20"}}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Batch endpoint support | — | Batch currently supports `POST /v1/videos` only. |
| Request format | — | Batch requests must be JSON, not multipart. |
| `input_reference` (Batch) | `{file_id}` \| `{image_url}` | Image-guided generation in Batch; multipart uploads (including video reference inputs) are not supported in Batch. |
| Result availability | — | Batch-generated videos are downloadable for up to `24` hours after the batch completes. |

Use stable `custom_id` values to map batch results back to your internal shot IDs.

## Maintain your library

List videos with pagination/sorting:

```bash
curl "https://api.openai.com/v1/videos?limit=20&after=video_123&order=asc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" | jq .
```

Delete a video:

```bash
curl -X DELETE "https://api.openai.com/v1/videos/REPLACE_WITH_YOUR_VIDEO_ID" \
  -H "Authorization: Bearer $OPENAI_API_KEY" | jq .
```

## Notes

- General Batch API semantics: upload the `.jsonl` input file via the Files API (`purpose="batch"`), submit it with `POST /v1/batches` (`input_file_id`, `endpoint`, `completion_window: "24h"`), poll status with `GET /v1/batches/{batch_id}` until it reaches `completed` (other terminal states: `failed`, `expired`, `cancelled`), then download results from `GET /v1/files/{file_id}/content`. See the official Batch guide: https://developers.openai.com/api/docs/guides/batch. This page covers only the video-specific request shape and constraints.

## Related

- [video-generation.md](./video-generation.md)
