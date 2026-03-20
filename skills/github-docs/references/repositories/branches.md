# ブランチ管理・保護ルール (Branches & Protection)

GitHub リポジトリにおけるブランチの管理、保護ルール、および Rulesets に関するリファレンスです。

## デフォルトブランチ

デフォルトブランチは、Pull Request やコード参照の基本となるブランチです。

- 新しいリポジトリのデフォルトブランチ名は `main`（設定で変更可能）
- **Settings** > **Default branch** から既存リポジトリのデフォルトブランチを変更可能
- デフォルトブランチの変更はオープン中の PR のベースブランチに影響する

```bash
# デフォルトブランチの変更（CLI）
gh repo edit --default-branch new-default
```

## ブランチ保護ルール (Branch Protection Rules)

ブランチ保護ルールを設定することで、特定のブランチに対してワークフローや品質要件を強制できます。

### 設定場所

**Settings** > **Branches** > **Add branch protection rule**

### 利用可能な保護ルール

#### レビューと承認

| ルール | 説明 |
|--------|------|
| Require pull request reviews before merging | マージ前に PR レビューを要求 |
| Required number of approving reviews | 必要な承認レビュー数を指定（1〜6） |
| Dismiss stale pull request approvals | 新しいコミットが push された場合に既存の承認を取り消す |
| Require review from Code Owners | CODEOWNERS で指定されたオーナーからの承認を要求 |
| Require approval of the most recent push | 最新の push に対して push 者以外の承認を要求 |

#### コード品質とステータス

| ルール | 説明 |
|--------|------|
| Require status checks to pass before merging | マージ前にステータスチェックの成功を要求 |
| Require branches to be up to date before merging | マージ前にベースブランチとの同期を要求（Strict モード） |
| Require signed commits | 検証済みの署名付きコミットのみ受け入れ |
| Require conversation resolution before merging | すべての PR コメントスレッドの解決を要求 |

#### コミット履歴とマージ戦略

| ルール | 説明 |
|--------|------|
| Require linear history | マージコミットを禁止（squash または rebase のみ許可） |
| Require merge queue | マージキューを使用して自動的にマージ |

#### デプロイとアクセス

| ルール | 説明 |
|--------|------|
| Require deployments to succeed before merging | 特定の環境へのデプロイ成功を要求 |
| Lock branch | ブランチを読み取り専用にする |
| Restrict who can push to matching branches | push 可能なユーザー/チーム/アプリを制限 |

#### オーバーライド制御

| ルール | 説明 |
|--------|------|
| Do not allow bypassing the above settings | 管理者にも保護ルールを適用 |
| Allow force pushes | 特定のユーザーまたは全員にフォースプッシュを許可 |
| Allow deletions | 書き込み権限を持つユーザーによるブランチ削除を許可 |

### ブランチ名パターン

保護ルールはブランチ名パターン（`fnmatch` 構文）で適用対象を指定します:

| パターン | マッチ対象 |
|---------|-----------|
| `main` | `main` ブランチのみ |
| `release/*` | `release/` で始まるすべてのブランチ |
| `feature/**` | `feature/` 以下のすべてのブランチ（ネスト含む） |
| `*` | すべてのブランチ |

## Rulesets（ルールセット）

Rulesets はブランチ保護ルールの新しい代替手段であり、より柔軟な制御を提供します。GitHub Team 以上のプランで利用可能です。

### ブランチ保護ルールとの主な違い

| 特徴 | ブランチ保護ルール | Rulesets |
|------|-------------------|----------|
| 複数ルールの適用 | 1 つのみ | 複数を同時に適用可能 |
| 有効/無効の切替 | 削除が必要 | Active / Disabled で切替可能 |
| 閲覧権限 | 管理者のみ | 読み取りアクセスがあれば閲覧可能 |
| 組織全体の適用 | 不可 | 組織レベルで複数リポジトリに適用可能 |
| メタデータ制限 | 不可 | コミットメッセージや作者メールの制限が可能 |

### Rulesets の種類

| 種類 | 説明 |
|------|------|
| Branch rulesets | ブランチに対するルール |
| Tag rulesets | タグに対するルール |
| Push rulesets | プッシュに対するルール（ファイルパス、サイズ、拡張子で制限） |

### ルールの集約

複数の Rulesets が同じブランチやタグに適用される場合、すべてのルールが集約されます。同じルールが異なる設定で定義されている場合、**最も制限的なバージョン** が適用されます。

### 制限

- リポジトリあたり最大 **75** の Rulesets
- 組織あたり追加で最大 **75** の Rulesets
- ターゲット指定には `fnmatch` 構文を使用（例: `releases/**/*`）

### バイパス権限

Rulesets では、特定のユーザー、ロール（リポジトリ管理者など）、チーム、または GitHub App にバイパス権限を付与できます。

### 強制ステータス

| ステータス | 説明 |
|-----------|------|
| Active | ルールセットが適用される |
| Disabled | ルールセットが無効化される（削除不要） |

## 参考リンク

- [About protected branches - GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [About rulesets - GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
