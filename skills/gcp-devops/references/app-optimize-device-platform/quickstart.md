---
source: https://docs.cloud.google.com/developer-device-platform/quickstart
---

# Quickstart: prepare for Developer Device Platform

Set up a project to use the Developer Device Platform (DDP), a remote device orchestration service. It works on any workstation with a terminal and internet access, and assumes an existing Google Cloud project and account. Status: Preview.

## Signature / Usage

### Try the device catalog

List all devices in the project:

```bash
gcloud beta device-run devices list
```

Filter by operating system (Android):

```bash
gcloud beta device-run devices list --filter="PLATFORM=ANDROID"
```

Filter by operating system (iOS):

```bash
gcloud beta device-run devices list --filter="PLATFORM=iOS"
```

List sessions in the project (likely none at first):

```bash
gcloud beta device-run sessions list
```

## Options / Props

### Required roles

Ask an administrator to grant these IAM roles on the project:

| Role | Role ID |
|---|---|
| Roles Viewer (basic role) | `roles/viewer` |
| Device Run Admin | `roles/devicerun.admin` |
| Device Streaming Admin | `roles/devicestreaming.admin` |
| Service Usage Consumer | `roles/serviceusage.serviceUsageConsumer` |

## Notes

- Status: Preview. During Preview the Device Streaming API requires the Cloud Testing API to be enabled.
- Custom roles or other predefined roles can also provide the permissions.
- Support: the DDP Developer Forum (discuss.google.dev) and the Google Issue Tracker are named for help, bugs and feature requests. Agent skills are in the `google/skills` GitHub repository (https://github.com/google/skills/tree/main/skills/cloud/developer-device-platform-basics).
- Clean up: to avoid charges, delete the Google Cloud project with the resources; try this on a disposable project.
- Firebase Test Lab users: the source links a migration guide, a command and flag translation page and a migration skill for AI agents.
- Source: https://docs.cloud.google.com/developer-device-platform/quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [device-platform-overview.md](./device-platform-overview.md)
- [device-run.md](./device-run.md)
- [share-storage.md](./share-storage.md)
