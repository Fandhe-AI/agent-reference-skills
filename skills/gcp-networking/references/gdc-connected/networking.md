---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/networking
---

# Networking features of Distributed Cloud connected

Networking features of Google Distributed Cloud connected: enabling the Distributed Cloud Edge Network API, configuring networks and subnetworks, cluster network isolation, island mode, MetalLB-based Layer 2 load balancing and the `ClusterDNS` resource.

## Signature / Usage

### Enable the Distributed Cloud Edge Network API

Distributed Cloud connected servers ship with the API already enabled.

```bash
gcloud services enable edgenetwork.googleapis.com
```

### Configure island mode on a Pod secondary network

Add the `networking.gke.io/gdce-pod-cidr` annotation to the `Network` custom resource and apply it to the cluster. `type` must be `L3` and `IPAMMode` must be `Internal`.

```yaml
apiVersion: networking.gke.io/v1
kind: Network
metadata:
  name: my-network
  annotations:
    # Enable island mode and specify the isolated address range.
    networking.gke.io/gdce-pod-cidr: 172.15.10.32/27
    # Specify the VLAN ID for this secondary network.
    networking.gke.io/gdce-vlan-id: "561"
    # Specify the CIDR block for load balancer services on this network.
    networking.gke.io/gdce-lb-service-vip-cidrs: 172.20.5.180/30
spec:
  # Network type must be L3 for island mode.
  type: L3
  # IPAMMode must be Internal for island mode.
  IPAMMode: Internal
  nodeInterfaceMatcher:
    interfaceName: gdcenet0.561 # The name for the target network interface.
  gateway4: 172.20.5.177 # Gateway IP address; must be unique in this CR.
  externalDHCP4: false
  dnsConfig:
    nameservers:
    - 8.8.8.8
```

Verify with a test Pod, then read its IP address (it must fall inside the isolated range):

Adapted (not in the official docs): the Pod's `network` is `my-network`, the name of the Network resource above; the source's test Pod refers to `test-network-vlan561`, which is the name used only in the source's later sample output.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: island-pod-tester
  annotations:
    networking.gke.io/interfaces: '[{"interfaceName":"eth1","network":"my-network"}]'
    networking.gke.io/default-interface: "eth1"
spec:
  containers:
  - name: sample-container
    image: busybox
    command: ["/bin/sh", "-c", "sleep 3600"]
```

```bash
kubectl get pod island-pod-tester -o wide
```

### Island mode with the `ClusterIP` service

Add `networking.gke.io/gke-gateway-clusterip-cidr` to the `Network` resource; ranges in the resource must not overlap.

```yaml
apiVersion: networking.gke.io/v1
kind: Network
metadata:
  annotations:
    networking.gke.io/gdce-lb-service-vip-cidrs: 172.20.5.180/30
    networking.gke.io/gdce-pod-cidr: 172.15.10.32/27
    networking.gke.io/gdce-vlan-id: "561"
    networking.gke.io/gke-gateway-clusterip-cidr: 10.20.1.0/28
  name: test-network-vlan561
spec:
  IPAMMode: Internal
  dnsConfig:
    nameservers:
    - 8.8.8.8
  externalDHCP4: false
  gateway4: 172.20.5.177
  nodeInterfaceMatcher:
    interfaceName: gdcenet0.561
  type: L3
```

### Load balancer VIP address pools

In the `gcloud alpha` track, pass a YAML or JSON file to `--external-lb-address-pools` when you create the cluster (the GA `clusters create` command takes `--external-lb-ipv4-address-pools` with a comma-delimited list of ranges or CIDR blocks instead):

```yaml
addressPools:
- name: foo
  addresses:
  - 10.2.0.212-10.2.0.221
  - fd12::4:101-fd12::4:110
  avoid_buggy_ips: true
  manual_assign: false

- name: bar
  addresses:
  - 10.2.0.202-10.2.0.203
  - fd12::4:101-fd12::4:102
  avoid_buggy_ips: true
  manual_assign: false
```

## Options / Props

### Network configuration steps

1. Optional: initialize the network configuration of the target zone (one-time, immediately after hardware installation; creates a network named `default` with basic uplink connectivity).
2. Create a network.
3. Create one or more subnetworks (at least one is required for nodes to access the network; each subnetwork's VLAN is automatically available to all nodes in the zone).
4. Test: check the network's operational status and each subnetwork's provisioning status.
5. Connect Pods with the Network Function operator (not available to virtual machine workloads).

Limitations on Distributed Cloud connected servers: you can only configure subnetworks, and subnetworks only support VLAN IDs (CIDR-based subnetworks are not supported).

### Load balancing

| Item | Detail |
|---|---|
| Solution | Bundled network load balancing based on MetalLB in Layer 2 mode, exposing services through virtual IP addresses (VIPs). |
| VIP subnetwork | Specified by the network administrator when ordering; shared among all clusters in the zone. |
| Reserved addresses | The first (network ID), second (default gateway) and last (broadcast) addresses of the subnetwork are reserved; do not assign them to address pools. |
| Per cluster | Each cluster must use a separate VIP range inside the configured VIP subnetwork. |
| Node pools | Nodes in a node pool share a Layer 2 domain and are MetalLB load balancer nodes. |

Address pool payload fields:

| Field | Description |
|---|---|
| `name` | Descriptive name that uniquely identifies the pool. |
| `addresses` | List of IPv4 addresses, ranges and subnetworks in the pool. |
| `avoid_buggy_ips` | Excludes IP addresses that end with `.0` or `.255`. |
| `manual_assign` | Lets you assign addresses from the pool manually in the target `LoadBalancer` service instead of by the MetalLB controller. |

### Island mode address constraints

The isolated range must not collide with: the primary VLAN CIDR of any network in the cluster; the Load Balancer VIP range in the `networking.gke.io/gdce-lb-service-vip-cidrs` annotation; the island-mode ranges of other networks in the cluster.

## Notes

- Cluster network isolation: nodes in a network-isolated cluster cannot communicate with any other nodes in the same zone. Enable it with `--enable-cluster-isolation` when creating or modifying a cluster.
- `ClusterDNS`: the Google Distributed Cloud `ClusterDNS` resource configures upstream name servers for specific domains through `spec.domains`.
- Command-line forms for creating networks and subnetworks, and the cluster `--external-lb-address-pools` flag, are on the networks, subnetworks and clusters pages of this category. The source also shows a Console form for enabling the API.
- Source inconsistency: the address pool field `addresses` is described as "a list of IPv4 addresses, address ranges, and subnetworks", but the example payload in the same page uses IPv6 ranges (`fd12::4:101-fd12::4:110`). The clusters page of this category also describes `IPV4_DATA_PLANE_ADDRESSES` as IPv4 only; confirm the supported address family before using IPv6 ranges.
- Corrected from the official docs: the source creates the island-mode Network as `metadata.name: my-network` but its test Pod annotation uses `"network":"test-network-vlan561"` (the name in the later `kubectl get` sample output), so applying the two examples in order would not attach the Pod to the created network; the Pod here uses `my-network`.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/networking (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [networks.md](./networks.md)
- [subnetworks.md](./subnetworks.md)
- [clusters.md](./clusters.md)
- [how-it-works.md](./how-it-works.md)
