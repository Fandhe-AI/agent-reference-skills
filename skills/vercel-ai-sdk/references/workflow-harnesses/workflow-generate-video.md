---
source: https://ai-sdk.dev/docs/reference/ai-sdk-workflow/generate-video
---

# generateVideo

Generates videos durably inside a workflow. The helper starts an asynchronous video generation job with a Workflow webhook URL, suspends the workflow until the provider sends a terminal notification, and then retrieves the completed result with one status request.

## Signature / Usage

```ts
import { experimental_generateVideo as generateVideo } from '@ai-sdk/workflow/video';

export async function videoWorkflow(prompt: string) {
  'use workflow';

  // The workflow suspends while the video renders, consuming no compute.
  const result = await generateVideo({
    model: 'klingai/kling-v3.0-t2v',
    prompt,
  });

  return result.videos;
}
```

## Options / Props

Accepts the same parameters as `experimental_startVideo` from `ai`, except `webhookUrl` and `abortSignal` (the helper creates and manages the webhook URL).

| Name | Type | Description |
| --- | --- | --- |
| model (required) | VideoModel | The asynchronous video model. A string compatible with Vercel AI Gateway or a serializable provider model. |
| prompt (required) | string \| GenerateVideoPrompt | The prompt or image prompt. |
| n | number | Number of videos to generate. Default: 1. |
| aspectRatio | `${number}:${number}` \| "adaptive" | Aspect ratio. |
| resolution | `${number}x${number}` | Resolution. |
| duration | number | Duration of each video in seconds. |
| maxVideosPerCall | number | Maximum number of videos started in one call. |
| fps | number | Frames per second. |
| seed | number | Seed for deterministic generation when supported. |
| frameImages | Array<{ image: DataContent; frameType: VideoModelV4FrameType }> | Role-tagged first and last frame images. |
| inputReferences | Array<DataContent \| { data: DataContent; mediaType?: string }> | Reference images or videos. |
| generateAudio | boolean | Whether to generate audio with the video. |
| providerOptions | ProviderOptions | Additional provider-specific options. |
| headers | Record<string, string> | Additional HTTP headers for start and status requests. |
| maxRetries | number | Max AI SDK retries for each start and status request. Default: 2. |

Returns the completed status result from the provider. `videos` contains raw provider video data discriminated by `type`: `url` (provider-hosted URL and media type), `base64` (Base64 data and media type), or `binary` (`Uint8Array` and media type).

## Notes

- Experimental: exported as `experimental_generateVideo` from `@ai-sdk/workflow/video`.
- Unlike `experimental_generateVideo` from `ai`, this helper does not download provider-hosted videos; URL results remain URLs so the workflow can decide whether to persist, copy, or process them in another step without serializing video bytes across step boundaries.
- The selected model must support asynchronous start and status operations and provider webhooks. The helper must be called from a Workflow SDK workflow.
- Hosted URLs can expire; handle any video you need to retain in a separate workflow step.
- Distance: provider-native video APIs are covered by openai-images-video; this page covers only the AI SDK workflow helper.

## Related

- [generateVideo (ai)](../media/generate-video.md)
- [Video generation](../media/video-generation.md)
- [WorkflowAgent](./workflow-agent.md)
