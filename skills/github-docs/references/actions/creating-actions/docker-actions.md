# GitHub Actions -- Docker コンテナアクション

Docker コンテナアクションの作成方法のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-docker-container-action

---

## 概要

Docker コンテナアクションは、Docker コンテナ内でコードを実行する。任意の言語やツールを使用でき、一貫した環境を保証する。Linux ランナーでのみ動作する。

---

## 必要なファイル

### 1. action.yml

```yaml
name: 'Hello World Docker Action'
description: 'Greet someone and record the time'
author: 'Your Name'

inputs:
  who-to-greet:
    description: 'Who to greet'
    required: true
    default: 'World'

outputs:
  time:
    description: 'The time we greeted you'

runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.who-to-greet }}
```

### runs セクションのキー

| キー | 必須 | 説明 |
|---|---|---|
| `using` | はい | `docker` を指定 |
| `image` | はい | Docker イメージ。`Dockerfile`（ローカルビルド）または `docker://IMAGE:TAG`（Docker Hub） |
| `args` | いいえ | コンテナの ENTRYPOINT に渡す引数の配列 |
| `entrypoint` | いいえ | Dockerfile の ENTRYPOINT を上書き |
| `env` | いいえ | コンテナ内の環境変数 |
| `pre-entrypoint` | いいえ | `entrypoint` の前に実行されるセットアップスクリプト |
| `post-entrypoint` | いいえ | `entrypoint` の後に実行されるクリーンアップスクリプト |

### image の指定方法

```yaml
# ローカル Dockerfile からビルド
image: 'Dockerfile'

# Docker Hub のイメージを直接使用
image: 'docker://alpine:3.18'

# GitHub Container Registry のイメージ
image: 'docker://ghcr.io/owner/image:tag'
```

---

### 2. Dockerfile

```dockerfile
# ベースイメージ
FROM alpine:3.18

# 必要なパッケージのインストール
RUN apk add --no-cache bash curl jq

# エントリポイントスクリプトのコピー
COPY entrypoint.sh /entrypoint.sh

# 実行権限の付与
RUN chmod +x /entrypoint.sh

# エントリポイントの設定
ENTRYPOINT ["/entrypoint.sh"]
```

---

### 3. エントリポイントスクリプト

```bash
#!/bin/sh -l

# 入力はコマンドライン引数として渡される（args で指定した順）
echo "Hello $1"

# 現在時刻を取得
time=$(date)

# 出力の設定（GITHUB_OUTPUT ファイルに書き込む）
echo "time=$time" >> $GITHUB_OUTPUT
```

重要: エントリポイントスクリプトには実行権限が必要。

```bash
git add entrypoint.sh
git update-index --chmod=+x entrypoint.sh
```

---

## 入力の受け渡し

### args 経由（コマンドライン引数）

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.who-to-greet }}
    - ${{ inputs.greeting-style }}
```

エントリポイント内では `$1`, `$2`, ... で参照する。

### 環境変数経由

入力は自動的に `INPUT_<NAME>` 環境変数としてもコンテナ内で利用可能。名前は大文字に変換され、スペースはアンダースコアになる。

```bash
#!/bin/sh -l
# INPUT_WHO-TO-GREET 環境変数として自動的に設定される
echo "Hello $INPUT_WHO_TO_GREET"
```

### env キーで明示的に指定

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  env:
    CUSTOM_VAR: 'value'
    API_KEY: ${{ inputs.api-key }}
```

---

## 出力の設定

`$GITHUB_OUTPUT` ファイルに `key=value` 形式で書き込む。

```bash
#!/bin/sh -l
echo "result=success" >> $GITHUB_OUTPUT
echo "version=1.0.0" >> $GITHUB_OUTPUT
```

複数行の出力:

```bash
#!/bin/sh -l
{
  echo 'json_data<<EOF'
  echo '{"key": "value"}'
  echo EOF
} >> $GITHUB_OUTPUT
```

---

## ファイルシステムのマウント

| ホストパス | コンテナパス | 説明 |
|---|---|---|
| `$GITHUB_WORKSPACE` | `/github/workspace` | ワーキングディレクトリ（リポジトリの内容） |
| `$HOME` | `/github/home` | ホームディレクトリ |
| `$GITHUB_OUTPUT` | `/github/output` | 出力ファイル |
| `$GITHUB_ENV` | `/github/env` | 環境変数ファイル |

---

## 実行ランナーの要件

| 要件 | 詳細 |
|---|---|
| OS | Linux のみ（`ubuntu-latest` 等） |
| Docker | GitHub ホステッドランナーにはプリインストール |
| セルフホステッド | Docker がインストールされている必要がある |

Windows や macOS のランナーでは Docker コンテナアクションは使用できない。

---

## リリースとバージョニング

```bash
git add action.yml Dockerfile entrypoint.sh
git commit -m "My Docker action"
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --follow-tags
```

---

## ワークフローでの使用例

### パブリックアクション

```yaml
jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - uses: owner/hello-world-docker-action@v1
        with:
          who-to-greet: 'Mona the Octocat'
```

### プライベート/ローカルアクション

```yaml
jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./
        with:
          who-to-greet: 'Mona the Octocat'
```

ローカルアクションは先に `actions/checkout` でリポジトリをチェックアウトする必要がある。

---

## Docker Hub イメージを直接使用

Dockerfile を使わずに既存の Docker イメージを直接使用することもできる。

```yaml
runs:
  using: 'docker'
  image: 'docker://alpine:3.18'
  entrypoint: '/bin/sh'
  args:
    - '-c'
    - 'echo Hello $INPUT_WHO_TO_GREET'
```

---

## ベストプラクティス

1. **軽量なベースイメージを使用**: `alpine` 等の軽量イメージで起動時間を短縮
2. **マルチステージビルド**: ビルドツールとランタイムを分離してイメージサイズを削減
3. **固定バージョンのベースイメージ**: `alpine:3.18` のようにバージョンを固定して再現性を確保
4. **実行権限の確認**: エントリポイントスクリプトに `chmod +x` を忘れない
5. **ENTRYPOINT vs CMD**: アクションでは `ENTRYPOINT` を使用する（`CMD` は `args` で上書きされる）
