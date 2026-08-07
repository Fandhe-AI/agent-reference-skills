<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations / last verified: 2026-08-07 -->

# Reduce hallucinations

Minimize hallucinations in Claude's outputs by allowing uncertainty, grounding responses in direct quotes, and verifying claims with citations.

Even advanced models can generate text that is factually incorrect or inconsistent with given context. These techniques minimize hallucinations and improve trustworthiness.

## Basic strategies

- **Allow Claude to say "I don't know"** — explicitly grant permission to admit uncertainty, for example instructing an M&A advisor prompt to say "I don't have enough information to confidently assess this" rather than guessing.
- **Use direct quotes for factual grounding** — for long documents (>20k tokens), ask Claude to extract word-for-word quotes before performing the task, grounding the response in actual text.
- **Verify with citations** — have Claude cite quotes/sources for every claim, then verify each claim by finding a supporting quote after generating the response; retract claims without a supporting quote (mark removed claims with empty `[]` brackets).

## Advanced techniques

- **Chain-of-thought verification** — ask Claude to explain reasoning step-by-step before the final answer, revealing faulty logic or assumptions.
- **Best-of-N verification** — run the same prompt multiple times and compare outputs; inconsistencies can indicate hallucination.
- **Iterative refinement** — feed Claude's outputs back as input for follow-up prompts asking it to verify or expand on previous statements.
- **External knowledge restriction** — explicitly instruct Claude to use only information from provided documents, not general knowledge.

## Notes

- These techniques significantly reduce but do not eliminate hallucinations — always validate critical information for high-stakes decisions.

## Related

- [reduce-prompt-leak](./reduce-prompt-leak.md)
- [increase-consistency](./increase-consistency.md)
