# Video Generation with Sora

> **Shut down**: The Videos API and Sora 2 models were shut down on **September 24, 2026** and are no longer available (no one-to-one replacement). This sample is retained for historical reference only.

Start an asynchronous video render job with the Videos API.

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

let video = await openai.videos.create({
  model: "sora-2",
  prompt: "A video of the words 'Thank you' in sparkling letters",
});

console.log("Video generation started: ", video);
```

```python
from openai import OpenAI

openai = OpenAI()

video = openai.videos.create(
    model="sora-2",
    prompt="A video of a cool cat on a motorcycle in the night",
)

print("Video generation started:", video)
```

```bash
curl -X POST "https://api.openai.com/v1/videos" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F prompt="Wide tracking shot of a teal coupe driving through a desert highway, heat ripples visible, hard sun overhead." \
  -F model="sora-2-pro" \
  -F size="1280x720" \
  -F seconds="8"
```

## Notes

- The `sora-2` / `sora-2-pro` models and the Videos API were shut down on September 24, 2026 and are no longer available; no one-to-one replacement is listed on the official deprecations page.
- `video.create` returned immediately with `status: "queued"`; polling `GET /videos/{video_id}` (or `create_and_poll` in Python) until `status` was `completed` or `failed` was the flow.
- `sora-2` favored speed/iteration; `sora-2-pro` favored production quality. Both supported 16- or 20-second clips (`seconds` accepted other values per size/model limits).
- For status polling and downloading the finished MP4, see `video-status-polling-download.md`.
