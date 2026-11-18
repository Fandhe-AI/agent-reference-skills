---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/compliancescanning
---

# Compliance Scanning IAM roles and permissions

## Signature / Usage

Predefined roles of `compliancescanning` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)

- Gives Compliance Scanning the access it needs to analyze containers and VMs for compliance and create occurrences using the Container Analysis API > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (52): `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `compute.globalOperations.get`, `compute.images.get`, `compute.images.list`, `compute.images.useReadOnly`, `compute.instances.get`, `compute.instances.getGuestAttributes`, `compute.instances.list`, `compute.regionOperations.get`, `compute.zoneOperations.get`, `compute.zones.get`, `compute.zones.list`, `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.list`, `containeranalysis.notes.update`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storage.objects.get`, `storage.objects.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/compliancescanning.serviceAgent
```

## Notes

- Roles and permissions of the `compliancescanning` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/compliancescanning (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
