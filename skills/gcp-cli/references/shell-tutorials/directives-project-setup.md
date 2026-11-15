---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-project-setup
---

# Project setup directives

Walkthrough directives for selecting a project, showing project details, and enabling APIs.

## Signature / Usage

### Project selection

Inserts an interactive widget that helps the user to create or select a project to use for the tutorial.

```text
<walkthrough-project-setup></walkthrough-project-setup>
```

### Project details

The following directives insert Google Cloud details related to the currently selected project.

| Directive | Description |
| --- | --- |
| `<walkthrough-project-id/>` | The user's current project ID. |
| `<walkthrough-project-name/>` | The user's project name. |

### Enable APIs

Inserts a button that enables Google Cloud APIs for the current project. The tutorial must be running in Google Cloud console for this to work.

```text
<walkthrough-enable-apis apis="API_LIST"></walkthrough-enable-apis>
```

You must specify an API's service name to enable it. To explore the available APIs, visit the API Library (https://console.cloud.google.com/apis/library). To discover a service name, set a project in Cloud Shell and run:

```bash
gcloud services list --available | grep API_NAME
```

## Options / Props

`walkthrough-project-setup` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `billing` | Boolean | *(Optional)* If the value is set to `true`, prompt a user to enable billing for projects where a billing account is missing. |

`walkthrough-enable-apis` parameters:

| Parameter | Description |
| --- | --- |
| `apis` | Comma-separated list of API service names to enable. |

## Notes

- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-project-setup (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [directives-cloud-shell-open.md](./directives-cloud-shell-open.md)
- [writing-tutorials.md](./writing-tutorials.md)
