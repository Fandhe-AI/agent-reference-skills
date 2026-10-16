# evaluators

| Name | Description | Path |
|------|-------------|------|
| AggregateMetric / AggregationOperation | An aggregate statistic computed from a metric’s results across the evaluation dataset. | [aggregate-metric.md](./aggregate-metric.md) |
| ArgumentMatcher / ArgumentValue / StructuredValue | The values that define how to validate a tool-call argument. | [argument-matcher.md](./argument-matcher.md) |
| Evaluator / EvaluatorProtocol | A closure-based evaluator, and the protocol for types that produce metrics. | [evaluator.md](./evaluator.md) |
| Metric | A named metric that carries a result value. | [metric.md](./metric.md) |
| MetricsAggregator | A utility for computing aggregate statistics from evaluation metrics. | [metrics-aggregator.md](./metrics-aggregator.md) |
| ModelJudgeEvaluator | An evaluator that uses a language model as a judge to score responses. | [model-judge-evaluator.md](./model-judge-evaluator.md) |
| ModelJudgePrompt | A configuration for how a model evaluator constructs its prompt. | [model-judge-prompt.md](./model-judge-prompt.md) |
| ScoreDimension / ScoreLevel / ScoringMode / ScoringScale | Types that define what a model judge scores and on what scale. | [score-dimension.md](./score-dimension.md) |
| ToolCallEvaluator | An evaluator that verifies agentic tool calls against an expected trajectory. | [tool-call-evaluator.md](./tool-call-evaluator.md) |
| TrajectoryExpectation / ToolExpectation | The expected pattern of tool calls, and a single tool call expectation. | [trajectory-expectation.md](./trajectory-expectation.md) |
