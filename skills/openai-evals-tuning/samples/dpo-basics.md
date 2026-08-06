# Direct Preference Optimization (DPO) fine-tuning

Train a model from prompt/preferred/non-preferred response triples instead of single "correct" answers.

```jsonl
{"input":{"messages":[{"role":"user","content":"Hello, can you tell me how cold San Francisco is today?"}],"tools":[],"parallel_tool_calls":true},"preferred_output":[{"role":"assistant","content":"Today in San Francisco, it is not quite cold as expected. Morning clouds will give away to sunshine, with a high near 68°F (20°C) and a low around 57°F (14°C)."}],"non_preferred_output":[{"role":"assistant","content":"It is not particularly cold in San Francisco today."}]}
```

```python
from openai import OpenAI

client = OpenAI()

job = client.fine_tuning.jobs.create(
    training_file="file-all-about-the-weather",
    model="gpt-4.1-mini-2025-04-14",
    method={
        "type": "dpo",
        "dpo": {
            "hyperparameters": {"beta": 0.1},
        },
    },
)
```

## Notes

- This is an OpenAI LLM-evaluation/fine-tuning example; unrelated to a JS/TS test runner's `evals`.
- Each JSONL row is one `input.messages` + `preferred_output` + `non_preferred_output` triple.
- `beta` (0-2) controls how closely the model stays to prior behavior: higher preserves existing behavior, lower prioritizes the new preference. Use `"auto"` to let the platform pick a default.
- Supported models are `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, and `gpt-4.1-nano-2025-04-14`. Good fit for tasks like selective-focus summarization or tone/style adjustment.
