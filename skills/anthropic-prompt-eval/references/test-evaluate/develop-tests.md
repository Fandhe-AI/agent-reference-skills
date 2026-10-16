<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests / last verified: 2026-10-17 -->

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

### Example evals

| Dimension | Method | Example |
| --- | --- | --- |
| Task fidelity (sentiment analysis) | Exact match | 1,000 tweets with human-labeled sentiments; normalize whitespace/case before comparing |
| Consistency (FAQ bot) | Cosine similarity of sentence embeddings (for example SBERT) | 50 groups of paraphrased question variants; values closer to 1 indicate higher similarity |
| Relevance and coherence (summarization) | ROUGE-L (longest common subsequence) | 200 articles with reference summaries |
| Tone and style (customer service) | LLM-based Likert scale (1-5) | 100 customer inquiries with target tone (empathetic, patient, professional) |
| Privacy preservation (medical chatbot) | LLM-based binary classification | 500 simulated patient queries, some containing PHI |
| Context utilization (conversation assistant) | LLM-based ordinal scale (1-5) | 100 multi-turn conversations with context-dependent questions |

## Grade your evaluations

When deciding which method to use to grade evals, choose the fastest, most reliable, most scalable method:

1. **Code-based grading:** Fastest and most reliable, extremely scalable, but lacks nuance for complex judgments that require less rule-based rigidity (exact match: `output == golden_answer`; string match: `key_phrase in output`).
2. **Human grading:** Most flexible and high quality, but slow and expensive. Avoid if possible.
3. **LLM-based grading:** Fast and flexible, scalable and suitable for complex judgment. Test to ensure reliability first, then scale.

### Tips for LLM-based grading

- **Have detailed, clear rubrics:** for example, "The answer should always mention 'Acme Inc.' in the first sentence. If it does not, the answer is automatically graded as 'incorrect.'" A use case, or even a single success criterion, might require several rubrics for holistic evaluation.
- **Empirical or specific:** instruct the LLM to output only 'correct' or 'incorrect', or to judge on a scale of 1-5. Purely qualitative evaluations are hard to assess quickly and at scale.
- **Encourage reasoning:** use a grader model with thinking on, so that it reasons before it produces an evaluation score. This increases evaluation performance, particularly for tasks requiring complex judgment.

```python
client = anthropic.Anthropic()


def build_grader_prompt(answer, rubric):
    return f"""Grade this answer based on the rubric:
    <rubric>{rubric}</rubric>
    <answer>{answer}</answer>
    Output 'correct' or 'incorrect' in <result> tags."""


def grade_completion(output, golden_answer):
    grader_message = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=2048,
        messages=[
            {"role": "user", "content": build_grader_prompt(output, golden_answer)}
        ],
    )
    grader_response = next(
        block.text for block in grader_message.content if block.type == "text"
    )

    return (
        "correct"
        if "<result>correct</result>" in grader_response.lower()
        else "incorrect"
    )
```

## Notes

- Tips from the official page: writing hundreds of test cases by hand is hard, so get Claude to help generate more from a baseline set of example test cases; if you don't know which eval methods suit your success criteria, brainstorm with Claude.
- This page is the prerequisite step referenced by [Prompt engineering overview](../prompt-engineering/overview.md) — establish success criteria and evals before iterating on prompts.

## Related

- [overview](../prompt-engineering/overview.md)
- [increase-consistency](./increase-consistency.md)
