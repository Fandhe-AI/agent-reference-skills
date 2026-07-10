# Field Diagnostic Software

`dgx-spark-fieldiag` is NVIDIA's diagnostic tool suite for assessing DGX Spark system health (storage, memory, CPU/GPU stress, and ConnectX-7 networking).

## Signature / Usage

```bash
# Add NVIDIA CUDA repository key
sudo mkdir -p /usr/share/keyrings
curl -fsSL https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa/cuda-archive-keyring.gpg | sudo tee /usr/share/keyrings/cuda-archive-keyring.gpg > /dev/null

# Add CUDA APT repository and install
echo "deb [signed-by=/usr/share/keyrings/cuda-archive-keyring.gpg] https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa /" | sudo tee /etc/apt/sources.list.d/cuda-sbsa-ubuntu2404.list
sudo apt-get update
sudo apt-get install dgx-spark-fieldiag

# Verify installation
dpkg -l | grep dgx-spark-fieldiag

# Check Secure Boot state
sudo mokutil --sb-state

# Disable Secure Boot (enter UEFI setup)
sudo systemctl reboot --firmware-setup

# Run diagnostics (single-user mode)
sudo init 3
cd /opt/nvidia/dgx-spark-fieldiag
sudo ./partnerdiag --field

# Re-enable Secure Boot (enter UEFI setup again)
sudo systemctl reboot --firmware-setup

# Verify required tools are present
which fio
which memtester
which stress-ng
which ofed_info
which opensm
which ibstat
which mlxlink
```

## Notes

- Installed via the CUDA APT repository (`ubuntu2404/sbsa`); dependencies such as `fio`, `memtester`, and `stress-ng` are installed automatically.
- ConnectX-7 network testing additionally requires DOCA OFED and MFT kernel modules to be present (`ofed_info`, `opensm`, `ibstat`, `mlxlink`).
- Secure Boot must be disabled (via UEFI firmware setup, reached with `sudo systemctl reboot --firmware-setup`) before running diagnostics, and re-enabled afterward.
- A full diagnostic run takes approximately 30 minutes.
- To remove a previous version before reinstalling:

```bash
sudo dpkg -P dgx-spark-fieldiag
sudo rm -rf /opt/nvidia/dgx-spark-fieldiag
sudo apt autoremove dgx-spark-fieldiag
```

## Related

- [Getting Support](./getting-support.md)
