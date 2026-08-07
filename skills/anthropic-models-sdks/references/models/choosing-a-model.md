<!-- source: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model / last verified: 2026-08-07 -->

# Choosing the right model

Selecting the optimal Claude model for an application involves balancing capabilities, speed, and cost.

## Signature / Usage

Key criteria to evaluate first:

- **Capabilities:** what specific features does the model need?
- **Speed:** Claude Opus 5 and Claude Opus 4.8 support fast mode (research preview), delivering up to 2.5x higher output speed at premium pricing.
- **Cost:** budget for development and production usage.
- **Effort:** recent Opus and Sonnet models support an `effort` parameter that trades intelligence for latency and cost within a single model. Tuning effort is often a better lever than switching models. On Claude Opus 5, start with the default (`high`). On Claude Opus 4.8 and Claude Opus 4.7, `xhigh` is best for most coding and agentic use cases.

Two general approaches to start testing:

- **Option 1 — efficiency-first:** begin with Claude Haiku 4.5, test thoroughly, upgrade only if necessary. Best for initial prototyping, tight latency requirements, cost-sensitive implementations, high-volume straightforward tasks.
- **Option 2 — capability-first:** implement with Claude Opus 5, optimize prompts, then consider lowering effort or downgrading models over time. Best for complex reasoning, scientific/mathematical applications, nuanced understanding, advanced coding, high-autonomy agentic work.

**Claude Opus 5** (`claude-opus-5`) is a step-change improvement over Claude Opus 4.8, strong on deep reasoning, agentic and long-horizon tasks, and test-time compute scaling. Supports a 1M token context window by default and up to 128k output tokens; priced at $5/MTok input, $25/MTok output.

**Claude Fable 5** (`claude-fable-5`) is Anthropic's most capable widely released model, for long-running agents. **Claude Mythos 5** (`claude-mythos-5`) is available through Project Glasswing. Both support a 1M token context window by default, up to 128k output tokens, and always-on adaptive thinking. Priced at $10/MTok input, $50/MTok output.

## Options / Props

Model selection matrix:

| When you need... | Consider starting with... | Example use cases |
| --- | --- | --- |
| The highest available capability | Claude Fable 5 | Long-running agents, deep reasoning, long-horizon agentic tasks, advanced research |
| Complex agentic coding and enterprise work | Claude Opus 5 | Multihour autonomous coding agents, large-scale refactoring, complex systems engineering, advanced research, knowledge work, vision-heavy workflows, computer use |
| Frontier intelligence at scale, built for coding, agents, and enterprise workflows | Claude Sonnet 5 | Code generation, data analysis, content creation, visual understanding, agentic tool use |
| Near-frontier performance with lightning-fast speed and extended thinking at the most economical price point | Claude Haiku 4.5 | Real-time applications, high-volume intelligent processing, cost-sensitive deployments needing strong reasoning, sub-agent tasks |

## Notes

- The `effort` parameter defaults to `high` on Claude Opus 5 and Claude Opus 4.8, including in Claude Code and the Messages API. On Claude Opus 5, step up to `xhigh` for the most demanding coding/agentic work. On Claude Opus 4.8, use `xhigh` for coding, high-autonomy work, and the most intelligence-demanding tasks.
- To decide whether to upgrade or change models: create benchmark tests specific to the use case, test with actual prompts/data, compare accuracy/quality/edge-case handling, then weigh performance and cost tradeoffs.

## Related

- [Models overview](./overview.md)
- [What's new in Claude Opus 5](./whats-new-opus-5.md)
- [What's new in Claude Sonnet 5](./whats-new-sonnet-5.md)
