---
source: https://docs.cloud.google.com/compute/docs/images
---

# OS images

Operating system (OS) images create boot disks for Compute Engine VM or bare metal instances. Public OS images are provided by Google, open source communities and third-party vendors and are available to every project; custom OS images are available only to your project.

## Signature / Usage

### List public OS images

```
gcloud compute images list
```

By default the gcloud CLI lists images from the Compute Engine images projects; the Google Cloud console also lists Deep Learning VM Images and HPC VM image projects.

### List community-supported images

```
gcloud compute images list --project fedora-cloud --no-standard-images
```

```
gcloud compute images list --project freebsd-org-cloud-dev --no-standard-images
```

```
gcloud compute images list --project opensuse-cloud --no-standard-images
```

## Options / Props

### TPU OS images

| TPU version | OS version | Kernel version | Image project | Image family |
|---|---|---|---|---|
| TPU7x (Ironwood) | `Ubuntu 24.04 LTS` | 6.8 | `ubuntu-os-accelerator-images` | `ubuntu-accel-2404-amd64-tpu-tpu7x` |
| v6e (Trillium), v5p | `Ubuntu 22.04 LTS` | 6.8 | `ubuntu-os-accelerator-images` | `ubuntu-accel-2204-amd64-tpu-v5e-v5p-v6e` |

### Community and partner image projects

| OS | Project | Support |
|---|---|---|
| Fedora Cloud | `fedora-cloud` | Community; no licensing charge |
| FreeBSD | `freebsd-org-cloud-dev` | Community; no licensing charge |
| openSUSE | `opensuse-cloud` | Community; no licensing charge |
| Oracle Linux | Provided by Oracle; can be imported | Partner (community or Oracle enterprise support); no licensing charge on Google Cloud |

## Notes

- Public OS images are 64-bit, updated regularly or when a patch for a critical-impact CVE is available. Details per OS: https://docs.cloud.google.com/compute/docs/images/os-details.
- By default the boot disk is the same size as the image; resize it if the instance needs more.
- Custom images: import virtual disks (one disk at a time manually; for several VMs consider the VM migration service), create from boot disks of existing instances, or copy from another image (including another project) with the same process as creating an image but a different image source.
- Some guest OS features (for example multiqueue SCSI) exist only on certain OS images; specify them when creating a custom image.
- Cost: premium OS images (public or custom) incur licensing fees via PAYG or BYOL/BYOS; custom images also incur an image storage charge. Pricing: https://docs.cloud.google.com/compute/disks-image-pricing.
- Image families group images so you can roll forward or back; a family always points to the latest non-deprecated image (for example the `debian-13` family in the `debian-cloud` project). Custom families let templates and scripts avoid hard-coded image versions; roll back by deprecating the latest image, provided the previous one is not deprecated.
- Oracle Linux import uses the Migrate to Virtual Machines import tool (VM migration is in the planned `gcp-hybrid-migration`).
- FreeBSD gVNIC support (Preview) is available with release 14.0 and later; for earlier releases create a custom OS image that supports gVNIC or install the driver manually.
- The source also shows a Console path for listing images.
- Source: https://docs.cloud.google.com/compute/docs/images (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [image-families-best-practices.md](./image-families-best-practices.md)
- [os-image-lifecycle.md](./os-image-lifecycle.md)
- [support-maintenance-policy.md](./support-maintenance-policy.md)
- [machine-images.md](./machine-images.md)
