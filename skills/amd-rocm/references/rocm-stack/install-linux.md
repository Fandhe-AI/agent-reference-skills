# Install on Linux

Package-manager based installation of ROCm Core SDK 10.1.0 (TheRock-based) on Linux (Ubuntu 24.04.5 example): repository registration, kernel driver, and the `amdrocm10.1` meta package.

## Signature / Usage

```bash
# 1. Register the ROCm repository (Ubuntu 24.04.5 "noble"; ubuntu2204 for 22.04.5, ubuntu2604 for 26.04.1)
sudo mkdir --parents --mode=0755 /etc/apt/keyrings
wget https://stable.repo.amd.com/rocm/gpg/packages.gpg -O - | \
    gpg --dearmor | sudo tee /etc/apt/keyrings/amdrocm.gpg > /dev/null

sudo tee /etc/apt/sources.list.d/amdrocm-stable.sources << EOF
X-Repo-Id: amdrocm-stable
Types: deb
URIs: https://stable.repo.amd.com/rocm/core/packages/ubuntu2404/
Suites: stable
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/amdrocm.gpg
Enabled: yes
EOF

sudo apt update

# 2. Kernel driver (Instinct / Radeon): install the AMD GPU Driver (amdgpu) per the
#    AMD Instinct Data Center GPU Documentation (amdgpu-docs 31.60.0), then reboot

# 3. ROCm packages (ROCm Base = runtime); for development use amdrocm-core-dev10.1 or amdrocm-core-sdk10.1 (see meta package table)
sudo apt install amdrocm10.1
sudo apt install amdrocm10.1-gfx942

# 4. verify
rocminfo
amd-smi version
```

## Options / Props

| Install method | Platform | Best for |
| --- | --- | --- |
| Package manager (apt / dnf / zypper) | Linux | Traditional Linux installation; OS managed; auto post-install; system-wide |
| amdgpu-install | Linux | Radeon and Ryzen only; supports graphics packages; use-case driven selection (`--usecase`); ROCm and amdgpu driver bundled |
| pip | Linux, Windows | Python and ML workflows (PyTorch, JAX); auto post-install; Python virtual environment |
| Tarball | Linux, Windows | Self-contained, portable setups; monolithic install; system-wide or custom install directory |
| Runfile | Linux | Self-contained, guided (GUI or CLI); optional offline; packageless; single installer for all GPUs; ROCm and amdgpu driver bundled; auto post-install |

| Meta package | Use case |
| --- | --- |
| `amdrocm10.1` / `amdrocm10.1-<gfx>` | ROCm Base: core runtime environment, to run ROCm applications |
| `amdrocm-core-dev10.1` (deb) / `amdrocm-core-devel10.1` (rpm) | ROCm Developer Essentials: the base plus compilers, CMake configurations, static libraries, and headers |
| `amdrocm-developer-tools10.1` | ROCm Profiler: profilers and related tools |
| `amdrocm-opencl10.1` | ROCm OpenCL: components needed to run OpenCL |
| `amdrocm-core-sdk10.1` | ROCm Full Suite: complete Core SDK including runtimes, compilers, development tools, and dependencies |

## Notes

- Version: ROCm Core SDK 10.1.0. If ROCm 7.2.4 or older is installed, uninstall it before proceeding
- The kernel driver is no longer installed through `amdgpu-install` in the package-manager flow: for Instinct and Radeon, follow the AMD GPU Driver (amdgpu) install pages in the AMD Instinct Data Center GPU Documentation (amdgpu-docs 31.60.0). Supported Ryzen APUs use the inbox kernel driver of Ubuntu (26.04 / 24.04.4). The `amdgpu-install` path (package `amdgpu-install_31.60.316000-1_all.deb` from `repo.radeon.com`) is for Radeon and Ryzen only, for example `sudo amdgpu-install --usecase=rocm,graphics --gfxversion=auto`
- Install directory is `/opt/rocm/core-10.1` with `/opt/rocm` symlinks from the `amdrocm` meta package. Post-install environment exports (`ROCM_PATH`, `PATH`, `LD_LIBRARY_PATH`) are only documented for the tarball install (`$ROCM_PATH/bin`, `$ROCM_PATH/lib`); package-manager, pip, and runfile installs are marked "auto post-install"
- Runfile Installer: `wget https://stable.repo.amd.com/rocm/core/linux-installers/rocm-installer-10.1.0-5.run`, then `bash rocm-installer-10.1.0-5.run deps=install amdgpu` installs the driver (reboot afterwards)
- ASAN builds: packages are named `amdrocm-asan10.1` or `amdrocm-asan10.1-gfxXYZ`, come from the separate `amdrocm-stable-asan` repository (`https://stable.repo.amd.com/rocm/core/packages-asan/<distro>/`, e.g. `.../packages-asan/ubuntu2404/` for Ubuntu 24.04 or `.../packages-asan/rhel9/x86_64` for RHEL 9), and install to `/opt/rocm/core-asan-10.1`
- Uninstall: `sudo apt autoremove amdrocm10.1` (or the per-architecture package), then remove `/etc/apt/sources.list.d/amdrocm-stable.sources`
- The GPG key and repositories come only from the official AMD hosts (`stable.repo.amd.com`, and `repo.radeon.com` for the `amdgpu-install` path); do not substitute a third-party mirror or PPA. Resolve the current version and codename against the official install docs rather than hardcoding this snippet long-term
- Previously documented (ROCm 7.2.4-era) flow with `amdgpu-install_7.2.4.70204-1_all.deb`, `amdgpu-dkms`, and `sudo apt install rocm` is superseded for Core SDK 10.1.0
- For deep-learning framework installs (PyTorch/TensorFlow/JAX/DGL) see [install-deep-learning-frameworks.md](./install-deep-learning-frameworks.md); for containers/Spack see [install-docker-spack.md](./install-docker-spack.md)

## Related

- [Install on Windows](./install-windows.md)
- [Compatibility and Release History](./compatibility-and-release-history.md)
