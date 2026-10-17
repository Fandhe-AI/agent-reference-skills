---
source: https://v2.tauri.app/distribute/crabnebula-cloud/
---

# CrabNebula Cloud

CrabNebula is an official Tauri partner providing services and tooling for Tauri applications. The CrabNebula Cloud is a platform for application distribution that integrates with the Tauri updater.

## Signature / Usage

Sign in to the Cloud website (https://web.crabnebula.cloud/) with your GitHub account, create your organization and application, then install its CLI to create a release and upload the Tauri bundles. A GitHub Action (`crabnebula-dev/cloud-release`) simplifies using the CLI in GitHub workflows. See the CrabNebula Cloud documentation at https://docs.crabnebula.dev/cloud/.

```sh
# The page contains no code; setup is done on the Cloud website and with its CLI
# https://github.com/crabnebula-dev/cloud-release/
```

## Notes

- The Cloud offers a Content Delivery Network (CDN) that ships installers and updates globally, cost effectively, exposing download metrics.
- It makes multiple release channels and download buttons for your website simple.
- The official page contains no code samples or CLI commands; consult the CrabNebula docs for those.

## Related

- updater plugin
- [pipelines-github](./pipelines-github.md)
