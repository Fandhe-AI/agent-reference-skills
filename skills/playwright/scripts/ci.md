# ci

CI/CD 環境での Playwright テスト実行。Docker・シャーディング・レポートマージを含む。

## CI 環境でのセットアップ（npm）

```sh
npm ci
npx playwright install --with-deps
```

`npm ci` で依存関係を固定インストールし、`--with-deps` でブラウザと OS 依存パッケージを一括インストールする。

## テストの実行

```sh
npx playwright test
```

## Docker イメージでの実行

```sh
docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.58.2-noble /bin/bash
```

> **警告**: `--ipc=host` は必須。省略すると Chromium が共有メモリ不足でクラッシュする場合がある。

## Docker でのセキュア実行（信頼できないコンテンツ）

```sh
docker run -it --rm --ipc=host \
  --user pwuser \
  --security-opt seccomp=seccomp_profile.json \
  mcr.microsoft.com/playwright:v1.58.2-noble /bin/bash
```

> **警告**: 信頼できないサイトのスクレイピングやテストを行う場合は必ずセキュリティ制限を付与する。

## Playwright リモートサーバーの起動（Docker）

```sh
docker run -p 3000:3000 --rm --init -it \
  --workdir /home/pwuser --user pwuser \
  mcr.microsoft.com/playwright:v1.58.2-noble \
  /bin/sh -c "npx -y playwright@1.58.2 run-server --port 3000 --host 0.0.0.0"
```

## リモートサーバーへの接続

```sh
PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/ npx playwright test
```

## シャーディング（テストの分散実行）

```sh
# 4 台に分割して実行する場合（各マシンで異なるシャードインデックスを指定）
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

シャードはファイル単位で分割される。

## シャードレポートのマージ

```sh
npx playwright merge-reports --reporter html ./all-blob-reports
```

各シャードの blob レポートを収集後、単一の HTML レポートに統合する。

## Linux のヘッドモード実行（xvfb 使用）

```sh
xvfb-run npx playwright test
```

GUI なしの Linux 環境でヘッドモードのテストを実行する際に使用する。

## 変更差分のみテスト実行（GitHub Actions 向け）

```sh
npx playwright test --only-changed=origin/$GITHUB_BASE_REF
```
