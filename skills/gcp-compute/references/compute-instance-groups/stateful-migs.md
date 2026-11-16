---
source: https://docs.cloud.google.com/compute/docs/instance-groups/stateful-migs
---

# Stateful MIGs

A stateful managed instance group preserves each instance's unique state (instance name, attached persistent disks, IP addresses and metadata) on VM restart, recreation, autohealing and update, so that stateful workloads such as databases, legacy monoliths and checkpointed batch jobs can use autohealing, multi-zone deployments and automated rolling updates.

## Signature / Usage

### Recreate a stateful instance (state is preserved)

Snippet taken from https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (the source has no code):

Adapted (not in the official docs): the optional `[--region REGION | --zone ZONE]` template bracket (a shell glob in zsh, and not runnable as written) was replaced by `--zone ZONE`; use `--region REGION` instead for a regional MIG.

```bash
gcloud compute instance-groups managed recreate-instances INSTANCE_GROUP_NAME \
    --instances INSTANCE_NAME_1,INSTANCE_NAME_2 \
    --zone ZONE
```

## Options / Props

### Stateful vs stateless MIG

| | Stateful MIG | Stateless MIG |
|---|---|---|
| Workload | Disks, IP addresses and/or metadata preserved on VM recreate | Highly available, scalable stateless workloads; disks and IPs recreated from scratch on scaling, autohealing, auto-updating and recreation |
| MIG features | Autohealing, automated rolling updates, multi-zone deployments | Autohealing, automated rolling updates, multi-zone deployments, autoscaling |
| Preservable items | Instance names; persistent disks (including disks not defined in the template); instance-specific metadata; IP addresses | Instance names |

All MIGs support custom and preservable instance names.

### Stateful configuration

| Part | Scope | Notes |
|------|-------|-------|
| Stateful policy | All instances in the MIG | Every item must be defined in the instance template. Add or remove disks and network interface (IP address) configuration |
| Per-instance configuration | One specific managed instance | Instance-specific disks (including existing disks not in the template), metadata key-value pairs, IP addresses. Instance-specific metadata and disks need not be in the template; network interfaces for stateful IPs must be |

A MIG is stateful if it has a non-empty stateful policy or one or more non-empty per-instance configurations. You can set it at creation or convert a stateless group later. The MIG applies the stateful policy automatically to new and existing instances; per-instance configurations can be applied manually or automatically.

### Worked example (from the source)

- Template: `n2-standard-2`, boot disk (device name `boot-disk`, Debian GNU/Linux image), additional disk with device name `data-disk` from a custom image, metadata `app:example-stateful-app` and `version:1.0`.
- Stateful policy: device name `data-disk`. Per-instance config for `node-1`: existing disk `my-legacy-1` (device name `legacy-disk`) and metadata `node-id:xyz273`.
- On recreate of `node-1`: boot disk `boot-node-1` is deleted and recreated (stateless); `data-disk-1` and `my-legacy-1` are detached and reattached; `node-id:xyz273` plus the template metadata are set again.

## Notes

- Your workload must start automatically on VM boot so it can continue after autohealing, auto-updating and recreation.
- Names only: MIGs preserve instance names on recreation and autohealing by default. For proactive rolling updates to preserve names, set the updater replacement method to `RECREATE`.
- Limitations referenced on the creating-groups page: no autoscaling or scaling schedules with stateful configuration; automated rolling updates need replacement method `RECREATE`; stateful regional MIGs must disable proactive redistribution (type `NONE`). Per-instance IP configurations are not supported for Dynamic Network Interfaces.
- Resilience to zonal failure requires application-level data replication (for example Elasticsearch, Cassandra) plus a regional MIG.
- Deleting or abandoning instances, or shrinking the MIG, can affect preserved states; deleting instances deletes their preserved state configuration. This is destructive; try on a disposable MIG first.
- Consider managed services first: Cloud SQL (MySQL / PostgreSQL), Dataflow or Managed Service for Apache Spark instead of self-managed VMs (see `gcp-databases-relational` for Cloud SQL).
- Feedback address given in the source: mig-discuss@google.com.
- Adapted from the official docs: `[--region REGION | --zone ZONE]` in the recreate-instances command was changed to `--zone ZONE` (`--region REGION` for a regional MIG).
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances (limitations; retrieved 2026-11-17; CC BY 4.0)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/working-with-managed-instances (snippet; retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/stateful-migs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [updating-migs.md](./updating-migs.md)
- [regional-migs.md](./regional-migs.md)
- [about-repair.md](./about-repair.md)
- [working-with-managed-instances.md](./working-with-managed-instances.md)
- Configuring stateful MIGs: https://docs.cloud.google.com/compute/docs/instance-groups/configuring-stateful-migs
- How stateful MIGs work: https://docs.cloud.google.com/compute/docs/instance-groups/how-stateful-migs-work
