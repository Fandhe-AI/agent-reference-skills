# Image Input Token and Cost Calculator

Estimate the input tokens and cost of sending an image to an OpenAI vision model. Select a model, enter your image dimensions, and choose a detail level. For GPT Image generation and editing costs, use the image generation calculator (vision-model only; GPT Image generation and editing are not covered here). Source: https://developers.openai.com/api/docs/guides/image-cost-calculator

## Signature / Usage

Steps in the calculator:

1. Select the vision model you plan to use.
2. Enter the original image width and height in pixels. The calculator applies the model's resizing rules.
3. Select an image detail level supported by the model.
4. Read the image input tokens and estimated cost.

Worked example from the page:

```text
Image: 6000 x 6000, model: gpt-6-astra
detail: original -> 35,344 patches  (exceeds the 30,000-patch limit)
detail: high     ->  2,500 patches  (fits after resizing)
```

## Notes

- If the processed image exceeds the 30,000-patch limit, the calculator shows a rejection message instead of an estimate.
- Expand **Calculation details** to see the resized dimensions and token calculation.
- Choose `high` only when your task does not require original resolution or precise image coordinates.
- The estimate covers one image at standard input rates. It excludes other prompt tokens, model output, caching, long-context pricing, and data-residency adjustments.
- Billing can differ by one token due to rounding.
- For GPT Image generation and editing costs, use the image generation calculator: https://developers.openai.com/api/docs/guides/image-generation#calculating-costs
- Resizing and tokenization rules: https://developers.openai.com/api/docs/guides/images-vision#calculating-costs
- 30,000-patch limit (image input requirements): https://developers.openai.com/api/docs/guides/images-vision#image-input-requirements
- Current model rates and other charges: https://developers.openai.com/api/docs/pricing

## Related

- [image-tokens-and-limitations.md](./image-tokens-and-limitations.md)
- [image-input.md](./image-input.md)
- [image-generation.md](../images/image-generation.md)
