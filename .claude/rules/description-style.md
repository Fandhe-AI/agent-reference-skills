---
name: description-style
description: "SKILL.md description のヒット率・長さ最適化（名詞列挙・略語含む・上限 400 字・先頭 160 字に要点）と YAML の # コメント化回避。"
applies_to:
  - skill-author
  - description-optimizer
  - reference-researcher
---

# description 書き方ガイド

SKILL.md の `description` フィールドの書き方。検索ヒット率と長さの最適化が目的。

## 目的

`npx skills add` はキーワード検索で対象スキルを絞り込む。description の語の密度がヒット率に直結する。
一方、過長な description は読み取りコストが高く管理も困難になる。両立が必須。

Codex は導入スキル数に応じて description を切り詰めて一覧表示する（初期一覧の予算はコンテキストの 2%、不明時 8,000 字）。
実測（codex-cli 0.164.0、本リポジトリのスキルを `.agents/skills/` に導入）で 1 件あたりの表示長は
5 件導入 ≈340 字、10 件 ≈270 字、20 件 ≈200 字、50 件 ≈160 字（Codex 組み込み 4 スキルを含む一覧での値。
モデルのコンテキスト長と他に導入済みのスキル数で変わる）。末尾ほど消えるため先頭に要点を寄せる。

## ルール

- `>` ブロックスカラーを使う（複数行に折り返せる）
- 主要 API・概念を名詞で列挙する（文章で説明しない）
- 定着した別名・略語を含める
  - 例: `feature-sliced-design` → FSD
  - 例: `react-router-v7` → RR7
  - 例: `react-hook-form` → RHF
- 英語 API 名・パッケージ名はそのまま英語で記載する
- 冗長な助詞・繋ぎ言葉を避け、語の密度を上げる
- 長さ: 上限 400 字、目安 300〜380 字（改行・連続空白を 1 空白に畳んだ文字数で数える）
- 先頭 160 字に disambiguator（製品名・言語・版）・主用途・最重要 API / 別名を収める。補助キーワードはその後ろ
- 「〜とは別」等の距離線は末尾に置いてよいが、Codex で切り詰められると消える前提で書く（本体の棲み分けは per-page `## Notes` が担う）

## YAML の落とし穴

`#` を含む語・`#` で始まる語はそのままだと YAML コメント扱いになり description が途切れる。
クォートするか表現を変えて保護する。`:` の連続にも注意（値と誤認される）。

```yaml
# 悪い例 — `#` 以降がコメントになり内容が消える
description: >
  React Hook Form のバリデーション。# useState を使わない制御非依存設計。

# 良い例 — 表現を変えて保護
description: >
  React Hook Form のバリデーション。useState 不要の制御非依存設計。
  register, useForm, useController, FormProvider
```

```yaml
# 悪い例 — `:` の連続で値と誤認
description: >
  対応: zod, yup, joi スキーマ

# 良い例 — 語順変更で回避
description: >
  zod / yup / joi スキーマ対応。バリデーション統合。
```

## 良い例 / 悪い例

```yaml
# 悪い例 — 文章調で冗長、略語なし、語の密度が低い
description: >
  Feature Sliced Design というアーキテクチャのリファレンスです。
  レイヤーやスライスの概念について説明しています。

# 良い例 — 名詞列挙、略語 FSD 含む、密度が高い
description: >
  Feature Sliced Design (FSD) アーキテクチャリファレンス。
  layers, slices, segments, Public API, cross-import 規約、
  shared / entities / features / widgets / pages / app 構成。
```

## 関連

- `.claude/rules/skill-anatomy.md`
- `.claude/rules/japanese-style.md`
