# コンフリクト解決 (Resolving Merge Conflicts)

Pull Request でのマージコンフリクトの原因、解決方法、および予防策に関するリファレンスです。

## コンフリクトとは

マージコンフリクトは、同じファイルの同じ部分が異なるブランチで異なる方法で変更された場合に発生します。Git はどちらの変更を採用すべきか自動的に判断できないため、手動での解決が必要になります。

## GitHub UI での解決

GitHub の Web エディターで簡単なコンフリクトを解決できます。

### 手順

1. PR ページでコンフリクトの警告を確認
2. **Resolve conflicts** ボタンをクリック
3. コンフリクトエディターで各ファイルのコンフリクトを確認
4. コンフリクトマーカーを編集して解決:
   - 自分の変更を残す
   - 相手の変更を残す
   - 両方の変更を組み合わせる
   - まったく新しい内容にする
5. コンフリクトマーカー（`<<<<<<<`、`=======`、`>>>>>>>`）を **すべて削除**
6. ファイルごとに **Mark as resolved** をクリック
7. すべてのファイルを解決したら **Commit merge** をクリック

### UI で解決できないケース

**Resolve conflicts** ボタンが無効化（グレーアウト）されている場合、コンフリクトが複雑すぎて GitHub の UI では解決できません。以下の場合が該当します:

- 競合する行の変更以外のコンフリクト（例: ファイル削除 vs ファイル変更）
- バイナリファイルのコンフリクト
- 非常に大きなファイルのコンフリクト

> 保護されたブランチに対する直接的なコンフリクト解決はできません。新しいブランチを作成して解決する必要があります。

## コマンドラインでの解決

### 手順

```bash
# 1. base ブランチの最新を取得
git checkout main
git pull origin main

# 2. feature ブランチに切り替え
git checkout feature-branch

# 3. base ブランチをマージ
git merge main

# コンフリクトが発生すると以下のようなメッセージが表示される:
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# 4. コンフリクトのあるファイルを確認
git status

# 5. ファイルを編集してコンフリクトを解決
# （エディタでコンフリクトマーカーを修正）

# 6. 解決したファイルをステージ
git add file.txt

# 7. マージコミットを作成
git commit -m "Resolve merge conflicts with main"

# 8. リモートに push
git push origin feature-branch
```

### rebase を使用する場合

```bash
# 1. base ブランチの最新を取得
git checkout main
git pull origin main

# 2. feature ブランチに切り替え
git checkout feature-branch

# 3. rebase を開始
git rebase main

# コンフリクトが発生した場合:
# 4. コンフリクトを解決してファイルをステージ
git add file.txt

# 5. rebase を続行
git rebase --continue

# 6. rebase を中止する場合
git rebase --abort

# 7. リモートに push（rebase 後はフォースプッシュが必要）
git push --force-with-lease origin feature-branch
```

## コンフリクトマーカー

コンフリクトが発生したファイルには以下のマーカーが挿入されます:

```
<<<<<<< HEAD
現在のブランチ（base）の変更内容
=======
マージしようとしているブランチ（head）の変更内容
>>>>>>> feature-branch
```

### マーカーの説明

| マーカー | 説明 |
|---------|------|
| `<<<<<<< HEAD` | 現在のブランチの変更の開始 |
| `=======` | 2 つの変更の区切り |
| `>>>>>>> branch-name` | マージするブランチの変更の終了 |

### 解決例

コンフリクト（解決前）:

```python
def greet(name):
<<<<<<< HEAD
    return f"Hello, {name}!"
=======
    return f"Hi, {name}! Welcome!"
>>>>>>> feature-branch
```

解決後（例: 両方の変更を組み合わせる）:

```python
def greet(name):
    return f"Hello, {name}! Welcome!"
```

> 解決後は、3 つのコンフリクトマーカー行（`<<<<<<<`、`=======`、`>>>>>>>`）を**必ずすべて削除**してください。

## VS Code でのコンフリクト解決

VS Code はコンフリクトマーカーを自動的に検出し、インラインで解決オプションを表示します:

- **Accept Current Change**: 現在のブランチ（HEAD）の変更を採用
- **Accept Incoming Change**: マージするブランチの変更を採用
- **Accept Both Changes**: 両方の変更を保持
- **Compare Changes**: 変更を並べて比較

## コンフリクトの予防策

### 1. 頻繁なマージ/リベース

```bash
# 定期的に base ブランチの変更を取り込む
git checkout feature-branch
git merge main
# または
git rebase main
```

### 2. 小さな PR

- 大きな変更は小さな PR に分割する
- 変更範囲が小さいほどコンフリクトの可能性が低い

### 3. コミュニケーション

- 同じファイルを複数人が同時に編集する場合は事前に調整する
- CODEOWNERS を活用してファイルの責任者を明確にする

### 4. ブランチ戦略

- 長期間のブランチを避ける
- feature ブランチは短期間で完了させる
- base ブランチからの乖離が大きくなる前にマージする

### 5. ファイルの分割

- 大きなファイルを機能単位で分割する
- 設定ファイルやルーティングなどの「ホットスポット」を分散させる

## GitHub CLI でのコンフリクト確認

```bash
# PR のマージ可能性を確認
gh pr view 123 --json mergeable,mergeStateStatus

# PR の差分を確認
gh pr diff 123
```

## 参考リンク

- [Resolving a merge conflict on GitHub - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)
- [Resolving a merge conflict using the command line - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
