# AI Agents

> Source: https://commitlint.js.org/guides/ai-agents

AI コーディングエージェント（Claude Code、Copilot、Cursor など）が commitlint のルールに従ってコミットメッセージを生成・検証するための設定方法。

## Agent Skills 形式によるインストール

Agent Skills 形式をサポートするツール向けに、commitlint は専用スキルを提供している。

```bash
mkdir -p .claude/skills/committing-with-commitlint
curl -fLo .claude/skills/committing-with-commitlint/SKILL.md \
  https://raw.githubusercontent.com/conventional-changelog/commitlint/master/skills/committing-with-commitlint/SKILL.md
```

## Agent Skills 非対応ツールでの設定

`AGENTS.md` または `CLAUDE.md` に以下の指示を追加する:

- 設定確認: `npx commitlint --print-config json` で有効なルールを取得する
- メッセージ検証: `printf '%s' "<message>" | npx commitlint` でコミット前に検証する
- エラー発生時は括弧内のルール名を確認して修正する
- `git commit --no-verify` は使用禁止

## エージェント向け CLI プリミティブ

| コマンド | 用途 |
|---------|------|
| `npx commitlint --print-config json` | JSON 形式で現在の設定を出力 |
| `printf '%s' "<message>" \| npx commitlint` | stdin からメッセージを検証 |
| `npx commitlint --last` | 最後のコミットをリント |
| `npx commitlint --edit $1` | コミットメッセージファイルを検証（フック用） |
| `npx commitlint --strict` | 警告でコード 2、エラーでコード 3 を返す |

## LLM 向けドキュメント

commitlint の公式ドキュメントはテキスト形式でも提供されている:

- `https://commitlint.js.org/llms.txt` — ページインデックス
- `https://commitlint.js.org/llms-full.txt` — 全ページの完全なマークダウン

## Related

- [CLI Reference](../reference/cli.md)
- [Getting Started](./getting-started.md)
- [Configuration](../reference/configuration.md)
