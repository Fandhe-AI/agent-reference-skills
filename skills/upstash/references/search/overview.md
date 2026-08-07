# What is Upstash Search?

Upstash Search is a standalone, AI-powered search product combining full-text and semantic search with intelligent ranking, serverless scaling, and no infrastructure management.

## Notes

- **Not the same as Redis Search** (`references/redis/search-*.md` in this skill): Redis Search is a full-text-only extension built into an Upstash Redis database (Tantivy-based, indexes existing Redis keys). Upstash Search is a separate product/database type that combines semantic (vector) and full-text search from the ground up and does not index Redis keys
- Setup is plug-and-play with sensible presets; designed for serverless architectures and frameworks like Next.js
- Built on the same LLM/vector expertise as Upstash Vector and Redis
- Scales to large datasets; Upstash reports indexing Wikipedia across seven languages as a capability demonstration
- The official docs recommend Redis Search instead for new projects that want to keep data and search in one Redis database

## Related

- [getting-started.md](./getting-started.md)
- [pricing.md](./pricing.md)
- Redis Search: [search-introduction.md](../redis/search-introduction.md)
