# samples

| Name | Description | Path |
| --- | --- | --- |
| First AI Gateway request to Workers AI | Send a chat completion to Workers AI through an AI Gateway named `default` using the REST API. | [gateway-first-request-workers-ai.md](./gateway-first-request-workers-ai.md) |
| Call Replicate (Pruna P-video) through AI Gateway | Route a Replicate prediction through AI Gateway, synchronously with `Prefer: wait` or asynchronously with polling. | [gateway-replicate-video.md](./gateway-replicate-video.md) |
| Add AI Search UI snippets to a React site | Create a web-crawler instance and drop a search bar, chat bubble, and search modal into a React app. | [search-add-to-website.md](./search-add-to-website.md) |
| Simple search engine with the AI Search binding | A Worker that returns the file names of the chunks matching a query, using `search()` on a namespace binding. | [search-simple-engine.md](./search-simple-engine.md) |
| Search several AI Search instances in one call | Fan one query out to a shared instance and a per-tenant instance with the namespace-level `search()`, and group chunks by `instance_id`. | [search-multiple-instances.md](./search-multiple-instances.md) |
| Fetch rendered web pages and index them | Render a page with the Browser Run binding, upload the HTML to an instance's built-in storage, and search it from the same Worker. | [search-fetch-and-index-pages.md](./search-fetch-and-index-pages.md) |
| Show source citations with an AI-generated answer | Return the `chatCompletions()` answer together with one citation per source document, built from the returned chunks. | [search-chunk-citations.md](./search-chunk-citations.md) |
| Parse citations from a streaming AI Search response | With `stream: true`, rewrite the `chunks` SSE event into a `citations` event and forward the rest. | [search-streaming-citations.md](./search-streaming-citations.md) |
| Retrieve with AI Search, generate with OpenAI | Use `search()` for retrieval and pass the chunks to an external model through the AI SDK. | [search-bring-your-own-model.md](./search-bring-your-own-model.md) |
| Multitenancy: one AI Search instance per tenant | Create, populate, search, and delete an isolated instance per tenant with the namespace binding. | [search-tenant-instances.md](./search-tenant-instances.md) |
| Multitenancy: shared instance with folder filtering | Serve many tenants from one instance organized in per-tenant folders, scoping each query with a `folder` filter. | [search-tenant-filtering.md](./search-tenant-filtering.md) |
| Human-in-the-loop knowledge base updates | An agent that searches AI Search and proposes new documents, with each write paused for human approval and reversible by rollback. | [search-human-in-the-loop-kb.md](./search-human-in-the-loop-kb.md) |
| Talk to your knowledge base (voice agent) | A Cloudflare voice agent that transcribes speech, answers from an AI Search instance through a retrieval tool, and speaks the reply. | [search-voice-knowledge-base.md](./search-voice-knowledge-base.md) |
