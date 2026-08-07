# Graders

Graders compare a reference answer to a model-generated answer and return a grade from 0 to 1. They are shared by evals (`testing_criteria`) and fine-tuning (RFT). OpenAI is deprecating graders alongside the evals/fine-tuning workflows they support.

## Signature / Usage

`string_check` grader:

```json
{
  "type": "string_check",
  "name": "Match output to human label",
  "operation": "eq",
  "input": "{{ sample.output_text }}",
  "reference": "{{ item.correct_label }}"
}
```

`text_similarity` grader:

```json
{
  "type": "text_similarity",
  "name": "summary_similarity",
  "input": "{{ sample.output_text }}",
  "reference": "{{ item.reference_answer }}",
  "pass_threshold": 0.8,
  "evaluation_metric": "fuzzy_match"
}
```

`score_model` grader:

```json
{
  "type": "score_model",
  "name": "my_score_model",
  "model": "o4-mini-2025-04-16",
  "range": [0, 1],
  "pass_threshold": 0.5,
  "input": [
    { "role": "system", "content": "You are an expert grader..." },
    { "role": "user", "content": "Reference: {{ item.reference_answer }}. Model answer: {{ sample.output_text }}" }
  ],
  "sampling_params": { "max_completions_tokens": 32768, "top_p": 1, "reasoning_effort": "medium" }
}
```

`python` grader:

```json
{
  "type": "python",
  "source": "def grade(sample, item):\n    return 1.0",
  "image_tag": "2025-05-08"
}
```

`multi` grader (combines sub-graders):

```json
{
  "type": "multi",
  "graders": {
    "name": { "name": "name_grader", "type": "text_similarity", "input": "{{sample.output_json.name}}", "reference": "{{item.name}}", "evaluation_metric": "fuzzy_match", "pass_threshold": 0.9 },
    "email": { "name": "email_grader", "type": "string_check", "input": "{{sample.output_json.email}}", "reference": "{{item.email}}", "operation": "eq" }
  },
  "calculate_output": "(name + email) / 2"
}
```

## Options / Props

| Grader type | Key fields | Notes |
|-------------|-----------|-------|
| `string_check` | `operation` (`eq`/`ne`/`like`/`ilike`), `input`, `reference` | Exact/substring string comparison, returns 0 or 1. |
| `text_similarity` | `evaluation_metric` (`fuzzy_match`/`bleu`/`gleu`/`meteor`/`cosine`/`rouge_1`..`rouge_5`/`rouge_l`), `pass_threshold` | `cosine` uses `text-embedding-3-large`, evals only. |
| `score_model` | `model`, `range`, `pass_threshold`, `input` (chat messages), `sampling_params` | LLM-as-judge; response schema is `{ result: float, steps: ReasoningStep[] }`. Supported models limited to a fixed list (`gpt-4o-2024-08-06`, `gpt-4o-mini-2024-07-18`, `gpt-4.1*`, `o1-2024-12-17`, `o3-mini-2025-01-31`, `o3-2025-04-16`, `o4-mini-2025-04-16`). |
| `python` | `source` (must define `grade(sample, item) -> float`), `image_tag` | Sandboxed: <256kB code, no network, 2 min execution, 2GB RAM, 1GB disk, 2 CPU cores. Bundled packages include numpy, scipy, pandas, rapidfuzz, scikit-learn, rouge-score, nltk, rdkit. |
| `multi` | `graders` (map of sub-graders), `calculate_output` (formula string) | Combines sub-grader scores; supports `+ - * / ^` and `min/max/abs/floor/ceil/exp/sqrt/log`. Cannot nest another `multi`. Used only in RFT. |

Templating namespaces: `item` (fields from the eval data source / fine-tuning dataset row) and `sample` (model output: `output_text`, `output_json`, `output_tools`, `choices`, `output_audio`).

## Notes

- To grade tool calls, use `sample.output_tools[...]` (same shape as Chat Completions `tool_calls`); a common pattern is two `string_check` graders (tool name + arguments) combined via `multi`.
- For subtly-incorrect arguments (e.g. `1` vs `1.0`), prefer `text_similarity` or `score_model` over exact `string_check`.
- Design tips: produce a smooth 0-1 score rather than pass/fail, guard against "grader hacking" (reward hacking), avoid skewed datasets, and use LLM-as-judge with few-shot examples when code-based grading falls short.
- Graders can be validated/run standalone via `POST /v1/fine_tuning/alpha/graders/validate` and `/run`.

## Related

- [Working with evals](./working-with-evals.md)
- [Getting started with datasets](./getting-started-datasets.md)
