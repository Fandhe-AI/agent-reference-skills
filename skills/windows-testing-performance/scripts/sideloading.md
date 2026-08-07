# sideloading

MSIX パッケージのテストに必要な Developer Mode / サイドローディングを有効化するコマンド集。

## サイドローディングの有効化（レジストリ）

> **警告**: マシン全体のインストール時信頼チェックを緩和する。テスト専用マシンでのみ実行し、テスト終了後は値を `0` に戻すこと。

```powershell
# サイドローディングのみ有効化（再起動不要）
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v "AllowAllTrustedApps" /d "1"
```

## フル Developer Mode の有効化（レジストリ）

> **警告**: マシン全体のインストール時信頼チェックを緩和する。テスト専用マシンでのみ実行し、テスト終了後は値を `0` に戻すこと。

```powershell
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v "AllowDevelopmentWithoutDevLicense" /d "1"
```

`gpedit.msc` が使える場合は **Computer Configuration > Administrative Templates > Windows Components > App Package Deployment** から GUI で同等の設定ができる（Windows 10/11 Home にはこのポリシーエディターがない）。Settings アプリの **System > Advanced > For developers** からのトグルも同じ設定を変更する。
