# Prompt Optimizer

A dashboard chat interface that rewrites a submitted prompt according to current best practices, working best when paired with an evaluation dataset (grader results and/or human annotations).

## Signature / Usage

1. Prepare a dataset containing the prompt to optimize plus evaluation data (grader results and/or human annotations).
2. Open the prompt optimizer chat interface in the dashboard.
3. Click **Optimize** in the bottom prompt pane.
4. Review and test the generated optimized prompt in the new tab.
5. Optionally iterate: generate outputs, annotate, run graders, re-optimize.

## Options / Props

| Name | Description |
|------|-------------|
| Dataset rows | Minimum 3 rows, each with a response |
| Grading | At least one grader result or human annotation per row |
| Annotation | Good/Bad ratings with detailed, specific critiques; optional custom annotation columns and `output_feedback` text |

## Notes

- OpenAI is retiring the dataset-backed prompt optimizer as part of the Evals platform: it becomes read-only on October 31, 2026, and shuts down fully on November 30, 2026. This is a separate deprecation timeline from the fine-tuning platform wind-down.
- Effectiveness depends heavily on grader quality; manually review optimized prompts before production use, since they may underperform the original on specific inputs despite general improvement.

## Related

- [model-optimization.md](./model-optimization.md)
