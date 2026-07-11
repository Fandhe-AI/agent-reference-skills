# install-update

Manual OS / component (driver, firmware) update commands for DGX Spark. Source: os-and-component-update.html

## Manual system update via apt

```sh
sudo apt update
sudo apt dist-upgrade
```

Updates the package lists and upgrades all installed packages, including OS components and drivers.

## Manual firmware update via fwupdmgr

```sh
sudo fwupdmgr refresh
sudo fwupdmgr upgrade
```

Refreshes firmware metadata and upgrades all firmware components.

## Reboot to apply updates

```sh
sudo reboot
```

> **警告**: アップデート中はシステムをシャットダウン・再起動しないこと。ダウンロード開始後は中断できず、更新中の電源断はシステム損傷を招く可能性がある。事前に安定した電源接続を確保し、実行中のアプリケーションを終了・保存し、メンテナンスウィンドウ中に実行すること。
