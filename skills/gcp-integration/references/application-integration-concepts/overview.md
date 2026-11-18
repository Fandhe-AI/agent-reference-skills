---
source: https://docs.cloud.google.com/application-integration/docs/overview
---

# Application Integration overview, concepts and setup

Application Integration is an Integration-Platform-as-a-Service (iPaaS) solution in Google Cloud that connects Google Cloud services and third-party SaaS applications. It is serverless, auto-scales, and is fully managed by Google. This page also covers the fundamental concepts index and the setup (provisioning) procedure for a project.

## Signature / Usage

### Default service account created at setup

The setup creates the Application Integration default service account during the region and encryption step:

```text
service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com
```

### Set up Application Integration

- Quick setup: a single-click operation (Console, **Application Integration** > **Overview**, pick the region, click **Quick setup**). It enables the Application Integration API, Secret Manager API and Connectors API, creates the default service account, and uses Google-owned and Google-managed encryption keys for the selected region.
- Advanced setup: a manual process where you enable the required APIs, then select the region and the encryption method (Google-managed key, or customer-managed encryption key).

## Options / Props

### Key features

| Feature | Description |
|---------|-------------|
| Unified integration editor | Drag-and-drop interface to design an integration flow with little or no code |
| Plug-and-play connectors | Pre-built connectors to Google Cloud services and other business applications |
| Data mapping and transformations | Visual data mapping editor with mapping functions |
| Custom-configurable tasks | Built-in tasks that define individual actions within an integration |
| Event driven triggers | Out-of-the-box triggers that start the configured tasks |
| Cloud Monitoring | Usage, performance, alerts and health of integration resources |
| Cloud Logging | View integration logs in Cloud Logging |
| Identity federation | Use an existing identity provider to authenticate users |
| Gemini to build integrations | Build integrations from natural language prompts |

### Fundamental concepts

| Concept | Description |
|---------|-------------|
| Triggers | External events that start an integration; see [triggers.md](./triggers.md) |
| Tasks | Units of work in an integration; see [tasks.md](./tasks.md) |
| Forks and Joins | Execution strategy of a task or trigger in the integration editor |
| Edge and edge conditions | Control flow and conditions between elements; see [edge-and-edge-conditions.md](./edge-and-edge-conditions.md) |
| Data Mapping | Variable assignments and mapping functions |
| Integration variables | Data holders in the designer; see [variables.md](./variables.md) |
| Integration versions | Develop an integration with multiple authors using versions |
| Local logging | Local logging for an integration |

### Roles required for setup (granted on the project)

| Role | ID |
|------|----|
| Google Cloud Project Editor | `roles/editor` |
| Cloud KMS Admin | `roles/cloudkms.admin` |
| Application Integration Admin | `roles/integrations.integrationAdmin` |
| Connector Admin | `roles/connectors.admin` |

### APIs enabled by the Advanced setup

| API | Service name | Purpose |
|-----|--------------|---------|
| Application Integration API | `integrations.googleapis.com` | Create and manage integrations |
| Secret manager API | `secretmanager.googleapis.com` | Stores API keys, passwords and certificates |
| Connectors API | `connectors.googleapis.com` | Create and manage Integration Connectors connections |
| Cloud KMS API | `cloudkms.googleapis.com` | Customer-managed encryption keys (CMEK) |

### Encryption methods

| Method | Description |
|--------|-------------|
| Google-managed encryption key | Default; Google manages the keys for the selected region |
| Customer-managed encryption key (CMEK) | You manage the keys for the selected region |

## Notes

- To create a project you need Project Creator (`roles/resourcemanager.projectCreator`, which contains `resourcemanager.projects.create`).
- Billing must be enabled for the project. Data stored in a region is available redundantly across all zones of that region.
- The default service account `service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com` is created during the region and encryption step and is added to the project with basic IAM roles and permissions.
- Enabling CMEK for an Application Integration region cannot be undone; you cannot change or switch the encryption method for the region afterwards. Try CMEK on a disposable project first.
- With CMEK, **Verify** checks whether the default service account has cryptokey access; **Grant** assigns the CryptoKey Encrypter/Decrypter role to it. Granting is optional, but without it authentication profiles are not configured and you must grant the access manually when creating a new authentication profile.
- The setup roles above include project-level `roles/editor`; the source lists them as required for setup. Prefer narrower roles where your organization allows.
- Quotas and limits: see the Application Integration quotas page (https://docs.cloud.google.com/application-integration/docs/quotas). Pricing is not copied; see https://docs.cloud.google.com/application-integration/docs/pricing.
- Google Cloud Workflows (code-first orchestration) is a different product, covered by `gcp-messaging-workflows`.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/setup-application-integration (inline code; the overview, concepts and setup pages have no code block). Console steps for Quick setup and Advanced setup are summarized; see the source page.
- Source: https://docs.cloud.google.com/application-integration/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/concepts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0). The concepts page carries a Preview banner for the BigQuery Connector.
- Source: https://docs.cloud.google.com/application-integration/docs/setup-application-integration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [tasks.md](./tasks.md)
- [variables.md](./variables.md)
- [configure-api-trigger.md](./configure-api-trigger.md)
