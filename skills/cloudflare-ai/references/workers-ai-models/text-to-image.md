---
source: https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/, https://developers.cloudflare.com/workers-ai/models/flux-2-dev/, https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/, https://developers.cloudflare.com/workers-ai/models/flux-2-klein-9b/, https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm/, https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-inpainting/, https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-base-1.0/, https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-lightning/, https://developers.cloudflare.com/workers-ai/models/lucid-origin/, https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/
---

# Text-to-Image Models

Image generation (and img2img / inpainting) models on Workers AI.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/.

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
			prompt: 'a cyberpunk lizard',
			seed: Math.floor(Math.random() * 10)
		});
		// response.image is base64 encoded which can be used directly as an <img src=""> data URI
		const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;
		return Response.json({ dataURI });
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/black-forest-labs/flux-1-schnell` | Black Forest Labs | 12B rectified flow transformer; Zero data retention | — |
| `@cf/black-forest-labs/flux-2-dev` | Black Forest Labs | Partner; multi-reference support; Zero data retention | — |
| `@cf/black-forest-labs/flux-2-klein-4b` | Black Forest Labs | Partner; ultra-fast distilled model that unifies generation and editing; Zero data retention | — |
| `@cf/black-forest-labs/flux-2-klein-9b` | Black Forest Labs | Partner; 9B; multi-reference editing; Zero data retention | — |
| `@cf/lykon/dreamshaper-8-lcm` | lykon | Stable Diffusion fine-tuned for photorealism; Zero data retention | — |
| `@cf/runwayml/stable-diffusion-v1-5-inpainting` | RunwayML | Beta; inpainting with a mask; Zero data retention | $0.00 per step |
| `@cf/stabilityai/stable-diffusion-xl-base-1.0` | Stability.ai | Beta; Zero data retention | $0.00 per step |
| `@cf/bytedance/stable-diffusion-xl-lightning` | ByteDance | Beta; 1024px images in a few steps; Zero data retention | $0.00 per step |
| `@cf/leonardo/lucid-origin` | Leonardo | Partner; Zero data retention | $0.007 per 512 by 512 tile, $0.000132 per step |
| `@cf/leonardo/phoenix-1.0` | Leonardo | Partner; Zero data retention | $0.00583 per 512 by 512 tile, $0.00011 per step |

### Common input parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prompt | string | — | Required, minLength 1 (flux-1-schnell also maxLength 2048). A text description of the image to generate. |
| negative_prompt | string | — | dreamshaper, SD v1.5 inpainting, SDXL base, SDXL lightning, phoenix-1.0 (minLength 1). Elements to avoid. |
| height | integer | — | Pixels. 256 to 2048 on dreamshaper/SD/SDXL models; lucid-origin default 1120, max 2500; phoenix-1.0 default 1024, max 2048. |
| width | integer | — | Pixels. Same ranges as `height`. |
| num_steps | integer | 20 (SD family, max 20) | Diffusion steps; lucid-origin 1 to 40; phoenix-1.0 default 25, 1 to 50. |
| steps | integer | 4 (stated in the description) | flux-1-schnell: maximum 8. lucid-origin: 1 to 40. |
| guidance | number | 7.5 (SD family) | How closely the image follows the prompt; lucid-origin default 4.5 (0 to 10); phoenix-1.0 default 2 (2 to 10). |
| seed | integer | — | Random seed for reproducibility (lucid-origin and phoenix-1.0: minimum 0). |
| image | array of integers | — | SD family, for img2img: image data as 8-bit unsigned integers. |
| image_b64 | string | — | SD family, for img2img: base64-encoded input image. |
| mask | array of integers | — | SD family, for inpainting: mask image data as 8-bit unsigned integers. |
| strength | number | 1 | SD family, img2img: 0 to 1; lower values keep the output closer to the input image. |
| multipart | object | — | flux-2-dev, flux-2-klein-4b, flux-2-klein-9b. Required; fields not expanded in the source. |

Output: `image` (string, generated image as Base64) on flux-1-schnell, lucid-origin and the FLUX.2 models. The SD-family and phoenix-1.0 pages state "The binding returns a `ReadableStream` with the output (check the model's output schema)".

## Notes

- The flux-1-schnell example passes `seed`, but its Parameters section lists only `prompt` and `steps`; the example is kept as published.
- The flux-1-schnell page also includes a second example that decodes `response.image` with `atob` and returns `image/jpeg` bytes directly; its curl example uses the placeholder `"seed": "Random positive integer"`, which is not a valid integer value.
- The SD-family pages (dreamshaper, SD v1.5 inpainting, SDXL base, SDXL lightning) share the same parameter list, including the img2img/inpainting inputs, even where the model name suggests otherwise.
- `lucid-origin` documents both `num_steps` and `steps` with the same range.
- FLUX.2 and Leonardo models are flagged Partner on their pages.

## Related

- [image-to-text.md](./image-to-text.md)
