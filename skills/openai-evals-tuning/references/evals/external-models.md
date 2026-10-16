# Evaluate external models

Run evals against non-OpenAI models in addition to OpenAI's native models: **third-party models** (no API key required, served via OpenRouter) and **custom endpoints** (API key required, OpenAI-chat-completions-compatible).

## Signature / Usage

- Third-party models: requires an org in the Build usage tier or higher, and an org admin must enable the feature under Settings > Organization > General. Available providers: Google, Anthropic (via AWS Bedrock), Together, Fireworks.
- Custom endpoints: org admin enables "Enable custom providers for evaluations" (per-project), then configure under Settings > Evaluations with an `https://` endpoint URL, API key, and model slugs; use **Verify** to test connectivity.
- Once configured, select the external model from the model picker in a Dataset or Eval.

## Options / Props

| Usage tier | Monthly spend limit (third-party inference, USD) |
|------------|----------------------------------------------------|
| Build | $25 |
| Launch | $100 |
| Grow | $200 |

OpenAI currently covers inference costs on third-party models within these limits. Models are served via OpenRouter; in the future, third-party models will be charged as part of the regular OpenAI billing cycle at OpenRouter list prices.

## Notes

- Calls to external models pass data to third parties and are subject to different terms and weaker safety guarantees than calls to OpenAI models.
- Tool calls are currently not supported when evaluating external models.
- The Evals platform is being deprecated: existing evals become read-only on 2026-10-31 and the dashboard and API are scheduled to shut down on 2026-11-30.
- Custom endpoint must be an OpenAI Chat Completions-compatible `https://` endpoint; keys are encrypted.

## Related

- [Working with evals](./working-with-evals.md)
- [Getting started with datasets](./getting-started-datasets.md)
