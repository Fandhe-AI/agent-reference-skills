# Vision Fine-Tuning

Supervised fine-tuning that includes image inputs in the training examples, to improve a model's visual understanding (e.g. image classification, complex visual-instruction failures).

Supported model: `gpt-4o-2024-08-06`.

## Signature / Usage

Images are embedded in the JSONL training file using the same `image_url` content structure as a normal API call:

```json
{
  "messages": [
    {"role": "system", "content": "You are an assistant..."},
    {"role": "user", "content": "Describe this artwork."},
    {"role": "user", "content": [
      {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
    ]},
    {"role": "assistant", "content": "This appears to be..."}
  ]
}
```

Images can be HTTP URLs or base64 data URLs. Use `"detail": "low"` on an `image_url` to resize to 512x512 (fixed 85 tokens) and reduce training cost; `detail` accepts `low` / `high` / `auto`.

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `image_url.url` | string | HTTP(S) URL or base64 data URL of the image |
| `image_url.detail` | `low` \| `high` \| `auto` | Controls resize/token cost tradeoff |

## Notes

- Limits: up to 50,000 image-containing examples per training file, up to 10 images per example, 10 MB max per image.
- Supported formats: JPEG, PNG, WEBP; RGB or RGBA color mode only.
- Assistant-role messages cannot contain images as output (images are input-only).
- Images containing people, faces, children, or CAPTCHAs are automatically excluded from training.
- Fine-tuned models undergo the same 13-category safety evaluation as other fine-tuning methods before deployment.
- Subject to the same platform wind-down as other fine-tuning methods (see [model-optimization.md](./model-optimization.md) Notes).

## Related

- [supervised-fine-tuning.md](./supervised-fine-tuning.md)
- [direct-preference-optimization.md](./direct-preference-optimization.md)
- [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md)
