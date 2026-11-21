---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/vpc-service-controls
---

# VPC Service Controls for CX Agent Studio

VPC Service Controls can mitigate the risk of data exfiltration from CX Agent Studio. You create a service perimeter that protects the resources and data you specify. In the VPC Service Controls overview, "Access from the internet to managed resources within a service perimeter is denied by default", and "you can create ingress rules or access levels to permit access based on various attributes, such as the source IP address, identity, or source Google Cloud project". The CX Agent Studio page lists agent application data and `runSession` requests and responses as artifacts that "cannot leave your service perimeter"; a client outside the perimeter that your ingress rules or access levels permit can still call the API and receive its responses, including `runSession` responses. Other Google Cloud resources CX Agent Studio interacts with (DLP redaction templates, BigQuery for conversation exporting, and Data Stores) are in your control and must be available under the same VPC-SC perimeter as the agent application.

## Signature / Usage

### Service perimeter creation

When you create a service perimeter, include both CX Agent Studio (`ces.googleapis.com`) and CX Insights (`contactcenterinsights.googleapis.com`) as protected services. Include any services that you want to restrict (for example, `storage.googleapis.com`, `bigquery.googleapis.com`) under the **Restricted services** pane. For optional dependencies, see the VPC Service Controls documentation for Integration Connectors.

### Service Directory for private network access

CX Agent Studio integrates with Service Directory private network access, so it can connect to OpenAPI tools targets inside your VPC network. This keeps traffic within the Google Cloud network and enforces IAM and VPC Service Controls. If you use load balancing within the perimeter, read the load balancing details in the Private network access overview.

To set up a tool targeting a private network:

1. Follow the Service Directory private network configuration to configure your VPC network and Service Directory endpoint.
2. The **Customer Engagement Suite Service Agent** service account with the following address must exist for your agent project (replace only `PROJECT_NUMBER` with the agent project's number; keep the `service-` prefix and the `@gcp-sa-ces.iam.gserviceaccount.com` domain):

Adapted (not in the official docs): the placeholder `service-agent-project-number` is written as `service-PROJECT_NUMBER`, the form the OpenAPI, MCP and A2A tool pages give for the same service agent, so that replacing the placeholder keeps the `service-` prefix.

```text
service-PROJECT_NUMBER@gcp-sa-ces.iam.gserviceaccount.com
```

3. Grant `servicedirectory.viewer` and `servicedirectory.pscAuthorizedService` (IAM role IDs `roles/servicedirectory.viewer` and `roles/servicedirectory.pscAuthorizedService`) to that service account in the project where your Service Directory is located. If your Service Directory is in a different project than your agent application, also grant `servicedirectory.viewer` to it in the project that hosts your agent application.
4. Provide the Service Directory service along with the URL and optional authentication information when creating the tool (a field in the tool's advanced settings).

The official docs give no command for the grant in step 3; the commands below use the `gcloud projects add-iam-policy-binding` form from the CX Insights export page. `SERVICE_DIRECTORY_PROJECT` is the project where your Service Directory is located (`--role` takes one role name, so there is one command per role).

Adapted (not in the official docs): in the borrowed `gcloud projects add-iam-policy-binding RECEIVER_PROJECT --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-contactcenterinsights.iam.gserviceaccount.com --role=roles/bigquery.admin`, the project, member and role are replaced with this page's values: the Service Directory project, the Customer Engagement Suite Service Agent above, and the two roles of step 3. Each command also adds `--condition=None`, so the binding is added without a condition.

```bash
gcloud projects add-iam-policy-binding SERVICE_DIRECTORY_PROJECT \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-ces.iam.gserviceaccount.com \
    --role=roles/servicedirectory.viewer \
    --condition=None
gcloud projects add-iam-policy-binding SERVICE_DIRECTORY_PROJECT \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-ces.iam.gserviceaccount.com \
    --role=roles/servicedirectory.pscAuthorizedService \
    --condition=None
```

If your Service Directory is in a different project than your agent application, also run the first command with the agent application's project in place of `SERVICE_DIRECTORY_PROJECT`.

To troubleshoot, set up a private uptime check to verify the Service Directory configuration.

## Notes

### Limitations

- "Tools and callbacks are not able to send requests to arbitrary HTTP endpoints when VPC Service Controls is enabled, as this may risk exfiltrating data outside the VPC Service Controls perimeter." The source then says "You have to configure Service Directory for private network access"; the Service Directory section describes it only for tools: CX Agent Studio "can connect to OpenAPI tools targets inside your VPC network".
- Callbacks: the Callbacks page says "Callbacks cannot directly access private IP addresses or resolve private DNS domains, even if Service Directory is configured. If you need to access resources within a private network, you must use a tool type that supports Private network access (such as OpenAPI or MCP tools) instead." and "Callbacks can only access endpoints that are publicly available on the internet." (https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/callback, retrieved 2026-11-21).
- Audio recordings cannot be written to Cloud Storage buckets outside the perimeter.
- Conversations cannot be written to BigQuery datasets outside the perimeter.
- Sensitive Data Protection redaction templates outside the perimeter cause failures in redacting conversation contents.
- OpenAPI tools cannot reference authentication keys using secrets that are outside the perimeter.
- Datastore tools that specify a data store outside the perimeter fail to execute.
- Flow-based agents that specify an agent resource outside the perimeter fail when called.
- Importing an agent application from, or exporting one to, a Cloud Storage bucket outside the perimeter fails.

### Other

- Source inconsistency: the source names "Tools and callbacks" in the limitation and answers it with "You have to configure Service Directory for private network access", while the Callbacks page says callbacks cannot reach private IP addresses or private DNS domains "even if Service Directory is configured". Both are kept as written; the Service Directory steps on this page apply to tools.
- Corrected from the official docs: the source writes the address as `service-agent-project-number@gcp-sa-ces.iam.gserviceaccount.com`, which reads as if the whole `service-agent-project-number` part were the project number. The OpenAPI and MCP tool pages give the service agent as `service-{PROJECT_NUMBER}@gcp-sa-ces.iam.gserviceaccount.com` and the A2A tool page as `service-PROJECT_NUMBER@gcp-sa-ces.iam.gserviceaccount.com` (https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/tool/open-api, https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/tool/a2a-protocol, retrieved 2026-11-21); only `PROJECT_NUMBER` is replaced. The OpenAPI tool page links the service agent to the IAM service agents reference (https://docs.cloud.google.com/iam/docs/service-agents#customer-engagement-suite-service-account).
- Adapted from the official docs: the `gcloud projects add-iam-policy-binding` command form is taken from https://docs.cloud.google.com/gemini-enterprise-cx/insights/export, where it grants `roles/bigquery.admin` to `service-PROJECT_NUMBER@gcp-sa-contactcenterinsights.iam.gserviceaccount.com`; the project, member and role were replaced with this page's values (`service-PROJECT_NUMBER@gcp-sa-ces.iam.gserviceaccount.com`, `roles/servicedirectory.viewer`, `roles/servicedirectory.pscAuthorizedService`). Both role IDs are listed in the IAM roles reference for Service Directory (https://docs.cloud.google.com/iam/docs/roles-permissions/servicedirectory, retrieved 2026-11-14).
- Adapted from the official docs: both commands add `--condition=None`, which the borrowed command does not have. gcloud 593.0.0 help (`gcloud projects add-iam-policy-binding`, `--condition`): "When the condition is explicitly specified as None (--condition=None), a binding without a condition is added."
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/vpc-service-controls (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/overview (default denial and ingress rules / access levels; retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [cmek.md](./cmek.md)
- [api-access.md](./api-access.md)
