# Deployment Policies

Rules controlling which Git sources and deployment mechanisms can create deployments for a team and its projects, per environment. Available on Enterprise and Pro plans.

## Signature / Usage

```text
Team Settings > Build and Deployment
  Git Sources         -> Add Rule -> select environments -> Add Source (provider + org/namespace [+ repo]) -> Save
  Deployment Sources  -> Add Rule -> select environments -> select allowed sources -> Save

Project Settings > Build and Deployment
  Git Sources / Deployment Sources: Inherit -> Override -> edit rules -> Save
```

## Rule types

| Rule | Restricts |
|------|-----------|
| Git Sources | Which Git providers, organizations, and repositories can deploy |
| Deployment Sources | Which mechanisms can deploy |

Deployment Sources (allow or block each):

| Source | Description |
| --- | --- |
| Git | Deployments from a connected Git provider |
| Vercel CLI | Deployments created with the Vercel CLI |
| v0 | Deployments created from v0 projects without a Git connection |
| REST API | Deployments created through the REST API |
| Deploy Hooks | Deployments triggered by a project Deploy Hook URL |
| Marketplace Integrations | Deployments from a third-party Marketplace integration |

## Notes

- Each rule applies to selected environments; an environment can belong to at most one rule of the same type.
- Rules can be saved without being enforced (paused without deleting).
- Environments: system (Production, Preview) and custom environments; custom environments are only available when editing a project's policy.
- Leave the repository/project field empty to allow any repository under that organization or namespace.
- Projects inherit the team policy by default; switch back to **Inherit** to stop overriding (inherited rules show as read-only summary).
- Example: require production to accept deployments only from a specific repository while preview stays open.

## Related

- [deploy-hooks.md](./deploy-hooks.md)
- [environments.md](./environments.md)
- [managing-deployments.md](./managing-deployments.md)
- [deployment-retention.md](./deployment-retention.md)
