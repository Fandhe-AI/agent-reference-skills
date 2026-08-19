// version-pin.test.mjs — Issue #393 の回帰テスト。
//
// `npx skills add` はバージョン未固定だと npx がレジストリの最新版を確認なしで
// 即実行するため、`skills`（vercel-labs/skills）パッケージが乗っ取られた場合に
// 任意コード実行の経路になる。固定版の正は SKILL.md の Step 3-5 フェンス内の
// `SKILLS_CLI_VERSION` 代入であり（SKILL.md の「skills CLI のバージョン固定と
// 更新手順」節参照）、このスキル内での正の定義箇所はそこ 1 箇所のみである。
//
// このテストは:
//   1. SKILL.md 内の全 SKILLS_CLI_VERSION 代入が exact semver（X.Y.Z。
//      dist-tag・レンジ禁止）であり、かつ相互一致すること
//   2. `npx skills` の実行行がすべて `skills@${SKILLS_CLI_VERSION}` 形式で
//      あり、未固定実行が残っていないこと
//   3. npx 実行行を含むフェンス自体に SKILLS_CLI_VERSION 代入が先行して
//      存在すること（#374 P1 R3: フェンスは独立シェルで実行され得るため）
// を検証する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
const SKILL_MD_PATH = join(SKILL_DIR, 'SKILL.md')

const EXACT_SEMVER = /^[0-9]+\.[0-9]+\.[0-9]+$/

function extractSkillMdVersions(content) {
  const matches = [...content.matchAll(/SKILLS_CLI_VERSION="([^"]*)"/g)]
  return matches.map((m) => m[1])
}

test('SKILL.md 内の SKILLS_CLI_VERSION 代入はすべて exact semver で、相互に一致する', () => {
  const versions = extractSkillMdVersions(readFileSync(SKILL_MD_PATH, 'utf8'))
  assert.ok(versions.length > 0, 'SKILL.md に SKILLS_CLI_VERSION 代入が見つからない')
  const first = versions[0]
  assert.match(first, EXACT_SEMVER, `dist-tag・レンジ禁止: ${first}`)
  for (const v of versions) {
    assert.match(v, EXACT_SEMVER, `dist-tag・レンジ禁止: ${v}`)
    assert.equal(v, first, `SKILL.md 内で SKILLS_CLI_VERSION の値が不一致: ${first} vs ${v}`)
  }
})

function extractBashFences(content) {
  const fences = []
  const re = /```bash\n([\s\S]*?)```/g
  let m
  while ((m = re.exec(content)) !== null) {
    fences.push(m[1])
  }
  return fences
}

// 実際にシェルで実行され得るコマンド行だけを対象にする。```bash フェンス内に
// 限定し、行頭（インデント許容）が `npx` で始まる行のみを拾うことで、
// frontmatter の description・地の文・見出し・インラインコード引用中の
// 「npx skills add」言及（例: update-claude の description 冒頭）を
// 誤検出しないようにする。
function extractExecLines(content) {
  return extractBashFences(content)
    .flatMap((fence) => fence.split('\n'))
    .filter((line) => /^\s*npx\b/.test(line))
}

test('SKILL.md に未固定の npx skills add が残っていない', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const execLines = extractExecLines(content).filter((line) => /\bskills\b/.test(line))
  assert.ok(execLines.length > 0, 'npx skills 実行行が見つからない（抽出ロジックの破損の可能性）')
  for (const line of execLines) {
    assert.match(line, /skills@\$\{SKILLS_CLI_VERSION\}/, `未固定の npx 実行: ${line}`)
  }
})

test('SKILL.md: npx skills 実行行を含むフェンス自体に SKILLS_CLI_VERSION の代入が先行して存在する', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fences = extractBashFences(content)
  const execFences = fences.filter((fence) =>
    fence.split('\n').some((line) => /^\s*npx\b/.test(line) && /\bskills\b/.test(line))
  )
  assert.ok(execFences.length > 0, 'npx skills 実行行を含むフェンスが見つからない')
  for (const fence of execFences) {
    const lines = fence.split('\n')
    const execIdx = lines.findIndex((line) => /^\s*npx\b/.test(line) && /\bskills\b/.test(line))
    const assignIdx = lines.findIndex((line) => /^\s*SKILLS_CLI_VERSION=/.test(line))
    assert.notEqual(
      assignIdx,
      -1,
      'npx 実行行と同一フェンス内に SKILLS_CLI_VERSION= 代入が無い（フェンス分離による未定義変数の退行リスク）'
    )
    assert.ok(
      assignIdx < execIdx,
      'SKILLS_CLI_VERSION= 代入が npx 実行行より後にある（実行時に未定義になる）'
    )
  }
})
