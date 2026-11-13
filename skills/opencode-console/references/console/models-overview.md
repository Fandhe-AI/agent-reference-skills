---
source: https://opencode.ai/docs/console/models/
---

# Models

OpenCode Console provides a list of models tested and verified by the OpenCode team. Sign in, add credits, and get an API key to use them with OpenCode or another coding agent.

Console works like any other provider in OpenCode. It's **completely optional**, and you can use any other provider instead. For a subscription with included usage, see [OpenCode Go](./go-overview.md).

## Signature / Usage

1. Sign in to the [console](https://opencode.ai/console), add your billing details and credits, and copy your API key.
2. Run `/connect` in the TUI, choose the OpenCode pay-as-you-go provider, and paste your API key.

   ```text
   /connect
   ```

3. Run `/models` to see the available models and select one.

   ```text
   /models
   ```

You are charged per request and can add credits to your account.

### For teams

Share Console models with your team from a [workspace](../workspace/workspaces.md). Owners and admins can [invite members](../workspace/members.md), choose which models are enabled from the **Models** tab, set [budgets](../workspace/budgets.md), and connect [their own providers](./providers.md).

### Background

There are many models available, but only a few work well as coding agents. Providers also vary in configuration, performance, and quality, so a model accessed through a gateway such as OpenRouter may perform differently.

We tested a select group of models and providers that work well with OpenCode.

To build this catalog, we:

1. Tested a select group of models and talked to their teams about how to best run them.
2. Worked with providers to make sure the models were served correctly.
3. Benchmarked each model/provider combination to produce a list we feel good recommending.

Console is an AI gateway that gives you access to these models.

### Goals

We built Console to:

1. **Benchmark** the best models and providers for coding agents.
2. Provide the **highest quality** options without downgrading performance or routing to cheaper providers.
3. Pass along **price drops** by selling at cost, with markup only to cover processing fees.
4. Have **no lock-in**: use Console with any coding agent, or use another provider with OpenCode.

## Notes

- Console is a gateway to third-party models; the provider APIs themselves are covered by openai-api-core / anthropic-api-core / google-gemini-api.
- Endpoint list, model IDs and AI SDK packages are in [Model endpoints](./models-endpoints.md); prices, free models and privacy are in [Model pricing](./models-pricing.md).

## Related

- [Model endpoints](./models-endpoints.md)
- [System One models](./models-system-one.md)
- [Model pricing](./models-pricing.md)
- [Console Intro](./overview.md)
