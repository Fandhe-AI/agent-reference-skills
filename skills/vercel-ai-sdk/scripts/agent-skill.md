---
source: https://ai-sdk.dev/docs/getting-started/coding-agents
---

# agent-skill

公式配布の AI SDK Agent Skill（`vercel/ai`）を `npx skills add` で導入するコマンド。

> **警告**: `npx skills add` はエージェントのスキルディレクトリ（例: `.claude/skills`、`.codex/skills`）にファイルを書き込む。内容を確認できる環境（使い捨てのサンドボックスまたは commit 済みの作業ツリー）で実行する。

## 公式 AI SDK スキルのインストール

```sh
npx skills add vercel/ai
```

複数のエージェントを選ぶと CLI が symlink を作成する。`-a` でエージェントを直接指定（例: `-a amp` は共通の `.agents/skills` に入る）、`-y` で非対話実行。

## 6.x から 7.0 への移行スキル

```sh
npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7
```

導入後にエージェントへ次の指示を出す（公式の文面）:

```txt
Use the migrate-ai-sdk-v6-to-v7 skill and migrate my app from AI SDK v6 to v7.
```

## Notes

- 公式スキルは `vercel/ai` リポジトリが配布する Agent Skills（SKILL.md 形式）であり、公式ドキュメントを蒸留した本リポジトリの `vercel-ai-sdk` スキルとは配布経路が異なる。
- Agent Skills は progressive disclosure で、起動時には name と description だけが読み込まれ、タスクが該当した時点で本文が読み込まれる。
- Agent Skills (SKILL.md) の仕組みは `anthropic-claude-code-extend`、Skills API は `anthropic-api-tools-mcp` を参照。
- コードの codemod は `codemod.md` を参照。
