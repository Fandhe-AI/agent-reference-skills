---
source: https://docs.cloud.google.com/service-extensions/docs/create-plugin
---

# Create a plugin

Create a Service Extensions plugin resource that points to a Wasm module in Artifact Registry. The feature is in Preview for Media CDN, where the Google Cloud console isn't supported.

## Signature / Usage

### Enable APIs

```bash
gcloud services enable networkservices.googleapis.com
```

For Media CDN plugins with logging enabled, also enable the Network Actions API:

```bash
gcloud services enable networkactions.googleapis.com
```

### Create a plugin

Adapted (not in the official docs): `...-docker.pkg.dev` replaced by `REGION-docker.pkg.dev` because `...` is not a valid placeholder.

```bash
gcloud service-extensions wasm-plugins create my-plugin \
    --description="This is my plugin." \
    --log-config=enable=true,sample-rate=0.5,min-log-level=INFO \
    --labels=key1=value1,key2=value2 \
    --image=REGION-docker.pkg.dev/my-project/repository/container:tag \
    --main-version=v1 \
    --plugin-config-file=config.txt
```

### Deploy a new version

Adapted (not in the official docs): `...-docker.pkg.dev` replaced by `REGION-docker.pkg.dev` because `...` is not a valid placeholder.

```bash
gcloud service-extensions wasm-plugins update my-plugin \
    --image=REGION-docker.pkg.dev/my-project/repository/container:tag \
    --main-version=v2
```

### Service agent of Service Extensions

```text
service-PROJECT_NUMBER@gcp-sa-networkactions.iam.gserviceaccount.com
```

## Options / Props

| Flag | Description |
|------|-------------|
| `WASM_PLUGIN` | Plugin ID or fully qualified name |
| `--description` | Description; up to 1,024 characters in the Console |
| `--location` | `global` or a region |
| `--labels` | Key-value pairs separated by commas; maximum 64 pairs |
| `--log-config` | `enable` (`false` captures no logs; `true` enables), `sample-rate` between `0` and `1` (`0` stores none, default `1` stores all), `min-log-level` (default `INFO`; Console default `Info and higher`) |
| `--image` | URI of the artifact with the Wasm module in Artifact Registry |
| `--main-version` | ID of the plugin version to create and set as the main (active) version |
| `--plugin-config` / `--plugin-config-file` / `--plugin-config-uri` | Optional configuration data as text, a local file or an Artifact Registry image; directly provided data (file upload) is limited to under 900 KiB in the Console |
| `--kms-key-name` | Regional plugins only: `projects/PROJECT/locations/LOCATION/keyRings/KEYRING_NAME/cryptoKeys/KEY_NAME`; otherwise Google default encryption is used |

## Notes

- Plugin and plugin version names (Console): start with a lowercase letter, up to 62 further lowercase letters, numbers or hyphens, not ending with a hyphen. Scope is Global or Regional; encryption choice (Google-managed or Cloud KMS) is available only for regional plugins.
- Reading an image from another project requires the Service Extensions service agent to have access to that project's repository, plus `artifactregistry.files.download` for generic artifacts or `artifactregistry.repositories.downloadArtifacts` for container images. Replace `PROJECT_NUMBER` with the project number, not the project ID. Do not grant these roles to workloads.
- Using a generic Artifact Registry repository is in Preview.
- The source's syntax block uses `[LABELS,...]` and `|` alternatives; it is summarized in the table above and not reproduced, as `...` is not allowed in a bash fence.
- Required IAM roles are on the Service Extensions access-control page: https://docs.cloud.google.com/service-extensions/docs/access-control
- The source also shows the Console wizard. To request Media CDN access, contact your Google Cloud sales representative or account team.
- Google Cloud Service Extensions, not Cloudflare Workers (see `cloudflare-workers`) and not the Wasm toolchain itself (see `rust`).
- Source: https://docs.cloud.google.com/service-extensions/docs/create-plugin (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: `--image=...-docker.pkg.dev/my-project/repository/container:tag` became `--image=REGION-docker.pkg.dev/my-project/repository/container:tag` in both examples (the source's other examples use a regional host such as `us-docker.pkg.dev`; use the Artifact Registry location of your repository).

## Related

- [plugins-overview.md](./plugins-overview.md)
- [configure-traffic-extensions.md](./configure-traffic-extensions.md)
- [media-cdn-extensions-overview.md](./media-cdn-extensions-overview.md)
- [quotas.md](./quotas.md)
