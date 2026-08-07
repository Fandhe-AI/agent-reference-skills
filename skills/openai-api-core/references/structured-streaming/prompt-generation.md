# Prompt Generation

The **Generate** button in the Playground creates prompts, function definitions, and Structured Outputs schemas from a task description, using meta-prompts and meta-schemas.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

META_PROMPT = "...".strip()  # meta-prompt with prompt-writing guidelines

def generate_prompt(task_or_prompt: str):
    completion = client.chat.completions.create(
        model="gpt-5.6",
        messages=[
            {"role": "system", "content": META_PROMPT},
            {"role": "user", "content": "Task, Goal, or Current Prompt:\n" + task_or_prompt},
        ],
    )
    return completion.choices[0].message.content
```

## Notes

- Two generation modes: **prompts** use a meta-prompt (instructions incorporating prompt-engineering best practices) to generate or improve a system prompt; **schemas** use a meta-schema (a Structured Outputs schema describing valid schemas) to generate JSON Schema / function `parameters`.
- Separate meta-prompts exist for text-out vs. audio-out (Realtime) targets; the audio-out variant biases toward short, conversational, multi-turn examples.
- Prompt *edits* use a modified meta-prompt that first emits a `<reasoning>` block analyzing the current prompt (structure, examples, complexity) before producing the corrected prompt.
- Schema generation uses a **pseudo-meta-schema**: it accepts JSON Schema features unsupported by Structured Outputs `strict` mode as input, but only ever emits schemas that conform to `strict` mode (every property required, `additionalProperties: false` on every object).
- Output cleaning after schema generation: set `additionalProperties: false` on all objects, mark all properties required, wrap in a `json_schema` object for Structured Outputs or a `function` object for function calling.
- The Realtime API function-calling object differs slightly in shape from the Chat Completions/Responses one but is generated from the same meta-schema.
- Since function `parameters` fields are themselves JSON Schemas, the same schema meta-schema generates both Structured Outputs schemas and function schemas.
- This is an OpenAI API (developers.openai.com) Playground feature; it documents prompt/schema authoring tooling, not a runtime request field.

## Related

- [Structured Outputs](./structured-outputs.md)
- [Function Calling](./function-calling.md)
