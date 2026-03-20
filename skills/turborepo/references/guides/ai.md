# AI との連携

## Agent Skills

```bash
npx skills add vercel/turborepo
```

Turborepo のベストプラクティス・パターン・アンチパターンをエージェントに教える。

## Git Worktrees による並列エージェント実行

```bash
turbo run build
git branch feature-branch && git worktree add ../agent-2-worktree feature-branch
cd ../agent-2-worktree && turbo run build  # キャッシュが再利用される
```

Turborepo はワークツリー間でローカルキャッシュを自動共有する。

## Task Descriptions

```json
{
  "tasks": {
    "build": {
      "description": "Compiles TypeScript and bundles the application",
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "description": "Runs the test suite with coverage",
      "dependsOn": ["build"]
    }
  }
}
```

AI がタスクの目的を理解しやすくなる。

## 機械可読ドキュメント

| 方法 | 説明 |
|---|---|
| Markdown ルート | URL 末尾に `.md` を付加（例: `https://turborepo.dev/docs.md`） |
| サイトマップ | `https://turborepo.dev/sitemap.md` |
| ターミナル検索 | `turbo docs [クエリ]` |
