# ChatGPT usage limits and spend controls

Understand when ChatGPT workspace credit controls can affect plan-dependent Codex usage.

## Overview

These controls apply to "eligible activity under the plan for the workspace" — potentially including some Codex usage, depending on the subscription tier — when an organization uses shared or purchased ChatGPT workspace credits. They operate independently from OpenAI API Platform billing.

## Ultrafast mode

GPT-6 Astra Ultrafast is off by default in eligible Enterprise workspaces. Workspace owners can enable it through workspace permissions (see roles-and-workspace-permissions.md). Existing per-user spend limits apply to eligible Ultrafast usage; review those limits before enabling access because the higher usage rates can consume a user's budget faster. See speed.md (agent-configuration category) for plan eligibility and billing details.

## Notes

- Usage controls don't determine feature entitlement or permissions, though exhausted limits may restrict access to features.
- They don't govern permissions in source systems or affect Platform API usage.
- Enterprise and Education plans, and Business plans, have separate dedicated management/credit-and-spend procedures — check current Help Center guidance for the applicable plan type.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Governance](./governance.md)
- [Workspace analytics](./workspace-analytics.md)
- [ChatGPT Work admin FAQ](./work-admin-faq.md)
