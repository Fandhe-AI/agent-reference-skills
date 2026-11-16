---
source: https://docs.cloud.google.com/compute/docs/instance-groups/updating-migs
---

# Apply new VM configurations in a MIG (updating MIGs)

A MIG's VM configuration comes from a required instance template, an optional all-instances configuration and an optional stateful configuration. Updated configuration is applied automatically to new VMs; to apply it to existing VMs use an automatic (proactive) rollout, a selective (opportunistic) update, or VM re-creation.

## Signature / Usage

### Set the update type (gcloud)

Use `rolling-action start-update` with `--type` set to `opportunistic` or `proactive`.

```bash
gcloud compute instance-groups managed rolling-action start-update INSTANCE_GROUP_NAME \
    --version=template=NEW_TEMPLATE \
    --type=TYPE
```

Or use `update` with `--update-policy-type`.

```bash
gcloud compute instance-groups managed update INSTANCE_GROUP_NAME \
    --update-policy-type=TYPE
```

### Set the update type (REST)

Call `patch` on a zonal (`instanceGroupManagers`) or regional (`regionInstanceGroupManagers`) MIG. For a zonal MIG replace `regions/REGION` with `zones/ZONE`; `TYPE` is `OPPORTUNISTIC` or `PROACTIVE`.

Adapted (not in the official docs): removed the `# Choose an opportunistic or proactive update` comment and the trailing comma after the `instanceTemplate` entry, because JSON allows neither and the body would be rejected; `TYPE` is described above.

```http
PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceGroupManagers/INSTANCE_GROUP_NAME

{
  "updatePolicy": {
    "type": "TYPE"
  },
  "versions": [{
    "instanceTemplate": "global/instanceTemplates/NEW_TEMPLATE"
  }]
}
```

### Check the update policy

```bash
gcloud compute instance-groups managed describe INSTANCE_GROUP_NAME \
    --format="(updatePolicy)"
```

```http
GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceGroupManagers/INSTANCE_GROUP_NAME
```

### `versions` vs `instanceTemplate` in `update()` / `patch()` requests

Both fields equal and different from the current template: valid, the template is applied.

```json
{
 "instanceTemplate": "global/instanceTemplates/NEW_TEMPLATE",
 "versions": [
  {
   "instanceTemplate": "global/instanceTemplates/NEW_TEMPLATE"
  }
 ],
 "updatePolicy": {
   "type": "PROACTIVE"
 }
}
```

Values differ but only one differs from the current template: valid, the changed field wins.

```json
{
 "instanceTemplate": "global/instanceTemplates/CURRENT_TEMPLATE",
 "versions": [
  {
   "instanceTemplate": "global/instanceTemplates/NEW_TEMPLATE"
  }
 ],
 "updatePolicy": {
   "type": "PROACTIVE"
 }
}
```

Both differ from the current template (for example `instanceTemplate` is `NEW_TEMPLATE` and `versions[0].instanceTemplate` is `A_DIFFERENT_NEW_TEMPLATE`): invalid, returns an error (no clear intent).

## Options / Props

### VM configuration components

| Component | Properties | Use |
|-----------|-----------|-----|
| Instance template | Machine type, boot disk image, labels, startup script, network interfaces, other VM properties | Required. A second template can be added to canary test a second configuration on a subset of VMs |
| All-instances configuration | Labels and metadata | Optional. Overrides instance template properties for all VMs |
| Stateful configuration | Stateful disks, IP addresses, metadata | Optional. For stateful workloads |

### Methods to apply a configuration to existing VMs

| Method | Update type | Description |
|--------|-------------|-------------|
| Automatic | `proactive` | MIG applies updates to all or a subset of VMs automatically (speed, disruption and scope per the update policy; supports canary updates) |
| Selective | `opportunistic` | Applies only when you target specific VMs (or all at once via gcloud / REST) |
| Re-creation | n/a | Re-create specific VMs; applies any not-yet-applied configuration |

### Suspended and stopped VMs

- Selective updates treat suspended / stopped VMs like running ones.
- Proactive updates process running, suspended and stopped VMs first, then VMs in `SUSPENDING` / `STOPPING`. Max surge and max unavailable are computed from the target number of running VMs only (standby pool not counted).
- If replacement is needed: delete suspended / stopped VMs, create new VMs from the new template, run initialization, then suspend / stop. If only refresh or restart is needed: resume / start, update, initialize, then suspend / stop.
- Canary updates: in the `manual` standby policy mode only running VMs are updated (suspended / stopped stay on previous versions); in `scale-out-pool` mode you cannot start a canary update.

### Required permissions (set update type)

| MIG type | Permissions |
|----------|-------------|
| Zonal | All permissions to call `instanceGroupManagers.patch` |
| Regional | All permissions to call `regionInstanceGroupManagers.patch` |

## Notes

- Replace `INSTANCE_GROUP_NAME` (group name), `NEW_TEMPLATE` (new template name), `TYPE` (`opportunistic` or `proactive` in gcloud; `OPPORTUNISTIC` or `PROACTIVE` in REST), `PROJECT_ID`, `REGION`.
- The `PATCH` bodies use `OPPORTUNISTIC` / `PROACTIVE` as `updatePolicy.type`; the uppercase REST value is confirmed by the `"type": "PROACTIVE"` blocks in the `versions` section of the same page.
- Corrected from the official docs: the REST `PATCH` block contained `"type": "TYPE" # Choose an opportunistic or proactive update` and a trailing comma after `"instanceTemplate": "global/instanceTemplates/NEW_TEMPLATE",`; both were removed (Adapted line above).
- Prefer `versions`; the legacy top-level `instanceTemplate` overlaps with it, and only `versions` supports a two-template (canary) configuration. Using both can be ambiguous. `get()` returns both fields when one template is specified; with two templates in `versions`, the top-level `instanceTemplate` is returned empty.
- `setInstanceTemplate()` overrides `versions` and also sets `updatePolicy` to `OPPORTUNISTIC`.
- With `opportunistic` and without update on repair, a failed VM is repaired with the configuration it was created with, even if that template no longer exists. An autoscaler scaling in terminates VMs with the old configuration first.
- Recreating VMs is destructive for non-stateful disks; try on a disposable group first.
- The third `versions` / `instanceTemplate` JSON example of the source (both fields differ from the current template, which is an error) is omitted to keep the page short and described in prose above; the duplicate REST `PATCH` block was also dropped.
- The source also shows the Console steps (Edit > Update policy > Selective or Automatic).
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/updating-migs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [stateful-migs.md](./stateful-migs.md)
- [working-with-managed-instances.md](./working-with-managed-instances.md)
- [about-repair.md](./about-repair.md)
- [instance-templates.md](./instance-templates.md)
- Automatic rollouts: https://docs.cloud.google.com/compute/docs/instance-groups/rolling-out-updates-to-managed-instance-groups
- Selective updates: https://docs.cloud.google.com/compute/docs/instance-groups/updating-selected-instances-in-a-mig
