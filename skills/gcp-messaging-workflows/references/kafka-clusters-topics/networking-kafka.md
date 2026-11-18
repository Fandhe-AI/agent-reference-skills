---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/networking-kafka
---

# Configure Networking for Managed Service for Apache Kafka

Clients connect to a cluster from any VPC network containing a connected subnet, from other projects (connected subnets or Shared VPC), or over the public internet from allowed IP ranges. Brokers live in a Google-managed tenant network; the service creates Private Service Connect endpoints and DNS entries in your VPC networks.

## Signature / Usage

### Grant the service agent access to a subnet in another project

Grant the Managed Kafka service agent of the cluster's project the Managed Kafka Service Agent role on the project that contains the subnet (principal format `service-CLUSTER_PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com`).

```bash
gcloud projects add-iam-policy-binding CLIENT_PROJECT_ID \
  --member=serviceAccount:service-CLUSTER_PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com \
  --role=roles/managedkafka.serviceAgent
```

### Subnet sizing

```text
number of brokers = max(3, ceiling(vCPUs / 15))
```

Example: 60 vCPUs gives four brokers (60/15) and needs at least five usable IP addresses including the bootstrap address.

## Options / Props

### Network limits

| Limit | Value |
|-------|-------|
| Subnet region | Connected subnets must be in the same region as the cluster. |
| Subnet count | Minimum 1, maximum 10 per cluster. |
| Subnets per network | At most one subnet per VPC network. |
| Subnet size | One IP address per broker plus one for the bootstrap address; minimum four usable IP addresses. Allocate 3x the calculated minimum because Google might change the broker-to-vCPU ratio. |
| Public clusters | Still require at least one connected subnet (no traffic needs to flow through it). |
| Allowed source IP ranges | IPv4 CIDR only; each between `/16` and `/32`; no overlap; no IPv6; maximum 500. |
| Discovery DNS records | Maximum 30 IP addresses each; one record for 29 or fewer brokers (includes the bootstrap address record), one more per additional 30 brokers. For FQDN-based egress firewalls only; never point Kafka clients at them. |
| Firewall ports | TCP `9092` (SASL) and `9192` (mTLS). |

### Cross-project options

| Method | Requirement |
|--------|-------------|
| Connect a subnet from the client's project | Grant the cluster's Managed Kafka service agent `roles/managedkafka.serviceAgent` on the subnet's project. |
| Shared VPC | Create the cluster, provision Shared VPC, grant the service agent the Managed Kafka Service Agent role on the Shared VPC host project, connect the cluster to a subnet in the Shared VPC network. Clients in the host or service projects can connect. |

## Notes

- Subnets can be added or removed by updating the cluster. DNS names for bootstrap and brokers are the same across all connected subnets (different IPs) and are fixed for the cluster's lifetime; get the bootstrap address from the cluster view.
- If you use Kafka Connect, also consider the Connect cluster's worker (primary) subnet requirements.
- Subnets with privately used public IP ranges work without extra configuration; the range must be valid IPv4 and not a prohibited range.
- Public access uses split-horizon DNS: clients in VPCs with a connected subnet keep resolving private endpoints; other networks resolve public IPv4 endpoints. Cloud Next Generation Firewall restricts public access. All connections still require TLS and authentication (IAM identity with SASL, or a client certificate with mTLS); anonymous access isn't allowed.
- Removing allowed source IP ranges applies only to new connections. Turning the public cluster feature off and on assigns a new set of external IPv4 addresses; scaling up can add addresses, so automate consumption of the discovery records.
- Caution from the source: allow access from only trusted external IP ranges; don't expose your cluster to untrusted ranges.
- Security administrators can prohibit public clusters with the managed constraint `constraints/managedkafka.managed.restrictPublicClusters` ("Restrict Managed Kafka Public Clusters").
- Architecture: one bootstrap IP/URL in the tenant network (a load balancer connected to all brokers); per consumer network the service creates a Private Service Connect endpoint for the bootstrap address and one per broker. Brokers use the default Kafka port 9092.
- This grant is a project-level role binding on the subnet's project, as the source shows; grant it only on the projects whose subnets you connect.
- Networking itself (VPC, Private Service Connect, Cloud DNS, Cloud NGFW, Shared VPC) is covered by `gcp-networking`; Organization Policy by `gcp-foundation`.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- The source also shows Console steps for the IAM grant.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/networking-kafka (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cluster.md](./create-cluster.md)
- [plan-cluster-size.md](./plan-cluster-size.md)
- [overview.md](./overview.md)
