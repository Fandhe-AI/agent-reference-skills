# 系統 B 件数整合性の実測例（`Fandhe-AI/agent-cli-skills`）

このファイルは `SKILL.md` の「系統 B（B2・B3）」検証手順を初めて適用する際の**具体例**として、
本リポジトリ（`Fandhe-AI/agent-cli-skills`）で実測した値を記録したものである。

**この値は本リポジトリ専用のスナップショットであり、他リポジトリでの期待値ではない。**
消費側リポジトリでは `skills/` の構成・`.claude/skills/` のレイアウトが異なるため、
`SKILL.md` の検証コマンドを実行して**そのリポジトリの実測値**を得ること。この例は
「整合式がどう成立するか」を読み解くための参考としてのみ使う。

## 実測値（2026-08-19・`Fandhe-AI/agent-cli-skills`・`classify_b`（物理解決先ベース）再実測）

本リポジトリの `.claude/skills/<name>` は全エントリが子 symlink 型（`.claude/skills` 自体は
実ディレクトリ）のため、Issue #408 で分類ロジックを物理解決先ベース（`classify_b`）へ変更した
後もこのレイアウトでの分類結果自体は変わらない。以下は変更後の `classify_b` / `extract_b1` /
`extract_b2` / `extract_b3` を新規実行して再確認した値である。

| 系統 | 件数 | 内容 |
|------|------|------|
| A | 26 | 配布可能スキル（`## Current Skills (26)` と一致） |
| B（全列挙） | 29 | B1(24) + B2(2) + B3(3) + B4(0) |
| B1 | 24 | `skills/<name>` の物理解決先が `.claude/skills/<name>` の物理解決先と一致し系統 A で計上済み。`skills/` にあって B1 に現れないのは `contribute-skill`・`sync-skills-lock` の 2 件（26 − 24 = 2） |
| B2 | 2 | `create-agent`・`create-skill`（`skills-lock.json` タイブレークで除外された項目なし） |
| B3 | 3 | `anthropic-claude-code`・`anthropic-claude-code-extend`・`github-docs`（いずれも `.claude/skills/<name>` の物理解決先が `.agents/skills/<name>` の物理解決先と一致することを検証済み） |
| B4 | 0 | 誤配置・判定不能は無し（`jq` は利用可能、解決先の不一致も無し） |

## 整合式の読み方

- `B1 + B2 + B3 + B4 = B（全列挙）` → `24 + 2 + 3 + 0 = 29`
- `A − B1 = B1 に現れない配布スキル数` → `26 − 24 = 2`

この 2 本の等式が、対象リポジトリの実測値でも成立することを確認するのが `SKILL.md` の
検証手順の目的である。値そのものは各リポジトリの構成変更のたびに陳腐化するため、
`SKILL.md` 本文にはこの等式（プレースホルダー）のみを残し、実測値はここでのみ更新する。
