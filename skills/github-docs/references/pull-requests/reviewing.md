# コードレビュー (Pull Request Reviews)

Pull Request のレビュープロセス、レビュータイプ、行コメント、サジェスチョン機能に関するリファレンスです。

## レビュータイプ

レビューを送信する際、3 つのステータスから選択します:

| タイプ | 説明 | 用途 |
|--------|------|------|
| **Comment** | フィードバックを共有するが、承認も変更要求もしない | 一般的な質問や提案 |
| **Approve** | 変更を承認し、マージ可能であることを示す | コードが要件を満たしている場合 |
| **Request Changes** | マージ前に修正が必要な問題を指摘する | バグ、セキュリティ問題、品質問題がある場合 |

## レビューの手順

### Web UI でのレビュー

1. PR の **Files changed** タブをクリック
2. コードの差分を確認
3. 行コメントを追加（行番号の **+** をクリック）
4. 複数行を選択する場合は、開始行の **+** をクリックして終了行までドラッグ
5. レビューコメントを入力し **Start a review** をクリック
6. すべてのコメントを追加し終えたら、**Review changes** をクリック
7. 総括コメントを入力し、レビュータイプを選択して **Submit review** をクリック

### CLI でのレビュー

```bash
# PR の差分を表示
gh pr diff 123

# PR をレビュー（承認）
gh pr review 123 --approve --body "LGTM!"

# PR をレビュー（変更要求）
gh pr review 123 --request-changes --body "以下の修正が必要です"

# PR をレビュー（コメントのみ）
gh pr review 123 --comment --body "いくつか質問があります"
```

## 行コメント (Line Comments)

特定のコード行に対してコメントを残す機能です。

### 単一行コメント

1. 対象の行番号横の **+** アイコンをクリック
2. コメントを入力
3. **Start a review**（レビューの一部として）または **Add single comment**（即座に投稿）をクリック

### 複数行コメント

1. 開始行の **+** アイコンをクリック
2. 終了行までドラッグ（範囲を選択）
3. コメントを入力

### コメントの解決

- レビューで指摘されたフィードバックに対応した後、スレッドの **Resolve conversation** をクリック
- ブランチ保護ルールで **Require conversation resolution** が有効な場合、すべてのスレッドの解決がマージの条件となる

## サジェスチョン (Suggestions)

レビュアーがコードの変更を直接提案できる機能です。PR の作者は提案を 1 クリックで適用できます。

### サジェスチョンの作成

レビューコメント内で以下の構文を使用します:

````markdown
```suggestion
修正後のコードをここに記述
```
````

### サジェスチョンの適用

1. PR の作者は提案されたサジェスチョンの **Commit suggestion** ボタンをクリック
2. コミットメッセージを入力して適用

### 複数のサジェスチョンの一括適用

1. 適用したいサジェスチョンの **Add suggestion to batch** をクリック
2. すべて追加し終えたら **Commit suggestions** をクリック

## レビュアーの割り当て

### 手動でのリクエスト

```bash
# CLI でレビュアーをリクエスト
gh pr edit 123 --add-reviewer user1,user2

# チームにレビューをリクエスト
gh pr edit 123 --add-reviewer org/team-name
```

Web UI: PR のサイドバーの **Reviewers** セクションで歯車アイコンをクリックし、レビュアーを選択。

### CODEOWNERS による自動割り当て

CODEOWNERS ファイルで定義されたオーナーは、対象ファイルが変更された PR に対して自動的にレビュアーとしてリクエストされます。

- ドラフト PR では自動リクエストされない（Ready for review に変更した時点でリクエスト）
- CODEOWNERS の設定詳細は [code-owners.md](./code-owners.md) を参照

### 自動割り当てルール

組織リポジトリでは、チームの設定で自動割り当てルール（round robin やランダム）を設定できます。

## 必須レビュー (Required Reviews)

ブランチ保護ルールで設定可能な必須レビューの要件:

| 設定 | 説明 |
|------|------|
| Required number of approving reviews | マージに必要な承認数（1〜6） |
| Dismiss stale approvals | 新しいコミットで既存の承認を無効化 |
| Require review from Code Owners | CODEOWNERS で指定されたオーナーの承認を要求 |
| Require approval of most recent push | 最新の push 者以外による承認を要求 |

## レビューの取り下げ

管理者または適切な権限を持つユーザーは、提出済みのレビューを取り下げ（dismiss）できます。

```bash
# PR のレビューステータスを確認
gh pr checks 123
```

## 再レビューのリクエスト

大きな変更を行った後、レビュアーに再レビューをリクエストできます。

Web UI: **Reviewers** セクションで、レビュアー名横の回転矢印アイコンをクリック。

## レビューのベストプラクティス

1. **建設的なフィードバック**: 問題点だけでなく、改善案も提示する
2. **サジェスチョンの活用**: 可能な場合はコード変更を直接提案する
3. **範囲を絞る**: 大きな PR は複数の小さな PR に分割するよう依頼する
4. **タイムリーなレビュー**: レビューリクエストには速やかに対応する
5. **承認コメント**: 良いコードや学びのある部分にもコメントする
6. **コンテキストの共有**: なぜ変更が必要かの理由を説明する

## 参考リンク

- [About pull request reviews - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
