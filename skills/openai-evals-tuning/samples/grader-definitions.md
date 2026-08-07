# Define graders (string check, text similarity, model, python, multi)

Configure the four base grader types used by both Evals and fine-tuning (RFT), and combine them with a `multi` grader.

```python
# String check grader: exact/contains match, returns 0 or 1
string_check_grader = {
    "type": "string_check",
    "name": "match_label",
    "operation": "eq",  # "eq" | "ne" | "like" | "ilike"
    "input": "{{ sample.output_text }}",
    "reference": "{{ item.correct_label }}",
}

# Text similarity grader: scores closeness of open-ended text to a reference
text_similarity_grader = {
    "type": "text_similarity",
    "name": "similar_to_reference",
    "input": "{{ sample.output_text }}",
    "reference": "{{ item.reference_answer }}",
    "pass_threshold": 0.8,
    "evaluation_metric": "fuzzy_match",  # or bleu, gleu, meteor, cosine, rouge_1..5, rouge_l
}

# Score model grader: an LLM judges the output on a numeric range
score_model_grader = {
    "type": "score_model",
    "name": "my_score_model",
    "input": [
        {
            "role": "system",
            "content": "You are an expert grader. If the reference and model answer are exact matches, output a score of 1. If they are somewhat similar in meaning, output 0.5. Otherwise, give 0.",
        },
        {
            "role": "user",
            "content": "Reference: {{ item.reference_answer }}. Model answer: {{ sample.output_text }}",
        },
    ],
    "pass_threshold": 0.5,
    "model": "o4-mini-2025-04-16",
    "range": [0, 1],
    "sampling_params": {
        "max_completions_tokens": 32768,
        "top_p": 1,
        "reasoning_effort": "medium",
    },
}

# Python grader: arbitrary code implementing `grade(sample, item) -> float`
python_grader = {
    "type": "python",
    "source": """
from rapidfuzz import fuzz, utils

def grade(sample, item) -> float:
    output_text = sample["output_text"]
    reference_answer = item["reference_answer"]
    return fuzz.WRatio(output_text, reference_answer, processor=utils.default_process) / 100.0
""",
}

# Multi grader: combine sub-graders into one score with a formula (RFT only)
multi_grader = {
    "type": "multi",
    "graders": {
        "name": {
            "name": "name_grader",
            "type": "text_similarity",
            "input": "{{ sample.output_json.name }}",
            "reference": "{{ item.name }}",
            "evaluation_metric": "fuzzy_match",
            "pass_threshold": 0.9,
        },
        "email": {
            "name": "email_grader",
            "type": "string_check",
            "input": "{{ sample.output_json.email }}",
            "reference": "{{ item.email }}",
            "operation": "eq",
        },
    },
    "calculate_output": "(name + email) / 2",
}
```

```bash
# Validate and dry-run a grader against a sample before wiring it into an eval/RFT job
curl https://api.openai.com/v1/fine_tuning/alpha/graders/validate \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"grader": {"type": "string_check", "name": "match_label", "operation": "eq", "input": "{{ sample.output_text }}", "reference": "{{ item.correct_label }}"}}'

curl https://api.openai.com/v1/fine_tuning/alpha/graders/run \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"grader": {"type": "string_check", "name": "match_label", "operation": "eq", "input": "{{ sample.output_text }}", "reference": "{{ item.correct_label }}"}, "item": {"correct_label": "Hardware"}, "model_sample": "Hardware"}'
```

## Notes

- This is an OpenAI LLM-evaluation example; "evals" and "graders" here belong to OpenAI's Evals/fine-tuning API, not a JS/TS test runner (Vitest etc.).
- `{{ item.* }}` refers to a test data / dataset row, `{{ sample.* }}` refers to the model output (`output_text`, `output_json`, `output_tools`, `choices`, `output_audio`).
- `multi` graders cannot be nested (no `multi` inside a `multi`) and are currently used only for Reinforcement fine-tuning.
- OpenAI is winding down graders as part of the evals and fine-tuning workflows they support; check the deprecations page for the transition timeline.
