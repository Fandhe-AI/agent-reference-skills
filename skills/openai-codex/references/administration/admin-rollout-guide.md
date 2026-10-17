# Admin rollout guide

Plan, configure, and verify a ChatGPT Enterprise rollout across workspace and developer surfaces, in eight sequential steps.

## Signature / Usage

Rollout boundaries covered:

- Workspace access
- Local runtime policy for the ChatGPT desktop app, Codex CLI, and IDE extension
- Codex cloud
- Platform API access
- Plugins and connector access
- Permissions in connected systems

## Steps

| Step | Focus |
|------|-------|
| 1. Assign owners and choose a rollout | Owners for workspace access, local runtime policy, Codex cloud, connected systems, reporting/compliance |
| 2. Configure workspace access and identity | Membership, seats, groups, RBAC; test with a representative member first |
| 3. Configure local runtime requirements | Deliver `requirements.toml`; prefer permission profiles over legacy sandbox-mode restrictions |
| 4. Standardize repository configuration | `.codex` / `.agents` config, rules, skills per repository |
| 5. Configure Codex cloud | Grant access, install source-system integration, limit repo access, configure environments/secrets/internet access |
| 6. Configure plugins and connected capabilities | Review plugin/skill/connector-backed capability, test with non-sensitive data, least access first |
| 7. Set up governance and observability | Choose Workspace analytics, Analytics API, Compliance API, or usage limits per the question being asked |
| 8. Verify and maintain the rollout | Verify every boundary with representative identities; record owners and procedural sources |

## Step details

- Gateway: if you manage a model gateway for local Codex clients, use roll-out-a-gateway.md for qualification, credential distribution, and client handoff; configure workspace access separately.
- Step 3 (local runtime): deliver `requirements.toml` through a supported cloud, device, or system channel (separate from workspace roles and groups); prefer permission profiles over legacy sandbox-mode restrictions. To disable Computer Use across browser and desktop surfaces, pin `[features] browser_use = false`, `browser_use_full_cdp_access = false`, `browser_use_external = false`, `in_app_browser = false`, `computer_use = false`; use `allowed_permission_profiles` with `default_permissions = ":workspace"` for the profile allowlist. Where `in_app_browser` (and related browser features) are pinned in managed requirements they take precedence over local settings.
- Step 4 (repository config): configuration (Config basics), rules (Rules), and skills (Build skills) checked into `.codex` or `.agents` according to each feature's documented location; repository configuration can't grant workspace, model, Platform API, or connected-system access.
- Step 5 (Codex cloud): Codex Cloud is off by default for Enterprise workspaces; existing **Use Codex in the cloud** settings carry forward from Codex Cloud (Legacy) (workspaces that enabled Cloud keep access; those with it disabled remain off until an admin enables it). Grant **Use Codex in the cloud** to the audience and **Manage workspace environments** to the people who create and edit workspace-shared environments; install the source-system integration; limit repository access; configure environments, secrets, internet access, and cloud-managed requirements; configure optional hosted workflows such as code review; test task access with a representative member and environment management with the designated administrator. Cloud environments don't inherit local device policy, MDM settings, or local network access.
- Step 6 (plugins): confirm each plugin or skill's source, accountable owner, audience, and review date; review bundled skills, connectors, MCP servers, hooks, and the data and actions required; test with non-sensitive data and least access; record who owns re-review and retirement. Plugins work in Chat and Work across ChatGPT on web, desktop, and mobile, in Codex in the desktop app, and through the Codex CLI plugin browser; not in the IDE extension. ChatGPT and Codex share one universal public plugin directory.
- Step 7 (governance): Workspace analytics (interactive), Analytics API (aggregated), Compliance API (audit and investigation records), usage limits and spend controls; store integration credentials in the organization's secret-management system and protect exported Compliance API records.
- Step 8 (verify): verify workspace membership, seat, and role permissions; covered local capabilities and effective runtime requirements; Codex cloud access, environment configuration, and repository permissions; Platform API organization and project access; plugin installation, bundled skills, connector access, and actions; connected-system authorization; analytics and compliance access. Record the owner and current procedural source for each control, and review access, connected capabilities, credit use, support feedback, and used workflows after the initial rollout.
- Workspace labels: **Codex and Work Local** combines local Codex and Work access under **Allow members to use Codex and Work Locally**; some workspaces instead have independent **Codex Local** (**Allow members to use Codex locally**) and **Work Local** (**Use Work locally**) sections, and enabling one doesn't enable the other. Token permissions and credential lifetime limits appear under **Access tokens** or the local-access section.
- Local computer access with Work Cloud (ChatGPT Work) is a separate opt-in covered by its own guidance; review policies in Agent Security first (policy migration and feature access are separate; if `enforce_residency` is enabled in any cloud policy, **Allow local computer access** is disabled; it doesn't provide strict zero data retention).

## Notes

- In workspace settings, **Codex Local** is a grouping label for local access and access-token controls, not a separate product. **Allow members to use Codex Local** covers the ChatGPT desktop app, Codex CLI, and IDE extension.
- Managed configuration is a separate policy layer that constrains supported runtime behavior for those clients.
- Repository configuration (Step 4) can supply defaults and reusable workflows, but can't grant workspace, model, Platform API, or connected-system access.
- Codex cloud (Step 5) respects the repository permissions exposed by the connected source system; workspace access doesn't bypass those controls.
- Disabling a connector-backed capability (Step 6) doesn't necessarily uninstall the plugin or its bundled skills.
- Use authenticated API references (not this guide) for current access requirements, schemas, and request behavior when building integrations.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
- [Governance](./governance.md)
- [Groups and provisioning](./groups-and-provisioning.md)
