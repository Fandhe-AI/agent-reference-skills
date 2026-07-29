# Install on Linux

Package-manager based installation of ROCm on Linux (Ubuntu example), covering repository setup, kernel driver, and the Core SDK meta-package.

## Signature / Usage

```bash
# 1. Repository setup (Ubuntu 24.04 "noble" example; use "jammy" for 22.04)
wget https://repo.radeon.com/amdgpu-install/7.2.4/ubuntu/noble/amdgpu-install_7.2.4.70204-1_all.deb
sudo apt install ./amdgpu-install_7.2.4.70204-1_all.deb
sudo apt update

# 2. Kernel driver (amdgpu-dkms)
sudo apt install "linux-headers-$(uname -r)" "linux-modules-extra-$(uname -r)"
sudo apt install amdgpu-dkms

# 3. ROCm Core SDK
sudo apt install python3-setuptools python3-wheel
sudo usermod -a -G render,video $LOGNAME
sudo apt install rocm

# 4. reboot, then verify
rocminfo
```

## Options / Props

| Install path | Recommended for |
| --- | --- |
| Quick start | New users; enables GPU access for the current user only |
| Detailed install | Users needing multi-user GPU access or a customized component set |

## Notes

- ROCm 7.14.0 for the Core SDK; at time of writing the install docs showed `amdgpu-install` version 7.2.4 for the same distribution codenames, a different version number than the main site's 7.14.0. Always resolve the current version and codename (`noble`/`jammy`/etc.) against the official install docs rather than hardcoding this snippet long-term
- The GPG key and repository package (`amdgpu-install_*.deb`) come only from `repo.radeon.com`; do not substitute a third-party mirror or PPA
- A reboot is required after installing `amdgpu-dkms` for the kernel driver to take effect
- For deep-learning framework installs (PyTorch/TensorFlow/JAX/DGL) see [install-deep-learning-frameworks.md](./install-deep-learning-frameworks.md); for containers/Spack see [install-docker-spack.md](./install-docker-spack.md)

## Related

- [Install on Windows](./install-windows.md)
- [Compatibility and Release History](./compatibility-and-release-history.md)
