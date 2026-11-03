---
source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/supported-formats/, https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/
---

# Markdown conversion: supported formats and how it works

File formats accepted by `toMarkdown` and how HTML, images, and PDFs are pre-processed.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/

```js
const formats = await env.AI.toMarkdown().supported();
```

## Options / Props

Supported formats (the list is updated frequently; fetch the live list with `supported()`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| PDF Documents | `.pdf` | — | `application/pdf` |
| Images (1) | `.jpeg`, `.jpg`, `.png`, `.webp`, `.svg`, `.gif`, `.bmp` | — | `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`, `image/bmp` |
| HTML Documents | `.html`, `.htm` | — | `text/html` |
| XML Documents | `.xml` | — | `application/xml` |
| Microsoft Office Documents | `.xlsx`, `.xlsm`, `.xlsb`, `.xls`, `.et`, `.docx` | — | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.ms-excel.sheet.macroenabled.12`, `application/vnd.ms-excel.sheet.binary.macroenabled.12`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Open Document Format | `.ods`, `.odt` | — | `application/vnd.oasis.opendocument.spreadsheet`, `application/vnd.oasis.opendocument.text` |
| CSV | `.csv` | — | `text/csv` |
| Apple Documents | `.numbers` | — | `application/vnd.apple.numbers` |

In this table the Type column holds file extensions and the Description column holds MIME types. (1) Image conversion uses two Workers AI models for object detection and summarization.

## Notes

### HTML pre-processing

- `script` and `style` tags are ignored.
- Meta tags are extracted: `title`, `description`, `og:title`, `og:description`, `og:image`.
- JSON-LD content is extracted if it exists and appended at the end of the converted markdown.
- The base URL for relative links is taken from the first `<base>` element, or from the `hostname` option.
- With `cssSelector`: only matching elements are kept. Without it: elements such as `<header>`, `<footer>`, `<head>` are removed.
- Relative links are resolved to fully qualified URLs when a base URL is known.

### Images

- Animated GIFs: only the first frame is analyzed.
- SVGs are converted to PNG internally.
- An image is "too big" if its width is over 1280px or its height is over 720px; resizing is attempted, and the original is used if resizing fails.
- Object detection uses `@cf/facebook/detr-resnet-50`; detected objects are appended to a prompt for an image-to-text model; the final prompt and image go to `@cf/google/gemma-4-26b-a4b-it`. A preferred `descriptionLanguage` adds a language directive.

### PDFs

- Metadata is extracted (can be removed with `pdf.metadata`).
- Pages are parsed in sequence; the `StructTree` (ISO 14289, PDF/UA) is used to build a semantic Markdown representation when available, otherwise page text is returned as-is.

## Related

- [Markdown conversion](./markdown-conversion.md)
- [Conversion options](./markdown-conversion-options.md)
- [Pricing](./pricing.md)
