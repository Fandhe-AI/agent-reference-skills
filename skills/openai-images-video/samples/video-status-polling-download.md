# Video Status Polling and Download

Poll a video render job until completion, then download the MP4.

```python
import asyncio

from openai import AsyncOpenAI

client = AsyncOpenAI()


async def main() -> None:
    video = await client.videos.create_and_poll(
        model="sora-2",
        prompt="A video of a cat on a motorcycle",
    )

    if video.status == "completed":
        content = client.videos.download_content(video.id, variant="video")
        content.write_to_file("video.mp4")
        print("Video successfully completed and saved to video.mp4")
    else:
        print("Video creation failed. Status: ", video.status)


asyncio.run(main())
```

```javascript
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import OpenAI from "openai";

const openai = new OpenAI();

let video = await openai.videos.create({
  model: "sora-2",
  prompt: "A video of the words 'Thank you' in sparkling letters",
});

while (video.status === "queued" || video.status === "in_progress") {
  await sleep(2000);
  video = await openai.videos.retrieve(video.id);
}

if (video.status === "failed") {
  throw new Error("Video generation failed");
}

const content = await openai.videos.downloadContent(video.id);
const buffer = Buffer.from(await content.arrayBuffer());
writeFileSync("video.mp4", buffer);
```

```bash
# Download the finished MP4
curl -L "https://api.openai.com/v1/videos/video_abc123/content" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  --output video.mp4

# Or download a thumbnail / spritesheet variant
curl -L "https://api.openai.com/v1/videos/video_abc123/content?variant=thumbnail" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  --output thumbnail.webp
```

## Notes

- Poll `video.status` (`queued` -> `in_progress` -> `completed` / `failed`); `video.progress` (0-100) is available for progress bars.
- Download URLs from `GET /videos/{id}/content` are valid for a maximum of 1 hour after generation; re-fetch if expired.
- Instead of polling, configure a webhook endpoint to receive `video.completed` / `video.failed` events.
- `content?variant=` also accepts `thumbnail` and `spritesheet` for supporting assets besides the main `video`.
