---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/vpc-service-controls
---

# VPC Service Controls for CX Agent Studio

VPC Service Controls can mitigate the risk of data exfiltration from CX Agent Studio. You create a service perimeter that protects the resources and data you specify. When CX Agent Studio is protected, agent application data and `runSession` requests and responses cannot leave the perimeter. Other Google Cloud resources CX Agent Studio interacts with (DLP redaction templates, BigQuery for conversation exporting, and Data Stores) are in your control and must be available under the same VPC-SC perimeter as the agent application.

## Signature / Usage

### Service perimeter creation

When you create a service perimeter, include both CX Agent Studio (`ces.googleapis.com`) and CX Insights (`contactcenterinsights.googleapis.com`) as protected services. Include any services that you want to restrict (for example, `storage.googleapis.com`, `bigquery.googleapis.com`) under the **Restricted services** pane. For optional dependencies, see the VPC Service Controls documentation for Integration Connectors.

### Service Directory for private network access

CX Agent Studio integrates with Service Directory private network access, so it can connect to OpenAPI tools targets inside your VPC network. This keeps traffic within the Google Cloud network and enforces IAM and VPC Service Controls. If you use load balancing within the perimeter, read the load balancing details in the Private network access overview.

To set up a tool targeting a private network:

1. Follow the Service Directory private network configuration to configure your VPC network and Service Directory endpoint.
2. The **Customer Engagement Suite Service Agent** service account with the following address must exist for your agent project:

```text
service-agent-project-number@gcp-sa-ces.iam.gserviceaccount.com
```

3. Grant `servicedirectory.viewer` and `servicedirectory.pscAuthorizedService` (IAM role IDs `roles/servicedirectory.viewer` and `roles/servicedirectory.pscAuthorizedService`) to that service account in the project where your Service Directory is located. If your Service Directory is in a different project than your agent application, also grant `servicedirectory.viewer` to it in the project that hosts your agent application.
4. Provide the Service Directory service along with the URL and optional authentication information when creating the tool (a field in the tool's advanced settings).

To troubleshoot, set up a private uptime check to verify the Service Directory configuration.

## Notes

### Limitations

- Tools and callbacks can't send requests to arbitrary HTTP endpoints when VPC Service Controls is enabled (risk of exfiltrating data outside the perimeter); configure Service Directory for private network access.
- Audio recordings cannot be written to Cloud Storage buckets outside the perimeter.
- Conversations cannot be written to BigQuery datasets outside the perimeter.
- Sensitive Data Protection redaction templates outside the perimeter cause failures in redacting conversation contents.
- OpenAPI tools cannot reference authentication keys using secrets that are outside the perimeter.
- Datastore tools that specify a data store outside the perimeter fail to execute.
- Flow-based agents that specify an agent resource outside the perimeter fail when called.
- Importing an agent application from, or exporting one to, a Cloud Storage bucket outside the perimeter fails.

### Other

- The service account address in the fenced block is copied as written in the source (`service-agent-project-number` stands for the agent project's number).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/vpc-service-controls (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [cmek.md](./cmek.md)
- [api-access.md](./api-access.md)
