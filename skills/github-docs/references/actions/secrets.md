# GitHub Actions -- シークレット管理

ワークフローでのシークレット管理のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions

---

## 概要

シークレットは暗号化された環境変数で、トークン、パスワード、API キー等の機密情報をワークフローに安全に渡すために使用する。

---

## シークレットへのアクセス

### secrets コンテキスト

```yaml
steps:
  - name: アクションの入力として渡す
    uses: some/action@v1
    with:
      token: ${{ secrets.MY_TOKEN }}

  - name: 環境変数として渡す
    run: ./deploy.sh
    env:
      API_KEY: ${{ secrets.API_KEY }}
```

### 重要な制約

- **`if:` 条件で直接参照できない**: 環境変数経由で使用する

```yaml
# NG: 直接参照
- if: secrets.MY_SECRET != ''  # 動作しない

# OK: 環境変数経由
jobs:
  example:
    env:
      HAS_SECRET: ${{ secrets.MY_SECRET != '' }}
    steps:
      - if: env.HAS_SECRET == 'true'
        run: echo "Secret is set"
```

---

## シークレットの種類

### リポジトリシークレット

特定のリポジトリのワークフローでのみ利用可能。

設定方法:
1. Settings -> Secrets and variables -> Actions -> Secrets タブ -> New repository secret
2. CLI: `gh secret set SECRET_NAME`

### 環境シークレット

特定のデプロイ環境に紐づくシークレット。環境の保護ルール（レビュー必須等）と組み合わせて使用可能。

設定方法:
1. Settings -> Environments -> 環境を選択 -> Environment secrets で追加
2. CLI: `gh secret set --env ENV_NAME SECRET_NAME`

```yaml
jobs:
  deploy:
    environment: production  # この環境のシークレットが利用可能になる
    steps:
      - run: ./deploy.sh
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

### Organization シークレット

Organization 内の複数リポジトリで共有可能。アクセスポリシーで対象リポジトリを制御する。

設定方法:
1. Organization Settings -> Secrets and variables -> Actions -> New organization secret
2. CLI: `gh secret set --org ORG_NAME SECRET_NAME`

アクセスポリシー:
- 全リポジトリ（`--visibility all`）
- プライベートリポジトリのみ（`--visibility private`）
- 指定リポジトリのみ（`--repos REPO1,REPO2`）

注意: GitHub Free プランでは、Organization レベルのシークレットはプライベートリポジトリからアクセスできない。

---

## GITHUB_TOKEN

全ワークフローで自動的に利用可能な特殊なシークレット。

```yaml
steps:
  - uses: actions/checkout@v4
    with:
      token: ${{ secrets.GITHUB_TOKEN }}

  - run: gh pr comment --body "Deployed!"
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

詳細は [permissions.md](./permissions.md) を参照。

---

## 名前付けルール

| ルール | 詳細 |
|---|---|
| 使用可能文字 | 英数字（`A-Z`, `a-z`, `0-9`）とアンダースコア（`_`） |
| 先頭文字 | `GITHUB_` プレフィックスは使用不可 |
| 大文字小文字 | 区別しない |
| 一意性 | 同じスコープ内で一意である必要がある |

---

## サイズと数の制限

| 項目 | 制限 |
|---|---|
| シークレットのサイズ | 最大 48 KB |
| リポジトリシークレットの数 | 最大 100 個 |
| Organization シークレットの数 | 最大 1,000 個 |
| 環境シークレットの数 | 最大 100 個 |
| ワークフローあたりの参照可能なシークレット数 | 最大 100 個 |

---

## 大きなシークレットの取り扱い

48 KB を超えるシークレットには以下のワークアラウンドを使用する:

### GPG 暗号化方式

1. シークレットファイルを GPG で暗号化する
2. パスフレーズをリポジトリシークレットとして保存する
3. 暗号化されたファイルをリポジトリにコミットする
4. ワークフロー内で復号する

```yaml
steps:
  - uses: actions/checkout@v4
  - run: gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" --output secret.json secret.json.gpg
    env:
      PASSPHRASE: ${{ secrets.GPG_PASSPHRASE }}
```

### Base64 エンコード方式

バイナリデータの場合:

```yaml
steps:
  - run: echo "$ENCODED_SECRET" | base64 --decode > secret.bin
    env:
      ENCODED_SECRET: ${{ secrets.BINARY_SECRET }}
```

注意: GitHub はこれらのワークアラウンドで使用する復号済みの値をログで自動マスクしない。

---

## シークレットのマスキング

### 自動マスク

GitHub シークレットとして登録された値は、ログ出力時に自動的に `***` でマスクされる。

### 手動マスク

GitHub シークレット以外の機密情報もマスクできる:

```yaml
steps:
  - run: |
      TOKEN=$(generate-token)
      echo "::add-mask::$TOKEN"
      echo "Using token: $TOKEN"  # ログでは *** と表示される
```

---

## フォークリポジトリとシークレット

- **`GITHUB_TOKEN` 以外のシークレット**はフォークからの PR のランナーに渡されない
- **`GITHUB_TOKEN`** はフォーク PR でも利用可能だが、読み取り専用（制限付き権限）
- `pull_request_target` イベントではデフォルトブランチのコンテキストで実行されるためシークレットにアクセスできるが、セキュリティリスクに注意

---

## 再利用可能ワークフローとシークレット

シークレットは再利用可能ワークフローに自動的に渡されない。明示的に渡す必要がある:

```yaml
jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}

    # または全シークレットを継承
    secrets: inherit
```

---

## セキュリティベストプラクティス

1. **最小権限の原則**: 必要なシークレットのみをワークフローに渡す
2. **コマンドライン引数に渡さない**: プロセスリストで公開される可能性がある。環境変数を使用する

```yaml
# NG
- run: curl -H "Authorization: token ${{ secrets.TOKEN }}" https://api.example.com

# OK
- run: curl -H "Authorization: token $TOKEN" https://api.example.com
  env:
    TOKEN: ${{ secrets.TOKEN }}
```

3. **構造化データを避ける**: JSON 等の構造化データ全体をシークレットにすると、マスキングが不完全になる場合がある
4. **定期的なローテーション**: シークレットは定期的に更新する
5. **シークレットの登録を確認**: `::add-mask::` で手動マスクを追加して防御層を増やす
6. **監査ログを確認**: Organization のシークレットアクセスを監査ログで監視する
