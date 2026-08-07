# Image Token Costs and Vision Limitations

How image inputs are converted to billable tokens, and known limitations of model vision capabilities.

## Model sizing behavior

Different model families use different resizing rules before tokenization:

| Model family | Supported `detail` levels | Behavior |
|---|---|---|
| GPT-5.6 family | `low`, `high`, `original`, `auto` | `low`/`high` may resize under finite limits; `original`/`auto` preserve input dimensions (no patch/pixel-budget resize). |
| `gpt-5.5`, `gpt-5.4` | `low`, `high`, `original`, `auto` | `high` allows up to 2,500 patches or 2048px max dimension; `original` up to 10,000 patches or 6000px max dimension; image is resized proportionally if exceeded. |
| `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.2`, `o4-mini`, etc. | `low`, `high`, `auto` | `high` allows up to 1,536 patches or 2048px max dimension. |
| `gpt-4o`, `gpt-4.1`, `gpt-4o-mini`, `computer-use-preview`, o-series (except `o4-mini`) | `low`, `high`, `auto` | Tile-based resizing (see below), not patch-based. |

## Patch-based image tokenization (GPT-5.x)

```
original_patch_count = ceil(width/32) × ceil(height/32)
```

If the original patch count exceeds the model's patch budget, the image is scaled down proportionally:

```
shrink_factor = sqrt((32^2 × patch_budget) / (width × height))
resized_patch_count = ceil(resized_width/32) × ceil(resized_height/32)
```

A model multiplier is then applied to the resized patch count to get billed tokens, e.g. `gpt-5.4-mini` = 1.62x, `gpt-5.4-nano` = 2.46x, `o4-mini` = 1.72x.

## Tile-based image tokenization (GPT-4o / GPT-4.1 family, o-series except o4-mini)

- `detail: "low"` costs a fixed base token count per model.
- `detail: "high"`: scale to fit 2048x2048, then scale shortest side to 768px, count 512px tiles, add base tokens.

| Model | Base tokens | Tile tokens |
|---|---|---|
| `gpt-5`, `gpt-5-chat-latest` | 70 | 140 |
| `gpt-4o`, `gpt-4.1`, `gpt-4.5` | 85 | 170 |
| `gpt-4o-mini` | 2833 | 5667 |
| `o1`, `o1-pro`, `o3` | 75 | 150 |
| `computer-use-preview` | 65 | 129 |

GPT Image 1 uses the same tile method but scales the shortest side to 512px; high input fidelity adds 4160 (square) or 6240 (portrait/landscape) extra tokens.

## Limitations

- **Medical images**: not suitable for CT scans or medical advice.
- **Non-Latin text**: reduced accuracy for non-Latin alphabets (Japanese, Korean).
- **Small text**: enlarge text in the image; `detail: "original"` can help.
- **Rotation**: may misinterpret rotated/upside-down content.
- **Visual elements**: struggles with graphs/lines that vary by color or style (solid/dashed/dotted).
- **Spatial reasoning**: struggles with precise spatial localization (e.g. chess positions).
- **Accuracy**: may generate incorrect descriptions or captions.
- **Image shape**: struggles with panoramic and fisheye images.
- **Metadata**: original file names/metadata are not processed; `low`/`high` detail may resize images before analysis.
- **Counting**: approximate counts only.
- **CAPTCHAs**: submission is blocked for safety reasons.

## Notes

- Each processed image counts toward tokens-per-minute (TPM) limits like text.
- Use the pricing page's image pricing calculator for exact per-request cost estimates.

## Related

- [image-input.md](./image-input.md)
