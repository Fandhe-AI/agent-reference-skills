# File Search

Hosted `file_search` tool: retrieves information from uploaded files through semantic and keyword search against vector stores, within the Responses API.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: "What is deep research by OpenAI?",
  tools: [
    {
      type: "file_search",
      vector_store_ids: ["<vector_store_id>"],
    },
  ],
});
console.log(response);
```

Metadata filtering:

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: "What is deep research by OpenAI?",
  tools: [
    {
      type: "file_search",
      vector_store_ids: ["<vector_store_id>"],
      filters: {
        type: "in",
        key: "category",
        value: ["blog", "announcement"],
      },
    },
  ],
});
console.log(response);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `vector_store_ids` | `string[]` | Vector stores to search |
| `max_num_results` | `number` | Limits results returned, reducing token usage and latency |
| `filters` | object | Metadata-based comparison filter (e.g. `{type: "in", key, value}`) |
| `include` | `string[]` | Add `"file_search_call.results"` to obtain actual search results alongside the model response |

## Notes

### Setup process

A knowledge base in a vector store must exist before use. This is a hosted tool: when the model decides to use it, OpenAI calls it, retrieves from your files, and returns output.

1. Upload the file to the File API.
2. Create a vector store — see [Vector Stores](./vector-stores.md).
3. Add the file to the vector store and check status until it is `completed` (`openai.vectorStores.files.list(vectorStore.id)`).

### Behavior

- Search results are not returned by default (only annotations in the output text); pass `include: ["file_search_call.results"]`.
- Limiting `max_num_results` reduces token usage and latency but may reduce answer quality.
- Attributes and attribute filters are defined in the retrieval guide — see [Vector Stores](./vector-stores.md).
- Supported files (`text/` MIME types must be `utf-8`, `utf-16`, or `ascii`): `.c`, `.cpp`, `.cs`, `.css`, `.doc`, `.docx`, `.go`, `.html`, `.java`, `.js`, `.json`, `.md`, `.pdf`, `.php`, `.pptx`, `.py`, `.rb`, `.sh`, `.tex`, `.ts`, `.txt`.
- The usage table lists Responses, Chat Completions, and Assistants as API availability (the guide intro describes file search as a tool of the Responses API). Rate limits: Build 500 RPM; Launch and Grow 1000 RPM.
- Source: https://developers.openai.com/api/docs/guides/tools-file-search (fetched 2026-11-14).

## Related

- [Vector Stores](./vector-stores.md)
- [Web Search](./web-search.md)
