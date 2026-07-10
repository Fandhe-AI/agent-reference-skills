# recovery

System recovery via bootable USB media, and installation/execution of the field diagnostic software. Source: system-recovery.html, support.html

## Create a recovery USB drive

Download the recovery `tar.gz` archive from the official NVIDIA DGX Spark recovery software page, extract it, then run the platform-specific script with administrator privileges (Windows requires an elevated PowerShell/Command Prompt).

> **警告**: このプロセスは USB ドライブ上の全データを消去する。実行前に重要なデータのバックアップを取ること。

```text
# Windows
CreateUSBKey.cmd

# Linux
CreateUSBKey.sh

# macOS
CreateUSBKeyMacOS.sh
```

## Boot and restore procedure (UEFI operations, no shell commands)

1. Disconnect external storage from the DGX Spark, connect the recovery USB drive.
2. Power on and immediately hold `Esc` or `Del` to enter UEFI settings (use a standard USB keyboard; Bluetooth keyboards may not work at this stage).
3. Restore UEFI defaults: Right Arrow → "Save & Exit" → Down Arrow → "Restore Defaults" → "Yes" for "Load Optimized Defaults" → "Save Changes and Reset".
4. Re-enter UEFI (hold `Esc`/`Del` during reboot), enable Secure Boot: "Security" → confirm "Secure Boot" is "Enabled" → "Restore Factory Keys" → "Save and Exit" → "Save Changes and Reset".
5. Re-enter UEFI, boot from the recovery media: "Save & Exit" → "Boot Override" → select the USB drive → Enter.
6. At the welcome screen, press Enter to proceed (or Esc to cancel).

> **警告**: "[START RECOVERY]" を選択すると DGX Spark の内蔵 SSD が完全に消去される。実行前に警告画面の内容を必ず確認すること。

7. Select "[START RECOVERY]" at the warning screen, monitor progress, and press Enter on the final screen to restart.

## Remove a previous field diagnostic software version

```sh
sudo dpkg -P dgx-spark-fieldiag
sudo rm -rf /opt/nvidia/dgx-spark-fieldiag
sudo apt autoremove dgx-spark-fieldiag
```

## Install the field diagnostic software

```sh
sudo mkdir -p /usr/share/keyrings
curl -fsSL https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa/cuda-archive-keyring.gpg | sudo tee /usr/share/keyrings/cuda-archive-keyring.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/cuda-archive-keyring.gpg] https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa /" | sudo tee /etc/apt/sources.list.d/cuda-sbsa-ubuntu2404.list
sudo apt-get update
sudo apt-get install dgx-spark-fieldiag
```

## Verify the field diagnostic software installation

```sh
dpkg -l | grep dgx-spark-fieldiag
```

## Check Secure Boot state before running diagnostics

```sh
sudo mokutil --sb-state
```

## Run the field diagnostic

> **警告**: `sudo init 3` はグラフィカルセッションを含むランレベルを切り替える。実行中のアプリケーションを終了・保存してから実行すること。

```sh
sudo init 3
cd /opt/nvidia/dgx-spark-fieldiag
sudo ./partnerdiag --field
```

## Verify diagnostic tool availability

```sh
which fio
which memtester
which stress-ng
which ofed_info
which opensm
which ibstat
which mlxlink
```
