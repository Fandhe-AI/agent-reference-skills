# マージ戦略 (Merge Strategies)

Pull Request のマージ方法、自動マージ、マージキューに関するリファレンスです。

## マージ方法の比較

| 方法 | コミット履歴 | マージコミット | 用途 |
|------|-------------|---------------|------|
| Merge commit | すべて保持 | 作成される | 完全な履歴を残したい場合 |
| Squash and merge | 1 つに統合 | なし（fast-forward） | クリーンな履歴を維持したい場合 |
| Rebase and merge | 個別に保持（リベース） | なし | リニアな履歴を維持したい場合 |

## Merge Commit（マージコミット）

### 仕組み

feature ブランチのすべてのコミットが base ブランチに追加され、さらにマージコミットが作成されます。`--no-ff`（non-fast-forward）オプションが使用されます。

### Git での等価操作

```bash
git checkout main
git merge --no-ff feature-branch
```

### コミット履歴の例

```
*   Merge pull request #123 from user/feature
|\
| * commit C (feature)
| * commit B (feature)
| * commit A (feature)
|/
* previous commit (main)
```

### 適している場面

- 開発の全履歴を残したい場合
- いつ、どのように変更が統合されたかを追跡したい場合
- ブランチの分岐と統合の関係を視覚化したい場合

## Squash and Merge（スカッシュマージ）

### 仕組み

feature ブランチの複数のコミットが **1 つのコミット** に統合されて base ブランチにマージされます。fast-forward マージが使用されるため、マージコミットは作成されません。

### Git での等価操作

```bash
git checkout main
git merge --squash feature-branch
git commit
```

### コミット履歴の例

```
* New feature (#123) ← squash された 1 コミット
* previous commit (main)
```

### コミットメッセージの設定

リポジトリ設定でデフォルトのコミットメッセージ形式を選択できます:

| オプション | 内容 |
|-----------|------|
| PR title and description | PR のタイトルと説明 |
| PR title and commit details | PR のタイトル + 個別コミットの詳細 |
| Default message | デフォルトのメッセージ |

### 適している場面

- 作業中の細かいコミット（typo 修正、WIP など）を整理したい場合
- メインブランチのコミット履歴をクリーンに保ちたい場合
- 1 つの機能 = 1 つのコミットとして管理したい場合

### 注意点

- 長期間の開発ブランチでは推奨されない（将来の PR でコンフリクトが増加する可能性がある）
- 個別のコミット履歴は失われる（元のブランチが削除された場合）

## Rebase and Merge（リベースマージ）

### 仕組み

feature ブランチの個々のコミットが base ブランチの先頭にリベースされます。マージコミットは作成されず、リニアな履歴が維持されます。

### Git での等価操作

```bash
git checkout feature-branch
git rebase main
git checkout main
git merge --ff-only feature-branch
```

### コミット履歴の例

```
* commit C' (rebased)
* commit B' (rebased)
* commit A' (rebased)
* previous commit (main)
```

### 重要な注意点

- GitHub のリベースは常にコミッターの情報を更新し、**新しいコミット SHA を生成**する
- 元のコミットとは異なる SHA になるため、ローカルの参照と一致しなくなる
- マージコンフリクトがある場合は自動リベースできない
- リベース結果がマージ結果と異なる場合も自動リベースできない

### 適している場面

- リニアな履歴を維持しつつ、個々のコミットも保持したい場合
- `git bisect` などのツールを効果的に使いたい場合

## 自動マージ (Auto-merge)

すべての必須条件（ステータスチェック、レビュー承認）が満たされた時点で自動的にマージする機能です。

### 前提条件

- リポジトリ設定で **Allow auto-merge** が有効
- ブランチ保護ルールが設定されていること（最低限必須）

### 設定方法

```bash
# CLI で自動マージを有効化（squash）
gh pr merge 123 --auto --squash

# CLI で自動マージを有効化（merge commit）
gh pr merge 123 --auto --merge

# CLI で自動マージを有効化（rebase）
gh pr merge 123 --auto --rebase

# 自動マージを無効化
gh pr merge 123 --disable-auto
```

Web UI: PR ページの **Enable auto-merge** ボタンをクリックし、マージ方法を選択。

### 動作

1. 自動マージを有効にする
2. 必須のステータスチェックとレビュー承認を待つ
3. すべての条件が満たされると自動的にマージされる

## マージキュー (Merge Queue)

マージキューは、PR を順番にマージし、各 PR が最新の base ブランチとの互換性を持つことを保証する機能です。

### 前提条件

- ブランチ保護ルールまたは Ruleset で **Require merge queue** が有効

### 仕組み

1. PR がマージキューに追加される
2. キュー内の PR は、前の PR のマージ後にベースブランチとの組み合わせでテストされる
3. ステータスチェックが成功すると、順番にマージされる
4. チェックが失敗した PR はキューから削除される

### メリット

- 「マージ後にテストが壊れる」問題を防止
- 複数の PR を効率的にマージ
- base ブランチが常にグリーン（テスト通過状態）に保たれる

```bash
# マージキューに追加
gh pr merge 123 --merge-queue
```

## マージ方法の選択ガイド

| シナリオ | 推奨マージ方法 |
|---------|--------------|
| 小さな機能追加、バグ修正 | Squash and merge |
| 複数の意味のあるコミットを含む大きな変更 | Merge commit |
| リニアな履歴を重視するプロジェクト | Rebase and merge |
| チームで統一したい場合 | 1 つの方法に統一し、他を無効化 |
| CI が重要なプロジェクト | Auto-merge + Merge queue |

## リポジトリでのマージ設定

**Settings** > **General** > **Pull Requests** で以下を設定:

- **Allow merge commits**: マージコミットを許可
- **Allow squash merging**: Squash マージを許可
- **Allow rebase merging**: Rebase マージを許可
- **Automatically delete head branches**: マージ後にブランチを自動削除

> 少なくとも 1 つのマージ方法を有効にする必要があります。

## 間接マージ (Indirect Merges)

PR の head ブランチが、外部的に base ブランチに直接またはマージコミット経由でマージされた場合、PR は自動的にマージ済みとなります。

> Squash やリベースで間接的にマージされた場合は、この自動マージは発生しません。

## 必要な権限

すべてのマージ方法には、リポジトリへの **Write** アクセス権限が必要です。

## 参考リンク

- [About pull request merges - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)
