---
source: https://ai.google.dev/gemini-api/docs/generate-content/image-generation
---

# Image generation (generateContent)

Nano Banana is the name for Gemini's native image generation capabilities: generate, edit, and iterate on images conversationally with text, images, video, or a combination, via `generateContent`.

## Signature / Usage

Text-to-image:

```python
from google import genai
from google.genai import types
from PIL import Image

client = genai.Client()

prompt = ("Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme")
response = client.models.generate_content(
    model="gemini-nano-banana-2.1",
    contents=[prompt],
)

for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = part.as_image()
        image.save("generated_image.png")
```

```javascript
const response = await ai.models.generateContent({
  model: "gemini-nano-banana-2.1",
  contents: prompt,
});
for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    console.log(part.text);
  } else if (part.inlineData) {
    const imageData = part.inlineData.data;
    const buffer = Buffer.from(imageData, "base64");
    fs.writeFileSync("gemini-native-image.png", buffer);
    console.log("Image saved as gemini-native-image.png");
  }
}
```

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1/models/gemini-nano-banana-2.1:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [
        {"text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"}
      ]
    }]
  }'
```

Image editing (text-and-image-to-image):

```python
image = Image.open("/path/to/cat_image.png")

response = client.models.generate_content(
    model="gemini-nano-banana-2.1",
    contents=[prompt, image],
)
```

Output types, aspect ratio and size:

```python
response = client.models.generate_content(
    model="gemini-nano-banana-2.1",
    contents=[prompt],
    config=types.GenerateContentConfig(
        response_modalities=['Image']
    )
)

# For gemini-nano-banana-2.1, gemini-3.1-flash-image, and gemini-3-pro-image
response = client.models.generate_content(
    model="gemini-nano-banana-2.1",
    contents=[prompt],
    config=types.GenerateContentConfig(
        response_format={"image": {"aspect_ratio": "16:9", "image_size": "2K"}}
    )
)
```

```bash
"generationConfig": {
  "responseFormat": {
"image": {
    "aspectRatio": "16:9",
    "imageSize": "2K"
  }
}
}
```

Thinking process:

```python
for part in response.parts:
    if part.thought:
        if part.text:
            print(part.text)
        elif image:= part.as_image():
            image.show()
```

## Options / Props

Models:

| Name | Model ID | Notes (from source) |
| --- | --- | --- |
| Nano Banana 2.1 | `gemini-nano-banana-2.1` | Primary high-efficiency workhorse for generation and conversational editing; 1K, 2K, 4K |
| Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) | `gemini-3.1-flash-lite-image` | Fastest and cheapest; not optimized for multiple reference inputs or multi-turn sequential editing; only 1K |
| Nano Banana 2 (Gemini 3.1 Flash Image) | `gemini-3.1-flash-image` | Previous-generation workhorse; new projects should use Nano Banana 2.1 |
| Nano Banana Pro (Gemini 3 Pro Image) | `gemini-3-pro-image` | Premium choice for the most complex visual tasks |
| Nano Banana (Gemini 2.5 Flash Image) | `gemini-2.5-flash-image` | Legacy; recommended migration path is Nano Banana 2 Lite |

| Name | Type | Description |
| --- | --- | --- |
| `response_modalities` / `responseModalities` | string[] | Defaults to text and image (`['Text', 'Image']`); `['Image']` returns images only |
| `response_format.image.aspect_ratio` | string | Output aspect ratio; defaults to matching the input image, otherwise 1:1 |
| `response_format.image.image_size` | string | `1K`, `2K`, `4K` (and `512` on Gemini 3.1 Flash Image only); uppercase K required (`1k` rejected); `512` has no K suffix |

Nano Banana 2.1 sizes (aspect ratio, 1K / 2K / 4K resolution, tokens 1120 / 1680 / 2520):

| Aspect ratio | 1K | 2K | 4K |
| --- | --- | --- | --- |
| 1:1 | 1024x1024 | 2048x2048 | 4096x4096 |
| 2:3 | 848x1264 | 1696x2528 | 3392x5056 |
| 3:2 | 1264x848 | 2528x1696 | 5056x3392 |
| 3:4 | 896x1200 | 1792x2400 | 3584x4800 |
| 4:3 | 1200x896 | 2400x1792 | 4800x3584 |
| 4:5 | 928x1152 | 1856x2304 | 3712x4608 |
| 5:4 | 1152x928 | 2304x1856 | 4608x3712 |
| 9:16 | 768x1376 | 1536x2752 | 3072x5504 |
| 16:9 | 1376x768 | 2752x1536 | 5504x3072 |
| 21:9 | 1584x672 | 3168x1344 | 6336x2688 |

The source also lists 1:4, 1:8, 4:1, 8:1 ratios and separate tables for 3.1 Flash Image (adds 512 at 747 tokens), 3.1 Flash Lite Image (the source's table lists 512 and 1K, although its prose states Flash Lite supports 1K only), 3.1 Pro Image (tokens 1120 / 1120 / 2000), and Gemini 2.5 Flash Image (1290 tokens).

## Notes

- The official Python sample uses unquoted dict keys (`aspect_ratio` / `image_size`) in `response_format`; they are quoted here so the code runs.
- API surface: generateContent. The primary model in the source examples is `gemini-nano-banana-2.1`; model IDs are copied from the source as-is.
- Features covered by the source page (see it for full code): up to 14 reference images, Grounding with Google Search (and Google Search for images on Nano Banana 2.1 and 3.1 Flash), video-to-image generation (Nano Banana 2.1, 3.1 Flash, 3.1 Flash Lite), up to 4K output, multi-turn image editing, batch generation, and a prompting guide.
- Gemini 3 image models are thinking models; thinking is on by default and cannot be disabled; they generate up to two interim images and the last image in Thinking is the final image.
- All generated images include a SynthID watermark.
- Limitations: best languages EN, ar-EG, de-DE, es-MX, fr-FR, hi-IN, id-ID, it-IT, ja-JP, ko-KR, pt-BR, ru-RU, ua-UA, vi-VN, zh-CN; no audio inputs; video inputs only for Gemini Nano Banana 2.1, Gemini 3.1 Flash Image, and Gemini 3.1 Flash Lite Image; the model won't always follow the exact requested number of outputs; `gemini-2.5-flash-image` works best with up to 3 input images while `gemini-3-pro-image` supports 5 with high fidelity and up to 14 total; Nano Banana 2.1 and 3.1 Flash Image support up to 4 characters and 10 objects of fidelity.
- Source inconsistency: for 3.1 Flash Lite Image, the source prose says 1K only (and the `image_size` row above says `512` is Gemini 3.1 Flash Image only), but its 3.1 Flash Lite Image size table has a 512 column. Both are transcribed as-is.
- Imagen: "Imagen models are shut down. Use Nano Banana models for all image generation tasks."
- Distinct from OpenAI gpt-image / Sora (openai-images-video skill).

## Related

- [Multimodal understanding (generateContent)](./multimodal-understanding.md)
- [Thinking (generateContent)](./thinking.md)
