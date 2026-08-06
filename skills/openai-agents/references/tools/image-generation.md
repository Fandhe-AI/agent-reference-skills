# Image Generation

Hosted `image_generation` tool: generates or edits images from a text prompt (and optional image inputs) using GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`). The model automatically optimizes text inputs for improved performance.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-5.6",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);
```

Force the tool call with `tool_choice: {"type": "image_generation"}`.

Streaming partial images:

```javascript
const stream = await openai.responses.create({
  model: "gpt-5.6",
  input: "Draw a river made of white owl feathers ...",
  stream: true,
  tools: [{ type: "image_generation", partial_images: 2 }],
});

for await (const event of stream) {
  if (event.type === "response.image_generation_call.partial_image") {
    // event.partial_image_index, event.partial_image_b64
  } else if (event.type === "response.completed") {
    // event.response.output filtered for image_generation_call
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | e.g. `"1024x1024"`, `"1024x1536"`, `"auto"` | Image dimensions |
| `quality` | `"low" \| "medium" \| "high" \| "auto"` | Rendering quality |
| `format` | string | Output file format |
| `compression` | `0`–`100` | Compression level for JPEG/WebP |
| `background` | `"transparent" \| "opaque" \| "auto"` | `gpt-image-2` does not support transparent backgrounds |
| `action` | `"auto" \| "generate" \| "edit"` | Whether the model chooses, generates, or edits; default `auto` |
| `partial_images` | `1`–`3` | Number of streamed partial images |

## Notes

- The `image_generation_call` output includes a base64-encoded `result` and, when the mainline model revises the prompt, a `revised_prompt` field.
- Multi-turn editing: reference `previous_response_id` or pass back the prior `image_generation_call` item (by `id`) as input to iteratively refine an image.
- Prompting tip: use `draw` / `edit` verbs; to combine images say "edit the first image by adding this element from the second image" rather than "combine"/"merge".
- Supported mainline models include `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.2`, `gpt-5`, `gpt-5-nano`, `o3`, `gpt-4.1` family, `gpt-4o` family — the GPT Image model itself is not a valid `model` field value.

## Related

- [Code Interpreter](./code-interpreter.md)
