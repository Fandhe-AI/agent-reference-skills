# Administration

Set access and policy boundaries for ChatGPT, Codex developer tools, APIs, plugins, and connected systems. This is a hub page: start with workspace identity and access, then configure local runtime policy for supported capabilities in the ChatGPT desktop app, Codex CLI, and IDE extension; Codex cloud eligibility; Platform API access; plugins and connectors; and permissions in connected systems.

## Overview

The administration section covers six key areas: workspace access, local runtime policies (desktop app / CLI / IDE extension), Codex cloud eligibility, Platform API permissions, plugin availability, and connector permissions.

## Documentation Structure

1. **Getting started** — rollout planning (see [Admin rollout guide](./admin-rollout-guide.md)); the Admin plugin for permissions, approvals, and supported administrative workflows (outside this skill's scope).
2. **Identity and access** — sign-in, provisioning, roles, credentials (see [Authentication](./authentication.md), [Groups and provisioning](./groups-and-provisioning.md), [Roles and workspace permissions](./roles-and-workspace-permissions.md), [Access tokens](./access-tokens.md), [Service accounts](./service-accounts.md)).
3. **Deployment and configuration** — app distribution, updates, runtime settings, model access, gateways, and Bedrock (see [Deploy the Windows app](./windows-deployment.md), [Manage app updates](./manage-app-updates.md), [Managed configuration](./managed-configuration.md), [Workspace model availability](./workspace-model-availability.md), [Sign in with ChatGPT through a gateway](./sign-in-with-chatgpt-through-a-gateway.md), [Use API/provider credentials](./connect-to-a-gateway.md), [Roll out a gateway](./roll-out-a-gateway.md), [Gateway compatibility](./gateway-compatibility.md), [Bedrock through LiteLLM](./bedrock-through-litellm.md); direct Bedrock access is in config/amazon-bedrock.md).
4. **ChatGPT Work** — overview, cloud and local security, usage and cost, and the admin FAQ (see [ChatGPT Work admin FAQ](./work-admin-faq.md); the other Work pages are ChatGPT Work specific and outside this skill's scope).
5. **Plugins and connections** — plugin availability, connector access and actions, plugin import and sync, and skill controls (see [Plugin controls](./plugin-controls.md), [Plugin management](./plugin-management.md), [Skill controls](./skill-controls.md)).
6. **Usage and analytics** — workspace analytics and the Analytics API (see [Workspace analytics](./workspace-analytics.md), [Analytics API](./analytics-api.md), [ChatGPT usage limits and spend controls](./usage-limits.md)).
7. **Security and compliance** — governance, Agent Security, and audit (see [Governance](./governance.md), [Agent Security](./agent-security.md), [Compliance API and audit events](./compliance-api.md)).

## Notes

- Each numbered category above maps to a set of reference pages in this directory.
- Pages listed on the official hub that this skill doesn't reproduce: dots permissions, Space sharing, Sites administration, teams and Team Tasks, Slack/Teams deployment (admin side), workspace connections, Local computer access for Work Cloud and dots, dynamic groups, user lifecycle management, Bedrock GovCloud configuration, GPTs and sharing, migrating custom GPTs to plugins, Usage Insights, Prisma AIRS, and HIPAA configuration.
- For approvals, sandboxing, and other agent security mechanisms, see the security-automation reference scope instead.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [ChatGPT Work admin FAQ](./work-admin-faq.md)
- [Agent Security](./agent-security.md)
- [Plugin management](./plugin-management.md)
