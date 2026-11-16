---
source: https://docs.cloud.google.com/compute/docs/gpus/install-drivers-gpu
---

# Install GPU drivers

After creating a Compute Engine instance with GPUs, install NVIDIA drivers. Ensure enough free disk space: choose at least 40 GB for the boot disk. For hardware accelerated 3D graphics (remote desktop, gaming) use the vWS driver guide (https://docs.cloud.google.com/compute/docs/gpus/install-grid-drivers). Alternatively skip setup by using images with drivers installed (https://docs.cloud.google.com/compute/docs/gpus/create-vm-with-gpus#choose_an_operating_system).

## Signature / Usage

### Linux: installation script (not for Secure Boot Linux VMs)

Tested OS: Debian 12 and 13; RHEL 8, 9 and 10; Rocky Linux 8, 9 and 10; Ubuntu 22, 24 and 26. Other OSes might fail. Python 3 is required. If Ops Agent 2.38.0 or later collects GPU metrics, stop it first:

```bash
sudo systemctl stop google-cloud-ops-agent
```

Adapted (not in the official docs): added `-f` so an HTTP error page is not saved as the installer.

```bash
curl -fL https://storage.googleapis.com/compute-gpu-installation-us/installer/latest/cuda_installer.pyz --output cuda_installer.pyz
```

Inspect the script before running (source: https://github.com/GoogleCloudPlatform/compute-gpu-installation), then run it. Replace `INSTALLATION_MODE` and `BRANCH` (see Options).

```bash
sudo python3 cuda_installer.pyz install_driver --installation-mode=INSTALLATION_MODE --installation-branch=BRANCH
```

```bash
python3 cuda_installer.pyz list_driver_versions
```

```bash
sudo python3 cuda_installer.pyz install_driver --force-version DRIVER_VERSION
```

The script takes several minutes and might restart the instance; rerun with the same parameters after the restart. Optionally install CUDA Toolkit with the same `INSTALLATION_MODE` and `BRANCH`, verify, then reboot.

```bash
sudo python3 cuda_installer.pyz install_cuda --installation-mode=INSTALLATION_MODE --installation-branch=BRANCH
```

```bash
python3 cuda_installer.pyz verify_cuda
```

### Linux: startup script

```bash
#!/bin/bash
if test -f /opt/google/cuda-installer
then
  exit
fi

mkdir -p /opt/google/cuda-installer
cd /opt/google/cuda-installer/ || exit

if test -f cuda_installation
then
  exit
fi

curl -fSsL -O https://storage.googleapis.com/compute-gpu-installation-us/installer/latest/cuda_installer.pyz
python3 cuda_installer.pyz install_driver
# Or uncomment the line below to also install CUDA Toolkit
# python3 cuda_installer.pyz install_cuda
```

### Secure Boot Linux VMs: automated self-signing image

Not usable for Secure Boot instances with vWS GPUs. Same tested OS list as above. Image creation can take up to 20 minutes. `BASE_IMAGE_NAME`: `debian-12`, `debian-13`, `rhel-8`, `rhel-9`, `rhel-10`, `rocky-8`, `rocky-9`, `rocky-10`, `ubuntu-22` or `ubuntu-24`. Add `--family NAME` for an image family; see `python3 cuda_installer.pyz build_image --help`.

Adapted (not in the official docs): added `-f` so an HTTP error page is not saved as the installer.

```bash
curl -fL https://storage.googleapis.com/compute-gpu-installation-us/installer/latest/cuda_installer.pyz --output cuda_installer.pyz
```

```bash
PROJECT=PROJECT_ID
ZONE=ZONE
BASE_IMAGE=BASE_IMAGE_NAME
SECURE_BOOT_IMAGE=IMAGE_NAME

python3 cuda_installer.pyz build_image \
  --project $PROJECT \
  --vm-zone $ZONE \
  --base-image $BASE_IMAGE $SECURE_BOOT_IMAGE
```

Verify with a test VM (the source uses N1 + one T4; any GPU machine type works), where `ZONE` must have T4 or your chosen GPU:

```bash
TEST_INSTANCE_NAME=TEST_INSTANCE_NAME
ZONE=ZONE

gcloud compute instances create $TEST_INSTANCE_NAME \
 --project=$PROJECT \
 --zone=$ZONE \
 --machine-type=n1-standard-4 \
 --accelerator=count=1,type=nvidia-tesla-t4 \
 --create-disk=auto-delete=yes,boot=yes,device-name=$TEST_INSTANCE_NAME,image=projects/$PROJECT/global/images/$SECURE_BOOT_IMAGE,mode=rw,size=100,type=pd-balanced \
 --shielded-secure-boot \
 --shielded-vtpm \
 --shielded-integrity-monitoring \
 --maintenance-policy=TERMINATE
```

```bash
gcloud compute ssh --project=$PROJECT --zone=$ZONE $TEST_INSTANCE_NAME --command "mokutil --sb-state"
```

```bash
gcloud compute ssh --project=$PROJECT --zone=$ZONE $TEST_INSTANCE_NAME --command "nvidia-smi"
```

Clean up (destructive):

```bash
gcloud compute instances delete --zone=$ZONE --project=$PROJECT $TEST_INSTANCE_NAME
```

```bash
gcloud compute images delete --project=$PROJECT $SECURE_BOOT_IMAGE
```

### Verify the install

```bash
sudo nvidia-smi
```

If it fails, check that GPUs are attached:

```bash
sudo lspci | grep -i "nvidia"
```

On Windows Server run `nvidia-smi` in PowerShell.

## Options / Props

### Script flags

| Flag / value | Meaning |
|---|---|
| `INSTALLATION_MODE=repo` | (Default) installs from the official NVIDIA package repository; recommended for instances managed by automated OS patching because DKMS rebuilds the driver on kernel updates |
| `INSTALLATION_MODE=binary` | Standalone NVIDIA `.run` installer; locks kernel meta-packages (`apt-mark hold` on Ubuntu/Debian, `exclude=kernel*` in `/etc/dnf/dnf.conf` on RHEL/Rocky). Used automatically with `--installation-branch=lts`, `--force-version`, or on a vWS instance |
| `BRANCH=prod` | (Default) production branch, qualified for enterprise and data center GPUs |
| `BRANCH=nfb` | New feature branch, not recommended for production |
| `BRANCH=lts` | Long-term support branch; uses `binary` mode |
| `--force-version DRIVER_VERSION` | Install a specific driver version |
| `--ignore-no-gpu` | Used for the build VM without a GPU |
| `--secure-boot-pub-key` / `--secure-boot-priv-key` | Sign the driver for Secure Boot |

### NVIDIA driver branches

| Branch | Support |
|---|---|
| LTSB | About three years; latest tested by Google is R580, end of support June 2028 |
| Production Branch (PB) | Up to one year; latest tested by Google is R595, end of support March 2027 |
| New Feature Branch (NFB) | For early adopters; not recommended for production |

### Recommended driver branch and minimum driver (all: supported R580 or later, recommended R580, EOS June 2028)

| Machine type (GPU) | Minimum driver |
|---|---|
| A4X Max, A4X, A4, A3 Ultra, A3 Mega/High/Edge | Linux `580.95.05` or later; Windows N/A |
| G4 (RTX PRO 6000) | Linux `580.95.05`; Windows `581.42` |
| G4 fractional GPU | Linux `580.126.09`; Windows `582.16` |
| G2 (L4), A2 (A100), N1 T4 | Linux `580.95.05`; Windows `581.42` |
| N1 V100, P4 | R580 is the last branch supporting Pascal and Volta; Linux `580.95.05`; Windows `581.42` |

### Recommended CUDA Toolkit

| Machine type | CUDA Toolkit |
|---|---|
| A4X Max, A4X, A4, A3 Ultra, G2, A3 Mega/High/Edge, A2, N1 T4 | CUDA 13.0 or later |
| G4 | CUDA 13.1 or later |
| N1 V100, P4 | CUDA 12.2.2 to CUDA 12 (final version); CUDA 13.0 removed offline compilation and library support for Pascal and Volta |

## Notes

- Downloaded installers run as root / administrator. The source downloads and runs them in consecutive steps; inspect first (source repository: https://github.com/GoogleCloudPlatform/compute-gpu-installation). The Windows script URL and the startup script point to `main` / `latest`, which can change.
- CUDA Toolkit install instructions, and the script, do not work on Linux instances with Secure Boot enabled (Windows is fine); use the Secure Boot sections.
- Caution kept from the source: enterprise patch tools (OS Config, BigFix, Ansible) might install versioned kernel packages that bypass `binary` mode holds without matching headers (`linux-headers-$(uname -r)` / `kernel-devel-$(uname -r)`), breaking the driver after reboot; use `repo` mode or install matching headers. Troubleshooting: https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-gpus#troubleshoot-kernel-mismatch
- `instances delete` and `images delete` above are destructive; try them on disposable resources first.
- Omitted for size (see the source for the exact commands): the Windows driver installation (PowerShell script `install_gpu_driver.ps1`, or metadata key `sysprep-specialize-script-url`), the manual Secure Boot self-signing procedure (openssl certificate, build VM, `--secure-boot-pub-key` / `--secure-boot-priv-key`, `check.sha1` certificate verification, `gcloud compute images create ... --signature-database-file`) and the manual fractional-GPU (G4 vGPU, `g4-standard-6` / `-12` / `-24`) installation, for which the source says the installation script is the recommended method.
- The source also covers pre-signed drivers for Secure Boot Ubuntu 18.04, 20.04 and 22.04 only (apt `linux-modules-nvidia-*-gcp`, CUDA repository pinning, `cuda-keyring`, `cuda-drivers`); these steps are omitted here for size. Ubuntu 18.04 and 20.04 are old releases; see the source for the exact commands.
- Also omitted: Console and REST authentication preamble and Cloud Shell activation.
- Adapted from the official docs: both `curl` installer downloads in this page use `curl -fL` where the source shows `curl -L` without `-f`, so an HTTP error page is not saved and later run as the installer.
- The startup script is verbatim from the source; it downloads from `latest` and runs the installer without an inspection step, so review `cuda_installer.pyz` (https://github.com/GoogleCloudPlatform/compute-gpu-installation) before using it on production images. Logic issue in the source's guards: `test -f` is true only for a regular file, and the script itself creates `/opt/google/cuda-installer` as a directory with `mkdir -p`, so the first `if test -f /opt/google/cuda-installer` never exits; the source does not say what creates `cuda_installation`, the file the second guard tests. The source's sentence after the script, "To install only the driver without CUDA Toolkit, replace `install_cuda` in the last line of the script with `install_driver`.", does not match the script, whose active line already runs `install_driver` and whose `install_cuda` line is commented out.
- GPU / TPU pages in this category cover Compute Engine VMs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source's Secure Boot test VM uses one NVIDIA T4 (`--accelerator=count=1,type=nvidia-tesla-t4`); the Compute Engine deprecations page lists "NVIDIA T4 | August 1, 2026 | August 1, 2027" (deprecated, shutdown date), and gpus.md says "NVIDIA T4 GPUs reach end of support on August 1, 2027". Where T4 is unavailable, use another GPU model and machine type listed in [gpus.md](./gpus.md) for the test VM.
- Source (NVIDIA T4 deprecation): https://docs.cloud.google.com/compute/docs/deprecations (retrieved 2026-11-17)
- Source (GPU platforms, cited above as `gpus.md`): https://docs.cloud.google.com/compute/docs/gpus (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/gpus/install-drivers-gpu (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-gpus.md](./about-gpus.md)
- [gpus.md](./gpus.md)
- [gpu-host-maintenance.md](./gpu-host-maintenance.md)
