---
source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/
---

# Markdown conversion options

Optional per-format settings passed as `conversionOptions` to `toMarkdown`.

## Signature / Usage

```typescript
{
  output?: {
    format?: 'markdown' | 'text';
  }
}
```

```typescript
{
  image?: {
    descriptionLanguage?: 'en' | 'it' | 'de' | 'es' | 'fr' | 'pt';
  }
}
```

```typescript
{
  html?: {
    hostname?: string;
    cssSelector?: string;
  }
}
```

```typescript
{
  pdf?: {
    metadata?: boolean;
  }
}
```

Adapted (not in the official docs): the official binding example used `...` placeholders; concrete option values are filled in. Run it inside an `async` handler where `files` is a `MarkdownDocument[]`.

```typescript
await env.AI.toMarkdown(files, {
  conversionOptions: {
    html: { hostname: "https://example.com/docs/page", cssSelector: "main" },
    pdf: { metadata: false },
    image: { descriptionLanguage: "en" },
    output: { format: "markdown" },
  },
});
```

REST (multipart form field with a stringified object). Adapted (not in the official docs): placeholders replaced by concrete values, and the files are given explicitly.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \
  -X POST \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -F "files=@page.html" \
  -F 'conversionOptions={ "html": { "hostname": "https://example.com/docs/page" } }'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| output.format | 'markdown' \| 'text' | `markdown` | `text` returns plain text with Markdown syntax removed; the result's `format` is then also `text`. |
| image.descriptionLanguage | 'en' \| 'it' \| 'de' \| 'es' \| 'fr' \| 'pt' | — | Language of AI-generated image descriptions (best effort). |
| html.hostname | string | — | Absolute base URL to resolve relative links, with scheme and optionally the page path, for example `https://example.com/docs/page`. A bare hostname is not sufficient. |
| html.cssSelector | string | — | CSS selector to pick specific elements from the HTML. |
| pdf.metadata | boolean | — | Previously metadata was always included; set to opt out. |

## Notes

- All options are optional and organized by file type.
- `descriptionLanguage` is not guaranteed: the resulting text may not be in the desired language.
- `conversionOptions` goes in the second argument of the binding call; over REST it is a form field (`Content-Type: multipart/form-data`).

## Related

- [Markdown conversion](./markdown-conversion.md)
- [Formats and how it works](./markdown-conversion-formats.md)
- [REST API](./markdown-conversion-rest-api.md)
