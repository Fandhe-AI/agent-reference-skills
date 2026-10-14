// scripts/lib/push-verify.sh（push の前後でリモート head を突き合わせる共通部。Issue #603 第 3 弾）を、実 git の bare origin で
// 直接実行する回帰テスト。base-merge.sh が使い、以降 pr-create の push と fix の push 検証も同じ部品へ移すため、この lib 単体の
// 契約を固定する。
//
// 契約: pushed になるのは次の全部を満たしたときだけ。
//   (i)   push 前のリモート head が、ローカル HEAD と違う（自分が積んだコミットが存在した = 空振り push の除外）
//   (ii)  push 後のリモート head が、ローカル HEAD と一致する
//   (iii) push コマンド自身が成功した
// 比較できないとき（ls-remote 失敗・HEAD を読めない）も push は実行する（作業の保全）が、pushed にはしない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'
import { BRANCH, git, makeSandbox } from './lib/git-sandbox.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'push-verify.sh')
const BASHES = availableBashes()

// ローカルに 1 コミット積んだ状態（detached HEAD）にして、lib を source して関数を呼ぶ
function prepare(sb) {
  git(sb.wt, 'checkout', '-q', '--detach', `refs/remotes/origin/${BRANCH}`)
  writeFileSync(join(sb.wt, 'local.txt'), 'local\n')
  git(sb.wt, 'add', 'local.txt')
  git(sb.wt, 'commit', '-q', '-m', 'local work')
}
function call(bash, sb, snippet, env = {}) {
  const r = spawnSync(bash, ['-c', `. '${LIB}' || exit 90; ${snippet}`], { cwd: sb.wt, encoding: 'utf8', env: sb.env(env) })
  return r
}
const outcomeOf = (bash, sb, branch = BRANCH, env = {}) => {
  const r = call(bash, sb, `pv_push_verified "${branch}"; rc=$?; printf '%s|%s' "$rc" "$PV_OUTCOME"`, env)
  assert.equal(r.status, 0, r.stderr)
  const [rc, outcome] = r.stdout.split('|')
  return { rc: Number(rc), outcome }
}

for (const bash of BASHES) {
  const t = (name, fn) => test(`[${bash}] ${name}`, fn)

  t('pushed: 二条件を満たし push が成功した（リモート head がローカル HEAD になる）', () => {
    const sb = makeSandbox()
    prepare(sb)
    const before = sb.remoteSha()
    assert.deepEqual(outcomeOf(bash, sb), { rc: 0, outcome: 'pushed' })
    assert.equal(sb.remoteSha(), sb.headSha())
    assert.notEqual(sb.remoteSha(), before)
    assert.deepEqual(sb.gitCalls().filter((c) => /^push( |$)/.test(c)), [`push --no-follow-tags origin HEAD:refs/heads/${BRANCH}`])
  })

  t('noop (i): push 前のリモート head がすでにローカル HEAD と同じなら、push が成功しても pushed にしない', () => {
    const sb = makeSandbox()
    prepare(sb)
    assert.deepEqual(outcomeOf(bash, sb, BRANCH, { FAKE_LS_1: 'head' }), { rc: 0, outcome: 'noop' })
  })

  t('race (ii): push は成功したが push 後のリモート head がローカル HEAD と違う（並行 push）なら pushed にしない', () => {
    const sb = makeSandbox()
    prepare(sb)
    git(sb.seed, 'checkout', '-q', '-b', 'other', `origin/${BRANCH}`)
    writeFileSync(join(sb.seed, 'other.txt'), 'other\n')
    git(sb.seed, 'add', 'other.txt')
    git(sb.seed, 'commit', '-q', '-m', 'other')
    git(sb.seed, 'push', '-q', 'origin', 'other')
    const other = sb.remoteSha('other')
    sb.writeHook(sb.origin, 'post-receive', `while read old new ref; do [ "$ref" = refs/heads/${BRANCH} ] && git update-ref refs/heads/${BRANCH} ${other}; done`)
    assert.deepEqual(outcomeOf(bash, sb), { rc: 0, outcome: 'race' })
  })

  t('push-failed (iii): push コマンドが失敗したら、リモートがたまたまローカル HEAD と一致していても pushed にしない', () => {
    const sb = makeSandbox()
    prepare(sb)
    // pre-push hook の中で同じ内容を先に push してしまい、そのうえで hook 自身が失敗する（本体の push は rc != 0）
    sb.writeHook(join(sb.wt, '.git'), 'pre-push', `[ -n "$IN_HOOK" ] && exit 0\nIN_HOOK=1 git push origin HEAD:refs/heads/${BRANCH} >/dev/null 2>&1\nexit 1`)
    const r = outcomeOf(bash, sb)
    assert.equal(sb.remoteSha(), sb.headSha(), '前提: リモート head はローカル HEAD と一致している')
    assert.deepEqual(r, { rc: 0, outcome: 'push-failed' })
  })

  t('push-failed: リモートが push を拒否（pre-receive）したら push-failed で、リモートは動かない', () => {
    const sb = makeSandbox()
    prepare(sb)
    sb.writeHook(sb.origin, 'pre-receive', 'exit 1')
    const before = sb.remoteSha()
    assert.deepEqual(outcomeOf(bash, sb), { rc: 0, outcome: 'push-failed' })
    assert.equal(sb.remoteSha(), before)
  })

  t('unverified: push 前または push 後の ls-remote が失敗したら push は実行し、pushed にはしない', () => {
    for (const failing of ['FAKE_LS_1', 'FAKE_LS_2']) {
      const sb = makeSandbox()
      prepare(sb)
      assert.deepEqual(outcomeOf(bash, sb, BRANCH, { [failing]: 'fail' }), { rc: 0, outcome: 'unverified' }, failing)
      assert.equal(sb.remoteSha(), sb.headSha(), `${failing}: 作業を保全するため push 自体は実行されている`)
    }
  })

  t('HEAD を読めないなら push せず unverified', () => {
    const sb = makeSandbox()
    prepare(sb)
    const r = call(bash, sb, `git() { if [ "$1" = rev-parse ]; then return 1; fi; command git "$@"; }; pv_push_verified "${BRANCH}"; printf '%s|%s' "$?" "$PV_OUTCOME"`)
    assert.equal(r.stdout, '0|unverified')
    assert.equal(sb.remoteSha() === sb.headSha(), false, 'HEAD を確認できないまま push していない')
  })

  t('ブランチ名が不正（空・先頭ハイフン・..・空白・シェルメタ文字）なら push せず return 1。PV_OUTCOME は空', () => {
    const sb = makeSandbox()
    prepare(sb)
    const before = sb.remoteSha()
    for (const bad of ['', '-x', 'a..b', 'a b', 'a;touch pwned', '$(touch pwned)', 'a:b', '+feat', 'refs/heads/x', 'refs/tags/x', 'HEAD', 'main/', 'main.lock', 'a//b', 'a/.b', 'feat/x.lock']) {
      const r = call(bash, sb, `pv_push_verified "$1"; printf '%s|%s' "$?" "$PV_OUTCOME"`.replace('"$1"', `'${bad}'`))
      assert.equal(r.stdout, '1|', JSON.stringify(bad))
    }
    assert.equal(sb.remoteSha(), before)
    assert.deepEqual(sb.gitCalls().filter((c) => /^push( |$)/.test(c)), [])
  })

  t('pv_valid_branch: 通常のブランチ名（feat/603-x・release/1.0・main）は受理する。HEAD を含む名前（HEAD2・head）は拒否しない', () => {
    const sb = makeSandbox()
    for (const ok of ['feat/603-x', 'release/1.0', 'main', 'HEAD2', 'head', 'a.b_c-d']) {
      const r = call(bash, sb, `pv_valid_branch '${ok}'; printf '%s' "$?"`)
      assert.equal(r.stdout, '0', ok)
    }
  })

  t('同名のタグがあっても push は refs/heads/<branch> へ届き、タグは動かない', () => {
    const sb = makeSandbox()
    prepare(sb)
    git(sb.seed, 'tag', BRANCH, `origin/${BRANCH}`)
    git(sb.seed, 'push', '-q', 'origin', `refs/tags/${BRANCH}`)
    const tagSha = git(sb.origin, 'rev-parse', `refs/tags/${BRANCH}`)
    assert.deepEqual(outcomeOf(bash, sb), { rc: 0, outcome: 'pushed' })
    assert.equal(sb.remoteSha(), sb.headSha())
    assert.equal(git(sb.origin, 'rev-parse', `refs/tags/${BRANCH}`), tagSha)
  })

  t('pv_remote_sha: 完全一致の ref だけを採る（末尾一致する別の ref・ブランチ無しは空）', () => {
    const sb = makeSandbox()
    const real = sb.remoteSha()
    let r = call(bash, sb, `pv_remote_sha "${BRANCH}"; printf '%s|%s' "$?" "$PV_SHA"`)
    assert.equal(r.stdout, `0|${real}`)
    // 本物のブランチを消し、末尾が一致する別の ref だけを置く（ls-remote のパターンは末尾一致で拾う）
    const decoyRef = `refs/heads/zzz/refs/heads/${BRANCH}`
    git(sb.origin, 'update-ref', decoyRef, real)
    git(sb.origin, 'update-ref', '-d', `refs/heads/${BRANCH}`)
    r = call(bash, sb, `pv_remote_sha "${BRANCH}"; printf '%s|%s' "$?" "$PV_SHA"`)
    assert.equal(r.stdout, '0|', '別の ref の sha を本物のブランチの sha として採らない')
  })
}

test('lib は単体実行用の set -e / exit / trap を持たず、二重 source は無害', () => {
  const code = readFileSync(LIB, 'utf8').split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
  assert.ok(!/^\s*(set -|trap |exit )/m.test(code), 'source 元のシェル状態を壊す記述がある')
  const r = spawnSync('bash', ['-c', `. '${LIB}' && . '${LIB}' && echo ok`], { encoding: 'utf8' })
  assert.equal(r.stdout.trim(), 'ok')
})
