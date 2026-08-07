<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests / last verified: 2026-08-07 -->

# Define success criteria and build evaluations

Define measurable success criteria for your LLM application and build evaluations to test it, from exact match checks to LLM-based grading.

Building a successful LLM-based application starts with clearly defining success criteria and designing evaluations to measure performance against them — this cycle is central to prompt engineering (test cases → preliminary prompt → iterative testing/refinement → final validation → ship).

## Define your success criteria

Good criteria are:

- **Specific** — "accurate sentiment classification," not "good performance."
- **Measurable** — quantitative metrics or well-defined qualitative scales applied consistently. Even "hazy" topics like safety can be quantified (for example, "less than 0.1% of outputs out of 10,000 trials flagged for toxicity" rather than "safe outputs").
- **Achievable** — grounded in industry benchmarks, prior experiments, or expert knowledge, not beyond current frontier model capabilities.
- **Relevant** — aligned with the application's purpose (for example, citation accuracy matters more for medical apps than casual chatbots).

Example: "Our sentiment analysis model should achieve an F1 score of at least 0.85 on a held-out test set of 10,000 diverse Twitter posts, a 5% improvement over the current baseline" (measurable, specific, relevant, achievable).

### Common success criteria

Task fidelity, consistency (semantic similarity across repeated/paraphrased inputs), relevance and coherence, tone and style, privacy preservation, context utilization, latency, price. Most use cases need multidimensional evaluation across several of these simultaneously.

## Build evaluations

### Eval design principles

1. **Be task-specific** — mirror the real-world task distribution; include edge cases (irrelevant/nonexistent input, overly long input, poor/harmful/irrelevant user input for chat, ambiguous cases where humans disagree).
2. **Automate when possible** — structure questions for automated grading (multiple-choice, string match, code-graded, LLM-graded).
3. **Prioritize volume over quality** — more questions with slightly lower-signal automated grading beats fewer high-quality hand-graded evals.

### Example eval types

| Dimension | Method | Example |
| --- | --- | --- |
| Task fidelity (sentiment analysis) | Exact match | 1,000 tweets with human-labeled sentiments; normalize whitespace/case before comparing |
| Consistency (FAQ bot) | Cosine similarity of sentence embeddings (for example SBERT) | 50 groups of paraphrased question variants; values closer to 1 indicate higher similarity |
| Relevance and coherence (summarization) | ROUGE-L (longest common subsequence) | 200 articles with reference summaries |
| Tone and style (customer service) | LLM-based Likert scale (1-5) | 100 customer inquiries with target tone (empathetic, patient, professional) |
| Privacy preservation (medical chatbot) | LLM-based binary classification | 500 simulated patient queries, some containing PHI |
| Context utilization (conversation assistant) | LLM-based ordinal scale (1-5) | 100 multi-turn conversations with context-dependent questions |

## Notes

- This page is the prerequisite step referenced by [Prompt engineering overview](../prompt-engineering/overview.md) — establish success criteria and evals before iterating on prompts.

## Related

- [overview](../prompt-engineering/overview.md)
- [increase-consistency](./increase-consistency.md)
