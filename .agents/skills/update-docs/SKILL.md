---
name: update-docs
description: >
  前回更新コミット (_/.last-update-docs で追跡) からの差分をもとに CLAUDE.md のスキル一覧・リポジトリ構造ツリーを更新する。
  新スキル追加時、.claude/agents/ や .claude/rules/ の変更時、「ドキュメント更新して」「CLAUDE.md を更新して」などで使用。
  コード内コメント・ドキュメンテーションコメントの補強を依頼された場合にも参照する指針を含む。
model: haiku
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

スキルを2系統に分けて列挙し、`CLAUDE.md` の `## Current Skills` セクションと「リポジトリ管理スキル」セクションをそれぞれ更新する。

**系統 A: `skills/` 配下の配布可能スキル（カウント対象）**

```bash
ls -d skills/*/SKILL.md | sed 's|skills/||;s|/SKILL.md||' | sort
```

- スキル数のカウントを更新: `## Current Skills (N)`（N は系統 A のみ）
- カンマ区切りのスキル名一覧を更新

**系統 B: `.claude/skills/` / `.agents/skills/` 配下のスキル（カウント対象外）**

```bash
# -L で symlink を追従し、.claude/skills/（symlink）と .agents/skills/（実体）の
# 両レイアウトを網羅する。SKILL.md を持つディレクトリ名を抽出し重複排除する。
# （npx skills add は .agents/skills/ に実体を置き .claude/skills/ から symlink する）
find -L .claude/skills .agents/skills -mindepth 1 -maxdepth 1 -type d 2>/dev/null \
  | sed -E 's#.*/##' | sort -u
```

`find -L` で symlink を追従するため、`.claude/skills/` 配下が symlink でも、また
スキル実体が `.agents/skills/` 側にある場合でも取りこぼさない（`-type d` 単独だと
symlink エントリを除外してしまうため `-L` が必須）。

- `CLAUDE.md` の「リポジトリ管理スキル（.claude/skills/ に配置）」セクションを更新する
- 系統 B のスキルは `## Current Skills (N)` のカウント N に含めない
- セクションが存在しない場合は新規作成する

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
- **`.claude/skills/` の実ディレクトリ**: `find .claude/skills -maxdepth 1 -mindepth 1 -type d` で列挙し、`## Current Skills (N)` のカウントには含めない。「リポジトリ管理スキル」セクションに別管理する
- **symlink vs 実ディレクトリ**: `find -type d` はシンボリックリンクを除くため `github-docs` 等は自動除外される

## コード内コメントの観点（任意）

コメント補強を依頼された場合に適用する指針。CLAUDE.md 同期とは独立した作業として実施する。

### 基本方針

コメントは「何をするか」ではなく「このパッケージ・サービスにおける対象の役割」を記述する。
後続の読み手（Claude を含む）は渡された情報からしか判断できないため、以下の観点を明示する。

- **呼び出し元からの観点** — このシンボルが呼び出し元にとって何を提供するか
- **呼び出し先からの観点** — このシンボルが依存している外部サービス・モジュールとの関係
- **他ファイル・他サービスとの文脈** — 同じプロセスや隣接サービスにおける位置づけ

### 記述のポイント

- 実装の詳細（アルゴリズムの手順）ではなく、**役割・責務・境界**を述べる
- 変数名・型から自明な情報は繰り返さない。読み手が別ファイルを開かなくても文脈を把握できる情報を補う
- 公開 API（エクスポートされる関数・型・定数）は必ずコメントを付ける。非公開シンボルは複雑な場合のみ
- サービス間通信やイベント駆動の箇所では、どのイベント・エンドポイントと接続しているかを明記する

### 詳細規約の参照先

コメントスタイルの詳細（形式・言語・長さ・禁止事項）は対象リポジトリの `.claude/rules/code-comment-style.md` に従う。
当該ファイルが存在しない場合は、対象リポジトリの既存コメントスタイルに合わせる。
