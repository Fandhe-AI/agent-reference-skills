---
source: https://docs.cloud.google.com/support/docs/issue-trackers
---

# Issue Trackers, Third-Party Technology Support, and Legacy Support

How to file public issue tracker reports and feature requests, how Third-Party Technology Support works, and the legacy support generations that Customer Care replaced.

## Signature / Usage

Create an issue or feature request on the Google Issue Tracker:

1. Find the product in the official list of issue trackers; star a matching issue if one exists.
2. Otherwise click the product's create link (`https://issuetracker.google.com/issues/new?component=COMPONENT_ID`).
3. In **Template**, select **Defect report** or **Feature request**.
4. Complete **Description** using the prompts and click **Create**.

Console issue: click the help icon in the console, then **Send feedback**.

Search an existing component (pattern used by the official tracker links):

```
https://issuetracker.google.com/issues?q=componentid:COMPONENT_ID%2B+status:open
```

Support generations and mapping:

| Generation | Development | Production | Business-critical |
|------------|-------------|------------|-------------------|
| Metallic (first) | Silver | Gold | Platinum |
| Role-Based and Enterprise (second) | Role-Based Development | Role-Based Production | Enterprise |
| Customer Care (third) | Standard | Enhanced | Premium |

## Options / Props

Third-Party Technology Support (Enhanced, Premium, or Tech Partner Premium Support):

| Approach | Description | Examples |
|----------|-------------|----------|
| Collaborative support | Customer Care works with Google Tech Partners (ISVs) on a joint support experience; engages the vendor as needed | NetApp Cloud Volumes, IBM Power, Databricks, Qubole, PAYG Premium OS images, Anthropic, and others |
| Workload-centric support | Customer Care uses in-house expertise to set up and troubleshoot; may refer you to the vendor | SAP, Oracle, VMware (Google Cloud VMware Engine support is covered by all plans) |
| Third-party vendor support | Commercially reasonable effort with installation, configuration, troubleshooting; may refer you to the vendor | BYOL OS images, databases, web servers, DevOps tools, SQL Server |

Legacy shutdown dates: Platinum and Enterprise December 1, 2021; Gold, Role-Based Production, Silver, Role-Based Development May 31, 2022; Free Trial Technical Support (Chat) June 15, 2022.

## Notes

- Google uses stars to prioritize work, so search before filing. Defect reports are reviewed by staff and forwarded once reproduced; feature requests are triaged only after they gather a handful of stars and comments. Vote for an existing request rather than creating a duplicate. Google Workspace trackers live in Google Workspace developer support.
- Public tracker entries are visible; do not include credentials or sensitive customer data in them (use a private support case for that).
- After May 31, 2022 shutdowns, Silver and Gold direct customers moved to Bronze (billing only) and role-based customers to Basic; filing technical cases or accessing active legacy cases requires purchasing a Customer Care service.
- Acquired products (Looker, Google SecOps SIEM and SOAR, Apigee, Mandiant, Application Integration, Integration Connectors) receive support through the Google Cloud console under Customer Care; legacy portals became view-only after migration (for example, Looker legacy support ended October 2, 2024 and Google SecOps SIEM technical support moved fully to the console on August 1, 2024).
- Source: https://docs.cloud.google.com/support/docs/issue-trackers, https://docs.cloud.google.com/support/docs/third-party, https://docs.cloud.google.com/support/docs/shutdown, https://docs.cloud.google.com/support/docs/integrations (retrieved 2026-11-14; CC BY 4.0)

## Related

- [support-cases.md](./support-cases.md)
- [../support-plans/customer-care-plans.md](../support-plans/customer-care-plans.md)
