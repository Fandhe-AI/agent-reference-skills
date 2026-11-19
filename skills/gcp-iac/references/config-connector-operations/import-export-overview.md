---
source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/overview
---

# Install the config-connector CLI tool

The `config-connector` CLI exports existing Google Cloud resources into the YAML files Config Connector needs to acquire them. It is not installed with Config Connector.

## Signature / Usage

### Install

Prerequisite: install Config Connector with a supported installation method.

```bash
gcloud storage cp gs://cnrm/latest/cli.tar.gz .
```

```bash
tar zxf cli.tar.gz
```

The tar file contains binaries for Linux (`./linux/amd64/config-connector`), macOS (`./darwin/amd64/config-connector`) and Windows (`./windows/amd64/config-connector`). Copy the one for your OS onto `${PATH}`, for example:

```bash
mv linux/amd64/config-connector /usr/local/bin
```

To export directly from Cloud Asset Inventory, enable the API in your identity's project:

```bash
gcloud services enable cloudasset.googleapis.com
```

### Upgrade

Repeat the installation steps and overwrite the executable.

## Notes

- The download comes from the unpinned `latest` path (`gs://cnrm/latest/cli.tar.gz`); the page gives no checksum, so inspect the extracted binary before placing it on `${PATH}`.
- Next steps in the source: export individual resources, bulk export for a project, folder or organization, and the list of supported resources.
- Cloud Asset Inventory and `gcloud resource-config bulk-export` are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [export.md](./export.md)
- [bulk-export.md](./bulk-export.md)
