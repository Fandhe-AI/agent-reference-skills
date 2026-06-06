---
name: skill-anatomy
description: 配布スキルのディレクトリレイアウト・SKILL.md 構成・コンテンツ種別（references / samples / scripts）の役割分担。
paths:
  - "skills/**/*"
---

# スキル構造（解剖図）

配布スキル1つの構成要素と各ファイルの役割。

## ディレクトリレイアウト

```
skills/<library-name>/
  SKILL.md                          # エントリポイント（frontmatter + 探索ガイド）
  references/
    <category>/
      README.md                     # カテゴリ索引表
      <page>.md                     # 個別リファレンスページ
  samples/                          # Claude の作業参考になる実例・典型ワークフロー（README 索引付き）
    README.md                       # サンプル索引表
    <use-case>.md                   # 個別サンプルファイル（1ユースケース1ファイル）
  scripts/                          # 実行可能コマンド集（インストール / CLI / 生成 / テスト等。README 索引付き）
    README.md                       # スクリプト索引表
    <category>.md                   # カテゴリ別コマンドファイル
  rules/                            # 任意: 強制ルール（feature-sliced-design 等）
    <rule>.md
```

## SKILL.md frontmatter 仕様

| フィールド | 値 | 備考 |
| --- | --- | --- |
| `name` | ディレクトリ名と一致 | ハイフン区切り小文字 |
| `description` | 日本語・`>` ブロックスカラー | description-style.md 準拠 |
| `user-invocable` | `false`（通常） | Claude が自動参照する場合は false |

## SKILL.md 本文の構成

1. **ディレクトリツリー** — `references/` `samples/` `scripts/` 配下のカテゴリと主要ファイルを列挙（存在するディレクトリのみ）
2. **探索手順** — タスクからカテゴリを引く手順（番号リスト）
3. **タスク→カテゴリ→README マッピング表** — references だけでなく samples / scripts も探索対象に含める

```markdown
| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| スキーマ定義 | schema | references/schema/README.md |
| バリデーション | validation | references/validation/README.md |
| 典型的な使い方を知りたい | samples | samples/README.md |
| インストール・CLI コマンドを知りたい | scripts | scripts/README.md |
```

## コンテンツ種別

各ディレクトリの役割分担:

| ディレクトリ | 役割 | 情報源 |
| --- | --- | --- |
| `references/` | 公式ドキュメントを蒸留した API リファレンス。シグネチャ・オプション・動作を正確に記述 | 公式ドキュメント |
| `samples/` | 動く実例・典型ワークフロー。「実際にこう使う」を示す最小コード断片 | 公式ドキュメント・公式サンプル |
| `scripts/` | コピペで実行できるコマンド集。インストール・CLI・生成・テスト・運用等 | 公式ドキュメント・公式 README |

3つは互いに補完する関係: references は「何か」、samples は「どう使うか」、scripts は「どう実行するか」を担う。

## 例外パターン

| パターン | 例スキル | 説明 |
| --- | --- | --- |
| references/ を持たず SKILL.md に埋め込む | tsdoc | ページ数が少なくガイドライン型のスキル |
| `rules/` を持つ | feature-sliced-design | 「何であるか（references）」と「どう強制するか（rules）」を分離 |

## 関連

- `.claude/rules/reference-template.md`
- `.claude/rules/description-style.md`
