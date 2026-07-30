---
name: create-commit
description: Conventional Commits 形式で git コミットを作成する。staged 差分から type/scope を推定し、breaking change やシークレット混入 (.env 等) を検出。pre-commit フックを必ず通す (`--no-verify` 不可)。「コミットして」「git commit」「変更を記録して」などで使用。
model: haiku
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

### Step 2: シークレット混入チェック（必須）

コミット実行前に、staged 差分へ秘密情報が含まれていないことを確認する。

```bash
# 認証情報ファイルの検出（.env・秘密鍵等）。追加・変更（--diff-filter=ACMR）のみを対象とし、
# 削除コミット（漏洩した .env の除去等の是正コミット）はブロックしない。
# .env.example 等のテンプレートと公開鍵（.pub）は除外する。
git diff --staged --name-only --diff-filter=ACMR \
  | grep -E '(^|/)\.env(\..+)?$|(^|/)(id_rsa|id_ed25519)(\..+)?$|\.(pem|p12|pfx|key)$' \
  | grep -vE '\.(example|sample|template|pub)$' || echo "認証情報ファイル: 検出なし"

# 差分本文中のシークレットパターンの検出。追加行（^+。ファイルヘッダ +++ は除外）のみを対象とし、
# 漏洩済みシークレットの削除（- 行）を妨げない。
git diff --staged --diff-filter=ACMR \
  | grep -E '^\+' | grep -v '^\+\+\+' \
  | grep -E 'sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]+|AIza[0-9A-Za-z_-]{35}|BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY' \
  || echo "シークレットパターン: 検出なし"

# 認証情報ファイルのリネームの検出。上記の名前照合はリネーム後の新パスにしか働かないため、
# 旧パスが認証情報パターンに一致するリネーム（例: .env → config.txt）を別途検出する。
# .env の中身（KEY=VALUE 形式）は上記のシークレットパターンに一致しないことが多く、
# 名前照合が主防御線であるため、名前を変えて内容が残るケースを見逃さない。
git diff --staged --name-status --diff-filter=R \
  | cut -f2 \
  | grep -E '(^|/)\.env(\..+)?$|(^|/)(id_rsa|id_ed25519)(\..+)?$|\.(pem|p12|pfx|key)$' \
  | grep -vE '\.(example|sample|template|pub)$' || echo "認証情報ファイルのリネーム: 検出なし"
```

いずれかが検出された場合は**コミットを中止**し、ユーザーに警告して該当ファイルの unstage・該当行の除去を案内する。例示値・プレースホルダ等の誤検知と判断できる場合のみ、ユーザーの明示確認を得てから続行する。リネームが検出された場合は、シークレットの内容が新しいファイル名の下に残っていないかを確認し、残っている場合は中止する。削除のみのコミット（`.env` の削除・漏洩キーの除去）は検出対象外でありそのまま続行してよいが、**認証情報ファイルの削除（D）と別名ファイルの追加（A）が同一コミットに含まれる場合**は、内容が別名で追加し直されていないか（実質的なリネームでないか）を差分で確認してから続行する。

### Step 3: Conventional Commits type を決定する

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

### Step 4: scope を推定する

変更ファイルのパスから scope を推定する。
複数にまたがる場合は省略可。

### Step 5: コミットメッセージを生成してユーザーに確認する

フォーマット: `type(scope): subject`

例:
```
feat(auth): ソーシャルログイン機能を追加
fix(api): レスポンスのエラーハンドリングを修正
refactor(ui): コンポーネント構造を整理
```

ユーザーに提案して確認を取る。

### Step 6: コミットを実行する

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**重要**: `--no-verify` は絶対に使用しない（pre-commit フックを迂回しない）。

## 検証

コミット完了後、以下で確認する。

```bash
git log --oneline -3
```

- 最新コミットのメッセージが `type(scope): subject` 形式になっているか確認する
- `git show --stat HEAD` で変更ファイルの一覧が意図通りかを確認する

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| 複数の関心事を 1 コミットに混ぜる | 関心事ごとに `git add -p` で staging を分けて別コミットにする |
| type を誤選定する（バグ修正に `feat`、機能追加に `fix`）| Step 3 の type 表を参照し、差分の意図を優先して選ぶ |
| シークレットチェックを飛ばして type 決定に進む | Step 2 は省略不可。検出時はコミットを中止してユーザーに警告する |
| `--no-verify` でフックを回避しようとする | フック失敗の原因を調査・修正してから再コミットする（回避は禁止） |
| 件名が 72 文字を超える | scope を省略するか subject を短縮する。詳細は body に書く |

## 注意事項

- Breaking change がある場合は `!` を付ける: `feat!: ...` または body に `BREAKING CHANGE:` を記述
- 件名は命令形・現在形で記述（日本語可）
- 件名は 72 文字以内
- `.env` や認証情報ファイルが含まれる場合は警告してコミットを中止する（Step 2 で必ず検出する）
