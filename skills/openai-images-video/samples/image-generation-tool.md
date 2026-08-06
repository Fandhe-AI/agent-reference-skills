# Image Generation Tool (Responses API)

Generate an image inline in a conversational Responses API call using the built-in `image_generation` tool.

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_generation_calls = [
    output for output in response.output if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.6",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

Refine the same image across turns by passing back the prior `image_generation_call` id:

```python
response_fwup = client.responses.create(
    model="gpt-5.6",
    input=[
        {
            "role": "user",
            "content": [{"type": "input_text", "text": "Now make it look realistic"}],
        },
        {
            "type": "image_generation_call",
            "id": image_generation_calls[0].id,
        },
    ],
    tools=[{"type": "image_generation"}],
)
```

## Notes

- Generated images arrive base64-encoded in `output` items of type `image_generation_call`, under the `.result` field.
- Multi-turn editing works via either `previous_response_id` (chain full context) or by passing the prior `image_generation_call` id back in `input` (reference a specific image).
- `size`, `quality`, and `background` accept `auto` so the model can pick the best option for the prompt; set `partial_images` (1-3) on a streaming request to receive progressive previews via `response.image_generation_call.partial_image` events.
- This tool is distinct from the direct Images API (`client.images.generate` / `client.images.edit`) — use it when image generation should happen as part of a broader conversational agent turn. The base Responses API request/response shape is covered by the `openai-api-core` skill; this tool config is images-specific.
