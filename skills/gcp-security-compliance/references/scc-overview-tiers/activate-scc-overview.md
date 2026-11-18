---
source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-overview
---

# Overview of activating Security Command Center

Applies to the Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization that uses it automatically moves to the Premium service tier on or after May 21, 2027. Standard and Premium support organization-level and project-level activation; Enterprise supports organization-level activation only. Organization-level activation is the best practice: it lets Security Command Center scan resources across all folders and projects.

## Signature / Usage

### Check which services are enabled after activation

Activation is done in the Google Cloud console. After an organization-level activation, list the services for the organization:

```bash
gcloud scc manage services list --organization=organizations/123
```

After a project-level activation, list the services for the project:

```bash
gcloud scc manage services list --project=projects/789
```

### View your current activation type (Console)

1. Go to Security Command Center and select the organization or project. If it is active, the **Overview** page opens; otherwise the welcome page opens.
2. Open **Settings**, then the **Tier details** tab, and check the **Tier** and **Billing status** rows. Click **Manage tier** to see the available tier and activation options.

## Options / Props

### Organization-level vs project-level activation

| Aspect | Organization-level | Project-level (Standard-legacy, Standard, Premium) |
|---|---|---|
| Tiers | Standard, Premium (subscription or pay-as-you-go), Enterprise (Deprecated; requires a subscription from Google Cloud sales or a partner) | Standard or Premium; activate yourself in the console with the right IAM permissions, no sales contact needed |
| Scope of access | Resources across all folders and projects in the organization | Logs, data, and resources of the activated project only; some services unavailable or produce fewer findings |
| Premium billing | Pay-as-you-go charged to billing accounts of projects in the organization, or subscription | Pay-as-you-go, based on usage of certain resources in the project, billed to the project |
| Data residency | Supported (use the jurisdictional console) | Not supported |

### Tier details fields

| Field | Meaning |
|---|---|
| Tier | Enterprise, Premium, or Standard for the organization or project. If the organization is Enterprise or Premium, all projects inherit it; at project level the field shows the tier the project will use if the organization is downgraded to Standard. |
| Coverage details | Enterprise tier only: Google Cloud or Multicloud. |
| Billing status | Billing state of the activation. Add-ons granted through subscriptions to other Google Cloud products are listed as Add-ons and grant a limited number of Premium or Enterprise services and detection modules. |

### Project-level scenarios

| Scenario | What to do |
|---|---|
| Organization doesn't use Security Command Center at any tier | Activate the Standard or Premium tier for a project. |
| Organization uses the Standard tier | Activate only the Premium tier for a project (every project already uses Standard). |
| Organization uses the Premium tier, but you need Premium for particular projects only | Downgrade the organization-level activation to Standard for the project-level Premium activation to take effect; with an organization-level subscription the change takes effect after the subscription expires. |

## Notes

- To enable data residency you must use the jurisdictional Google Cloud console. For Enterprise with data residency, contact your Google Cloud account representative and schedule an activation date and time before activating; afterwards the representative helps configure your Google SecOps instance for data residency controls.
- Upgrading from Standard or Premium to Enterprise does not change the location of your Security Command Center data. If you did not enable data residency for Standard or Premium, you cannot enable it when upgrading to Enterprise.
- Recommended optimization for project-level Premium: activate the Standard tier at the organization level so that Standard-tier detection modules and service integrations that require organization-level activation are available to the projects.
- Tier modification (upgrade or downgrade, project to organization, subscription to pay-as-you-go) is described on the modify pages for the Standard (https://docs.cloud.google.com/security-command-center/docs/modify-standard-tier), Premium (https://docs.cloud.google.com/security-command-center/docs/modify-premium-tier), and Enterprise (https://docs.cloud.google.com/security-command-center/docs/modify-enterprise-tier) tiers. Enterprise activation steps are at https://docs.cloud.google.com/security-command-center/docs/activate-enterprise-tier.
- Activation and tier changes are documented as console steps only. Tier changes affect billing and available services, so try them on a non-production organization or project first.
- Source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/list (gcloud 593.0.0 help).

## Related

- [activate-standard-tier.md](./activate-standard-tier.md)
- [activate-premium-tier.md](./activate-premium-tier.md)
- [activate-scc-for-a-project.md](./activate-scc-for-a-project.md)
- [activate-scc-project-level-limitations.md](./activate-scc-project-level-limitations.md)
- [data-residency-support.md](./data-residency-support.md)
- [service-tiers.md](./service-tiers.md)
