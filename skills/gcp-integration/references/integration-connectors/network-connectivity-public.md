---
source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-public
---

# Public network connectivity

Integration Connectors can connect to a publicly accessible backend directly (set the endpoint in the connection's `Hostname` field) or through a firewall. For a firewall, configure the region to use static egress IP addresses, then allowlist those addresses in your firewall. By default Integration Connectors allocates IP addresses automatically (auto IP).

## Signature / Usage

### Assign static IP addresses to a region

Static IPs are assigned per region (for example the addresses for `us-east1` differ from `us-west2`); take the region from the Location column of the Connections page. The commands call the public API, so they run in Cloud Shell or a regular terminal.

Adapted (not in the official docs): `egressMode` uses the enum value `STATIC_IP` (the source body had `static_ip`; the sample response and the Discovery `NetworkConfig.egressMode` enum use `STATIC_IP`), and the URL is quoted so the shell does not treat `?` as a glob; `updateMask=networkConfig` keeps the source's field name.

```bash
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"networkConfig": {"egressMode": "STATIC_IP"}}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/regionalSettings?updateMask=networkConfig"
```

The call returns a long-running operation; wait for it to complete:

```text
{
"name": "projects/test-01/locations/us-central1/operations/operation-1696840994443-6074494b6d138-8215226d-516faaf8",
"metadata": {
  "@type": "type.googleapis.com/google.cloud.connectors.v1.OperationMetadata",
  "createTime": "2023-10-09T08:43:14.467058513Z",
  "target": "projects/test-01/locations/us-central1/regionalSettings",
  "verb": "update",
  "requestedCancellation": false,
  "apiVersion": "v1"
 },
"done": false
}
```

```bash
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID
```

On success the operation response contains the allocated addresses (four in the `us-central1` sample):

```text
...
...
"response": {
  "@type": "type.googleapis.com/google.cloud.connectors.v1.RegionalSettings",
  "name": "projects/test-01/locations/us-central1/regionalSettings",
  "networkConfig": {
   "egressMode": "STATIC_IP",
    "egressIps": [
      "35.193.227.203",
      "34.133.63.9",
      "35.223.253.58",
      "34.170.27.253"
    ]
  }
}
```

### Get the static IP addresses of a region

```bash
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/regionalSettings
```

### Return a region to auto IP

Adapted (not in the official docs): same fixes as the static IP call (`auto_ip` changed to the Discovery enum value `AUTO_IP`, URL quoted).

```bash
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -d '{"networkConfig": {"egressMode": "AUTO_IP"}}' \
    "https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/regionalSettings?updateMask=networkConfig"
```

## Options / Props

### `networkConfig.egressMode` (RegionalSettings)

| Value | Meaning |
|---|---|
| `AUTO_IP` | Network egress through auto-assigned IPs (default). |
| `STATIC_IP` | Network egress through static IPs, listed in the output-only `egressIps`. |

### Considerations

| Point | Detail |
|---|---|
| Scope | The reserved static IP set differs per region within a project. |
| `STATIC_IP` to `AUTO_IP` and back | The original static IPs are not retained; switching back to `STATIC_IP` allocates a new set. |
| Downtime | Changing the mode in either direction can cause downtime in the order of seconds. |

## Notes

- Allowlist the returned `egressIps` in your firewall rules; the page does not cover creating or configuring the firewall itself.
- Changing the egress mode causes downtime and can allocate a new set of static IP addresses (see Considerations), which must then be allowlisted again; try it on a disposable project first.
- Omitted: the sample response of the GET call (the same `networkConfig` excerpt as the operation response shown above) and Console steps.
- Corrected from the official docs: the source sent `"egressMode": "static_ip"` / `"auto_ip"` and an unquoted `?updateMask="networkConfig"` URL; the Discovery enum values are `STATIC_IP` and `AUTO_IP`.
- Source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-public (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-connectivity-private.md](./network-connectivity-private.md)
- [network-connectivity-gc-vpc.md](./network-connectivity-gc-vpc.md)
