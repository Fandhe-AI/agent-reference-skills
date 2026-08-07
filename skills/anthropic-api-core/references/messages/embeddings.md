<!-- source: https://platform.claude.com/docs/en/build-with-claude/embeddings / last verified: 2026-08-07 -->

# Embeddings

Text embeddings are numerical representations of text for measuring semantic similarity. Anthropic does not offer its own embedding model; recommended provider is Voyage AI.

## Signature / Usage

```python
import voyageai

vo = voyageai.Client()  # uses VOYAGE_API_KEY env var
result = vo.embed(["Sample text 1", "Sample text 2"], model="voyage-4", input_type="document")
print(result.embeddings[0])  # 1024-dim float vector (default)
```

```bash
curl https://api.voyageai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $VOYAGE_API_KEY" \
  -d '{"input": ["Sample text 1", "Sample text 2"], "model": "voyage-4"}'
```

Always set `input_type="query"` or `input_type="document"` for retrieval/RAG use cases (never omit or `None`) — Voyage prepends a task-specific instruction internally, improving retrieval quality. Embeddings are normalized to length 1, so cosine similarity ≡ dot-product similarity, and rankings match Euclidean distance.

## Options / Props

| Model | Context | Dimensions | Use case |
|---|---|---|---|
| `voyage-4-large` | 32,000 | 1024 (default), 256, 512, 2048 | Best general-purpose/multilingual quality (latest gen) |
| `voyage-4` | 32,000 | 1024 (default), 256, 512, 2048 | Balanced quality/efficiency |
| `voyage-4-lite` | 32,000 | 1024 (default), 256, 512, 2048 | Latency/cost optimized |
| `voyage-4-nano` | 32,000 | 1024 (default), 256, 512, 2048 | Open-weight (Apache 2.0), on Hugging Face |
| `voyage-3-large` / `voyage-3.5` / `voyage-3.5-lite` | 32,000 | 1024 (default), 256, 512, 2048 | Previous generation |
| `voyage-code-3` | 32,000 | 1024 (default), 256, 512, 2048 | Code retrieval |
| `voyage-finance-2` | 32,000 | 1024 | Finance retrieval/RAG |
| `voyage-law-2` | 16,000 | 1024 | Legal / long-context retrieval |
| `voyage-multimodal-3.5` / `voyage-multimodal-3` | 32,000 | 1024 (default for 3.5) | Interleaved text/image(/video for 3.5) |
| `voyage-context-4` / `voyage-context-3` | 120,000 | 1024 (default), 256, 512, 2048 | Contextualized chunk embeddings — call `contextualized_embed()` |
| `rerank-2.5` / `rerank-2.5-lite` | 32,000 | — | Rerankers — call `rerank()`, take query + doc list, return ranked |

| `embed()` param | Description |
|---|---|
| `input_type` | `"query"` or `"document"` |
| `output_dtype` | `float` (default, 32-bit), `int8`/`uint8` (8-bit quantized), `binary`/`ubinary` (1-bit packed, offset-binary for `binary`) |

## Notes

- Matryoshka embeddings: models like `voyage-code-3` support truncating vectors by keeping the leading N dimensions (renormalize after truncation).
- Quantization reduces storage/cost by 4x (`int8`/`uint8`) or 32x (`binary`/`ubinary`).
- Also available via AWS Marketplace.
- See Voyage's own pricing page for current rates (not covered by Anthropic API billing).

## Related

- [Working with messages](./working-with-messages.md)
