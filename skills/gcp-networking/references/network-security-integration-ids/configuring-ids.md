---
source: https://docs.cloud.google.com/intrusion-detection-system/docs/configuring-ids
---

# Configure Cloud IDS

To configure Cloud IDS you set up IAM permissions, enable private services access, create IDS endpoints and configure packet mirroring. This lets you monitor VPC communication for malicious activity without impacting network performance.

## Signature / Usage

### Grant IAM roles

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --role=roles/ids.admin \
    --member=user:USER_NAME ;
```

The same command form is used for `roles/ids.viewer`, `roles/compute.packetMirroringUser` and `roles/logging.viewer`.

### Set up private services access

Run once per project (steps 2 and 3 per monitored VPC network). The allocated range must be RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12` or `192.168.0.0/16`), or endpoint creation fails.

```bash
gcloud services enable servicenetworking.googleapis.com \
    --project=PROJECT_ID
```

```bash
gcloud compute addresses create RESERVED_RANGE_NAME \
    --global \
    --purpose=VPC_PEERING \
    --addresses=192.168.0.0 \
    --prefix-length=16 \
    --description="DESCRIPTION" \
    --network=VPC_NETWORK
```

If you already have a private connection, update it with the new range; otherwise create it (long-running operation):

```bash
gcloud services vpc-peerings update \
    --service=servicenetworking.googleapis.com \
    --ranges=RESERVED_RANGE_NAME \
    --network=VPC_NETWORK \
    --project=PROJECT_ID
```

```bash
gcloud services vpc-peerings connect \
    --service=servicenetworking.googleapis.com \
    --ranges=RESERVED_RANGE_NAME \
    --network=VPC_NETWORK \
    --project=PROJECT_ID
```

```bash
gcloud services vpc-peerings operations describe \
    --name=OPERATION_NAME
```

Optional, after private services access is enabled:

```bash
gcloud services vpc-peerings enable-vpc-service-controls \
    --service=servicenetworking.googleapis.com \
    --network=VPC_NETWORK \
    --project=PROJECT_ID
```

### Create, describe, list, delete endpoints

```text
gcloud ids endpoints create ENDPOINT_NAME \
     --network=VPC_NETWORK \
     --zone=ZONE \
     --severity=SEVERITY \
     [--no-async] \
     [GCLOUD_WIDE_FLAG...]
```

```text
gcloud ids endpoints list \
    [--filter=EXPRESSION] \
    [--limit=LIMIT] \
    [--page-size=PAGE_SIZE] \
    [--sort-by=[FIELD,...]] \
    [--uri] \
    [GCLOUD_WIDE_FLAG...]
```

```text
gcloud ids endpoints delete ENDPOINT_NAME \
    [--project=PROJECT_ID] \
    [--zone=ZONE] \
    [--no-async] \
    [GCLOUD_WIDE_FLAG...]
```

REST create (the `ENDPOINT_NAME` must be 1-63 characters, lowercase letters, digits and hyphens, start with a lowercase letter, not end with a hyphen) and list:

Adapted (not in the official docs): removed the trailing comma after `"severity"` so the request body is valid JSON, and used `PROJECT_ID` because the API takes a project ID, not a project name.

```text
POST https://ids.googleapis.com/v1/projects/PROJECT_ID/locations/ZONE/endpoints?endpointId=ENDPOINT_NAME
{
  "network": "NETWORK_NAME",
  "severity": "SEVERITY_LEVEL"
}
```

Adapted (not in the official docs): used `PROJECT_ID` instead of `PROJECT_NAME`.

```text
GET https://ids.googleapis.com/v1/projects/PROJECT_ID/locations/ZONE/endpoints
```

### Attach a Packet Mirroring policy

Get the URL from the `endpoint_forwarding_rule` field, then create the policy:

```bash
gcloud ids endpoints describe ENDPOINT_NAME
```

```bash
gcloud compute packet-mirrorings create POLICY_NAME \
    --region=REGION \
    --collector-ilb=ENDPOINT_FORWARDING_RULE \
    --network=VPC_NETWORK \
    --mirrored-subnets=SUBNET
```

### Threat exceptions

```bash
gcloud ids endpoints update ENDPOINT_NAME \
    --threat-exceptions=THREAT_ID1,THREAT_ID2
```

## Options / Props

### IAM roles

| Role | ID | Purpose |
|------|----|---------|
| Cloud IDS Admin | `roles/ids.admin` | Create, delete, get, list endpoints (project owners already have it) |
| Cloud IDS Viewer | `roles/ids.viewer` | Read-only access to endpoints (owner, editor, viewer already have it) |
| Compute packet mirroring user | `roles/compute.packetMirroringUser` | Attach a packet mirroring policy to the endpoint (included in `compute.securityAdmin` and `container.serviceAgent`) |
| Logs Viewer | `roles/logging.viewer` | View recent threats |

Also needed: `compute.regions.list`, `compute.zones.list`.

### Endpoint resource fields

| Field | Type | Description |
|-------|------|-------------|
| createTime / updateTime | string | Output only, RFC 3339 |
| name | string | Output only: `projects/{project_id}/locations/{locationId}/endpoints/{endpointId}` |
| network | string | Required on create. VPC network name (like `"src-net"`) or full URL (`projects/{project_id}/global/networks/src-net`) |
| severity | string | Required on create: `INFORMATIONAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| description | string | Optional |
| endpoint_forwarding_rule | string | Output only: URL of the address to which Packet Mirroring sends traffic |
| endpoint | string | Output only: internal IP address of the endpoint entry point |

### Optional flags

`--no-async`, `--filter`, `--limit` (default unlimited), `--page-size`, `--sort-by` (prefix `~` for descending), `--uri`, `--threat-exceptions` (comma-separated threat IDs; limited to 99 per endpoint).

## Notes

- Endpoint creation can take 10-15 minutes (console).
- After creation you must attach a packet mirroring policy to start inspecting traffic. Mirrored traffic contains full payloads; grant `roles/ids.admin` and `roles/compute.packetMirroringUser` sparingly.
- Deleting an endpoint is destructive and is the way to stop Cloud IDS charges; try it on a disposable endpoint first. Updating private services access ranges or peerings can break connectivity of other services using the connection; use a separate unique range for Cloud IDS if private services access is already configured.
- Corrected from the official docs: the source REST create example had a trailing comma after `"severity": "SEVERITY_LEVEL",` which is invalid JSON, and the REST examples used `projects/PROJECT_NAME` where the API takes the project ID (now `PROJECT_ID`). The source's REST describe and delete examples (`GET`/`DELETE .../endpoints?endpointId=ENDPOINT_NAME`) are omitted because they reuse the create query parameter form; use the gcloud commands or the Cloud IDS REST reference.
- The source also shows Console steps (IDS Endpoints page, attach, view threat logs under IDS Threats).
- Source: https://docs.cloud.google.com/intrusion-detection-system/docs/configuring-ids (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ids-overview.md](./ids-overview.md)
- [best-practice.md](./best-practice.md)
- [ids-quotas.md](./ids-quotas.md)
