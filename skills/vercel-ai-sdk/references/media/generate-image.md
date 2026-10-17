---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-image
---

# generateImage

Generates images based on a given prompt using an image model. It is ideal for use cases where you need to generate images programmatically, such as creating visual content or generating images for data augmentation.

## Signature / Usage

```ts
import { generateImage } from 'ai';
__PROVIDER_IMPORT__;

const { images } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'A futuristic cityscape at sunset',
  n: 3,
  size: '1024x1024',
});

console.log(images);
```

Import:

```ts
import { generateImage } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `ImageModelV4` | — | The image model to use. |
| prompt | `string \| GenerateImagePrompt` | — | The input prompt to generate the image from. |
| prompt.images | `Array<DataContent>` | — | (`GenerateImagePrompt`, a prompt object for image editing) An image item can be one of: base64-encoded string, a `Uint8Array`, an `ArrayBuffer`, or a `Buffer`. |
| prompt.text | `string` | — | The text prompt. |
| prompt.mask | `DataContent` | — | base64-encoded string, a `Uint8Array`, an `ArrayBuffer`, or a `Buffer`. |
| n | `number` | Optional | Number of images to generate. |
| size | `string` | Optional | Size of the images to generate. Format: `{width}x{height}`. |
| aspectRatio | `string` | Optional | Aspect ratio of the images to generate. Format: `{width}:{height}`. |
| seed | `number` | Optional | Seed for the image generation. |
| providerOptions | `ProviderOptions` | Optional | Additional provider-specific options. |
| maxImagesPerCall | `number` | Optional | Maximum number of images to generate per API call. When n exceeds this value, multiple API calls will be made. |
| maxRetries | `number` | 2 | Optional. Maximum number of retries per image model call, including retries after unclassified empty responses. Empty responses marked as not retryable by the provider are not retried. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP headers for the request. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| image | `GeneratedFile` | The first image that was generated. Properties: `base64: string` (image as a base64 encoded string), `uint8Array: Uint8Array`, `mediaType: string` (the IANA media type of the image). |
| images | `Array<GeneratedFile>` | All images that were generated (same `GeneratedFile` properties). |
| warnings | `Warning[]` | Warnings from the model provider (e.g. unsupported settings). |
| usage | `ImageModelUsage` | The usage statistics for the image generation. Properties: `imagesGenerated: number` (the total number of images generated). |
| providerMetadata | `ImageModelProviderMetadata` (optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. An `images` key is always present in the metadata and is an array with the same length as the top level `images` key. Details depend on the provider. |
| responses | `Array<ImageModelResponseMetadata>` | Response metadata from the provider. There may be multiple responses if we made multiple calls to the model. Properties: `timestamp: Date`, `modelId: string`, `headers?: Record<string, string>`. |

## Notes

- Stability: stable (no `experimental_` prefix).
- The guide page also documents `calls` (per underlying provider call), `image.providerMetadata`, and `AI_NoImageGeneratedError`; see Image Generation.
- This is the AI SDK function via provider packages; for raw OpenAI image APIs see openai-images-video and openai-api-core.

## Related

- [Image Generation](./image-generation.md)
- [wrapImageModel](../providers/wrap-image-model.md)
