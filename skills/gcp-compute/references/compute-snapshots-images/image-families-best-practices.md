---
source: https://docs.cloud.google.com/compute/docs/images/image-families-best-practices
---

# Image families best practices

Image families let automation reference the latest version of an OS image by family name while keeping the ability to roll back. Public image families always point to the latest image available in each zone.

## Signature / Usage

### View the latest image globally

```
gcloud compute images describe-from-family IMAGE_FAMILY_NAME  \
   --project=IMAGE_PROJECT
```

Replace `IMAGE_FAMILY_NAME` with the image family and `IMAGE_PROJECT` with the image project (full lists: https://docs.cloud.google.com/compute/docs/images/os-details).

REST equivalent (`images.getFromFamily`):

```
GET https://compute.googleapis.com/compute/v1/projects/IMAGE_PROJECT/global/images/family/IMAGE_FAMILY_NAME
```

### View the latest image for a zone

```
gcloud compute images describe-from-family IMAGE_FAMILY_NAME  \
   --project=IMAGE_PROJECT \
   --zone=ZONE
```

Replace `ZONE` with the zone to query. REST equivalent (`imageFamilyViews`):

```
GET https://compute.googleapis.com/compute/v1/projects/IMAGE_PROJECT/zones/ZONE/imageFamilyViews/IMAGE_FAMILY_NAME
```

### Create a custom image in a family

```
gcloud compute images create my-application-v3-20210101 \
    --source-disk my-application-disk-1 \
    --source-disk-zone us-central1-f \
    --family my-application
```

After this, instances created from the image family `my-application` use `my-application-v3-20210101`.

### Validate in test, then promote to production

Create a test image in the test project from the source family:

```
gcloud compute images create test-image-name \
--source-image-project source-project \
--source-image-family source-image-family \
--project test-project \
--family test-image-family
```

Create a VM from the test family:

```
gcloud compute instances create test-instance-name \
--image-family your-test-image-family \
--project test-project
```

After validation, copy the image to production:

```
gcloud compute images create prod-image-name \
--source-image-family test-image-family \
--source-image-project test-project \
--project prod-project \
--family prod-image-family
```

Replace `test-image-name`, `source-project`, `source-image-family`, `test-project`, `test-image-family`, `test-instance-name`, `prod-image-name`, `prod-project` and `prod-image-family` with your own names.

## Options / Props

| Flag | Effect |
|---|---|
| `--image-family-scope=global` | With `gcloud compute instances create`, use the latest globally available image instead of the latest in the VM's zone |
| `--family` | On `gcloud compute images create`, adds the image to (or creates) a family |

## Notes

- During rollout the latest image in a family can differ between zones (for example `debian-12` in `us-central1-a` vs `southamerica-east1-b`). The gcloud CLI uses the latest image available in the VM's zone; the Google Cloud console shows only images available in the selected zone.
- Image names must be unique, so build pipelines encode app, date and version in names (for example `my-application-v3-20210101`); reference the family (for example `my-application`) in automation.
- Roll back a custom family by deprecating its most recent image, provided the previous image is not deprecated (https://docs.cloud.google.com/compute/docs/images/set-version-custom). Family names follow https://docs.cloud.google.com/compute/docs/naming-resources#resource-name-format.
- Recommendation: the latest image may be incompatible with your application. Test it in a separate environment through a custom image family, verify against your workloads, then move it to production.
- Source inconsistency: the VM-creation command uses `--image-family your-test-image-family`, while the same step says "Using your custom image family `test-image-family`, create a VM" and its placeholder list names only `test-image-family`. Use the family name you passed to `--family` when creating the test image (`test-image-family`); `your-test-image-family` is not created by the previous command.
- The source also shows gcloud and REST authentication setup (`gcloud init`; see `gcp-cli` for gcloud setup).
- Source: https://docs.cloud.google.com/compute/docs/images/image-families-best-practices (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [images.md](./images.md)
- [os-image-lifecycle.md](./os-image-lifecycle.md)
