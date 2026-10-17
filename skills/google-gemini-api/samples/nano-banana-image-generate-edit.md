---
source: https://ai.google.dev/gemini-api/docs/image-generation
---

# Nano Banana Image Generation and Editing

Generate an image from text, or edit a base64-encoded input image, and save `interaction.output_image`.

```python
from google import genai
import base64

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme",
)

if interaction.output_image and interaction.output_image.data:
    with open("generated_image.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
else:
    print(interaction.output_text)
```

```python
from google import genai
import base64

client = genai.Client()

with open("/path/to/cat_image.png", "rb") as f:
    image_bytes = f.read()

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input=[
        {
          "type": "text",
          "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"
        },
        {
            "type": "image",
            "data": base64.b64encode(image_bytes).decode('utf-8'),
            "mime_type": "image/png"
        }
    ],
)

if interaction.output_image and interaction.output_image.data:
    with open("generated_image.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
else:
    print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({});

  const prompt =
    "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

  const interaction = await ai.interactions.create({
    model: "gemini-nano-banana-2.1",
    input: prompt,
  });
  const generatedImage = interaction.output_image;
  if (generatedImage) {
    const buffer = Buffer.from(generatedImage.data, "base64");
    fs.writeFileSync("gemini-native-image.png", buffer);
    console.log("Image saved as gemini-native-image.png");
  }
}

main();
```

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-nano-banana-2.1",
    "input": [
      {"type": "text", "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"}
    ]
  }'
```

## Notes

- `interaction.output_image` returns the last generated image block; for interleaved text-and-image output, iterate over `steps` instead.
- The Python samples add a None check on `output_image` (as the JS/Go originals do) and drop the unused PIL import.
- Variable expansions use the `"${var}"` form; the official snippet writes `$GEMINI_API_KEY`.
- Model ID `gemini-nano-banana-2.1` is kept as written; the guide also lists `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`, `gemini-3-pro-image`, and `gemini-2.5-flash-image`.
- All generated images include a SynthID watermark.
- Distinct from gpt-image in openai-images-video.
