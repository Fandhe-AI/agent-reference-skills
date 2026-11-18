---
source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-private
---

# Private network connectivity

Integration Connectors reach backends on a private network only through Private Service Connect (PSC). From a networking point of view you are the service producer (you create a PSC service attachment) and Integration Connectors is the service consumer. An endpoint attachment is the Integration Connectors resource that lets connections reach your backend through that service attachment; it can be exposed to connections as an IP address or, with an Integration Connectors managed zone, as a hostname.

## Signature / Usage

### Find the PSC service attachment

```bash
gcloud compute service-attachments list
```

```text
  NAME       REGION   TARGET_SERVICE                                       CONNECTION_PREFERENCE
  demo-sa us-west1 k8s2-tcp-tgysilgj-apps-ingressgateway-fzdhwstg ACCEPT_AUTOMATIC
```

### Create an endpoint attachment (IP address)

Get a token, then call the CreateEndpointAttachment API (a long-running operation).

```bash
TOKEN="$(gcloud auth print-access-token)"
```

Adapted (not in the official docs): the `serviceAttachment` value uses the `projects/PROJECT_ID/regions/LOCATION/serviceAttachments/SERVICE_ATTACHMENT_NAME` form shown in the API's own sample response (the source had `projects/demo/serviceAttachments/?SERVICE_ATTACHMENT_NAME`), and the URL is quoted so the shell does not treat `?` as a glob.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
       -H "Content-Type: application/json" \
       -d '{
      "name": "projects/PROJECT_ID/locations/LOCATION/endpointAttachments/ENDPOINT_ATTACHMENT_NAME",
      "serviceAttachment": "projects/PROJECT_ID/regions/LOCATION/serviceAttachments/SERVICE_ATTACHMENT_NAME"
    }' \
       "https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpointAttachments?endpointAttachmentId=ENDPOINT_ATTACHMENT_NAME"
```

Verify the endpoint attachment (the IP address is in `endpointIp`; use it when configuring a connector for private connectivity):

```bash
curl -X GET -H "Authorization: Bearer $TOKEN" \
    https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpointAttachments/ENDPOINT_ATTACHMENT_NAME
```

Adapted (not in the official docs): removed the trailing comma after `labels` so the sample response is valid JSON.

```json
{
    "name": "projects/demo-project/locations/us-central1/endpointAttachments/demo-ea",
    "createTime": "2023-04-17T04:34:59.569527046Z",
    "updateTime": "2023-04-17T04:37:25.189074195Z",
    "description": "demo endpoint attachment",
    "serviceAttachment": "projects/demo-project/regions/us-central1/serviceAttachments/demo-sa",
    "endpointIp": "10.0.0.0",
    "labels": {"team":"sre"}
}
```

### Get the service directory project ID to allowlist in the service attachment

Ensure at least one connection exists in the project. In the sample output (an excerpt of the List Connections response) the service directory project ID is `abcdefghijk-tp`; allowlist that project ID in your service attachment.

```bash
curl -X GET \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://connectors.googleapis.com/v1/projects/CONNECTORS_PROJECT_ID/locations/-/connections"
```

```text
      "serviceDirectory": "projects/abcdefghijk-tp/locations/asia-northeast1/namespaces/connectors/services/runtime",
      "nodeConfig": {
        "minNodeCount": 2,
        "maxNodeCount": 50
      }
    },
....
```

### Create a managed zone (hostname)

First create a Cloud DNS private managed zone with the hostname mapped to the endpoint attachment IP, then create the Integration Connectors managed (peering) zone.

Adapted (not in the official docs): body keys changed from `target_project` / `target_vpc` to the `targetProject` / `targetVpc` field names of the `ManagedZone` resource in the Discovery document, and the URL is quoted so the shell does not treat `?` as a glob.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "DESCRIPTION",
    "dns": "DNS_NAME",
    "targetProject": "TARGET_PROJECT",
    "targetVpc": "TARGET_VPC"
  }' \
  "https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/managedZones?managedZoneId=MANAGED_ZONE_NAME"
```

```bash
curl -X GET -H "Authorization: Bearer $TOKEN" \
    https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/managedZones/MANAGED_ZONE_NAME
```

## Options / Props

### Endpoint attachment fields (console)

| Field | Description |
|---|---|
| Name | Unique; cannot be changed later. Starts with a lowercase letter, followed by up to 63 lowercase letters, numbers or hyphens; cannot end with a hyphen; minimum length 2. |
| Service Attachment ID | Name of the PSC service attachment you already created. Get the project ID of the service directory and allowlist it in your service attachment. |
| Description, Labels | Optional. |
| Enable endpoint global access | Optional. By default the connection and the backend must be in the same region; enabling it lets a connection in any region send traffic to your backend. Does not affect DRZ compliance (the managed zone stays regional). The load balancer must have global access enabled; an internal passthrough load balancer has it enabled by default. |

### Managed zone fields

| Field / placeholder | Description |
|---|---|
| Name (`MANAGED_ZONE_NAME`) | Unique; cannot be changed later; starts with a lowercase letter, followed by up to 63 lowercase letters, numbers or hyphens; cannot end with a hyphen; minimum length 2. |
| Target DNS name (`dns`) | Full Cloud DNS name the peering zone is for, for example `server8.stage.user.private`. |
| Target project (`targetProject`) | Project that has the private Cloud DNS zone. |
| Target network (`targetVpc`) | VPC network in which the private Cloud DNS zone is maintained. |

### Roles and permissions

| Task | Requirement |
|---|---|
| Create an endpoint attachment | `connectors.endpointAttachments.create`, in `roles/connectors.admin` or `roles/connectors.endpointAttachmentAdmin` |
| Create a managed zone | `connectors.managedZones.create` (granted to the user creating the managed zone), in `roles/connectors.admin` or `roles/connectors.managedZoneAdmin` |
| DNS peering | Grant `roles/dns.peer` to the Integration Connectors service agent `service-PROJECT_NUMBER@gcp-sa-connectors.iam.gserviceaccount.com`. If the Cloud DNS project differs from the Integration Connectors project, grant it in the Cloud DNS project (for example, managed zone in project 12345 and Cloud DNS in project 67890: grant `roles/dns.peer` to `service-12345@gcp-sa-connectors.iam.gserviceaccount.com` in project 67890). |

## Notes

- Connection status: on the Endpoint Attachment Details page, the Connection state `Accepted` means the PSC connection is established.
- In a connection, set Destination Type to **Endpoint attachment** and choose the attachment; if you created a managed zone, set Destination Type to **Host Address** and use the A-record you created.
- Private connectivity is always through a PSC service attachment, and a service attachment always needs a load balancer. Backends can be on-premises, in Google VPC, in a Google Cloud serverless environment, or a managed Google Cloud service.
- Corrected from the official docs: the source names the roles `roles/connectors.endpointAttachmentsAdmin` and `roles/connectors.managedZonesAdmin`; the IAM reference (https://docs.cloud.google.com/iam/docs/roles-permissions/connectors) and the access page list `roles/connectors.endpointAttachmentAdmin` and `roles/connectors.managedZoneAdmin`, which the table uses.
- Corrected from the official docs: the source writes the service agent once as `service-PROJECT_NUMBER@gcp-sa-connectorsiam.gserviceaccount.com` and the role once as `role/dns.peer`; the same page's example and the CMEK page use `service-PROJECT_NUMBER@gcp-sa-connectors.iam.gserviceaccount.com`, and the next sentence uses `roles/dns.peer`.
- Source inconsistency: the endpoint attachment name may have "up to 63" lowercase letters, numbers or hyphens after the first letter in the Console text and "up to 31" in the API placeholder text; the Discovery description of `endpointAttachmentId` gives the regex `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.
- The sample `gcloud compute service-attachments list` output shows `ACCEPT_AUTOMATIC`; the gcloud help describes it as "Always accept connection requests from consumers automatically." The Google Cloud VPC page creates the service attachment with `ACCEPT_MANUAL` and a consumer accept list of the service directory project.
- Corrected from the official docs: `"serviceAttachment": "projects/demo/serviceAttachments/?SERVICE_ATTACHMENT_NAME"` became the regional path form of the sample response, which matches the Discovery format `projects/*/regions/*/serviceAttachments/*` of `Destination.serviceAttachment`; the sample endpoint attachment response had a trailing comma after `"labels": {"team":"sre"},`; the managed zone body used `"target_project"` / `"target_vpc"`, changed to `targetProject` / `targetVpc`; the two create URLs are quoted. The source's prose names the network placeholder `TARGET_NETWORK` while its body uses `TARGET_VPC`.
- The source's sample create request includes `name`; in the API the resource name is output-only and the ID comes from `endpointAttachmentId`.
- Creating the attachment and managed zone start long-running operations; wait for the operation to complete before use.
- VPC, Private Service Connect and Cloud DNS are in `gcp-networking`.
- Omitted: Console click-paths, images and the hostname/managed-zone Console form.
- Source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-private (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/cmek (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/connectors (retrieved 2026-11-14; CC BY 4.0)

## Related

- [network-connectivity-gc-vpc.md](./network-connectivity-gc-vpc.md)
- [network-connectivity-public.md](./network-connectivity-public.md)
- [connectors-access-permissions.md](./connectors-access-permissions.md)
- [vpcsc-connectors.md](./vpcsc-connectors.md)
