---
source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/troubleshooting
---

# DM Convert Troubleshooting

Points to the Google provider's getting-started guide for Terraform authentication errors and explains how to report bugs and save DM Convert logs.

## Signature / Usage

Append this flag when running DM Convert to save logs for bug reports or feature requests:

```text
--log_dir=/tmp/dm-convert-logs
```

## Options / Props

| Topic | Detail |
|-------|--------|
| Terraform authentication errors | See https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/getting_started#adding-credentials |
| Bug reports | https://issuetracker.google.com/issues/new?component=187078&template=1163231 |
| Feature requests | https://issuetracker.google.com/issues/new?component=187078&template=1163257 |
| Response time | Typically within 2 business days |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Preview: subject to the "Pre-GA Offerings Terms".
- Source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert/troubleshooting (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [convert.md](./convert.md)
- [dm-convert.md](./dm-convert.md)
