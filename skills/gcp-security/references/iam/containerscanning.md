---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/containerscanning
---

# Container Scanning IAM roles and permissions

## Signature / Usage

Predefined roles of `containerscanning` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)

- Gives Container Scanner the access it needs to analyze containers for vulnerabilities and create occurrences using the Container Analysis API > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (42): `artifactregistry.attachments.get`, `artifactregistry.attachments.list`, `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.projectconfigs.get`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.exportArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.rules.get`, `artifactregistry.rules.list`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `containeranalysis.notes.list`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storage.objects.get`, `storage.objects.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/containerscanning.ServiceAgent
```

## Notes

- Roles and permissions of the `containerscanning` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/containerscanning (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
