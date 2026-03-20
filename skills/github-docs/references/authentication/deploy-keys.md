# デプロイキー (Deploy Keys)

デプロイキーは、単一のリポジトリへのアクセスを許可する SSH キーです。CI/CD パイプラインやサーバーからの自動デプロイなど、特定のリポジトリに限定したアクセスが必要な場面で使用します。

## 概要

- 1 つのデプロイキーは **1 つのリポジトリ** にのみ関連付けられる
- **読み取り専用**（デフォルト）または **読み書き可能** で設定できる
- ユーザーアカウントに紐づかず、リポジトリに直接関連付けられる
- SSH 公開鍵と同じ形式を使用する

## デプロイキーの追加

### Web UI から

1. リポジトリの **Settings** > **Deploy keys** に移動
2. **Add deploy key** をクリック
3. タイトルを入力
4. SSH 公開鍵を貼り付け
5. 書き込みアクセスが必要な場合は **Allow write access** にチェック
6. **Add key** をクリック

### API から

```bash
# デプロイキーの追加
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/keys \
  -d '{
    "title": "deploy-key-name",
    "key": "ssh-ed25519 AAAA...",
    "read_only": true
  }'
```

```bash
# デプロイキーの一覧取得
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/keys
```

```bash
# デプロイキーの削除
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/keys/KEY_ID
```

### GitHub CLI から

```bash
# デプロイキーを追加
gh repo deploy-key add ~/.ssh/deploy_key.pub --repo OWNER/REPO --title "my-deploy-key"

# 書き込み権限付き
gh repo deploy-key add ~/.ssh/deploy_key.pub --repo OWNER/REPO --title "my-deploy-key" --allow-write

# デプロイキーの一覧
gh repo deploy-key list --repo OWNER/REPO

# デプロイキーの削除
gh repo deploy-key delete KEY_ID --repo OWNER/REPO
```

## SSH キーの生成（デプロイキー用）

専用のキーペアを生成します:

```bash
ssh-keygen -t ed25519 -C "deploy-key-for-repo-name" -f ~/.ssh/deploy_key_repo_name
```

> パスフレーズなしで生成する場合は、プロンプトで空白のまま Enter を押します（自動化での使用時）。

## SSH 設定（複数デプロイキーの管理）

複数のリポジトリに対してそれぞれ異なるデプロイキーを使用する場合、`~/.ssh/config` で設定します:

```
Host github-repo-a
  HostName github.com
  User git
  IdentityFile ~/.ssh/deploy_key_repo_a
  IdentitiesOnly yes

Host github-repo-b
  HostName github.com
  User git
  IdentityFile ~/.ssh/deploy_key_repo_b
  IdentitiesOnly yes
```

リモート URL はホストエイリアスを使用して設定します:

```bash
git remote set-url origin git@github-repo-a:OWNER/REPO-A.git
```

## 他の認証方法との比較

| 特徴 | デプロイキー | SSH キー（ユーザー） | PAT | マシンユーザー |
|------|-------------|--------------------|----|--------------|
| スコープ | 単一リポジトリ | アカウント全体 | 設定による | アカウント全体 |
| ユーザーアカウント | 不要 | 必要 | 必要 | 専用アカウント必要 |
| 書き込みアクセス | オプション | あり | スコープによる | あり |
| 複数リポジトリ | キーごとに 1 つ | 全リポジトリ | 設定による | 全リポジトリ |
| ユーザーの退職影響 | なし | キーも無効化 | トークンも無効化 | アカウント管理が必要 |
| シート消費 | なし | 1 シート | 1 シート | 1 シート |

## ユースケース

| シナリオ | 推奨方法 |
|---------|---------|
| CI/CD からの単一リポジトリデプロイ | デプロイキー（読み取り専用） |
| CI/CD からの単一リポジトリへの push | デプロイキー（書き込み可能） |
| 複数リポジトリへのアクセスが必要な自動化 | GitHub App または マシンユーザー |
| 一時的な API アクセス | Fine-grained PAT |

## セキュリティのベストプラクティス

1. **読み取り専用を優先**: 書き込みアクセスは本当に必要な場合のみ許可する
2. **専用キーの生成**: リポジトリごとに個別のキーペアを使用する
3. **同一公開鍵の再利用禁止**: 1 つの公開鍵を複数のリポジトリや GitHub アカウントで共用できない
4. **キーのローテーション**: 定期的にキーを更新する
5. **秘密鍵の保護**: 適切なファイルパーミッション（`chmod 600`）を設定する
6. **不要なキーの削除**: 使用しなくなったデプロイキーは速やかに削除する

## 参考リンク

- [Managing deploy keys - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)
