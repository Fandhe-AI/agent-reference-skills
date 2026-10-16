# Image Input (Vision)

Give models images as input so they can "see" and understand visual content — objects, shapes, colors, text — via the Responses API, Images API, or Chat Completions API.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "what's in this image?" },
        {
          type: "input_image",
          image_url: "https://.../image.jpg",
          detail: "auto",
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

Images can be provided three ways:

- A fully qualified URL (`image_url`)
- A Base64-encoded data URL (`data:image/jpeg;base64,...`)
- A File ID created via the Files API (`file_id`, `purpose: "vision"`)

Multiple images can be included in one `content` array in a single request; each counts toward token usage.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"input_image"` | Content part type for image input. |
| `image_url` | string | Fully qualified URL or base64 data URL. |
| `file_id` | string | File ID from the Files API (`purpose: "vision"`). |
| `detail` | `low` \| `high` \| `original` \| `auto` | Processing depth (see below). Supported values depend on the model. Default: `auto` in both the Responses API and the Chat Completions API. |

## Choose an image detail level

| Detail level | Best for |
|---|---|
| `low` | Coarse image understanding. Resizing and token use depend on the model; `low` does not always use fewer tokens than `high`. |
| `high` | Standard high-fidelity image understanding when precise original-image coordinates are not required. |
| `original` | Large, dense, spatially sensitive, or computer-use images, when supported by the model. |
| `auto` | Use the model's default sizing behavior, shown in the model sizing table (`image-tokens-and-limitations.md`): `original` on `gpt-5.5` and the `gpt-6-astra` / GPT-5.6 models, `high` on `gpt-5.4` models. |

For tasks that require fine visual detail or precise coordinates, such as OCR, small-object detection, or computer use, use `"detail": "original"` when supported. Original detail can still resize images to meet the model's pixel-dimension limit or resizing patch budget (for example, sides over 65,535px on `gpt-6-astra` / GPT-5.6 models; 10,000 patches / 6000px on `gpt-5.4` / `gpt-5.5`), but not to meet the separate 30,000-patch rejection limit. For coordinate-sensitive tasks, resize images to fit those limits before sending them and map returned coordinates back to the original image. Computer use coordinate handling is covered by the `openai-agents` skill.

## Image input requirements

| Requirement | Value |
|---|---|
| Supported file types | PNG, JPEG, non-animated GIF, WEBP |
| Size limits | Up to 512 MB total payload per request; up to 1,500 individual image inputs per request |
| Patch limit | Up to 30,000 patches per image (patch-based inputs, after resizing); images over the limit are rejected, not resized |
| Other | Clear enough for the model to analyze; image tokens and the rest of the prompt must fit the model's context limit; image use must comply with OpenAI's usage policies |

## Notes

- This page covers image *input* (understanding). For image *generation/editing*, see the `images` category (`image-generation.md`, `image-generation-tool.md`).
- CAPTCHA submissions are blocked for safety reasons regardless of detail level.
- Token cost and model-specific resizing behavior are covered separately in `image-tokens-and-limitations.md`.

## Related

- [image-tokens-and-limitations.md](./image-tokens-and-limitations.md)
- [image-cost-calculator.md](./image-cost-calculator.md)
- [vision-fine-tuning.md](./vision-fine-tuning.md)
