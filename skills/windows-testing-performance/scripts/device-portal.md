# device-portal

Windows Device Portal（WDP）の REST API をコマンドラインから呼び出すコマンド集。事前に Developer Mode 有効化と Device Portal の ON が必要。

## curl でのアクセス（CSRF バイパス）

```sh
# ユーザー名に auto- を前置すると CSRF トークンのやり取りをバイパスできる
# （ブラウザ UI ログインには auto- アカウントを使わないこと。CSRF 保護が無効化される）
curl -u auto-admin:password https://<device-name-or-ip>:<port>/api/os/info
```

## インストール済みパッケージの一覧取得

```sh
curl -u auto-admin:password https://<device-name-or-ip>:<port>/api/app/packagemanager/packages
```

## アプリパッケージのインストール

> **警告**: 対象デバイスへパッケージをインストールする操作。既存インストールを上書きする場合がある。

```sh
curl -u auto-admin:password -X POST \
  "https://<device-name-or-ip>:<port>/api/app/packagemanager/package?package=<filename>"
  # ボディは multipart/form-data で .appx/.appxbundle + 署名証明書を送信する
  # （フォームフィールド名は公式ドキュメントに明記されておらず要確認）
```

## カスタム SSL 証明書のロード（Device Portal サービス）

```powershell
# 証明書のロード
WebManagement.exe -SetCert <path.pfx> <password>

# サービスの再起動（設定を反映）
sc stop webmanagement
sc start webmanagement
```

Device Portal は既定で自己署名証明書（信頼されないルート CA）を使うため、ブラウザで警告が出る。`New-SelfSignedCertificate` / `Export-PfxCertificate`（管理者権限の PowerShell）で信頼済みルート CA とエンドポイント別 `.pfx` を作成してからロードする。
