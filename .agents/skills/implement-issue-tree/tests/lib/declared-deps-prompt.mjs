// plan:declared-deps のプロンプトから、ホストが渡した値（番号・兄弟の表）を取り出す小さな関数（テスト専用）。
// 依存抽出のコマンドは scripts/declared-deps.sh --numbers N,N,… [--repo R] [--table 'JSON'] の 1 行になった（以前は
// `for n in N N; do … --jq '<フィルタ>' …` をプロンプトに埋め込んでいた）。stub agent が依頼番号を読み取る箇所と、
// プロンプトの指示どおりにフィルタを実行して返す箇所が使う。ファイル名が *.test.mjs に一致しないので node --test の glob には拾われない。
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts')
export const DECLARED_DEPS_SH = join(SCRIPTS, 'declared-deps.sh')

// プロンプトの抽出コマンドの --numbers（カンマ区切り）を整数の配列にする
export function requestedNumbersOf(prompt) {
  const m = /declared-deps\.sh --numbers ([0-9,]+)/.exec(prompt)
  if (m === null) throw new Error('プロンプトに declared-deps.sh --numbers の行が無い')
  return m[1].split(',').map(Number)
}

// プロンプトの --table の値（単一引用符の中の JSON）。無ければ null（表なし）
export function tableArgOf(prompt) {
  const m = /declared-deps\.sh --numbers [0-9,]+(?: --repo \S+)?(?: --table '([^']*)')?/.exec(prompt)
  return m === null ? null : (m[1] ?? null)
}

// スクリプトの --print-filter が出す、プロンプトのコマンドと同じ入力のフィルタ（ローカルの jq で本文を流すために使う）
export function filterOfPrompt(prompt, bash = 'bash') {
  const table = tableArgOf(prompt)
  const argv = [DECLARED_DEPS_SH, '--print-filter', ...(table === null ? [] : ['--table', table])]
  return execFileSync(bash, argv, { encoding: 'utf8' }).replace(/\n$/, '')
}
