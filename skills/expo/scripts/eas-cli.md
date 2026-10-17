---
source: https://docs.expo.dev/eas/cli/
---

# EAS CLI

EAS CLI のコマンド集。対象は eas-cli 25.0.0 で、バージョニングは Expo SDK とは別（SDK 58 とは連動しない）。

> **警告**: 本ファイルの `eas` コマンドは EAS 上のリソース（ビルド・アップデート・環境変数・ストア提出物）を変更する。実行は使い捨てのテスト用プロジェクト・アカウントを前提とし、本番プロジェクトでは影響を確認してから実行すること。認証は対話ログインか、CI では環境変数 `EXPO_TOKEN` を設定する（値はリポジトリに書かない）。

## インストールと実行

```sh
npm install --global eas-cli
```

Node.js 20.18.3 以降の 20 系、または 22 以降が必要（Node.js 20 は非推奨で警告が出る）。グローバルインストールなしで実行する場合は `npx eas-cli@latest`。yarn は `yarn global add eas-cli`、pnpm は `pnpm add --global eas-cli`、bun は `bun add --global eas-cli`。

## ログイン・ログアウト・確認

```sh
eas login
eas whoami
eas logout
```

ブラウザが使えない環境は `eas login --device`。

## EAS プロジェクトの新規作成

```sh
eas new [PATH] --package-manager npm
```

`-p, --package-manager` は `bun|npm|pnpm|yarn`（既定 npm）。`--sdk-version` で SDK 版を指定。

## 設定内容の確認

```sh
eas config --platform ios --profile production
```

app.json と eas.json を合成して表示。

## ビルド設定の初期化

```sh
eas build:configure --platform all
```

## ビルドの開始

```sh
eas build --platform all --profile production
```

`-e, --profile` の既定は eas.json の "production"（定義時）。`--platform` は `android|ios|all`。

## 非対話・JSON 出力でビルド

```sh
eas build --platform android --profile production --non-interactive --no-wait --json
```

`--json` は `--non-interactive` を含意する。

## ビルドとストア提出の連続実行

```sh
eas build --platform ios --profile production --auto-submit
```

`-s, --auto-submit` は同名の submit profile で提出する。

## ローカルビルド (experimental)

```sh
eas build --platform android --local --output ./out
```

## ビルド一覧・詳細

```sh
eas build:list --platform ios --status finished --limit 10
eas build:view [BUILD_ID]
```

## ビルドの取消

```sh
eas build:cancel [BUILD_ID]
```

## ビルドの削除

> **警告**: ビルドを削除すると元に戻せない。使い捨ての環境で確認してから実行すること。

```sh
eas build:delete [BUILD_ID]
```

## シミュレーター・エミュレーター向けビルドの実行

```sh
eas build:run --latest --platform ios
```

`--id` / `--path` / `--url` でも指定できる。

## 開発ビルドの取得・起動

```sh
eas build:dev --platform ios
```

fingerprint が一致するシミュレーター・エミュレーター向け dev client ビルドを使うか、新規作成する。

## ビルド番号 (version) の管理

```sh
eas build:version:get --platform all
eas build:version:set --platform ios
eas build:version:sync --platform all
```

## 資格情報 (credentials) の管理

```sh
eas credentials
eas credentials:configure-build --platform ios --profile production
```

対話的に iOS / Android の credentials を操作する。

## ストアへの提出

```sh
eas submit --platform ios --profile production --latest
```

`--id` / `--path`（.apk / .aab / .ipa）/ `--url` でも対象を指定できる。`eas build:submit` はエイリアス。

## 提出の一覧・状態・再試行・取消

```sh
eas submit:list
eas submit:status
eas submit:view [SUBMISSION_ID]
eas submit:retry [SUBMISSION_ID]
eas submit:cancel [SUBMISSION_ID]
```

## ストアメタデータの検証・取得・反映

```sh
eas metadata:lint
eas metadata:pull
```

## ストアメタデータの反映

> **警告**: `metadata:push` はローカルのストア設定を App Store などのストア側へ同期する。テスト用のアプリ・アカウントで確認してから実行すること。

```sh
eas metadata:push --profile production
```

## アップデート (EAS Update) の設定

```sh
eas update:configure --platform all
```

## アップデートの公開

> **警告**: 公開したアップデートは、対象 channel のユーザーへ配信され得る。テスト用の branch / channel で確認してから実行すること。

```sh
eas update --channel preview --message "Fix typo" --environment preview
```

`--branch` / `--channel` / `-m, --message` / `-p, --platform`（既定 all）。`--environment` は Expo SDK 55 以降のプロジェクトで必須。`--auto` は現在の git branch とコミットメッセージを使う。`--rollout-percentage` は 1 から 100 の整数（既定 100）。

## アップデート一覧・詳細

```sh
eas update:list
eas update:view GROUPID
```

## アップデートのロールバック

> **警告**: ロールバックは配信中のアップデートを置き換える。使い捨ての channel で確認してから実行すること。

```sh
eas update:rollback [GROUPID]
eas update:roll-back-to-embedded --channel preview --runtime-version <value>
eas update:republish --group <value>
```

## アップデートの削除

> **警告**: アップデートグループ内の全アップデートを削除する。取り消せない。

```sh
eas update:delete GROUPID
```

## 環境変数の設定

```sh
eas env:set production --name MY_VAR --value my-value --visibility plaintext
```

`--visibility` は `plaintext|sensitive|secret`、`--type` は `string|file`、`--scope` は `project|account`（既定 project）。機密値をシェル履歴に残さないよう注意。

## 環境変数の参照

```sh
eas env:list production
eas env:get production --variable-name MY_VAR
```

`env:list` の `--include-sensitive` は機密値を表示する。

## 環境変数の .env への取得

```sh
eas env:pull production --path .env.local
```

既定の出力先は **.env.local**。

## 環境変数のコマンド実行

```sh
eas env:exec production "npx expo export"
```

選択した環境の環境変数を付けて bash コマンドを実行する。

## 環境変数の一括反映

> **警告**: `--force` は確認なしで既存の変数を上書きする。使い捨てのプロジェクトで確認してから実行すること。

```sh
eas env:push production --path .env.local --force
```

## 環境変数の削除

> **警告**: 環境変数を削除すると、それに依存するビルドやアップデートが失敗し得る。

```sh
eas env:delete production --variable-name MY_VAR
```

## ワークフローの検証・作成

```sh
eas workflow:validate .eas/workflows/build.yml
eas workflow:create [NAME] --template build
```

`--template` は `build|update|deploy|custom`。

## ワークフローの実行

> **警告**: `--ref` を指定しない場合、ローカルのプロジェクトディレクトリ全体が EAS サーバーへアップロードされる。機密ファイルを含めないこと。

```sh
eas workflow:run .eas/workflows/build.yml --wait
```

`-F, --input` でワークフローの入力、`--ref` で Git 参照を指定。`--ssh` は EXPERIMENTAL。

## ワークフロー実行の確認・取消

```sh
eas workflow:runs --status IN_PROGRESS
eas workflow:status [WORKFLOW_RUN_ID] --wait
eas workflow:view [ID]
eas workflow:logs [ID] --all-steps
eas workflow:cancel
```
