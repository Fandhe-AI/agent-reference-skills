---
source: https://docs.cloud.google.com/iam/docs/create-service-agents
---

# Creating Service Agents and Granting Roles

Service agents at project, folder, and organization level are created automatically as you use services. You can request them in advance so roles can be granted before using a service (useful with Terraform or policies-as-code).

## Signature / Usage

Required permission to trigger creation: `workloadidentity.serviceAgents.create`. A service agent that does not exist yet cannot be granted roles.

### Identify service endpoints

```bash
gcloud services list --available --filter='EXPRESSION' --limit=LIMIT
```

```bash
name ~ googleapis.com AND name !~ sandbox
```

### Trigger creation (gcloud)

```bash
gcloud workload-identity service-agents generate --service="ENDPOINT" \
    --location="global" --RESOURCE_TYPE="RESOURCE_ID"
```

`ENDPOINT` is for example `aiplatform.googleapis.com`; `RESOURCE_TYPE` is `project`, `folder`, or `organization`; `RESOURCE_ID` is the numeric ID. Run once per resource. Truncated response:

```
Provisioned service agents for aiplatform.googleapis.com under projects/123456789012:

container: projects/123456789012
principal: serviceAccount:service-123456789012@gcp-sa-aiplatform.iam.gserviceaccount.com
role: roles/aiplatform.serviceAgent
serviceProducer: aiplatform.googleapis.com
state: ACTIVE
---
container: projects/123456789012
principal: serviceAccount:service-123456789012@gcp-ri-aiplatform.iam.gserviceaccount.com
serviceProducer: aiplatform.googleapis.com
state: ACTIVE
---
```

### Trigger creation (Terraform)

Use the `google_workload_identity_service_agent` resource; roles can be referenced programmatically.

```terraform
data "google_project" "default" {
}
```

### Grant roles to the created service agents

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME \
    --condition=CONDITION
```

`RESOURCE_TYPE` is `projects`, `resource-manager folders`, or `organizations`; `PRINCIPAL` looks like `serviceAccount:service-0123456789012@gcp-sa-aiplatform-cc.iam.gserviceaccount.com`. The REST path uses the read-modify-write pattern on the resource allow policy (use it to grant to several agents at once).

## Notes

- Agents created on request are not automatically granted their usual roles. The role listed in the response is not granted; grant each listed role to the listed principal yourself or the service may not function.
- Terraform and policies-as-code workflows revoke or flag automatically granted roles that are absent from the configuration, so create the agents and grant roles in code.
- For service-specific resources, follow the individual service's documentation.
- The Terraform sample here is only the opening data block; the full resource example (BigQuery, default project) is on the source page.
- Source: https://docs.cloud.google.com/iam/docs/create-service-agents (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-account-best-practices.md](./service-account-best-practices.md)
- [attach-service-accounts-and-pipelines.md](./attach-service-accounts-and-pipelines.md)
