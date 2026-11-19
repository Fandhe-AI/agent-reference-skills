---
source: https://docs.cloud.google.com/config-connector/docs/concepts/namespaces-and-projects
---

# Namespaces and Google Cloud projects

Config Connector organizes the Google Cloud resources it creates in Kubernetes Namespaces, and uses annotations on a Namespace to decide which project, folder or organization receives them.

## Signature / Usage

Annotate the Namespace, then create a Config Connector resource (for example a `SQLInstance`) in it; Config Connector creates the matching Cloud SQL instance in the annotated project. Replace `NAMESPACE_NAME` with your Namespace name and `my-project` with your project ID.

Adapted (not in the official docs): the example project ID is lowercase (`my-project`), as project IDs require.

```bash
kubectl annotate namespace \
 NAMESPACE_NAME cnrm.cloud.google.com/project-id="my-project"
```

## Notes

- The Namespace annotation is applied only if the resource configuration does not already specify where to create the resource.
- Google Cloud organizes resources at the project, folder and organization levels; add annotations to Config Connector Namespaces to map resources to a project, folder or organization.
- Corrected from the official docs: `cnrm.cloud.google.com/project-id="myProject"`; a project ID contains only lowercase letters, digits and hyphens (see the project ID rules in `gcp-foundation`), so the example uses `my-project`. The source's example `SQLInstance` name `mySQL` is not repeated here because a Kubernetes `metadata.name` must be lowercase.
- Source: https://docs.cloud.google.com/config-connector/docs/concepts/namespaces-and-projects (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [organizing-resources-overview.md](./organizing-resources-overview.md)
- [install-manually.md](./install-manually.md)
