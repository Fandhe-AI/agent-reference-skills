---
source: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services
---

# Access published services through endpoints

How to access services in another VPC network by using Private Service Connect endpoints: a forwarding rule that targets the producer's service attachment. You can connect to your own services or to those of other producers, including Google.

## Signature / Usage

### Create an endpoint

Reserve an internal IP address in the same region as the producer's service attachment.

```bash
gcloud compute addresses create ADDRESS_NAME \
    --region=REGION \
    --subnet=SUBNET \
    --ip-version=IP_VERSION
```

Create the forwarding rule. By default endpoints are reachable only from their own region.

Adapted (not in the official docs): the source writes the optional `--service-directory-registration` flag inside square brackets (`[ --service-directory-registration=... ]`), which a shell would pass as a literal `[` argument; the brackets are removed and the flag is written as a normal flag. Omit that line to use the default namespace `goog-psc-default`.

```bash
gcloud compute forwarding-rules create ENDPOINT_NAME \
    --region=REGION \
    --network=NETWORK_NAME \
    --address=ADDRESS_NAME \
    --target-service-attachment=SERVICE_ATTACHMENT \
    --service-directory-registration=projects/PROJECT_ID/locations/REGION/namespaces/NAMESPACE
```

To make the endpoint reachable from any region, add `--allow-psc-global-access` to the same command.

Adapted (not in the official docs): same bracket removal as above.

```bash
gcloud compute forwarding-rules create ENDPOINT_NAME \
    --region=REGION \
    --network=NETWORK_NAME \
    --address=ADDRESS_NAME \
    --target-service-attachment=SERVICE_ATTACHMENT \
    --allow-psc-global-access \
    --service-directory-registration=projects/PROJECT_ID/locations/REGION/namespaces/NAMESPACE
```

REST equivalents:

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/addresses
```

```json
{
  "name": "ADDRESS_NAME",
  "addressType": "INTERNAL",
  "subnetwork": "SUBNET_URI",
  "ipVersion": "IP_VERSION"
}
```

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/forwardingRules
```

```json
{
  "name": "ENDPOINT_NAME",
  "IPAddress": "ADDRESS_URI",
  "target": "SERVICE_ATTACHMENT",
  "network": "NETWORK_URI",
  "allowPscGlobalAccess": true,
  "serviceDirectoryRegistrations": [
      {
          "namespace": "NAMESPACE"
      }
  ]
}
```

### Create an endpoint in a Shared VPC service project

Not available in the console; use gcloud or the API. The address is created in the service project with a host project subnet.

```bash
gcloud compute addresses create ADDRESS_NAME \
    --region=REGION \
    --subnet=projects/HOST_PROJECT/regions/REGION/subnetworks/HOST_SUBNET \
    --ip-version=IP_VERSION
```

If you may use all subnets in the host project:

```bash
gcloud compute forwarding-rules create ENDPOINT_NAME \
    --region=REGION \
    --network=projects/HOST_PROJECT/global/networks/HOST_NETWORK \
    --address=projects/SERVICE_PROJECT/regions/REGION/addresses/ADDRESS_NAME \
    --target-service-attachment=SERVICE_ATTACHMENT
```

If you may use only some subnets, specify a shared subnet:

```bash
gcloud compute forwarding-rules create ENDPOINT_NAME \
    --region=REGION \
    --subnet=projects/HOST_PROJECT/regions/REGION/subnetworks/HOST_SUBNET \
    --address=projects/SERVICE_PROJECT/regions/REGION/addresses/ADDRESS_NAME \
    --target-service-attachment=SERVICE_ATTACHMENT
```

### List, describe and delete

```bash
gcloud compute forwarding-rules list \
    --filter 'target~serviceAttachments'
```

```bash
gcloud compute forwarding-rules describe \
    ENDPOINT_NAME --region=REGION
```

```bash
gcloud compute forwarding-rules delete ENDPOINT_NAME \
    --region=REGION
```

### View Service Directory DNS zones

```bash
gcloud dns managed-zones list \
    --filter="visibility=private"
```

```bash
gcloud dns managed-zones describe NAMESPACE--REGION
```

## Options / Props

### Prerequisites

- Enable the Compute Engine, Service Directory and Cloud DNS APIs.
- A regular subnet in the same region as the service, giving the endpoint IP: an IPv4 address from an IPv4-only or dual-stack subnet, or a `/96` IPv6 address from an IPv6-only or dual-stack subnet with an internal IPv6 range. The IP version affects which published services the endpoint can reach.
- Egress firewall rules must allow traffic to the endpoint's internal IP (the implied allow egress rule does; egress deny rules or hierarchical firewall policies that change it may block access, so add a specific egress allow).
- The service attachment URI: `projects/SERVICE_PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`.

### Required roles

| Purpose | Role | Where |
|---|---|---|
| Create, view, delete endpoints | Compute Network Admin (`roles/compute.networkAdmin`) | Your project |
| Configure DNS entries (automatic or manual) | DNS Administrator (`roles/dns.admin`) and Service Directory Editor (`roles/servicedirectory.editor`) | Your project |
| Shared VPC: endpoints using a host project IP | Compute Network User (`roles/compute.networkUser`), providing `compute.networks.use` and `compute.subnetworks.use` | Host project (in addition to the project roles on the service project) |

Key permissions: `compute.addresses.createInternal`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.list`, `compute.addresses.use`, `compute.forwardingRules.create`, `compute.forwardingRules.delete`, `compute.forwardingRules.get`, `compute.forwardingRules.list`, `compute.forwardingRules.pscCreate`, `compute.forwardingRules.pscDelete`, `compute.regionOperations.get`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.services.create`, `servicedirectory.services.delete`; for DNS: `dns.managedZones.create`, `dns.managedZones.delete`, `dns.networks.bindPrivateDNSZone`, `servicedirectory.namespaces.associatePrivateZone`.

### Behavior

| Item | Detail |
|---|---|
| Quota | Each forwarding rule counts toward the per-project quota for PSC forwarding rules to services in another VPC network |
| Updates | Only the global access field can be updated; to change other fields delete and recreate |
| Service Directory namespace | Default `goog-psc-default` |
| DNS zone name | `NAMESPACE--REGION` |
| Hybrid access | VLAN attachment or Cloud VPN tunnel must end in the same VPC (or Shared VPC) as the endpoint; peered VPC clients cannot reach endpoints; other-region access needs global access; Dataplane v1 and v2 supported. For DNS names, create an inbound server policy and forward endpoint DNS names to an inbound forwarder entry point in the same region as the attachment or tunnel |

## Notes

- Deleting an endpoint does not delete its Service Directory namespace or Service Directory DNS zone (they may be used by others); check the namespace is empty before deleting it. Deleting an endpoint is destructive and can break connectivity; try it on a disposable resource first. Deleting a project marks resources for deletion but does not remove them immediately.
- Known issue: connecting a global access endpoint to a service that is not configured for global access breaks health checks, so traffic may go to unhealthy backends and be dropped. Only enable global access if the attachment's load balancer has it; disabling global access does not interrupt same-region traffic but blocks other regions.
- Troubleshooting: DNS zone creation can fail (Cloud DNS API disabled, missing permissions, same zone name or domain already in the network); create a Service Directory DNS zone manually. `PENDING` means the producer has not accepted (update the consumer accept list, recreate the service instance, or verify feature support, for example GKE control plane access only from the cluster's VPC). `ACCEPTED` but no traffic may mean a recent target service update. Global access creation error: `Private Service Connect global access is not supported for the given forwarding rule, since its producer service does not support consumer global access.`
- Packet-drop metrics: `private_service_connect/consumer/dropped_sent_packets_count` (endpoint exceeded maximum connections; reduce connections, add producer capacity, or ask the producer to assign two NAT IPs per endpoint) and `private_service_connect/consumer/dropped_received_packets_count` (no matching connection for response packets, for example after a timeout).
- If a Service Directory zone must be configured manually, use zone name `NAMESPACE--REGION`, the producer's DNS domain (for example `us-west1.p.example.com.`) and the endpoint's namespace. To register an older endpoint manually, create a namespace, a service named like the forwarding rule, and an endpoint named `default` with the IP and port `443`.
- The source also shows Console steps and some REST variants; the Shared VPC REST requests, the single-region REST forwarding rule, the labeling page and the manual DNS steps are omitted. Full `gcloud compute forwarding-rules` / `addresses` flags are in the `gcp-compute` skill. The producer service's own docs are in `gcp-databases-relational` / `gcp-databases-nosql`.
- Corrected from the official docs: optional flag shown as `[ --service-directory-registration=projects/PROJECT_ID/locations/REGION/namespaces/NAMESPACE ]` was written without the square brackets.
- Source: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-service-connect.md](./private-service-connect.md)
- [about-vpc-hosted-services.md](./about-vpc-hosted-services.md)
- [about-network-attachments.md](./about-network-attachments.md)
- Create a Service Directory DNS zone: https://docs.cloud.google.com/service-directory/docs/configuring-service-directory-zone
