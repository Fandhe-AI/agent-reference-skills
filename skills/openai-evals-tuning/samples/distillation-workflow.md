# Model distillation via stored completions

Store a larger model's completions with `store=True`, then use them as training data to fine-tune a smaller model.

```python
import json
from openai import OpenAI

client = OpenAI()

response_format = {
    "type": "json_schema",
    "json_schema": {
        "name": "wine_variety",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {"variety": {"type": "string"}},
            "required": ["variety"],
            "additionalProperties": False,
        },
    },
}


def call_model(model, prompt, metadata_value="wine-sommelier-eval"):
    response = client.chat.completions.create(
        model=model,
        store=True,
        metadata={
            "distillation": metadata_value,
        },
        messages=[
            {
                "role": "system",
                "content": "You're a sommelier expert and you know everything about wine. You answer precisely with the name of the variety/blend.",
            },
            {"role": "user", "content": prompt},
        ],
        response_format=response_format,
    )
    return json.loads(response.choices[0].message.content.strip())["variety"]


# Run the larger "teacher" model to populate stored completions
call_model("gpt-4o", "A dry, tannic red from Bordeaux aged in oak.")
```

```python
# After filtering stored completions by model/metadata and starting a "Distill"
# fine-tune job from the dashboard, retrieve the resulting job by ID
finetune_job = client.fine_tuning.jobs.retrieve("ftjob-pRyNWzUItmHpxmJ1TX7FOaWe")
print(finetune_job.status)
```

## Notes

- This is an OpenAI LLM-evaluation/fine-tuning example; unrelated to a JS/TS test runner's `evals`.
- Calling a larger "teacher" model with `store=True` and `metadata` saves its inputs/outputs as Stored Completions.
- Stored completions are filtered by model/metadata in the dashboard, then a "Distill" job builds the fine-tuning file for a smaller "student" model — this step is dashboard-only, not available via the API.
- A few hundred samples can be enough, but a more diverse set of thousands often yields better results.
