# evals

OpenAI API (developers.openai.com) の LLM 評価基盤 — Evals API / ダッシュボード評価 (Datasets) / graders / trace grading / Promptfoo による評価・red teaming。テストランナー全般を扱う vitest 等とは無関係。

| Name | Description | Path |
|------|-------------|------|
| Evaluate agent workflows | Decision guide for choosing between trace grading and dataset/eval runs… | [agent-evals.md](./agent-evals.md) |
| Evaluation best practices | High-level guidance for designing evals: what counts as an eval, the eval… | [evaluation-best-practices.md](./evaluation-best-practices.md) |
| Evaluate external models | Run evals against non-OpenAI models in addition to OpenAI's native models:… | [external-models.md](./external-models.md) |
| Getting started with datasets | Datasets are the dashboard-based, low-friction entry point to evals: build… | [getting-started-datasets.md](./getting-started-datasets.md) |
| Graders | Graders compare a reference answer to a model-generated answer and return… | [graders.md](./graders.md) |
| Get started with Promptfoo | Promptfoo is an open-source library to evaluate and red-team AI applications… | [promptfoo.md](./promptfoo.md) |
| Red teaming | Red teaming uses adversarial test cases to help uncover unsafe, insecure, or… | [red-teaming.md](./red-teaming.md) |
| Trace grading | Assigning structured scores/labels to an agent's trace (the end-to-end log of… | [trace-grading.md](./trace-grading.md) |
| Working with evals | Configure and run evals programmatically using the Evals API: create an eval… | [working-with-evals.md](./working-with-evals.md) |
