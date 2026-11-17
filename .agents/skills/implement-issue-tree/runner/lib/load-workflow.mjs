// Workflow 生成物（scripts/implement-issue-tree.js）をランナーのプロセスで評価できる形に読み込む境界。
//
// 役割: Claude Code の Workflow ランタイムが行っている評価形態（先頭の `export const meta` を
// `const meta` へ置き換え、残りを `AsyncFunction('args','agent','log','phase', body)` の本体として
// 評価する）を、ランナーが agent の実装だけを差し替えて再現するための唯一の入口。生成物そのものは
// 一切変更しない（計画 C の方針 1。バイト数・鮮度ゲート・スクリプトのハッシュ照合に影響させない）。
//
// 読み込み規則は、生成物を実行している既存テスト（dev/implement-issue-tree/tests/agent-models・
// sample-args・security-review）と同じ:
//   - 先頭（文字列の先頭）の `export const meta` だけを `const meta` に置き換える。
//   - 開発ファイルのテスト境界マーカー（__IMPLEMENT_ISSUE_TREE_DRIVER_START__）は生成物に残らないので使わない。
//   - agent は AsyncFunction の引数（再代入できる束縛）として渡す。ホストが `agent = countedAgent` で
//     予算カウンタ付きの関数に差し替えるため、const 束縛では動かない。
//   - トップレベルの `return` がホストの結果になる。
//
// 呼び出し元: runner/run.mjs（agent-host.mjs が作った agent を渡す）と、テスト（偽 agent を渡す）。
// 関数を評価するだけで実行はしない。実行（run）は呼び出し側が引数を渡して行う。
import { readFileSync, realpathSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const META_EXPORT = /^export const meta\b/
// 本体に残る top-level の export（meta 以外）。ランタイムは起動時に SyntaxError にするので、
// ランナーは評価前に同じ理由で拒否する（行頭の export だけを近似検出する。構文の最終判定は AsyncFunction が行う）
const STRAY_EXPORT = /^export\b/m

/** 配布物の既定の場所（runner/lib の 2 つ上の scripts/）。 */
export const DEFAULT_WORKFLOW_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'implement-issue-tree.js')

/**
 * 生成物のテキストから評価用の本体を作る。先頭に meta の export が無い・meta 以外の export が
 * 残る場合は例外にする（ランタイムが受理しない形を、ランナーが黙って動かさない）。
 * @param {string} text
 * @returns {string}
 */
export function stripMeta(text) {
  if (typeof text !== 'string' || !META_EXPORT.test(text)) {
    throw new Error('生成物の先頭に `export const meta` が無い（Workflow スクリプトの形ではない）')
  }
  const body = text.replace(META_EXPORT, 'const meta')
  if (STRAY_EXPORT.test(body)) {
    throw new Error('生成物に meta 以外の top-level export が残っている（Workflow ランタイムが受理しない形）')
  }
  return body
}

/** スキルディレクトリ（runner の 1 つ上）。path 指定の生成物はこの中に限る。 */
const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

/**
 * 生成物を読み込み、評価できる形にする。
 * 返す run は呼ぶたびに本体を新しく実行する（状態は引数と agent の閉包だけ）。
 * `bytes`・`sha256` は起動ログと鮮度の記録に使う（バイト列そのものの SHA-256）。
 *
 * 信頼境界: 読み込んだ本体は AsyncFunction でランナーのプロセス内で評価される（コードの実行になる）。
 *   - `path` を指定したときは `expectedSha256`（64 桁 hex）が必須で、バイト列の SHA-256 が一致しなければ
 *     評価の前に例外にする。さらに realpath がスキルディレクトリの中でなければ拒否する
 *     （シンボリックリンクで外へ出る形も拒否。テストが別の場所の生成物を読むときだけ `allowOutsideSkillDir: true`）。
 *   - `path` を省略した既定（配布物の生成物）は、期待値を実行時に得られない（鮮度の照合 build-workflow --check は
 *     開発側 dev/ の機構で、配布物の外にあるため）。そのため評価はするが SHA-256 を返して呼び出し元が記録する。
 *     `expectedSha256` を渡したときは既定パスでも照合する。
 * @param {{ path?: string, expectedSha256?: string, allowOutsideSkillDir?: boolean }} [options]
 * @returns {{ path: string, bytes: number, sha256: string, run: (args: object, agent: Function, log: Function, phase: Function) => Promise<any> }}
 */
export function loadWorkflow({ path, expectedSha256, allowOutsideSkillDir = false } = {}) {
  const explicit = path !== undefined
  if (explicit && !/^[0-9a-f]{64}$/.test(expectedSha256 ?? '')) {
    throw new Error('path を指定するときは expectedSha256（小文字 64 桁 hex）が必須')
  }
  if (!explicit) path = DEFAULT_WORKFLOW_PATH
  if (explicit) {
    // 検査した実体をそのまま読む（検査と読み込みの間でリンクを差し替えられないようにする）
    const real = realpathSync(path)
    if (!allowOutsideSkillDir && !real.startsWith(realpathSync(SKILL_DIR) + sep)) {
      throw new Error('生成物のパスがスキルディレクトリの外にある')
    }
    path = real
  }
  const raw = readFileSync(path)
  const sha256 = createHash('sha256').update(raw).digest('hex')
  if (expectedSha256 !== undefined && sha256 !== expectedSha256) {
    throw new Error('生成物の SHA-256 が期待値と一致しない（評価しない）')
  }
  const text = raw.toString('utf8')
  const body = stripMeta(text)
  // 評価（構文解析）はここで 1 度だけ行い、構文エラーは読み込み時点で表に出す。呼び出しは run で行う。
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', body)
  return {
    path,
    bytes: raw.length,
    sha256,
    /**
     * args はパース済みのオブジェクトで渡す（文字列だと生成物は別の分岐に入る）。
     * agent / log / phase は Workflow の注入グローバルと同じ呼び出し形（agent は (prompt, opts) → Promise）。
     */
    run(args, agent, log, phase) {
      if (args === null || typeof args !== 'object' || Array.isArray(args)) {
        throw new TypeError('args はパース済みのオブジェクトで渡す')
      }
      if (typeof agent !== 'function' || typeof log !== 'function' || typeof phase !== 'function') {
        throw new TypeError('agent・log・phase は関数で渡す')
      }
      return fn(args, agent, log, phase)
    },
  }
}
