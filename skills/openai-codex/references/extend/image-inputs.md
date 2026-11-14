# Image Inputs

Add images to a prompt when the task depends on visual context (error screenshot, interface design, architecture diagram, existing asset).

## Signature / Usage

```bash
codex -i screenshot.png "Explain this error and suggest the smallest fix"
codex --image before.png,after.png "Compare these states and list the regressions"
```

### By surface

| Surface | How |
|---------|-----|
| Desktop app | Drag an image into the composer while holding Shift; or ask ChatGPT to inspect an image on your system or use a screenshot tool to verify work in another app. |
| Web | Attach, paste, or drag an image into the composer. |
| CLI | Paste into the interactive composer, or `-i` / `--image` with one or more files (comma-separated paths or repeat `--image`). Common formats such as PNG and JPEG. |
| IDE extension | Drag into the composer while holding Shift so the extension accepts the drop instead of the editor. |

### Prompt around the image

```text
Compare this checkout screen with the design. Fix spacing and typography only;
do not change behavior. Verify the result with a new screenshot.
```

Name what the image shows, point to the area that matters, state output and constraints; identify each image when attaching several.

## Notes

- Use an image input to inspect a visual reference; use image generation to create or edit an image.
- Source: https://learn.chatgpt.com/docs/image-inputs (retrieved 2026-11-14).

## Related

- [Image generation](./image-generation.md)
- [CLI](../getting-started/cli.md)
