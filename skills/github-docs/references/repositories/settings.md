# リポジトリ設定 (Repository Settings)

GitHub リポジトリの各種設定項目に関するリファレンスです。CODEOWNERS、機能の有効化/無効化、マージ設定などを含みます。

## CODEOWNERS

CODEOWNERS ファイルは、リポジトリ内のコードに対する責任者（オーナー）を定義します。Pull Request で対象ファイルが変更された場合、自動的にレビューがリクエストされます。

### ファイルの配置場所

GitHub は以下の順序で CODEOWNERS ファイルを検索し、最初に見つかったファイルを使用します:

1. `.github/CODEOWNERS`（推奨 -- 最も安全な配置場所）
2. リポジトリのルート `CODEOWNERS`
3. `docs/CODEOWNERS`

> ブランチごとに異なる CODEOWNERS ファイルを設定可能です。

### ファイルサイズ制限

CODEOWNERS ファイルは **3 MB** 以下にする必要があります。超過するとファイルが読み込まれず、コードオーナーの通知が機能しません。ワイルドカードパターンを使用してエントリを統合することで、ファイルサイズを削減できます。

### 構文

```
# コメント
# パターン  @オーナー

# デフォルトオーナー（すべてのファイル）
*       @global-owner1 @global-owner2

# 特定の拡張子
*.js    @js-team
*.ts    @ts-team

# 特定のディレクトリ（直下のファイルのみ）
docs/*  @docs-team

# 特定のディレクトリ（再帰的にすべて）
/build/logs/  @build-team

# 任意の深さのディレクトリ
**/logs  @logging-team

# ルートディレクトリのファイル
/*.md   @docs-team

# 特定のファイル
/LICENSE  @legal-team

# チームオーナー（組織リポジトリ）
/src/   @org-name/dev-team

# 複数オーナー（同じ行に記述するとすべてにレビューリクエスト）
/api/   @backend-team @api-reviewers

# 前のルールを上書き（最後のマッチが優先）
/apps/  @app-team
/apps/github  @github-team
```

### マッチングルール

- **最後のマッチが優先**: ファイルに複数のパターンがマッチする場合、最後に記述されたパターンのオーナーが適用される
- **大文字小文字を区別**: CODEOWNERS のパスは大文字と小文字を区別する
- 同じ行に複数のオーナーを記述した場合、すべてのオーナーにレビューがリクエストされる
- 異なる行で同じファイルに対してオーナーが指定された場合、最後の行のオーナーのみがリクエストされる

### サポートされないパターン

| パターン | 説明 |
|---------|------|
| `\#` | `#` で始まるパターンのエスケープ |
| `!pattern` | 否定パターン |
| `[a-z]` | 文字範囲 |

### ブランチ保護との連携

ブランチ保護ルールで **Require review from Code Owners** を有効にすると:

- CODEOWNERS で指定されたオーナーの **いずれか 1 人** の承認で要件が満たされる
- ドラフト PR では自動的にレビューリクエストされない（Ready for review に変更した時点で通知）
- CODEOWNERS ファイル自体にもオーナーを設定することを推奨（セキュリティのため）

## 機能の有効化/無効化

**Settings** > **General** > **Features** から以下の機能を有効化/無効化できます:

| 機能 | 説明 | デフォルト |
|------|------|-----------|
| **Issues** | バグ報告、機能要求の追跡 | 有効 |
| **Projects** | プロジェクト管理ボード | 有効 |
| **Wiki** | リポジトリの Wiki ドキュメント | 有効 |
| **Discussions** | コミュニティでの質疑応答 | 無効 |
| **Sponsorships** | スポンサーシップの表示 | 無効 |

## マージ設定

**Settings** > **General** > **Pull Requests** から、許可するマージ方法を設定できます。

### マージ方法

| 方法 | 説明 | 設定キー |
|------|------|---------|
| **Allow merge commits** | マージコミットを作成 | デフォルトで有効 |
| **Allow squash merging** | すべてのコミットを 1 つにまとめてマージ | デフォルトで有効 |
| **Allow rebase merging** | コミットをリベースしてマージ | デフォルトで有効 |

> 少なくとも 1 つのマージ方法を有効にする必要があります。

### Squash マージのコミットメッセージ設定

| オプション | 説明 |
|-----------|------|
| PR title and description | PR のタイトルと説明をコミットメッセージに使用 |
| PR title and commit details | PR のタイトルをメッセージに、個別コミットの詳細を本文に |
| Default message | デフォルトのコミットメッセージ |

### その他のマージ設定

| 設定 | 説明 |
|------|------|
| **Always suggest updating pull request branches** | ベースブランチとの同期を提案 |
| **Allow auto-merge** | 条件を満たした PR の自動マージを許可 |
| **Automatically delete head branches** | マージ後にヘッドブランチを自動削除 |

## その他の設定

### Danger Zone

**Settings** > **Danger zone** には以下の操作があります:

| 操作 | 説明 |
|------|------|
| Change repository visibility | 可視性の変更（Public / Private） |
| Transfer ownership | リポジトリの所有権を移転 |
| Archive this repository | リポジトリのアーカイブ（読み取り専用化） |
| Delete this repository | リポジトリの完全削除 |

### Webhooks

**Settings** > **Webhooks** から、リポジトリのイベントに応じた HTTP コールバックを設定できます。

### Deploy keys

**Settings** > **Deploy keys** から、リポジトリへのアクセス用 SSH キーを管理できます（[deploy-keys.md](../authentication/deploy-keys.md) を参照）。

### Environments

**Settings** > **Environments** から、デプロイ先の環境を定義し、保護ルールやシークレットを設定できます。

## 参考リンク

- [About code owners - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Managing repository settings - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings)
