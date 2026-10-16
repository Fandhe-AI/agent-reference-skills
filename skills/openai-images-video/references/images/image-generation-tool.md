# `image_generation` Tool (Responses API)

Built-in Responses API tool that lets a mainline model generate or edit images as part of a conversation, using GPT Image models under the hood.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageBase64 = response.output
  .filter((o) => o.type === "image_generation_call")
  .map((o) => o.result)[0];
```

The `image_generation_call` output item's `result` field contains a base64-encoded image. Set `tool_choice: {"type": "image_generation"}` to force a call.

GPT Image models perform the actual generation but are never valid values for the top-level `model` field — use a text-capable mainline model (`gpt-5.5`, `gpt-4o`, `o3`, etc.) that supports the tool. Official guide: `gpt-5` and newer models should support the tool. To pick the image model, set the tool's own `model` field to `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare`, e.g. `{ type: "image_generation", model: "gpt-image-2.5-sunburst" }`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | string | Output dimensions, e.g. `1024x1024`, `1024x1536`; supports `auto`. |
| `model` | string | Image model, e.g. `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare`. |
| `quality` | `low` \| `medium` \| `high` \| `xhigh` \| `max` \| `auto` | Rendering quality; `xhigh` / `max` only on the GPT Image 2.5 models. |
| `format` | string | File output format. |
| `compression` | 0-100 | Compression level for JPEG/WebP formats. |
| `background` | `transparent` \| `opaque` \| `auto` | For `gpt-image-2`, transparent backgrounds are available in preview. Use `png` (the default) or `webp`; `jpeg` isn't supported with transparent backgrounds. |
| `action` | `auto` (default) \| `generate` \| `edit` | Whether the model chooses, always generates, or is forced to edit an image already in context. Forcing `edit` without an image in context errors. Example: `{ type: "image_generation", model: "gpt-image-2.5-sunburst", action: "generate" }`. |
| `partial_images` | 0-3 | Number of streamed partial images when `stream: true`. |
| `input_image_mask` | object (`file_id`) | Mask applied to the first input image, same semantics as the Images API edit mask. |

## Multi-turn editing

Reference a previous image either via `previous_response_id`, or by re-sending the `image_generation_call` output item (with its `id`) as input — both let you iteratively refine an image across turns.

```javascript
const response_fwup = await openai.responses.create({
  model: "gpt-6-astra",
  previous_response_id: response.id,
  input: "Now make it look realistic",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});
```

## Streaming

```javascript
const stream = await openai.responses.create({
  model: "gpt-6-astra",
  input: "Draw a river of white owl feathers...",
  stream: true,
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst", partial_images: 2 }],
});

for await (const event of stream) {
  if (event.type === "response.image_generation_call.partial_image") {
    // event.partial_image_index, event.partial_image_b64
  } else if (event.type === "response.completed") {
    // final image in event.response.output
  }
}
```

Each streamed partial image incurs an additional 100 image output tokens.

## Revised prompt

The mainline model automatically revises the prompt for better results; the revision is available in the `revised_prompt` field of the `image_generation_call` output item.

## Prompting tips

Image generation works best when you use terms like `draw` or `edit` in your prompt. To combine images, instead of `combine` or `merge`, say something like "edit the first image by adding this element from the second image."

## Supported models

The following mainline models support the image generation tool:

- `gpt-5.5`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gpt-5.2`
- `gpt-5`
- `gpt-5-nano`
- `o3`
- `gpt-4.1`
- `gpt-4.1-mini`
- `gpt-4.1-nano`
- `gpt-4o`
- `gpt-4o-mini`

Image models used by the tool (`model` field): `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`, `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`. Official examples use `gpt-6-astra` as the top-level model.

## Notes

- Distinct from `images.generate` / `images.edit` on the standalone Images API (`image-generation.md`) — the tool adds multi-turn editing and accepts File IDs as input images, but Responses API requests also bill the mainline model's own token usage.
- For GPT Image 2 and GPT Image 2.5, cached input pricing applies only through this tool in the Responses API (not to direct Images API requests). Cached token counts aren't included in the response's `usage`.
- The base request/response shape of the Responses API (`tools`, `tool_choice`, streaming events unrelated to images) is covered by the `openai-agents` / `openai-api-core` skills, not here.

## Related

- [image-generation.md](./image-generation.md)
- [moderation-and-errors.md](./moderation-and-errors.md)
