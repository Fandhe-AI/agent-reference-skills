# Model distillation via stored completions

Store a larger model's completions with `store=True`, then use them as training data to fine-tune a smaller model.

```python
import json
import numpy as np
import pandas as pd
from openai import OpenAI

client = OpenAI()

# Wine-reviews dataset (Kaggle: zynicide/wine-reviews), narrowed to French wines
df = pd.read_csv('data/winemag/winemag-data-130k-v2.csv')
df_france = df[df['country'] == 'France']

varieties = np.array(df_france['variety'].unique()).astype('str')

response_format = {
    "type": "json_schema",
    "json_schema": {
        "name": "grape-variety",
        "schema": {
            "type": "object",
            "properties": {
                "variety": {
                    "type": "string",
                    "enum": varieties.tolist()
                }
            },
            "additionalProperties": False,
            "required": ["variety"],
        },
        "strict": True
    }
}

metadata_value = "wine-distillation"


def generate_prompt(row, varieties):
    # Format the varieties list as a comma-separated string
    variety_list = ', '.join(varieties)

    prompt = f"""
    Based on this wine review, guess the grape variety:
    This wine is produced by {row['winery']} in the {row['province']} region of {row['country']}.
    It was grown in {row['region_1']}. It is described as: "{row['description']}".
    The wine has been reviewed by {row['taster_name']} and received {row['points']} points.
    The price is {row['price']}.

    Here is a list of possible grape varieties to choose from: {variety_list}.

    What is the likely grape variety? Answer only with the grape variety name or blend from the list.
    """
    return prompt


def call_model(model, prompt):
    response = client.chat.completions.create(
        model=model,
        store=True,
        metadata={
            "distillation": metadata_value,
        },
        messages=[
            {
                "role": "system",
                "content": "You're a sommelier expert and you know everything about wine. You answer precisely with the name of the variety/blend."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format=response_format
    )
    return json.loads(response.choices[0].message.content.strip())['variety']


# Run the larger "teacher" model to populate stored completions.
prompt = generate_prompt(df_france.iloc[0], varieties)
call_model('gpt-4o', prompt)
```

```python
# After filtering stored completions by model (gpt-4o) and metadata
# (distillation: wine-distillation) on the Stored Completions page, click "Distill"
# and choose gpt-4o-mini as the base model. Then retrieve the job by ID.
finetune_job = client.fine_tuning.jobs.retrieve("ftjob-pRyNWzUItmHpxmJ1TX7FOaWe")

if finetune_job.status == 'succeeded':
    fine_tuned_model = finetune_job.fine_tuned_model
    print('finetuned model: ' + fine_tuned_model)
else:
    print('finetuned job status: ' + finetune_job.status)
```

## Notes

- The CSV `winemag-data-130k-v2.csv` is the Kaggle wine-reviews dataset (`zynicide/wine-reviews`); download it to `data/winemag/` beforehand. `OPENAI_API_KEY` must be set; `pandas`, `numpy` and `openai` must be installed. The job ID in the second snippet is the cookbook's example; use your own.
- Source is the archived cookbook "Leveraging model distillation to fine-tune a model", which states it "may reference outdated models or APIs". It distills `gpt-4o` outputs into `gpt-4o-mini` using Chat Completions.
- The cookbook stores completions from every model it runs (`gpt-4o`, `gpt-4o-mini`, and the fine-tuned model) so Evals can use them too; select model `gpt-4o` and the `distillation: wine-distillation` metadata in the Stored Completions filter so the `gpt-4o-mini` outputs are not distilled.
- The "Distill" step is performed from the Stored Completions page (platform.openai.com/chat-completions), which generates the fine-tuning file automatically; the cookbook keeps the default parameters.
- Base-model shutdown (deprecations page (https://developers.openai.com/api/docs/deprecations)): `gpt-4o-2024-08-06`, `gpt-4o-2024-11-20` and `gpt-4o-mini-2024-07-18` are scheduled to shut down on January 14, 2027. Active existing customers can no longer create fine-tuning jobs from Jan 6, 2027.
- The SFT guide's "Distilling from a larger model" section describes the same technique and notes that the Responses API stores model responses for 30 days by default; see `supervised-fine-tuning.md` in references.
