---
source: https://ai-sdk.dev/docs/ai-sdk-core/image-generation
---

# Image Generation

The AI SDK provides the `generateImage` function to generate images based on a given prompt using an image model.

## Signature / Usage

```tsx
import { generateImage } from 'ai';
__PROVIDER_IMPORT__;

const { image } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
});
```

Access the image data using the `base64` or `uint8Array` properties:

```tsx
const base64 = image.base64; // base64 image data
const uint8Array = image.uint8Array; // Uint8Array image data
```

### Size and Aspect Ratio

Depending on the model, you can either specify the size or the aspect ratio.

- Size: a string in the format `{width}x{height}`. Models only support a few sizes, and the supported sizes are different for each model and provider.
- Aspect ratio: a string in the format `{width}:{height}`. Models only support a few aspect ratios, and the supported aspect ratios are different for each model and provider.

```tsx
const { image } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
  size: '1024x1024', // or aspectRatio: '16:9'
});
```

### Generating Multiple Images

```tsx
const { images } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
  n: 4, // number of images to generate
});
```

`generateImage` will automatically call the model as often as needed (in parallel) to generate the requested number of images.

Each image model has an internal limit on how many images it can generate in a single API call. The AI SDK manages this automatically by batching requests appropriately when you request multiple images using the `n` parameter. By default, the SDK uses provider-documented limits (for example, DALL-E 3 can only generate 1 image per call, while DALL-E 2 supports up to 10).

If needed, override this with `maxImagesPerCall`:

```tsx
const { images } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
  maxImagesPerCall: 5, // Override the default batch size
  n: 10, // Will make 2 calls of 5 images each
});
```

### Checking Image Editing Support

Image model instances can advertise whether they support reference image files and masks. Check these capabilities before routing an image editing request:

```ts
import { openai } from '@ai-sdk/openai';

const model = openai.image('gpt-image-1');
const needsMask = true;

if ((await model.supportsFileInputs) !== true) {
  throw new Error(
    'The selected model does not advertise image editing support.',
  );
}

if (needsMask && (await model.supportsMaskInputs) !== true) {
  throw new Error('The selected model does not advertise mask support.');
}
```

`supportsFileInputs` and `supportsMaskInputs` can be `true`, `false`, or `undefined` (unknown), and providers may expose any of these values asynchronously. Treat only `true` as confirmed support when selecting a model for an edit. File and mask support are separate because some models accept reference images but do not accept masks.

These capabilities describe support for the SDK's standardized image and mask inputs, including the provider's request mapping. A model name that resembles a supported family is not sufficient evidence of support. A model may still require provider-specific options or impose limits on input formats and counts.

The AI SDK does not automatically reject editing inputs based on these capabilities. Applications can decide whether to reject the request, ask the user to choose another model, or use a fallback when support is false or unknown.

### Providing a Seed

If supported by the model, the same seed will always produce the same image.

```tsx
const { image } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
  seed: 1234567890,
});
```

### Provider-specific Settings

Pass provider- or model-specific settings using `providerOptions`. The options for the provider (`openai` below) become request body properties.

```tsx
import { generateImage } from 'ai';
import { openai, type OpenAIImageModelGenerationOptions } from '@ai-sdk/openai';

const { image } = await generateImage({
  model: openai.image('dall-e-3'),
  prompt: 'Santa Claus driving a Cadillac',
  size: '1024x1024',
  providerOptions: {
    openai: {
      style: 'vivid',
      quality: 'hd',
    } satisfies OpenAIImageModelGenerationOptions,
  },
});
```

### Abort Signals, Headers, Warnings

`generateImage` accepts an optional `abortSignal` (`AbortSignal`) to abort the process or set a timeout, and an optional `headers` (`Record<string, string>`) for custom request headers. Warnings (e.g. unsupported parameters) are available in the `warnings` property of the response.

```ts
const { image, warnings } = await generateImage({
  model: __IMAGE_MODEL__,
  prompt: 'Santa Claus driving a Cadillac',
  abortSignal: AbortSignal.timeout(1000), // Abort after 1 second
  headers: { 'X-Custom-Header': 'custom-value' },
});
```

### Provider metadata

Some providers expose metadata for an individual image, available directly on the generated image:

```tsx
const { image } = await generateImage({
  model: openai.image('dall-e-3'),
  prompt,
});

const revisedPrompt = image.providerMetadata?.openai?.revisedPrompt;
```

The outer key of `image.providerMetadata` is the provider name. The inner value is the metadata for that image.

### Underlying calls

When a request is split into multiple provider calls, `calls` preserves the images, provider metadata, response metadata, warnings, and usage for each call. `images` and `usage` remain convenient flattened and aggregate views, respectively.

```ts
const { calls } = await generateImage({
  model,
  prompt: 'Santa Claus driving a Cadillac',
  n: 4,
  maxImagesPerCall: 1,
});

for (const call of calls) {
  console.log(call.providerMetadata, call.usage);
}
```

### Error Handling

When `generateImage` cannot generate a valid image, it throws `AI_NoImageGeneratedError`. Unclassified empty image responses are retried according to `maxRetries` before this error is thrown. Providers can classify terminal empty responses, such as moderation blocks, with `isRetryable: false`; these responses are not retried.

It can arise when the model failed to generate a response, or generated a response that could not be parsed. The error preserves:

- `calls`: Results from the underlying image model calls, including generated images, provider metadata, response metadata, warnings, and usage.
- `responses`: Metadata about the image model responses, including timestamp, model, and headers.
- `cause`: The cause of the error.

```ts
import { generateImage, NoImageGeneratedError } from 'ai';

try {
  await generateImage({ model, prompt });
} catch (error) {
  if (NoImageGeneratedError.isInstance(error)) {
    console.log('NoImageGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);

    for (const call of error.calls ?? []) {
      console.log('Provider metadata:', call.providerMetadata);
      console.log('Warnings:', call.warnings);
      console.log('Usage:', call.usage);
    }
  }
}
```

### Image Middleware

Enhance image models (e.g. set default values or implement logging) using `wrapImageModel` and `ImageModelV4Middleware`. This example sets a default size when none is provided:

```ts
import { generateImage, wrapImageModel } from 'ai';
__PROVIDER_IMPORT__;

const model = wrapImageModel({
  model: __IMAGE_MODEL__,
  middleware: {
    specificationVersion: 'v4',
    transformParams: async ({ params }) => ({
      ...params,
      size: params.size ?? '1024x1024',
    }),
  },
});

const { image } = await generateImage({
  model,
  prompt: 'Santa Claus driving a Cadillac',
});
```

### Generating Images with Language Models

Some language models such as Google `gemini-3.1-flash-image-preview` support multi-modal outputs including images. With such models, access the generated images using the `files` property of the response.

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-3.1-flash-image-preview'),
  prompt: 'Generate an image of a comic cat',
});

for (const file of result.files) {
  if (file.mediaType.startsWith('image/')) {
    // file.base64: string (base64 encoded data)
    // file.uint8Array: Uint8Array (binary data)
    // file.mediaType: string (e.g. "image/png")
  }
}
```

## Notes

### Image Models

A small subset of the image models supported by the AI SDK providers (see the respective provider documentation for more). Support sizes (`width x height`) or aspect ratios (`width : height`):

| Provider | Model | Supported sizes / aspect ratios |
| --- | --- | --- |
| xAI Grok | `grok-imagine-image` | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `3:2`, `2:3`, `2:1`, `1:2`, `19.5:9`, `9:19.5`, `20:9`, `9:20`, `auto` |
| OpenAI | `gpt-image-2.5-flare` | 1024x1024, 1536x1024, 1024x1536, custom |
| OpenAI | `gpt-image-2.5-sunburst` | 1024x1024, 1536x1024, 1024x1536, custom |
| OpenAI | `gpt-image-2` | 1024x1024, 1536x1024, 1024x1536 |
| OpenAI | `dall-e-3` | 1024x1024, 1792x1024, 1024x1792 |
| OpenAI | `dall-e-2` | 256x256, 512x512, 1024x1024 |
| Amazon Bedrock | `amazon.nova-canvas-v1:0` | 320-4096 (multiples of 16), 1:4 to 4:1, max 4.2M pixels |
| Fal | `fal-ai/flux/dev` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/flux-lora` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/fast-sdxl` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/flux-pro/v1.1-ultra` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/ideogram/v2` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/recraft-v3` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/stable-diffusion-3.5-large` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Fal | `fal-ai/hyper-sdxl` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| DeepInfra | `stabilityai/sd3.5` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| DeepInfra | `black-forest-labs/FLUX-1.1-pro` | 256-1440 (multiples of 32) |
| DeepInfra | `black-forest-labs/FLUX-1-schnell` | 256-1440 (multiples of 32) |
| DeepInfra | `black-forest-labs/FLUX-1-dev` | 256-1440 (multiples of 32) |
| DeepInfra | `black-forest-labs/FLUX-pro` | 256-1440 (multiples of 32) |
| DeepInfra | `stabilityai/sd3.5-medium` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| DeepInfra | `stabilityai/sdxl-turbo` | 1:1, 16:9, 1:9, 3:2, 2:3, 4:5, 5:4, 9:16, 9:21 |
| Replicate | `black-forest-labs/flux-schnell` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| Replicate | `recraft-ai/recraft-v3` | 1024x1024, 1365x1024, 1024x1365, 1536x1024, 1024x1536, 1820x1024, 1024x1820, 1024x2048, 2048x1024, 1434x1024, 1024x1434, 1024x1280, 1280x1024, 1024x1707, 1707x1024 |
| Google | `gemini-2.5-flash-image` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google | `gemini-3-pro-image-preview` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google | `gemini-3.1-flash-image-preview` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google | `gemini-nano-banana-2.1` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, 1:8, 8:1, 1:4, 4:1 |
| Google Vertex | `gemini-2.5-flash-image` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google Vertex | `gemini-3-pro-image-preview` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google Vertex | `gemini-3.1-flash-image-preview` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Google Vertex | `gemini-nano-banana-2.1` | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, 1:8, 8:1, 1:4, 4:1 |
| Fireworks | `accounts/fireworks/models/flux-1-dev-fp8` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| Fireworks | `accounts/fireworks/models/flux-1-schnell-fp8` | 1:1, 2:3, 3:2, 4:5, 5:4, 16:9, 9:16, 9:21, 21:9 |
| Fireworks | `accounts/fireworks/models/playground-v2-5-1024px-aesthetic` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| Fireworks | `accounts/fireworks/models/japanese-stable-diffusion-xl` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| Fireworks | `accounts/fireworks/models/playground-v2-1024px-aesthetic` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| Fireworks | `accounts/fireworks/models/SSD-1B` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| Fireworks | `accounts/fireworks/models/stable-diffusion-xl-1024-v1-0` | 640x1536, 768x1344, 832x1216, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640 |
| Luma | `photon-1` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Luma | `photon-flash-1` | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 |
| Together.ai | `stabilityai/stable-diffusion-xl-base-1.0` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-dev` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-dev-lora` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-schnell` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-canny` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-depth` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-redux` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1.1-pro` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-pro` | 512x512, 768x768, 1024x1024 |
| Together.ai | `black-forest-labs/FLUX.1-schnell-Free` | 512x512, 768x768, 1024x1024 |
| Black Forest Labs | `flux-2-pro` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-2-max` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-2-flex` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-2-klein-9b` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-2-klein-4b` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-kontext-pro` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-kontext-max` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-pro-1.1-ultra` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-pro-1.1` | From 3:7 (portrait) to 7:3 (landscape) |
| Black Forest Labs | `flux-pro-1.0-fill` | From 3:7 (portrait) to 7:3 (landscape) |

### General notes

- This page covers `generateImage` through AI SDK provider packages (`@ai-sdk/openai`, `@ai-sdk/google`, etc.), not the raw provider image APIs. For the raw OpenAI image APIs (gpt-image / vision / Sora) see openai-images-video and openai-api-core; for Gemini and Anthropic native APIs see the corresponding provider skills (anthropic-api-core).
- The original guide comment labels `file.base64` as "data URL format", but the `GeneratedFile` reference defines `base64` as a plain base64 encoded string without a `data:` prefix; build a data URL as `` `data:${file.mediaType};base64,${file.base64}` `` when one is needed.
- Stability: `generateImage` has no `experimental_` prefix (stable). Model IDs and supported sizes are copied verbatim from the official page as of ai 7.0.142 and are provider-dependent.

## Related

- [generateImage](./generate-image.md)
- [Video Generation](./video-generation.md)
- [Speech](./speech.md)
