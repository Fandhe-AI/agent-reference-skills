// skill-fences.test.mjs — SKILL.md Step 0 のコードフェンスが実際に動くことの回帰テスト。
//
// 検証する契約: スキルを 3 レイアウト（skills/・.agents/skills/・.claude/skills/）のどこへ置いても、
// Step 0 の 2 つのフェンスが scripts/ を見つけて、更新対象の選択と AGENTS.md の区間の書き込みを行う。
// 見つからなければ非 0 で止まる。SKILL.md から抜き出したフェンスを、そのまま実行する。
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, linkSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SKILL_DIR = join(HERE, '..')
const SKILL = readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf8')

const pathBash = spawnSync('bash', ['-c', 'command -v bash'], { encoding: 'utf8' }).stdout.trim()
const BASHES = [...new Set(['/bin/bash', pathBash].filter((b) => b && existsSync(b)))]

// Step 0 の節にある bash フェンスを順に取り出す。
const step0 = SKILL.slice(SKILL.indexOf('### Step 0'), SKILL.indexOf('### Step 1'))
const fences = [...step0.matchAll(/```bash\n([\s\S]*?)\n```/g)].map((m) => m[1])

const START = '<!-- agent-cli-skills:update-docs:start -->'
const END = '<!-- agent-cli-skills:update-docs:end -->'

function makeRepo(layout) {
  const root = mkdtempSync(join(tmpdir(), 'update-docs-fence-test-'))
  if (layout) {
    const dest = join(root, layout, 'update-docs')
    mkdirSync(dest, { recursive: true })
    cpSync(join(SKILL_DIR, 'scripts'), join(dest, 'scripts'), { recursive: true })
  }
  return root
}

const run = (bash, root, script) => spawnSync(bash, ['-c', script], { cwd: root, encoding: 'utf8' })

describe('SKILL.md Step 0 のフェンス', () => {
  it('Step 0 に 2 つの bash フェンス（選択・書き込み）がある', () => {
    assert.equal(fences.length, 2)
    assert.match(fences[0], /select-target\.sh/)
    assert.match(fences[1], /agents-section\.sh/)
  })

  for (const bash of BASHES) for (const layout of ['skills', '.agents/skills', '.claude/skills']) {
    it(`[${bash}] ${layout} に置いたスキルで、AGENTS.md だけのリポジトリを選択して区間を書ける`, () => {
      const root = makeRepo(layout)
      try {
        const original = '# AGENTS.md\n\n## 1. セキュリティ観点\n\n- 項目\n'
        writeFileSync(join(root, 'AGENTS.md'), original)
        const sel = run(bash, root, fences[0])
        assert.equal(sel.status, 0, sel.stderr)
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET agents')

        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n\nfoo\n')
        const w = run(bash, root, fences[1])
        assert.equal(w.status, 0, w.stderr)
        assert.equal(w.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_SECTION_RESULT appended')
        assert.equal(readFileSync(join(root, 'AGENTS.md'), 'utf8'), `${original}\n${START}\n## Current Skills (1)\n\nfoo\n${END}\n`)
        assert.equal(existsSync(join(root, '_', 'update-docs-section.md')), false, '一時ファイルは書き込み後に消える')
        assert.equal(existsSync(join(root, 'CLAUDE.md')), false)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }

  // CLAUDE.md と AGENTS.md が同じファイル（片方が他方への symlink）のとき、CLAUDE.md として
  // 直接書かず、実体へ区間だけを書く。管理区間とレビュー観点集のバイトは変わらない。
  for (const bash of BASHES) for (const [real, link] of [['AGENTS.md', 'CLAUDE.md'], ['CLAUDE.md', 'AGENTS.md']]) {
    it(`[${bash}] ${link} が ${real} への symlink: agents を選び、実体へ区間だけを書いてリンクを保つ`, () => {
      const root = makeRepo('skills')
      try {
        const original = `# AGENTS.md\n\n## 1. セキュリティ観点\n\n- 項目\n\n<!-- agent-cli-skills:agents-md:start -->\n管理\n<!-- agent-cli-skills:agents-md:end -->\n`
        writeFileSync(join(root, real), original)
        symlinkSync(real, join(root, link))
        const sel = run(bash, root, fences[0])
        assert.equal(sel.status, 0, sel.stderr)
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET agents')
        assert.match(sel.stderr, /同じファイル/)

        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n\nfoo\n')
        const w = run(bash, root, fences[1])
        assert.equal(w.status, 0, w.stderr)
        assert.equal(w.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_SECTION_RESULT appended')
        const expected = `${original}\n${START}\n## Current Skills (1)\n\nfoo\n${END}\n`
        assert.equal(readFileSync(join(root, real), 'utf8'), expected)
        assert.equal(lstatSync(join(root, link)).isSymbolicLink(), true, 'リンクは置き換えられない')
        assert.equal(readFileSync(join(root, link), 'utf8'), expected)
        // 管理区間とその前のバイトは先頭からそのまま残る。
        assert.ok(readFileSync(join(root, real), 'utf8').startsWith(original))
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }

  // 選択（フェンス 1）から書き込み（フェンス 2）までを通しで流す。リンクは symlink のまま残り、
  // 物理的なリンク先の実体にだけ区間が書かれる。
  const through = (bash, root) => {
    const sel = run(bash, root, fences[0])
    assert.equal(sel.status, 0, sel.stderr)
    assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET agents')
    mkdirSync(join(root, '_'), { recursive: true })
    writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n\nfoo\n')
    return run(bash, root, fences[1])
  }
  const BODY = `\n${START}\n## Current Skills (1)\n\nfoo\n${END}\n`
  const THROUGH_CASES = {
    'AGENTS.md -> docs/agents.md（CLAUDE.md なし）': {
      make: (root) => { symlinkSync('docs/agents.md', join(root, 'AGENTS.md')) },
      real: 'docs/agents.md', links: ['AGENTS.md'],
    },
    'CLAUDE.md と AGENTS.md が同じ docs/x.md を指す': {
      make: (root) => { symlinkSync('docs/x.md', join(root, 'AGENTS.md')); symlinkSync('docs/x.md', join(root, 'CLAUDE.md')) },
      real: 'docs/x.md', links: ['AGENTS.md', 'CLAUDE.md'],
    },
    '多段のリンク AGENTS.md -> a.md -> docs/agents.md': {
      make: (root) => { symlinkSync('docs/agents.md', join(root, 'a.md')); symlinkSync('a.md', join(root, 'AGENTS.md')) },
      real: 'docs/agents.md', links: ['AGENTS.md', 'a.md'],
    },
    '空白を含むディレクトリ越しのリンク': {
      make: (root) => { mkdirSync(join(root, 'my docs')); writeFileSync(join(root, 'my docs', 'agents.md'), '# 実体\n'); symlinkSync('my docs/agents.md', join(root, 'AGENTS.md')) },
      real: 'my docs/agents.md', links: ['AGENTS.md'],
    },
  }
  for (const bash of BASHES) for (const [name, c] of Object.entries(THROUGH_CASES)) {
    it(`[${bash}] ${name}: 実体へ区間だけを書き、リンクは symlink のまま`, () => {
      const root = makeRepo('skills')
      try {
        mkdirSync(join(root, 'docs'), { recursive: true })
        const original = '# 実体\n\n## 1. セキュリティ観点\n\n- 項目\n'
        writeFileSync(join(root, 'docs', 'agents.md'), original)
        writeFileSync(join(root, 'docs', 'x.md'), original)
        c.make(root)
        const realPath = join(root, c.real)
        const before = readFileSync(realPath, 'utf8')
        const w = through(bash, root)
        assert.equal(w.status, 0, w.stderr)
        assert.equal(w.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_SECTION_RESULT appended')
        assert.equal(readFileSync(realPath, 'utf8'), `${before}${BODY}`)
        for (const l of c.links) {
          assert.equal(lstatSync(join(root, l)).isSymbolicLink(), true, `${l} は symlink のまま`)
          assert.equal(readFileSync(join(root, l), 'utf8'), `${before}${BODY}`)
        }
        assert.equal(lstatSync(realPath).isSymbolicLink(), false)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }

  for (const bash of BASHES) {
    it(`[${bash}] 範囲外を指すリンクは選択で止まり、書き込みフェンスだけを流しても外のファイルを変えない`, () => {
      const root = makeRepo('skills')
      const outside = join(root, '..', `${root.split('/').pop()}-outside.md`)
      try {
        writeFileSync(outside, '# 外\n')
        symlinkSync(outside, join(root, 'AGENTS.md'))
        const sel = run(bash, root, fences[0])
        assert.equal(sel.status, 3)
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET error-symlink')
        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n')
        const w = run(bash, root, fences[1])
        assert.notEqual(w.status, 0)
        assert.doesNotMatch(w.stdout, /UPDATE_DOCS_SECTION_RESULT (appended|replaced|unchanged)/)
        assert.equal(readFileSync(outside, 'utf8'), '# 外\n')
        assert.equal(lstatSync(join(root, 'AGENTS.md')).isSymbolicLink(), true)
      } finally {
        rmSync(root, { recursive: true, force: true })
        rmSync(outside, { force: true })
      }
    })

    it(`[${bash}] CLAUDE.md が別にあるとき（claude）、書き込みフェンスは AGENTS.md へも CLAUDE.md へも書かない`, () => {
      const root = makeRepo('skills')
      try {
        writeFileSync(join(root, 'CLAUDE.md'), '# c\n')
        writeFileSync(join(root, 'AGENTS.md'), '# a\n')
        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n')
        const w = run(bash, root, fences[1])
        assert.notEqual(w.status, 0)
        assert.equal(readFileSync(join(root, 'CLAUDE.md'), 'utf8'), '# c\n')
        assert.equal(readFileSync(join(root, 'AGENTS.md'), 'utf8'), '# a\n')
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] 別々の symlink がハードリンク同士の実体を指すときは選択で止まり、書き込まない`, () => {
      const root = makeRepo('skills')
      try {
        mkdirSync(join(root, 'docs'))
        writeFileSync(join(root, 'docs', 'a.md'), '# a\n')
        linkSync(join(root, 'docs', 'a.md'), join(root, 'docs', 'b.md'))
        symlinkSync('docs/a.md', join(root, 'CLAUDE.md'))
        symlinkSync('docs/b.md', join(root, 'AGENTS.md'))
        const sel = run(bash, root, fences[0])
        assert.equal(sel.status, 3)
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET error-hardlink')
        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', 'update-docs-section.md'), '## Current Skills (1)\n')
        const w = run(bash, root, fences[1])
        assert.notEqual(w.status, 0)
        assert.equal(readFileSync(join(root, 'docs', 'a.md'), 'utf8'), '# a\n')
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }

  for (const bash of BASHES) {
    it(`[${bash}] CLAUDE.md があれば claude を返し、AGENTS.md は変わらない`, () => {
      const root = makeRepo('skills')
      try {
        writeFileSync(join(root, 'CLAUDE.md'), '# c\n')
        writeFileSync(join(root, 'AGENTS.md'), '# a\n')
        const sel = run(bash, root, fences[0])
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET claude')
        assert.equal(readFileSync(join(root, 'AGENTS.md'), 'utf8'), '# a\n')
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] どちらも無ければ none を返し、何も作らない`, () => {
      const root = makeRepo('skills')
      try {
        const before = readdirSync(root).sort()
        const sel = run(bash, root, fences[0])
        assert.equal(sel.status, 0)
        assert.equal(sel.stdout.trim().split('\n').pop(), 'UPDATE_DOCS_TARGET none')
        assert.deepEqual(readdirSync(root).sort(), before)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] スクリプトがどのレイアウトにも無ければ非 0 で止まる`, () => {
      const root = makeRepo(null)
      try {
        writeFileSync(join(root, 'AGENTS.md'), '# a\n')
        for (const f of fences) {
          const r = run(bash, root, f)
          assert.notEqual(r.status, 0)
          assert.match(r.stderr, /見つからない/)
        }
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] 区間の中身のファイルが無ければ書かずに非 0 で止まる`, () => {
      const root = makeRepo('skills')
      try {
        const original = '# a\n'
        writeFileSync(join(root, 'AGENTS.md'), original)
        const r = run(bash, root, fences[1])
        assert.notEqual(r.status, 0)
        assert.equal(readFileSync(join(root, 'AGENTS.md'), 'utf8'), original)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }
})

// ---- Step 1 / Step 2: _/.last-update-docs の commit_hash は検証してから展開する ----
const between = (from, to) => SKILL.slice(SKILL.indexOf(from), SKILL.indexOf(to))
const bashFences = (text) => [...text.matchAll(/```bash\n([\s\S]*?)\n```/g)].map((m) => m[1])
const step1 = bashFences(between('### Step 1', '### Step 2'))
const step2 = bashFences(between('### Step 2', '### Step 3'))
const PLACEHOLDER = '<Step 1 の BASE_COMMIT の値>'
const HASH = 'a'.repeat(40)

describe('SKILL.md Step 1 / Step 2 のフェンス', () => {
  it('各 Step に bash フェンスが 1 つずつある', () => {
    assert.equal(step1.length, 1)
    assert.equal(step2.length, 1)
    assert.ok(step2[0].includes(PLACEHOLDER))
  })

  for (const bash of BASHES) {
    it(`[${bash}] Step 1: 40 桁の小文字 16 進だけを通し、値をそのまま出力する`, () => {
      const root = mkdtempSync(join(tmpdir(), 'update-docs-last-test-'))
      try {
        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', '.last-update-docs'), `commit_hash=${HASH}\ncommit_subject=x\ncommit_date=2026-01-01T00:00:00+09:00\n`)
        const r = run(bash, root, step1[0])
        assert.equal(r.status, 0, r.stderr)
        assert.equal(r.stdout.trim(), `BASE_COMMIT=${HASH}`)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] Step 1: ファイルが無ければ初回扱い（空の BASE_COMMIT）`, () => {
      const root = mkdtempSync(join(tmpdir(), 'update-docs-last-test-'))
      try {
        const r = run(bash, root, step1[0])
        assert.equal(r.status, 0, r.stderr)
        assert.equal(r.stdout.trim(), 'BASE_COMMIT=')
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] Step 1: 形式が不正な commit_hash は報告して止まり、何も実行しない`, () => {
      const bad = [
        'a'.repeat(39),
        'a'.repeat(41),
        'A'.repeat(40),
        '--output=pwned',
        `${HASH}; touch pwned`,
        `${HASH} --stat`,
        '$(touch pwned)',
        '`touch pwned`',
        `${HASH}\r`,
        '',
      ]
      for (const value of bad) {
        const root = mkdtempSync(join(tmpdir(), 'update-docs-last-test-'))
        try {
          mkdirSync(join(root, '_'))
          writeFileSync(join(root, '_', '.last-update-docs'), `commit_hash=${value}\n`)
          const r = run(bash, root, step1[0])
          assert.notEqual(r.status, 0, JSON.stringify(value))
          assert.doesNotMatch(r.stdout, /BASE_COMMIT/, JSON.stringify(value))
          assert.equal(existsSync(join(root, 'pwned')), false, JSON.stringify(value))
          assert.match(r.stderr, /commit_hash/, JSON.stringify(value))
        } finally {
          rmSync(root, { recursive: true, force: true })
        }
      }
      // commit_hash の行そのものが無いファイルも止める。
      const root = mkdtempSync(join(tmpdir(), 'update-docs-last-test-'))
      try {
        mkdirSync(join(root, '_'))
        writeFileSync(join(root, '_', '.last-update-docs'), 'commit_subject=x\n')
        assert.notEqual(run(bash, root, step1[0]).status, 0)
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })

    it(`[${bash}] Step 2: 実リポジトリで差分を出し、不正な値・空は検証する`, () => {
      const root = mkdtempSync(join(tmpdir(), 'update-docs-diff-test-'))
      const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@example.invalid', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@example.invalid' }
      const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8', env })
      try {
        git('init', '-q')
        mkdirSync(join(root, 'skills', 'a'), { recursive: true })
        writeFileSync(join(root, 'skills', 'a', 'SKILL.md'), '# a\n')
        git('add', '.')
        git('commit', '-q', '-m', 'first')
        const first = git('rev-parse', 'HEAD').stdout.trim()
        mkdirSync(join(root, 'skills', 'b'), { recursive: true })
        writeFileSync(join(root, 'skills', 'b', 'SKILL.md'), '# b\n')
        git('add', '.')
        git('commit', '-q', '-m', 'second')
        const ok = spawnSync(bash, ['-c', step2[0].replace(PLACEHOLDER, first)], { cwd: root, encoding: 'utf8', env })
        assert.equal(ok.status, 0, ok.stderr)
        assert.match(ok.stdout, /second/)
        assert.match(ok.stdout, /skills\/b\/SKILL\.md/)
        const initial = spawnSync(bash, ['-c', step2[0].replace(PLACEHOLDER, '')], { cwd: root, encoding: 'utf8', env })
        assert.equal(initial.status, 0, initial.stderr)
        assert.match(initial.stdout, /first/)
        for (const value of ['--output=pwned', `${first}; touch pwned`, '$(touch pwned)', 'a'.repeat(39)]) {
          // 値は単一引用符の中に入るため、引用符を含まない入力で検証する。
          const bad = spawnSync(bash, ['-c', step2[0].replace(PLACEHOLDER, value)], { cwd: root, encoding: 'utf8', env })
          assert.notEqual(bad.status, 0, value)
          assert.equal(existsSync(join(root, 'pwned')), false, value)
        }
      } finally {
        rmSync(root, { recursive: true, force: true })
      }
    })
  }
})
