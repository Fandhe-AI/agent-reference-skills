# File Search Built-in Tool

Retrieve information from an uploaded knowledge base via the `file_search` built-in tool and a vector store.

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    input="What is deep research by OpenAI?",
    tools=[{"type": "file_search", "vector_store_ids": ["<vector_store_id>"]}],
)
print(response)
```

## Notes

- A vector store must exist and contain uploaded files before calling this tool; `vector_store_ids` references that store.
- `file_search` performs semantic and keyword search over the store's files and injects matching chunks into the model context.
- Multiple `vector_store_ids` can be passed to search across several stores in one call.
