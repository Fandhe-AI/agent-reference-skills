---
source: https://www.electronjs.org/docs/latest/tutorial/code-signing
---

# Platform Distribution

コード署名・Mac App Store・Windows Store・Snap の配布系コマンド。出典は code-signing、mac-app-store-submission-guide、windows-store-guide、snapcraft（いずれも `https://www.electronjs.org/docs/latest/tutorial/<slug>`）。

> **警告**: 署名・ストア提出系のコマンドは証明書やトークンを扱い、外部サービスへ成果物を送信する。ここの例は使い捨てのテスト環境とテスト用資格情報を前提とし、トークンは環境変数経由で渡して履歴やファイルに直書きしない。

## jsign による Windows アプリ署名 (Azure Artifact Signing)

```bash
jsign --storetype TRUSTEDSIGNING \
      --keystore https://eus.codesigning.azure.net/ \
      --storepass $AZURE_ACCESS_TOKEN \
      --alias trusted-sign-acct/AppName \
      --tsaurl http://timestamp.acs.microsoft.com/ \
      --tsmode RFC3161 \
      --replace <file>
```

Linux / macOS から署名する場合の公式例。`--replace` は対象ファイルの既存署名を置き換える。

## Mac App Store 提出用の署名

公式ガイドは shell コマンドではなく `@electron/osx-sign` の `signAsync`（`identity: 'Apple Distribution'` など）で署名する手順を記載する。開発用 / 提出用の 2 種の JS 例は mac-app-store-submission-guide を参照（シェルコマンドの記載は無いためコードブロックは省略）。MAS 向けバイナリの取得は `ELECTRON_INSTALL_PLATFORM=mas electron .`（tutorial/installation 記載）。

## Windows Store (AppX) パッケージのためのツール導入

```sh
npm install -g electron-windows-store
```

前提は Windows 10 Anniversary Update 以降・Windows 10 SDK・Node 4 以上（公式記載）。

## electron-windows-store の実行

> **警告**: 管理者権限の PowerShell で実行する手順で、AppX パッケージ生成・証明書作成・インストールまで行い得る。使い捨ての Windows 環境で実行すること。

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

事前に `@electron/packager` などでアプリをパッケージしておく。

## electron-installer-snap のインストールと実行

```sh
npm install --save-dev electron-installer-snap
npx electron-installer-snap --src=out/myappname-linux-x64
```

`snapcraft` が `PATH` にあるターミナルで実行し、`--src` にはパッケージ済みアプリの場所を渡す。

## snapcraft によるビルドとローカルインストール

> **警告**: `--dangerous` は署名されていないローカル snap のインストールを許可する。使い捨ての Linux 環境でのみ実行すること。

```sh
npx create-electron-app@latest my-app
snapcraft
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
electron-packager-hello-world
```

`snap/snapcraft.yaml` が必要（snapcraft ページの YAML 例を参照）。同ページの YAML 例は `command: my-app/my-app --no-sandbox` を使うが、`--no-sandbox` はテスト用途のみとされる（api/command-line-switches）。
