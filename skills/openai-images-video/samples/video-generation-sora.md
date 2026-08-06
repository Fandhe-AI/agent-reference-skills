# Video Generation with Sora

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

- `video.create` returns immediately with `status: "queued"`; poll `GET /videos/{video_id}` (or use `create_and_poll` in Python) until `status` is `completed` or `failed`.
- `sora-2` favors speed/iteration; `sora-2-pro` favors production quality. Both support 16- or 20-second clips (`seconds` accepts other values per size/model limits).
- For status polling and downloading the finished MP4, see `video-status-polling-download.md`.
