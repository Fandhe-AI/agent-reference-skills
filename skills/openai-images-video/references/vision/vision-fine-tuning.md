# Vision Fine-Tuning

Supervised fine-tuning (SFT) using image inputs to improve a model's understanding of images, e.g. image classification or correcting instruction-following failures on complex prompts.

OpenAI is winding down the fine-tuning platform for new users; existing users can still create training jobs, and fine-tuned models remain available for inference until their base model is deprecated.

## Signature / Usage

Training examples are JSONL lines with the same message/content shape used for Responses/Chat Completions image inputs (`image_url` as HTTP URL or base64 data URL):

```json
{
  "messages": [
    {"role": "system", "content": "You are an assistant that identifies and describes artworks."},
    {"role": "user", "content": "Describe this artwork."},
    {"role": "user", "content": [
      {"type": "image_url", "image_url": {"url": "https://api.nga.gov/iiif/a2e6da57-3cd1-4235-b20e-95dcaefed6c8/full/!800,800/0/default.jpg"}}
    ]},
    {"role": "assistant", "content": "This appears to be a traditional painted artwork..."}
  ]
}
```

Upload follows the same process as standard supervised fine-tuning. `model`: `gpt-4o-2024-08-06`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `image_url.detail` | `low` \| `high` \| `auto` | Setting `low` resizes to 512x512 and fixes cost at 85 tokens per image, reducing training cost. |

## Image data requirements

- Max 50,000 image-containing examples per training file (not counting text-only examples).
- Max 10 images per example; each image ≤ 10 MB.
- Formats: JPEG, PNG, WEBP; RGB or RGBA mode.
- Images cannot be output from `assistant`-role messages.

## Content moderation policy

Images are scanned before training; the following are excluded automatically: people, faces, children, CAPTCHAs. Also skipped: inaccessible URLs, oversized images, invalid formats.

## Safety checks

After training, the model is evaluated across 13 safety categories (harassment, hate, sexual/minors, violence, self-harm, etc.). Each category has a pass threshold; failing categories block deployment. Query the fine-tuning API events endpoint for `moderation_checks` events to see per-category results.

## Notes

- This page is specific to image-input SFT; general supervised fine-tuning mechanics (job creation, hyperparameters) are covered by the `openai-evals-tuning` skill, not here.
- Self-serve fine-tuning wind-down timeline (official deprecations page): May 7, 2026 — creating fine-tuning jobs or training is not available to organizations that have not previously run fine-tuning; July 2, 2026 — creating jobs is no longer available to organizations that have not run inference on a fine-tuned model in the past 60 days; Jan 6, 2027 — active existing customers can no longer create new fine-tuning jobs. Inference on fine-tuned models is disabled only when the underlying base model is deprecated.

## Related

- [image-input.md](./image-input.md)
