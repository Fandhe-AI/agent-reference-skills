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

## Notes

- In workspace settings, **Codex Local** is a grouping label for local access and access-token controls, not a separate product. **Allow members to use Codex Local** covers the ChatGPT desktop app, Codex CLI, and IDE extension.
- Managed configuration is a separate policy layer that constrains supported runtime behavior for those clients.
- Repository configuration (Step 4) can supply defaults and reusable workflows, but can't grant workspace, model, Platform API, or connected-system access.
- Codex cloud (Step 5) respects the repository permissions exposed by the connected source system; workspace access doesn't bypass those controls.
- Disabling a connector-backed capability (Step 6) doesn't necessarily uninstall the plugin or its bundled skills. Plugins are available with ChatGPT Work on web, with ChatGPT Work and Codex in the desktop app, and through the Codex CLI plugin browser — not in Chat, the IDE extension, or mobile.
- Use authenticated API references (not this guide) for current access requirements, schemas, and request behavior when building integrations.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
- [Governance](./governance.md)
- [Groups and provisioning](./groups-and-provisioning.md)
