---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/networks
---

# Create and manage networks

Create, list, describe, check the status of and delete Distributed Cloud network resources in a Distributed Cloud connected zone. A network is a virtual private network instantiated as a Virtual Routing Function (VRF); packets are routed independently inside a network.

## Signature / Usage

The gcloud instructions assume Cloud Shell or another environment with `bash`.

### Create a network

Requires Edge Network Admin (`roles/edgenetwork.admin`).

```bash
gcloud edge-cloud networking networks create NETWORK_NAME \
    --location=REGION \
    --zone=ZONE_NAME \
    --mtu=MTU_SIZE
```

REST request line (the body carries the `labels` and `mtu` fields):

```text
POST /v1/projects/PROJECT_ID/locations/REGION/zones/ZONE_NAME/networks?networkId=NETWORK_ID
```

### List networks

Requires Edge Network Viewer (`roles/edgenetwork.viewer`).

```bash
gcloud edge-cloud networking networks list \
    --location=REGION \
    --zone=ZONE_NAME
```

```text
GET /v1/projects/PROJECT_ID/locations/REGION/zones/ZONE_NAME/networks?filter=FILTER&pageSize=PAGE_SIZE&orderBy=SORT_BY&pageToken=PAGE_TOKEN
```

### Get information about a network

```bash
gcloud edge-cloud networking networks describe NETWORK_NAME \
    --location=REGION \
    --zone=ZONE_NAME
```

```text
GET /v1/projects/PROJECT_ID/locations/REGION/zones/ZONE_NAME/networks/NETWORK_ID
```

### Check the operational status of a network

```bash
gcloud edge-cloud networking networks get-status NETWORK_NAME \
    --location=REGION \
    --zone=ZONE_NAME
```

```text
GET /v1/projects/PROJECT_ID/locations/REGION/zones/ZONE_NAME/networks/NETWORK_ID:diagnose
```

### Delete a network

Requires Edge Network Admin (`roles/edgenetwork.admin`).

```bash
gcloud edge-cloud networking networks delete NETWORK_NAME \
    --location=REGION \
    --zone=ZONE_NAME
```

```text
DELETE /v1/projects/PROJECT_ID/locations/REGION/zones/ZONE_NAME/networks/NETWORK_ID
```

## Options / Props

| Placeholder | Description |
|---|---|
| `NETWORK_NAME` / `NETWORK_ID` | Name (gcloud) or unique ID (REST) of the network. |
| `REGION` | Google Cloud region to which the Distributed Cloud connected zone belongs. |
| `ZONE_NAME` | Name of the Distributed Cloud connected zone. |
| `MTU_SIZE` | MTU size for the network. Valid values are 1500 and 9000; must match the MTU size of the `default` network and be the same for all networks. |
| `LABELS` | Labels to apply to the network resource. |
| `FILTER` | Expression that constrains returned results. |
| `PAGE_SIZE` | Number of results per page. |
| `SORT_BY` | Comma-delimited field names; ascending by default, prefix a field with `~` for descending. |
| `PAGE_TOKEN` | `nextPageToken` from the previous list response. |

| Limit | Value |
|---|---|
| Networks per Distributed Cloud zone | up to 100 |

## Notes

- Distributed Cloud connected servers ship with a single pre-configured network, the default Distributed Cloud network, and do not support configuring additional networks.
- If the zone's Google Cloud project and the cluster's Google Cloud project differ, grant the cluster project permission in the zone project to access the Edge Network API (see "Authorize actions in clusters using role-based access control").
- Deleting a network is destructive and can break connectivity; try it on a disposable resource first.
- The source's REST create body (`"labels": { LABELS, }, "mtu": { MTU_SIZE, },`) is not valid JSON (braces around the placeholders and trailing commas), so only the request line is kept; the body fields are `labels` and `mtu`.
- The source shows gcloud and REST forms only.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/networks (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [subnetworks.md](./subnetworks.md)
- [networking.md](./networking.md)
- [quotas.md](./quotas.md)
