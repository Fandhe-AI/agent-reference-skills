# evals

OpenAI API (developers.openai.com) の LLM 評価基盤 — Evals API / ダッシュボード評価 (Datasets) / graders / trace grading。テストランナー全般を扱う vitest 等とは無関係。

| Name | Description | Path |
|------|-------------|------|
| Working with evals | Evals API: create eval, upload test data, create/poll eval runs | [working-with-evals.md](./working-with-evals.md) |
| Graders | string_check, text_similarity, score_model, python, multi grader types shared by evals and fine-tuning | [graders.md](./graders.md) |
| Getting started with datasets | Dashboard-based low-friction eval entry point (Datasets tab) | [getting-started-datasets.md](./getting-started-datasets.md) |
| Evaluate agent workflows | Decision guide: trace grading vs datasets/eval runs for agents | [agent-evals.md](./agent-evals.md) |
| Trace grading | Score/label agent traces (tool calls, handoffs) at scale | [trace-grading.md](./trace-grading.md) |
| Evaluate external models | Run evals against third-party models / custom endpoints | [external-models.md](./external-models.md) |
| Evaluation best practices | Eval design workflow, architecture-specific nondeterminism, evaluator types, edge cases | [evaluation-best-practices.md](./evaluation-best-practices.md) |
