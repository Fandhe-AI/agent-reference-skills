---
source: https://opencode.ai/docs/console/go/
---

# OpenCode Go

OpenCode Go gives you reliable access to popular open coding models, with three monthly plans:

| Plan | Price | Included usage |
| --- | --- | --- |
| **Go** | **$10/month** | Lower-cost access to the models below |
| **Go Plus** | **$40/month** | Higher usage limits across the models below |
| **Go Teams** | **$20/member/month** | Every member gets their own limits, $5/month higher than Go on every model |

Go works like any other provider in OpenCode. You subscribe to OpenCode Go and get your API key. It's **completely optional** and you don't need it to use OpenCode.

The service is designed primarily for international users and provides stable global access.

## Signature / Usage

1. Sign in to the [OpenCode Console](https://opencode.ai/console), subscribe to Go, Go Plus, or Go Teams, add your billing details, and copy your API key.
2. Run `/connect` in the TUI, select **OpenCode Go**, and paste your API key.

   ```text
   /connect
   ```

3. Run `/models` to select a model available through Go.

   ```text
   /models
   ```

Go and Go Plus are for workspaces with a single member, such as the **Personal** workspace created when you sign up. Either can upgrade to Go Teams at any time, with the unused part of the month's allowance credited. Go Teams covers every member of a workspace with several members, at $20 per member per month. A member who joins mid-period is charged $20 and gets a full monthly allowance. Service accounts are not covered by Go Teams.

The current list of models includes:

- **Grok 4.7**
- **GLM-5.3-Flash**
- **GLM-5.3**
- **GLM-5.2**
- **GPT 6 Luna**
- **GPT 5.6 Luna**
- **Claude Haiku 5.5**
- **Gemini 4 Argon**
- **Kimi K3.1 Pro**
- **Kimi K3**
- **Kimi K2.7 Code**
- **LongCat-2.0**
- **Step 5 Preview**
- **Beam Free** (limited time, limited regions)
- **Iceman Contributor Free** (limited time)
- **LongCat 2.5 Free** (limited time)
- **MiMo-V2.6-Flash**
- **MiMo-V2.6-Pro**
- **MiMo-V2.5**
- **MiMo-V2.5-Pro**
- **MiniMax M3.1 Flash**
- **MiniMax M3**
- **Muse Spark 1.3 Contributor** ([limited regions](https://ai.developer.meta.com/legal/geographic-use-policy))
- **Muse Spark 1.2 Contributor** ([limited regions](https://ai.developer.meta.com/legal/geographic-use-policy))
- **Qwen3.8 Max**
- **Qwen3.8 Flash**
- **Qwen3.7 Plus**
- **DeepSeek V4.1 Flash**
- **DeepSeek V4 Pro**
- **Hy4**
- **Hy4 preview**
- **Hy3**

The list of models may change as we test and add new ones.

### Enable restricted models

Workspace privacy settings apply to Go. By default, paid endpoints that train on request data are blocked, and allowed regions are **Europe & United States**. Workspaces without saved privacy settings also allow **Global** for requests from China.

In **Settings › Privacy**, an owner or admin can enable:

- **DeepSeek V4.1 Flash and V4 Pro:** select **Global** under **Regions**.
- **LongCat 2.5 Free:** select **Global** under **Regions**.
- **Muse Spark 1.3 Contributor and Muse Spark 1.2 Contributor:** turn on **Allow paid endpoints that train on request data**.

See [Privacy](./go-privacy.md) for each model's training and retention terms.

### Pay with credit

Owners and admins can pay for Go, including renewals and upgrades, from the workspace's credit. Choose **Credit** as the payment method when you subscribe, or later in **Manage subscription**. This is separate from [Extra Usage](./go-usage-limits.md), which pays for usage past your limits.

- The full price comes from your credit balance. If the balance is short, you can add credit first.
- Renewals take the price from your credit when the period ends. If there isn't enough, Go stays active while the renewal retries 1, 3, and 7 days after the period ends, and again as soon as enough credit is added. If the last retry fails, Go ends.
- Workspaces on [invoiced billing](../workspace/billing.md) can't pay for Go with credit.
- A refund of a Go payment made with credit goes back to your credit and ends that Go period.

### Where can I use it?

OpenCode Go is designed for [OpenCode](https://opencode.ai) and other coding agents that produce similar types of requests. Traffic is monitored for abuse that degrades the experience for other users.

Your client should:

1. Send typical coding agent traffic
2. Identify itself with its own user agent, such as `my-coding-agent/1.0`, rather than a generic SDK or HTTP-library name.
3. Send a stable session ID in `x-opencode-session` for each conversation so we can optimize routing and prompt caching.

See [Harnesses](../harnesses/overview.md) to set up Go in Claude Code, Codex, Hermes, Pi, and Raycast.

#### Validated clients

Besides OpenCode, the following clients have been validated to work properly with OpenCode Go, although we do not guarantee that they will continue to work in the future.

| Client | Session support |
| --- | --- |
| **Hermes** | Update to **v0.21.6 or later**, which sends the header on main and auxiliary OpenCode requests ([PR #101864](https://github.com/NousResearch/hermes-agent/pull/101864)). |
| **Claude Code** | Go recognizes its native session header. No custom-header wrapper is needed. |
| **Codex** | Go recognizes its native session header. Some versions and proxy setups still omit it; preserve the session header when forwarding requests. |
| **ZCode** | Go recognizes its native session header. Our [request for `x-opencode-session`](https://github.com/zai-org/feedback/issues/492) remains open, but it is no longer necessary to send that specific header. |
| **Pi** | Current builds send session information for OpenCode. Update older installations. |
| **jcode** | Update to **v0.81.6 or later**, which includes the [session-header fix](https://github.com/1jehuang/jcode/issues/1167). |
| **Kilo Code CLI** | Builds containing [PR #13752](https://github.com/Kilo-Org/kilocode/pull/13752) restore OpenCode session headers. This fix covers the CLI, not the VS Code extension. See [issue #13723](https://github.com/Kilo-Org/kilocode/issues/13723). |

#### Known problematic clients

These clients have missing or incomplete session support in the versions we investigated. The linked reports track fixes and workarounds.

| Client | Status and tracking |
| --- | --- |
| **DeepSeek Harness** | Session information arrives on some model paths, but is missing on others. We recognize its native header; the remaining work is to send it across all adapters. [Discussion #5495](https://github.com/deepseek-ai/deepseek-harness/discussions/5495). |
| **GitHub Copilot Chat** | Automatic session-header support is requested in [VS Code issue #334186](https://github.com/microsoft/vscode/issues/334186). |
| **Kimi Code** | The session-header request in [issue #3506](https://github.com/MoonshotAI/kimi-code/issues/3506) was closed as not planned. |
| **MiMo Code** | [Issue #2317](https://github.com/XiaomiMiMo/MiMo-Code/issues/2317) is closed, and [PR #2327](https://github.com/XiaomiMiMo/MiMo-Code/pull/2327) was closed without merging. |

### Background

Open models have gotten really good. They now reach performance close to proprietary models for coding tasks. Because many providers can serve them competitively, they are usually far cheaper.

However, getting reliable, low latency access to them can be difficult. Providers vary in quality and availability.

We tested a select group of models and providers that work well with OpenCode.

To fix this, we did a couple of things:

1. We tested a select group of open models and talked to their teams about how to best run them.
2. We worked with a few providers to make sure these were being served correctly.
3. We benchmarked the combination of the model/provider and came up with a list that we feel good recommending.

Go, Go Plus, and Go Teams all provide access to these models; choose the plan that fits how much you use them, or Go Teams to cover your whole team.

### Goals

We created OpenCode Go to:

1. Make AI coding **accessible** to more people with a low cost subscription.
2. Provide **reliable** access to the best open coding models.
3. Curate models that are **tested and benchmarked** for coding agent use.
4. Have **no lock-in** by allowing you to use any other provider with OpenCode as well.

## Notes

- OpenCode Go is a Console subscription name, not the Go programming language (go-echo covers the Go web framework).
- Claude Code, Codex and Hermes appear here only as validated clients; those tools themselves are covered by the anthropic-claude-code, openai-codex and hermes-agent skills.
- Go pages: [usage limits](./go-usage-limits.md), [endpoints](./go-endpoints.md), [privacy](./go-privacy.md).

## Related

- [Go usage limits](./go-usage-limits.md)
- [Go endpoints](./go-endpoints.md)
- [Go privacy](./go-privacy.md)
- [Harnesses](../harnesses/overview.md)
- [Billing](../workspace/billing.md)
