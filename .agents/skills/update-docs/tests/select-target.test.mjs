// select-target.test.mjs — scripts/select-target.sh の回帰テスト。
//
// 検証する契約: 更新対象は「ある方」。CLAUDE.md があれば claude、無ければ AGENTS.md の agents、
// どちらも無ければ none（ファイルを作らない）。両方あるときは claude で AGENTS.md は読むだけ。
// ただし両者が同じファイルのとき、symlink なら agents（区間だけを更新）、ハードリンクなら error-hardlink。
// リポジトリ外を指す symlink・壊れた symlink・通常ファイルでない symlink は error-symlink（書かせない）。
// スクリプトを実プロセスとして /bin/bash（3.2）と PATH の bash で流す。実機・ネットワークは使わない。
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, linkSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(HERE, '..', 'scripts', 'select-target.sh')

const pathBash = spawnSync('bash', ['-c', 'command -v bash'], { encoding: 'utf8' }).stdout.trim()
const BASHES = [...new Set(['/bin/bash', pathBash].filter((b) => b && existsSync(b)))]

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

async function select(bash, root, extra = []) {
  const r = await spawnAsync(bash, [SCRIPT, '--root', root, ...extra])
  const lines = r.stdout.trim().split('\n')
  const last = lines[lines.length - 1]
  const writePath = lines.filter((l) => l.startsWith('UPDATE_DOCS_WRITE_PATH ')).map((l) => l.slice('UPDATE_DOCS_WRITE_PATH '.length))
  return { ...r, last, target: last.replace('UPDATE_DOCS_TARGET ', ''), writePath }
}
const PRINT = ['--print-write-path']

function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'select-target-test-'))
  return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

// ディレクトリ配下の全ファイルの相対パス・sha256・mtime。読み取り専用の確認に使う。
function snapshot(dir) {
  const out = {}
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    out[name] = st.isFile()
      ? `${createHash('sha256').update(readFileSync(p)).digest('hex')}:${st.mtimeMs}`
      : 'dir'
  }
  return out
}

describe('select-target', { concurrency: true }, () => {
  for (const bash of BASHES) describe(`[${bash}]`, { concurrency: true }, () => {
    const tag = `[${bash}]`

    it(`${tag} CLAUDE.md のみ -> claude`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'CLAUDE.md'), '# c\n')
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'claude')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} AGENTS.md のみ -> agents`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'agents')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 両方あれば claude で、どのファイルも変えない（AGENTS.md はバイト・mtime とも不変）`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'CLAUDE.md'), '# c\n')
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\r\n末尾改行なし')
        const before = snapshot(t.dir)
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'claude')
        assert.deepEqual(snapshot(t.dir), before)
        assert.equal(readFileSync(join(t.dir, 'AGENTS.md'), 'utf8'), '# a\r\n末尾改行なし')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} どちらも無ければ none で、何も作らない`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'README.md'), '# r\n')
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'none')
        assert.deepEqual(readdirSync(t.dir), ['README.md'])
        assert.match(r.stderr, /作らない/)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 空の CLAUDE.md も「ある」として claude`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'CLAUDE.md'), '')
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        assert.equal((await select(bash, t.dir)).target, 'claude')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} CLAUDE.md がディレクトリなら無いものとして扱う`, async () => {
      const t = setup()
      try {
        mkdirSync(join(t.dir, 'CLAUDE.md'))
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        assert.equal((await select(bash, t.dir)).target, 'agents')
        rmSync(join(t.dir, 'AGENTS.md'))
        assert.equal((await select(bash, t.dir)).target, 'none')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 壊れた symlink は error-symlink で止まる（CLAUDE.md でも AGENTS.md でも・ほかの方があっても）`, async () => {
      for (const name of ['CLAUDE.md', 'AGENTS.md']) {
        const t = setup()
        try {
          const root = join(t.dir, 'repo')
          mkdirSync(root)
          symlinkSync(join(t.dir, 'missing.md'), join(root, name))
          writeFileSync(join(root, name === 'CLAUDE.md' ? 'AGENTS.md' : 'CLAUDE.md'), '# x\n')
          const r = await select(bash, root)
          assert.equal(r.status, 3, name)
          assert.equal(r.target, 'error-symlink', name)
          assert.deepEqual(readdirSync(root).sort(), ['AGENTS.md', 'CLAUDE.md'])
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} リポジトリ外を指す symlink は error-symlink で止まり、外のファイルを変えない`, async () => {
      const cases = {
        '相対パスで外': (root, outside) => symlinkSync('../outside.md', join(root, 'CLAUDE.md')),
        '絶対パスで外': (root, outside) => symlinkSync(outside, join(root, 'CLAUDE.md')),
        'AGENTS.md が外': (root, outside) => symlinkSync(outside, join(root, 'AGENTS.md')),
        '範囲内のリンク経由で外': (root, outside) => {
          symlinkSync(outside, join(root, 'hop.md'))
          symlinkSync('hop.md', join(root, 'CLAUDE.md'))
        },
        '外を指すディレクトリ symlink 経由': (root, outside) => {
          symlinkSync(dirname(outside), join(root, 'ext'))
          symlinkSync('ext/outside.md', join(root, 'CLAUDE.md'))
        },
      }
      for (const [name, make] of Object.entries(cases)) {
        const t = setup()
        try {
          const root = join(t.dir, 'repo')
          mkdirSync(root)
          const outside = join(t.dir, 'outside.md')
          writeFileSync(outside, '# 外\n')
          make(root, outside)
          const r = await select(bash, root)
          assert.equal(r.status, 3, name)
          assert.equal(r.target, 'error-symlink', name)
          assert.equal(readFileSync(outside, 'utf8'), '# 外\n', name)
        } finally {
          t.cleanup()
        }
      }
    })

    it(`${tag} 範囲内の symlink は従来どおり（別ファイル・ディレクトリ越し・ルート自体が symlink）`, async () => {
      const t = setup()
      try {
        const root = join(t.dir, 'repo')
        mkdirSync(join(root, 'docs'), { recursive: true })
        writeFileSync(join(root, 'docs', 'guide.md'), '# g\n')
        symlinkSync('docs/guide.md', join(root, 'CLAUDE.md'))
        writeFileSync(join(root, 'AGENTS.md'), '# a\n')
        const r = await select(bash, root)
        assert.equal(r.status, 0, r.stderr)
        assert.equal(r.target, 'claude')
        // ルートが symlink 経由のパスでも、物理パスで範囲内と判定する。
        const viaLink = join(t.dir, 'repo-link')
        symlinkSync(root, viaLink)
        const r2 = await select(bash, viaLink)
        assert.equal(r2.status, 0, r2.stderr)
        assert.equal(r2.target, 'claude')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} ディレクトリを指す symlink は error-symlink で止まる`, async () => {
      const t = setup()
      try {
        const root = join(t.dir, 'repo')
        mkdirSync(join(root, 'docs'), { recursive: true })
        symlinkSync('docs', join(root, 'CLAUDE.md'))
        const r = await select(bash, root)
        assert.equal(r.status, 3)
        assert.equal(r.target, 'error-symlink')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} symlink のループは error-symlink で止まる`, async () => {
      const t = setup()
      try {
        symlinkSync('CLAUDE.md', join(t.dir, 'CLAUDE.md'))
        const r = await select(bash, t.dir)
        assert.equal(r.status, 3)
        assert.equal(r.target, 'error-symlink')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} CLAUDE.md が AGENTS.md への symlink なら agents を返して警告し、何も変えない`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        symlinkSync('AGENTS.md', join(t.dir, 'CLAUDE.md'))
        const before = snapshot(t.dir)
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'agents')
        assert.match(r.stderr, /同じファイル.*AGENTS\.md として.*区間だけ/)
        assert.deepEqual(snapshot(t.dir), before)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} AGENTS.md が CLAUDE.md への symlink でも agents を返して警告し、何も変えない`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'CLAUDE.md'), '# c\n')
        symlinkSync('CLAUDE.md', join(t.dir, 'AGENTS.md'))
        const before = snapshot(t.dir)
        const r = await select(bash, t.dir)
        assert.equal(r.status, 0)
        assert.equal(r.target, 'agents')
        assert.match(r.stderr, /同じファイル.*AGENTS\.md として.*区間だけ/)
        assert.deepEqual(snapshot(t.dir), before)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} ハードリンク（同じファイルでどちらも symlink でない）は error-hardlink で止まる`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        linkSync(join(t.dir, 'AGENTS.md'), join(t.dir, 'CLAUDE.md'))
        const before = snapshot(t.dir)
        const r = await select(bash, t.dir)
        assert.equal(r.status, 3)
        assert.equal(r.target, 'error-hardlink')
        assert.match(r.stderr, /ハードリンク/)
        assert.deepEqual(snapshot(t.dir), before)
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 別ファイルなら同一ファイルの警告を出さない`, async () => {
      const t = setup()
      try {
        writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
        writeFileSync(join(t.dir, 'CLAUDE.md'), '# c\n')
        assert.equal((await select(bash, t.dir)).stderr, '')
      } finally {
        t.cleanup()
      }
    })

    it(`${tag} 空白を含むルートでも動く`, async () => {
      const t = setup()
      try {
        const root = join(t.dir, 'a b')
        mkdirSync(root)
        writeFileSync(join(root, 'AGENTS.md'), '# a\n')
        assert.equal((await select(bash, root)).target, 'agents')
      } finally {
        t.cleanup()
      }
    })

    // ---- --print-write-path: 選択と同じ検証を通った書き込み先の物理パス ----
    describe(`${tag} --print-write-path`, { concurrency: true }, () => {
      const phys = (p) => realpathSync(p)

      it(`${tag} 通常ファイルの AGENTS.md は、その物理パス（symlink 経由のルートでも物理化）`, async () => {
        const t = setup()
        try {
          const root = join(t.dir, 'repo')
          mkdirSync(root)
          writeFileSync(join(root, 'AGENTS.md'), '# a\n')
          const r = await select(bash, root, PRINT)
          assert.equal(r.status, 0, r.stderr)
          assert.equal(r.target, 'agents')
          assert.deepEqual(r.writePath, [join(phys(root), 'AGENTS.md')])
          symlinkSync(root, join(t.dir, 'link'))
          const r2 = await select(bash, join(t.dir, 'link'), PRINT)
          assert.deepEqual(r2.writePath, [join(phys(root), 'AGENTS.md')])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} CLAUDE.md なし・AGENTS.md が docs/agents.md への symlink -> agents と docs/agents.md`, async () => {
        const t = setup()
        try {
          mkdirSync(join(t.dir, 'docs'))
          writeFileSync(join(t.dir, 'docs', 'agents.md'), '# a\n')
          symlinkSync('docs/agents.md', join(t.dir, 'AGENTS.md'))
          const r = await select(bash, t.dir, PRINT)
          assert.equal(r.status, 0, r.stderr)
          assert.equal(r.target, 'agents')
          assert.deepEqual(r.writePath, [join(phys(t.dir), 'docs', 'agents.md')])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 両方が同じ docs/x.md への symlink -> agents と docs/x.md`, async () => {
        const t = setup()
        try {
          mkdirSync(join(t.dir, 'docs'))
          writeFileSync(join(t.dir, 'docs', 'x.md'), '# x\n')
          symlinkSync('docs/x.md', join(t.dir, 'AGENTS.md'))
          symlinkSync('docs/x.md', join(t.dir, 'CLAUDE.md'))
          const r = await select(bash, t.dir, PRINT)
          assert.equal(r.status, 0, r.stderr)
          assert.equal(r.target, 'agents')
          assert.deepEqual(r.writePath, [join(phys(t.dir), 'docs', 'x.md')])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 既存の両方向の symlink は実体のパス`, async () => {
        for (const [real, link] of [['AGENTS.md', 'CLAUDE.md'], ['CLAUDE.md', 'AGENTS.md']]) {
          const t = setup()
          try {
            writeFileSync(join(t.dir, real), '# r\n')
            symlinkSync(real, join(t.dir, link))
            const r = await select(bash, t.dir, PRINT)
            assert.equal(r.target, 'agents', link)
            assert.deepEqual(r.writePath, [join(phys(t.dir), real)], link)
          } finally {
            t.cleanup()
          }
        }
      })

      it(`${tag} 多段のリンクと空白を含むディレクトリも最後まで辿る`, async () => {
        const t = setup()
        try {
          mkdirSync(join(t.dir, 'my docs'))
          writeFileSync(join(t.dir, 'my docs', 'agents.md'), '# a\n')
          symlinkSync('my docs/agents.md', join(t.dir, 'a.md'))
          symlinkSync('a.md', join(t.dir, 'AGENTS.md'))
          const r = await select(bash, t.dir, PRINT)
          assert.equal(r.status, 0, r.stderr)
          assert.deepEqual(r.writePath, [join(phys(t.dir), 'my docs', 'agents.md')])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} claude と none ではパスを出さない`, async () => {
        const t = setup()
        try {
          const none = await select(bash, t.dir, PRINT)
          assert.equal(none.target, 'none')
          assert.deepEqual(none.writePath, [])
          writeFileSync(join(t.dir, 'CLAUDE.md'), '# c\n')
          writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
          const claude = await select(bash, t.dir, PRINT)
          assert.equal(claude.target, 'claude')
          assert.deepEqual(claude.writePath, [])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 範囲外・壊れた・ハードリンクは従来どおり止まり、パスを出さない`, async () => {
        const t = setup()
        try {
          const root = join(t.dir, 'repo')
          mkdirSync(root)
          writeFileSync(join(t.dir, 'outside.md'), '# 外\n')
          symlinkSync(join(t.dir, 'outside.md'), join(root, 'AGENTS.md'))
          const out = await select(bash, root, PRINT)
          assert.equal(out.status, 3)
          assert.equal(out.target, 'error-symlink')
          assert.deepEqual(out.writePath, [])
          rmSync(join(root, 'AGENTS.md'))
          writeFileSync(join(root, 'AGENTS.md'), '# a\n')
          linkSync(join(root, 'AGENTS.md'), join(root, 'CLAUDE.md'))
          const hard = await select(bash, root, PRINT)
          assert.equal(hard.status, 3)
          assert.equal(hard.target, 'error-hardlink')
          assert.deepEqual(hard.writePath, [])
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 別々の symlink がハードリンク同士の実体を指すときは error-hardlink（書くと mv でリンクが切れる）`, async () => {
        const t = setup()
        try {
          mkdirSync(join(t.dir, 'docs'))
          writeFileSync(join(t.dir, 'docs', 'a.md'), '# a\n')
          linkSync(join(t.dir, 'docs', 'a.md'), join(t.dir, 'docs', 'b.md'))
          symlinkSync('docs/a.md', join(t.dir, 'CLAUDE.md'))
          symlinkSync('docs/b.md', join(t.dir, 'AGENTS.md'))
          for (const extra of [[], PRINT]) {
            const r = await select(bash, t.dir, extra)
            assert.equal(r.status, 3, extra.join())
            assert.equal(r.target, 'error-hardlink', extra.join())
            assert.deepEqual(r.writePath, [])
          }
        } finally {
          t.cleanup()
        }
      })

      it(`${tag} 引数なしの既定出力にパス行は出ない`, async () => {
        const t = setup()
        try {
          writeFileSync(join(t.dir, 'AGENTS.md'), '# a\n')
          const r = await select(bash, t.dir)
          assert.deepEqual(r.writePath, [])
          assert.equal(r.stdout.trim(), 'UPDATE_DOCS_TARGET agents')
        } finally {
          t.cleanup()
        }
      })
    })

    it(`${tag} 引数の誤り・ルート不在は非 0 で、結果語彙は固定`, async () => {
      const t = setup()
      try {
        const noArg = await spawnAsync(bash, [SCRIPT])
        assert.equal(noArg.status, 1)
        assert.match(noArg.stdout, /UPDATE_DOCS_TARGET error-usage/)
        const unknown = await spawnAsync(bash, [SCRIPT, '--root', t.dir, '--x'])
        assert.equal(unknown.status, 1)
        assert.match(unknown.stdout, /UPDATE_DOCS_TARGET error-usage/)
        const noValue = await spawnAsync(bash, [SCRIPT, '--root'])
        assert.equal(noValue.status, 1)
        const missing = await spawnAsync(bash, [SCRIPT, '--root', join(t.dir, 'nope')])
        assert.equal(missing.status, 2)
        assert.match(missing.stdout, /UPDATE_DOCS_TARGET error-root/)
      } finally {
        t.cleanup()
      }
    })
  })
})
