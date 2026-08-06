# Image Input (Vision)

Give models images as input so they can "see" and understand visual content — objects, shapes, colors, text — via the Responses API, Images API, or Chat Completions API.

## Signature / Usage

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
| `detail` | `low` \| `high` \| `original` \| `auto` | Processing depth (see below). Default: `auto`. |

## Choose an image detail level

| Detail level | Best for |
|---|---|
| `low` | Fast, low-cost understanding; resizes to 512x512. |
| `high` | Standard high-fidelity understanding when precise coordinates aren't required. |
| `original` | Large, dense, spatially sensitive, or computer-use images (OCR, bounding boxes, localization); available on `gpt-5.4`+. Preserves input dimensions without resizing to a patch/pixel budget. |
| `auto` | Automatic selection; on `gpt-5.5` and GPT-5.6 models, equivalent to `original`. |

`low`/`high` may resize the image before analysis, which can obscure small details and cause returned coordinates to no longer match the original image — use `original` for coordinate-sensitive tasks such as computer use.

## Image input requirements

| Requirement | Value |
|---|---|
| Supported file types | PNG, JPEG, non-animated GIF, WEBP |
| Size limits | Up to 512 MB total payload per request; up to 1,500 individual image inputs per request |
| Other | No watermarks/logos; no NSFW content; must be clear enough for a human to understand |

## Notes

- This page covers image *input* (understanding). For image *generation/editing*, see the `images` category (`image-generation.md`, `image-generation-tool.md`).
- CAPTCHA submissions are blocked for safety reasons regardless of detail level.
- Token cost and model-specific resizing behavior are covered separately in `image-tokens-and-limitations.md`.

## Related

- [image-tokens-and-limitations.md](./image-tokens-and-limitations.md)
- [vision-fine-tuning.md](./vision-fine-tuning.md)
