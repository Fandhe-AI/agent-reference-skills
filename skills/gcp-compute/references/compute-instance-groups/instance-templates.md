---
source: https://docs.cloud.google.com/compute/docs/instance-templates
---

# Instance templates

An instance template saves a VM's configuration (machine type, boot disk image, labels, startup script and other VM properties). You can use it to create individual VMs, VMs in a managed instance group (MIG), or reservations for VMs. A MIG must be created from an instance template.

## Signature / Usage

### Specify an instance template by URL

Depending on the interface, you may need the full or partial URL of the template. You can specify either the ID or the name; Google recommends the ID because, unlike names, IDs can't be reused.

Full URL:

```text
https://www.googleapis.com/compute/v1/projects/example-project/regions/us-central1/instanceTemplates/1234567890
```

Partial URL:

```text
projects/example-project/regions/us-central1/instanceTemplates/1234567890
```

## Options / Props

### Regional vs global instance templates

Unless you need to reuse a template across multiple regions, Google recommends regional instance templates over global ones.

| | Regional instance template | Global instance template |
|---|---|---|
| Scope | Usable only in the template's region | Usable in any region |
| Reliability | Hardware errors are isolated to the template's region | Hardware errors can impact any region where the template is used |
| Use case | Reduce cross-region dependency; achieve data residency in a region (for example compliance on physical location of data) | Reuse one template to create VMs, MIGs and reservations across multiple regions |

## Notes

- Instance templates can't be updated after creation. Instead, create a new template (from an existing VM or from an existing template), or create VMs while overriding the template's properties.
- Zonal resources in a template restrict its use to that zone; a regional resource in a global template restricts it to that region. Example from the source: a read-only Persistent Disk from `us-central1-a` means the template can't be used in any other zone.
- Deterministic instance templates (explicit versions in startup scripts, custom images) keep every VM identical; see deterministic-instance-templates.md.
- No additional charge for instance templates; you pay for the resources created from them. See the Compute Engine pricing page (https://cloud.google.com/compute/all-pricing).
- The two URL strings above are the only code-like content on the source page; each is copied from its "How to specify instance templates" section (separate bullets).
- Source: https://docs.cloud.google.com/compute/docs/instance-templates (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [deterministic-instance-templates.md](./deterministic-instance-templates.md)
- [instance-groups.md](./instance-groups.md)
- [creating-groups-of-managed-instances.md](./creating-groups-of-managed-instances.md)
- Create instance templates: https://docs.cloud.google.com/compute/docs/instance-templates/create-instance-templates
