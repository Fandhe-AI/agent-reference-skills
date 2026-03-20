---
name: update-docs
description: コード変更に基づいて CLAUDE.md やスキル一覧を更新する。
---

# update-docs

コード変更に基づいて `CLAUDE.md` を更新し、`_/.last-update-docs` に記録します。

## `_/.last-update-docs` ファイル形式

```
commit_hash=<hash>
commit_subject=<1行目>
commit_date=<ISO 8601>
```

このファイルは `.gitignore` で除外されローカル専用。

## フロー

### Step 1: 前回の更新コミットを確認する

`_/.last-update-docs` を読み込んで `commit_hash` を取得。
ファイルが存在しない場合は初回扱いとして直近のコミットを基準にする。

### Step 2: 変更内容を確認する

```bash
git log <commit_hash>..HEAD --oneline
git diff <commit_hash>..HEAD --stat
```

変更されたファイルと内容を把握する。

### Step 3: CLAUDE.md を更新する

#### Current Skills の更新

`skills/` 配下のディレクトリ一覧を取得し、`CLAUDE.md` の `## Current Skills` セクションを更新する。

```bash
ls -d skills/*/SKILL.md | sed 's|skills/||;s|/SKILL.md||' | sort
```

- スキル数のカウントを更新: `## Current Skills (N)`
- カンマ区切りのスキル名一覧を更新

#### Repository Structure の更新

以下の変更があった場合に構造ツリーを更新する:

- `.claude/agents/` にエージェント定義が追加・削除された
- `.claude/rules/` にルールが追加・削除された
- `.claude/skills/` にワークフロースキルが追加・削除された

#### その他の更新対象

- インストール方法の変更
- 新しいコンベンションの追加
- スキル構造（Skill Anatomy）の変更

### Step 4: `_/.last-update-docs` を更新する

```bash
git log -1 --format="%H"  # commit_hash
git log -1 --format="%s"  # commit_subject
git log -1 --format="%cI" # commit_date (ISO 8601)
```

取得した情報で `_/.last-update-docs` を更新:

```
commit_hash=abc123def456
commit_subject=feat(playwright): Playwright リファレンススキルを追加
commit_date=2026-03-21T10:00:00+09:00
```

### Step 5: 更新内容を報告する

更新したファイルの一覧と変更内容を表示する。

## 注意事項

- `CLAUDE.md` のみが更新対象。個別スキルの `SKILL.md` や `references/` は対象外
- 自動生成ファイルは更新対象外
- `_/.last-update-docs` が `.gitignore` に追加されているか確認する
