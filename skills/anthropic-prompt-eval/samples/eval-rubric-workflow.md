<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests / last verified: 2026-08-07 -->

# Eval rubric workflow: code-graded and LLM-graded

Build a code-graded exact-match eval and three LLM-graded rubrics (Likert, binary, ordinal) for a Claude application.

```python
import anthropic

client = anthropic.Anthropic()

# --- Code-graded: exact match (task fidelity) ---

def get_completion(prompt: str):
    message = client.messages.create(
        model="claude-opus-5",
        max_tokens=50,
        messages=[{"role": "user", "content": prompt}],
    )
    return next(block.text for block in message.content if block.type == "text")


def evaluate_exact_match(model_output, correct_answer):
    return model_output.strip().lower() == correct_answer.lower()


tweets = [
    {"text": "This movie was a total waste of time. \U0001F44E", "sentiment": "negative"},
    {"text": "The new album is \U0001F525! Been on repeat all day.", "sentiment": "positive"},
]
outputs = [
    get_completion(f"Classify this as 'positive', 'negative', 'neutral', or 'mixed': {tweet['text']}")
    for tweet in tweets
]
accuracy = sum(
    evaluate_exact_match(output, tweet["sentiment"]) for output, tweet in zip(outputs, tweets)
) / len(tweets)
print(f"Sentiment Analysis Accuracy: {accuracy * 100}%")


# --- LLM-graded: Likert scale (tone and style) ---

def evaluate_likert(model_output, target_tone):
    tone_prompt = f"""Rate this customer service response on a scale of 1-5 for being {target_tone}:
    <response>{model_output}</response>
    1: Not at all {target_tone}
    5: Perfectly {target_tone}
    Output only the number."""

    # Generally best practice to use a different model to evaluate than the model used to generate the evaluated output
    response = client.messages.create(
        model="claude-opus-5",
        max_tokens=50,
        messages=[{"role": "user", "content": tone_prompt}],
    )
    return int(
        next(block.text for block in response.content if block.type == "text").strip()
    )


# --- LLM-graded: binary classification (privacy preservation) ---

def evaluate_binary(model_output, query_contains_phi):
    if not query_contains_phi:
        return True

    binary_prompt = f"""Does this response contain or reference any Personal Health Information (PHI)?
    <response>{model_output}</response>
    Output only 'yes' or 'no'."""

    response = client.messages.create(
        model="claude-opus-5",
        max_tokens=50,
        messages=[{"role": "user", "content": binary_prompt}],
    )
    return (
        next(block.text for block in response.content if block.type == "text").strip().lower()
        == "no"
    )
```

## Notes

- "Generally best practice to use a different model to evaluate than the model used to generate the evaluated output" — applies to all LLM-graded functions above.
- The page's eval-type table also lists cosine similarity of sentence embeddings (consistency) and ROUGE-L (relevance/coherence for summarization) as further code-graded metrics, alongside an LLM-graded ordinal scale (1-5) for context utilization — same pattern as `evaluate_likert` with a different rubric prompt.
- Prioritize eval volume over per-question quality: more automated-grading questions beats fewer hand-graded ones.
- Define success criteria first (specific, measurable, achievable, relevant) before building the eval harness — this is the prerequisite step to prompt engineering itself.
