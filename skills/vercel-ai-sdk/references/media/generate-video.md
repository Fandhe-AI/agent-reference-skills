---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video
---

# experimental_generateVideo

Generates videos based on a given prompt using a video model. It is ideal for use cases where you need to generate videos programmatically, such as creating visual content, animations, or generating videos from images.

## Signature / Usage

```ts
import { experimental_generateVideo as generateVideo } from 'ai';
__PROVIDER_IMPORT__;

const { videos } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  aspectRatio: '16:9',
});

console.log(videos);
```

Import:

```ts
import { experimental_generateVideo } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `VideoModelV4` | — | The video model to use. |
| prompt | `string \| GenerateVideoPrompt` | — | The input prompt to generate the video from. |
| prompt.image | `DataContent` | — | (`GenerateVideoPrompt`, a prompt object with optional input image) Input image for image-to-video generation. Can be a URL string, base64-encoded string, a `Uint8Array`, an `ArrayBuffer`, or a `Buffer`. |
| prompt.text | `string` | — | The text prompt. |
| n | `number` | 1 | Optional. Number of videos to generate. |
| aspectRatio | `string` | Optional | Aspect ratio of the videos to generate. Format: `{width}:{height}`, or `'adaptive'` to inherit the ratio from the input media (e.g. a first-frame image or a source video). Support for `'adaptive'` is provider-specific. |
| resolution | `string` | Optional | Resolution of the videos to generate. Format: `{width}x{height}`. |
| duration | `number` | Optional | Duration of the video in seconds. |
| fps | `number` | Optional | Frames per second for the video. |
| seed | `number` | Optional | Seed for the video generation. |
| frameImages | `Array<{ image: DataContent; frameType: "first_frame" \| "last_frame" }>` | Optional | Role-tagged image inputs for first-last-frame generation. |
| inputReferences | `Array<DataContent \| { data: DataContent; mediaType?: string }>` | Optional | Reference image or video inputs for reference-to-video generation. Use the object form with an explicit mediaType for URL-based video references. Providers route each reference by its media type and warn when a reference kind is unsupported. |
| generateAudio | `boolean` | Optional | Whether the model should generate audio alongside the video. |
| providerOptions | `ProviderOptions` | Optional | Additional provider-specific options. |
| maxVideosPerCall | `number` | Optional | Maximum number of videos to generate per API call. When n exceeds this value, multiple API calls will be made. |
| maxRetries | `number` | 2 | Optional. Maximum number of retries. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP headers for the request. |
| download | `(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string \| undefined }>` | built-in download with 2 GiB limit | Optional. Custom download function for fetching videos from URLs. Use `createDownload()` from `ai` to create a download function with custom size limits, e.g. `createDownload({ maxBytes: 50 * 1024 * 1024 })`. |
| poll | `object` | Optional | Polling configuration for the asynchronous start/status flow. |
| poll.intervalMs | `number` | 5000 | Optional. Interval between status checks in milliseconds. |
| poll.timeoutMs | `number` | 600000 (10 minutes) | Optional. Maximum time to wait for completion in milliseconds, including while waiting for a webhook notification. |
| poll.delay | `(delayInMs: number, options?: { abortSignal?: AbortSignal }) => PromiseLike<void>` | built-in timer-based delay | Optional. Custom delay implementation for polling intervals and webhook timeouts. Useful for durable workflow sleep functions. |
| webhook | `() => PromiseLike<{ url: string; received: PromiseLike<VideoModelV4OperationWebhook> }>` | Optional | Webhook factory for providers that support webhook notifications. When provided and the model supports webhooks, the SDK uses the webhook instead of polling. The factory should return a URL for the provider to notify and a `received` promise that resolves when the notification arrives. The `poll` option can also be provided to configure the webhook timeout and polling fallback. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| video | `GeneratedFile` | The first video that was generated. Properties: `base64: string` (video as a base64 encoded string), `uint8Array: Uint8Array`, `mediaType: string` (the IANA media type of the video, e.g., video/mp4). |
| videos | `Array<GeneratedFile>` | All videos that were generated (same `GeneratedFile` properties). |
| warnings | `Warning[]` | Warnings from the model provider (e.g. unsupported settings). |
| providerMetadata | `VideoModelProviderMetadata` (optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. A `videos` key is typically present in the metadata and is an array with the same length as the top level `videos` key. Details depend on the provider. |
| responses | `Array<VideoModelResponseMetadata>` | Response metadata from the provider. There may be multiple responses if we made multiple calls to the model. Properties: `timestamp: Date`, `modelId: string`, `headers?: Record<string, string>`, `providerMetadata?: VideoModelProviderMetadata` (provider-specific metadata for this individual API call; useful when multiple calls are made). |

## Notes

- Experimental: video generation is an experimental feature. The API may change in future versions.
- Throws `AI_NoVideoGeneratedError` when no valid video can be generated (see Video Generation).
- This is the AI SDK function via provider packages; for raw OpenAI video (Sora) APIs see openai-images-video.

## Related

- [Video Generation](./video-generation.md)
- [Image Generation](./image-generation.md)
- generateVideo (workflow)
