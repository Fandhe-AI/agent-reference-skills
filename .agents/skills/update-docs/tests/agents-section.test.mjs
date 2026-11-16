// agents-section.test.mjs — scripts/agents-section.sh の回帰テスト。
//
// 検証する契約: AGENTS.md のうち update-docs が書くのは自分専用のマーカー区間の中だけ。区間の外
// （init-codex の管理区間・setup-repo-guards が入れるレビュー観点集の見出しなど）はバイト単位で不変。
// 追記・差し替え・unchanged・--check（書かない）・各 fail-closed（ファイル不変・一時ファイルなし）・
// 32 KiB 超の警告（止めない）。init-codex の agents-md-block.sh を実際に使った往復も確認する。
// スクリプトを実プロセスとして /bin/bash（3.2）と PATH の bash で流す。実機・ネットワークは使わない。
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(HERE, '..', 'scripts', 'agents-section.sh')
const CODEX_SCRIPT = join(HERE, '..', '..', 'init-codex', 'assets', 'scripts', 'agents-md-block.sh')
const CODEX_TEMPLATE = join(HERE, '..', '..', 'init-codex', 'assets', 'agents-md-block.md')
const GUARDS_SKILL = join(HERE, '..', '..', 'setup-repo-guards', 'SKILL.md')

const START = '<!-- agent-cli-skills:update-docs:start -->'
const END = '<!-- agent-cli-skills:update-docs:end -->'
const A_START = '<!-- agent-cli-skills:agents-md:start -->'
const A_END = '<!-- agent-cli-skills:agents-md:end -->'
const LIMIT = 32768

const pathBash = spawnSync('bash', ['-c', 'command -v bash'], { encoding: 'utf8' }).stdout.trim()
const BASHES = [...new Set(['/bin/bash', pathBash].filter((b) => b && existsSync(b)))]

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex')
const count = (s, needle) => s.split(needle).length - 1

// setup-repo-guards のスキルが AGENTS.md に入れるレビュー観点集の見出し（実物の AGENTS.md から写した）。
// 本文は日本語の箇条書きで、区間外として不変であることだけを見る。
const REVIEW_GUIDE = [
  '# AGENTS.md',
  '',
  '## 文書の位置づけ',
  '',
  'AI レビューが読むレビュー基準。',
  '',
  '## 優先度の定義',
  '',
  '- P0: マージブロック',
  '- P1: 強く推奨',
  '- P2: 提案',
  '',
  '## 1. セキュリティ観点',
  '',
  '- 秘密情報の混入',
  '',
  '## 2. アーキテクチャ・設計整合の観点',
  '',
  '- 責務境界',
  '',
  '## 3. 再利用・アセット化の観点（重点）',
  '',
  '- ハードコードの回避',
  '',
  '## リポジトリ固有の観点',
  '',
  '- 固有の項目',
  '',
].join('\n')

function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'agents-section-test-'))
  return {
    dir,
    target: join(dir, 'AGENTS.md'),
    block(name, text) {
      const p = join(dir, name)
      writeFileSync(p, text)
      return p
    },
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  }
}

// 子プロセスは非同期に起動し、テストを並列に流す（各テストは専用の一時ディレクトリを使う）。
function spawnAsync(bash, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(bash, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    p.stdout.setEncoding('utf8').on('data', (d) => { stdout += d })
    p.stderr.setEncoding('utf8').on('data', (d) => { stderr += d })
    p.on('error', reject)
    p.on('close', (status) => resolve({ status, stdout, stderr }))
  })
}

async function run(bash, target, block, extra = []) {
  const r = await spawnAsync(bash, [SCRIPT, '--target', target, '--block', block, ...extra])
  const lines = r.stdout.trim().split('\n')
  const last = lines[lines.length - 1]
  return { status: r.status, stderr: r.stderr, stdout: r.stdout, result: last.replace('UPDATE_DOCS_SECTION_RESULT ', ''), last }
}

// マーカー行（改行まで含む）の位置で Buffer を 3 つに分ける。before は start 行の直前まで、
// region は start 行から end 行の終わりまで、after は end 行の後。区間外の比較に使う。
function split(buf, start, end) {
  const s = buf.indexOf(start)
  const e = buf.indexOf(end, s)
  assert.ok(s >= 0 && e > s, 'マーカーが見つからない')
  let eEnd = buf.indexOf('\n', e)
  eEnd = eEnd < 0 ? buf.length : eEnd + 1
  return { before: buf.subarray(0, s), region: buf.subarray(s, eEnd), after: buf.subarray(eEnd) }
}

const noTmp = (t, names) => assert.deepEqual(readdirSync(t.dir).sort(), names.sort(), '一時ファイルが残らない')

describe('agents-section', { concurrency: true }, () => {
  for (const bash of BASHES) describe(`[${bash}]`, { concurrency: true }, () => {
    const tag = `[${bash}]`

    // ---- 追記・差し替え・unchanged・--check ----

    it(`${tag} 区間が無ければ末尾へ追記し、既存部分のバイトは不変`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, REVIEW_GUIDE)
        const r = await run(bash, t.target, t.block('b.md', '## Current Skills (1)\n\nfoo\n'))
        assert.equal(r.status, 0)
        assert.equal(r.result, 'appended')
        const after = readFileSync(t.target, 'utf8')
        assert.equal(after, `${REVIEW_GUIDE}\n${START}\n## Current Skills (1)\n\nfoo\n${END}\n`)
        assert.equal(count(after, START), 1)
        noTmp(t, ['AGENTS.md', 'b.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 区間が 1 組なら中身だけ差し替え、前後のバイトは不変`, async () => {
      const t = setup()
      try {
        const head = `${REVIEW_GUIDE}\n${A_START}\nagents-md の指示\n${A_END}\n\n`
        const tail = '\n## 後続の節\n\n本文（末尾改行なし）'
        writeFileSync(t.target, `${head}${START}\n古い一覧\n${END}\n${tail}`)
        const r = await run(bash, t.target, t.block('b.md', '新しい一覧\n2 行目\n'))
        assert.equal(r.result, 'replaced')
        assert.equal(
          readFileSync(t.target, 'utf8'),
          `${head}${START}\n新しい一覧\n2 行目\n${END}\n${tail}`,
        )
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 中身が同じなら unchanged で、書かず mtime も不変`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const b = t.block('b.md', '一覧\n')
        assert.equal((await run(bash, t.target, b)).result, 'appended')
        const h = sha(t.target)
        const m = statSync(t.target).mtimeMs
        const r = await run(bash, t.target, b)
        assert.equal(r.status, 0)
        assert.equal(r.result, 'unchanged')
        assert.equal(sha(t.target), h)
        assert.equal(statSync(t.target).mtimeMs, m)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --check は書かずに結果語彙だけ返す（appended / replaced / unchanged）`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const b = t.block('b.md', '一覧\n')
        const h0 = sha(t.target)
        const m0 = statSync(t.target).mtimeMs
        assert.equal((await run(bash, t.target, b, ['--check'])).result, 'appended')
        assert.equal(sha(t.target), h0)
        assert.equal(statSync(t.target).mtimeMs, m0)
        assert.equal((await run(bash, t.target, b)).result, 'appended')
        const h1 = sha(t.target)
        assert.equal((await run(bash, t.target, b, ['--check'])).result, 'unchanged')
        const b2 = t.block('b2.md', '別の一覧\n')
        assert.equal((await run(bash, t.target, b2, ['--check'])).result, 'replaced')
        assert.equal(sha(t.target), h1)
        noTmp(t, ['AGENTS.md', 'b.md', 'b2.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 対象が無ければ作らずに非 0 で止まる`, async () => {
      const t = setup()
      try {
        const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
        assert.equal(r.status, 2)
        assert.equal(r.result, 'error-target-missing')
        assert.equal(existsSync(t.target), false)
        noTmp(t, ['b.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 空の AGENTS.md には区間だけを追記する`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '')
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).result, 'appended')
        assert.equal(readFileSync(t.target, 'utf8'), `${START}\n一覧\n${END}\n`)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 中身の末尾改行が無くても区間は行ごとに閉じる`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        assert.equal((await run(bash, t.target, t.block('b.md', '改行なし'))).result, 'appended')
        assert.equal(readFileSync(t.target, 'utf8'), `# a\n\n${START}\n改行なし\n${END}\n`)
        assert.equal((await run(bash, t.target, t.block('b.md', '改行なし\n'))).result, 'unchanged')
      } finally {
        t.cleanup()
      }
    })

    // ---- 区間外のバイト保全（末尾改行なし・複数・CRLF） ----

    const ENDINGS = {
      '末尾改行なし': { head: '# a\n本文（末尾改行なし）', tail: '' },
      '末尾改行が複数': { head: '# a\n本文\n', tail: '\n\n\n' },
      'CRLF': { head: '# a\r\n\r\n本文\r\n', tail: '\r\n後続\r\n' },
    }

    for (const [name, { head, tail }] of Object.entries(ENDINGS)) {
      it(`${tag} 追記: ${name}でも既存バイトが不変`, async () => {
        const t = setup()
        try {
          const orig = Buffer.from(`${head}${tail}`)
          writeFileSync(t.target, orig)
          const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
          assert.equal(r.result, 'appended')
          const after = readFileSync(t.target)
          assert.ok(after.subarray(0, orig.length).equals(orig), '既存バイトが先頭からそのまま残る')
          assert.ok(after.subarray(orig.length).toString('utf8').endsWith(`${START}\n一覧\n${END}\n`))
          assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).result, 'unchanged')
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 差し替え: ${name}でも区間の前後のバイトが不変`, async () => {
        const t = setup()
        try {
          const nl = head.includes('\r\n') ? '\r\n' : '\n'
          const orig = Buffer.from(`${head}${nl}${START}${nl}古${nl}${END}${nl}${tail}`)
          writeFileSync(t.target, orig)
          const before = split(orig, START, END)
          const r = await run(bash, t.target, t.block('b.md', '新\n'))
          assert.equal(r.result, 'replaced')
          const now = split(readFileSync(t.target), START, END)
          assert.ok(now.before.equals(before.before), '区間より前')
          assert.ok(now.after.equals(before.after), '区間より後')
          assert.equal(now.region.toString('utf8').replace(/\r/g, ''), `${START}\n新\n${END}\n`.replace(/\r/g, ''))
        } finally {
          t.cleanup()
        }
      })
    }

    it(`${tag} 区間が末尾で終端の改行も無いファイルでも前後のバイトが不変`, async () => {
      const t = setup()
      try {
        const orig = Buffer.from(`# a\n${START}\n古\n${END}`)
        writeFileSync(t.target, orig)
        const r = await run(bash, t.target, t.block('b.md', '新\n'))
        assert.equal(r.result, 'replaced')
        assert.equal(readFileSync(t.target, 'utf8'), `# a\n${START}\n新\n${END}`)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 既存のマーカー行の CRLF は差し替え後も保たれる`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, `# a\r\n${START}\r\n古\r\n${END}\r\n後\r\n`)
        assert.equal((await run(bash, t.target, t.block('b.md', '新\n'))).result, 'replaced')
        assert.equal(readFileSync(t.target, 'utf8'), `# a\r\n${START}\r\n新\n${END}\r\n後\r\n`)
        assert.equal((await run(bash, t.target, t.block('b.md', '新\n'))).result, 'unchanged')
      } finally {
        t.cleanup()
      }
    })

    // ---- fail-closed ----

    it(`${tag} 自マーカーの片方のみ・重複・逆順は error-markers で、ファイルは不変`, async () => {
      const cases = {
        'start のみ': `# a\n${START}\nx\n`,
        'end のみ': `# a\nx\n${END}\n`,
        '2 組': `${START}\n1\n${END}\n${START}\n2\n${END}\n`,
        '逆順': `${END}\nx\n${START}\n`,
        'start 2 個 end 1 個': `${START}\n${START}\n${END}\n`,
        'start 1 個 end 2 個': `${START}\n${END}\n${END}\n`,
      }
      for (const [name, body] of Object.entries(cases)) {
        const t = setup()
        try {
          writeFileSync(t.target, body)
          const h = sha(t.target)
          const m = statSync(t.target).mtimeMs
          for (const extra of [[], ['--check']]) {
            const r = await run(bash, t.target, t.block('b.md', '一覧\n'), extra)
            assert.equal(r.status, 4, `${name} ${extra}`)
            assert.equal(r.result, 'error-markers', `${name} ${extra}`)
          }
          assert.equal(sha(t.target), h, name)
          assert.equal(statSync(t.target).mtimeMs, m, name)
          noTmp(t, ['AGENTS.md', 'b.md'])
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} 自マーカーが agents-md 管理区間の内側にあれば error-nested`, async () => {
      const cases = {
        '自区間が丸ごと内側': `${A_START}\n管理\n${START}\n一覧\n${END}\n${A_END}\n`,
        '自 start だけ内側で end は外側': `${A_START}\n管理\n${START}\n${A_END}\n${END}\n`,
        '自 end だけ内側で start は外側': `${START}\n${A_START}\n管理\n${END}\n${A_END}\n`,
        'agents-md 区間が自区間の内側': `${START}\n一覧\n${A_START}\n管理\n${A_END}\n${END}\n`,
        'agents-md 区間が閉じておらず、その後に自区間': `${A_START}\n管理\n${START}\n一覧\n${END}\n`,
      }
      for (const [name, body] of Object.entries(cases)) {
        const t = setup()
        try {
          writeFileSync(t.target, body)
          const h = sha(t.target)
          const r = await run(bash, t.target, t.block('b.md', '新\n'))
          assert.equal(r.status, 4, name)
          assert.equal(r.result, 'error-nested', name)
          assert.equal(sha(t.target), h, name)
          noTmp(t, ['AGENTS.md', 'b.md'])
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} agents-md 区間が閉じていないファイルへの追記は error-nested（区間の内側に入るため）`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, `# a\n${A_START}\n管理\n`)
        const h = sha(t.target)
        const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
        assert.equal(r.status, 4)
        assert.equal(r.result, 'error-nested')
        assert.equal(sha(t.target), h)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 自区間の後ろに閉じていない agents-md 区間があっても、差し替え・unchanged・--check は通る（既存の状態を保つ）`, async () => {
      const t = setup()
      try {
        const body = `# a\n\n${START}\n古\n${END}\n\n${A_START}\n管理（閉じていない）\n`
        writeFileSync(t.target, body)
        const orig = Buffer.from(body)
        const before = split(orig, START, END)
        // --check は書かない
        const h = sha(t.target)
        const c = await run(bash, t.target, t.block('b.md', '新\n'), ['--check'])
        assert.equal(c.status, 0, c.stderr)
        assert.equal(c.result, 'replaced')
        assert.equal(sha(t.target), h)
        // 差し替え: 区間外のバイトは不変
        const r = await run(bash, t.target, t.block('b.md', '新\n'))
        assert.equal(r.status, 0, r.stderr)
        assert.equal(r.result, 'replaced')
        const now = readFileSync(t.target)
        const after = split(now, START, END)
        assert.ok(after.before.equals(before.before))
        assert.ok(after.after.equals(before.after))
        assert.equal(now.toString('utf8'), `# a\n\n${START}\n新\n${END}\n\n${A_START}\n管理（閉じていない）\n`)
        // 同じ内容なら unchanged（書かない）
        const h2 = sha(t.target)
        const u = await run(bash, t.target, t.block('b.md', '新\n'))
        assert.equal(u.status, 0, u.stderr)
        assert.equal(u.result, 'unchanged')
        assert.equal(sha(t.target), h2)
        noTmp(t, ['AGENTS.md', 'b.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 同じ構成でも --block のフェンスが閉じていなければ error-block-fence で書かない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, `${START}\n古\n${END}\n\n${A_START}\n管理（閉じていない）\n`)
        const h = sha(t.target)
        for (const extra of [[], ['--check']]) {
          const r = await run(bash, t.target, t.block('b.md', '```bash\nls\n'), extra)
          assert.equal(r.status, 4)
          assert.equal(r.result, 'error-block-fence')
          assert.equal(sha(t.target), h)
        }
        noTmp(t, ['AGENTS.md', 'b.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 自区間の外の agents-md 区間は何組あっても通し、バイトは不変`, async () => {
      const t = setup()
      try {
        const body = `${A_START}\n1\n${A_END}\n\n${START}\n古\n${END}\n\n${A_START}\n2\n${A_END}\n`
        writeFileSync(t.target, body)
        const before = split(Buffer.from(body), START, END)
        assert.equal((await run(bash, t.target, t.block('b.md', '新\n'))).result, 'replaced')
        const now = split(readFileSync(t.target), START, END)
        assert.ok(now.before.equals(before.before))
        assert.ok(now.after.equals(before.after))
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --block の中身にどちらのマーカー文字列があっても error-block-marker`, async () => {
      for (const m of [START, END, A_START, A_END]) {
        for (const wrapped of [m, `\`\`\`\n${m}\n\`\`\``]) {
          const t = setup()
          try {
            writeFileSync(t.target, '# a\n')
            const h = sha(t.target)
            const r = await run(bash, t.target, t.block('b.md', `x\n${wrapped}\n`))
            assert.equal(r.status, 4, m)
            assert.equal(r.result, 'error-block-marker', m)
            assert.equal(sha(t.target), h, m)
            noTmp(t, ['AGENTS.md', 'b.md'])
          } finally {
            t.cleanup()
          }
        }
      }
    })

    it(`${tag} コードフェンスが閉じていなければ error-fence で、ファイルは不変`, async () => {
      for (const fence of ['```', '~~~', '````']) {
        const t = setup()
        try {
          writeFileSync(t.target, `# a\n${fence}\n${START}\n${END}\n`)
          const h = sha(t.target)
          const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
          assert.equal(r.status, 4, fence)
          assert.equal(r.result, 'error-fence', fence)
          assert.equal(sha(t.target), h, fence)
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} フェンス内のマーカーは数えない（片方だけでも重複でも）`, async () => {
      const t = setup()
      try {
        const orig = `# 解説\n\n\`\`\`md\n${START}\n例\n${END}\n${START}\n${A_START}\n\`\`\`\n\n~~~\n${END}\n~~~\n`
        writeFileSync(t.target, orig)
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).result, 'appended')
        const after = readFileSync(t.target, 'utf8')
        assert.ok(after.startsWith(orig))
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧 2\n'))).result, 'replaced')
        assert.ok(readFileSync(t.target, 'utf8').startsWith(orig))
        assert.equal(count(readFileSync(t.target, 'utf8'), '一覧 2'), 1)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 字下げ 4 桁以上の行はフェンスの開きにもマーカーにもならない`, async () => {
      const t = setup()
      try {
        const orig = `# a\n\n    \`\`\`\n    ${START}\n本文\n`
        writeFileSync(t.target, orig)
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).result, 'appended')
        assert.ok(readFileSync(t.target, 'utf8').startsWith(orig))
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --block 側のコードフェンスが閉じていなければ error-block-fence で書かない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const h = sha(t.target)
        const r = await run(bash, t.target, t.block('b.md', '```bash\nls\n'))
        assert.equal(r.status, 4)
        assert.equal(r.result, 'error-block-fence')
        assert.equal(sha(t.target), h)
        noTmp(t, ['AGENTS.md', 'b.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 閉じたフェンスを含む中身は書ける`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const r = await run(bash, t.target, t.block('b.md', '```text\nls\n```\n'))
        assert.equal(r.result, 'appended')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --target がシンボリックリンクなら error-symlink で実体は不変`, async () => {
      const t = setup()
      try {
        const real = join(t.dir, 'real.md')
        writeFileSync(real, '# 実体\n')
        const link = join(t.dir, 'link.md')
        symlinkSync(real, link)
        const h = sha(real)
        const r = await run(bash, link, t.block('b.md', '一覧\n'))
        assert.equal(r.status, 2)
        assert.equal(r.result, 'error-symlink')
        assert.equal(sha(real), h)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --block が空・読めないなら非 0 で書かない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const h = sha(t.target)
        const empty = await run(bash, t.target, t.block('e.md', ''))
        assert.equal(empty.status, 2)
        assert.equal(empty.result, 'error-block-empty')
        const missing = await run(bash, t.target, join(t.dir, 'nope.md'))
        assert.equal(missing.status, 2)
        assert.equal(missing.result, 'error-block-unreadable')
        assert.equal(sha(t.target), h)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 引数の誤りは非 0`, async () => {
      const t = setup()
      try {
        for (const args of [[], ['--target', t.target], ['--block', t.dir], ['--target'], ['--target', t.target, '--block', t.dir, '--x']]) {
          const r = await spawnAsync(bash, [SCRIPT, ...args])
          assert.equal(r.status, 1, JSON.stringify(args))
          assert.match(r.stdout, /UPDATE_DOCS_SECTION_RESULT error-usage/)
        }
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --block がシンボリックリンクなら error-symlink で書かない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const h = sha(t.target)
        const real = t.block('real.md', '一覧\n')
        const link = join(t.dir, 'link.md')
        symlinkSync(real, link)
        const r = await run(bash, t.target, link)
        assert.equal(r.status, 2)
        assert.equal(r.result, 'error-symlink')
        assert.equal(sha(t.target), h)
        // 壊れたリンクも同じ。
        const dangling = join(t.dir, 'dangling.md')
        symlinkSync(join(t.dir, 'nope.md'), dangling)
        const r2 = await run(bash, t.target, dangling)
        assert.equal(r2.status, 2)
        assert.equal(r2.result, 'error-symlink')
        assert.equal(sha(t.target), h)
        noTmp(t, ['AGENTS.md', 'real.md', 'link.md', 'dangling.md'])
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 字下げしたマーカー行はマーカーとして数えない`, async () => {
      const t = setup()
      try {
        const orig = `# a\n ${START}\n  ${END}\n\t${START}\n`
        writeFileSync(t.target, orig)
        const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
        assert.equal(r.result, 'appended')
        assert.ok(readFileSync(t.target, 'utf8').startsWith(orig))
      } finally {
        t.cleanup()
      }
    })

    // ---- 走査から置換までの間の変更（lost update）の検知 ----
    // 偽の awk を PATH の先頭に置き、1 回目の走査の直後に AGENTS.md へ追記させる。
    // 本物のスクリプトにテスト用のフックは持たせない。

    function fakeAwkEnv(t, modify) {
      const bin = join(t.dir, 'bin')
      mkdirSync(bin)
      const realAwk = spawnSync('bash', ['-c', 'command -v awk'], { encoding: 'utf8' }).stdout.trim()
      writeFileSync(join(bin, 'awk'), [
        '#!/bin/sh',
        `${realAwk} "$@"`,
        'rc=$?',
        `if [ "${modify ? 1 : 0}" = 1 ] && [ ! -e "$FAKE_FLAG" ]; then : > "$FAKE_FLAG"; printf 'racer\\n' >> "$FAKE_TARGET"; fi`,
        'exit $rc',
        '',
      ].join('\n'))
      chmodSync(join(bin, 'awk'), 0o755)
      return { PATH: `${bin}:${process.env.PATH}`, FAKE_FLAG: join(t.dir, 'flag'), FAKE_TARGET: t.target }
    }

    function runEnv(bash, args, env) {
      return new Promise((resolve, reject) => {
        const p = spawn(bash, [SCRIPT, ...args], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, ...env } })
        let stdout = ''
        let stderr = ''
        p.stdout.setEncoding('utf8').on('data', (d) => { stdout += d })
        p.stderr.setEncoding('utf8').on('data', (d) => { stderr += d })
        p.on('error', reject)
        p.on('close', (status) => resolve({ status, stdout, stderr, result: stdout.trim().split('\n').pop().replace('UPDATE_DOCS_SECTION_RESULT ', '') }))
      })
    }

    for (const [name, body] of [['追記', '# a\n'], ['差し替え', `# a\n${START}\n古\n${END}\n`]]) {
      it(`${tag} ${name}: 走査のあとに AGENTS.md が書き換わったら error-changed で上書きしない`, async () => {
        const t = setup()
        try {
          writeFileSync(t.target, body)
          const b = t.block('b.md', '新\n')
          const env = fakeAwkEnv(t, true)
          const r = await runEnv(bash, ['--target', t.target, '--block', b], env)
          assert.equal(r.status, 2, r.stderr)
          assert.equal(r.result, 'error-changed')
          assert.equal(readFileSync(t.target, 'utf8'), `${body}racer\n`, '他者の変更が残る')
          noTmp(t, ['AGENTS.md', 'b.md', 'bin', 'flag'])
        } finally {
          t.cleanup()
        }
      })
    }

    it(`${tag} 偽 awk が何も変えなければ通常どおり書ける（対照）`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        const env = fakeAwkEnv(t, false)
        const r = await runEnv(bash, ['--target', t.target, '--block', t.block('b.md', '新\n')], env)
        assert.equal(r.status, 0, r.stderr)
        assert.equal(r.result, 'appended')
      } finally {
        t.cleanup()
      }
    })

    // ---- 32 KiB 警告 ----

    it(`${tag} 書き込み後が 32768 バイトを超えると警告を出すが、書き込みは行う`, async () => {
      const t = setup()
      try {
        // 11000 文字（UTF-8 で 33000 バイト）。文字数ではなくバイト数で数える。
        writeFileSync(t.target, `# a\n${'あ'.repeat(11000)}\n`)
        const r = await run(bash, t.target, t.block('b.md', '一覧\n'))
        assert.equal(r.status, 0)
        assert.equal(r.result, 'appended')
        assert.match(r.stderr, /32768/)
        assert.equal(count(readFileSync(t.target, 'utf8'), START), 1)
        // 超過したまま再実行（unchanged）でも警告は出る。
        const again = await run(bash, t.target, t.block('b.md', '一覧\n'))
        assert.equal(again.result, 'unchanged')
        assert.match(again.stderr, /32768/)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} --check でも超過を警告し、書かない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, `# a\n${'x'.repeat(LIMIT)}\n`)
        const h = sha(t.target)
        const r = await run(bash, t.target, t.block('b.md', '一覧\n'), ['--check'])
        assert.equal(r.result, 'appended')
        assert.match(r.stderr, /32768/)
        assert.equal(sha(t.target), h)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 境界: ちょうど 32768 バイトは警告なし、1 バイト超えると警告`, async () => {
      const block = '一覧\n'
      const tail = `\n${START}\n${block}${END}\n`
      for (const [extra, warn] of [[0, false], [1, true]]) {
        const t = setup()
        try {
          const fixed = Buffer.byteLength(tail) + Buffer.byteLength('# a\n\n')
          const pad = LIMIT - fixed + extra
          writeFileSync(t.target, `# a\n${'x'.repeat(pad)}\n`)
          // orig は '# a\n' + x*pad + '\n'。追記は空行 1 つ + 区間。
          const r = await run(bash, t.target, t.block('b.md', block))
          assert.equal(r.result, 'appended')
          assert.equal(readFileSync(t.target).length, LIMIT + extra - 0, `size ${extra}`)
          assert.equal(/32768/.test(r.stderr), warn, `extra=${extra}: ${r.stderr}`)
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} 上限以下なら警告は出ない`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, '# a\n')
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).stderr, '')
      } finally {
        t.cleanup()
      }
    })
  })
})

// ---- init-codex の agents-md-block.sh との往復（実物の fixture） ----
//
// fixture は init-codex のスクリプトを実際に実行して管理区間入りの AGENTS.md を作り、
// setup-repo-guards のレビュー観点集の見出しを足して作る。update-docs と agents-md-block.sh を
// どちらの順で実行しても、互いの区間とレビュー観点集のバイトが変わらないことを確かめる。
const haveCodex = existsSync(CODEX_SCRIPT) && existsSync(CODEX_TEMPLATE)

describe('agents-section と init-codex の往復', { concurrency: true, skip: haveCodex ? false : 'init-codex のスクリプトが無い環境' }, () => {
  for (const bash of BASHES) describe(`[${bash}]`, { concurrency: true }, () => {
    const tag = `[${bash}]`

    async function codex(target, block) {
      const r = await spawnAsync(bash, [CODEX_SCRIPT, '--target', target, '--block', block])
      assert.equal(r.status, 0, r.stdout + r.stderr)
      return r.stdout.trim().split('\n').pop().replace('AGENTS_MD_BLOCK_RESULT ', '')
    }

    // レビュー観点集 -> init-codex の管理区間、の順で作った AGENTS.md。
    async function build(t) {
      writeFileSync(t.target, REVIEW_GUIDE)
      assert.equal(await codex(t.target, CODEX_TEMPLATE), 'appended')
      return readFileSync(t.target)
    }

    it(`${tag} レビュー観点集の見出しは setup-repo-guards のスキルが定める 3 観点と一致する`, () => {
      if (!existsSync(GUARDS_SKILL)) return
      const guards = readFileSync(GUARDS_SKILL, 'utf8')
      for (const name of ['セキュリティ観点', 'アーキテクチャ・設計整合の観点', '再利用・アセット化の観点']) {
        assert.ok(guards.includes(name), name)
        assert.ok(REVIEW_GUIDE.includes(name), name)
      }
    })

    it(`${tag} init-codex -> update-docs の順: agents-md 区間とレビュー観点集は不変`, async () => {
      const t = setup()
      try {
        const base = await build(t)
        const agents = split(base, A_START, A_END)
        assert.equal((await run(bash, t.target, t.block('b.md', '## Current Skills (2)\n\na, b\n'))).result, 'appended')
        const mid = readFileSync(t.target)
        assert.ok(mid.subarray(0, base.length).equals(base), '追記は既存全体を先頭から保つ')
        // 2 回目の差し替えでも agents-md 区間と前後が変わらない。
        assert.equal((await run(bash, t.target, t.block('b.md', '## Current Skills (3)\n\na, b, c\n'))).result, 'replaced')
        const now = readFileSync(t.target)
        const nowAgents = split(now, A_START, A_END)
        assert.ok(nowAgents.region.equals(agents.region), 'agents-md 区間')
        assert.ok(nowAgents.before.equals(agents.before), 'レビュー観点集')
        assert.ok(now.subarray(0, base.length).equals(base))
        assert.equal(count(now.toString('utf8'), START), 1)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} update-docs -> init-codex の順: update-docs 区間とレビュー観点集は不変`, async () => {
      const t = setup()
      try {
        writeFileSync(t.target, REVIEW_GUIDE)
        assert.equal((await run(bash, t.target, t.block('b.md', '## Current Skills (2)\n\na, b\n'))).result, 'appended')
        const mine = split(readFileSync(t.target), START, END)
        assert.equal(await codex(t.target, CODEX_TEMPLATE), 'appended')
        const mid = split(readFileSync(t.target), START, END)
        assert.ok(mid.region.equals(mine.region), 'update-docs 区間')
        assert.ok(mid.before.equals(mine.before), 'レビュー観点集')
        // init-codex の区間を別内容で差し替えても update-docs 区間は不変。
        const other = t.block('c.md', '別の指示\n')
        assert.equal(await codex(t.target, other), 'replaced')
        const now = readFileSync(t.target)
        const nowMine = split(now, START, END)
        assert.ok(nowMine.region.equals(mine.region), 'update-docs 区間')
        assert.ok(nowMine.before.equals(mine.before), 'レビュー観点集')
        assert.equal(count(now.toString('utf8'), A_START), 1)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 両者を交互に何度実行しても区間は 1 つずつで、最終状態が実行順に依らない`, async () => {
      const a = setup()
      const b = setup()
      try {
        const body = a.block('body.md', '## Current Skills (2)\n\na, b\n')
        const body2 = b.block('body.md', '## Current Skills (2)\n\na, b\n')
        // a: update-docs を先に・b: init-codex を先に。
        writeFileSync(a.target, REVIEW_GUIDE)
        writeFileSync(b.target, REVIEW_GUIDE)
        await run(bash, a.target, body)
        await codex(a.target, CODEX_TEMPLATE)
        await run(bash, a.target, body)
        await codex(b.target, CODEX_TEMPLATE)
        await run(bash, b.target, body2)
        await codex(b.target, CODEX_TEMPLATE)
        const ra = readFileSync(a.target)
        const rb = readFileSync(b.target)
        for (const buf of [ra, rb]) {
          const s = buf.toString('utf8')
          assert.equal(count(s, START), 1)
          assert.equal(count(s, A_START), 1)
          assert.ok(s.startsWith(REVIEW_GUIDE))
        }
        // 区間の中身はどちらの順でも同じ（並びだけが異なる）。
        assert.ok(split(ra, START, END).region.equals(split(rb, START, END).region))
        assert.ok(split(ra, A_START, A_END).region.equals(split(rb, A_START, A_END).region))
        // 再実行は unchanged。
        assert.equal((await run(bash, a.target, body)).result, 'unchanged')
        assert.equal(await codex(a.target, CODEX_TEMPLATE), 'unchanged')
      } finally {
        a.cleanup()
        b.cleanup()
      }
    })

    it(`${tag} CLAUDE.md が無く AGENTS.md だけのリポジトリでも CLAUDE.md を作らない`, async () => {
      const t = setup()
      try {
        await build(t)
        assert.equal((await run(bash, t.target, t.block('b.md', '一覧\n'))).result, 'appended')
        assert.deepEqual(readdirSync(t.dir).sort(), ['AGENTS.md', 'b.md'])
      } finally {
        t.cleanup()
      }
    })
  })
})
