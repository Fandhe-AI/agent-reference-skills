---
source: https://docs.cloud.google.com/build/docs/private-pools/run-builds-in-private-pool
---

# Run builds in a private pool

Select a private pool for a build either in the build config file (`options.pool.name`) or with `--worker-pool` on `gcloud builds submit`. Builds can be submitted from the project that owns the pool or from a different project, subject to IAM.

## Signature / Usage

### Set the default project for builds from another project

```bash
gcloud config set project BUILD_ORIGIN_PROJECT_ID
```

### Grant WorkerPool User to a trigger's service account (cross-project triggers)

```bash
gcloud projects add-iam-policy-binding PRIVATEPOOL_PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT \
    --role=roles/cloudbuild.workerPoolUser
```

### Specify the private pool in the build config file

```yaml
steps:
- name: 'bash'
  args: ['echo', 'I am running in a private pool!']
options:
  pool:
    name: 'projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID'
```

### Specify the private pool in the gcloud command

Build config file without a `pool` option:

```yaml
steps:
- name: 'bash'
  args: ['echo', 'I am running in a private pool!']
```

Adapted (not in the official docs): added the `\` continuation between `--config=CONFIG_FILE` and `--worker-pool=...`; the source put them on two lines without it, which runs two separate commands.

```bash
gcloud builds submit --config=CONFIG_FILE \
  --worker-pool=projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

## Options / Props

### IAM permissions

| Scenario | Requirement |
|---|---|
| Run builds via the gcloud CLI or the Cloud Build API | Grant the **WorkerPool User** role in the private pool project to the user or service account that requests the build |
| Automated builds with triggers, trigger project same as the pool project | No permissions need to be granted |
| Automated builds with triggers, trigger project different from the pool project | Grant the **WorkerPool User** role (`roles/cloudbuild.workerPoolUser`) to the service account used with the trigger, on the project where the private pool lives |

### Placeholders

| Name | Meaning |
|---|---|
| `PRIVATEPOOL_PROJECT_ID` | Project where the private pool is located |
| `REGION` | Region where the pool was created |
| `PRIVATEPOOL_ID` | Pool ID specified when the pool was created |
| `CONFIG_FILE` | Path to your build config file |
| `SERVICE_ACCOUNT` | Email of the service account used with the trigger executing the build |
| `BUILD_ORIGIN_PROJECT_ID` | Project where builds originate |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/run-builds-in-private-pool (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Before you begin: create a private pool (see create-manage-private-pools.md) and install gcloud (`gcloud components update`). You can use the same project for the pool and the builds, or different projects.
- The `gcloud projects add-iam-policy-binding` command grants `roles/cloudbuild.workerPoolUser` on the whole private pool project, so the service account can use every private pool in that project. Grant it only to the service account a trigger uses.
- Run the build config through `gcloud` / API (https://docs.cloud.google.com/build/docs/running-builds/start-build-manually) or through triggers (https://docs.cloud.google.com/build/docs/running-builds/automate-builds). For on-premises source hosts, Cloud Build provides trigger support for external systems such as GitHub Enterprise and Bitbucket Server.
- The private pool's region is the region where the build runs (see private-pools-overview.md).
- Adapted from the official docs: the source `gcloud builds submit --config=CONFIG_FILE` and `--worker-pool=...` were on two lines with no `\` continuation.
- The source also shows Console steps for the IAM grant and the JSON form of the build configs (the JSON form of the second config contained a trailing comma and was omitted).

## Related

- [create-manage-private-pools.md](./create-manage-private-pools.md)
- [private-pools-overview.md](./private-pools-overview.md)
- [configure-user-specified-service-accounts.md](./configure-user-specified-service-accounts.md)
