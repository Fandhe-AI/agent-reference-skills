---
source: https://developers.cloudflare.com/ai-search/configuration/data-source/d1/
---

# D1 data source (beta)

Connect a Cloudflare D1 database so AI Search runs a read-only query you provide and indexes each returned row as a separate document.

## Signature / Usage

Create a D1-backed instance with the REST API (a `token_id` of a service API token is always required; its AI Search Index Engine permission includes the D1 Read permission):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "help-center",
    "type": "d1",
    "source": "<D1_DATABASE_ID>",
    "token_id": "<SERVICE_TOKEN_ID>",
    "source_params": {
      "d1": {
        "query": "SELECT article_id AS id, title, body AS content, category AS meta_category\nFROM articles\nWHERE published = 1",
        "template": "labelled"
      }
    }
  }'
```

The same instance with the Workers binding (Snippet taken from https://developers.cloudflare.com/ai-search/api/instances/workers-binding/):

```ts
const instance = await env.AI_SEARCH.create({
	id: "help-center",
	type: "d1",
	source: "<D1_DATABASE_ID>",
	token_id: "<SERVICE_TOKEN_ID>",
	source_params: {
		d1: {
			query: `
				SELECT
				  article_id AS id,
				  title,
				  content,
				  category AS meta_category
				FROM articles
				WHERE published = 1
			`,
		},
	},
});
```

In the dashboard, select **D1 Database** as the data source, choose the database, write the query, and choose a document template. Select **Test query** to run the query on one row and check its columns before you create the instance.

## Options / Props

`source_params.d1`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `query` | string | — | Required. Read-only `SELECT` or `WITH` query that returns an `id` column; up to 10,000 characters. |
| `template` | string | `labelled` | `labelled`, `content_only`, `key_value`, or `json` (dashboard: **Labelled**, **Content only**, **Key-value**, **JSON**). An update that omits it keeps the stored template. |
| `include_items` / `exclude_items` | string[] | — | Path filters matched against each row's item key, such as `42.md`. |

Instance-level fields: `type: "d1"` (never inferred), `source` = D1 database ID (UUID, cannot be changed after creation), `token_id` (required).

### Query requirements

- A single read-only statement that starts with `SELECT` or `WITH`.
- No `;`, `--`, or `/*`, and no bound parameters such as `?`, `:name`, `@name`, or `$name`.
- No write or administrative keywords (`INSERT`, `UPDATE`, `DELETE`, `REPLACE`, `PRAGMA`, and similar) and no names that start with `sqlite_`, `_cf_`, or `pragma_`. These are rejected anywhere in the query, including string literals, so the `replace()` function is also rejected.
- Balanced parentheses.
- Returns an `id` that is unique, not `NULL` or empty, and either all text or all integers between -9,007,199,254,740,991 and 9,007,199,254,740,991.
- Returns at least one row and at most 100,000 rows.
- Do not use `ORDER BY` or `LIMIT`; AI Search reads the result in pages ordered by `id`.

### Column conventions

| Column | Role |
|--------|------|
| `id` | Required. Identifies the row across syncs. |
| `title` | Optional. Rendered as the document heading. |
| `content` | Optional. Rendered as the document body. |
| `meta_<name>` | Optional. Stored as the custom metadata field `<name>`. |
| Any other column | Rendered as a labeled field, depending on the template. |

Give every result column a unique name (use `AS`). Each row becomes an item with the key `<id>.md` when the `id` has only letters, digits, `.`, `_`, and `-` and is at most 117 characters, unless it already ends in a hyphen and 16 hex characters. Any other `id` gets a key made of a sanitized prefix plus a hash, such as `acme_intro-1a2b3c4d5e6f7a8b.md`. Every chunk carries the exact `id` value in its `row_id` metadata, and changing a row's `id` deletes the item and creates a new one. `NULL` values and empty strings are omitted from the document.

### Document templates

The examples render this row:

```sql
SELECT
  42 AS id,
  'Reset your password' AS title,
  'Go to Settings and select Reset password.' AS content,
  'web' AS platform,
  'account' AS meta_category
```

`labelled` (default) renders the `title` as a heading, every other column except `id` as a labeled field, then the `content`:

```md
# Reset your password

- **platform:** web
- **category:** account

Go to Settings and select Reset password.
```

`content_only` renders only the `title` and `content`; rows without `content` fall back to labeled fields:

```md
# Reset your password

Go to Settings and select Reset password.
```

`key_value` renders one `column: value` line for every non-empty column, including `id`; line breaks in values become spaces:

```txt
id: 42
title: Reset your password
content: Go to Settings and select Reset password.
platform: web
meta_category: account
```

`json` renders the `title` (or the `id`) as a heading, then a JSON object with every non-empty column; numbers stay numbers, which suits structured data such as product catalogs:

```txt
# Reset your password

{
  "id": 42,
  "title": "Reset your password",
  "content": "Go to Settings and select Reset password.",
  "platform": "web",
  "meta_category": "account"
}
```

### Limits

The regular AI Search limits apply (the files-per-instance limit gives an effective cap of whichever value is lower; when a sync reaches it, rows are indexed in `id` order up to the limit and no items are deleted in that sync).

| Limit | Value |
|-------|-------|
| Query length | 10,000 characters |
| Rows returned by the query | 100,000 |
| `id` length | 512 bytes (UTF-8) |
| Rendered document size per row | 64 KiB |
| `meta_*` columns | 5 |
| Metadata value length | 500 characters (longer values are truncated) |
| Metadata per row, including the `id` | 8,000 bytes as JSON |

## Notes

- D1 data sources are in beta. They index database rows, not files.
- Custom metadata: each `meta_<name>` column becomes a custom metadata field `<name>` usable in retrieval filters. Column names are lowercased first; after `meta_` a name must start with a letter, contain only letters, digits, and underscores, and be at most 64 characters. The names `timestamp`, `folder`, `filename`, `file`, and `row_id` are reserved. AI Search builds the `custom_metadata` schema from these columns (integer or real values get `number`, all others `text`); if you pass `custom_metadata` it must list the same fields with the same types. At most five `meta_*` columns; when you change the query you can add `meta_*` columns but cannot remove one or change its type.
- To filter by date, return a Unix timestamp (for example `CAST(strftime('%s', published_at) AS INTEGER) AS meta_published_at`) and filter with `{ "published_at": { "$gte": 1767225600 } }` in `ai_search_options.retrieval.filters`.
- Path filtering: rules match the row's item key (such as `42.md`) with the same syntax as R2 path filters, for example Exclude `drafts-*.md`. AI Search still reads excluded rows from D1, so filtering with `WHERE` in the query is usually simpler and reads fewer rows.
- Syncing: D1-backed instances sync on the instance sync interval. New rows are indexed, changed rows are re-indexed (unchanged rows skipped), and rows the query no longer returns are deleted, but only after AI Search reads the full result. If the query fails or returns no rows, the sync job ends with an error and the indexed items are kept. Every sync reads the full query result at least twice with your service API token (once to check the `id` values, then in pages), so it counts toward your D1 rows read.
- Updating: use the Update instance API to change the query, template, or path filters. A `query` or `template` omitted from `source_params.d1` keeps its current value, but a `source_params` object replaces `include_items` and `exclude_items`, so send them again to keep them. A change starts a sync. The `source` database cannot be changed. Before it creates the instance, AI Search checks the database, the token, the query, and the result columns; a failed check returns an error and creates no instance.
- Storage: rows are stored as Markdown items in built-in storage automatically. List items with the Items API; download an item to see the Markdown rendered for a row.
- Best practices: select only the columns you need and leave out volatile ones (view counters, `updated_at`) because a changed value re-indexes the row; use a stable, indexed `id` (the primary key; a computed `id` can make D1 scan the full result for every page); filter with `WHERE`.
- Example queries: `SELECT tenant_id || ':' || slug AS id, title, body AS content FROM pages` (text and composite keys); `SELECT t.ticket_id AS id, t.subject AS title, c.name AS customer FROM tickets t JOIN customers c ON c.customer_id = t.customer_id` (joins with unique aliases); `SELECT slug AS id, title, body AS content FROM posts WHERE status = 'published'` (published rows only).
- Errors: D1 row errors, sync job errors, and pauses are listed in error-codes.md. D1 database itself: cloudflare-storage skill.
- Source: https://developers.cloudflare.com/ai-search/configuration/data-source/d1/ (pin 34d908a / fetched 2026-11-14)

## Related

- [Data sources](./data-sources.md)
- [Service API token](./service-api-token.md)
- [Metadata attributes](./metadata-attributes.md)
- [Chunking and path filtering](./chunking-and-path-filtering.md)
- [Syncing](./syncing.md)
- [Error codes](./error-codes.md)
