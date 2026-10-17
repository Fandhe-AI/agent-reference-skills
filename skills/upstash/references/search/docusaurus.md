# Docusaurus Integration

AI-powered search component for Docusaurus using Upstash Search (`@upstash/docusaurus-theme-upstash-search`), with dark/light mode support.

## Signature / Usage

```bash
npm install @upstash/docusaurus-theme-upstash-search
```

Enable the searchbar in the Docusaurus config:

```js
export default {
  themes: ['@upstash/docusaurus-theme-upstash-search'],
  // ...
  themeConfig: {
    // ...
    upstash: {
      upstashSearchRestUrl: "UPSTASH_SEARCH_REST_URL",
      upstashSearchReadOnlyRestToken: "UPSTASH_SEARCH_READ_ONLY_REST_TOKEN",
      upstashSearchIndexName: "UPSTASH_SEARCH_INDEX_NAME",
    },
  },
};
```

Index the documentation (`.env` first, then run):

```bash
UPSTASH_SEARCH_REST_URL=
UPSTASH_SEARCH_REST_TOKEN=
UPSTASH_SEARCH_INDEX_NAME=
DOCS_PATH=
```

```bash
npx --package @upstash/docusaurus-theme-upstash-search index-docs-upstash
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| upstashSearchRestUrl | string | REST URL from Upstash Console (themeConfig.upstash) |
| upstashSearchReadOnlyRestToken | string | Read-only token for the searchbar |
| upstashSearchIndexName | string | Index name; default `docusaurus` |
| DOCS_PATH | env | Docs directory for indexing; default `docs` |
| UPSTASH_SEARCH_INDEX_NAME | env | Index name for indexing; must match `upstashSearchIndexName` |

## Notes

- Use the read-only token in `themeConfig`; use the non-read-only token (`UPSTASH_SEARCH_REST_TOKEN`) for indexing because data is upserted.
- Create the search database with the Upstash generated embedding model.
- Creating new Upstash Search databases is no longer supported; for new projects the official docs recommend Upstash Vector.
- This is Upstash Search, distinct from Upstash Redis Search.
- Source: https://upstash.com/docs/search/integrations/docusaurus (fetched 2026-10); repository: https://github.com/upstash/docusaurus-theme-upstash-search

## Related

- [upsert.md](./upsert.md)
- [indexes.md](./indexes.md)
- [search-ui.md](./search-ui.md)
