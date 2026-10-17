---
source: https://ai-sdk.dev/docs/ai-sdk-core/video-generation
---

# Video Generation

Video generation is an experimental feature. The API may change in future versions.

The AI SDK provides the `experimental_generateVideo` function to generate videos based on a given prompt using a video model.

## Signature / Usage

```tsx
import { experimental_generateVideo as generateVideo } from 'ai';
__PROVIDER_IMPORT__;

const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
});
```

Access the video data using the `base64` or `uint8Array` properties:

```tsx
const base64 = video.base64; // base64 video data
const uint8Array = video.uint8Array; // Uint8Array video data
```

## Options / Props

### Aspect Ratio

The aspect ratio is specified as a string in the format `{width}:{height}`. Models only support a few aspect ratios, and the supported aspect ratios are different for each model and provider.

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  aspectRatio: '16:9',
});
```

Some models also accept `'adaptive'`, which lets the provider derive the output ratio from the input media instead of a fixed value. This is typically required for image-to-video, video editing, and video extension, where the output inherits the ratio of the input and an explicit ratio is rejected.

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: { image: firstFrame, text: 'A cat walking on a treadmill' },
  aspectRatio: 'adaptive',
});
```

### Resolution, Duration, FPS, Audio

Resolution is a string `{width}x{height}`; models only support specific resolutions that differ per model and provider. Duration (seconds), `fps`, and `generateAudio` are supported by some video models only.

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A serene mountain landscape at sunset',
  resolution: '1280x720',
  duration: 5,
  fps: 24,
  generateAudio: true,
});
```

### Generating Multiple Videos

```tsx
const { videos } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A rocket launching into space',
  n: 3, // number of videos to generate
});
```

`experimental_generateVideo` will automatically call the model as often as needed (in parallel) to generate the requested number of videos. Each video model has an internal limit on how many videos it can generate in a single API call; most video models only support generating 1 video per call due to computational cost. Override with `maxVideosPerCall`:

```tsx
const { videos } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A rocket launching into space',
  maxVideosPerCall: 2, // Override the default batch size
  n: 4, // Will make 2 calls of 2 videos each
});
```

### Image-to-Video Generation

Some video models support generating videos from an input image, provided via the prompt object (URL, base64-encoded string, or `Uint8Array`):

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: {
    image: 'https://example.com/my-image.png',
    text: 'Animate this image with gentle motion',
  },
});
```

### First and Last Frame

Some video models support first-last-frame generation. Use the `frameImages` option to pass role-tagged images in a provider-agnostic way:

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'The cat walks across the scene and transforms into a dog by the end',
  frameImages: [
    {
      image: 'https://example.com/first-frame.png',
      frameType: 'first_frame',
    },
    {
      image: 'https://example.com/last-frame.png',
      frameType: 'last_frame',
    },
  ],
});
```

### Reference Inputs

Some video models support reference-to-video generation, where you provide one or more reference images or videos that the model incorporates into the generated video. Use `inputReferences`:

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'The two characters meet in a bustling market',
  inputReferences: [
    'https://example.com/character-1.png',
    'https://example.com/character-2.png',
  ],
});
```

For URL-based video references, use the object form with an explicit `mediaType`:

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'Match the motion in the reference clip',
  inputReferences: [
    {
      data: 'https://example.com/reference.mp4',
      mediaType: 'video/mp4',
    },
  ],
});
```

Providers route each reference by its media type (image vs. video) and emit a warning when a reference kind is unsupported (for example, providers that accept only image references warn and ignore a video reference).

### Providing a Seed

If supported by the model, the same seed will always produce the same video.

```tsx
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  seed: 1234567890,
});
```

### Provider-specific Settings

Pass settings via `providerOptions`. The options for the provider become request body properties.

```tsx
import { experimental_generateVideo as generateVideo } from 'ai';
import { fal } from '@ai-sdk/fal';

const { video } = await generateVideo({
  model: fal.video('luma-dream-machine/ray-2'),
  prompt: 'A cat walking on a treadmill',
  aspectRatio: '16:9',
  providerOptions: {
    fal: { loop: true, motionStrength: 0.8 },
  },
});
```

### Abort Signals and Timeouts

`experimental_generateVideo` accepts an optional `abortSignal`. Video generation typically takes longer than image generation; consider longer timeouts (60 seconds or more) depending on the model and video length.

```ts
const { video } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  abortSignal: AbortSignal.timeout(60000), // Abort after 60 seconds
});
```

### Polling

Video generation is an asynchronous process that can take several minutes to complete. The SDK automatically polls the provider to check if the video is ready. Configure the polling behavior:

```tsx
const { video } = await generateVideo({
  model: fal.video('luma-dream-machine/ray-2'),
  prompt: 'A cinematic timelapse of a city from dawn to dusk',
  duration: 10,
  poll: {
    intervalMs: 5000, // Check every 5 seconds (default)
    timeoutMs: 600000, // Timeout after 10 minutes (default)
  },
});
```

For durable workflows that provide their own sleep primitive, pass it as `poll.delay`. The custom delay is used for both polling intervals and webhook timeouts.

### Webhooks

For models with native webhook support, pass a `webhook` factory that returns a public URL and a promise that resolves when your application receives the webhook request:

```tsx
import { fal } from '@ai-sdk/fal';
import { experimental_generateVideo as generateVideo } from 'ai';
import { createWebhook } from './create-webhook';

const { video } = await generateVideo({
  model: fal.video('luma-dream-machine/ray-2'),
  prompt: 'A cinematic timelapse of a city from dawn to dusk',
  poll: {
    timeoutMs: 600000, // Wait up to 10 minutes for the webhook
  },
  webhook: async () => {
    const { url, received } = await createWebhook();
    return { url, received };
  },
});
```

`createWebhook` is an application-specific helper that registers a webhook listener before returning. Its `received` promise must resolve with the request `headers` and `body`. The SDK sends `url` to the provider, waits for `received`, and then retrieves the completed video.

You can provide `poll` together with `webhook`. For models with native webhook support, `poll.timeoutMs` limits how long the SDK waits for the notification. If the model does not support webhooks, the SDK falls back to polling with the provided interval and timeout.

### Custom Headers and Warnings

`experimental_generateVideo` accepts an optional `headers` parameter of type `Record<string, string>`. If the model returns warnings, e.g. for unsupported parameters, they are available in the `warnings` property of the response.

```tsx
const { video, warnings } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  headers: { 'X-Custom-Header': 'custom-value' },
});
```

### Additional Provider-specific Metadata

Some providers expose additional metadata for the result overall or per video.

```tsx
const { video, providerMetadata } = await generateVideo({
  model: fal.video('luma-dream-machine/ray-2'),
  prompt,
});

// Access provider-specific metadata
const videoMetadata = providerMetadata.fal?.videos[0];
console.log({
  duration: videoMetadata?.duration,
  fps: videoMetadata?.fps,
  width: videoMetadata?.width,
  height: videoMetadata?.height,
});
```

The outer key of the returned `providerMetadata` is the provider name. A `videos` key is typically present in the metadata and is an array with the same length as the top level `videos` key. When generating multiple videos with `n > 1`, per-call metadata is available through the `responses` array:

```tsx
const { videos, responses } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A rocket launching into space',
  n: 5, // May require multiple API calls
});

for (const response of responses) {
  console.log({
    timestamp: response.timestamp,
    modelId: response.modelId,
    providerMetadata: response.providerMetadata,
  });
}
```

### Error Handling

When `experimental_generateVideo` cannot generate a valid video, it throws `AI_NoVideoGeneratedError` (model failed to generate a response, or the response could not be parsed). The error preserves `responses` (metadata about the video model responses, including timestamp, model, and headers) and `cause`.

```ts
import {
  experimental_generateVideo as generateVideo,
  NoVideoGeneratedError,
} from 'ai';

try {
  await generateVideo({ model, prompt });
} catch (error) {
  if (NoVideoGeneratedError.isInstance(error)) {
    console.log('NoVideoGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);
  }
}
```

## Notes

### Video Models

A small subset of the video models supported by the AI SDK providers (see the respective provider documentation for more).

| Provider | Model | Features |
| --- | --- | --- |
| Black Forest Labs | `flux-3-video` | Text-to-video, image-to-video, keyframes, video continuation, audio generation |
| FAL | `luma-dream-machine/ray-2` | Text-to-video, image-to-video |
| FAL | `minimax-video` | Text-to-video |
| Google | `veo-2.0-generate-001` | Text-to-video, up to 4 videos per call |
| Google Vertex | `veo-3.1-generate-001` | Text-to-video, audio generation |
| Google Vertex | `veo-3.1-fast-generate-001` | Text-to-video, audio generation |
| Google Vertex | `veo-3.0-generate-001` | Text-to-video, audio generation |
| Google Vertex | `veo-3.0-fast-generate-001` | Text-to-video, audio generation |
| Google Vertex | `veo-2.0-generate-001` | Text-to-video, up to 4 videos per call |
| Kling AI | `kling-v2.6-t2v` | Text-to-video |
| Kling AI | `kling-v2.6-i2v` | Image-to-video |
| Kling AI | `kling-v2.6-motion-control` | Motion control |
| Replicate | `minimax/video-01` | Text-to-video |
| xAI | `grok-imagine-video` | Text-to-video, image-to-video, editing, extension, R2V |
| xAI | `grok-imagine-video-1.5` | Text-to-video, image-to-video, editing, extension, R2V (with reference audio) |

### General notes

- Experimental: `experimental_generateVideo` may change in patch releases.
- This page covers `experimental_generateVideo` through AI SDK provider packages, not the raw provider video APIs. For raw OpenAI video (Sora) APIs see openai-images-video; its Videos API end-of-life is tracked in openai-api-core.
- For running `generateVideo` as a durable workflow step, see the workflow-harnesses category (`generateVideo` in `@ai-sdk/workflow`).

## Related

- [experimental_generateVideo](./generate-video.md)
- [Image Generation](./image-generation.md)
- generateVideo (workflow)
