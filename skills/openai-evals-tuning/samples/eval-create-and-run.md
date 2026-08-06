# Create and run an eval

Define an eval with a data schema and grading criteria, upload test data, then run the eval against a model.

```python
import time
from openai import OpenAI

client = OpenAI()

# 1. Create the eval: define the data schema and grading criteria
eval_obj = client.evals.create(
    name="IT Ticket Categorization",
    data_source_config={
        "type": "custom",
        "item_schema": {
            "type": "object",
            "properties": {
                "ticket_text": {"type": "string"},
                "correct_label": {"type": "string"},
            },
            "required": ["ticket_text", "correct_label"],
        },
        "include_sample_schema": True,
    },
    testing_criteria=[
        {
            "type": "string_check",
            "name": "Match output to human label",
            "input": "{{ sample.output_text }}",
            "operation": "eq",
            "reference": "{{ item.correct_label }}",
        }
    ],
)

# 2. Upload test data. Each JSONL line wraps the row in "item" per item_schema:
#    {"item": {"ticket_text": "...", "correct_label": "Hardware"}}
file = client.files.create(file=open("tickets.jsonl", "rb"), purpose="evals")

# 3. Run the eval against a model, templating the prompt with item fields
run = client.evals.runs.create(
    eval_obj.id,
    name="Categorization test run",
    data_source={
        "type": "responses",
        "model": "gpt-5.6",
        "input_messages": {
            "type": "template",
            "template": [
                {
                    "role": "developer",
                    "content": "You are an expert in categorizing IT support tickets. Given the support ticket below, categorize the request into one of 'Hardware', 'Software', or 'Other'. Respond with only one of those words.",
                },
                {"role": "user", "content": "{{ item.ticket_text }}"},
            ],
        },
        "source": {"type": "file_id", "id": file.id},
    },
)

# 4. Poll until the run reaches a terminal status (completed / failed / canceled)
TERMINAL_STATUSES = {"completed", "failed", "canceled"}
status = client.evals.runs.retrieve(run.id, eval_id=eval_obj.id)
while status.status not in TERMINAL_STATUSES:
    time.sleep(5)
    status = client.evals.runs.retrieve(run.id, eval_id=eval_obj.id)

print(status.status)
```

`tickets.jsonl` (one JSON object per line, each row wrapped in `item`):

```json
{"item": {"ticket_text": "My laptop won't turn on.", "correct_label": "Hardware"}}
{"item": {"ticket_text": "The app crashes on login.", "correct_label": "Software"}}
```

## Notes

- This is an OpenAI LLM-evaluation example; "evals" here is OpenAI's Evals API, not a JS/TS test runner (Vitest etc.).
- `data_source_config.item_schema` defines the JSON Schema for each test data row; `testing_criteria` holds the grader definitions.
- Custom data sources require each JSONL line to be `{"item": {...}}` conforming to `item_schema` — a bare `{"ticket_text": ..., "correct_label": ...}` row will not resolve `{{ item.ticket_text }}`.
- A run starts `queued`, moves to `in_progress`, then settles into a terminal status (`completed`, `failed`, `canceled`) — a single `retrieve()` call right after `runs.create()` will usually still show `queued`/`in_progress`, so poll in a loop until the status is terminal.
- OpenAI is winding down the Evals platform (read-only 2026-10-31, shut down 2026-11-30). Consider Datasets for new projects.
- `{{ item.* }}` refers to the uploaded test data row, `{{ sample.output_text }}` refers to the model output — both use the shared templating syntax.
</content>
