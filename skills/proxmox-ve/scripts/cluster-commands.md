# Cluster Commands

Commands for managing Proxmox VE clusters via `pvecm`, high availability via `ha-manager`, and storage replication via `pvesr`.

---

## pvecm — Cluster Manager

## Show cluster status

```sh
pvecm status
```

## List cluster nodes

```sh
pvecm nodes
```

## Create a new cluster

```sh
pvecm create <clustername>
```

Optional: `--link0 <address>`, `--nodeid <id>`, `--votes <n>`.

## Add current node to an existing cluster

```sh
pvecm add <hostname>
```

Optional: `--fingerprint <fp>`, `--link0 <address>`, `--nodeid <id>`, `--force 1`.

> **警告**: Joining a cluster merges the node's configuration with the cluster. Existing local VMs and containers may be affected. Ensure the node is cleanly prepared before joining.

## Remove a node from the cluster

> **警告**: Removes the node from the cluster configuration. Ensure the node is offline and all VMs/CTs have been migrated away before removal.

```sh
pvecm delnode <node>
```

## Set expected vote count (quorum recovery)

> **警告**: Used for quorum recovery only. Setting an incorrect expected vote count can result in a split-brain situation.

```sh
pvecm expected <expected>
```

## Generate a cryptographic key for corosync

```sh
pvecm keygen <filename>
```

## Update node certificates

```sh
pvecm updatecerts
```

Optional: `--force 1`, `--silent 1`.

## Get cluster join API version

```sh
pvecm apiver
```

## Set up an external QDevice for quorum

```sh
pvecm qdevice setup <address>
```

Optional: `--force 1`, `--network <network>`.

## Remove a configured QDevice

```sh
pvecm qdevice remove
```

---

## ha-manager — High Availability

## Show HA cluster and resource status

```sh
ha-manager status
```

## List all HA-managed resources

```sh
ha-manager config
```

Optional: `--type <ct|vm>` to filter by type.

## Add a resource to HA management

```sh
ha-manager add <sid>
```

`<sid>` format: `vm:<vmid>` or `ct:<vmid>`. Common options: `--state <started|stopped|enabled|disabled>`, `--max_restart <n>`, `--max_relocate <n>`.

## Update an HA resource configuration

```sh
ha-manager set <sid> [OPTIONS]
```

## Remove a resource from HA management

```sh
ha-manager remove <sid>
```

Optional: `--purge 1` to also remove from HA rules.

## Migrate an HA resource online to another node

```sh
ha-manager crm-command migrate <sid> <node>
```

## Relocate an HA resource to another node (stop + restart)

```sh
ha-manager crm-command relocate <sid> <node>
```

## Request HA to stop a resource

```sh
ha-manager crm-command stop <sid> <timeout>
```

`<timeout>` in seconds; use `0` for a hard stop.

## Enable node maintenance mode

```sh
ha-manager crm-command node-maintenance enable <node>
```

## Disable node maintenance mode

```sh
ha-manager crm-command node-maintenance disable <node>
```

## Disarm the HA stack

> **警告**: Disarming HA prevents automatic recovery of resources. Use only during planned maintenance.

```sh
ha-manager crm-command disarm-ha <resource-mode>
```

`<resource-mode>`: `freeze` or `ignore`.

## Re-enable (arm) the HA stack

```sh
ha-manager crm-command arm-ha
```

## Add an HA rule (node-affinity or resource-affinity)

```sh
ha-manager rules add <type> <rule> --resources <resource-list>
```

## List HA rules

```sh
ha-manager rules config
```

Optional: `--type <type>`.

## Update an HA rule

```sh
ha-manager rules set <type> <rule> [OPTIONS]
```

## Remove an HA rule

```sh
ha-manager rules remove <rule>
```

## Shortcut: migrate an HA resource

```sh
ha-manager migrate <sid> <node>
```

## Shortcut: relocate an HA resource

```sh
ha-manager relocate <sid> <node>
```

---

## pvesr — Storage Replication

## List all replication jobs

```sh
pvesr list
```

## Show replication job status on current node

```sh
pvesr status
```

## Read a specific replication job configuration

```sh
pvesr read <id>
```

## Create a new local replication job

```sh
pvesr create-local-job <id> <target-node>
```

`<id>` format: `<vmid>-<jobnum>` (e.g., `100-0`). Common options: `--schedule <cronspec>`, `--rate <mbps>`, `--comment <text>`.

## Update a replication job

```sh
pvesr update <id> [OPTIONS]
```

Options include `--schedule`, `--rate`, `--comment`, `--disable 1`.

## Enable a replication job

```sh
pvesr enable <id>
```

## Disable a replication job

```sh
pvesr disable <id>
```

## Delete a replication job

```sh
pvesr delete <id>
```

## Trigger immediate replication

```sh
pvesr schedule-now <id>
```
