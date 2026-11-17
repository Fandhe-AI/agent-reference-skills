---
source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-define-high-value-resource-set
---

# Define and manage your high-value resource set

Resource value configurations establish the high-value resource set that attack path simulations evaluate. You create, edit, view and delete configurations in the Google Cloud console (Security Command Center **Settings** > **Attack path simulation** tab), or through the Security Command Center API (`organizations.resourceValueConfigs`). Premium and Enterprise (Deprecated) service tiers, organization-level activation; other cloud providers require Enterprise (Deprecated).

## Signature / Usage

### Create a resource value configuration (Google Cloud, Console)

1. Go to **Settings** > **Attack path simulation**, select your organization, and click **Create new configuration**.
2. Set **Name**, optional description, **Cloud provider** = **Google Cloud**, and **Select scope** (project, folder or organization).
3. Select a resource type or **Any** (default), optionally add labels and tags, then set the priority value (or enable **Include discovery insights from Sensitive Data Protection** and pick values for high- and medium-sensitivity data).
4. Click **Save**. The change shows in scores and attack paths only after the next simulation.

The AWS (**Account ID**, **Region**, tag) and Azure (**Subscription ID**, location, tag) forms follow the same pattern.

### Find SCC Error findings after changing configurations

On the **Findings** page, select **Finding class** **SCC Error** in the **Quick filters** panel, then scan the results for these `SCC Error` findings and click the category name to read **Next steps** in the finding details panel.

```text
- `APS no resource value configs match any resources`
- `APS resource value assignment limit exceeded`
```

## Options / Props

### IAM roles (grant on the organization)

| Role | ID |
|------|------|
| Resource value config editor | `roles/securitycenter.resourceValueConfigEditor` |
| Resource value config viewer | `roles/securitycenter.resourceValueConfigsViewer` |
| Security Center Settings Editor | `roles/securitycenter.settingsEditor` |

### Configuration fields

| Field | Provider | Notes |
|------|------|------|
| Name | All | Cannot be changed after creation |
| Description | All | Optional |
| Cloud provider | All | Google Cloud, Amazon Web Services, Microsoft Azure |
| Select scope | Google Cloud | Project, folder or organization; applies to resources in that scope |
| Account ID | AWS | Optional 12-digit account ID; unspecified = all accounts in the AWS connection configuration |
| Region | AWS | Optional, for example `us-east-1`; unspecified = all regions |
| Subscription ID | Azure | Optional 36-digit ID; unspecified = all subscriptions in the connector configuration |
| Location | Azure | Optional, for example `East US 2`; unspecified = all locations in the connector configuration |
| Resource type | All | A type or **Any** (default) |
| Label | Google Cloud | Optional; new labels can take several hours to become matchable |
| Tag | All | Optional; new tags can take several hours to become matchable |
| Assign resource value | All | Priority relative to other high-value resources |

### SCC Error findings

| Finding category | Meaning |
|------|------|
| `APS no resource value configs match any resources` | Configurations exist but match no resources |
| `APS resource value assignment limit exceeded` | Matching resources exceed the instance limit |

## Notes

- Enterprise tier shuts down on May 21, 2027; organizations on it move automatically to Premium on or after May 21, 2027.
- Simulations run on a schedule (new results up to every 48 hours) and are not triggered by creating, modifying or deleting configurations. A recently deleted configuration stays visible, but not clickable, until the next simulation.
- Deleting a configuration (actions menu > **Delete** > **Confirm**) changes which resources are scored: the resources it matched leave the high-value set, and the default set applies if no configuration matches. Try it on a disposable configuration first.
- Selecting **Any** with Sensitive Data Protection insights sets resource values automatically for all supported data resource types.
- To review the rules behind a resource's value, view the high-value resource set and read the **Matching configurations** column (sorted `High`, `Medium`, `Low`).
- To troubleshoot, filter findings by **Finding class** = **SCC Error** and review **Next steps** for the two findings above; remediation text is in https://docs.cloud.google.com/security-command-center/docs/how-to-remediate-scc-errors.
- Console click-paths for editing, viewing and deleting are summarized; see the source page for the full steps.
- Source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-define-high-value-resource-set (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [attack-exposure-learn.md](./attack-exposure-learn.md)
- [attack-exposure-supported-features.md](./attack-exposure-supported-features.md)
- [toxic-combinations-manage.md](./toxic-combinations-manage.md)
