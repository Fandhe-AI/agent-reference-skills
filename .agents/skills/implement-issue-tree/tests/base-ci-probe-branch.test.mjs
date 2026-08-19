// implement-issue-tree の base CI プローブ（automerge-design.md「補償策の成立確認（base CI
// プローブ）」節）が、既定ブランチ決め打ちではなく **対象（マージ先）ブランチ** を検査すること
// の決定的回帰テスト（Issue #362）。
//
// 背景: プローブは `args.branch` で任意のマージ先（`release/1.0` 等）を指定できる本スキルの
// 補償策成立確認手順であるにもかかわらず、`gh repo view --json defaultBranchRef` で解決した
// 既定ブランチだけを無条件に検査していた。既定ブランチが green であれば、実際のマージ先で
// push CI が起動しない・失敗していても「補償策成立・base 健全」と誤判定する（fail-open 方向の
// 誤り）。修正（案 A 採用）はプローブの引数形式を `owner/repo[@branch]:workflow1,workflow2...`
// へ拡張し、`@branch` 省略時のみ既定ブランチへフォールバックするようにした。
//
// 群F・群G（Issue #363）: 必須 workflow 集合の入力形式をカンマ区切り文字列から JSON 配列へ
// 変更する回帰テスト。GitHub Actions の workflow レベル `name:` にはカンマを含められるため
// （例: `name: Build, Test`）、カンマ区切りでは区切り文字と衝突し存在しない複数名へ誤分割
// される。入力形式は `owner/repo[@branch]:["workflowName1","workflowName2"]` へ変更し、
// 旧カンマ区切り形式は判定不能として拒否する（フォールバック解釈もしない）。
//
// 群構成:
//   群 A（構造の固定）: 節内の ```bash ブロックがちょうど 1 個で決定的に抽出できること。
//   群 B（シェル構文の健全性）: 抽出ブロックが `bash -n` を通ること（case/クォートの編集ミス検出）。
//   群 C（契約の固定）: `@<branch>` 明示分岐の存在・`defaultBranchRef` の全出現がフォールバック
//     分岐内にあること・`db`/`db_enc` の残存が無いこと（改名漏れ検出）・jq への対象ブランチ
//     束縛（`--arg b "${branch}"`）・SKILL.md 側の前提条件記述の追随、をそれぞれ固定する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const DESIGN_DOC_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'references', 'automerge-design.md',
)
const SKILL_MD_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'SKILL.md',
)

const SECTION_HEADING = '**補償策の成立確認（base CI プローブ）**'
const NEXT_SECTION_HEADING = '- **不成立時の扱い（3 択・順に推奨）**:'

const doc = readFileSync(DESIGN_DOC_PATH, 'utf8')

const sectionStart = doc.indexOf(SECTION_HEADING)
const sectionEnd = doc.indexOf(NEXT_SECTION_HEADING, sectionStart)

test('前提: 節の見出しが両方とも存在する（見出し変更でテストが静かに空振りしないことの保証）', () => {
  assert.ok(sectionStart !== -1, '「補償策の成立確認（base CI プローブ）」見出しが見つからない')
  assert.ok(sectionEnd !== -1, '「不成立時の扱い」見出しが見つからない')
  assert.ok(sectionEnd > sectionStart, '見出しの順序が想定と異なる')
})

const section = doc.slice(sectionStart, sectionEnd)

// ---------------------------------------------------------------------------
// 群 A: 構造の固定 — ```bash ブロックがちょうど 1 個
// ---------------------------------------------------------------------------
const codeBlockMatches = [...section.matchAll(/```bash\n([\s\S]*?)\n {2}```/g)]

test('群A: 節内に bash コードブロックがちょうど 1 個ある', () => {
  assert.equal(
    codeBlockMatches.length,
    1,
    `想定外の bash コードブロック数: ${codeBlockMatches.length}`,
  )
})

const scriptBody = codeBlockMatches[0][1]
  .split('\n')
  .map((line) => (line.startsWith('  ') ? line.slice(2) : line))
  .join('\n')

// ---------------------------------------------------------------------------
// 群 B: シェル構文の健全性 — bash -n
// ---------------------------------------------------------------------------
test('群B: 抽出したプローブスクリプトが bash -n を通る（構文エラーがない）', () => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-'))
  const scriptPath = join(tmpDir, 'probe.sh')
  try {
    writeFileSync(scriptPath, scriptBody, 'utf8')
    // execFileSync は非ゼロ終了で例外を投げるため、成功 = 構文エラーなしの直接証拠になる。
    execFileSync('bash', ['-n', scriptPath], { encoding: 'utf8' })
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

// ---------------------------------------------------------------------------
// 群 C: 契約の固定
// ---------------------------------------------------------------------------
test('群C: entry を owner/repo[@branch] と workflow 集合へ分解する明示分岐がある', () => {
  assert.match(
    scriptBody,
    /case "\$\{target\}" in\s*\n\s*\*@\*\)\s*repo="\$\{target%%@\*\}";\s*branch="\$\{target#\*@\}"/,
    '`case "${target}" in *@*)` 相当の owner/repo[@branch] 明示分岐が見つからない',
  )
})

test('群C: defaultBranchRef の出現はすべてブランチ省略時のフォールバック分岐内にある', () => {
  const occurrences = [...scriptBody.matchAll(/defaultBranchRef/g)]
  assert.ok(occurrences.length >= 1, 'defaultBranchRef の出現が見つからない')

  // フォールバック分岐（else 節）は `if [ -n "${branch}" ]; then ... else` の else 側にある。
  // 全出現がその else マーカーより後ろにあることを固定する（明示分岐の中に既定ブランチ解決が
  // 紛れ込む退行を検出する。1 出現に固定しないのは、else 節内で JSON フィールド名 (--json
  // defaultBranchRef) と jq フィルタ (.defaultBranchRef.name) の 2 箇所に加え、取得失敗時の
  // エラーメッセージにも同語が出るため、実装として複数回出現するのが正当なケースのため）。
  const elseIndex = scriptBody.indexOf('  else\n    branch=$(gh repo view')
  assert.ok(elseIndex !== -1, 'ブランチ省略時のフォールバック分岐（else）が見つからない')
  for (const occurrence of occurrences) {
    assert.ok(
      occurrence.index > elseIndex,
      `defaultBranchRef の出現（index=${occurrence.index}）がフォールバック分岐より前（明示分岐側）にある`,
    )
  }
})

test('群C: db / db_enc の残存が無い（branch / branch_enc への改名漏れ検出）', () => {
  assert.doesNotMatch(scriptBody, /\bdb\b/, '変数名 db の残存を検出した（branch へ改名すること）')
  assert.doesNotMatch(
    scriptBody,
    /\bdb_enc\b/,
    '変数名 db_enc の残存を検出した（branch_enc へ改名すること）',
  )
})

test('群C: jq への対象ブランチ束縛が --arg b "${branch}" である', () => {
  assert.match(
    scriptBody,
    /--arg b "\$\{branch\}"/,
    '`--arg b "${branch}"` による jq への対象ブランチ束縛が見つからない',
  )
})

test('群C: 引数形式の説明が owner/repo[@branch] 形式を明示する', () => {
  assert.match(section, /owner\/repo\[@branch\]/, '引数形式の説明に owner/repo[@branch] が含まれない')
})

// ---------------------------------------------------------------------------
// 群 D（Issue #362 追補・PR #378 指摘対応）: "@" 明示かつ branch 空は fail-closed
// ---------------------------------------------------------------------------
test('群D: @ の後が空（owner/repo@:["workflow"]）は defaultBranchRef へフォールバックせず判定不能で終端する', () => {
  assert.match(
    scriptBody,
    /branch_explicit=1[\s\S]*?if \[ "\$\{branch_explicit\}" = 1 \] && \[ -z "\$\{branch\}" \]; then/,
    'branch_explicit を用いた「@ 明示かつ branch 空」の fail-closed 分岐が見つからない',
  )

  // 実行レベルでも固定する: この分岐が defaultBranchRef フォールバック（else 節）より
  // 前で continue するため、"owner/repo@:workflow" 系の入力では gh repo view が
  // 一切呼ばれないことをモック gh で検証する（fail-open 退行の直接検出）。
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-fc-'))
  try {
    const callLog = join(tmpDir, 'gh-calls.log')
    const ghMock = join(tmpDir, 'gh')
    writeFileSync(
      ghMock,
      `#!/usr/bin/env bash
echo "$@" >> "${callLog}"
exit 1
`,
      { mode: 0o755 },
    )
    const scriptPath = join(tmpDir, 'probe.sh')
    writeFileSync(scriptPath, scriptBody, 'utf8')

    let stdout = ''
    try {
      stdout = execFileSync('bash', [scriptPath, 'owner/repo@:["workflow1"]'], {
        encoding: 'utf8',
        env: { ...process.env, PATH: `${tmpDir}:${process.env.PATH}` },
      })
    } catch (err) {
      // jq 不在等で早期 exit する環境もあるため、stdout があればそれを使う。
      stdout = err.stdout ?? ''
    }

    assert.match(stdout, /判定不能/, '空ブランチ入力が判定不能として報告されていない')
    assert.doesNotMatch(
      stdout,
      /defaultBranchRef/,
      '空ブランチ入力で defaultBranchRef フォールバック側の出力が発生している',
    )

    let callLogContent = ''
    try {
      callLogContent = readFileSync(callLog, 'utf8')
    } catch {
      callLogContent = ''
    }
    assert.doesNotMatch(
      callLogContent,
      /repo view/,
      '空ブランチ入力で gh repo view（defaultBranchRef 解決）が呼ばれている',
    )
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

// ---------------------------------------------------------------------------
// 群 E（PR #378 Cursor Bugbot 指摘対応）: LC_ALL=C は grep に付与する（printf ではない）
// ---------------------------------------------------------------------------
test('群E: 非 ASCII 検知の LC_ALL=C は printf ではなく grep に付与されている', () => {
  assert.doesNotMatch(
    scriptBody,
    /LC_ALL=C printf/,
    'LC_ALL=C が printf に誤って付与されている（ロケールは grep のブラケット式にのみ影響するため無効）',
  )
  assert.match(
    scriptBody,
    /\| LC_ALL=C grep -q '\[\^ -~\]'/,
    'LC_ALL=C grep による非 ASCII 検知（`[^ -~]`）が見つからない',
  )
})

// ---------------------------------------------------------------------------
// 群 F（Issue #363・静的契約）: 必須 workflow 集合が JSON 配列で受け渡しされる
// ---------------------------------------------------------------------------
test('群F: 必須集合への split(",") が残っていない', () => {
  assert.doesNotMatch(
    scriptBody,
    /split\(","\)/,
    'スクリプト内に必須集合への split(",") が残っている（カンマ入り workflow 名が誤分割される）',
  )
})

test('群F: 必須集合は --argjson req "${required_json}" で jq へ渡される', () => {
  const occurrences = [...scriptBody.matchAll(/--argjson req "\$\{required_json\}"/g)]
  assert.ok(
    occurrences.length >= 2,
    `--argjson req "\${required_json}" の束縛が想定数（bad_hit・required_map の 2 箇所）に満たない: ${occurrences.length}`,
  )
})

test('群F: 必須集合の JSON 配列妥当性検証ブロックがある（型・要素数・非空文字列）', () => {
  assert.match(
    scriptBody,
    /type == "array" and length >= 1 and all\(\.\[\]; type == "string" and length > 0\)/,
    'JSON 配列検証（type==array・length>=1・全要素が非空文字列）が見つからない',
  )
})

test('群F: 節の散文・ヘッダコメントが JSON 配列形式を明示する', () => {
  assert.match(
    section,
    /\["workflowName1","workflowName2"\]/,
    '節の散文にプローブ引数の JSON 配列形式の例が見つからない',
  )
  assert.match(
    scriptBody,
    /\["workflowName1","workflowName2"\]/,
    'ヘッダコメントに JSON 配列形式の引数例が見つからない',
  )
  assert.match(
    section,
    /旧カンマ区切り形式は受理しない/,
    '節の散文に旧カンマ区切り形式を受理しない旨の記述が見つからない',
  )
})

// ---------------------------------------------------------------------------
// 群 G（Issue #363・実行レベル）: gh をモックした green 経路 / 旧形式 fail-closed
// ---------------------------------------------------------------------------
function hasJq() {
  try {
    execFileSync('bash', ['-c', 'command -v jq'], { encoding: 'utf8' })
    return true
  } catch {
    return false
  }
}

const HEAD_SHA = 'a'.repeat(40)

function writeGhMock(dir) {
  const callLog = join(dir, 'gh-calls.log')
  const ghMock = join(dir, 'gh')
  writeFileSync(
    ghMock,
    `#!/usr/bin/env bash
echo "$@" >> "${callLog}"
args="$*"
case "\${args}" in
  *"-i repos/owner/repo/commits/main"*)
    printf 'HTTP/2.0 200 OK\\r\\n\\r\\n{"sha":"${HEAD_SHA}"}\\n'
    ;;
  *"repos/owner/repo/commits/main --jq .sha"*)
    echo "${HEAD_SHA}"
    ;;
  *"repos/owner/repo/actions/workflows --paginate --slurp"*)
    echo '[{"workflows":[{"name":"Build, Test","path":".github/workflows/bt.yml","id":111,"state":"active"}]}]'
    ;;
  *"run list -R owner/repo -c ${HEAD_SHA}"*)
    echo '[{"workflowName":"Build, Test","workflowDatabaseId":111,"status":"completed","conclusion":"success","event":"push","headBranch":"main"}]'
    ;;
  *)
    echo "UNMOCKED gh call: \${args}" >&2
    exit 1
    ;;
esac
`,
    { mode: 0o755 },
  )
  return { callLog, ghMock }
}

test('群G: カンマ入り workflow 名の green 経路（"Build, Test" が 2 名へ誤分割されない）', { skip: !hasJq() }, () => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-g-green-'))
  try {
    writeGhMock(tmpDir)
    const scriptPath = join(tmpDir, 'probe.sh')
    writeFileSync(scriptPath, scriptBody, 'utf8')

    const stdout = execFileSync(
      'bash',
      [scriptPath, 'owner/repo@main:["Build, Test"]'],
      { encoding: 'utf8', env: { ...process.env, PATH: `${tmpDir}:${process.env.PATH}` } },
    )

    const line = stdout.trim().split('\n').pop()
    const result = JSON.parse(line)
    assert.deepEqual(
      result.required_missing,
      [],
      `カンマ入り workflow 名が誤分割され required_missing が空でない: ${line}`,
    )
    assert.equal(result.push_total, 1, `push_total が想定と異なる: ${line}`)
    assert.equal(result.failed, 0, `failed が想定と異なる: ${line}`)
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

test('群G: 旧カンマ区切り形式は JSON 不正として fail-closed し gh API を一切呼ばない', { skip: !hasJq() }, () => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-g-legacy-'))
  try {
    const { callLog } = writeGhMock(tmpDir)
    const scriptPath = join(tmpDir, 'probe.sh')
    writeFileSync(scriptPath, scriptBody, 'utf8')

    const stdout = execFileSync(
      'bash',
      [scriptPath, 'owner/repo@main:CI,Lint'],
      { encoding: 'utf8', env: { ...process.env, PATH: `${tmpDir}:${process.env.PATH}` } },
    )

    assert.match(stdout, /判定不能/, '旧カンマ区切り形式が判定不能として報告されていない')
    assert.match(stdout, /JSON 配列でない/, '判定不能理由が JSON 配列不正を示していない')

    let callLogContent = ''
    try {
      callLogContent = readFileSync(callLog, 'utf8')
    } catch {
      callLogContent = ''
    }
    assert.equal(
      callLogContent,
      '',
      `旧カンマ区切り形式の拒否前に gh API が呼ばれている: ${callLogContent}`,
    )
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

// ---------------------------------------------------------------------------
// 群 H（Issue #364・実行レベル）: 集計対象を必須 workflow の run に限定する
// ---------------------------------------------------------------------------
// 背景: 必須集合に含まれない workflow（`paths` フィルタ付き等）が `skipped`/`neutral` で
// 完了しても、集計対象が全 push run（$p）のままだと unknown が正になり green へ倒れない
// （Cursor Bugbot Medium・Fandhe-AI/automation-app#2018 由来）。集計は必須 workflow の
// run（$rp）に限定し、必須外 run の結果は判定に影響させない。ただし必須 workflow 自身が
// skipped/neutral の場合は従来どおり unknown へ倒す（厳格側の設計は必須集合内で維持）。
function writeGhMockWithExtraRun(dir, extraRun) {
  const callLog = join(dir, 'gh-calls.log')
  const ghMock = join(dir, 'gh')
  writeFileSync(
    ghMock,
    `#!/usr/bin/env bash
echo "$@" >> "${callLog}"
args="$*"
case "\${args}" in
  *"-i repos/owner/repo/commits/main"*)
    printf 'HTTP/2.0 200 OK\\r\\n\\r\\n{"sha":"${HEAD_SHA}"}\\n'
    ;;
  *"repos/owner/repo/commits/main --jq .sha"*)
    echo "${HEAD_SHA}"
    ;;
  *"repos/owner/repo/actions/workflows --paginate --slurp"*)
    echo '[{"workflows":[{"name":"Build, Test","path":".github/workflows/bt.yml","id":111,"state":"active"},{"name":"Docs","path":".github/workflows/docs.yml","id":222,"state":"active"}]}]'
    ;;
  *"run list -R owner/repo -c ${HEAD_SHA}"*)
    echo '[{"workflowName":"Build, Test","workflowDatabaseId":111,"status":"completed","conclusion":"success","event":"push","headBranch":"main"},${extraRun}]'
    ;;
  *)
    echo "UNMOCKED gh call: \${args}" >&2
    exit 1
    ;;
esac
`,
    { mode: 0o755 },
  )
  return { callLog, ghMock }
}

test('群H: 必須外 workflow の skipped は判定に影響しない（green 維持）', { skip: !hasJq() }, () => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-h-green-'))
  try {
    writeGhMockWithExtraRun(
      tmpDir,
      '{"workflowName":"Docs","workflowDatabaseId":222,"status":"completed","conclusion":"skipped","event":"push","headBranch":"main"}',
    )
    const scriptPath = join(tmpDir, 'probe.sh')
    writeFileSync(scriptPath, scriptBody, 'utf8')

    const stdout = execFileSync(
      'bash',
      [scriptPath, 'owner/repo@main:["Build, Test"]'],
      { encoding: 'utf8', env: { ...process.env, PATH: `${tmpDir}:${process.env.PATH}` } },
    )

    const line = stdout.trim().split('\n').pop()
    const result = JSON.parse(line)
    assert.deepEqual(result.required_missing, [], `required_missing が空でない: ${line}`)
    assert.equal(result.failed, 0, `failed が想定と異なる: ${line}`)
    assert.equal(result.incomplete, 0, `incomplete が想定と異なる: ${line}`)
    assert.equal(
      result.unknown,
      0,
      `必須外 workflow の skipped が集計に混入し unknown が正になっている: ${line}`,
    )
    assert.equal(result.push_total, 2, `push_total（全 push run）が想定と異なる: ${line}`)
    assert.equal(
      result.required_push_total,
      1,
      `required_push_total（必須 run のみ）が想定と異なる: ${line}`,
    )
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

test('群H: 必須 workflow 自身の skipped は unknown 維持（厳格側の設計を緩めない）', { skip: !hasJq() }, () => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'base-ci-probe-h-strict-'))
  try {
    const callLog = join(tmpDir, 'gh-calls.log')
    const ghMock = join(tmpDir, 'gh')
    writeFileSync(
      ghMock,
      `#!/usr/bin/env bash
echo "$@" >> "${callLog}"
args="$*"
case "\${args}" in
  *"-i repos/owner/repo/commits/main"*)
    printf 'HTTP/2.0 200 OK\\r\\n\\r\\n{"sha":"${HEAD_SHA}"}\\n'
    ;;
  *"repos/owner/repo/commits/main --jq .sha"*)
    echo "${HEAD_SHA}"
    ;;
  *"repos/owner/repo/actions/workflows --paginate --slurp"*)
    echo '[{"workflows":[{"name":"Build, Test","path":".github/workflows/bt.yml","id":111,"state":"active"}]}]'
    ;;
  *"run list -R owner/repo -c ${HEAD_SHA}"*)
    echo '[{"workflowName":"Build, Test","workflowDatabaseId":111,"status":"completed","conclusion":"skipped","event":"push","headBranch":"main"}]'
    ;;
  *)
    echo "UNMOCKED gh call: \${args}" >&2
    exit 1
    ;;
esac
`,
      { mode: 0o755 },
    )
    const scriptPath = join(tmpDir, 'probe.sh')
    writeFileSync(scriptPath, scriptBody, 'utf8')

    const stdout = execFileSync(
      'bash',
      [scriptPath, 'owner/repo@main:["Build, Test"]'],
      { encoding: 'utf8', env: { ...process.env, PATH: `${tmpDir}:${process.env.PATH}` } },
    )

    const line = stdout.trim().split('\n').pop()
    const result = JSON.parse(line)
    assert.ok(
      result.unknown >= 1,
      `必須 workflow 自身の skipped が unknown へ計上されず green へ倒れている: ${line}`,
    )
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
})

// ---------------------------------------------------------------------------
// 群 H（静的契約）: $rp（必須 run 部分集合）への走査限定と required_push_total の出力
// ---------------------------------------------------------------------------
test('群H: failed/incomplete/unknown の走査が $rp[] を参照する（$p[] 走査への退行検出）', () => {
  assert.match(
    scriptBody,
    /\[\$rp\[\] \| select\(\.status != "completed"\)\]/,
    'incomplete の集計が $rp[] を走査していない',
  )
  assert.doesNotMatch(
    scriptBody,
    /\[\$p\[\] \| select\(\.status != "completed"\)\]/,
    'incomplete の集計が退行して $p[] を走査している（必須外 run が混入する）',
  )
})

test('群H: 必須 run 部分集合 $rp が $req_ids（必須集合の id）との突き合わせで抽出される', () => {
  assert.match(
    scriptBody,
    /\$rp/,
    '必須 run 部分集合 $rp が見つからない',
  )
  assert.match(
    scriptBody,
    /IN\(\$req_ids\[\]\)/,
    '$rp の抽出に IN($req_ids[]) 相当の id 突き合わせが見つからない',
  )
})

test('群H: 出力に required_push_total が含まれる', () => {
  assert.match(
    scriptBody,
    /required_push_total:/,
    '出力オブジェクトに required_push_total フィールドが見つからない',
  )
})

// ---------------------------------------------------------------------------
// SKILL.md 側の前提条件記述の追随
// ---------------------------------------------------------------------------
const skillMd = readFileSync(SKILL_MD_PATH, 'utf8')

test('SKILL.md: 旧文言「defaultBranchRef から既定ブランチを解決するプローブ」が残っていない', () => {
  assert.doesNotMatch(
    skillMd,
    /defaultBranchRef から既定ブランチを解決するプローブ/,
    'SKILL.md に既定ブランチ決め打ちの旧文言が残っている',
  )
})

test('SKILL.md: 参照節名が automerge-design.md の実在見出しと一致する', () => {
  assert.match(
    skillMd,
    /「補償策の成立確認（base CI プローブ）」節/,
    'SKILL.md の参照節名が想定と異なる',
  )
  assert.ok(
    doc.includes('補償策の成立確認（base CI プローブ）'),
    'automerge-design.md 側に対応する見出しが存在しない',
  )
})
