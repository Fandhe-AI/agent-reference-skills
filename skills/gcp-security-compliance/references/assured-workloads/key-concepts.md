---
source: https://docs.cloud.google.com/assured-workloads/docs/key-concepts
---

# Key concepts

An Assured Workloads folder is the top-level regulatory boundary for workloads; depending on the control package, Assured Workloads can also create a key management project inside it to hold CMEK keys.

## Signature / Usage

### Describe an Assured Workloads folder

The page has no code block, so this is the help's example for describing a workload (folder) in the `us-central1` region, in organization `123`, with workload ID `456`.

```bash
gcloud assured workloads describe \
    organizations/123/locations/us-central1/workloads/456
```

## Options / Props

| Concept | Description |
|---|---|
| Assured Workloads folder | Configured with, and actively enforcing, the controls of the selected control package. It is the container for the projects and resources that must meet those requirements, and is constantly monitored for compliance. |
| Parent folder pattern | Make the top-level folder an Assured Workloads folder to have all child folders, projects and resources inherit its controls through the resource hierarchy. |
| Key management project | Created inside the folder for some control packages to store CMEK keys; one project for keys and another for resources establishes separation of duties between security administrators and developers. |

## Notes

- Example from the source: to meet IL4, create an Assured Workloads folder for IL4, then create or migrate projects and resources into it; projects inside are configured to enforce IL4 and you are notified when resources fall out of compliance.
- Any Assured Workloads environment created before Assured Workloads folders were introduced is still supported; migrating to folders is recommended where possible but not required.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/describe (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/assured-workloads/docs/key-concepts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [control-packages.md](./control-packages.md)
- [migrate-workload.md](./migrate-workload.md)
- [monitor-folder.md](./monitor-folder.md)
