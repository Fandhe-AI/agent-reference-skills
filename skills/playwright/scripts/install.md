# install

Playwright およびブラウザバイナリのインストール・更新・管理。

## システム要件

- Node.js: latest 22.x, 24.x or 26.x
- Windows 11+, Windows Server 2019+ or Windows Subsystem for Linux (WSL)
- macOS 14 (Sonoma) or later
- WebKit は v1.59 で macOS 14 サポートを削除（release-notes-js.md）
- Debian 12 / 13, Ubuntu 22.04 / 24.04 / 26.04 (x86-64 or arm64)

出典: intro-js.md（v1.64.1）。

## 新規プロジェクトのセットアップ（npm）

```sh
npm init playwright@latest
```

対話形式でテストディレクトリ・CI 設定・ブラウザのインストールを選択できる。

## 新規プロジェクトのセットアップ（yarn）

```sh
yarn create playwright
```

## 新規プロジェクトのセットアップ（pnpm）

```sh
pnpm create playwright
```

## ブラウザのインストール（全ブラウザ）

```sh
npx playwright install
```

## ブラウザのインストール（指定ブラウザ）

```sh
npx playwright install chromium
npx playwright install firefox webkit
```

## OS 依存パッケージを含むブラウザのインストール

```sh
npx playwright install --with-deps
npx playwright install chromium --with-deps
```

Linux 環境で Chromium/Firefox/WebKit を動かすために必要なシステムパッケージも一緒にインストールする。

## 未使用ブラウザを削除せずにインストール

```sh
npx playwright install --no-remove
```

未使用のブラウザを削除しない（`install` オプション。出典: test-cli-js.md）。

## OS 依存パッケージのみインストール（ブラウザバイナリなし）

```sh
npx playwright install-deps
npx playwright install-deps chromium
```

## ブラウザの強制再インストール

```sh
npx playwright install --force
```

> **警告**: 既存のブラウザバイナリを上書きする。

## ドライラン（インストール対象の確認のみ）

```sh
npx playwright install --dry-run
```

## Playwright のアップデート（npm）

```sh
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

## Playwright のアップデート（yarn）

```sh
yarn add --dev @playwright/test@latest
yarn playwright install --with-deps
```

## Playwright のアップデート（pnpm）

```sh
pnpm install --save-dev @playwright/test@latest
pnpm exec playwright install --with-deps
```

## ブラウザのアンインストール

```sh
npx playwright uninstall
```

> **警告**: インストール済みの Playwright ブラウザバイナリをすべて削除する。

## キャッシュのクリア

```sh
npx playwright clear-cache
```

> **警告**: キャッシュされたブラウザバイナリおよび Playwright の成果物を削除する。

## バージョン確認

```sh
npx playwright --version
```
