<!-- source: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model / last verified: 2026-10-17 -->

# Choosing the right model

Choosing a Claude model means balancing capabilities, speed, and cost. This guide covers the questions to ask, two ways to pick a starting model, and how to test the choice.

## Signature / Usage

Key criteria to evaluate first:

- **Capabilities:** what specific features or capabilities does the model need?
- **Speed:** how quickly must the model respond? Fast mode delivers up to 2.5x higher output speed at premium pricing on supported models (see Notes).
- **Cost:** budget for development and production usage.
- **Effort:** several Claude models support an `effort` parameter that trades intelligence for latency and cost within a single model. Tuning effort is often a better lever than switching models. On Claude Fable 5.1, Claude Opus 5, and Claude Sonnet 5.5, start with the default (`high`) and adjust up or down based on your evals. On Claude Opus 5.5 and Claude Haiku 5.5 the default is `medium`; start there and adjust the same way. On Claude Opus 4.8 and Claude Opus 4.7, the `xhigh` effort level, between `high` and `max`, is the best setting for most coding and agentic use cases.

Two general approaches to start testing:

- **Option 1 — efficiency-first:** begin implementation with Claude Haiku 5.5, test your use case thoroughly, evaluate whether performance meets requirements, upgrade only if necessary for specific capability gaps. Best for initial prototyping and development, tight latency requirements, cost-sensitive implementations, high-volume straightforward tasks.
- **Option 2 — capability-first:**
  1. Implement with Claude Opus 5.5.
  2. Optimize your prompts for this model.
  3. Evaluate if performance meets your requirements.
  4. Consider increasing efficiency by lowering effort or downgrading models over time with greater workflow optimization.
  5. If your evals at `xhigh` or `max` effort still fall short on demanding reasoning or long-horizon agentic work, move to Claude Fable 5.1.

  Best for complex reasoning tasks, scientific or mathematical applications, tasks requiring nuanced understanding, applications where accuracy outweighs cost, advanced coding and high-autonomy agentic work.

**Claude Opus 5.5** (`claude-opus-5-5`) is built for long-running agentic coding and knowledge work, with adaptive thinking always on. If your integration forces tool use (`tool_choice` of type `any` or `tool`), turns thinking off, or uses the `computer_20251124` computer use tool, see the Breaking changes section of `whats-new-opus-5-5.md` before switching.

**Claude Fable 5.1** (`claude-fable-5-1`) is Anthropic's most capable model open to all customers. It extends Claude Fable 5 with stronger long-running agentic coding, knowledge work, and research at the same input and output prices, with cache reads at a quarter of the cost. **Claude Mythos 5.1** (`claude-mythos-5-1`) offers the same capabilities only to organizations verified through Anthropic's verification programs, such as the Cyber Verification Program. Both models use always-on adaptive thinking.

Model IDs for the starting points above:

```text
claude-haiku-5-5   # efficiency-first
claude-opus-5-5    # capability-first
claude-fable-5-1   # highest capability
```

For context windows, output limits, and prices, see the model comparison table in `overview.md`.

## Options / Props

Model selection matrix (most workloads start with Claude Opus 5.5):

| When you need... | Consider starting with... | Example use cases |
| --- | --- | --- |
| The highest available capability | Claude Fable 5.1 | Agent sessions that run for hours, multistep deep research, analysis carried through to a finished document, spreadsheet, or deck |
| Complex agentic coding and enterprise work | Claude Opus 5.5 | Multihour autonomous coding agents, large-scale refactoring, complex systems engineering, vision-heavy workflows, computer use |
| Speed and capability for everyday coding, agent, and enterprise workloads | Claude Sonnet 5.5 | Code generation, data analysis, content creation, visual understanding, agentic tool use |
| The lowest latency and price | Claude Haiku 5.5 | Real-time applications, high-volume intelligent processing, cost-sensitive deployments needing strong reasoning, sub-agent tasks |

## Notes

- Fast mode is available on supported models: Claude Opus 5.5, Claude Opus 5, and Claude Opus 4.8 (see `../pricing-lifecycle/pricing.md`).
- To decide whether to upgrade or change models: create benchmark tests specific to the use case (a good evaluation set is the most important step), test with actual prompts and data, compare accuracy, response quality, and edge-case handling, then weigh performance and cost tradeoffs.
- Combine models: multi-model strategies pair a lower-cost model with a frontier model so that most tokens are billed at the lower rate. The two common patterns are an executor that escalates hard decisions to an advisor, and an orchestrator that delegates bulk work to lower-cost workers. See `optimizing-for-cost-and-intelligence.md` for both strategies, measured examples, and implementation options.
- Earlier guidance that started from Claude Fable 5 / Claude Opus 5 / Claude Haiku 4.5 is superseded; those models are legacy.

## Related

- [Models overview](./overview.md)
- [What's new in Claude Opus 5](./whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](./whats-new-sonnet-5.md)
