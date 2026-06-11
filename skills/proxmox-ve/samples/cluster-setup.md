# Cluster Setup

Create a Proxmox VE cluster, join nodes, verify quorum, and remove nodes using `pvecm`.

```bash
# --- On the first node: create the cluster ---

# Create a new cluster (name cannot be changed later)
pvecm create my-cluster

# Verify the cluster was created and check quorum
pvecm status

# List current members
pvecm nodes

# --- On each additional node: join the cluster ---

# Join by specifying an IP address of any existing cluster member
pvecm add 10.0.0.1

# If using a dedicated cluster network on a separate interface:
pvecm add 10.0.0.1 --link0 10.10.0.2

# After joining, verify from any node
pvecm status
pvecm nodes

# --- Removing a node ---

# Ensure the node to be removed is powered off or out of the cluster.
# Run from a remaining cluster node:
pvecm delnode oldnode

# If quorum is lost during removal, temporarily lower the expected votes:
pvecm expected 1
pvecm delnode oldnode
```

## Notes

- The cluster name follows the same naming rules as node names and cannot be changed after creation.
- All nodes must have synchronized time (NTP/Chrony) before forming a cluster; drift causes split-brain.
- Corosync requires UDP ports 5405–5412 to be open between all nodes.
- Recommended maximum latency between nodes is under 5 ms; high latency causes quorum instability.
- After `pvecm add`, the new node inherits the cluster configuration from the existing node automatically.
