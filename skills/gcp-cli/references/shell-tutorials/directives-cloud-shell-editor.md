---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-cloud-shell-editor
---

# Cloud Shell Editor directives

Walkthrough directives that open files, select text, and spotlight UI elements in Cloud Shell Editor.

## Signature / Usage

### Open file

Creates a link that opens a file on the Cloud Shell disk in the editor.

```text
<walkthrough-editor-open-file filePath="FILE_PATH">LINK_TEXT</walkthrough-editor-open-file>
```

### Open file with text selected

Creates a link that opens a file in the editor and selects lines of text within it.

```text
<walkthrough-editor-select-line filePath="FILE_PATH" startLine="START_LINE" endLine="END_LINE">LINK_TEXT</walkthrough-editor-select-line>
```

### Open file with text selected by regular expression

Creates a link that opens a file in Cloud Shell Editor and selects text based on a regular expression. Only the first match in the file is selected.

```text
<walkthrough-editor-select-regex filePath="FILE_PATH" regex="REGEX">LINK_TEXT</walkthrough-editor-select-regex>
```

### Spotlight pointers

Creates a link that highlights the specified UI element in the editor.

```text
<walkthrough-editor-spotlight spotlightId="SPOTLIGHT_ID">LINK_TEXT</walkthrough-editor-spotlight>

<walkthrough-editor-spotlight cssSelector="CSS_SELECTOR">LINK_TEXT</walkthrough-editor-spotlight>
```

Two ways to spotlight an element:

- Spotlight ID: using the `spotlightId` parameter, specify a DOM element's `spotlight-id` property value.
- CSS selector: for elements without a spotlight ID, use the `cssSelector` parameter with a CSS selector.

Only one of these parameters is required. If both are provided, `spotlightId` is used.

## Options / Props

`walkthrough-editor-open-file` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `filePath` | String | A file path relative to the workspace open in Cloud Shell. |

`walkthrough-editor-select-line` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `filePath` | String | A file path relative to the workspace open in Cloud Shell. |
| `startLine` | Integer | The file line where the selection starts. Unlike the code editor, the line count starts from `0`. |
| `endLine` | Integer | The file line where the selection ends. The selection ends at the beginning of this line. Unlike the code editor, the line count starts from `0`. |
| `startCharacterOffset` | Integer | The character number in the `startLine` to start the selection from. |
| `endCharacterOffset` | Integer | The number of characters after the `endLine` position to select. |

`walkthrough-editor-select-regex` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `filePath` | String | A file path relative to the workspace open in Cloud Shell. |
| `regex` | String | A regular expression to match. Multi-line is on. |

`walkthrough-editor-spotlight` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `spotlightId` | String | An element's spotlight ID. |
| `cssSelector` | — | Listed in the usage above; the source parameter table gives no type or description for it. |
| `spotlightItem` | String | Required when `spotlightId` is set to `navigator`. The expected value is a file path relative to the workspace open in Cloud Shell. |

The `spotlightId` parameter only accepts the following values:

| Group | Spotlight ID | Highlighted element |
| --- | --- | --- |
| Activity bar | `activity-bar-cloud-apis` | The Cloud API activity bar icon. |
| Activity bar | `activity-bar-cloud-k8s` | The Cloud Kubernetes activity bar icon. |
| Activity bar | `activity-bar-cloud-run` | The Cloud Run activity bar icon. |
| Activity bar | `activity-bar-debug` | The Debug activity bar icon. |
| Activity bar | `activity-bar-scm` | The Source Control activity bar icon. |
| Activity bar | `activity-bar-search` | The Search activity bar icon. |
| Cloud Code | `cloud-code-gke-explorer` | Cloud Code Kubernetes Explorer > **Google Kubernetes Engine** section. |
| Cloud Code | `cloud-code-k8s-explorer` | Cloud Code Kubernetes Explorer > **Kubernetes** section. |
| Cloud Code | `cloud-code-k8s-explorer-minikube ` | Cloud Code Kubernetes Explorer > **minikube cluster** (if it exists). |
| Cloud Code | `cloud-code-logs-viewer-cluster` | Logs viewer > **Cluster** filter. |
| Cloud Code | `cloud-code-logs-viewer-container` | Logs viewer > **Container** filter. |
| Cloud Code | `cloud-code-logs-viewer-deployment` | Logs viewer > **Deployment** filter. |
| Cloud Code | `cloud-code-logs-viewer-namespace` | Logs viewer > **Namespace** filter. |
| Cloud Code | `cloud-code-logs-viewer-pod` | Logs viewer > **Pod** filter. |
| Cloud Code | `cloud-code-logs-viewer-refresh` | Logs viewer > **Refresh** button. |
| Cloud Code | `cloud-code-logs-viewer-stream-toggle` | Logs viewer > **Streaming** toggle. |
| Cloud Code | `cloud-code-new-app` | Cloud Code quick access > **New Application**. |
| Cloud Code | `cloud-code-debug-on-k8s` | Cloud Code quick access > **Debug on Kubernetes**. |
| Cloud Code | `cloud-code-run-on-k8s` | Cloud Code quick access > **Run on Kubernetes**. |
| Cloud Code | `cloud-code-open-welcome-page` | Cloud Code quick access > **Open Welcome Page**. |
| Cloud Code | `cloud-code-cloud-run-deploy` | Cloud Code quick access > **Deploy to Cloud Run**. |
| Cloud Code | `cloud-code-run-on-cloud-run-emulator` | Cloud Code quick access > **Run on Cloud Run Emulator**. |
| Menus | `menu-edit` | The **Edit** menu. |
| Menus | `menu-file` | The **File** menu. |
| Menus | `menu-terminal` | The **Terminal** menu. |
| Menus | `menu-terminal-new-terminal` | **Terminal** menu > **New Terminal.** |
| Status bar | `cloud-code-status-bar` | The Cloud Code status bar menu button. |
| Status bar | `minikube-status-bar` | The minikube status bar menu button. |
| Other elements | `debug-configuration` | Debug view > configuration dropdown menu. |
| Other elements | `file-explorer` | The file explorer. |
| Other elements | `navigator` | A file in the Cloud Code file explorer. Must be paired with the `spotlightItem` parameter. |
| Other elements | `output` | The **Output** log. |

## Notes

- The source table groups IDs under header rows (Activity bar, Cloud Code, Menus, Status bar, Other elements); they are shown here as a Group column.
- The source lists `cloud-code-k8s-explorer-minikube ` with a trailing space inside the backticks; kept as in the source.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-cloud-shell-editor (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [directives-spotlights.md](./directives-spotlights.md)
- [writing-tutorials.md](./writing-tutorials.md)
