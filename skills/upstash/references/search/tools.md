# Tools: Database Migrator / Documentation Crawler

CLI tools for filling an Upstash Search database: `@upstash/search-migrator` (from Algolia / Meilisearch) and `@upstash/search-crawler` (crawl a docs site).

## Signature / Usage

Database Migrator (prompts for credentials):

```sh
npx @upstash/search-migrator
```

Algolia to Upstash:

```sh
npx @upstash/search-migrator \
  --upstash-url "UPSTASH_SEARCH_REST_URL" \
  --upstash-token "UPSTASH_SEARCH_REST_TOKEN" \
  --algolia-app-id "YOUR_ALGOLIA_APP_ID" \
  --algolia-api-key "YOUR_ALGOLIA_WRITE_API_KEY"
```

Meilisearch to Upstash:

```sh
npx @upstash/search-migrator \
  --upstash-url "UPSTASH_SEARCH_REST_URL" \
  --upstash-token "UPSTASH_SEARCH_REST_TOKEN" \
  --meilisearch-host "YOUR_MEILISEARCH_HOST" \
  --meilisearch-api-key "YOUR_MEILISEARCH_API_KEY"
```

Documentation Crawler (CLI):

```sh
npx @upstash/search-crawler \
  --upstash-url "UPSTASH_SEARCH_REST_URL" \
  --upstash-token "UPSTASH_SEARCH_REST_TOKEN" \
  --index-name "my-index" \
  --doc-url "https://example.com/docs"
```

Documentation Crawler (library):

```typescript
import {
  crawlAndIndex,
  type CrawlerOptions,
  type CrawlerResult,
} from "@upstash/search-crawler";

const options: CrawlerOptions = {
  upstashUrl: "UPSTASH_SEARCH_REST_URL",
  upstashToken: "UPSTASH_SEARCH_REST_TOKEN",
  indexName: "my-docs",
  docUrl: "https://example.com/docs",
  silent: true, // no console output
};

const result: CrawlerResult = await crawlAndIndex(options);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| --upstash-url | string | `UPSTASH_SEARCH_REST_URL` (Console > Details) |
| --upstash-token | string | `UPSTASH_SEARCH_REST_TOKEN` |
| --algolia-app-id / --algolia-api-key | string | Migrator source credentials (Algolia) |
| --meilisearch-host / --meilisearch-api-key | string | Migrator source credentials (Meilisearch) |
| --index-name | string | Crawler: optional custom index name |
| --doc-url | string | Crawler: documentation URL to crawl |

## Notes

- Migrator process: connect to the source, fetch all documents of the index, transform to Upstash Search format, upload, verify by comparing document counts. Document IDs and metadata are preserved; content maps to Upstash Search's content field; all fields are searchable by default.
- Free tier allows 10000 document upserts per day, so a migration with more entries could be interrupted.
- Crawler: discovers internal doc links, crawls and extracts content, tracks new or obsolete data, upserts records. Missing CLI options are prompted.
- The crawler docs suggest combining it with QStash Schedule to keep the index up to date; example: https://github.com/upstash/search-js/tree/main/examples/search-docs
- Creating new Upstash Search databases is no longer supported (stated on the crawler page); for new projects the official docs recommend Upstash Vector.
- This is Upstash Search, distinct from Upstash Redis Search.
- Sources (fetched 2026-10): https://upstash.com/docs/search/tools/databasemigrator, https://upstash.com/docs/search/tools/documentationcrawler

## Related

- [upsert.md](./upsert.md)
- [docusaurus.md](./docusaurus.md)
- [pricing.md](./pricing.md)
