# samples

| Name | Description | Path |
| --- | --- | --- |
| Create and run an eval | Define an eval with a data schema and grading criteria, upload test data, then run the eval against a model | [eval-create-and-run.md](./eval-create-and-run.md) |
| Define graders (string check, text similarity, model, python, multi) | Configure the four base grader types used by both Evals and fine-tuning (RFT), and combine them with a `multi` grader | [grader-definitions.md](./grader-definitions.md) |
| Prepare an SFT dataset and create a fine-tuning job | Build a JSONL training file, upload it, and start a supervised fine-tuning (SFT) job | [sft-dataset-and-job.md](./sft-dataset-and-job.md) |
| Direct Preference Optimization (DPO) fine-tuning | Train a model from prompt/preferred/non-preferred response triples instead of single "correct" answers | [dpo-basics.md](./dpo-basics.md) |
| Reinforcement Fine-Tuning (RFT) with a grader | Fine-tune a reasoning model using a programmable grader that scores each candidate response, instead of fixed correct answers; the model is optimized toward high-scoring outputs | [rft-basics.md](./rft-basics.md) |
| Model distillation via stored completions | Store a larger model's completions with `store=True`, then use them as training data to fine-tune a smaller model | [distillation-workflow.md](./distillation-workflow.md) |
