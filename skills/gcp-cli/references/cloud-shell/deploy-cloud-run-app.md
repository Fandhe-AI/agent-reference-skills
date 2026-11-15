---
source: https://docs.cloud.google.com/shell/docs/deploy-cloud-run-app
---

# Deploy a Cloud Run app by using Cloud Shell

Deploy a sample Hello World application to Cloud Run from the Cloud Shell Editor with Cloud Code, inspect the live service, and view its logs. This page also covers the "Work with Cloud Run" overview.

## Signature / Usage

### Required roles

Ask your administrator to grant you the following IAM roles on your project:

- Cloud Run Admin (`roles/run.admin`)
- Cloud Run Source Developer (`roles/run.sourceDeveloper`)
- Service Account User (`roles/iam.serviceAccountUser`)
- Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`)
- Project IAM Admin (`roles/resourcemanager.projectIamAdmin`)
- Logs Viewer (`roles/logging.viewer`)

### Grant the Cloud Build service account access to your project

Cloud Build automatically uses the Compute Engine default service account as the default Cloud Build service account to build your source code and Cloud Run resource, unless you override this behavior. For Cloud Build to build your sources, grant the Cloud Build service account the Cloud Run Builder (`roles/run.builder`) role on your project:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS \
    --role=roles/run.builder
```

Replace `PROJECT_ID` with your Google Cloud project ID and `SERVICE_ACCOUNT_EMAIL_ADDRESS` with the email address of the Cloud Build service account. If you're using the Compute Engine default service account as the Cloud Build service account, use the following format for the service account email address:

```text
PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

Replace `PROJECT_NUMBER` with your Google Cloud project number. Granting the Cloud Run builder role takes a couple of minutes to propagate.

### Create an application

1. Launch the Cloud Shell Editor (https://ide.cloud.google.com).
2. From the Cloud Code status bar, select **New Application**.
3. Choose **Cloud Run application** as your preferred application type.
4. From the list of sample applications (Node.js, Python with Flask and Django frameworks, Java, Go), choose a Hello World app.
5. Select a folder as your application location and then click **Create New Application**.

### Deploy to Cloud Run

1. Open the command palette (`Ctrl`/`Cmd`+`Shift`+`P` or **View** > **Command Palette**) and run **Deploy to Cloud Run**.
2. If prompted, authorize Cloud Code to make Google Cloud API calls.
3. Set your Google Cloud project.
4. If prompted, enable the Cloud Run API by clicking **Enable APIs**.
5. Select a pre-existing service or create a new one.
6. If creating a new service, choose **Cloud Run (fully managed)** under Deployment Platform.
7. Choose a region to deploy to.
8. For Authentication, select **Allow unauthenticated invocations** to make this a public service.
9. Click **Deploy**. Cloud Code builds your image, pushes it to the registry, and deploys your app to Cloud Run.
10. View your running service by following the URL displayed in the Cloud Run: Deploy dialog.

### Edit your service

Find the `app.py` file that implements the service behavior, change the message "It's running!", run **Deploy to Cloud Run** from the Command Palette again, check the service is selected in Service Settings, and click **Deploy**.

### View logs

Click **Cloud Code**, expand the **Cloud Run** section, right-click your Cloud Run service and click **View logs**; refresh the app and click the Logs refresh button to see new logs.

### Clean up

To delete your project, go to the Projects page in the Google Cloud console, select the project and click **Delete**. If using a pre-existing project: delete the container image in Artifact Registry (you might still be charged for storing it), and delete the Cloud Run service from the Cloud Run page.

### Cloud Run development with Cloud Code (overview)

Cloud Code comes with end-to-end Cloud Run support. Features: support for Go, Node.js, Python, Java, and .NET; run and debug-ready starter services; configuration files with sample applications, snippets, and context-based completions; one-click run from your browser with logging support; watch mode for continuous building; automatic port-forwarding and resource cleanup on service termination; service management; cluster creation with Knative serving enabled. A detailed guide is at https://docs.cloud.google.com/code/docs/shell/cloud-run-overview#working-with-cloud-run.

## Notes

- Distance line: Cloud Run service configuration, deployment options, and `gcloud run` commands belong to the `gcp-run` skill; this page only covers the Cloud Shell Editor workflow. IAM role concepts are in the `gcp-foundation` skill.
- The `cloud-run` page ("Work with Cloud Run", interactive tutorial launched from `ide.cloud.google.com`) is merged here.
- The IAM role granted to the Cloud Build service account is a project-level grant; prefer a dedicated project and delete it afterwards as the page recommends.
- Source: https://docs.cloud.google.com/shell/docs/deploy-cloud-run-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-run

## Related

- [deploy-gke-app.md](./deploy-gke-app.md)
- [editor-overview.md](./editor-overview.md)
- [run-gcloud-commands.md](./run-gcloud-commands.md)
