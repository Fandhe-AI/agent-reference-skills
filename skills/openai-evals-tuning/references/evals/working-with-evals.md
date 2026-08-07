# Working with evals

Configure and run evals programmatically using the Evals API: create an eval, upload test data, run the eval against a model, and analyze results. OpenAI is deprecating the Evals platform (read-only from 2026-10-31, shutdown 2026-11-30).

## Signature / Usage

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

// 1. Create an eval
const evalObj = await openai.evals.create({
  name: "IT Ticket Categorization",
  data_source_config: {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        ticket_text: { type: "string" },
        correct_label: { type: "string" },
      },
      required: ["ticket_text", "correct_label"],
    },
    include_sample_schema: true,
  },
  testing_criteria: [
    {
      type: "string_check",
      name: "Match output to human label",
      input: "{{ sample.output_text }}",
      operation: "eq",
      reference: "{{ item.correct_label }}",
    },
  ],
});

// 2. Upload test data (JSONL) via files.create with purpose "evals"
// 3. Create an eval run against the uploaded file
const run = await openai.evals.runs.create(evalObj.id, {
  name: "Categorization test run",
  data_source: {
    type: "responses",
    model: "gpt-5.6",
    input_messages: {
      type: "template",
      template: [
        { role: "developer", content: "Categorize the ticket..." },
        { role: "user", content: "{{ item.ticket_text }}" },
      ],
    },
    source: { type: "file_id", id: "YOUR_FILE_ID" },
  },
});

// 4. Poll until the run reaches a terminal status (completed / failed / canceled)
const TERMINAL_STATUSES = new Set(["completed", "failed", "canceled"]);
let status = await openai.evals.runs.retrieve(run.id, { eval_id: evalObj.id });
while (!TERMINAL_STATUSES.has(status.status)) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  status = await openai.evals.runs.retrieve(run.id, { eval_id: evalObj.id });
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `data_source_config` | object | Schema for the test data used with the eval (e.g. `type: "custom"` with `item_schema` JSON schema, `include_sample_schema` boolean). |
| `testing_criteria` | array | Graders that determine whether a model output is correct (see graders.md for grader types). |
| `run.data_source.type` | string | `"responses"` (or Chat Completions equivalent) — how each item is sampled during the run. |
| `run.data_source.input_messages` | object | Template of messages with `{{ item.* }}` variables interpolated per data-set item. |
| `run.data_source.source` | object | `{ type: "file_id", id }` pointing at an uploaded JSONL test-data file. |

Template syntax `{{ }}` supports two namespaces: `item` (fields from the data source/dataset row) and `sample` (the model-generated output, e.g. `sample.output_text`).

## Notes

- Test data is uploaded as a JSONL file via the Files API with `purpose: "evals"`; each line is `{"item": {...}}` conforming to `item_schema`.
- A run starts `queued`, moves to `in_progress`, then settles into a terminal status (`completed`, `failed`, `canceled`) — a single `retrieve()` call right after `runs.create()` will usually still show `queued`/`in_progress`, so poll in a loop until the status is terminal.
- Eval run status/results can be polled via API (`status`, `result_counts`, `per_testing_criteria_results`) or viewed in the dashboard via the run's `report_url`.
- Subscribe to `eval.run.succeeded` / `eval.run.failed` / `eval.run.canceled` webhook events for async completion notifications.
- If you don't need advanced features (external models, larger-scale batch runs, API-driven runs), the lighter-weight Datasets dashboard flow may be sufficient — see `getting-started-datasets.md`.

## Related

- [Graders](./graders.md)
- [Getting started with datasets](./getting-started-datasets.md)
- [Evaluate external models](./external-models.md)
- [Evaluation best practices](./evaluation-best-practices.md)
