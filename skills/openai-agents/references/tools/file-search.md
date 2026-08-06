# File Search

Hosted `file_search` tool: retrieves information from uploaded files through semantic and keyword search against vector stores, within the Responses API.

## Signature / Usage

```javascript
const response = await openai.responses.create({
  model: "gpt-5.6",
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
  model: "gpt-5.6",
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

## Setup Process

1. Upload files to the File API
2. Create a vector store and add files to it — see [Vector Stores](./vector-stores.md)
3. Add files to the vector store and monitor processing status

## Notes

- Supports 24 file formats (PDFs, documents, code files, plain text). Text files must be UTF-8, UTF-16, or ASCII encoded.
- Available across Responses, Chat Completions, and Assistants (legacy) endpoints; rate limits range 100–1000 RPM depending on account tier.
- Vector store creation, file upload/chunking, and attribute filtering are covered in [Vector Stores](./vector-stores.md).

## Related

- [Vector Stores](./vector-stores.md)
- [Web Search](./web-search.md)
