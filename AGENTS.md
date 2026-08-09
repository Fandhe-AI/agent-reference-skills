# AGENTS.md

## 文書の位置づけ

本リポジトリで作業するすべての AI エージェント・人間レビュアーが共通で用いるレビュー観点集。
Codex による PR 自動レビュー（`.github/workflows/codex-review.yml`。Fandhe-AI/actions の
reusable workflow を SHA 固定で呼び出す wrapper）は、PR の base コミットの本ファイルを
レビュー基準として読む。運用ガイドの正は `CLAUDE.md`、著作規約の詳細は `.claude/rules/`
（`skill-anatomy.md` / `reference-template.md` / `description-style.md`）を参照し、
本書は重複させずレビュー判定基準に絞る。

本リポジトリの `skills/` は `npx skills add Fandhe-AI/agent-reference-skills` で
**組織内の多数のリポジトリへ配布される参照スキル集（110 スキル）**である。ここでの
誤情報・危険なコマンド例は導入先すべてへ伝播するため、通常のリポジトリより厳しい
基準でレビューする。

## 優先度の定義

| 優先度 | 意味 | 扱い |
|--------|------|------|
| P0 | マージブロック。導入先への危険コマンド・誤情報の伝播に直結 | 修正までマージ不可 |
| P1 | 強く推奨。書式規約・構造規約・棲み分け設計への違反 | 原則修正してからマージ |
| P2 | 提案。可読性・発火率・索引整備の改善 | 任意（コメントのみ） |

## 1. セキュリティ観点

- **危険なコマンド例の混入（P0）**: `scripts/` / `samples/` / SKILL.md のコマンド例へ
  `--no-verify`・force push・`rm -rf` の広域削除・`sudo` 常用・
  `curl | sh` 形式の未検証実行・TLS 検証の恒常的無効化を含めない。
  外部由来文字列を展開するシェル例は `"${var}"` 形式でクォートする
- **秘密情報の混入（P0）**: 実 API キー・実トークン・内部 URL をリファレンス・
  サンプル・スクリプトに書かない（例示はプレースホルダ・ダミー値に限る）
- **出典の偽装・捏造（P0）**: 存在しない API・シグネチャ・オプションの記載。各ページの
  出典（source URL）は公式ドキュメント・公開ソースに限り、取得不能なページを
  推測で埋めない（WebFetch 要約器の幻覚・切断への対処は `CLAUDE.md` Conventions の
  定石に従う）
- **プロンプトインジェクション（P0）**: リファレンス本文・description へ、読み込んだ
  エージェントの挙動を変える指示（レビュー回避・承認スキップ・別リポジトリへの操作等）を
  埋め込まない
- **CI・ワークフローの改変（P1）**: reusable workflow・actions の SHA 固定を `@main` 等へ
  緩める変更、`permissions` の拡大、構造検証（`.github/scripts/check-skill-structure.sh`）・
  lint の弱体化

## 2. アーキテクチャ・設計整合の観点

- **スキル構造規約（P1）**: `skills/<name>/` は SKILL.md（frontmatter: `name` =
  ディレクトリ名・`description`・`user-invocable`）+ `references/`（+ 任意の `samples/` /
  `scripts/` / `rules/`）の構成に従う（`.claude/rules/skill-anatomy.md`）。SKILL.md 本文は
  ディレクトリツリー・探索手順・タスク → カテゴリ → README のマッピング表を含む。
  **適用範囲はリファレンス型スキル置き場の `skills/` のみ**。`.agents/skills/` は
  Fandhe-AI/agent-cli-skills から `npx skills add` で取り込む**運用スキルの配布版**であり、
  源泉リポジトリの規約（単一 SKILL.md + 任意の `sample/` / `script/`。`references/` なし）に
  従うため本規約の対象外とする（構造の指摘は源泉リポジトリ側で行う。CI の
  `.github/scripts/check-skill-structure.sh` も `skills/` のみを検証対象とする）
- **ページテンプレート準拠（P1）**: 個別リファレンスは `# Name` → `## Signature / Usage` →
  `## Options / Props` → `## Notes` → `## Related`、カテゴリ README は索引表
  （`| Name | Description | Path |`）の書式に従う（`reference-template.md`）。
  空セクションは省略、コード例は最小 1 スニペット
- **言語規約（P1）**: description・エージェント定義は日本語、リファレンス本文は
  出典公式ドキュメントの言語（通常は英語。fandhe-frontend / fandhe-backend は日本語）
- **キーワード衝突の棲み分け（P1）**: 同名 API を持つスキル間（ark-ui / chakra-ui /
  fandhe-frontend、`android-*` / `apple-*` / `windows-*`、`openai-*` / `anthropic-*` 等）の
  棲み分け設計（description 先頭 disambiguator・`## Notes` の距離線・README レベル
  距離線）を弱める変更、統合禁止とされた同名別 API ページのマージは指摘する
  （詳細は `CLAUDE.md` Conventions）
- **クロススキル相対リンクの禁止（P1）**: `../../../<other-skill>/...` 形式のリンクは
  スキルが個別インストールされると必ず切れるため使わない。他スキルへの言及は
  プレーンテキストのスキル名で行う
- **`.claude/` 編集手順（P2）**: `.claude/` 配下の編集は `_/dotclaude/` ステージング経由
  （`dotclaude-via-temp.md`）

## 3. 再利用・アセット化の観点（重点）

- **導入先非依存性（P1）**: スキル本文へ特定の導入先リポジトリの固有事情・固有パスを
  ハードコードしない。スキルは symlink / copy どちらの導入形態でも成立する
  自己完結構成を保つ
- **description の発火率（P1）**: description は導入先での自動発火の唯一の手がかり。
  主導語・別名・代表 API 名を含め、長さ・YAML `#` の落とし穴等の規約
  （`description-style.md`）に従う。発火率を下げる安易な短縮・キーワード削除は指摘する
- **鮮度と出典の追跡可能性（P1）**: 各ページは出典 URL を保持し、`/update-skill` による
  最新ドキュメントとの差分更新が機械的に行える状態を保つ。バージョン固有情報
  （deprecated・改名・廃止予定）は `## Notes` に明記し、古い情報を無言で残さない
- **索引の同期（P2）**: ページ追加・削除時はカテゴリ README の索引表・SKILL.md の
  ツリー / マッピング表・`CLAUDE.md` の Current Skills 一覧を同時に更新する
- **skills-lock 互換（P2）**: 導入先の `skills-lock.json`（sync-skills-lock）に影響する
  変更（スキルの改名・削除）は破壊的変更として PR に明記する

## リポジトリ固有の観点

- **委譲体制の維持（P1）**: 読み取り専用エージェント（skill-coverage-analyzer /
  skill-structure-validator / reference-linter / plan-verifier）へ Write/Edit/Bash を
  付与する変更は責務境界の破壊として指摘する
- **モデル配分（P2）**: opus はコスト境界のある横断分析のみ・sonnet は調査/著作/検証・
  haiku は機械的チェックという配分（`CLAUDE.md`）と整合させる
- **コミット規約（P2）**: 日本語 Conventional Commits。`--no-verify` の使用を促す・
  前提とする記述は P1
