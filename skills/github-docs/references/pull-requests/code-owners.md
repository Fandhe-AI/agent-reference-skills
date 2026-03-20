# CODEOWNERS

CODEOWNERS ファイルは、リポジトリ内のコードに対する責任者を定義し、Pull Request で対象ファイルが変更された際に自動的にレビューをリクエストする仕組みです。

## ファイルの配置場所

GitHub は以下の順序で CODEOWNERS ファイルを検索し、**最初に見つかったファイル**を使用します:

| 優先順位 | パス | 推奨度 |
|---------|------|--------|
| 1 | `.github/CODEOWNERS` | 最も推奨（安全性が高い） |
| 2 | `CODEOWNERS`（リポジトリルート） | 一般的 |
| 3 | `docs/CODEOWNERS` | ドキュメント重視のプロジェクト向け |

> ブランチごとに異なる CODEOWNERS ファイルを設定できます。PR の base ブランチの CODEOWNERS が使用されます。

## ファイルサイズ制限

CODEOWNERS ファイルは **3 MB 以下** にする必要があります。超過するとファイルが読み込まれず、コードオーナーの通知が機能しなくなります。

> ワイルドカードパターンを使用してエントリを統合し、ファイルサイズを削減してください。

## 基本構文

```
# パターン  @オーナー
# （gitignore と同じパターン構文を使用）

# コメント行
# デフォルトオーナー（すべてのファイルにマッチ）
*       @default-owner

# 特定のファイル
/LICENSE  @legal-team

# ファイル拡張子
*.js    @frontend-team
*.py    @backend-team
*.go    @backend-team

# ディレクトリ（再帰的にすべてのファイル）
/src/   @dev-team
/docs/  @docs-team

# ディレクトリの直下のみ（サブディレクトリ含まず）
docs/*  @docs-team

# 任意の深さにあるディレクトリ
**/test/  @qa-team

# ルートディレクトリのファイルのみ
/*.md   @docs-team

# 複数オーナー
/api/   @backend-team @api-reviewers @lead-dev
```

## Glob パターン

| パターン | 説明 | 例 |
|---------|------|---|
| `*` | すべてのファイル | `*` = 全ファイル、`*.js` = 全 JS ファイル |
| `/*` | ルートディレクトリ直下 | `/*.md` = ルートの MD ファイル |
| `dir/*` | ディレクトリ直下のファイルのみ | `docs/*` = docs/ 直下のみ |
| `dir/` | ディレクトリ以下すべて（再帰的） | `/src/` = src/ 以下すべて |
| `**/` | 任意の深さのディレクトリ | `**/test/` = 全階層の test/ |
| `/path/` | ルートからの絶対パス | `/build/logs/` = ルートの build/logs/ |

## チームオーナー

組織リポジトリでは `@org/team-name` 形式でチームをオーナーに指定できます。

```
/src/frontend/  @my-org/frontend-team
/src/backend/   @my-org/backend-team
/infrastructure/ @my-org/devops-team
```

### チームオーナーの要件

- チームはリポジトリに対して **可視** であること
- チームはリポジトリに対して **書き込みアクセス権限** を持つこと
- チームメンバー個人が書き込み権限を持っていても、チーム自体に権限がなければ不十分

## マッチング順序

**最後のマッチが優先されます**（Last match wins）。

```
# 1. デフォルトオーナー
*             @default-owner

# 2. すべての JS ファイルは frontend-team
*.js          @frontend-team

# 3. /api/ 以下は backend-team（*.js も含む）
/api/         @backend-team

# /api/handler.js のオーナーは @backend-team（最後のマッチ）
# /src/app.js のオーナーは @frontend-team
# /README.md のオーナーは @default-owner
```

### 例外の設定

特定のサブディレクトリを別のオーナーに割り当てる場合:

```
/apps/        @app-team
/apps/github  @github-team   # /apps/github は @github-team が担当
```

## 大文字小文字の区別

CODEOWNERS のパスは **大文字と小文字を区別** します。GitHub は大文字小文字を区別するファイルシステムを使用しています。

```
# /Docs/ と /docs/ は異なるパスとして扱われる
/docs/  @docs-team
/Docs/  @other-team
```

## ブランチ保護との連携

### Required reviews from Code Owners の有効化

1. **Settings** > **Branches** > ブランチ保護ルールの編集
2. **Require pull request reviews before merging** を有効化
3. **Require review from Code Owners** にチェック

### 動作

- PR で変更されたファイルに対応するコードオーナーに自動的にレビューがリクエストされる
- コードオーナーの **いずれか 1 人** の承認で要件が満たされる
- ドラフト PR では自動リクエストされない（Ready for review に変更した時点で通知）

## サポートされないパターン

以下の gitignore パターンは CODEOWNERS では **サポートされていません**:

| パターン | 説明 |
|---------|------|
| `\#` | `#` で始まるパターンのエスケープ |
| `!pattern` | 否定パターン |
| `[a-z]` | 文字範囲 |

## オーナーの種類

| 種類 | 形式 | 例 |
|------|------|---|
| GitHub ユーザー | `@username` | `@octocat` |
| チーム | `@org/team-name` | `@my-org/frontend` |
| メールアドレス | `email@example.com` | `dev@example.com` |

> メールアドレスは GitHub アカウントに関連付けられたメールと一致する必要があります。マネージドユーザーアカウントではメールアドレスは使用できません。

## CODEOWNERS ファイルの実用例

```
# ============================================
# CODEOWNERS - コードオーナーシップの定義
# ============================================

# デフォルトオーナー
*                         @my-org/engineering

# ドキュメント
/docs/                    @my-org/docs-team
*.md                      @my-org/docs-team

# フロントエンド
/src/components/          @my-org/frontend
/src/pages/               @my-org/frontend
/src/styles/              @my-org/frontend
*.css                     @my-org/frontend
*.tsx                     @my-org/frontend

# バックエンド
/src/api/                 @my-org/backend
/src/services/            @my-org/backend
/src/models/              @my-org/backend

# インフラ・DevOps
/terraform/               @my-org/devops
/docker/                  @my-org/devops
Dockerfile                @my-org/devops
docker-compose*.yml       @my-org/devops
/.github/workflows/       @my-org/devops

# セキュリティ関連
/src/auth/                @my-org/security @my-org/backend
SECURITY.md               @my-org/security

# 設定ファイル
package.json              @my-org/frontend @my-org/devops
tsconfig.json             @my-org/frontend

# CODEOWNERS 自体の保護
/.github/CODEOWNERS       @my-org/engineering-leads
```

## セキュリティのベストプラクティス

1. **CODEOWNERS 自体にオーナーを設定**: `.github/CODEOWNERS` に対するオーナーを定義し、不正な変更を防ぐ
2. **`.github/` ディレクトリに配置**: 最も安全な配置場所
3. **ブランチ保護と組み合わせる**: Required reviews from Code Owners を有効化
4. **セキュリティクリティカルなコードに専門チームを割り当て**: 認証、暗号化、権限管理などのコードに対して

## 参考リンク

- [About code owners - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
