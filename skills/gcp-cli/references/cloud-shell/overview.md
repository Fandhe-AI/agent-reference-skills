---
source: https://docs.cloud.google.com/shell/docs/how-to
---

# Cloud Shell documentation overview

Landing-page map of the Cloud Shell documentation: getting started, Cloud Shell Editor, terminal, configuration, tutorials, reset, resources, APIs, and support channels.

## Signature / Usage

### Get started with Cloud Shell

- Launch Cloud Shell: options for launching a Cloud Shell session ([launching-cloud-shell.md](./launching-cloud-shell.md))
- Use Cloud Shell: start a Cloud Shell session and understand essential functions ([using-cloud-shell.md](./using-cloud-shell.md))
- Authorize with Cloud Shell: how to authorize tools in Cloud Shell ([auth.md](./auth.md))
- Manage files with Cloud Shell: upload and download files and folders ([uploading-and-downloading-files.md](./uploading-and-downloading-files.md))
- Preview web apps: run web applications on the Cloud Shell virtual machine instance and preview them from the Google Cloud console ([using-web-preview.md](./using-web-preview.md))

### Use the Cloud Shell Editor

- Launch the Cloud Shell Editor ([launching-cloud-shell-editor.md](./launching-cloud-shell-editor.md))
- Cloud Shell Editor interface overview ([editor-overview.md](./editor-overview.md))
- Get started with Cloud Code: Cloud Code functionality available through Cloud Shell (merged here, see Notes)
- Work with Kubernetes: Cloud Code support for developing and deploying a Kubernetes application ([deploy-gke-app.md](./deploy-gke-app.md))
- Work with Cloud Run: Cloud Code support for developing and running a Cloud Run service ([deploy-cloud-run-app.md](./deploy-cloud-run-app.md))
- Migrate an application: migrate your app from the Cloud Shell Editor to your local IDE ([migrate-to-local.md](./migrate-to-local.md))
- Use version control with Cloud Shell Editor ([version-control.md](./version-control.md))
- Workspace management with Cloud Shell Editor ([workspaces.md](./workspaces.md))
- Debug with the Cloud Shell Editor ([editor-overview.md](./editor-overview.md))
- Customize your Cloud Shell Editor themes ([themes.md](./themes.md))

### Get started with the Cloud Shell terminal

- Use the Cloud Shell terminal ([use-cloud-shell-terminal.md](./use-cloud-shell-terminal.md))

### Configure and customize Cloud Shell experiences

- Use Cloud Shell accessibility features ([using-cloud-shell-accessibility-features.md](./using-cloud-shell-accessibility-features.md))
- Configure Cloud Shell ([configuring-cloud-shell.md](./configuring-cloud-shell.md))
- Use the `cloudshell` command ([using-cloudshell-command.md](./using-cloudshell-command.md))
- Use Cloud Shell with the Google Cloud CLI ([using-cloud-shell-with-gcloud-cli.md](./using-cloud-shell-with-gcloud-cli.md))
- Open in Cloud Shell repositories ([open-in-cloud-shell.md](./open-in-cloud-shell.md))

### Disable or reset

- Disable or reset Cloud Shell ([resetting-cloud-shell.md](./resetting-cloud-shell.md))

### Concepts

- How Cloud Shell works ([how-cloud-shell-works.md](./how-cloud-shell-works.md))
- Limitations: known limitations for Cloud Shell (https://docs.cloud.google.com/shell/docs/limitations)

### Quickstarts

- Deploy a GKE app ([deploy-gke-app.md](./deploy-gke-app.md))
- Deploy a Cloud Run service (https://docs.cloud.google.com/shell/docs/deploying-a-cloud-run-service; see [deploy-cloud-run-app.md](./deploy-cloud-run-app.md))
- Run gcloud commands with Cloud Shell ([run-gcloud-commands.md](./run-gcloud-commands.md))

### Resources

- Pricing: https://docs.cloud.google.com/shell/pricing
- Quotas and limits: https://docs.cloud.google.com/shell/quotas ([quotas-limits.md](./quotas-limits.md))
- Cloud Shell release notes: https://docs.cloud.google.com/shell/docs/release-notes
- Get support (see Getting support below)
- Cloud Shell SLA: https://docs.cloud.google.com/shell/sla

### APIs

Author Cloud Shell tutorials with the Markdown reference and directives guide, or start, configure, and connect to interactive shell sessions running in the Cloud with these Cloud Shell APIs.

- Cloud Shell REST reference: https://docs.cloud.google.com/shell/docs/reference/rest
- Cloud Shell RPC reference: https://docs.cloud.google.com/shell/docs/reference/rpc
- Cloud Shell Markdown reference for authoring tutorials: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/markdown-extensions

### Getting support

- Get a Google support package: Google Cloud offers different support packages to meet different needs, such as 24/7 coverage, phone support, and access to a technical support manager. See Cloud Customer Care (https://docs.cloud.google.com/support).
- Ask a question on Stack Overflow with the tag `google-cloud-shell`; the tag also receives responses from Google engineers, who offer unofficial support (http://stackoverflow.com/questions/tagged/google-cloud-shell).
- Discuss Cloud Shell in the Google Cloud Slack community (https://googlecloud-community.slack.com/), channel `#cloud-shell`.
- File bugs or feature requests: from the Cloud Shell documentation, click either **Send feedback** link on the page. Your comments are reviewed by the Cloud Shell team.

### Cloud Code in Cloud Shell

Cloud Code comes with end-to-end Kubernetes and Cloud Run support: create a new application from samples, customize and develop it, then deploy or run and preview it, with run-ready samples, out-of-the-box configuration snippets, and a tailored debugging experience. Both interactive tutorials are launched from `ide.cloud.google.com` walkthrough URLs (see [deploy-gke-app.md](./deploy-gke-app.md) and [deploy-cloud-run-app.md](./deploy-cloud-run-app.md)).

Snippet taken from https://docs.cloud.google.com/shell/docs/launching-cloud-shell-editor:

```bash
cloudshell edit .
```

## Notes

- This page merges the landing pages `how-to`, `concepts`, `resources`, `apis`, `quickstart`, `getting-started-with-cloud-code` and the `getting-support` page; none contains code or reference detail of its own.
- Targets not covered by a page in this directory (`limitations`, `tutorials`, `release-notes`, `reference/*`, `pricing`, `sla`) are listed as plain URLs. The Cloud Shell REST API (`cloudshell.googleapis.com`) is documented elsewhere.
- Authoring tutorials is covered by the `shell-tutorials` category of this skill, not by this directory.
- Source: https://docs.cloud.google.com/shell/docs/how-to (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/concepts
- Source: https://docs.cloud.google.com/shell/docs/resources
- Source: https://docs.cloud.google.com/shell/docs/apis
- Source: https://docs.cloud.google.com/shell/docs/quickstart
- Source: https://docs.cloud.google.com/shell/docs/getting-started-with-cloud-code
- Source: https://docs.cloud.google.com/shell/docs/getting-support

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [using-cloud-shell.md](./using-cloud-shell.md)
- [quotas-limits.md](./quotas-limits.md)
