// skill-prerequisites.test.mjs — Issue #366 の再発防止テスト。
//
// PR #349（Issue #332、cross-repository スコープの明文化）で、SKILL.md の「前提条件」節に
// 「本スクリプトが対象 issue を処理できるのは parent_issue_url が null になってからである」
// という、条件節を伴わない断定 bullet が混入した。この記述は同一リポジトリ内の親からの
// 付け替え（Step 3 が `--old-parent` 付きで DELETE→POST する、本スキルの中核機能）まで
// 禁止しているように読め、Step 3 の契約と自己矛盾していた（Issue #366）。
//
// 実装（reassign-sub-issue.sh）は parent_issue_url のリポジトリ部分が対象 issue の
// repository_url と異なる場合にのみ fail-closed する。つまり null 要求は cross-repository の
// 親を持つ issue に限られる。この不変条件を「前提条件」節の bullet 構造から機械的に検証し、
// 将来また条件節を落とした断定表現が紛れ込んだ場合に検知できるようにする。
//
// 文面の逐語比較はしない（言い回しの変更だけで無意味に赤くなるのを避けるため）。
// bullet を「先頭が `- ` の論理項目（継続行を束ねる）」という構造で切り出し、
// null 要求を含む bullet が cross-repository の条件と同一 bullet 内にあるかどうかだけを見る。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_MD = join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md')

// 「## 前提条件」見出しから次の「## 」見出しまでのテキストを切り出す。
function extractPrerequisitesSection() {
  const text = readFileSync(SKILL_MD, 'utf8')
  const startMarker = '## 前提条件'
  const startIdx = text.indexOf(startMarker)
  assert.ok(startIdx !== -1, 'SKILL.md に "## 前提条件" 見出しが見つからない')
  const afterStart = startIdx + startMarker.length
  const nextHeadingIdx = text.indexOf('\n## ', afterStart)
  assert.ok(nextHeadingIdx !== -1, '"## 前提条件" の次の "## " 見出しが見つからない')
  return text.slice(afterStart, nextHeadingIdx)
}

// 先頭が `- ` の行を bullet の開始とみなし、次の bullet（または節末）までの
// 継続行（インデントされた行）を束ねて 1 論理項目にする。
function extractBullets(sectionText) {
  const lines = sectionText.split('\n')
  const bullets = []
  let current = null
  for (const line of lines) {
    if (/^- /.test(line)) {
      if (current !== null) bullets.push(current)
      current = line
    } else if (current !== null && /^\s+\S/.test(line)) {
      current += '\n' + line
    } else if (current !== null && line.trim() === '') {
      // 空行は bullet 継続とみなさないが、直後にまた継続行が来る書式もあるため
      // bullet を確定させずスキップする（前提条件節に空行区切りの bullet は無い想定）。
      continue
    }
  }
  if (current !== null) bullets.push(current)
  return bullets
}

// bullet 全体ではなく「。」区切りの文（継続行の改行は連結して 1 文として扱う）単位で判定する。
// Issue #366 の元の文言は、bullet 全体としては 'cross-repository' という語を含んでいたが、
// それは null 要求を述べる文とは別の文（親リンク取り外しの実施者を説明する文）に登場して
// いただけで、null 要求の文自体は無条件だった。bullet 単位の部分一致では両文が同じ bullet に
// あるだけで「限定されている」と誤判定してしまうため、null 要求を述べる文の内部にスコープ語
// （cross-repository 限定）または免除語（明示的な対象外）があるかどうかで判定する。
function extractSentences(bullet) {
  return bullet
    .replace(/\n\s*/g, '')
    .split('。')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

test('前提条件節: parent_issue_url の null 要求は同一文内に cross-repository 限定の条件を伴う', () => {
  const section = extractPrerequisitesSection()
  const bullets = extractBullets(section)
  assert.ok(bullets.length > 0, '前提条件節から bullet を 1 件も抽出できなかった')

  // parent_issue_url と null の両方に言及する bullet を網羅的に集める（特定の言い回しへの
  // 逐語一致では絞り込まない）。AC1 の断定 bullet と AC2 の肯定（免除）bullet の両方が
  // ここに入り得るため、各 bullet を「cross-repository 限定」または「明示的な免除」の
  // いずれかの極性で判定する。将来、言い回しは違うが両方を欠く裸の断定 bullet が
  // 紛れ込んだ場合にこの判定がすり抜けを許さない（Issue #366 の再発防止）。
  const nullMentioningBullets = bullets.filter(
    (b) => b.includes('parent_issue_url') && b.includes('null')
  )
  assert.ok(
    nullMentioningBullets.length > 0,
    'parent_issue_url と null の両方に言及する bullet が見つからない（前提条件節の構成が変わった可能性）'
  )

  for (const bullet of nullMentioningBullets) {
    // null 要求そのものを述べている文（parent_issue_url と null の両方を含む文）だけを
    // 対象にする。bullet 内の他の文（例: 実施者の説明）に cross-repository が登場しているだけ
    // では、null 要求自体が限定されているとはみなさない。
    const nullRequirementSentences = extractSentences(bullet).filter(
      (s) => s.includes('parent_issue_url') && s.includes('null')
    )
    assert.ok(
      nullRequirementSentences.length > 0,
      `parent_issue_url と null の両方を含む bullet だが、両方を含む文が抽出できない（文分割ロジックの不備の可能性）:\n${bullet}`
    )

    for (const sentence of nullRequirementSentences) {
      const isCrossRepoScoped = sentence.includes('別リポジトリ') || sentence.includes('cross-repository')
      const isExplicitExemption = sentence.includes('必要はない') || sentence.includes('対象外')
      assert.ok(
        isCrossRepoScoped || isExplicitExemption,
        `null 要求を述べる文が cross-repository 限定でも明示的な免除でもない（Issue #366 の再発）:\n${sentence}`
      )
    }
  }
})

test('前提条件節: 同一リポジトリ内の付け替えが --old-parent による通常フローであると明記されている', () => {
  const section = extractPrerequisitesSection()
  const bullets = extractBullets(section)

  const sameRepoBullets = bullets.filter((b) => b.includes('同一リポジトリ'))
  assert.ok(
    sameRepoBullets.length > 0,
    '同一リポジトリ内の付け替えに言及する bullet が前提条件節に見つからない（AC2 未充足）'
  )
  assert.ok(
    sameRepoBullets.some((b) => b.includes('--old-parent')),
    '同一リポジトリ内の付け替えに言及する bullet が --old-parent への言及を伴っていない'
  )
})
