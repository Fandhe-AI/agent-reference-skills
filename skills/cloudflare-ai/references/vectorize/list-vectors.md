---
source: https://developers.cloudflare.com/vectorize/best-practices/list-vectors/, https://developers.cloudflare.com/vectorize/reference/client-api/
---

# List vectors

Enumerate vector identifiers in an index with cursor-based pagination (up to 1000 per page).

## Signature / Usage

```sh
# Start iteration
wrangler vectorize list-vectors my-index --count=1000

# Continue with cursor from response
wrangler vectorize list-vectors my-index --count=1000 --cursor="<cursor-from-response>"

# Repeat until no more results
```

```sh
wrangler vectorize list-vectors <index-name> [--count=<number>] [--cursor=<cursor-string>]
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<index-name>` | string | — | Name of the Vectorize index. |
| `--count` | number | 100 | Vector IDs per page; between 1 and 1000. |
| `--cursor` | string | — | Pagination cursor from the previous response. |

### Response fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| count | — | — | Vectors returned in this response. |
| totalCount | — | — | Total vectors in the index. |
| isTruncated | — | — | Whether more vectors are available. |
| nextCursor | — | — | Cursor for the next page (null if no more results). |
| cursorExpirationTimestamp | — | — | When the cursor expires. |
| vectors | — | — | Array of vector identifiers. |

## Notes

- Use for bulk operations, auditing, data migration, and cleanup.
- Snapshot consistency: results belong to the index snapshot of the first request. Vectors inserted afterwards do not appear; vectors deleted afterwards still appear until pagination completes. Start a new sequence (no cursor) to see recent changes.
- If a cursor expires, start a new sequence.
- Leave enough gap between consecutive requests to avoid rate limits.
- `client.vectorize.indexes.list_vectors()` was not in a published Cloudflare Python SDK as of v4.3.1; use the REST API or Wrangler.
- Wrangler flags: see cloudflare-wrangler (commands/vectorize.md).

## Related

- [Binding API](./binding-api.md)
- [Limits](./limits.md)
