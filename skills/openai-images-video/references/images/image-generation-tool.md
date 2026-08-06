# `image_generation` Tool (Responses API)

Built-in Responses API tool that lets a mainline model generate or edit images as part of a conversation, using GPT Image models under the hood.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-5.6",
  input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageBase64 = response.output
  .filter((o) => o.type === "image_generation_call")
  .map((o) => o.result)[0];
```

The `image_generation_call` output item's `result` field contains a base64-encoded image. Set `tool_choice: {"type": "image_generation"}` to force a call.

GPT Image models perform the actual generation but are never valid values for the top-level `model` field — use a text-capable mainline model (`gpt-5.5`, `gpt-4o`, `o3`, etc.) that supports the tool.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | string | Output dimensions, e.g. `1024x1024`, `1024x1536`; supports `auto`. |
| `quality` | `low` \| `medium` \| `high` \| `auto` | Rendering quality. |
| `format` | string | File output format. |
| `compression` | 0-100 | Compression level for JPEG/WebP formats. |
| `background` | `transparent` \| `opaque` \| `auto` | `gpt-image-2` doesn't support transparent backgrounds. |
| `action` | `auto` (default) \| `generate` \| `edit` | Whether the model chooses, always generates, or is forced to edit an image already in context. Forcing `edit` without an image in context errors. |
| `partial_images` | 1-3 | Number of streamed partial images when `stream: true`. |
| `input_image_mask` | object (`file_id`) | Mask applied to the first input image, same semantics as the Images API edit mask. |

## Multi-turn editing

Reference a previous image either via `previous_response_id`, or by re-sending the `image_generation_call` output item (with its `id`) as input — both let you iteratively refine an image across turns.

```javascript
const response_fwup = await openai.responses.create({
  model: "gpt-5.6",
  previous_response_id: response.id,
  input: "Now make it look realistic",
  tools: [{ type: "image_generation" }],
});
```

## Streaming

```javascript
const stream = await openai.responses.create({
  model: "gpt-5.6",
  input: "Draw a river of white owl feathers...",
  stream: true,
  tools: [{ type: "image_generation", partial_images: 2 }],
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

## Notes

- Distinct from `images.generate` / `images.edit` on the standalone Images API (`image-generation.md`) — the tool adds multi-turn editing and accepts File IDs as input images, but Responses API requests also bill the mainline model's own token usage.
- The base request/response shape of the Responses API (`tools`, `tool_choice`, streaming events unrelated to images) is covered by the `openai-agents` / `openai-api-core` skills, not here.

## Related

- [image-generation.md](./image-generation.md)
- [moderation-and-errors.md](./moderation-and-errors.md)
