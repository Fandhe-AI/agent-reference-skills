---
paths:
  - ".claude/**/*"
  - ".claude/*"
---

# .claude ディレクトリ操作ルール

`.claude/` 配下のファイルを新規作成・編集する場合、直接書き込まず `_/dotclaude/` に一時作成してからまとめて `mv` で配置する。

## 操作フロー

1. `_/dotclaude/` 配下に、元のディレクトリ構造を再現してファイルを作成・編集する
2. 全ファイルの作成・編集が完了したら、まとめて `mv` で `.claude/` に移動する
3. 自分が作成したファイル・サブディレクトリのみ削除し、`_/dotclaude/` が空の場合のみ `rmdir` で削除する

## パスの対応例

| 最終配置先 | 一時作成先 |
| --- | --- |
| `.claude/rules/foo.md` | `_/dotclaude/rules/foo.md` |
| `.claude/skills/bar/SKILL.md` | `_/dotclaude/skills/bar/SKILL.md` |
| `.claude/agents/baz.md` | `_/dotclaude/agents/baz.md` |
| `.claude/commands/qux.md` | `_/dotclaude/commands/qux.md` |
| `.claude/settings.local.json` | `_/dotclaude/settings.local.json` |
| `.claude/CLAUDE.md` | `_/dotclaude/CLAUDE.md` |

## 移動コマンド例

```bash
# 単一ファイル
mv _/dotclaude/rules/foo.md .claude/rules/foo.md

# ディレクトリごと
mv _/dotclaude/skills/bar .claude/skills/bar

# 後片付け — 自分が使ったパスのみ削除
rm -rf _/dotclaude/rules/foo.md
rmdir _/dotclaude/rules 2>/dev/null   # 空なら削除
rmdir _/dotclaude 2>/dev/null         # 空なら削除
```

## 注意事項

- 移動先のディレクトリが存在しない場合は `mkdir -p` で事前に作成する
- **`rm -rf _/dotclaude` は禁止** — 並行作業が `_/dotclaude/` を共有している可能性がある
- 自分が作成したファイル・サブディレクトリのみ削除する
- `rmdir` は空ディレクトリにのみ作用するため、他の作業のファイルを誤って消さない
