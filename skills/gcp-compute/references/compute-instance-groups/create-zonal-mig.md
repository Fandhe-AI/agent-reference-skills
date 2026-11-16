---
source: https://docs.cloud.google.com/compute/docs/instance-groups/create-zonal-mig
---

# Create a MIG in a single zone (zonal MIG)

A zonal managed instance group (MIG) keeps all its VMs in one zone, which helps minimize latency (useful for example for batch workloads). You must create an instance template first.

## Signature / Usage

### gcloud

Specify the group name, size, instance template and zone.

```bash
gcloud compute instance-groups managed create INSTANCE_GROUP_NAME \
    --size SIZE \
    --template INSTANCE_TEMPLATE_URL \
    --zone ZONE
```

Example with a base VM name (VMs get names like `test-yahs` and `test-qtyz`; three instances):

```bash
gcloud compute instance-groups managed create example-group \
    --base-instance-name test \
    --size 3 \
    --template an-instance-template \
    --zone us-central1-f
```

### REST

Call `instanceGroupManagers.insert` with the group name, size and template URL.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instanceGroupManagers

{
  "versions": [
    {
      "instanceTemplate": "INSTANCE_TEMPLATE_URL"
    }
  ],
  "name": "INSTANCE_GROUP_NAME",
  "targetSize": SIZE
}
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `PROJECT_ID` | Project ID for the request (REST) |
| `INSTANCE_GROUP_NAME` | Name of the instance group |
| `SIZE` | Size of the instance group |
| `ZONE` | A Compute Engine zone. For a regional MIG, replace `zones/ZONE` with `regions/REGION` in REST |
| `INSTANCE_TEMPLATE_URL` | URL of the template; ID or name allowed. Regional template: `projects/PROJECT_ID/regions/REGION/instanceTemplates/INSTANCE_TEMPLATE_ID`. Global template: `INSTANCE_TEMPLATE_ID` |

| Optional | Description |
|----------|-------------|
| `--base-instance-name` (gcloud), `baseInstanceName` field (REST) | Prefix prepended to the random string in each VM name. For specific names, see "Creating instances with specific names in MIGs" |

## Notes

- Required permission: all permissions needed to call `instanceGroupManagers.insert`.
- Console: choose **Create instance group**; select **New managed instance group (stateful)** for a stateful MIG, **Single zone** for Location. For stateless MIGs autoscaling is enabled by default; autohealing is optional. If you select a regional instance template, the Region is selected automatically. Provision enough VMs to cover a zone failure.
- The source also shows Console and Terraform (`google_compute_instance_group_manager`) forms; they are omitted here.
- To determine which managed instances are up and running, see "Checking the status of managed instances" (https://docs.cloud.google.com/compute/docs/instance-groups/getting-info-about-migs#verify_instances).
- Default zonal MIG limit: 1,000 VMs; see the MIG limitations on the creating-groups page (https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances#limitations).
- Corrected from the official docs: the REST section says "You can optionally supply the `base-name` field"; the `InstanceGroupManager` schema has no `base-name` field, and the field is `baseInstanceName` ("The base instance name is a prefix that you want to attach to the names of all VMs in a MIG."), so a request body built with `base-name` would use an unknown field.
- Source (`InstanceGroupManager.baseInstanceName`): Compute Engine API v1 Discovery document https://compute.googleapis.com/$discovery/rest?version=v1, schema `InstanceGroupManager` (retrieved 2026-11-14; REST reference https://docs.cloud.google.com/compute/docs/reference/rest/v1/instanceGroupManagers)
- Source: https://docs.cloud.google.com/compute/docs/instance-groups/create-zonal-mig (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-groups-of-managed-instances.md](./creating-groups-of-managed-instances.md)
- [regional-migs.md](./regional-migs.md)
- [instance-templates.md](./instance-templates.md)
- [working-with-managed-instances.md](./working-with-managed-instances.md)
- Create a regional MIG: https://docs.cloud.google.com/compute/docs/instance-groups/distributing-instances-with-regional-instance-groups
