# Getting started with datasets

Datasets are the dashboard-based, low-friction entry point to evals: build a data set, run a prompt against it, annotate outputs, and attach graders — all interactively, without the Evals API.

## Signature / Usage

Dashboard workflow (no code):

1. Evaluation page → **Datasets** tab → **Create** → name the dataset, add data (visual editor or CSV upload).
2. Add a prompt (from saved OpenAI prompts, with variables referencing dataset columns) and click **Generate output** to populate an `output` column per row.
3. Annotate outputs (Good/Bad rating, `output_feedback` text, or custom columns) — annotations serve as ground truth and feed the prompt optimizer.
4. Add graders (Grade > **New grader**) and run them to get pass/fail per row.
5. Export the dataset to an [Eval](./working-with-evals.md) when you need API-driven runs, larger scale, or external models.

## Options / Props

| Grader type (dashboard) | Use case |
|--------------------------|----------|
| String check | Exact match against a ground-truth column |
| Text similarity | Embedding-based semantic closeness to reference |
| Score model grader | LLM assigns a numeric score (e.g. friendliness) |
| Label model grader | LLM assigns a categorical label (e.g. "concise"/"verbose") |
| Python code execution | Custom programmatic checks (e.g. word count) |

## Notes

- CSV columns become both prompt variables and grader reference columns.
- Datasets are designed for iterative, ad-hoc annotation; move to the Evals API (`working-with-evals.md`) for repeatable, larger-scale, or API-driven evaluation.
- Same deprecation window as the rest of the Evals platform: read-only 2026-10-31, shutdown 2026-11-30.

## Related

- [Working with evals](./working-with-evals.md)
- [Graders](./graders.md)
- [Evaluation best practices](./evaluation-best-practices.md)
