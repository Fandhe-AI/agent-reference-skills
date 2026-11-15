---
source: https://docs.cloud.google.com/workstations/docs/overview
---

# Cloud Workstations overview

Cloud Workstations provides managed development environments on Google Cloud with built-in security and preconfigured yet customizable environments. Developers reach workstations through a browser-based IDE, local code editors (VSCode, JetBrains IDEs such as IntelliJ IDEA Ultimate and PyCharm Professional), or SSH.

## Signature / Usage

### Resources

- **Workstation clusters**: a group of workstations in a particular region and the VPC network they are attached to. Not related to Google Kubernetes Engine (GKE) clusters.
- **Workstation configurations**: templates for workstations (VM instance type, persistent storage, container image, IDE or code editor). IAM rules grant access to teams or individual developers.
- **Workstations**: preconfigured development environments (cloud IDE, language tooling, libraries) that start and stop on demand and run on Compute Engine VMs in your project, with a persistent disk for data between sessions.

Administrators and platform teams create workstation configurations; each developer creates a workstation from a configuration.

### Optional step referenced from the setup pages

Snippet taken from https://docs.cloud.google.com/workstations/docs/architecture (Image streaming requirement, enables faster startup):

```bash
gcloud services enable containerfilesystem.googleapis.com
```

## Notes

- Distance line: Cloud Workstations is a managed cloud development environment (VM + container per developer), distinct from Cloud Shell, which is covered by the `gcp-cli` skill.
- Lifecycle: workstations run on ephemeral Compute Engine VMs. An *idle timeout* or *running timeout* in the workstation configuration shuts workstations down when unused (reducing cost) and makes each workstation pick up the latest configuration when it restarts. The source gives no default values for these on this page.
- Persistent storage: when a workstation stops, its ephemeral VM and all runtime data are deleted. An optional persistent home directory (a persistent disk attached at session start, detached at session end) keeps data between sessions.
- DNS: every workstation has a unique hostname; all workstations in a cluster share a cluster-specific domain, and the cluster routes requests to the running workstation.
- Configuration updates apply the next time each workstation restarts (for example a changed machine type).
- Gemini Code Assist is available in the Base Editor (Code OSS for Cloud Workstations); Gemini cites sources when suggestions quote a source at length.
- The source also shows no `gcloud workstations` command on this page; the `gcloud services enable` snippet above is borrowed from the architecture page.
- Source: https://docs.cloud.google.com/workstations/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [architecture.md](./architecture.md)
- [create-cluster.md](./create-cluster.md)
- [create-configuration.md](./create-configuration.md)
- [quickstart-set-up-workstations-console.md](./quickstart-set-up-workstations-console.md)
