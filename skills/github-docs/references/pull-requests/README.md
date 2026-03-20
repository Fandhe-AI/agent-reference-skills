# GitHub Pull Request ワークフロー (Pull Requests Workflow)

Pull Request（PR）は、GitHub でのコードレビューとコラボレーションの中心となる機能です。ブランチの変更を提案し、レビューを経てマージするまでの一連のワークフローをカバーします。

## 目次

| ファイル | 説明 | 主な内容 |
|---------|------|---------|
| [creating.md](./creating.md) | PR の作成 | UI・CLI・API からの作成、ドラフト PR、テンプレート |
| [reviewing.md](./reviewing.md) | コードレビュー | レビュータイプ、行コメント、サジェスチョン |
| [merging.md](./merging.md) | マージ戦略 | マージコミット、Squash、Rebase、自動マージ |
| [conflicts.md](./conflicts.md) | コンフリクト解決 | UI での解決、コマンドラインでの解決 |
| [code-owners.md](./code-owners.md) | CODEOWNERS | コードオーナーの設定と自動レビュー割り当て |

## PR ワークフローの概要

```
1. ブランチを作成
   └─> 2. コードを変更・コミット
        └─> 3. PR を作成（またはドラフト PR）
             └─> 4. レビューをリクエスト
                  └─> 5. コードレビュー
                       ├─> Approve: 承認
                       ├─> Request Changes: 修正依頼 → 修正 → 再レビュー
                       └─> Comment: コメントのみ
                            └─> 6. マージ（Merge / Squash / Rebase）
                                 └─> 7. ブランチ削除（任意）
```

## クイックリファレンス

### PR の作成（CLI）

```bash
# 基本的な PR 作成
gh pr create --title "タイトル" --body "説明"

# ドラフト PR
gh pr create --title "WIP: タイトル" --draft

# レビュアーを指定
gh pr create --title "タイトル" --reviewer user1,user2
```

### PR の操作（CLI）

```bash
# PR の一覧
gh pr list

# PR の詳細表示
gh pr view 123

# PR のチェックアウト
gh pr checkout 123

# PR のマージ
gh pr merge 123 --squash
```

## 参考リンク

- [GitHub Pull Requests ドキュメント](https://docs.github.com/en/pull-requests)
