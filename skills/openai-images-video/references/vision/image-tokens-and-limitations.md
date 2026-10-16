# Image Token Costs and Vision Limitations

How image inputs are converted to billable tokens, and known limitations of model vision capabilities.

## Model sizing behavior

Different model families use different resizing rules before tokenization. The table summarizes sizing behavior for general-purpose vision models. Other models and specialized variants can use different limits. All resizing preserves aspect ratio without enlarging smaller images.

| Model family | Supported `detail` levels | Behavior |
|---|---|---|
| `gpt-6-astra` | `low`, `high`, `original`, `auto` | `low` fits within 512 × 512 px; `high` allows up to 2,500 patches and a 65,535px max dimension (both apply); `original` preserves dimensions except sides over 65,535px are scaled down; more than 30,000 patches is rejected (no resize to fit); `auto` = `original`. |
| `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna` | `low`, `high`, `original`, `auto` | `low` fits within 512 × 512 px; `high` fits within 2048 × 2048 px and 2,500 patches; `original` preserves dimensions except sides over 65,535px are scaled down; more than 30,000 patches is rejected; `auto` = `original`. |
| `gpt-5.5` | `low`, `high`, `original`, `auto` | `low` fits within 512 × 512 px; `high` allows up to 2,500 patches and a 2048px max dimension; `original` up to 10,000 patches and a 6000px max dimension (both limits apply); `auto` = `original`. |
| `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano` | `low`, `high`, `original`, `auto` | `low` uses a 2048px max dimension and a 6,144-patch budget (can cost more tokens than `high`); `high` up to 2,500 patches and a 2048px max dimension; `original` up to 10,000 patches and a 6000px max dimension; `auto` = `high`. |
| `gpt-5.2`, `gpt-4.1-mini` | `low`, `high`, `auto` | All use a 2048px max dimension and a 6,144-patch budget; `original` is not supported. |
| `gpt-5.1`, `gpt-4.1`, `gpt-4o`, `gpt-4o-mini` | `low`, `high`, `auto` | `low` uses a fixed token count. `high` and `auto` use the tile-based sizing rules (see below). |

## Patch-based image tokenization (GPT-5.x)

Some models tokenize images by covering them with 32px x 32px patches. Many model and detail-level combinations define a resizing patch budget. First, the API fits the image within the selected detail level's pixel-dimension limit, preserving aspect ratio and rounding to integer pixels without enlarging smaller images.

A. Compute how many 32px x 32px patches are needed to cover the image after applying the pixel-dimension limit. A patch may extend beyond the image boundary.

```
patch_count = ceil(width/32)×ceil(height/32)
```

B. When the selected model and detail level specify a resizing patch budget, scale the image down proportionally if it exceeds that budget. Otherwise, skip this step. Adjust the scale to stay within budget after converting to integer pixel dimensions and computing patch coverage. Keep full precision until calculating the final dimensions.

```
shrink_factor = sqrt((32^2 * patch_budget) / (width * height))
adjusted_shrink_factor = shrink_factor * min(
  floor(width * shrink_factor / 32) / (width * shrink_factor / 32),
  floor(height * shrink_factor / 32) / (height * shrink_factor / 32)
)
```

C. If step B resized the image, round down the final scaled width and height to integer pixels. Compute the patches needed to cover the resulting image. This is the image-token count before applying the model multiplier. When a patch budget applies, this count stays within that budget.

```
resized_patch_count = ceil(resized_width/32)×ceil(resized_height/32)
```

If this count exceeds 30,000 patches, the API rejects the request. Check this limit before applying the token multiplier.

D. Multiply the patch count by the model's multiplier and round up to get the billable image input tokens. Apply the model's input price to those tokens once; the multiplier does not apply to other prompt tokens or to the price again.

| Model | Multiplier |
|---|---|
| `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.2`, `gpt-5-mini`* | 1.2 |
| `gpt-5-nano`* | 1.5 |
| `gpt-4.1-mini` | 1.62 |
| `gpt-4.1-nano`* (2025-04-14 snapshot) | 2.46 |
| `o4-mini`* | 1.72 |

For `gpt-4.1-mini`, this applies to the 2025-04-14 snapshot.

\* Deprecated and scheduled for shutdown. These models aren't included in the calculator or the model sizing table above.

Image token calculation examples for `gpt-6-astra` with `detail: high` (65,535-pixel maximum dimension, 2,500-patch budget, 1.2× multiplier):

- A 1024 × 1024 image needs `32 × 32 = 1024` patches. No resizing is needed. The billable image input is `ceil(1024 × 1.2) = 1229` tokens.
- A 2048 × 2048 image initially needs `64 × 64 = 4096` patches. The patch budget reduces it to 1600 × 1600 pixels, or `50 × 50 = 2500` patches. The estimate is `ceil(2500 × 1.2) = 3000` tokens.
- A 4096 × 512 image stays at its original size: `128 × 16 = 2048` patches and `ceil(2048 × 1.2) = 2458` tokens.

Floating-point rounding in billing can make the final count differ from the estimate by one token.

## Image input requirements

| Requirement | Supported inputs |
|---|---|
| File types | PNG, JPEG (`.jpeg` / `.jpg`), WEBP, non-animated GIF |
| Request size | Up to 512 MB total payload per request |
| Image count | Up to 1,500 images per request |

For patch-based image inputs, the API supports up to 30,000 patches per image after applying the resizing rules for the selected model and `detail` level. This limit applies across supported detail levels and to each image separately, not to the combined patch count of the request. Lower model- and detail-specific resizing budgets still apply. Images that exceed the 30,000-patch limit after processing are rejected, not automatically resized to meet it; reduce the image's dimensions and try again. Image tokens and the rest of your prompt must also fit the model's input and context limits.

## Tile-based image tokenization

The models in this table use a base token count plus tokens for image tiles:

| Model | Base tokens | Tile tokens |
|---|---|---|
| `gpt-5.1` | 70 | 140 |
| `gpt-5`* | 70 | 140 |
| `gpt-4o`, `gpt-4.1` | 85 | 170 |
| `gpt-4o-mini` | 2833 | 5667 |
| `o1`*, `o1-pro`*, `o3`* | 75 | 150 |

\* Deprecated and scheduled for shutdown. These models aren't included in the calculator or the model sizing table above.

With `"detail": "low"`, an image costs only the model's base tokens, regardless of dimensions. With `"detail": "high"` or `"detail": "auto"`:

- Scale down to fit in a 2048px x 2048px square, maintaining aspect ratio. Smaller images are not enlarged.
- If the shortest side exceeds 768px, scale it down to 768px and round down the other dimension.
- Count the 512px squares needed to cover the image. Each square uses the model's tile tokens.
- Add the model's base tokens to the tile tokens.

## GPT Image model inputs

GPT Image models use separate image-token pricing for generation and editing. The vision calculator does not estimate their input or output costs.

For `gpt-image-1`: use tile-based image sizing, but scale the shortest side down to 512px instead of 768px. Token use depends on the image dimensions and the `input_fidelity` parameter. When input fidelity is low, the base cost is 65 image tokens, and each tile costs 129 image tokens. With high input fidelity, a set number of tokens is added based on aspect ratio: 4160 extra input image tokens for a square image, 6240 extra for an image closer to portrait or landscape.

## Limitations

- **Medical images**: not suitable for CT scans or medical advice.
- **Non-Latin text**: reduced accuracy for non-Latin alphabets (Japanese, Korean).
- **Small text**: enlarge text in the image; `detail: "original"` can help.
- **Rotation**: may misinterpret rotated/upside-down content.
- **Visual elements**: struggles with graphs/lines that vary by color or style (solid/dashed/dotted).
- **Spatial reasoning**: struggles with precise spatial localization (e.g. chess positions).
- **Accuracy**: may generate incorrect descriptions or captions.
- **Image shape**: struggles with panoramic and fisheye images.
- **Metadata and resizing**: the model doesn't process original file names or metadata. Images may be resized before analysis, including with `original` detail.
- **Counting**: approximate counts only.
- **CAPTCHAs**: submission is blocked for safety reasons.

## Notes

- Earlier revisions of this page listed `gpt-5.4-mini` = 1.62x and `gpt-5.4-nano` = 2.46x; the official multiplier table now lists 1.2 for both (1.62 / 2.46 belong to `gpt-4.1-mini` / `gpt-4.1-nano`).
- Each processed image counts toward tokens-per-minute (TPM) limits like text.
- The tile table no longer lists `gpt-5-chat-latest`, `gpt-4.5`, or `computer-use-preview` (65/129); they were removed from the official table.
- For per-request estimates of one image, see `image-cost-calculator.md` (vision models only; it does not estimate GPT Image generation or editing).

## Related

- [image-input.md](./image-input.md)
- [image-cost-calculator.md](./image-cost-calculator.md)
