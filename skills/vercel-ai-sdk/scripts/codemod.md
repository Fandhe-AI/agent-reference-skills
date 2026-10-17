---
source: https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0
---

# codemod

`@ai-sdk/codemod` commands for upgrading AI SDK codebases (4.x to 7.0).

> **警告**: codemod はソースコードを直接書き換える。実行前に作業ツリーを commit して差分を確認できる状態にし、使い捨てブランチまたは使い捨て環境で実行する。公式も「全変更を網羅するとは限らない」と注記している。

## v7 codemods (6.x to 7.0)

```sh
npx @ai-sdk/codemod v7
```

Run from the root of the project. Runs all v7 codemods.

## Individual codemod

```sh
npx @ai-sdk/codemod <codemod-name> <path>
```

```sh
npx @ai-sdk/codemod v7/rename-system-to-instructions src/
```

## v6 codemods (5.x to 6.0)

```sh
npx @ai-sdk/codemod v6
```

```sh
npx @ai-sdk/codemod v6/rename-text-embedding-to-embedding src/
```

## v5 codemods (4.x to 5.0)

```sh
npx @ai-sdk/codemod v5
```

```sh
npx @ai-sdk/codemod v5/rename-format-stream-part src/
```

## All codemods from all versions

```sh
npx @ai-sdk/codemod upgrade
```

The 6.0 guide notes that `upgrade` runs all codemods from all versions (v4, v5 and v6). Use the version-specific command (`v7` when upgrading from 6.x) instead.

## Notes

- Codemod names and the full codemod table are in `references/migration/migration-guide-7-0.md`, `migration-guide-6-0.md` and `migration-guide-5-0.md`.
- Codemods do not cover every change; manual edits may be needed.
- The 7.0 guide also offers the official migration skill, see `agent-skill.md`.
