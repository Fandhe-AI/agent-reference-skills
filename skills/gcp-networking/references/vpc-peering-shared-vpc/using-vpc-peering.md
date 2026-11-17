---
source: https://docs.cloud.google.com/vpc/docs/using-vpc-peering
---

# Set up and manage VPC Network Peering

Create, update, list, inspect and delete VPC Network Peering connections, and troubleshoot missing routes. Peering supports any combination of IPv4-only, dual-stack and IPv6-only subnets. Each network needs its own peering configuration referencing the other.

## Signature / Usage

### Create a default peering configuration

```bash
gcloud compute networks peerings create PEERING_NAME \
    --network=NETWORK \
    --peer-project=PEER_PROJECT_ID \
    --peer-network=PEER_NETWORK_NAME
```

`--peer-project` is optional when the peer network is in the same project. Example peering `network-a` (project-a) with `network-b` (project-b):

```bash
gcloud compute networks peerings create peering-a \
    --network=network-a \
    --peer-project=project-b \
    --peer-network=network-b
```

```bash
gcloud compute networks peerings create peering-b \
    --network=network-b \
    --peer-project=project-a \
    --peer-network=network-a
```

The state becomes `ACTIVE` in both networks (second step is usually done by the peer's network administrator).

### Exchange custom routes / consensus mode

```bash
gcloud compute networks peerings create peering-a \
    --network=network-a \
    --peer-project=project-b \
    --peer-network=network-b \
    --import-custom-routes \
    --export-custom-routes
```

```bash
gcloud compute networks peerings create peering-a \
    --network=network-a \
    --peer-project=project-b \
    --peer-network=network-b \
    --update-strategy=CONSENSUS
```

Repeat on the peer side with the same flags.

### Update a connection (independent mode)

```bash
gcloud compute networks peerings update PEERING_NAME_1 \
    --network=NETWORK_1 \
    --stack-type=IPV4_IPV6
```

Run the same for the peer (`PEERING_NAME_2`, `NETWORK_2`). Switch to consensus mode and check the status:

```bash
gcloud compute networks peerings update PEERING_NAME \
    --network=NETWORK \
    --update-strategy=CONSENSUS
```

```bash
gcloud compute networks describe NETWORK
```

`updateStatus` shows `PENDING_PEER_ACKNOWLEDGMENT` locally and `PENDING_LOCAL_ACKNOWLEDGMENT` on the peer until the peer runs the same update; both then show `IN_SYNC`.

### Update a connection (consensus mode)

```bash
gcloud compute networks peerings update peering-a \
    --network=network-a \
    --export-custom-routes
```

```bash
gcloud compute networks peerings update peering-b \
    --network=network-b \
    --import-custom-routes
```

### List, view, list routes

```bash
gcloud compute networks peerings list
```

```bash
gcloud compute networks describe NETWORK
```

```bash
gcloud compute networks peerings list-routes PEERING_NAME \
    --network=NETWORK \
    --region=REGION \
    --direction=DIRECTION
```

### Delete a connection

Independent mode:

```bash
gcloud compute networks peerings delete PEERING_NAME \
    --network=NETWORK
```

Consensus mode (both sides run `request-delete`, then delete); cancel with `cancel-request-delete`:

```bash
gcloud compute networks peerings request-delete PEERING_NAME \
    --network=NETWORK
```

```bash
gcloud compute networks peerings cancel-request-delete PEERING_NAME \
    --network=NETWORK
```

## Options / Props

### `gcloud compute networks peerings create` / `update` flags

| Flag | Description |
|---|---|
| `--stack-type` | `IPV4_ONLY` (default) or `IPV4_IPV6`; set `IPV4_IPV6` on both sides to exchange IPv6 routes. On update, `IPV4_ONLY` on both sides disables IPv6 exchange. |
| `--import-custom-routes` / `--no-import-custom-routes` | Accept custom routes from the peer (peer must export first). |
| `--export-custom-routes` / `--no-export-custom-routes` | Export custom routes to the peer (peer must import). |
| `--import-subnet-routes-with-public-ip` / `--no-import-subnet-routes-with-public-ip` | Accept subnet routes with privately used public IPv4 addresses (peer must export first). |
| `--export-subnet-routes-with-public-ip` / `--no-export-subnet-routes-with-public-ip` | Export such subnet routes (peer must import). |
| `--update-strategy` | `INDEPENDENT` (default) or `CONSENSUS`; set `CONSENSUS` on both sides. Reset to `INDEPENDENT` to cancel a pending request (update only). |

## Notes

- IAM: `roles/compute.networkAdmin` (Compute Network Admin) on the project, or a custom role with `compute.networks.addPeering`, `compute.networks.updatePeering`, `compute.networks.removePeering`, `compute.networks.listPeeringRoutes`. The Compute Engine API must be enabled.
- `gcloud compute networks peerings create` / `update` flags: `list-routes` placeholders: `REGION` (dynamic routes; subnet and static routes are global), `DIRECTION` is `incoming` (imported) or `outgoing` (exported). Lists are route import candidates and exports; they ignore conflict resolution (use the console Effective routes tab to see what is really imported).
- Delete statuses: Independent: the peer side becomes `INACTIVE`; the peer administrator removes it. Consensus: `deleteStatus` is `LOCAL_DELETE_REQUESTED` / `PEER_DELETE_REQUESTED`, then `DELETE_ACKNOWLEDGED` after both request; cancel gives `LOCAL_CANCEL_REQUESTED` / `PEER_CANCEL_REQUESTED`. While a request is pending only the local network can cancel it; after the peer accepts, either can.
- Only one peering operation at a time across peered networks; otherwise: `Error: There is a peering operation in progress on the local or peer network. Try again later.` You can't list peering requests for your network; ask the peer administrator for the network name and project ID.
- The source also shows Console and Terraform; they are omitted.
- Do not delete a peering connection that is in use. Deleting one used by private services access prevents new private connections; deleting one used by GKE puts the cluster in a repair state with nodes in `UNKNOWN` status. Deleting a peering removes all shared routes and can break connectivity; it is destructive, so try it on a disposable resource first.
- Updates only take effect when the peer exports/imports the complementary setting (import needs peer export). In global dynamic routing mode, IPv6 routes learned from the Cloud Router are still regional.
- Troubleshooting from the source: after `ACTIVE`, traffic flows can take up to a minute; check for firewall rules blocking peer subnet CIDRs. For missing custom routes, confirm the state is `ACTIVE` (`INACTIVE` means the peer has no matching configuration), check the exporting network's dynamic routing mode, show suppressed routes, check the "dynamic routes per region per peering group" quota (request an increase if reached), and remember that peering routes learned from a network's other peers, static routes via the default internet gateway and static routes with network tags can't be exchanged. Use Connectivity Tests for dropped traffic or an unexpected next hop.
- Can't peer with a network: org policy `constraints/compute.restrictVpcPeering` may restrict peers. IPv6 not exchanged: both sides need stack type `IPV4_IPV6`; IPv6 custom routes also need import and export of custom routes. Effective limits for per-peering group quotas change when peers are added or removed.
- Verify traffic with VPC Flow Logs or Firewall Rules Logging on allow/deny rules between the networks.
- Full flag lists are in the `gcp-compute` skill; reference URLs: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/update.
- Source: https://docs.cloud.google.com/vpc/docs/using-vpc-peering (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-peering.md](./vpc-peering.md)
- [about-peering-connections.md](./about-peering-connections.md)
