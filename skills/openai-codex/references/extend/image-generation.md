# Image Generation

Ask ChatGPT or Codex to generate or edit images (UI assets, banners, backgrounds, illustrations, sprite sheets, placeholders), optionally guided by a reference image.

## Signature / Usage

```text
Create a clean editorial illustration for an employee onboarding guide. Show a person organizing a project at a desk with a laptop, notebook, and simple progress checklist. Use soft daylight from a window on the left, restrained colors, and a modern, approachable style. Keep the background minimal. Do not include logos, text, or futuristic imagery.
```

### By surface

| Surface | How |
|---------|-----|
| Desktop app | Ask from the composer; add a reference image to transform an asset. Select an image for **Focused view** or **Canvas view**; in Canvas use **Comment** and **Multi-select** to send feedback on several images. |
| Web | Ask in a chat; attach a reference image to edit it or use it as guidance. |
| CLI | Describe the image, or include `$imagegen`; attach with `-i` / `--image`. |
| IDE extension | Ask from the chat; drag a reference image into the composer while holding Shift. |

Include `$imagegen` in a prompt (app, CLI, IDE) to invoke the image generation skill explicitly.

### Editing and multi-image prompts

```text
Edit the attached image. Replace only the mug with a small potted plant. Preserve the person, desk layout, lighting, colors, crop, and every other detail exactly. Do not add text or logos.
```

```text
Image 1 is the product photo to edit. Image 2 is the style reference. Keep the product, camera angle, layout, and objects from image 1, but apply the clean line work, muted palette, and soft shadows from image 2. Keep the product centered and leave the upper-right corner clear for later copy.
```

```text
Add only the title “SPRING WORKSHOP” in large, bold, white sans-serif letters, centered in the top third of the image. Keep the title on one line. Do not add any other text or change the underlying image.
```

## Notes

- Built-in image generation (app, CLI, IDE) uses `gpt-image-2` and counts toward general Codex usage limits; it uses included limits 3-5x faster on average than similar turns without image generation. For larger batches, set `OPENAI_API_KEY` and ask to generate through the API so API pricing applies.
- On web, availability and limits depend on plan and workspace settings; for programmatic use see the Image generation API guide at https://developers.openai.com/api/docs/guides/image-generation.
- Prompt tips: state purpose or audience, subject, setting, composition and style, framing/lighting/colors when they matter, and constraints. Prefer concrete visual language; repeat fixed requirements.
- Refine with small targeted changes, one element at a time; when editing say what must stay the same. Identify multiple reference images by order and use spatial terms.
- In-image text: keep it short, quote the exact text, specify font style, size, color, placement. For dense copy or production typography, review every word and finish in a design tool.
- Use real-person likenesses only with permission; ask for original treatments rather than imitating a brand, artist, or artwork; crediting OpenAI is optional; follow OpenAI's usage policies.
- Source: https://learn.chatgpt.com/docs/image-generation (retrieved 2026-11-14).

## Related

- [Image inputs](./image-inputs.md)
- [Visualizations](./visualizations.md)
