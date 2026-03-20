# GitHub Actions -- 再利用可能ワークフロー

ワークフローの再利用（workflow_call）のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/sharing-automations/reusing-workflows

---

## 概要

再利用可能ワークフローを使用すると、ワークフローの定義を共有し、重複を排除できる。`.github/workflows/` ディレクトリに配置されたワークフローファイルを他のワークフローから呼び出す。

---

## 再利用可能ワークフローの定義

`on: workflow_call` トリガーを使用して再利用可能ワークフローを定義する。

```yaml
# .github/workflows/reusable-deploy.yml
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        description: 'Deploy target environment'
        required: true
        type: string
      version:
        description: 'Version to deploy'
        required: false
        type: string
        default: 'latest'
    secrets:
      deploy_key:
        description: 'Deployment SSH key'
        required: true
    outputs:
      deploy_url:
        description: 'Deployed URL'
        value: ${{ jobs.deploy.outputs.url }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4
      - id: deploy
        run: |
          echo "Deploying ${{ inputs.version }} to ${{ inputs.environment }}"
          echo "url=https://${{ inputs.environment }}.example.com" >> $GITHUB_OUTPUT
        env:
          DEPLOY_KEY: ${{ secrets.deploy_key }}
```

---

## 入力（inputs）の定義

| プロパティ | 必須 | 説明 |
|---|---|---|
| `description` | いいえ | 入力の説明 |
| `required` | いいえ | 必須かどうか。デフォルト: `false` |
| `type` | はい | データ型: `boolean`, `number`, `string` |
| `default` | いいえ | デフォルト値 |

アクセス方法: `${{ inputs.input_name }}`

---

## シークレット（secrets）の定義

| プロパティ | 必須 | 説明 |
|---|---|---|
| `description` | いいえ | シークレットの説明 |
| `required` | いいえ | 必須かどうか。デフォルト: `false` |

アクセス方法: `${{ secrets.secret_name }}`

---

## 出力（outputs）の定義

再利用可能ワークフローの出力は、ジョブ出力からマッピングする必要がある。

```yaml
on:
  workflow_call:
    outputs:
      result:
        description: 'Build result'
        value: ${{ jobs.build.outputs.result }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      result: ${{ steps.build.outputs.result }}
    steps:
      - id: build
        run: echo "result=success" >> $GITHUB_OUTPUT
```

出力の流れ: ステップ出力 -> ジョブ出力 -> ワークフロー出力

---

## 呼び出し構文

### 同一リポジトリ

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
      version: '1.0.0'
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}
```

- 呼び出し元と同じコミットのワークフローファイルを使用する
- コンテキストや式は使用できない

### 別リポジトリ

```yaml
jobs:
  deploy:
    uses: org/repo/.github/workflows/reusable-deploy.yml@main
    with:
      environment: production
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}
```

`{owner}/{repo}/.github/workflows/{filename}@{ref}` の形式で指定する。

`{ref}` に使用可能な値:
- ブランチ名: `@main`
- タグ名: `@v1.0.0`
- コミット SHA: `@8e5e7e5ab8b370d6c329ec480221332ada57f0ab`（最も安全）

注意: タグとブランチが同名の場合、タグが優先される。

---

## シークレットの継承

同じ Organization/Enterprise 内のワークフローでは、`secrets: inherit` で全シークレットを一括で渡せる。

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
    secrets: inherit  # 全シークレットを継承
```

---

## 呼び出し元での出力参照

```yaml
jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploy URL is ${{ needs.build.outputs.deploy_url }}"
```

---

## マトリクス戦略との組み合わせ

```yaml
jobs:
  deploy:
    strategy:
      matrix:
        environment: [staging, production]
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: ${{ matrix.environment }}
    secrets: inherit
```

注意: マトリクス戦略を使用した場合、出力は最後に成功したワークフロー実行の値になる。

---

## ネスト制限

| 項目 | 制限 |
|---|---|
| ネストの最大レベル | 呼び出し元 1 + ネストされた再利用可能ワークフロー 最大 9 = 合計 10 レベル |
| ループ | 禁止（循環呼び出し不可） |
| パーミッション | チェーン内で維持または制限のみ可能（昇格不可） |
| シークレット | 直接呼び出されたワークフローにのみ渡される |

---

## 制限事項

1. **ワークフローファイルの配置**: `.github/workflows/` ディレクトリのルートに配置する必要がある（サブディレクトリは不可）
2. **環境シークレット**: `workflow_call` 経由で環境シークレットを渡す場合、環境レベルのシークレットが呼び出し元のシークレットを上書きする
3. **ステップ出力の公開**: ステップ出力はジョブ出力にマッピングしてからワークフロー出力として公開する必要がある
4. **`env` コンテキスト**: 呼び出し元の `env` コンテキストは再利用可能ワークフローに伝播しない
5. **同時呼び出し**: 1 つのワークフローから最大 20 個の再利用可能ワークフローを呼び出し可能

---

## ベストプラクティス

1. **コミット SHA での参照**: 安定性とセキュリティのためにコミット SHA を使用する
2. **出力の適切なマッピング**: ステップ -> ジョブ -> ワークフロー の出力マッピングを確実に行う
3. **`secrets: inherit` の適切な使用**: 信頼できるワークフローにのみ全シークレットを継承させる
4. **ドキュメント化**: 入力、シークレット、出力の `description` を記載する
5. **バージョニング**: メジャーバージョンタグ（`@v1`）を使用し、破壊的変更時にバージョンを上げる
