---
source: https://docs.cloud.google.com/deploy/docs/using-skaffold
---

# Using Skaffold with Cloud Deploy

Cloud Deploy uses Skaffold for render and deploy operations. The only thing Cloud Deploy requires is a Skaffold configuration (`skaffold.yaml`) that identifies the manifests to render and apply. Skaffold is included in Cloud Deploy and does not need to be installed.

## Signature / Usage

### What a delivery pipeline binds to Skaffold

Skaffold profiles defined in `skaffold.yaml` are bound to targets per stage in the delivery pipeline. Skaffold logging verbosity is `warn` by default; set `verbose: true` in a target's execution environment configuration (`executionConfigs`) to get `debug`.

```text
serialPipeline:
  stages:
  - targetId: staging-target
    profiles:
    - staging
  - targetId: prod-target
    profiles:
    - prod
```

## Options / Props

### How Cloud Deploy uses Skaffold

| Phase | Skaffold command | Notes |
|-------|------------------|-------|
| Release creation | `skaffold diagnose`, `skaffold render` | Cloud Deploy calls Cloud Build, which invokes them with the rendering source and container images. |
| Deploy | `skaffold apply` | Applies rendered manifest(s) to the target cluster. |

### Supported and unsupported

| Item | Behavior |
|------|----------|
| Skaffold profiles | Supported; differentiate manifests per target. |
| Static Skaffold modules | Supported. |
| Other deployers (for example Helm as deployer) | Not supported unless you use custom targets. |
| Helm / Kustomize | Usable as renderers. |

## Notes

- Caution (source): Skaffold will be removed from gcloud CLI releases after January 15, 2027; afterwards install it per https://skaffold.dev/docs/install/. On January 29, 2027 the Skaffold GitHub repository will be archived; existing releases remain available.
- If configuration is the same for every target in the progression you do not need profiles; a `skaffold.yaml` that lists the manifests is enough.
- Local development with Skaffold is optional.
- Cloud Deploy is Google Cloud's continuous delivery service for GKE / Cloud Run; it is not Vercel or Cloudflare deployment (`vercel`, `cloudflare-wrangler`).
- Snippet taken from https://docs.cloud.google.com/deploy/docs/using-skaffold/managing-manifests (the page has no code of its own); the source indents it by 4 spaces and shows it as a delivery pipeline fragment.
- Source: https://docs.cloud.google.com/deploy/docs/using-skaffold (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [getting-started-skaffold.md](./getting-started-skaffold.md)
- [managing-manifests.md](./managing-manifests.md)
- [select-tool-version.md](./select-tool-version.md)
