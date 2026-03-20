---
name: create-commit
description: Conventional Commits 形式で git コミットを作成する。
---

# create-commit

変更内容を分析して Conventional Commits 形式でコミットを作成します。

## フロー

### Step 1: 変更内容を確認する

```bash
git status
git diff --staged
```

staged がない場合は `git diff` も確認してユーザーに staging を案内する。

### Step 2: Conventional Commits type を決定する

| type | 用途 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `refactor` | 機能変更なしのコードリファクタリング |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセス・補助ツール等の変更 |
| `style` | コードスタイルのみの変更（空白、フォーマット等） |
| `build` | ビルドシステムや外部依存関係の変更 |
| `ci` | CI 設定の変更 |
| `perf` | パフォーマンス改善 |

### Step 3: scope を推定する

変更ファイルのパスから scope を推定する。
複数にまたがる場合は省略可。

### Step 4: コミットメッセージを生成してユーザーに確認する

フォーマット: `type(scope): subject`

例:
```
feat(auth): ソーシャルログイン機能を追加
fix(api): レスポンスのエラーハンドリングを修正
refactor(ui): コンポーネント構造を整理
```

ユーザーに提案して確認を取る。

### Step 5: コミットを実行する

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**重要**: `--no-verify` は絶対に使用しない（pre-commit フックを迂回しない）。

## 注意事項

- Breaking change がある場合は `!` を付ける: `feat!: ...` または body に `BREAKING CHANGE:` を記述
- 件名は命令形・現在形で記述（日本語可）
- 件名は 72 文字以内
- `.env` や認証情報ファイルが含まれる場合は警告してコミットを中止する
