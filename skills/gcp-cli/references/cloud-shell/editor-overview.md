---
source: https://docs.cloud.google.com/shell/docs/editor-overview
---

# Cloud Shell Editor interface overview

Cloud Shell Editor lets you develop, build, and debug Google Cloud applications directly in your browser using an IDE interface, with integrated source control, language tooling, and access to the Cloud Shell terminal. This page also covers debugging with the editor.

## Signature / Usage

### View and edit files

The Cloud Shell Editor is available by default with every Cloud Shell instance, and is based on Code OSS (https://github.com/microsoft/vscode).

1. Launch the Cloud Shell Editor by clicking **Open Editor** on the toolbar of the Cloud Shell window. The editor opens above the Cloud Shell terminal window. You can also launch it by navigating to ide.cloud.google.com.
2. Use the side bar on the left to browse the file directories. Use the editor groups on the right to view and edit your files.
3. Use the activity bar on the left to toggle the editor and the Cloud Shell window, upload and download files, preview web applications on a Cloud Shell virtual machine instance, and view usage statistics.

### Open a file in Cloud Shell Editor

To open an existing file in Cloud Shell Editor from Cloud Shell, run the `cloudshell` command:

```bash
cloudshell edit README-cloudshell.txt
```

### Upload and download files

To download a file from your Cloud Shell Editor project to your local machine, in the Explorer right-click the file and select **Download**. To upload a file, right-click the empty space in the Explorer pane and select **Upload**.

### Activity bar

To open the Cloud Shell Editor views, click **Cloud Code** in the activity bar. From the Cloud Code view you can expand:

- Development Sessions: monitor your Kubernetes applications with a structured logging view.
- Kubernetes: monitor and manage your GKE and minikube resources.
- Cloud Run: monitor and manage your Cloud Run resources.
- Cloud APIs: browse and enable Cloud APIs and add Cloud Client Libraries to your project.
- Secret Manager: manage secrets in Secret Manager.
- Help and feedback: links to open walkthroughs, view documentation, change settings, report issues or request features, view release notes, or sign out of Google Cloud.

The activity bar also includes: **Explorer** (folders and files in your workspace), **Search** (string or regular expression), **Source Control** (Git support), and **Debug** (breakpoints and variables).

### Language support

The Cloud Shell Editor supports Go, Python, Java, .NET Core, and Node.js, providing smart highlighting, code suggestions, and context-based completions; linting and descriptive errors; code navigation (go to definitions, declarations, references, and implementations); and debugging support.

### Cloud Code integration

The Cloud Shell Editor comes with Cloud Code support, providing IDE support for the full development cycle of Kubernetes and Cloud Run applications (Node.js, Python, Java, Go, and .NET Core), from creating an application from a sample to running it, with run-ready samples, out-of-the-box configuration snippets, and a tailored debugging experience. Cloud Code commands are available from the Cloud Code menu in the status bar and the command palette (`Cmd`/`Ctrl`+`Shift`+`P` or **View** > **Command Palette**).

Google Cloud Data Agent Kit is integrated with Cloud Code, letting you manage data science and data engineering workloads in Cloud Shell: click the **Google Cloud Data Agent Kit** icon in the Cloud Shell activity bar.

### Built-in terminal

Access your underlying Cloud Shell instance without leaving the editor by navigating to **Terminal** > **New Terminal**. You can also run multiple terminal windows by using the **Split Terminal** option.

### Debug with Cloud Shell Editor

Debugging support is available for Go, Node.js, Python, Java, and Ruby applications. You skip manual setup such as configuring port forwarding or injecting language-specific debug arguments, and can create launch configurations, set breakpoints, and inspect variables, all in the editor.

- Debug actions: click **Debug** in the Activity bar. Sample applications come with a `launch.json` file needed to run and debug your application; if your application doesn't have one, you're prompted in the Debug View to create one. In the Debug View click **Start**; when prompted, choose the context to run your app in and, if applicable, the image registry to use. During a session use the action icons: Pause, Step over, Step in, Step out, Restart, Stop.
- Set breakpoints: click in the editor margin next to the line you want to break at. Red circles are active breakpoints and gray circles are inactive breakpoints. If a breakpoint can't be registered with the debugger when a session starts, it changes to a gray-outlined hollow circle. While paused, inspect the Variables panel in the Debug View.
- Kubernetes: you can debug Kubernetes applications on a local cluster (like minikube or Docker Desktop) or a remote cluster on GKE or any other cloud provider, and attach a debugger to a Kubernetes pod (see the official guide https://docs.cloud.google.com/code/docs/shell/debug).

## Notes

- Version control and workspace management are described in [version-control.md](./version-control.md) and [workspaces.md](./workspaces.md). The `debugging` page is merged here because it contains no code of its own.
- The official pages list different debugging languages: the `debugging` page says "Go, Node.js, Python, Java, and Ruby", while the editor overview says "full debugging support for Go, Node.js, Python, and Java applications". Both are kept as written.
- Distance line: Cloud Code in Cloud Shell Editor is covered here only as far as the editor; Cloud Run service deployment details belong to the `gcp-run` skill and GKE to the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/shell/docs/editor-overview (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/debugging (retrieved 2026-11-14)

## Related

- [launching-cloud-shell-editor.md](./launching-cloud-shell-editor.md)
- [using-cloudshell-command.md](./using-cloudshell-command.md)
- [themes.md](./themes.md)
- [version-control.md](./version-control.md)
- [workspaces.md](./workspaces.md)
- [deploy-gke-app.md](./deploy-gke-app.md)
- [deploy-cloud-run-app.md](./deploy-cloud-run-app.md)
