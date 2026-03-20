# PR の作成 (Creating Pull Requests)

Pull Request を作成する方法と、関連する機能（ドラフト PR、テンプレート、Issue のリンク）に関するリファレンスです。

## 基本概念

- **Base ブランチ**: 変更を適用する先のブランチ（通常は `main` や `develop`）
- **Head（Compare）ブランチ**: 変更を含むブランチ（作業ブランチ）

## Web UI から作成

### 方法 1: Compare & pull request バナー

1. ブランチに push すると、リポジトリページに黄色い **Compare & pull request** バナーが表示される
2. バナーをクリック
3. base ブランチと compare ブランチを確認
4. タイトルと説明を入力
5. **Create pull request** をクリック

### 方法 2: 手動作成

1. リポジトリの **Pull requests** タブをクリック
2. **New pull request** をクリック
3. base ブランチと compare ブランチをドロップダウンで選択
4. 差分を確認し **Create pull request** をクリック
5. タイトルと説明を入力
6. **Create pull request** をクリック

## GitHub CLI から作成

```bash
# 基本的な作成（インタラクティブ）
gh pr create

# タイトルと説明を指定
gh pr create --title "新機能: ユーザー認証" --body "認証機能を追加しました"

# ドラフト PR として作成
gh pr create --title "WIP: リファクタリング" --draft

# base ブランチを指定
gh pr create --base develop --title "feature を develop にマージ"

# レビュアー、ラベル、マイルストーンを指定
gh pr create \
  --title "バグ修正: ログイン画面" \
  --body "ログインエラーのハンドリングを修正" \
  --reviewer user1,user2 \
  --label bug,priority-high \
  --milestone "v1.2.0"

# アサイニーを指定
gh pr create --title "タイトル" --assignee @me

# プロジェクトに関連付け
gh pr create --title "タイトル" --project "Sprint 5"

# 説明をファイルから読み込み
gh pr create --title "タイトル" --body-file pr-description.md

# Web ブラウザで PR 作成画面を開く
gh pr create --web
```

### よく使うフラグ

| フラグ | 短縮形 | 説明 |
|--------|--------|------|
| `--title` | `-t` | PR のタイトル |
| `--body` | `-b` | PR の説明 |
| `--body-file` | `-F` | 説明をファイルから読み込み |
| `--base` | `-B` | base ブランチを指定 |
| `--head` | `-H` | head ブランチを指定 |
| `--draft` | `-d` | ドラフト PR として作成 |
| `--reviewer` | `-r` | レビュアーを指定（カンマ区切り） |
| `--assignee` | `-a` | アサイニーを指定 |
| `--label` | `-l` | ラベルを指定 |
| `--milestone` | `-m` | マイルストーンを指定 |
| `--project` | `-p` | プロジェクトを指定 |
| `--web` | `-w` | Web ブラウザで開く |

## API から作成

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/pulls \
  -d '{
    "title": "New feature",
    "body": "Description of the changes",
    "head": "feature-branch",
    "base": "main",
    "draft": false
  }'
```

## ドラフト PR (Draft Pull Requests)

ドラフト PR は、作業中であることを示す PR です。マージはできませんが、フィードバックの早期取得に有用です。

### 特徴

- マージボタンが無効化される
- 「Draft」ラベルが表示される
- ブランチ保護ルールのステータスチェックは引き続き実行される
- CODEOWNERS への自動レビューリクエストは **発生しない**（Ready for review に変更した時点で通知）

### 操作

```bash
# ドラフト PR の作成
gh pr create --draft --title "WIP: 新機能"

# ドラフトから Ready for review に変更
gh pr ready 123

# Ready for review からドラフトに戻す
gh pr ready 123 --undo
```

> 組織リポジトリの場合、ドラフト PR の使用には組織オーナーの承認が必要な場合があります。

## PR テンプレート

PR テンプレートを使用すると、PR の説明欄に定型文を自動入力できます。

### テンプレートファイルの配置場所

以下のいずれかに `PULL_REQUEST_TEMPLATE.md` を作成します:

- `.github/PULL_REQUEST_TEMPLATE.md`（推奨）
- リポジトリのルート `PULL_REQUEST_TEMPLATE.md`
- `docs/PULL_REQUEST_TEMPLATE.md`

### テンプレートの例

```markdown
## 変更内容

<!-- この PR で何を変更したか簡潔に記述してください -->

## 変更の背景

<!-- なぜこの変更が必要なのか説明してください -->

Closes #

## テスト方法

- [ ] ユニットテストを追加/更新した
- [ ] 手動テストで動作を確認した

## スクリーンショット

<!-- UI の変更がある場合はスクリーンショットを添付してください -->

## チェックリスト

- [ ] コードはレビュー可能な状態
- [ ] ドキュメントを更新した（該当する場合）
- [ ] 破壊的変更がある場合は明記した
```

### 複数テンプレート

`.github/PULL_REQUEST_TEMPLATE/` ディレクトリに複数のテンプレートを配置できます:

```
.github/PULL_REQUEST_TEMPLATE/
  feature.md
  bugfix.md
  refactoring.md
```

URL パラメータでテンプレートを指定: `?template=feature.md`

## Issue との自動リンク

PR の説明またはコミットメッセージにキーワードを含めると、マージ時に関連する Issue を自動的にクローズできます。

### クローズキーワード

以下のキーワードの後に Issue 番号を記述します:

| キーワード | 例 |
|-----------|---|
| `close` / `closes` / `closed` | `Closes #123` |
| `fix` / `fixes` / `fixed` | `Fixes #456` |
| `resolve` / `resolves` / `resolved` | `Resolves #789` |

### 使用例

```markdown
## 変更内容

ログイン画面のバリデーションを修正しました。

Closes #123
Fixes #456, #789
```

> 複数の Issue を同時にクローズする場合は、各 Issue にキーワードを付ける必要があります（例: `Closes #123, closes #456`）。

### クロスリポジトリリンク

他のリポジトリの Issue をリンクすることも可能です:

```markdown
Closes owner/repo#123
```

## GitHub Desktop から作成

1. GitHub Desktop で変更をコミット
2. **Branch** メニューから **Create Pull Request** を選択
3. ブラウザにリダイレクトされ、PR 作成画面が表示される

## GitHub Codespaces から作成

1. Source Control サイドバーの **Create Pull Request** アイコンをクリック
2. タイトル、説明、ブランチの詳細を入力
3. **Create** をクリック

## 参考リンク

- [Creating a pull request - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
