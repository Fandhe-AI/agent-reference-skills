---
source: https://docs.cloud.google.com/shell/docs/deploy-gke-app
---

# Create and deploy a containerized web app

Create a containerized web app using the Cloud Shell Editor, test it locally in minikube, and then deploy it to a Google Kubernetes Engine (GKE) cluster. This page also covers the "Work with Kubernetes" overview.

## Signature / Usage

### Create your web app

1. Launch the Cloud Shell Editor (https://ide.cloud.google.com).
2. If prompted to authorize Cloud Code to use your credentials to make a Google Cloud API call, click **Authorize**.
3. Launch the **Cloud Code** menu from the status bar and select **New Application**.
4. Select **Kubernetes application**, then **Go:Hello World**.
5. Select a folder for your app location and click **Create New Application**.

### Test your app in a local cluster

Open a terminal (**Terminal** > **New Terminal**) and start your local minikube cluster:

```bash
minikube start
```

It might take a minute to set up the minikube cluster. If prompted to authorize Cloud Shell to make Cloud API calls, click **Authorize**. After your cluster is set up, a message similar to the following appears:

```console
Done! kubectl is now configured to
use "minikube" cluster...
```

Then, from the Cloud Code menu select **Run on Kubernetes**, confirm the current minikube context, monitor progress in the **Development sessions** view, and open the app via **Port Forward URLs** > **service** > **go-hello-world-external** > **Open URL**.

### Edit your app

The app consists of a basic `go-hello-world` web app (`main.go`) that returns a templated "It's running!" response, and a load balancer `go-hello-world-external` service (`hello.service.yaml`) that exposes the app as a Kubernetes Service. Modify `main.go` to print "It's redeployed!"; the file saves automatically and rebuilds.

### View app logs

Open the command palette and run **Cloud Code: View Logs**, specify the **Deployment** filters to view the logs for `go-hello-world`, reload the app page, and click **Refresh** in the Log Viewer.

### Create a Google Kubernetes Engine cluster

1. Click **Cloud Code**, expand the **Kubernetes** section.
2. Click **Add a Cluster to the KubeConfig** and then **Google Kubernetes Engine** in the Quick pick menu.
3. When prompted to enable `container.googleapis.com`, click **Yes**.
4. Click **+ Create a New GKE Cluster** and choose **Standard** as the cluster type.
5. Click **Open** to permit Cloud Shell to open the Google Cloud console.
6. In Google Cloud console, use the project you created, set the zone to `us-central1-a`, and set the cluster name to `my-first-cluster`.
7. Click **Create**; cluster creation takes a few minutes. Then click **Refresh** in the Quick pick menu and click the new cluster name to add it to the configuration and make it the active context.

### Deploy your app to a GKE cluster

From the Cloud Code menu select **Run on Kubernetes**, confirm your newly created cluster as the context, confirm the default image registry option, monitor progress in **Development sessions**, and open the app from **Port Forward URLs** > **service** > **go-hello-world-external** > **Open URL**.

### Cleaning up

To delete just the cluster, hold the pointer over your cluster name, click **Open in Google Cloud console**, then **Delete**. To delete your project (and all associated resources, including clusters): on the Projects page in the Google Cloud console select the project, click **Delete**, type the project ID and click **Shut down**.

### Kubernetes development with Cloud Code (overview)

Cloud Code comes with end-to-end Kubernetes support: support for Go, Node.js, Python, Java, and .NET; run and debug-ready starter applications; configuration files with samples, snippets, and completions; one-click deploy; watch mode for continuous building; automatic port-forwarding and resource cleanup; debugging and logging for applications on Kubernetes clusters; cluster creation and management; support for minikube. Details: https://docs.cloud.google.com/code/docs/shell/k8s-overview#working-with-kubernetes.

## Notes

- Distance line: GKE cluster operations beyond this Cloud Shell Editor workflow belong to the future `gcp-gke` skill; Cloud Run deploys to the `gcp-run` skill.
- The `kubernetes` page ("Work with Kubernetes", interactive tutorial launched from `ide.cloud.google.com`) is merged here.
- The page recommends creating a project (instead of selecting an existing one) if you don't plan to keep the resources, so you can delete the project afterwards.
- Source: https://docs.cloud.google.com/shell/docs/deploy-gke-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/kubernetes

## Related

- [deploy-cloud-run-app.md](./deploy-cloud-run-app.md)
- [editor-overview.md](./editor-overview.md)
- [version-control.md](./version-control.md)
