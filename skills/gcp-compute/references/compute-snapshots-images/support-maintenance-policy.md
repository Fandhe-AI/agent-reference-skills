---
source: https://docs.cloud.google.com/compute/docs/images/support-maintenance-policy
---

# Support and maintenance policy for OS images

Defines what Google Cloud Support covers for OS images, by license type (PAYG/on-demand, BYOS/BYOL, free) and by scope (guest environment, Google-installed agents and packages vs the OS itself).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/images (the source twin has no code block; this lists OS images, whose license type determines the policy below):

```bash
gcloud compute images list
```

Manage licenses attached to an OS: https://docs.cloud.google.com/compute/docs/licenses/view-append.

## Options / Props

### Support options

| Plan | What you get |
|---|---|
| Basic | Post OS questions in the Google Cloud Community forums for Compute Engine |
| Standard, Extended or Premium | Policy by license type below |

### Support policy by license type (applies to all lifecycle stages; requires a paid support plan)

| License | OS | Google Cloud Support | OS issue escalation |
|---|---|---|---|
| PAYG/on-demand | RHEL, SLES, Windows Server | Troubleshoots the guest environment and guides on in-scope issues; engages the OS vendor if needed | The OS vendor works with Google Cloud, not with you directly |
| PAYG/on-demand | Ubuntu Pro | Same guest environment support | Contact Canonical if tied to the Ubuntu Pro OS |
| BYOS/BYOL | RHEL, SLES, Windows client, Windows Server | Same guest environment support | Contact the vendor that sold the license |
| Free | Rocky Linux | Same; engages CIQ if needed | CIQ works with Google Cloud, not with you directly |
| Free | CentOS, Container-Optimized OS (COS), Debian, Ubuntu | Guest environment support | Use community support for the OS |

### Support scope

| Within scope | Out of scope |
|---|---|
| Issues with Google Cloud products and services | Images with substantial modifications: replaced kernel, replaced init system, third-party kernel modules |
| OS configurations that are vendor defaults or set by Google Cloud (see Image configuration on https://docs.cloud.google.com/compute/docs/images/os-details) | Issues with user-installed applications |
| Agents and packages installed by Google Cloud (https://docs.cloud.google.com/compute/docs/images/guest-environment) | Issues that can't be reproduced in a generic environment |

## Notes

- Additional resources named in the source: RHEL FAQ, SLES FAQ, Windows license FAQ, Ubuntu Pro FAQ under https://docs.cloud.google.com/compute/docs/images/premium/ and https://docs.cloud.google.com/compute/docs/instances/windows/ms-licensing-faq.
- Community support: CentOS (forums.centos.org), Debian (debian.org/support), Fedora CoreOS (ask.fedoraproject.org).
- Source: https://docs.cloud.google.com/compute/docs/images/support-maintenance-policy (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/compute/docs/images

## Related

- [os-image-lifecycle.md](./os-image-lifecycle.md)
- [images.md](./images.md)
