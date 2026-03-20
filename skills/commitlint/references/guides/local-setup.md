# Local Setup

Husky を使った Git フックによるローカルでのコミットメッセージ検証。

> **参照元**: https://commitlint.js.org/guides/local-setup

ローカルでのリントは即座にフィードバックを得るのに適しているが、容易にバイパスできるため、本番レベルの検証には CI Setup との併用が推奨される。

## フックの追加

### Husky v9 を使用する方法

Husky をインストールし、`commit-msg` フックを設定する。

```bash
# npm
npm install --save-dev husky
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# yarn
yarn add --dev husky
yarn husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# pnpm
pnpm add -D husky
pnpm exec husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# bun
bun add -d husky
bunx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### Windows での注意事項

Windows 環境では、すべての Husky ファイルが **UTF-8** エンコーディングであることを確認する。

PowerShell を使用する場合はエスケープが異なる:

```powershell
echo "npx --no -- commitlint --edit `$1" > .husky/commit-msg
```

### npm スクリプトを使った代替方法

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

### Git フックを直接使用する方法

Husky を使わずに Git の `commit-msg` フックを直接設定することも可能。詳細は [Git のドキュメント](https://git-scm.com/docs/githooks) を参照。フックのファイル名は `commit-msg` にする必要がある。

## テスト

### commitlint の動作確認

```bash
# npm
npx commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# yarn
yarn commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# pnpm
pnpm commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# bun
bun commitlint --from HEAD~1 --to HEAD --verbose
```

### フックの動作確認

#### 失敗するコミットの例

```bash
git commit -m "foo: this will fail"
```

出力:

```
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]
✖   found 1 problems, 0 warnings
husky - commit-msg script failed (code 1)
```

#### 成功するコミットの例

```bash
git commit -m "chore: lint on commitmsg"
```

commitlint は問題がない場合は何も出力しない。確認のための出力が必要な場合は `--verbose` フラグを使用する。
