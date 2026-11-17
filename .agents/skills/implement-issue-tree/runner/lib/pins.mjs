// ランナーが自分で実行する・ツールに読み込ませるファイルの内容を、ラン開始時（エージェントを起動する前）に sha256 で固定し、
// 使う直前に照合する（PR #851 の P0 への多層防御の主）。
//
// 役割: run-verified.sh はスクリプト本体と scripts/lib/*.sh のハッシュを照合してから起動するが、launcher 自身は照合の対象外で
// （run-verified.sh 冒頭の「限界」）、--verify-only の枝は照合より前に lib/signed-output.sh を source する。エージェントが
// これらを書き換えられる構成では、ホストが直接起動する launcher を通じて任意のコードがサンドボックスの外で走る。
// また、ガード（agent-guard.sh）・Codex の hook（codex-hook.sh）は、ツールがエージェントの
// 実行中に遅延で読む（hook は呼び出しごと）。そこでこれらの内容を
// エージェントの起動前に固定し、agent-host（lib/agent-host.mjs）が実行仕様の段の起動前と、モデルの段の前後で照合する。
// 1 度でも食い違えば、以降の段はすべて実行しない（agent-host の tampered）。
//
// 固定の値は「通常ファイルの内容の sha256」か null（固定した時点で無かった）。null のファイルが後から現れても食い違いとする。
// 照合から実行までの間の差し替え（TOCTOU）は防がない。信頼の根はスキルディレクトリを書ける者に対する防御ではない点は
// run-verified.sh と同じで、これは「エージェントが書き換えた」を検知する層である。
//
// 呼び出し元: runner/run.mjs（pinPathsFor → pinFiles を createAdapter の前に）、lib/agent-host.mjs（checkPins）。
import { createHash } from 'node:crypto'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { findGuardScript } from './guard-script.mjs'

/** 実行仕様の段でホストが直接起動するファイル（launcher と、照合より前に source されるもの）。 */
export function launcherPinPaths(skillDir) {
  return [join(skillDir, 'scripts', 'run-verified.sh'), join(skillDir, 'scripts', 'lib', 'signed-output.sh')]
}

/**
 * ツールごとに固定するファイルの一覧。純関数ではない（ガードの探索でファイルシステムを読む）。
 * @param {{ tool: 'codex', skillDir: string, mainRoot: string, toolConfig?: object, adaptersDir: string }} p
 *   toolConfig はアダプタへ渡すものと同じ値（ガードの探索をアダプタと同じ入力で行う。lib/guard-script.mjs）
 */
export function pinPathsFor({ tool, skillDir, mainRoot, toolConfig = {}, adaptersDir }) {
  const out = [...launcherPinPaths(skillDir)]
  const guard = findGuardScript({ toolConfig, skillDir, mainRoot })
  if (guard) out.push(guard)
  if (tool === 'codex') out.push(join(adaptersDir, 'codex-hook.sh'))
  return [...new Set(out)]
}

/** 1 ファイルの固定値。無ければ null、通常ファイルでない・読めなければ `!<理由>`（照合で必ず食い違う値）。 */
function digest(path) {
  try {
    if (!statSync(path).isFile()) return '!not-file'
    return createHash('sha256').update(readFileSync(path)).digest('hex')
  } catch (e) {
    return e?.code === 'ENOENT' ? null : `!${e?.code ?? 'error'}`
  }
}

/** paths の現在の内容を固定する。@returns {ReadonlyArray<{ path: string, sha256: string|null }>} */
export function pinFiles(paths) {
  return Object.freeze(paths.map((path) => Object.freeze({ path, sha256: digest(path) })))
}

/** 2 つの固定を合わせる（同じパスは先の方を残す。先に取った固定ほど古く、エージェントの起動前に近い）。 */
export function mergePins(first, second) {
  const seen = new Set(first.map((p) => p.path))
  return Object.freeze([...first, ...second.filter((p) => !seen.has(p.path))])
}

/** 固定と現在の内容を照合する。食い違いがあれば最初の 1 件の理由、無ければ ''。 */
export function checkPins(pins) {
  for (const { path, sha256 } of pins) {
    const now = digest(path)
    if (sha256 !== null && sha256.startsWith('!')) return `${path} を起動時に読めなかった（${sha256.slice(1)}）`
    if (now !== sha256) return `${path} が起動時と違う（${sha256 === null ? '起動時は無かった' : now === null ? '消えた' : '内容が変わった'}）`
  }
  return ''
}
