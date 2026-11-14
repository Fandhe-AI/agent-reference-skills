# Redis Search — Recipes

Three end-to-end recipes with schema, sample data and query patterns: e-commerce product search, blog article search, and an employee directory with autocomplete.

## Signature / Usage

```ts
// E-commerce: search within a category, price range, and only in-stock items
const results = await products.query({
  filter: {
    $must: {
      description: "noise cancellation",
      category: "Electronics > Audio > Headphones",
      inStock: true,
      price: { $gte: 200, $lte: 400 },
    },
  },
});

// E-commerce: search for headphones, boosting Sony and in-stock items
const results = await products.query({
  filter: {
    $must: {
      name: "headphones",
    },
    $should: [
      { brand: "Sony", $boost: 5.0 }, // Preferred brand
      { inStock: true, $boost: 10.0 }, // Strongly prefer in-stock
      { description: "premium", $boost: 2.0 },
    ],
  },
});

// Blog: search with highlighted matches in title and body
const results = await articles.query({
  filter: {
    $should: [
      { title: "full-text search" },
      { body: "full-text search" },
    ],
  },
  highlight: {
    fields: ["title", "body"],
  },
});

// Blog: boost title matches for better relevance
const results = await articles.query({
  filter: {
    $should: [
      { title: "redis search", $boost: 5.0 }, // Title matches score 5x higher
      { body: "redis search" },
      { summary: "redis search", $boost: 2.0 },
    ],
  },
});

// Directory: as user types "ja" in the search box
const suggestions = await users.query({
  filter: {
    "profile.displayName": {
      $fuzzy: {
        value: "ja",
        prefix: true,
      },
    },
  },
  limit: 5,
});
```

## Options / Props

| Recipe | Data type | Key features |
|--------|-----------|--------------|
| E-commerce Search | JSON (`product:`) | Fuzzy matching, range filters, boosting, sorting, `SEARCH.COUNT`; schema with `brand` `noStem()`, `category` `noTokenize()`, `price` / `rating` as `F64`, `createdAt` `s.date().fast()` |
| Blog Search | Hash (`article:`) | Phrase matching, date ranges, highlighting (custom tags), smart matching, popularity via a `FAST` `viewCount`; hash values are strings (`published: "true"`, `viewCount: "1542"`) |
| User Directory | JSON (nested `profile.*`) | Autocomplete with `$fuzzy` + `prefix`, nested fields, exact username / email lookup (`NOTOKENIZE`), boolean filters, bio skill search |

## Notes

- Takeaways stated on the official pages: use `NOTOKENIZE` for categories / codes / usernames / emails, `NOSTEM` for brand names and proper nouns, mark price / rating / date / popularity fields `FAST` for sorting, combine `$must` / `$should` / `$mustNot`, use `$boost` to promote items, use `SEARCH.COUNT` for pagination UIs, use highlighting to show why a result matched, filter drafts with `published: true` in `$must`
- Autocomplete: `$fuzzy` with `prefix: true` handles incomplete words and typos; a smart-matched value like `"jane smi"` applies fuzzy prefix to the last word automatically
- The official recipes also use `waitIndexing()` after inserting sample data; they run against a fresh index with the sample documents shown on each recipe page, which are not reproduced here
- Related tutorials listed by the official overview: Building Analytics with Redis (https://upstash.com/blog/building-analytics-with-redis) and Agent Memory with Redis Search (https://upstash.com/docs/redis/tutorials/agent_memory, not mirrored here)
- Source: https://upstash.com/docs/redis/search/recipes/overview, /e-commerce-search, /blog-search, /user-directory (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Field Operators](./search-field-operators.md)
- [Redis Search: Query Operators](./search-query-operators.md)
