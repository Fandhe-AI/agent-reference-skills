---
source: https://docs.cloud.google.com/vpc/docs/about-peering-connections
---

# About peering connections

A peering connection links two VPC networks once each side has created a peering configuration that references the other network. The connection mode (independent or consensus) decides how updates and deletions are administered.

## Signature / Usage

### Create a connection in consensus mode (both sides)

```bash
gcloud compute networks peerings create peering-a \
    --network=network-a \
    --peer-project=project-b \
    --peer-network=network-b \
    --update-strategy=CONSENSUS
```

The peer side runs the same command with `peering-b`, `--network=network-b`, `--peer-project=project-a`, `--peer-network=network-a` and `--update-strategy=CONSENSUS`.

### Inspect connection status

```bash
gcloud compute networks describe NETWORK
```

Replace `NETWORK` with the name of the network in your project that is peered.

## Options / Props

### Connection modes

| Mode | Behavior |
|---|---|
| Independent (default) | Either network can update or delete the connection at any time. |
| Consensus | Every update or delete request requires agreement from both networks; prevents unilateral changes. Recommended for critical services where accidental deletion would cause an outage. |

| Connection modes |
|---|
| Both peering configurations must specify the same connection mode when creating a connection. |
| Independent to consensus: update both configurations. Consensus to independent is not supported. |
| `update_strategy` unset on creation means independent mode. For an existing connection, until both sides set `CONSENSUS` the effective strategy remains `INDEPENDENT`. Pending mode-change requests cause no downtime. To cancel a pending request, the requesting network resets the update strategy to `INDEPENDENT`. |

### Complementary flags required in consensus mode

| Local flag | Complementary peer flag |
|---|---|
| `import_custom_route` | `export_custom_route` |
| `export_custom_route` | `import_custom_route` |
| `import_subnet_routes_with_public_ip` | `export_subnet_routes_with_public_ip` |
| `export_subnet_routes_with_public_ip` | `import_subnet_routes_with_public_ip` |
| `stack_type` | `stack_type` |

### Connection status fields (`gcloud compute networks describe`)

| Field | Independent | Consensus | Values |
|---|---|---|---|
| `trafficConfiguration` | Yes | Yes | Effective route exchange options. |
| `updateStrategy` | Yes | Yes | `INDEPENDENT` or `CONSENSUS`. |
| `consensusState.deleteStatus` | No | Yes | `UNSPECIFIED` (field not shown), `LOCAL_DELETE_REQUESTED`, `PEER_DELETE_REQUESTED`, `DELETE_ACKNOWLEDGED` (both requested; `removePeering` succeeds for either), `LOCAL_CANCEL_REQUESTED`, `PEER_CANCEL_REQUESTED` (cancellation after `DELETE_ACKNOWLEDGED`). |
| `consensusState.updateStatus` | No | Yes | `IN_SYNC`, `PENDING_PEER_ACKNOWLEDGMENT` (local changed, peer hasn't), `PENDING_LOCAL_ACKNOWLEDGMENT` (peer changed, local hasn't). |

## Notes

- Complementary flags required in consensus mode: If values don't match, the create/update request is rejected.
- Connection status fields (`gcloud compute networks describe`): The effective connection status is in `peerings.connectionStatus`.
- Peering state is `ACTIVE` in both networks once both configurations exist; it stays `INACTIVE` if the other side has no matching configuration. Creating a peering grants no IAM roles on the other network (for example `roles/compute.networkAdmin` or `roles/compute.securityAdmin` on one network does not apply to the other).
- After establishment, IPv4 subnet routes using private IPv4 ranges are always exchanged.
- Consensus updates: the local admin updates first, the peer makes the complementary change; the effective status doesn't change until then. While an update is pending, neither side can submit another; partial updates are not supported (cancel by resetting each modified parameter). Example: setting `--export-custom-routes` to true requires the peer to set `--import-custom-routes` to true.
- Consensus deletes: both sides must submit a delete request; a deletion can be canceled before or after acceptance. A pending update does not block deletion, but while a deletion request is pending all update requests (including accepting or canceling an update) are rejected; cancel the deletion first.
- Deleting a peering can break connectivity and is destructive; try it on a disposable resource first.
- The code blocks are taken from https://docs.cloud.google.com/vpc/docs/using-vpc-peering (the about page has no code block). The source also shows a diagram.
- Source: https://docs.cloud.google.com/vpc/docs/about-peering-connections (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-peering.md](./vpc-peering.md)
- [using-vpc-peering.md](./using-vpc-peering.md)
