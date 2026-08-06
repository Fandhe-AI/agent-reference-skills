# Vision: Image Input Understanding

Send an image to the Responses API and ask the model to describe or analyze it.

```javascript
const response = await openai.responses.create({
  model: "gpt-5.6",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "what's in this image?" },
        {
          type: "input_image",
          image_url: "https://api.nga.gov/iiif/a2e6da57-3cd1-4235-b20e-95dcaefed6c8/full/!800,800/0/default.jpg",
          detail: "auto",
        },
      ],
    },
  ],
});
```

Base64-encoded local file:

```python
import base64
from openai import OpenAI

client = OpenAI()

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

base64_image = encode_image("path_to_your_image.jpg")

response = client.responses.create(
    model="gpt-5.6",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": "what's in this image?"},
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{base64_image}",
                },
            ],
        }
    ],
)
```

Reusable File ID (upload once, reference many times):

```javascript
async function createFile(filePath) {
  const fileContent = fs.createReadStream(filePath);
  const result = await openai.files.create({
    file: fileContent,
    purpose: "vision",
  });
  return result.id;
}

const fileId = await createFile("fixtures/example.jpg");

const response = await openai.responses.create({
  model: "gpt-5.6",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "what's in this image?" },
        {
          type: "input_image",
          file_id: fileId,
          detail: "auto",
        },
      ],
    },
  ],
});
```

## Notes

- Images can be supplied as a fully qualified URL (`image_url`), a base64 data URL, or a `file_id` from the Files API (upload with `purpose: "vision"`).
- `detail` controls processing depth: `low` (fast/cheap), `high` (fine detail), `original` (large or spatially sensitive images), `auto` (model picks).
- Supported formats: PNG, JPEG, WEBP, non-animated GIF. Requests accept up to 512 MB total payload and up to 1500 images.
- Vision models may underperform on non-Latin text in images, rotated images, and precise spatial tasks (e.g. chess positions).
