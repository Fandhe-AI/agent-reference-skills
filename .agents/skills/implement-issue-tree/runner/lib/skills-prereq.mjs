// 生成物のプロンプトが名指しするスキルが、対象リポジトリでエージェントから見つかるかの起動時検査。
//
// 役割: 生成物の段は「create-commit スキルに従い…」のようにスキルを名指しする。Workflow 版は Claude Code の
// .claude/skills で解決されるが、Codex は自分の探索先しか読まない。見つからないとエージェントが
// 手順を推測で補うため、run.mjs が起動前（_/iit-runner を作る前）に存在を確かめ、無ければ終了コード 3 で止める。
//
// REQUIRED_SKILLS は src（dev/implement-issue-tree/scripts/implement-issue-tree.src.js）から導く。対象は
// 「<name> スキルに従」（手順をそのスキルに委ねる）と「skills/<name>/SKILL.md」（そのファイルの観点を読ませる）の
// 2 形で名指しされたもの。src に名前が出るだけの言及（「create-plan / implement-issue の計画粒度」）は含めない
// （create-plan は init-codex の導入対象 9 件に無いため、必須にすると配布先が起動できなくなる）。
// src との一致は dev/implement-issue-tree/tests/runner-skills-prereq.test.mjs が両方向で固定する。
//
// 探索先（対象リポジトリのメイン worktree 直下だけを見る。利用者のホームの探索先は見ない）:
//   codex: .agents/skills（openai-codex の reference extend/build-skills.md。$REPO_ROOT/.agents/skills）
// 隔離 worktree（実装・レビューの段）は base から作るため、スキルはメイン worktree に置くだけでなくコミット済みである
// 必要がある。この検査は存在だけを見る（README の前提に書く）。

import { statSync } from 'node:fs'
import { join } from 'node:path'

/** 生成物が名指しするスキル（src から導く。順序は名前順）。 */
export const REQUIRED_SKILLS = Object.freeze(['create-commit', 'create-pr', 'implement-review'])

/** ツールごとのプロジェクト内の探索先（メイン worktree からの相対パス）。 */
export const SKILL_DIRS = Object.freeze({
  codex: Object.freeze(['.agents/skills']),
})

const isFileDefault = (p) => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

/**
 * 見つからない必須スキルの名前を返す（空配列なら充足）。
 * @param {{ tool: string, root: string, isFile?: (path: string) => boolean, required?: readonly string[] }} p
 */
export function missingSkills({ tool, root, isFile = isFileDefault, required = REQUIRED_SKILLS }) {
  const dirs = SKILL_DIRS[tool]
  if (!dirs) throw new Error(`未知のツール: ${String(tool).slice(0, 40)}`)
  return required.filter((name) => !dirs.some((d) => isFile(join(root, d, name, 'SKILL.md'))))
}

/** prereq の文言。missing は missingSkills の戻り値（1 件以上）。 */
export function missingSkillsMessage(tool, missing) {
  const where = SKILL_DIRS[tool].map((d) => `${d}/<name>/SKILL.md`).join('・')
  return `必要なスキルが対象リポジトリに無い: ${missing.join(', ')}（${tool} の探索先 ${where} のどれかに置く。` +
    `init-${tool} で導入できる。隔離 worktree でも読めるようコミットしておく）`
}
