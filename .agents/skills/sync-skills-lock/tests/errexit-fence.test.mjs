// errexit-fence.test.mjs — Issue #417 の回帰テスト。
//
// SKILL.md の Step 4 フェンス（npx skills add を含む約1,400行の単一フェンス）は、
// このフェンス自身が errexit 無効なエージェント対話シェルへコピペ実行され得る前提を
// 持つ（コピペ実行の前提は tests/version-pin.test.mjs と同型の教訓）。修正前は
// `npx` の前後で `set +e` → 無条件 `set -e` としており、呼び出し元シェルの errexit
// 状態を保存せず、フェンス実行後に同一シェルで走る後続コマンド（Step 6 の却下フェンス
// 等）へ errexit を新規に有効化してしまっていた。これにより、ガードの無いコマンドが
// 復元処理の途中で非ゼロ終了 abort し得た。
//
// このテストは:
//   1. Step 4 フェンスが `set +e` より前に `$-` を参照する errexit 状態保存を行い、
//      無条件の `set -e` ではなく条件付き復元をしていること（テキスト検証）
//   2. Step 6 の却下フェンス（checker を持たないリポジトリ向けの単純リバート経路）が
//      `revert_in_scope`（SKILL.md 本文の共有関数）と同等のガード（`|| true` /
//      ディレクトリ存在確認）を備えていること（テキスト検証）
//   3. 1. の保存・条件付き復元が実際に呼び出し元シェルの errexit 状態を変えないこと
//      （挙動検証。errexit 無効/有効それぞれで開始した場合の事後状態を実測）
//   4. Step 6 却下フェンスが、lock 未追跡・スキルディレクトリ不在という初回生成相当の
//      状態で `set -e` 下でも abort せず完走すること（挙動検証。修正前は abort する
//      回帰シナリオ）
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { execFileSync } from 'node:child_process'

const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
const SKILL_MD_PATH = join(SKILL_DIR, 'SKILL.md')

function extractBashFences(content) {
  const fences = []
  const re = /```bash\n([\s\S]*?)```/g
  let m
  while ((m = re.exec(content)) !== null) {
    fences.push(m[1])
  }
  return fences
}

function findStep4Fence(fences) {
  // npx skills add 実行行と PIPESTATUS スナップショット代入を両方含むフェンスを
  // Step 4 フェンスとみなす（version-pin.test.mjs と同じ抽出単位）。
  return fences.find(
    (fence) =>
      /^\s*npx\b.*\bskills\b/m.test(fence) && /PIPE_EXIT_SNAPSHOT=\("\$\{PIPESTATUS\[@\]\}"\)/.test(fence)
  )
}

function findStep6RejectFence(fences) {
  // git clean -fd と git checkout -- skills-lock.json を両方含み、かつ checker 向け
  // PRE_SYNC_TREE 経路（別フェンス）とは異なる単純リバート経路を対象にする。
  return fences.find(
    (fence) =>
      /git clean -fd/.test(fence) &&
      /git checkout -- skills-lock\.json/.test(fence) &&
      !/PRE_SYNC_TREE/.test(fence)
  )
}

function findStep6CheckerRejectFence(fences) {
  // checker を持つリポジトリ向けの却下フェンス（PRE_SYNC_TREE からの契約範囲復元）。
  // git restore --source="${PRE_SYNC_TREE}" と復元後検証の完了メッセージを両方含む。
  return fences.find(
    (fence) => /PRE_SYNC_TREE/.test(fence) && /復元完了\(検証済み\)/.test(fence)
  )
}

test('SKILL.md: Step 4 フェンスは set +e より前に errexit 状態（$-）を保存する', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep4Fence(extractBashFences(content))
  assert.ok(fence, 'Step 4 フェンス（npx 実行 + PIPE_EXIT_SNAPSHOT を含む）が見つからない')
  const lines = fence.split('\n')
  const saveIdx = lines.findIndex((l) => /case \$- in \*e\*\)/.test(l))
  const setPlusEIdx = lines.findIndex((l) => /^set \+e\s*$/.test(l))
  assert.notEqual(saveIdx, -1, 'errexit 状態保存（case $- in *e*)）が見つからない')
  assert.notEqual(setPlusEIdx, -1, 'set +e 行が見つからない')
  assert.ok(saveIdx < setPlusEIdx, 'errexit 状態保存が set +e より後にある')
})

test('SKILL.md: Step 4 フェンスの errexit 復元は条件付きで、無条件 set -e ではない', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep4Fence(extractBashFences(content))
  assert.ok(fence, 'Step 4 フェンスが見つからない')
  const lines = fence.split('\n')
  const snapshotIdx = lines.findIndex((l) => /PIPE_EXIT_SNAPSHOT=\("\$\{PIPESTATUS\[@\]\}"\)/.test(l))
  assert.notEqual(snapshotIdx, -1, 'PIPE_EXIT_SNAPSHOT 代入行が見つからない')
  // スナップショット取得より後に、無条件の `set -e`（行頭・行全体が set -e のみ）が
  // 存在しないことを確認する。条件付き復元（`if [[ ... ]]; then set -e; fi`）は
  // 行全体が `set -e` だけにはならないため検知対象から除外される。
  const laterLines = lines.slice(snapshotIdx + 1)
  const unconditionalSetE = laterLines.find((l) => /^set -e\s*$/.test(l))
  assert.equal(
    unconditionalSetE,
    undefined,
    `スナップショット取得後に無条件の set -e が残っている: ${JSON.stringify(unconditionalSetE)}`
  )
  const conditionalRestore = laterLines.find((l) => /ERREXIT_WAS_ON.*-eq 1.*then set -e; fi/.test(l))
  assert.ok(conditionalRestore, '条件付き復元（ERREXIT_WAS_ON による set -e）が見つからない')
})

test('SKILL.md: Step 6 却下フェンスは lock checkout に || true を持つ', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンス（checker 非経由の単純リバート）が見つからない')
  const lockLine = fence
    .split('\n')
    .find((l) => /git checkout -- skills-lock\.json/.test(l))
  assert.ok(lockLine, 'skills-lock.json の checkout 行が見つからない')
  assert.match(lockLine, /\|\|\s*true/, 'lock checkout 行に || true が無い（初回生成で pathspec エラーにより abort し得る）')
})

test('SKILL.md: Step 6 却下フェンスは git clean -fd の前にディレクトリ存在確認を持つ', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンスが見つからない')
  const lines = fence.split('\n')
  // 行頭（空白許容）から始まる実コマンドのみを対象にする。`.test(l)` の無条件部分一致だと
  // 実コマンドより前にある `# git clean は...` 等のコメント行にも一致し、cleanIdx が
  // コメント位置を指してしまい、後段の「存在確認が git clean より前にある」という検証が
  // 実際のコマンド配置を評価できなくなる（codex P2 指摘）。
  const cleanIdx = lines.findIndex((l) => /^\s*git clean -fd(?:\s|$)/.test(l))
  assert.notEqual(cleanIdx, -1, 'git clean -fd 行が見つからない')
  const guardIdx = lines.findIndex((l, i) => i < cleanIdx && /\[\[ -d ".agents\/skills\/\$\{SKILL_NAME\}" \]\]/.test(l))
  assert.notEqual(guardIdx, -1, 'git clean -fd より前にディレクトリ存在確認（[[ -d ... ]]）が無い（ディレクトリ不在時に非ゼロ終了し abort し得る）')
})

test('SKILL.md: Step 6 却下フェンス（checker 非経由）の残留検出は warning のみで完了扱いにせず exit 1 で停止する（Issue #417 P0 の回帰ピン留め）', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンス（checker 非経由）が見つからない')
  const lines = fence.split('\n')
  // 残留検出の if 条件（porcelain / diff --quiet / ls-files --others の複合判定）を探し、
  // その then 節が echo のみで完了扱いにせず exit 1 で停止することを確認する。
  const ifIdx = lines.findIndex((l) => /git status --porcelain/.test(l))
  assert.notEqual(ifIdx, -1, '残留検出の if 条件（git status --porcelain）が見つからない')
  const thenIdx = lines.findIndex((l, i) => i > ifIdx && /^\s*then\s*$/.test(l))
  const bodyEnd = lines.findIndex((l, i) => i > (thenIdx === -1 ? ifIdx : thenIdx) && /^\s*fi\s*$/.test(l))
  assert.notEqual(bodyEnd, -1, '残留検出 if ブロックの fi が見つからない')
  const body = lines.slice(ifIdx, bodyEnd + 1).join('\n')
  assert.match(
    body,
    /exit 1/,
    '残留検出の分岐が exit 1 を含まない（echo のみで完了扱いのまま次スキルへ進み得る。Issue #417 P0 の回帰）'
  )
})

test('SKILL.md: Step 6 却下フェンス（checker 経由・PRE_SYNC_TREE 復元）の復元後検証も残留検出時に exit 1 で停止する（Issue #417 P0 と対称の回帰ピン留め）', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6CheckerRejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンス（checker 経由・PRE_SYNC_TREE 復元）が見つからない')
  const lines = fence.split('\n')
  const ifIdx = lines.findIndex((l) => /^if git diff --cached --quiet "\$\{PRE_SYNC_TREE\}"/.test(l))
  assert.notEqual(ifIdx, -1, '復元後検証の if 条件が見つからない')
  const elseIdx = lines.findIndex((l, i) => i > ifIdx && /^\s*else\s*$/.test(l))
  const fiIdx = lines.findIndex((l, i) => i > ifIdx && /^\s*fi\s*$/.test(l))
  assert.ok(elseIdx !== -1 && fiIdx !== -1 && elseIdx < fiIdx, '復元後検証 if の else/fi が見つからない')
  const elseBody = lines.slice(elseIdx, fiIdx + 1).join('\n')
  assert.match(
    elseBody,
    /exit 1/,
    '復元後検証の失敗分岐（else）が exit 1 を含まない（echo のみで完了扱いのまま次スキルへ進み得る）'
  )
})

test('SKILL.md: Step 6 却下フェンス（checker 経由）は untracked_list の mktemp 失敗をガードし退避先を掃除して fail-closed する（Bugbot 指摘の回帰ピン留め）', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6CheckerRejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンス（checker 経由・PRE_SYNC_TREE 復元）が見つからない')
  const lines = fence.split('\n')
  // bare な `untracked_list="$(mktemp)"` が残っていないこと（errexit オフでは空パスへの
  // リダイレクトが後続の誤解を招くエラーになり、set -e 下ではメッセージなしで即中断する）
  const bareIdx = lines.findIndex((l) => /^untracked_list="\$\(mktemp\)"\s*$/.test(l))
  assert.equal(bareIdx, -1, 'untracked_list の mktemp が失敗チェックなし（bare）のまま残っている')
  // CONTRACT_UNTRACKED_BACKUP_DIR / restore_contract_scope と同形式の if ! ガードであること
  const guardIdx = lines.findIndex((l) => /^if ! untracked_list="\$\(mktemp\)"; then$/.test(l))
  assert.notEqual(guardIdx, -1, 'untracked_list の mktemp に if ! ガードがない')
  const fiIdx = lines.findIndex((l, i) => i > guardIdx && /^fi\s*$/.test(l))
  assert.notEqual(fiIdx, -1, 'mktemp ガードの fi が見つからない')
  const guardBody = lines.slice(guardIdx, fiIdx + 1).join('\n')
  assert.match(guardBody, /fail-closed/, 'mktemp 失敗分岐に fail-closed メッセージがない')
  assert.match(
    guardBody,
    /rmdir "\$\{CONTRACT_UNTRACKED_BACKUP_DIR\}"/,
    'mktemp 失敗分岐が直前に作成した退避先ディレクトリを掃除していない'
  )
  assert.match(guardBody, /exit 1/, 'mktemp 失敗分岐が exit 1 で停止していない')
})

test('挙動: Step 4 フェンスの保存・条件付き復元は呼び出し元の errexit 状態を変えない', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep4Fence(extractBashFences(content))
  assert.ok(fence, 'Step 4 フェンスが見つからない')
  const lines = fence.split('\n')
  const saveIdx = lines.findIndex((l) => /case \$- in \*e\*\)/.test(l))
  const restoreIdx = lines.findIndex((l) => /ERREXIT_WAS_ON.*-eq 1.*then set -e; fi/.test(l))
  assert.ok(saveIdx !== -1 && restoreIdx !== -1, '保存行・復元行の抽出に失敗した')
  let snippet = lines.slice(saveIdx, restoreIdx + 1).join('\n')
  // 実ネットワークの npx 実行を避け、非ゼロ終了する擬似コマンドへ置換する
  // （PIPE_EXIT_SNAPSHOT[0] が非ゼロ捕捉されることも合わせて確認するため）。
  snippet = snippet.replace(/^\s*npx --yes.*$/m, 'false | tee /dev/null')

  // errexit 無効で開始した場合: 実行後も無効のままであること。
  const outDisabled = execFileSync('bash', ['-c', `${snippet}\necho "STATE=$-"\necho "SNAP0=\${PIPE_EXIT_SNAPSHOT[0]}"`], {
    encoding: 'utf8',
  })
  const stateDisabled = outDisabled.match(/STATE=(\S*)/)?.[1] ?? ''
  const snap0Disabled = outDisabled.match(/SNAP0=(\S*)/)?.[1] ?? ''
  assert.ok(!stateDisabled.includes('e'), `errexit 無効開始のはずが有効化された: $-=${stateDisabled}`)
  assert.equal(snap0Disabled, '1', `擬似 npx（false）の非ゼロ終了が捕捉されていない: SNAP0=${snap0Disabled}`)

  // errexit 有効（set -e 前置）で開始した場合: 実行後も有効のままであること
  // （元の状態への復元）。
  const outEnabled = execFileSync(
    'bash',
    ['-c', `set -e\n${snippet}\necho "STATE=$-"\necho "SNAP0=\${PIPE_EXIT_SNAPSHOT[0]}"`],
    { encoding: 'utf8' }
  )
  const stateEnabled = outEnabled.match(/STATE=(\S*)/)?.[1] ?? ''
  assert.ok(stateEnabled.includes('e'), `errexit 有効開始のはずが復元されなかった: $-=${stateEnabled}`)
})

test('SKILL.md: Step 6 却下フェンス（checker 非経由）は git status / git ls-files の command substitution 失敗を明示的に検知して fail-closed する（Issue #417 P0 CI 指摘の回帰ピン留め）', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンス（checker 非経由）が見つからない')
  // `[[ -n "$(cmd)" ]]` は cmd の終了コードを見ないため、削除前の未追跡判定・最終残留
  // 検出のいずれも command substitution を if の条件式として実行し、失敗時に明示的な
  // エラーメッセージ付きで exit 1 することを確認する（出力を変数へ一度だけ代入してから
  // 内容判定する構造。同じ command substitution を条件式内で2回評価する旧実装ではない）。
  assert.match(
    fence,
    /if\s+!\s+\w+="\$\(git ls-files -z --others --exclude-standard -- skills-lock\.json\)";\s*then/,
    '削除前の git ls-files 呼び出しが command substitution の失敗を検知する形（if ! VAR="$(...)"; then）になっていない'
  )
  assert.match(
    fence,
    /if\s+!\s+\w+="\$\(git status --porcelain -- "\.agents\/skills\/\$\{SKILL_NAME\}\/"\)";\s*then/,
    '最終検証の git status 呼び出しが command substitution の失敗を検知する形になっていない'
  )
  // 失敗検知の直後に fail-closed で exit 1 すること（値が空のまま「残留なし」に
  // フォールスルーしない）。
  const lines = fence.split('\n')
  const lockCheckIdx = lines.findIndex((l) => /if\s+!\s+\w+="\$\(git ls-files -z --others --exclude-standard -- skills-lock\.json\)";\s*then/.test(l))
  assert.notEqual(lockCheckIdx, -1)
  const lockCheckFiIdx = lines.findIndex((l, i) => i > lockCheckIdx && /^\s*fi\s*$/.test(l))
  assert.match(lines.slice(lockCheckIdx, lockCheckFiIdx + 1).join('\n'), /exit 1/, '削除前 git ls-files 失敗検知の分岐が exit 1 を含まない')
})

test('挙動: Step 6 却下フェンス（checker 非経由）は git status --porcelain が異常終了した場合、空出力を「残留なし」と誤判定せず exit 1 で停止する（Issue #417 P0 CI 指摘の回帰）', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンスが見つからない')

  const realGit = execFileSync('bash', ['-c', 'command -v git'], { encoding: 'utf8' }).trim()
  const tmp = mkdtempSync(join(tmpdir(), 'errexit-fence-step6-statusfail-'))
  const binDir = join(tmp, 'bin')
  try {
    execFileSync('git', ['init', '-q'], { cwd: tmp })
    execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: tmp })
    execFileSync('git', ['config', 'user.name', 'test'], { cwd: tmp })
    writeFileSync(join(tmp, 'skills-lock.json'), '{"initial":true}\n')

    // git status --porcelain -- <当該スキルディレクトリ> の呼び出しだけを異常終了させ、
    // 他の git 呼び出し（checkout / clean / diff / ls-files）は実 git へ委譲する擬似 git を
    // 用意する。これにより「コマンド自体が失敗して空出力になったケース」を再現する。
    execFileSync('mkdir', ['-p', binDir])
    writeFileSync(
      join(binDir, 'git'),
      `#!/bin/bash\nif [[ "$1" == "status" && "$2" == "--porcelain" ]]; then\n  echo "fake permission error" >&2\n  exit 128\nfi\nexec '${realGit}' "$@"\n`
    )
    execFileSync('chmod', ['+x', join(binDir, 'git')])

    const script = `set -euo pipefail\ncd '${tmp}'\nSKILL_NAME='test-fence-skill'\nPATH='${binDir}:'"$PATH"\n${fence}\necho DONE\n`
    let threw = false
    let stderr = ''
    try {
      execFileSync('bash', ['-c', script], { encoding: 'utf8' })
    } catch (err) {
      threw = true
      stderr = String(err.stderr ?? '')
    }
    assert.ok(threw, 'git status --porcelain が異常終了したにもかかわらず、フェンスが exit 1 せず完走した（空出力を「残留なし」と誤判定した可能性。Issue #417 P0 CI 指摘の回帰）')
    assert.match(stderr, /fail-closed/, 'git status 失敗時の fail-closed エラーメッセージが出力されていない')
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
})

test('挙動: Step 6 却下フェンスは初回生成相当の状態でも set -e 下で abort せず完走する', () => {
  const content = readFileSync(SKILL_MD_PATH, 'utf8')
  const fence = findStep6RejectFence(extractBashFences(content))
  assert.ok(fence, 'Step 6 却下フェンスが見つからない')

  const tmp = mkdtempSync(join(tmpdir(), 'errexit-fence-step6-'))
  try {
    execFileSync('git', ['init', '-q'], { cwd: tmp })
    execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: tmp })
    execFileSync('git', ['config', 'user.name', 'test'], { cwd: tmp })
    // 初回生成相当: skills-lock.json は未追跡（tracked にしない）、スキル
    // ディレクトリは存在しない。SKILL_NAME はテスト専用の kebab-case 値を使う。
    // skills-lock.json は実際にファイルとして作成しておく（未追跡「ファイルが
    // 存在する」経路を再現しないと、削除処理の欠落を検出できない。Issue #417 P1 指摘:
    // 従来のテストはこのファイルを作成しておらず、git ls-files --others が常に
    // 空集合を返すため経路自体を再現できていなかった）。
    writeFileSync(join(tmp, 'skills-lock.json'), '{"initial":true}\n')
    const script = `set -euo pipefail\ncd '${tmp}'\nSKILL_NAME='test-fence-skill'\n${fence}\necho DONE\n`
    const out = execFileSync('bash', ['-c', script], { encoding: 'utf8' })
    assert.match(out, /DONE/, 'Step 6 却下フェンスが set -e 下で完走しなかった（abort した可能性）')
    assert.equal(
      existsSync(join(tmp, 'skills-lock.json')),
      false,
      '未追跡の skills-lock.json が却下リバート後も残留している（次スキルの承認時に一緒に stage され得る）'
    )
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
})
