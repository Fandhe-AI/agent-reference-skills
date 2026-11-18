---
source: https://docs.cloud.google.com/application-design-center/docs/setup
---

# Set up Application Design Center

Setup establishes an application management boundary where teams design, share and manage infrastructure. It configures a team space, template catalogs, and a Cloud Storage bucket that stores Terraform code. Use the console to create a new bucket automatically, or the App Design Center API to use your own bucket.

## Signature / Usage

### Create a space with your own bucket (API)

The source describes this API call in prose: call `projects.locations.spaces.create` on the path `projects/PROJECT_ID/locations/LOCATION`, with the bucket name (not the `gs://` URI) in the `gcs_bucket` field. For a single-project boundary `PROJECT_ID` is your project; for a folder-level boundary it is the management project created during application management setup. The call creates the space, sets the bucket as the storage location, enables the required APIs and completes setup.

The gcloud equivalent below is based on the gcloud 593.0.0 help example; the help also lists `--display-name`, `--description` and `--enable-gcp-shared-templates`.

Adapted (not in the official docs): `--gcs-bucket=BUCKET_NAME` is added to the help example so the space uses your existing bucket (bucket name, not a `gs://` URI).

```bash
gcloud design-center spaces create my-space --project=my-project \
    --location=us-central1 --gcs-bucket=BUCKET_NAME
```

## Options / Props

### Storage bucket options

| Option | How |
|---|---|
| Automatically create a new bucket | Perform the setup in the console |
| Use an existing bucket | Complete setup using the App Design Center API |

Existing bucket requirements: you can use APIs; the bucket is in the same management project where you set up ADC; you hold `storage.buckets.get` and `storage.objects.create` on the bucket.

### Application management boundary

| Feature | Single-project boundary (Preview) | Folder-level boundary |
|---|---|---|
| Flexibility | Setup with default settings | Name your space, choose whether to disable Google-provided templates, create additional spaces after setup |
| Integrated products | App Design Center, App Hub, Application Monitoring | App Design Center, App Hub, Cloud Hub, Gemini Cloud Assist, Application Monitoring |
| Enabling application management | Your project becomes the management project | A new management project is created in the folder |

### Required roles

| Task | Required roles |
|---|---|
| Single-project initial setup | Project Owner (`roles/owner`), or both Application Design Center Admin (`roles/designcenter.admin`) and Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) |
| Folder-level initial setup | Both Application Design Center Admin (`roles/designcenter.admin`) and Application Admin (`roles/designcenter.applicationAdmin`) |

## Notes

- Adapted from the gcloud 593.0.0 help: its example has no `--gcs-bucket`; the help describes `--gcs-bucket=GCS_BUCKET` as an existing bucket used instead of creating a new one, which must exist in the same project as the space. Without the flag a default bucket is created.
- Single-project prerequisites: project has a linked billing account; required roles; application management is enabled automatically by console setup (for API setup, enable application management on the project via App Hub single-project setup). Console setup enables the APIs and creates the storage bucket and the `default-space` space.
- Folder-level prerequisites: an organization resource; roles to enable application management; configure a folder for application management; link a billing account to the management project; configure the observability scope for the management project. Console setup requires a space name (cannot be edited later); clearing "Enable Google opinionated templates" leaves only components and templates you import or create.
- To store deployed resources, create standard projects in your organization (single-project) or in the app-enabled folder (folder-level).
- Console steps are summarized only; the source also shows console click paths.
- Source: https://docs.cloud.google.com/application-design-center/docs/setup (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/create (gcloud 593.0.0 help).

## Related

- [overview.md](./overview.md)
- [manage-spaces.md](./manage-spaces.md)
- [manage-catalogs.md](./manage-catalogs.md)
